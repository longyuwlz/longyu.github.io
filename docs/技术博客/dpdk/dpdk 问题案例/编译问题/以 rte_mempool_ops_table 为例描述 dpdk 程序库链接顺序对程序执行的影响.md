# 以 rte_mempool_ops_table 为例描述 dpdk 程序库链接顺序对程序执行的影响
# dpdk mempool_ops
dpdk mempool_ops 是对旧版 mempool 代码的抽象，在 **dpdk-16.07** 中被引入。

老版本在创建 mempool 时会创建一个内部的 **ring** 来完成**入队与出队的操作**，底层区分了**多生产者、多消费者，单生产者、单消费者**模型。

老版本 mempool 创建时会**将所有的元素预先 enqueue 到 ring 中**，并对**每个**元素执行**初始化**操作，这部分代码隐含在 mempool 的内部实现中。用户从 mempool 中申请、释放 mem，最底层是通过 **dequeue、enqueue ring** 来实现的。

随着 dpdk 支持场景的拓宽，在 mempool 底层使用 **ring** 这一种数据结构来控制 mem 的申请与释放**不能满足所有场景的使用需求**。

在一些场景下，一些外部的内存子系统在使用 DPDK 时需要对 mempool 底层的入队与出队的行为进行定制化开发，这意味着底层的这部分功能需要向外部开放，必须能够让程序注册一个自定义的入队、出队方法及关联数据结构，rte_mempool_ops 就是这种功能的具体实现。

# rte_mempool_ops 的抽象
16.07 中 rte_mempool_ops 的定义如下：

```c
struct rte_mempool_ops {
       char name[RTE_MEMPOOL_OPS_NAMESIZE]; /**< Name of mempool ops struct. */
       rte_mempool_alloc_t alloc;       /**< Allocate private data. */
       rte_mempool_free_t free;         /**< Free the external pool. */
       rte_mempool_enqueue_t enqueue;   /**< Enqueue an object. */
       rte_mempool_dequeue_t dequeue;   /**< Dequeue an object. */
       rte_mempool_get_count get_count; /**< Get qty of available objs. */
} __rte_cache_aligned;
```
name 用于**唯一标识**每个 mempool_ops，alloc 用于 mempool_ops **内部数据结构的创建**，free 用于 mempool_ops **内部数据结构的销毁**，enqueue 负责入队列，dequeue 负责出队列，get_count 用以获取当前可用的对象数量。

总结起来有如下三部分功能：

1. mempool_ops 内部数据结构的创建与释放功能
2. mempool_ops 对象的入队与出队功能
3. mempool_ops 底层可用对象数量的查询功能


# 以 ring 描述在 mempool_ops 框架下 mempool_ops 的使用过程
每一个 mempool_ops 需要实例化一个 rte_mempool_ops 结构并将此结构注册到系统中，对单生产者与单消费者这种基于 ring 的模型而言它实例化的 rte_mempool_ops 定义如下；

```c
static const struct rte_mempool_ops ops_sp_sc = {
       .name = "ring_sp_sc",
       .alloc = common_ring_alloc,
       .free = common_ring_free,
       .enqueue = common_ring_sp_enqueue,
       .dequeue = common_ring_sc_dequeue,
       .get_count = common_ring_get_count,
};
```
使用如下命令注册：

```c
MEMPOOL_REGISTER_OPS(ops_sp_sc);
```
MEMPOOL_REGISTER_OPS 通过 gcc 的构造函数声明，调用 rte_mempool_register_ops 函数将 ops_sp_sc mempool_ops 注册到系统中。

rte_mempool_register_ops 在进行一系列的内容检查后，将 ops_sp_sc 注册到 rte_mempool_ops_table 表中（**在获取到互斥锁的前提下，保证对 rte_mempool_ops_table 的互斥访问**）。

成功后，会获取到 **ops_index** （**ops 在 rte_mempool_ops_table 中的下标**），这个下标会被保存到 **mempool** 结构的 **ops_index** 字段中（**通过调用 rte_mempool_set_ops_byname 函数设置**）。

其功能定义如下：

```c
       /**
        * Index into rte_mempool_ops_table array of mempool ops
        * structs, which contain callback function pointers.
        * We're using an index here rather than pointers to the callbacks
        * to facilitate any secondary processes that may want to use
        * this mempool.
        */
       int32_t ops_index;
```
# mempool_ops 被调用的地方
使用 mempool_ops 时，通过 rte_mempool_get 函数出队列过程函数调用图示如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210615153814667.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
当 cache 中没有缓存时，就调用底层 ops 中注册的 dequeue 接口来完成。

# dpdk-16.07 中相关 git commit
相关的 commit 信息如下：

