## 前言
在 [程序启动顺序引发的血案之 dpdk 进程死锁](https://blog.csdn.net/Longyu_wlz/article/details/124261738) 这篇博客中，我描述了 dpdk 多进程之间共享的用户态锁在临界区被异常杀死后无法再获取到锁的问题。修改的方案是将这些在多个进程之间共享的锁修改为 pthread mutex 互斥锁。

前期的测试验证与代码 review 及集成测试都没有发现异常，最近却发现又出现了死锁的问题。最开始我的想法是现在使用了 mutex 锁，出现了死锁也能够找到是谁占有了锁，问题应该不太困难，实际操作起来却发现有些想当然。

在本文中我将完整地描述这一新死锁问题定位的过程。
## 问题描述
问题的表面现象是某个运行在 docker 容器内的 dpdk 业务程序一直无法启动，使用 gdb 查看调用栈，发现卡在如下位置处：
```c
#0  0x00007ffff14034ed in __lll_lock_wait () from target:/lib64/libpthread.so.0
#1  0x00007ffff13fedcb in _L_lock_883 () from target:/lib64/libpthread.so.0
#2  0x00007ffff13fec98 in pthread_mutex_lock () from target:/lib64/libpthread.so.0
#3  0x00007ffff22267d9 in rte_mutex_lock () from target:/lib64/libdpdk.so
#4  0x00007ffff223835f in malloc_heap_alloc () from target:/lib64/libdpdk.so
#5  0x00007ffff2233337 in rte_malloc_socket () from target:/lib64/libdpdk.so
#6  0x00007ffff223bd1d in rte_service_init () from target:/lib64/libdpdk.so
#7  0x00007ffff22160c1 in rte_eal_init () from target:/lib64/libdpdk.so
#10 0x000000000043e51d in main ()
```
**rte_mutex_lock 函数是对 pthread_mutex_lock** 函数的【封装】，从函数调用栈上看，进程无法正常启动的原因是无法成功获取到 mutex 锁。
## 问题定位过程

### 1. 哪一把锁获取不到？
相关代码如下：
```c
/* this will try lower page sizes first */
static void *
malloc_heap_alloc_on_heap_id(const char *type, size_t size,
		unsigned int heap_id, unsigned int flags, size_t align,
		size_t bound, bool contig)
{
	struct rte_mem_config *mcfg = rte_eal_get_configuration()->mem_config;
	struct malloc_heap *heap = &mcfg->malloc_heaps[heap_id];
	unsigned int size_flags = flags & ~RTE_MEMZONE_SIZE_HINT_ONLY;
	int socket_id;
	void *ret;

	rte_spinlock_lock(&(heap->lock));
```
确认是获取不到 rte_mem_config 中某个 malloc_heaps 的多进程共享锁。
### 2. 获取不到的锁到底是被谁占用的？
编译相同版本的 dpdk-procinfo 调试获取到如下信息：

```c
(gdb) bt
#0  0x00007ffff6eacbfc in __lll_lock_wait () from /usr/local/lib/libpthread.so.0
#1  0x00007ffff6ea84df in _L_lock_520 () from /usr/local/lib/libpthread.so.0
#2  0x00007ffff6ea82df in pthread_mutex_lock () from /usr/local/lib/libpthread.so.0
#3  0x000000000066e3b9 in rte_mutex_lock (mutex=0x3fffdcffd180) at dpdk-19.11/lib/librte_eal/common/eal_common_mcfg.c:93
#4  0x000000000067ff3f in malloc_heap_alloc_on_heap_id (contig=false, bound=0, align=64, flags=0, heap_id=0, size=8192, type=0x3fffdcffa000 "\356o.\001c\001\v\023\004")
    at dpdk-19.11/lib/librte_eal/common/malloc_heap.c:646
#5  malloc_heap_alloc (type=type@entry=0xc02a2e "rte_services", size=8192, socket_arg=<optimized out>, socket_arg@entry=-1, flags=flags@entry=0, align=64, bound=bound@entry=0,
    contig=false) at dpdk-19.11/lib/librte_eal/common/malloc_heap.c:724
#6  0x000000000067af17 in rte_malloc_socket (type=type@entry=0xc02a2e "rte_services", size=size@entry=8192, align=align@entry=64, socket_arg=<optimized out>, socket_arg@entry=-1)
    at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:60
#7  0x000000000067afa5 in rte_zmalloc_socket (type=type@entry=0xc02a2e "rte_services", size=size@entry=8192, align=align@entry=64, socket=socket@entry=-1)
    at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:79
#8  0x000000000067afba in rte_zmalloc (type=type@entry=0xc02a2e "rte_services", size=size@entry=8192, align=align@entry=64)
    at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:99
#9  0x000000000067afee in rte_calloc (type=type@entry=0xc02a2e "rte_services", num=num@entry=64, size=size@entry=128, align=align@entry=64)
    at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:117
#10 0x00000000006838fd in rte_service_init () at dpdk-19.11/lib/librte_eal/common/rte_service.c:84
#11 0x000000000065dca1 in rte_eal_init (argc=<optimized out>, argv=<optimized out>) at dpdk-19.11/lib/librte_eal/linux/eal/eal.c:1266
#12 0x0000000000558a1c in main (argc=6, argv=0x7fffffffe8c8) at dpdk-19.11/app/proc-info/main.c:1771
(gdb) frame 3
#3  0x000000000066e3b9 in rte_mutex_lock (mutex=0x3fffdcffd180) at dpdk-19.11/lib/librte_eal/common/eal_common_mcfg.c:93
93      dpdk-19.11/lib/librte_eal/common/eal_common_mcfg.c: No such file or directory.
(gdb) print mutex
$1 = (pthread_mutex_t *) 0x3fffdcffd180
(gdb) print *mutex
$2 = {__data = {__lock = 2, __count = 0, __owner = 14901, __nusers = 1, __kind = 0, __spins = 0, __list = {__prev = 0x0, __next = 0x0}},
  __size = "\002\000\000\000\000\000\000\000\065:\000\000\001", '\000' <repeats 26 times>, __align = 2}
```
由于我对 mutex 中不同结构的含义并不清楚，我先在本地写了一个简单的 demo，然后观察占有了锁之后 mutex 一些字段的含义，确认 **__owner** 字段表示【占有锁的线程、进程 id】。

于是能够确认这把锁被 **14901** 线程持有，然而这个线程在系统中**并不存在**，也没有看到其它的异常信息，表明这个进程早已经被 kill 掉了。

### 3. gdb 查看 rte_mem_config 文件的内容
曾经定位过一个 rte_mem_config文件内容被破坏导致死锁的问题，此后每次都会先确认下 rte_mem_config 文件的内容是否正常。于是用 gdb 打印相关信息，部分摘录如下：

```c
(gdb) print /x  *rte_config->mem_config
$9 = {
  magic = 0x12e6fee,
  version = 0x130b0163,
  nchannel = 0x4,
  nrank = 0x0,
  mlock = {
    __data = {
      __lock = 0x0,
      __count = 0x1,
      __owner = 0x0,
      __nusers = 0x0,
      __kind = 0x90,
      __spins = 0x0,
      __list = {
        __prev = 0x0,
        __next = 0x0
      }
    },
    __size = {0x0, 0x0, 0x0, 0x0, 0x1, 0x0 <repeats 11 times>, 0x90, 0x0 <repeats 23 times>},
    __align = 0x100000000
  },
.................................................................
  memzones = {
    name = {0x6d, 0x65, 0x6d, 0x7a, 0x6f, 0x6e, 0x65, 0x0 <repeats 57 times>},
    count = 0x27,
    len = 0xa00,
    elt_sz = 0x48,
    data = 0x3fffdd000000,
    rwlock = {
      __data = {
        __lock = 0x0,
        __count = 0x1,
        __owner = 0x0,
        __nusers = 0x0,
        __kind = 0x90,
        __spins = 0x0,
        __list = {
          __prev = 0x0,
          __next = 0x0
        }
      },
      __size = {0x0, 0x0, 0x0, 0x0, 0x1, 0x0 <repeats 11 times>, 0x90, 0x0 <repeats 23 times>},
      __align = 0x100000000
    }
  },
  memsegs = {{
      {
        base_va = 0x3fffdd200000,
        addr_64 = 0x3fffdd200000
      },
      page_sz = 0x200000,
      socket_id = 0x0,
      version = 0xa1,
      len = 0x400000000,
      external = 0x0,
      heap = 0x1,
      memseg_arr = {
        name = {0x6d, 0x65, 0x6d, 0x73, 0x65, 0x67, 0x2d, 0x32, 0x30, 0x34, 0x38, 0x6b, 0x2d, 0x30, 0x2d, 0x30, 0x0 <repeats 48 times>},
        count = 0x1b,
        len = 0x2000,
        elt_sz = 0x30,
        data = 0x3fffdd02e000,
        rwlock = {
          __data = {
            __lock = 0x0,
            __count = 0x1,
            __owner = 0x0,
            __nusers = 0x0,
            __kind = 0x90,
            __spins = 0x0,
            __list = {
              __prev = 0x0,
              __next = 0x0
            }
          },
          __size = {0x0, 0x0, 0x0, 0x0, 0x1, 0x0 <repeats 11 times>, 0x90, 0x0 <repeats 23 times>},
          __align = 0x100000000
        }
      }
    }
 ..................................................
  malloc_heaps = {{
      lock = {
        __data = {
          __lock = 0x2,
          __count = 0x0,
          __owner = 0x3a35,
          __nusers = 0x1,
          __kind = 0x0,
          __spins = 0x0,
          __list = {
            __prev = 0x0,
            __next = 0x0
          }
        },
        __size = {0x2, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x35, 0x3a, 0x0, 0x0, 0x1, 0x0 <repeats 27 times>},
        __align = 0x2
      },
.....................................................................
```
初次浏览并没有发现啥异常，但其实问题已经隐含在上面收集的信息里了，这里容我先卖个关子，这样才更贴切定位此问题的真实过程。
### 4. 还能做些什么？
定位到这一步，尽管能够确定锁确实是被其它进程占用而无法被获取到，但占用进程早已经**消失得无影无踪**，只留下个无用的现场根本定位不了问题。于是我判断已经啥都做不了了，只能先恢复环境继续测试了。

同时我想到了如下几个问题：
1. 需要确定占着锁的进程到底是哪个，重新复现问题，复现前不断 ps aux 保存结果，问题复现后即可以判断是哪个程序没有释放
	
	做这个测试的目的主要是为了缩小范围，却并不能一次就定位到问题。
2. 前期对锁异常回收的验证过程是否存在问题？
	前期各种临界区异常退出都测试过，均测试通过，存在问题的概率很小。
## 问题出现几次后发现的关键信息
此后，问题又复现了几次，每次复现时，我基本上都查看类似的信息，查看了几次后，我突然发现了一个明显的问题——malloc_heaps 中的 mutex lock 的 **__kind** 字段为 0x0，而其它类似的 **mutex lock** 的 **__kind** 字段为 **0x90**。重新翻了下几次复现时收集到的信息，发现都有这个特征。上文中卖的关子到此揭晓。

具体的对比如下：
```c
   rwlock = {
          __data = {
            __lock = 0x0,
            __count = 0x1,
            __owner = 0x0,
            __nusers = 0x0,
            __kind = 0x90,
            __spins = 0x0,
            __list = {
              __prev = 0x0,
              __next = 0x0
            }

malloc_heaps = {{
      lock = {
        __data = {
          __lock = 0x2,
          __count = 0x0,
          __owner = 0x3a35,
          __nusers = 0x1,
          __kind = 0x0,
          __spins = 0x0,
          __list = {
            __prev = 0x0,
            __next = 0x0
          }
        },
```
当时我在尝试用 mutex 替换 dpdk 多进程之间用户态锁时曾经分析过 **__kind** 这个字段，确定它是**在设置 mutex 属性的时候被赋值**。

对于 dpdk 多进程共享锁的场景，**初始化 mutex 锁的时候需要设定 PTHREAD_PROCESS_SHARED 与 PTHREAD_MUTEX_ROBUST 属性**，正常的 **__kind** 应该是 **0x90**。

在这个问题里这把 mutex 锁【未初始化】就被使用，它不支持异常回收，这样在获取到这把锁后没有释放锁进程就被异常杀死时就会导致其它需要再次获取这把锁的进程死锁。

## 存在问题的代码在哪里？
阅读代码，确认如下 dpdk 代码存在问题：

```c
int
rte_eal_malloc_heap_init(void)
{
	struct rte_mem_config *mcfg = rte_eal_get_configuration()->mem_config;
	unsigned int i;

	if (internal_config.match_allocations) {
		RTE_LOG(DEBUG, EAL, "Hugepages will be freed exactly as allocated.\n");
	}

	if (rte_eal_process_type() == RTE_PROC_PRIMARY) {
		/* assign min socket ID to external heaps */
		mcfg->next_socket_id = EXTERNAL_HEAP_MIN_SOCKET_ID;

		/* assign names to default DPDK heaps */
		for (i = 0; i < rte_socket_count(); i++) {
			struct malloc_heap *heap = &mcfg->malloc_heaps[i];
			char heap_name[RTE_HEAP_NAME_MAX_LEN];
			int socket_id = rte_socket_id_by_idx(i);

			snprintf(heap_name, sizeof(heap_name),
					"socket_%i", socket_id);
			strlcpy(heap->name, heap_name, RTE_HEAP_NAME_MAX_LEN);
			heap->socket_id = socket_id;
		}
	}
.............................................................
```
dpdk 原生使用 **spinlock** 保护 **malloc_heaps** 结构，**spinlock** 的初始化值为 0。由于 rte_mem_config 中 malloc_heaps 所有字段的初值就是 0，所以它并没有显示调用 rte_spinlock_init 函数来初始化 spinlock，**而rte_spinlock_init 本身就会将 spinlock cnt 值初始化为 0，没有初始化也不影响正常执行。**

但是当把 **spinlock** 换为 **mutex** 时就【必须初始化】，不然锁【不能回收】，这样进程在临界区中被杀掉就会导致死锁，这就是本文所描述问题的根本原因。

## 本地模拟问题
将 dpdk 代码修改如下：

```c
Index: lib/librte_eal/common/malloc_heap.c
===================================================================
--- lib/librte_eal/common/malloc_heap.c
+++ lib/librte_eal/common/malloc_heap.c
@@ -645,6 +645,12 @@
+#ifndef F_OK
+#define F_OK 0
+#endif
+       if((access("/tmp/abnormal_exit", F_OK)) != -1) {
+               exit(-1);
+       }

        align = align == 0 ? 1 : align;
```

测试步骤：

1. 重新编译 dpdk 后运行 l2wd
2. 创建 /tmp/abnormal_exit
3. 运行 dpdk-procinfo
4. 重新运行 dpdk-procinfo

dpdk-procinfo 测试过程记录如下：

```c
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# touch /tmp/abnormal_exit
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# ./dpdk-procinfo -- --stats
EAL: Detected 8 lcore(s)
EAL: Detected 1 NUMA nodes
EAL: Multi-process socket /var/run/dpdk/rte/mp_socket_3885_1494910686fd8
EAL: Selected IOVA mode 'PA'
EAL: Probing VFIO support...
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# gdb --args ./dpdk-procinfo -- --stats
GNU gdb (Debian 10.1-1.7) 10.1.90.20210103-git
...........................................................................
Reading symbols from ./dpdk-procinfo...
(gdb) start
...........................................................................
(gdb) c
Continuing.
EAL: Detected 8 lcore(s)
EAL: Detected 1 NUMA nodes
[New Thread 0x7ffff77e3700 (LWP 3905)]
EAL: Multi-process socket /var/run/dpdk/rte/mp_socket_3901_1494f794ad440
[New Thread 0x7ffff6fe2700 (LWP 3906)]
EAL: Selected IOVA mode 'PA'
EAL: Probing VFIO support...
^C
Thread 1 "dpdk-procinfo" received signal SIGINT, Interrupt.
__lll_lock_wait (futex=futex@entry=0x3ffe92ffd180, private=0) at lowlevellock.c:52
52      lowlevellock.c: No such file or directory.
(gdb) bt
#0  __lll_lock_wait (futex=futex@entry=0x3ffe92ffd180, private=0) at lowlevellock.c:52
#1  0x00007ffff79d5843 in __GI___pthread_mutex_lock (mutex=mutex@entry=0x3ffe92ffd180) at ../nptl/pthread_mutex_lock.c:80
#2  0x000000000066e3b9 in rte_mutex_lock (mutex=mutex@entry=0x3ffe92ffd180)
    at dpdk-19.11/lib/librte_eal/common/eal_common_mcfg.c:93
#3  0x000000000067ff51 in malloc_heap_alloc_on_heap_id (contig=false, bound=0, align=64, flags=0, heap_id=0, size=8192,
    type=0x3ffe92ffd180 "\002") at dpdk-19.11/lib/librte_eal/common/malloc_heap.c:646
#4  malloc_heap_alloc (type=type@entry=0xc02a7e "rte_services", size=8192, socket_arg=<optimized out>, socket_arg@entry=-1,
    flags=flags@entry=0, align=64, bound=bound@entry=0, contig=false)
    at dpdk-19.11/lib/librte_eal/common/malloc_heap.c:730
#5  0x000000000067af17 in rte_malloc_socket (type=type@entry=0xc02a7e "rte_services", size=size@entry=8192, align=align@entry=64,
    socket_arg=<optimized out>, socket_arg@entry=-1)
    at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:60
#6  0x000000000067afa5 in rte_zmalloc_socket (type=type@entry=0xc02a7e "rte_services", size=size@entry=8192, align=align@entry=64,
    socket=socket@entry=-1) at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:79
#7  0x000000000067afba in rte_zmalloc (type=type@entry=0xc02a7e "rte_services", size=size@entry=8192, align=align@entry=64)
    at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:99
#8  0x000000000067afee in rte_calloc (type=type@entry=0xc02a7e "rte_services", num=num@entry=64, size=size@entry=128,
    align=align@entry=64) at dpdk-19.11/lib/librte_eal/common/rte_malloc.c:117
#9  0x000000000068392d in rte_service_init ()
    at dpdk-19.11/lib/librte_eal/common/rte_service.c:84
#10 0x000000000065dca1 in rte_eal_init (argc=<optimized out>, argv=<optimized out>)
    at dpdk-19.11/lib/librte_eal/linux/eal/eal.c:1266
#11 0x0000000000558a1c in main (argc=6, argv=0x7fffffffe5b8)
    at dpdk-19.11/app/proc-info/main.c:1771

(gdb) frame 2
#2  0x000000000066e3b9 in rte_mutex_lock (mutex=mutex@entry=0x3ffe92ffd180)
    at dpdk-19.11/lib/librte_eal/common/eal_common_mcfg.c:93
93      dpdk-19.11/lib/librte_eal/common/eal_common_mcfg.c: No such file or directory.
(gdb) print *mutex
$1 = {__data = {__lock = 2, __count = 0, __owner = 3885, __nusers = 1, __kind = 0, __spins = 0, __list = {__prev = 0x0, __next = 0x0}},
  __size = "\002\000\000\000\000\000\000\000-\017\000\000\001", '\000' <repeats 26 times>, __align = 2}
```
通过控制 **/tmp/abnormal_exit** 文件的创建触发临界区异常退出，退出后重新运行 **dpdk-procinfo** 程序确认能够复现出与本文描述的问题完全一样的现象，而此时 **3885** 进程已经不存在，锁不能释放。

## 修改代码测试
测试代码示例如下：
```c
Index: lib/librte_eal/common/malloc_heap.c
===================================================================
--- lib/librte_eal/common/malloc_heap.c
+++ lib/librte_eal/common/malloc_heap.c
@@ -645,6 +645,12 @@
+#ifndef F_OK
+#define F_OK 0
+#endif
+       if((access("/tmp/abnormal_exit", F_OK)) != -1) {
+               exit(-1);
+       }

        align = align == 0 ? 1 : align;

@@ -1391,6 +1397,11 @@
                                        "socket_%i", socket_id);
                        strlcpy(heap->name, heap_name, RTE_HEAP_NAME_MAX_LEN);
                        heap->socket_id = socket_id;
+                       rte_mutex_init(&heap->lock);
                }
        }
```
核心修改是在**初始化 malloc_heaps 的时候调用 rte_mutex_init 函数初始化 mutex 互斥锁**。

重新编译 l2fwd 与 dpdk-procinfo 进行测试，测试步骤如下：

1. 运行 l2wd
2. 创建 /tmp/abnormal_exit
3. 运行 dpdk-procinfo
4. 删除 /tmp/abnormal_exit 文件并重新运行 dpdk-procinfo

第四步 dpdk-procinfo 能够正常运行表明锁被释放，问题得到修复！测试过程记录如下：
```c
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# rm -rf /tmp/abnormal_exit
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# touch /tmp/abnormal_exit
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# ./dpdk-procinfo -- --stats
EAL: Detected 8 lcore(s)
EAL: Detected 1 NUMA nodes
EAL: Multi-process socket /var/run/dpdk/rte/mp_socket_3936_14a881225806c
EAL: Selected IOVA mode 'PA'
EAL: Probing VFIO support...
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# rm -rf /tmp/abnormal_exit
root@debian:/home/longyu/dpdk-19.11-mutex-lock-test# ./dpdk-procinfo -- --stats
EAL: Detected 8 lcore(s)
EAL: Detected 1 NUMA nodes
EAL: Multi-process socket /var/run/dpdk/rte/mp_socket_3946_14a91b7d40de5
EAL: Selected IOVA mode 'PA'
EAL: Probing VFIO support...
EAL: PCI device 0000:00:11.0 on NUMA socket -1
EAL:   Invalid NUMA socket, default to 0
EAL:   probe driver: 8086:100f net_e1000_em
EAL: PCI device 0000:00:12.0 on NUMA socket -1
EAL:   Invalid NUMA socket, default to 0
EAL:   probe driver: 8086:100f net_e1000_em
EAL: PCI device 0000:00:13.0 on NUMA socket -1
EAL:   Invalid NUMA socket, default to 0
EAL:   probe driver: 8086:100f net_e1000_em

  ######################## NIC statistics for port 0  ########################
............................................................
```
当程序未释放锁退出后，重新运行 dpdk-procinfo 程序能够获得锁，测试通过！

## 是否有其它类似问题？
review 代码，相关的问题只有一处，其它位置正常初始化。
## 总结
尽管本文描述的问题听上去有些高大上，可真正触发问题的点却非常小，尽管它小却也说明了一些关键的问题。

在编码的时候尽量【不做隐式地假设】，这种假设带来了非常差的扩展性，当其他人改造存在假设的代码时不容易发现这些依赖就可能带来严重的后果。

除了正向解决这个问题之外，从反面来看其实需要在测试的时候审视相关【修改的一致性】，即运行时**特征字段值的一致性**，而不是只验证功能。拿本文描述的问题来说，就是不同的 mutex 的 __kind 字段的值是否一致。

