# 程序启动顺序引发的血案之 dpdk 进程死锁
## 前言
在 [程序启动顺序引发的血案](https://editor.csdn.net/md/?articleId=124258534) 这篇文章中，我描述了在某个场景中由启动顺序引发的程序无法启动的问题。问题的表象如下：

容器内的 dpdk secondary 进程初始化报了如下错误：
```bash
EAL: Detected 16 lcore(s)
EAL: Detected 1 NUMA nodes
EAL: Multi-process socket /var/run/dpdk/rte/mp_socket
EAL: Selected IOVA mode 'PA'
EAL: Probing VFIO support...
EAL: error allocating rte services array
EAL: FATAL: rte_service_init() failed
EAL: rte_service_init() failed
EAL: Error - exiting with code: 1
  Cause: Invalid EAL arguments
```
报了上面的错误后涉案 dpdk secondary 进程没有直接退出，而是继续向下执行，然后调用了 rte_ring_lookup 接口来 attach 到 primary 进程中创建的 ring 中。

此时由于 hugepage 映射问题，在 rte_ring_lookup 中触发了段错误，相关代码如下：
```c
414     rte_mcfg_tailq_read_lock();
415 
416     TAILQ_FOREACH(te, ring_list, next) {
417         r = (struct rte_ring *) te->data;
418         if (strncmp(name, r->name, RTE_RING_NAMESIZE) == 0)
419             break;
420     }
421 
422     rte_mcfg_tailq_read_unlock();
423 
```
在遍历 ring_list 的时候触发了段错误，段错误的原因的确是 /dev/hugepages 映射异常。

表面看来问题很明确，但是由于此时正好处于临界区内，下一次再重新运行的时候会在 rte_eal_init 中获取 tailq 锁的时候卡住，同时由于 mcfg 的 tailq lock 在 dpdk 多进程之间共享，也间接的影响到了其它 dpdk 程序的正常运行，产生死锁现象，问题影响进一步扩大。

## dpdk 内部对读写锁的使用场景
dpdk 架构支持**多进程模型**，一个独立的**内存配置**支持一个 **primary** 进程与多个 **secondary** 进程，这些进程间共享 dpdk 核心数据结构的示意图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/109cca7ed65a4b5da134168f8c2217f1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

上图中，两个框中重叠的部分被多个进程共享，底层内存**基于 hugepage 共享**，dpdk 在 hugepage 上实现了内存操作接口，调用这些接口申请的内存理论上均可以在 **dpdk primary** 进程与 **secondary** 进程之间**共享**。

为了实现这种共享，dpdk 使用了 **rte_config** 结构来**描述**在大页上分配的共享内存信息，primary 进程与 secondary 进程通过 mmap 相同的文件来实现 rte_config 结构的共享。

真实的使用场景中，primary 进程主要负责**创建共享内存结构**，创建共享内存结构需要**更新 rte_config 结构中的特定字段**，而 secondary 进程通过 rte_config 结构来 **loookup** 到相关的结构来使用。就原理上来说，dpdk 并没有限定非要在 primary 进程中创建共享内存结构，secondary 也可以创建内存结构。

由于 primary 进程与 secondary 进程独立运行， rte_config 代表的这块共享内存需要在多进程间做互斥保护，新的 dpdk 版本中通过使用内部实现的读写锁来完成。

## dpdk 内部的读写锁与死锁问题
dpdk 内部实现的读写锁的机制如下：

1. 一把锁由一个定义为 volatile 的计数值描述，定义为 volatile 限定每次都从内存中读取此计数值
2. 计数值为 0 表明没有人占有锁，计数值大于 0 表明有读者占用，计数值小于 0 表明有写者占用
3. 获取读锁通过原子操作给计数值加 1，获取写锁通过原子操作给计数值减 1
4. 获取写锁的时候不能有人读、写，获取读锁的时候不能有人写，条件不成立则一直重试

**获取写锁的一个简单流程如下：**

1. 使用原子操作加载锁计数到局部变量 x 中
2. 判断 x 是否为 0，如果不为 0 则继续重试
3. 当 x 为 0 时表明此时没有人占有锁，使用原子操作保证锁计数等于 x 值时对 CNT 的值减 1，操作失败则重试

**获取读锁的一个简单流程如下：**

1. 使用原子操作加载锁计数到局部变量 x 中
2. 判断 x 是否小于 0，小于 0 则继续重试
3. 当 x 大于等于 0 时，使用原子操作保证锁计数等于 x 值时对 CNT 的值加 1，操作失败则重试


dpdk 的读写锁实现至少有下面几个优点：

1.  在频繁读不频繁写的场景下有很好的性能
2. 锁机制的申请与释放在用户态执行，避免了陷入内核带来的性能影响

在上文的描述中，可以看出 dpdk 实现的读写锁实际是一种**用户态的锁**。当这种锁在多进程间共享时，某个 dpdk 程序在临界区内**没有成功释放锁就因为某种异常情况而退出**，就会造成其它进程无法获取到同一把锁，触发潜在的**死锁问题**。

这种异常情况主要包含两个方面：

1. dpdk 程序在临界区中间可能被强制杀死
2. dpdk 程序在临界区中间可能触发异常如段错误等而直接退出

当上述异常情况出现时就可能会触发死锁，根本原因在于 **dpdk 程序在临界区内异常退出导致锁不被释放，后续重新获取锁的时候会一直失败，表现为死锁。**

这个问题也不局限于读写锁，当 dpdk 内部的自旋锁在多进程之间共享时也存在相同的问题。
## 提问环节
### 1. dpdk 高版本有没有相关改进？
git 更新最新的 dpdk 版本，阅读锁相关的代码，没有相关的修改。
### 2. 网上是否有相关的问题有解决方案
关键词：“dpdk userspace rwlock deadlock”

搜索结果：无相关内容。

关键词：How can a process gracefully recover from a process crashing while holding a rwlock?

对搜索结果进行整理，有如下两个初步的结论：

1. 读写锁由于存在多**个读者同时读取**的情况，现有的实现中没有临界区异常退出锁回收机制
2. pthread mutex 互斥锁可以设置一个 **robust** 属性以支持在进程临界区内异常退出时**回收锁**

根据收集的信息看，要在读写锁上做异常回收是非常复杂的，可能需要引入一把新的锁，将读写锁降级为互斥锁问题就简化了，尽管性能会有所下降。
## 一些解决方案的尝试
### 1. 使用其它锁、信号量来替换

梳理 linux 系统提供的一些锁，不同锁的支持情况见如下表格：

| 锁名称 | 支持多线程共享 | 支持多进程共享 | 支持异常回收 | 必须陷入内核 |
| --- | --- | --- | --- | --- |
| pthread mutex | yes | yes | yes | 否 |
| pthread rwlock | yes | yes | no |  -|
| BSD locks | yes | yes | yes | 是 |
| lockf function | no | yes | yes | 是 |
| POSIX record locks | no | yes | yes | 是 |
| Open file description locks | yes | yes | yes | 是 |
| System V Sempahore | yes | yes | yes | 是 |
| POSIX Semaphore | yes | yes | no | 是 |

文件锁更为具体的一些特征（摘自 [https://gavv.github.io/articles/file-locks/](https://gavv.github.io/articles/file-locks/)）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/cad9d97290bb4761bab2883b0143805f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
文件锁的主要特征总结如下：
1. 均支持进程异常终止时内核回收
2. 均支持共享与互斥两种模式
3. 与 fd 强相关，多线程使用需要谨慎处理
4. 通过系统调用实现，必须陷入内核

根据上面的表格，首先排除掉不能在多线程之间共享的锁与不支持异常回收的锁，剩下的锁有如下几个：
1. pthread mutex
2. BSD locks 
3. Open file description locks
4. System V Sempahore

在上面四个锁中，pthread mutex 只有当获取不到锁的时候才会陷入内核，而其它的锁每次都会陷入内核，同时考虑文件锁与 System V 信号量在多线程之间相对复杂，故而优先选择 pthread_mutex。

### 2. 使用 pthread mutex 锁替换 dpdk 多进程间共享的读写锁的实现方案
1. 确定 dpdk 内会在多进程之间共享的锁，集中在 rte_config 结构中
2. 将找到的这些锁修改为 pthread mutex 锁，在初始化 pthread mutex 锁的时候设定 PTHREAD_PROCESS_SHARED 与 PTHREAD_MUTEX_ROBUST 属性以支持在多进程间共享且支持异常回收
3. 修改这些共享锁的 lock 与 unlock 代码，核心在于执行 pthread_mutex_lock 并在返回值为 EOWNERDEAD 的时候执行 pthread_mutex_consistent 重新回收并占有锁

## 3. 修改 dpdk 内部锁实现，实现异常恢复
基于 dpdk 内部 spinlock 开发记录进程 pid 与死锁状态的自定义锁来替换，自定义锁的工作流程如下：
  1. 获取 spinlock 前先获取进程 pid，成功获取到 spinlock 后使用进程 pid 更新自定义锁中的 pid 字段
   2. 申请自定义锁时判断锁的 deadlock 状态是否为真，为真则直接获取到锁，获取后将 deadlock 状态设置为假
   3. 使用 sigaction 注册 SIGTERM 与 SIGSEGV 信号处理函数，在信号处理函数中判断自定义锁的 pid 是否与当前进程 pid 一致，一致则设定自定义锁 deadlock 状态为真。
4. 将 dpdk rte_config 中的 rwlock 修改为上述自定义 spinlock，
5. 约束不能使用 kill -9 强制杀死程序

存在的问题：

1. 在获取 spinlock 与记录进程 pid 之间跳转到 SIGTERM、SIGSEGV 信号处理函数时，无法检测到死锁（概率非常小）
2. 性能有所下降

引申的问题：用户态程序无法保证不被中断，更新自定义锁中的字段：pid、deadlock 的过程与获取锁的过程中可能被中断，导致判断失效，所以此方案不能从根本上解决问题。

## 基于 dpdk-19.11 实施 pthread mutex 锁替换方案遇到的问题
1. 需要修改 rwlock 与 spinlock 的实现吗？
	这里的场景是多进程之间共享 rwlock 与 spinlock，需要修改的是这些共享的锁而非锁机制本身。
2. lock 已经 lock 成功的 pthread mutex 卡住的问题

修改完成后测试发现 dpdk 程序初始化卡在如下堆栈处：
```c
#1  0x00000000006ea099 in rte_mutex_lock ()
#2  0x00000000006ebaa1 in rte_memseg_list_walk ()
#3  0x00000000006e53f0 in eal_memalloc_init ()
#4  0x00000000006eb43e in rte_eal_memory_init ()
#5  0x00000000006da785 in rte_eal_init ()
#6  0x00000000004b0d1a in main ()
```
rte_mutex_lock 是底层封装的调用 pthread_mutex_lock 的接口。排查发现这里卡住的原因是获取了已经获取到的同一把 mutex 互斥锁。

搜索了下 pthread mutex 可以配置递归 lock 参数，但是测试确定在多次获取同一把 mutex 后在临界区中异常退出时内核不能回收锁，需要修改代码，将 rte_memseg_list_walk 替换为 rte_memseg_list_walk_thread_unsafe，修改点涉及几处同时也走查了其它锁，没有发现相同的现象。
## 对 pthread mutex 锁回收机制的一些粗浅认识
初步的研究确定，它使用内核 robust_list 来保障程序退出时占有互斥锁检测的可靠性（不可中断性），内核在执行 do_exit 释放进程资源的时候会判断是否占有了 mutex 并设置相关的标记字段。

内核做上述判断需要依赖申请锁时记录的信息，而记录这些信息的过程与获取锁的过程仍旧存在一个窗口，pthread mutex 通过 glibc 与内核协同实现，保证了这一机制的可靠性。
 
真实的过程更复杂一些，在后续的文章中再来描述！

## 参考链接
[https://stackoverflow.com/questions/51956715/robust-rwlock-in-posix](https://stackoverflow.com/questions/51956715/robust-rwlock-in-posix)

[https://pgtux.wordpress.com/2014/08/12/linux-what-happens-if-process-crashes-while-holding-a-shared-lock/](https://pgtux.wordpress.com/2014/08/12/linux-what-happens-if-process-crashes-while-holding-a-shared-lock/)

[https://gavv.github.io/articles/file-locks/](https://gavv.github.io/articles/file-locks/)

[https://www.gnu.org/software/libc/manual/html_node/Open-File-Description-Locks-Example.html#Open-File-Description-Locks-Example](https://www.gnu.org/software/libc/manual/html_node/Open-File-Description-Locks-Example.html#Open-File-Description-Locks-Example)

[https://docs.kernel.org/locking/robust-futexes.html](https://docs.kernel.org/locking/robust-futexes.html)