```c
commit 449c49b93a6b87506c7bb07468e82b539efddca3
Author: David Hunt <david.hunt@intel.com>
Date:   Wed Jun 22 10:27:27 2016 +0100

    mempool: support handler operations
    
    Until now, the objects stored in a mempool were internally stored in a
    ring. This patch introduces the possibility to register external handlers
    replacing the ring.
    
    The default behavior remains unchanged, but calling the new function
    rte_mempool_set_ops_byname() right after rte_mempool_create_empty() allows
    the user to change the handler that will be used when populating
    the mempool.
    
    This patch also adds a set of default ops (function callbacks) based
    on rte_ring.
    
    Signed-off-by: David Hunt <david.hunt@intel.com>
    Signed-off-by: Olivier Matz <olivier.matz@6wind.com>
    Acked-by: Shreyansh Jain <shreyansh.jain@nxp.com>
    Acked-by: Olivier Matz <olivier.matz@6wind.com>
```
此接口在后面的版本有一些优化，但是主体框架没有大的变动。注册一个自己的 mempool_ops 的实例**可以参照 vpp  dpdk_plugins 中的实现代码**。

# 19.11 中 dpdk 程序初始化后 rte_mempool_ops_table 的布局情况

dpdk-19.11 中 dpdk 程序初始化后 rte_mempool_ops_table 结构示例如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210615103819679.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
上图中，rte_mempool_ops_table 的不同表项指向不同的 mempool_ops 实例。

使用静态库时，链接不同 **mempool_ops** 所在库的**顺序决定了** **rte_mempool_ops_table** 中不同 **mempool_ops** 的**布局**。如果 dpdk primary 进程与 secondary 进程**链接**不同 mempool_ops 构造函数所在**库的顺序不同**，则会有**不同的** rte_mempool_ops_table **布局**，当 mempool 需要在 primary 与 secondary 中共享时，不同的 rte_mempool_ops_table 布局就会带来严重的问题！


## 第一种布局方式——dpdk 内部示例程序的布局
这里以 dpdk-pdump 为代表，其链接参数可以查看如下文件：

