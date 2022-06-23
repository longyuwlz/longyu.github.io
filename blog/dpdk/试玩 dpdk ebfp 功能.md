# 试玩 dpdk ebfp 功能
## ebpf 是什么？

eBPF 是一个在内核中运行的虚拟机，支持通过 C 等高级语言编码生成eBPF 指令码。eBPF 指令码从用户态加载到内核后以本地代码的形式和速度去执行，现已支持内核多个子系统的观测点，提供了几乎无限的可观测性。

ebpf 主要工作流程如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/91f3ab72c26942a5860d38b9db93f52b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_18,color_FFFFFF,t_70,g_se,x_16#pic_center)
## dpdk 对 ebpf 的支持
dpdk 18.0 引入 ebpf，实现为 librte_bpf 库。支持的特性：
1. 支持 ebpf 架构（不支持 tail-pointer）
2. x86_64 与 arm64 架构支持使用 JIT将 ebpf 代码编译为 native code
3. 支持 ebpf 代码校验支持用户定义的辅助函数
4. 支持 rx/tx 包过滤
5. 支持 ebpf 代码访问 mbuf 结构

不支持的特性：
1. cbpf
2. maps
3. stail-pointer calls

## dpdk ebpf 的使用过程
通过注册 rx、tx 函数内的 callback 来实现过滤功能，最终控制的是**返回给上层、传输给下层的特定过滤格式的 mbuf**。

过滤功能的实现通过 epbf 指令来完成，支持虚拟机模拟与 jit 两种方式。jit 会将 bpf 指令转化为 x86 指令来运行。

目前的编程方式：用 c 等高级语言编写 ebpf 过滤操作，然后编译为 bpf 指令码来加载。

## dpdk 中上手 ebpf 的一些前置条件

1. config 配置文件中使能如下配置：
   
    RTE_LIBRTE_GRO
    
    RTE_LIBRTE_GSO
    
    RTE_LIBRTE_BPF
    
    RTE_LIBRTE_BPF_ELF
    RTE_TEST_PMD
    
    RTE_ETHDEV_RXTX_CALLBACKS
    
2. 使用 clang 编译 examples/bpf/ 目录下的文件为 bpf 指令码
3. 运行 testpmd，通过 bpf-load 命令加载第二步生成的指令码

## 使用 dpdk 示例代码上手 dpdk ebpf

ebpf 过滤 c 程序源码如下：

```c
#include <stdint.h>
#include <net/ethernet.h>
#include <netinet/ip.h>
#include <netinet/udp.h>
#include <arpa/inet.h>

uint64_t
entry(void *pkt)
{
        struct ether_header *ether_header = (void *)pkt;

        if (ether_header->ether_type != htons(0x0800))
                return 0;

        struct iphdr *iphdr = (void *)(ether_header + 1);
        if (iphdr->protocol != 17 || (iphdr->frag_off & 0x1ffff) != 0 ||
                        iphdr->daddr != htonl(0x1020304))
                return 0;

        int hlen = iphdr->ihl * 4;
        struct udphdr *udphdr = (void *)iphdr + hlen;

        if (udphdr->dest != htons(5000))
                return 0;

        return 1;
}
```

上述代码实现类似 **tcpdump -s 1 -d 'dst 1.2.3.4 && udp && dst port 5000**’ 命令行的功能，过滤出目的 ip 为 1.2.3.4 且目的端口为 5000 的 udp 报文。

上述源码摘自 **dpdk** 工程中的 **examples/bpf/t1.c**，编译命令如下：

```c
clang -O2 -U __GNUC__ -target bpf -c t1.c
```

编译成功后，运行 **testpmd** 程序，执行 **bpf-load** 命令，示例如下：

```c
testpmd> bpf-load rx 0 0 J ./examples/bpf/t1.o
rte_bpf_elf_load(fname="./examples/bpf/t1.o", sname=".text") successfully creates 0x7f4f2d9dc000(jit={.func=0x7f4f2d9b0000,.sz=93});
0:Success
```

执行 **bpf-unload** 命令即可卸载 ebpf 规则。

## dpdk ebpf  的安全性
dpdk ebpf 实现做了如下安全性保障：
1. 参数合法性校验
2. ebpf 指令合法性（正确的格式、有效字段值等）校验
3. 校验是否存在不可达的指令或循环
4. 加载前模拟执行所有可能存在的分支中的 ebpf 指令
校验失败则终止加载
其它的安全保障：
1. ebpf jit 翻译完成后将 rte_bpf 所在的页设置为 READ ONLY
2. ebpf jit 翻译后生成的 native code 存储的页设置为读与可执行

## dpdk ebpf 框架的性能负载
测试方法：
1. 基于 dpdk-19.11 testpmd 测试
2. 编写一个直接返回 1 的 ebpf 空规则
3. 使用 testpmd 加载第二步生成的 dpdk 规则
4. 持续打流 100% 带宽观测性能数据

在飞腾 D2000 上使用一个两万兆网卡测试，测试确定对 512、1518 字节性能几乎没有影响，64 字节下降了不到 3%。

## 参考链接

[https://blog.csdn.net/force_eagle/article/details/117365557](https://blog.csdn.net/force_eagle/article/details/117365557)

[https://doc.dpdk.org/guides/testpmd_app_ug/testpmd_funcs.html#bpf-functions](https://doc.dpdk.org/guides/testpmd_app_ug/testpmd_funcs.html#bpf-functions)