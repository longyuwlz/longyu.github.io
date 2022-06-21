# 问题描述

在某系统中，运行原生 dpdk 示例程序会报如下错误：

```bash
EAL: pthread_setaffinity_np failed
PANIC in eal_thread_loop():
cannot set affinity
```
将当前进程的 cgroup 切换为系统默认的 cgroup 组就能够解决此问题，但是**为什么要这样做呢？本篇文章中我将对这个问题进行描述。**

# strace 跟踪程序执行
strace 跟踪，得到如下相关信息：

```bash
[pid 20758] sched_setaffinity(20758, 128, [1] <unfinished ...>
[pid 20750] close(12 <unfinished ...>
[pid 20758] <... sched_setaffinity resumed> ) = 0
[pid 20750] <... close resumed> )       = 0
[pid 20758] access("/sys/devices/system/node/node0/cpu1", F_OK <unfinished ...>
[pid 20750] pipe( <unfinished ...>
[pid 20758] <... access resumed> )      = 0
[pid 20750] <... pipe resumed> [12, 13]) = 0
[pid 20758] access("/sys/devices/system/node/node0/cpu1", F_OK <unfinished ...>
[pid 20750] pipe( <unfinished ...>
[pid 20758] <... access resumed> )      = 0
[pid 20750] <... pipe resumed> [14, 15]) = 0
[pid 20758] write(1, "EAL: lcore 1 is ready (tid=f6902"..., 48 <unfinished ...>
[pid 20750] mmap(NULL, 8392704, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS|MAP_STACK, -1, 0EAL: lcore 1 is ready (tid=f6902700;cpuset=[1])

.........

[pid 20759] gettid( <unfinished ...>
[pid 20760] set_robust_list(0x7ffff59009e0, 24 <unfinished ...>
[pid 20759] <... gettid resumed> )      = 20759
[pid 20760] <... set_robust_list resumed> ) = 0
[pid 20759] sched_setaffinity(20759, 128, [2] <unfinished ...>
[pid 20760] gettid( <unfinished ...>
[pid 20759] <... sched_setaffinity resumed> ) = -1 EINVAL (Invalid argument)
```

上面的内容有两个关键点：

1. 20758 线程设置 cpu 亲和性为 1 核成功
2. 20759 线程设置 cpu 亲和性为 2 失败，sched_setaffinity 系统调用返回值为 EINVAL
3. 两个线程都是通过 sched_setaffinity 线程来设置 cpu 亲和性

sched_setaffinity 系统调用的【返回值】是一个关键信息，man sched_setaffinity 查看返回值的具体含义。

# man sched_setaffinity

```bash
EINVAL The affinity bit mask mask contains no processors that are currently physically on the system and  permitted  to  the
              thread  according  to  any  restrictions that may be imposed by cpuset cgroups or the "cpuset" mechanism described in
              cpuset(7).

EINVAL (sched_getaffinity() and, in kernels before 2.6.9, sched_setaffinity()) cpusetsize is smaller than the  size  of  the
              affinity mask used by the kernel.
```

我这里的情况符合第一种描述，同时确定设置的 cpu 核是存在的，这样问题就指向了 **cpuset(7)**。

# man 7 cpuset

```bash
Every  process  in the system belongs to exactly one cpuset.  A process is confined to run only on the CPUs in the cpuset it
belongs to, and to allocate memory only on the memory nodes in that cpuset.  When a process fork(2)s, the child  process  is
placed  in  the same cpuset as its parent.  With sufficient privilege, a process may be moved from one cpuset to another and
the allowed CPUs and memory nodes of an existing cpuset may be changed.

When the system begins booting, a single cpuset is defined that includes all CPUs and memory nodes on the  system,  and  all
processes  are  in that cpuset.  During the boot process, or later during normal system operation, other cpusets may be cre‐
ated, as subdirectories of this top cpuset, under the control of the system administrator, and processes may  be  placed  in
these other cpusets.
       
Cpusets  are  integrated  with  the sched_setaffinity(2) scheduling affinity mechanism and the mbind(2) and set_mempolicy(2)
memory-placement mechanisms in the kernel.  Neither of these mechanisms let a process make use of a CPU or memory node  that
is  not  allowed by that process's cpuset.  If changes to a process's cpuset placement conflict with these other mechanisms,
then cpuset placement is enforced even if it means overriding these other mechanisms.  The kernel accomplishes this overrid‐
ing  by  silently restricting the CPUs and memory nodes requested by these other mechanisms to those allowed by the invoking
process's cpuset.  This can result in these other calls returning an error, if for example, such a call ends  up  requesting
an empty set of CPUs or memory nodes, after that request is restricted to the invoking process's cpuset.
```

