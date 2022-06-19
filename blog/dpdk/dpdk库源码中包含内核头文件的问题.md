## 问题描述
dpdk-16.04 中的 eal_vfio.h 头文件中有下面的预处理语句：
```c
#ifdef RTE_EAL_VFIO
#include <linux/version.h>
#if LINUX_VERSION_CODE >= KERNEL_VERSION(3, 6, 0)
#include <linux/vfio.h>
```
在不同的环境上编译时发现生成的代码不同。研究了下发现是上面预处理语句中 ```LINUX_VERSION_CODE```判断的问题。

## 分析验证
验证不同环境上 ```RTE_KERNEL```指定的内核目录下的 ```linux/version.h```头文件，发现是相同的。

## 真正的问题
一开始没有想到头文件搜索路径的问题，最后终于发现库函数中 ```linux/version.h```并不是从 ```RTE_KERNEL```指定的内核源码路径中搜索的，而是从编译机器上的 ```/usr/include/linux`` 目录搜索的。

对比不同环境上的 ```/usr/include/linux/version.h```，果然发现了一个机器上的 ```version.h```版本不对。


**这里的注意事项如下：**

1. 编译 dpdk 内核相关 ko 的源文件时 linux/version.h 是从指定的内核路径下面搜索
2. 编译库函数时包含的 linux/version.h 头文件是从编译系统上的 /usr/include/linux 目录中搜索的
3. 不同机器上的 /usr/include/linux 路径中的 version.h 可能存在差别


