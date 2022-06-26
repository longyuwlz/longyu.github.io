# 多进程模型共享收发包队列问题
## dpdk 多进程模型
dpdk 原生支持**多进程模型**，主进程为 **primary** 进程，**只有一个**，从进程为 **secondary** 进程，可以有多个。

dpdk 业务口的**共享数据结构**，如收发包队列，驱动内部的数据结构等由 **primary** 进程创建，**secondary** 进程通过与 **primary** 进程**共享内存**来 attach 到相应的数据结构上。

实际场景中，primary 进程完成**接口配置、并提供接口控制如接口 up、down、接口状态检测等功能**，**secondary 进程可以用于 dump primary 进程创建的一些共享数据结构**，**也可以用于收发包以及基于报文的一些处理逻辑**。

本文中描述的问题为 secondary 进程共享 primary 进程的收发队列收发包时出现**段错误**的问题。

## 问题描述
**业务口类型**：virtio 虚拟网卡
**业务模型**：多进程模型，secondary 进程用于收发包，收发包时出现段错误。
**dpdk 版本**：dpdk-16.11

**段错误信息：**
```cpp
Thread 6 "lcore-slave-0" received signal SIGSEGV, Segmentation fault.
[Switching to LWP 23400]
0x00007ffff69b5a4d in virtio_recv_mergeable_pkts () from libdpdk.so
(gdb) bt
#0  0x00007ffff69b5a4d in virtio_recv_mergeable_pkts () from libdpdk.so\
#1  0x000000000042c291 in dpdk_recv() ()
#2  0x00000000004158e6 in process_launch(void*) ()
#3  0x00007ffff67ea297 in eal_thread_loop () from libdpdk.so
#4  0x00007ffff5c96da4 in start_thread () from /usr/local/lib/libpthread.so.0
#5  0x00007ffff59c820d in clone () from /usr/local/lib/libc.so.6
```

**复现概率**：必现！

## 编译 debug 版本确定段错误的位置
确定在如下函数中触发段错误：

```cpp
static inline void
virtqueue_notify(struct virtqueue *vq)
{
	/*
	 * Ensure updated avail->idx is visible to host.
	 * For virtio on IA, the notificaiton is through io port operation
	 * which is a serialization instruction itself.
	 */
	vq->hw->vtpci_ops->notify_queue(vq->hw, vq);
}
```
secondary 进程中接口的 hw 数据结构从 primary 进程共享，primary 进程中的 **vtpci_ops->notify_queue** **函数指针**在 **secondary** **进程中指向一个非法位置，导致段错误**。

## 真正的问题

primary 进程与 secondary 进程共享的队列信息中，**共享的内容为数据结构**，**不共享代码段。**

primary 进程中函数指针指向的函数在 secondary 进程中指向其它非法位置，导致段错误。

## 修复方案

在接口初始化的时候，根据 hw->modern 的值**配置某函数指针**，将 virtio 收发包函数中调用到的 **vtpci_ops->notify_queue** 函数指针改为**调用程序本地的函数指针**，此指针指向的代码段在每个程序内部是合法的，它的地址不通过队列共享获取。

简单示例如下：

```c
--- virtqueue.h (revision 51811)
+++ virtqueue.h (working copy)
@@ -330,7 +330,13 @@
         * For virtio on IA, the notificaiton is through io port operation
         * which is a serialization instruction itself.
         */
-       vq->hw->vtpci_ops->notify_queue(vq->hw, vq);

+       vtpci_notify_queue(vq->hw, vq);
 }
```

## 问题引申
dpdk 多进程收发队列共享存在限制，不能共享代码段，只能共享数据区域，对于**共享函数指针的情况，会在其他进程中触发段错误**。