总结得出如下几点关键信息：

1. linux 系统中的每一个进程都归属于【唯一的】一个 cpuset，程序被限定为**只能**在归属 cpuset 组允许的 cpu 上执行，也只能从归属 cpuset 组允许的内存节点申请内存
2. 子进程默认【继承】父进程的 cpuset 配置
3. 系统启动时，包含所有 cpu 核与内存节点的 cpuset 被创建，此时所有的进程都归属于这个 cpuset，其它后续创建的 cpuset 都位于此 cpuset 的子目录中，这个 cpuset 被称为 【top cpuset】
4. 当 cpuset 与其它的 cpu、内存分配机制冲突时，cpuset 配置会默认【覆盖】其它机制的配置，内核会限定进程只能使用所加入的 cpuset 允许的 cpu 核与内存节点

# 重新描述问题

根据上面的信息能够确定问题为**执行的 dpdk 程序所在的 cpuset 不允许程序在 2 号核上执行**。查看父进程归属的 cgroup 内容如下：

```bash
[root-10:10:27:33] # cat /proc/$$/cgroup
11:freezer:/
10:cpu,cpuacct:/
9:pids:/user.slice/user-1000.slice/session-2.scope
8:cpuset:/Isolate_Cpus_Service
7:net_cls,net_prio:/
6:rdma:/
5:memory:/user.slice/user-1000.slice/session-2.scope
4:devices:/user.slice
3:blkio:/
2:perf_event:/
1:name=systemd:/user.slice/user-1000.slice/session-2.scope
0::/user.slice/user-1000.slice/session-2.scope
```

可以看到，父进程归属的 cpuset 为 Isolate_Cpus_Service，此 cpuset 允许执行的 cpu 核如下：

```bash
[root-10:10:27:44] # cat /sys/fs/cgroup/cpuset/Isolate_Cpus_Service/cpuset.cpus
0-1
```

能够确定，**它只允许程序在 0 核跟 1 核执行**，且**内核中 cpuset 的优先级【高于】 sched_setaffinity**，这样使用 sched_setaffinity 设置线程 cpu 亲和性为 2 核的时候就会失败！

# 不修改 dpdk 程序让程序能够执行的方法

有时候不方便修改 dpdk 程序，此时可以通过修改父进程（终端 bash 程序）所属的 cpuset 允许的 cpu 核、将父进程的 cpuset 【切换】为 top cpuset 来解决此问题。

将父进程的 cpuset 切换为 top cpuset，可以执行如下命令：

```bash
echo $$ > /sys/fs/cgroup/cpuset/tasks
```

修改父进程所在的 cpuset 允许的 cpu 核与 top cpuset 一致，可以执行如下命令：

```bash
cat /sys/fs/cgroup/cpuset/cpuset.cpus > /sys/fs/cgroup/cpuset/Isolate_Cpus_Service/cpuset.cpus
```
# 为什么要进行 cpu 隔离

dpdk 程序在进行 2544 测性能的时候，**当收发包线程所在的 cpu 核上有其它用户态进程也被调度运行时就会产生抖动**，从而造成**丢包**，导致 **2544 的性能变差**，为了消除这种影响，需要对用户态程序进行 cpu 隔离。

# cpu 核隔离的对象
cpu 核隔离针对所有的用户态程序，这种隔离的目的是为了**让 dpdk 程序独占某个 cpu 核**。

dpdk 程序【缺省】也是被执行了 cpu 隔离的，为此需要将 dpdk 程序归属的 cpuset 设置为 top cpuset，以**允许** dpdk 程序使用**所有的** cpu 核与内存节点。

# 有没有其它 cpu 隔离的方法？

除了上面的方法外，我们也可以通过内核启动参数来实现，例如在 grub.conf 中，在内核引导参数中添加 isolcpus=xxx 的配置，然后重启系统就能够生效。

但是这种方式的操作成本较高，一旦内核启动参数修改存在问题可能无法进入系统，推荐专业人士操作。