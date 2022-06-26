# dpdk库源码中包含内核头文件的问题
## 问题描述
1. 在 A 环境上与 B 环境上使用相同版本的 gcc 编译 dpdk 程序
2. 测试发现 A 环境上编译的版本能够正常工作，B 环境上编译的版本不能工作

调试确认，**A 环境上编译的 dpdk 程序初始化了 vfio 的 tailq，而 B 环境上编译的 dpdk 程序没有初始化 vfio 的 tailq。**

dpdk 版本信息：**dpdk-16.04**

## 从源码着手分析
vfio 的 tailq 在 eal_pci_vfio.c 中通过 **EAL_REGISTER_TAILQ** 来注册，代码如下：

```c
#ifdef VFIO_PRESENT

#define PAGE_SIZE   (sysconf(_SC_PAGESIZE))
#define PAGE_MASK   (~(PAGE_SIZE - 1))

static struct rte_tailq_elem rte_vfio_tailq = {
	.name = "VFIO_RESOURCE_LIST",
};
EAL_REGISTER_TAILQ(rte_vfio_tailq)
```
上述代码说明，**只有定义了 VFIO_PRESENT 宏才会注册 vfio 的 tailq!** 重新描述问题：

**A 环境上编译时 VFIO_PRESENT 宏被定义，B 环境上编译时 VFIO_PRESENT 宏没有被定义。**

## 提问环节
1. 再次确认编译器是否一致
	确认一致
2. 确认编译的 dpdk 代码一致
	确认一致
3. VFIO_PRESENT 在哪里被定义的？

## 对提问的回答
搜索确定 **VFIO_PRESENT** 在 **eal_vfio.h** 中被定义，代码如下：

```c
#ifdef RTE_EAL_VFIO
#include <linux/version.h>
#if LINUX_VERSION_CODE >= KERNEL_VERSION(3, 6, 0)
#include <linux/vfio.h>

.......

#define VFIO_PRESENT
#endif /* kernel version */
#endif /* RTE_EAL_VFIO */
```
根据代码内容，VFIO_PRESENT 要被定义需要满足如下条件：

1. config 中配置 CONFIG_RTE_EAL_VFIO 为 y
2. 内核版本大于等于 3.6.0

检查环境得到如下信息：

1. config 中使用了 RTE_EAL_VFIO 配置
2. RTE_KERNELDIR 指向的内核 kernel_devel 版本一致

确认了这两点信息后，得出**不应该存在问题的**结论。

## linux/version.h 是哪个 linux/version.h?
一通研究发现 eal_vfio.h 中包含的 linux/version.h **并不是从 RTE_KERNELDIR 变量指定的路径下搜索的！**

总结两点问题：

1. 编译内核 ko 的源文件时 linux/version.h 从指定的内核路径下面搜索 
2. 编译库函数时包含的 linux/version.h 头文件是**从编译环境上的 /usr/include 目录搜索**

## 真正的问题是啥？
绕了一圈后，我确认真正的问题是不同编译机器上的 **/usr/include/linux/version.h** 文件不同，**A 机器上 version.h 中定义的版本高于 3.6.0，B 机器上 version.h 中定义的版本低于 3.6.0**。

## 库函数中包含内核头文件的坏处
编译库函数时，库函数中包含的内核头文件会从编译环境上的 /usr/include 目录中搜索，不同的编译环境上内核头文件版本不同就是潜在的风险。

**更具体点说其实是将库函数与内核头文件耦合了，随之而来的是与编译环境的耦合**。库函数中包含内核头文件是有需求的，如 ip 命令就依赖内核的 netlink 相关头文件，不过它本地维护了一个特定的 netlink 头文件版本，就消除了与编译环境中部署的内核头文件的耦合性。

从 eal_vfio.h 的需求来分析，它实现了不支持 3.6.0 以下内核版本的需求，而这个内核版本是 **dpdk 程序运行环境的内核版本**，**并不要求与编译环境内核版本一致**，最好的方法是使用 RTE_KERNELDIR 变量路径中的 linux/version.h 头文件，可也有些不好的地方，如何取舍不易决定！