```bash
x86_64-native-linuxapp-gcc/build/app/pdump/.dpdk-pdump.cmd
```
此种方式下 rte_mempool_ops_table 的前 4 个元素布局情况见下图：![在这里插入图片描述](https://img-blog.csdnimg.cn/20210615110317285.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
可以看到，mp_mc 这种基于 ring 的多生产者与多消费者占据 rte_mempool_ops_table 表中 ops 数组的第一个表项，examples 目录下的 dpdk primary 程序中 rte_mempool_ops_table 表的布局与 app 下的程序布局一致。

## 使用 libdpdk.a 链接外部程序时的布局情况
libdpdk.a 中 mempool 相关静态库的链接顺序如下：

```bash
cat ./x86_64-native-linux-gcc/lib/libdpdk.a
GROUP (...librte_mempool_bucket.a librte_mempool_dpaa2.a librte_mempool_octeontx.a librte_mempool_octeontx2.a librte_mempool_ring.a librte_mempool_stack.a ...)
```
此时程序运行后，rte_mempool_ops_table 表中 mempool_ops 的布局情况见下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210615111522370.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
可以看到，此时 mempool_bucket_ops 占据 rte_mempool_ops_table 中 ops 的第一个元素，这与第一种情况是不同的。

# 问题描述
primary 进程使用 libdpdk.a 中的链接顺序，使用第二种 rte_mempool_ops_table 布局方式，secondary 进程使用 dpdk-pdump，使用此程序来抓取报文。

问题现象：

**打流情况下，dpdk-pdump 程序运行起来后会导致 primary 进程段错误。**

# dpdk-pdump dump 报文的原理浅析
**dpdk-pdump** 首先创建 **pdump_tuples** 中使能表项的不同字段，一个 **pdump_tuples 表项** 能够**完整**的描述一个待 dump 的目标接口。

**dpdk-pdump** 会为每一个 pdump_tuples 创建**单独的 pktmbuf_pool** 并使用 **mp_mc_ops** 这种 **mempool_ops**，同时会根据配置的功能，来创建相应的 **ring**。

**pdump_tuples 及 vdev 接口初始化完成后**，**dpdk-pdump** 会调　**rte_pdump_enable_by_deviceid** 来使能 dump 指定接口指定队列上指定收、方向报文的功能。

**rte_pdump_enable_by_deviceid** 会使用 **pdump_tuples** 中配置表项的内容作为参数，构造一条**请求**，然后将这条请求通过**本地套接字**发送给 **primary** 进程。

**primary** 进程收到这条消息后，进行解析并调用 **pdump_server** 函数，**pdump_server** 调用 **set_pdump_rxtx_cbs** 来向请求的 port 与 queue 的 rx、tx 方向注册回调函数，rx 这方为 **pdump_rx**，tx 这方为 **pdump_tx**。

完成了上述操作后，**pdump_server** 会向对方发送一个 **reply**，表明配置状态。

当程序调用 **rte_eth_rx_burst** 时，**成功收到报文后**，会**遍历接收回调函数并执行**，在这里就调用到了 **pdump_rx** 函数。

**pdump_r**x 函数使用 **dpdk-pdump** 发送请求中指定的 **mempool** 来申请 **mbuf**，然后拷贝报文到 **mbuf** 中，成功后就尝试将报文投递到 dpdk-pdump 发送请求中指定的 ring 中，失败则直接释放报文。

由于 dpdk 程序在初始化的过程中已经执行了一些**内存的共享操作**，primary 进程能够**直接使用 secondary 进程中的一些虚拟地址**，这里的 mempool 的地址就是一个实例。

问题就出在这里！当 primary 进程收到包后，调用到 pdump_rx 函数时，在从 mempool 中申请 mbuf 的时候，由于 **dpdk-pdump 与 primary 进程的 rte_mempool_ops_table 表中 mempool_ops 的布局不同**，在 dpdk-pdump 对应 **ops_mp_mc** 这个 **mempool_ops** 的表项处，在 primary 进程中实际对应的是 **bucket** 的 **mempool_ops**，就造成了 primary 进程**段错误**！

# 解决方案
调整 libdpdk.a 中 mempool_ops 所在库的链接顺序，与 dpdk-pdump 保持一致，重新编译 primary 程序。

# 总结
本文从 rte_mempool_ops 着手描述，目的在于说明由于库链接顺序的区别导致 dpdk primary 进程与 secondary 进程中 mempool_ops 在 rte_mempool_ops_table 占据不同的表项，进一步造成程序段错误的问题。

使用 gcc 的 constructor 修饰符来声明构造函数，在使用静态库的情况下，**链接顺序就决定了初始化的顺序，进而影响到了在不同程序中表单的布局**，这一布局又随着多个程序之间的交互被误用，最终造成了严重的问题。

使用 constructor 修饰符**让 mempool_ops 的动态添加**变得非常简单，避免了硬编码。但是使用了 **constructor** 的同时也继承了 **constructor** 潜在的问题，即链接的顺序决定了初始化的顺序，这算是种隐式的依赖，不太容易发现！

正如一件事物有好有坏，一个技术也有好有坏，更准确点说应该是**有优势也有限制条件**。我们应当做到既清楚它的优势也清楚它的限制条件，正如我们需要明悟自己的长短一般，并不是那么容易！

本篇文章算是使用 **groff** 绘图的一个开端，绘出的图让人挺满意的，这是一个很好的开端，也是一个改变的点。

最后将 **mempool_ops** 中某张图片的 pic 代码贴到下面，仅供参考！


```pic
.PS

define rte_mempool_ops { 
	box "..........";
	box $1 fill 0.4;
	box $2 fill 0.6;
 }

boxht=0.4;
boxwid=2.5;

A:box "sl";
down;
box "num_ops" with .nw at A.sw;
B:box "ops[0]" fill 0.5;
C:box "ops[1]" fill 0.5;
D: box "ops[2]" fill 0.5;
E: box "ops[3]" fill 0.5;
F:box "ops[...]" fill 0.5;

boxwid=1.8;

H:box "octeontx" with .nw at A.se + (2, -4) fill 0.2;
rte_mempool_ops("otx2_npa_enq", "otx2_npa_deq");

I:box "dpaa" with .nw at A.e + (2, 0.5) fill 0.2;
rte_mempool_ops("dpaa_mbuf_free_bulk", "dpaa_mbuf_alloc_bulk");

J:box "bucket" with .nw at A.se + (2, 3) fill 0.2;
rte_mempool_ops("bucket_enqueue", "bucket_dequeue");

K:box "dpaa2" with .nw at A.se + (2, -1.5) fill 0.2;
rte_mempool_ops("irte_hw_mbuf_free_bulk", "rte_dpaa2_mbuf_alloc_bulk");

"\fBrte_mempool_ops_table\fR" textwid 2 with .nw at A.c + (0, 0.4);
"\fB  mempool_octeontx_ops\fR" textwid 2 with .nw at H.c + (0, 0.4);
"\fB  mempool_dpaa_ops\fR" textwid 2 with .nw at I.c + (0, 0.4);
"\fB  mempool_bucket_ops\fR" textwid 2 with .nw at J.c + (0, 0.4);
"\fB  mempool_dpaa2_ops\fR" textwid 2 with .nw at K.c + (0, 0.4);



line chop 0 chop 0 from B.e to J.w ->;
line chop 0 chop 0 from C.e to I.w ->;
line chop 0 chop 0 from D.e to K.w ->;
line chop 0 chop 0 from E.e to H.w ->;
```