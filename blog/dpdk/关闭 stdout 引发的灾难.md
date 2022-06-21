## 问题描述
2021 年前的 dpdk 版本中默认的 log 为 **stdout**，在实际使用中发现在**调用 rte_eal_init 之前关闭 stdout 时**，dpdk 程序**运行异常**。

表面上看有点匪夷所思，真正研究起来竟然发现在 dpdk 的框架中这个问题算是一个正常的现象，让人忍不住叹了叹气~

在本文中我将探讨下这个正常的异常现象，同时也引申描述一个真实场景中的问题。
## 问题模拟
修改 dpdk-19.11.1 版本 l2fwd 示例程序代码，代码修改如下：

```c
Index: examples/l2fwd/main.c
===================================================================
--- examples/l2fwd/main.c
+++ examples/l2fwd/main.c
@@ -530,6 +530,8 @@
        unsigned int nb_lcores = 0;
        unsigned int nb_mbufs;

+       close(1);
```
运行 l2fwd 后发现程序卡住，卡住的位置与反汇编信息如下：

```c
Thread 1 (Thread 0x7f84b9150440 (LWP 33746) "l2fwd"):
#0  0x0000000000654d59 in rte_eal_memzone_init ()
#1  0x00000000006463a5 in rte_eal_init ()
#2  0x000000000049255c in main ()
(gdb) disass
Dump of assembler code for function rte_eal_memzone_init:
   0x0000000000654d30 <+0>:     push   %rbx
   0x0000000000654d31 <+1>:     sub    $0x10,%rsp
   0x0000000000654d35 <+5>:     call   0x645340 <rte_eal_get_configuration>
   0x0000000000654d3a <+10>:    mov    $0xffffffff,%ecx
   0x0000000000654d3f <+15>:    mov    0x438(%rax),%rbx
   0x0000000000654d46 <+22>:    lea    0x10(%rbx),%rdx
   0x0000000000654d4a <+26>:    mov    (%rdx),%eax
   0x0000000000654d4c <+28>:    test   %eax,%eax
   0x0000000000654d4e <+30>:    mov    %eax,(%rsp)
   0x0000000000654d51 <+33>:    je     0x654d5e <rte_eal_memzone_init+46>
   0x0000000000654d53 <+35>:    pause
   0x0000000000654d55 <+37>:    mov    (%rdx),%eax
   0x0000000000654d57 <+39>:    test   %eax,%eax
=> 0x0000000000654d59 <+41>:    mov    %eax,(%rsp)
   0x0000000000654d5c <+44>:    jne    0x654d53 <rte_eal_memzone_init+35>
   0x0000000000654d5e <+46>:    mov    (%rsp),%eax
   0x0000000000654d61 <+49>:    lock cmpxchg %ecx,(%rdx)
   0x0000000000654d65 <+53>:    jne    0x654da8 <rte_eal_memzone_init+120>
   0x0000000000654d67 <+55>:    call   0x646910 <rte_eal_process_type>
   0x0000000000654d6c <+60>:    test   %eax,%eax
```
将反汇编的结果与源代码比对，确认卡在如下代码处：
```c
	rte_rwlock_write_lock(&mcfg->mlock);
```
此时 ps 检索到 l2fwd 程序的 pid 为 33746，查看 /proc/33746/fd 目录内容，收集到如下关键信息：
```c
root@debian:/home/longyu/# ls -lh /proc/33746/fd/
total 0
lrwx------ 1 root root 64 Apr 20 04:39 0 -> /dev/pts/0
lrwx------ 1 root root 64 Apr 20 04:40 1 -> /run/dpdk/rte/config
lrwx------ 1 root root 64 Apr 20 04:40 2 -> /dev/pts/0
lr-x------ 1 root root 64 Apr 20 04:40 3 -> 'pipe:[173766]'
l-wx------ 1 root root 64 Apr 20 04:40 4 -> 'pipe:[173766]'
lrwx------ 1 root root 64 Apr 20 04:40 5 -> 'anon_inode:[timerfd]'
lrwx------ 1 root root 64 Apr 20 04:40 6 -> 'socket:[173775]'
lrwx------ 1 root root 64 Apr 20 04:40 7 -> 'socket:[173770]'
lrwx------ 1 root root 64 Apr 20 04:40 8 -> 'anon_inode:[eventpoll]'
lr-x------ 1 root root 64 Apr 20 04:40 9 -> /dev/hugepages**
```
可以看到 **/run/dpdk/rte/config** 文件的 fd 为 1，恰好对应关闭的 stdout 描述符。在此基础上，使用 od -c 查看 **/run/dpdk/rte/config** 文件信息如下：
```c
root@debian:/home/longyu/# od -c /run/dpdk/rte/config
0000000   E   A   L   :       P   r   o   b   i   n   g       V   F   I
0000020   O       s   u   p   p   o   r   t   .   .   .  \n  \0  \0  \0
0000040  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0
*
0040300  \0  \0  \0  \0  \0  \0  \0  \0  \0 260 377 276 376   ?  \0  \0
0040320  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0  \0
*
0040400
```
可以看到 **rte_config** 文件最开始的内容变为了 **EAL:Probing VFIO support...**，结合上文中描述的 l2fwd 卡在 **rte_rwlock_write_lock** 的现象，可以明确卡住的原因是获取不到 **mlock** 的写锁。

**rte_config** 文件在 dpdk 中被映射为一个 **rte_mem_config** 结构，此结构的定义如下：
```c
struct rte_mem_config {
	volatile uint32_t magic;   /**< Magic number - sanity check. */
	uint32_t version;
	/**< Prevent secondary processes using different DPDK versions. */

	/* memory topology */
	uint32_t nchannel;    /**< Number of channels (0 if unknown). */
	uint32_t nrank;       /**< Number of ranks (0 if unknown). */

	/**
	 * current lock nest order
	 *  - qlock->mlock (ring/hash/lpm)
	 *  - mplock->qlock->mlock (mempool)
	 * Notice:
	 *  *ALWAYS* obtain qlock first if having to obtain both qlock and mlock
	 */
	rte_rwlock_t mlock;   /**< used by memzones for thread safety. */
```
一个 rte_rwlock_t 的大小是 4 个字节，它由一个 CNT 变量组成。在[程序启动顺序引发的血案之 dpdk 进程死锁](https://blog.csdn.net/Longyu_wlz/article/details/124261738?spm=1001.2014.3001.5501) 这篇文章中，我描述过 dpdk 内部实现的读写锁机制如下：
   1. 一把锁由一个定义为 volatile 的 32 位计数值描述，定义为 volatile 限定每次都从内存中读取此计数值
   2. 计数值为 0 表明没有人占有锁，计数值大于 0 表明有读者占用，计数值小于 0 表明有写者占用
   3. 获取读锁通过原子操作给计数值加 1，获取写锁通过原子操作给计数值减 1
   4. 获取写锁的时候不能有人读、写，获取读锁的时候不能有人写，条件不成立则一直重试

根据此时 **rte_config 文件的内容与 mlock 在 rte_mem_config 中的偏移**，可以确定此时 mlock 中 cnt 的值为 **" sup"**，此值**不为 0** 表明有人占了锁，从而导致获取写锁失败，l2fwd 程序死锁。

### 关闭 stdout 影响到了什么？
在上文中，我通过访问 **/proc** 目录查看到了 l2fwd 运行时 **rte_config** 文件的 fd 为 1，而 stdout 对应的描述符也是 1。

同时我在 dpdk 代码中搜索 **"Probing VFIO support"**，搜索到如下代码：
```c
RTE_LOG(INFO, EAL, "Probing VFIO support...\n");
```
进一步阅读代码确认上述信息将会输出到 stdout 中，而此时由于 stdout 对应的 fd 1 对应的是 rte_config 文件，则 **stdout 的输出内容会输出到 rte_config 文件中**，进而覆盖 **dpdk** 内部 **rte_mem_config** 结构的内容，导致 mlock 字段的值被异常覆盖，导致 dpdk 进程死锁。

这一切的触发因素仅仅是在调用 rte_eal_init 前关闭了 stdout 描述符，而 dpdk 也并没有明确限定不能关闭，难道这是一种潜规则？那为何会有这样的表现呢？

这个问题的表面原因是 dpdk 的内部 log 输出到 stdout，查阅 dpdk git log，发现针对默认的 log 有如下 commit：
```
commit 5988725d0efeb7021670986aafeb3ff3d87839e1
Author: Ferruh Yigit <ferruh.yigit@intel.com>
Date:   Tue Feb 9 15:06:20 2021 +0000

    log/linux: make default output stderr
    
    In Linux by default DPDK log goes to stdout, as well as syslog.
    
    It is possible for an application to change the library output stream
    via 'rte_openlog_stream()' API, to set it to stderr, it can be used as:
    rte_openlog_stream(stderr);
    
    But still updating the default log output to 'stderr'.
    
    Bugzilla ID: 8
    Fixes: af75078fece3 ("first public release")
    Cc: stable@dpdk.org
    
    Reported-by: Alexandre Ferrieux <alexandre.ferrieux@orange.com>
    Signed-off-by: Ferruh Yigit <ferruh.yigit@intel.com>
```
此 commit 将 dpdk 默认 log 设置为 stderr，此时要复现相同的问题，只需要将 close 的描述符改为 stderr 即可！

## 为什么关闭 stdout 会带来如此大的影响呢？
在 [程序启动顺序引发的血案之 dpdk 进程死锁](https://blog.csdn.net/Longyu_wlz/article/details/124261738?spm=1001.2014.3001.5501) 这篇文章中，我描述了 dpdk 内部多进程之间共享的数据结构，核心的结构图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/271474e9e9b54b6cbf480f19fa445641.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_20,color_FFFFFF,t_70,g_se,x_16)rte_config 结构在多个 dpdk 进程之间共享，其核心思想是多个进程 mmap 相同的文件到特定的地址来共享内存。

核心代码如下：
```c
 305     const char *pathname = eal_runtime_config_path();
.........
 310     if (mem_cfg_fd < 0){
 311         mem_cfg_fd = open(pathname, O_RDWR);
.........
 278     mapped_mem_cfg_addr = mmap(rte_mem_cfg_addr,
 279             cfg_len_aligned, PROT_READ | PROT_WRITE,
 280             MAP_SHARED | MAP_FIXED, mem_cfg_fd, 0);
```
代码细节不用赘述。当在执行 rte_eal_init 函数前关闭 stdout 时，内核回收 1 号描述符，此时可用的最小的 fd 就是 1。

dpdk 在打开 rte_config 文件时分配到的 fd 为 1，而 stdout 对应的也是 1。此后 dpdk 继续初始化，**内部 log 信息输出到 stdout 中的效果就是写入到 rte_config 文件中**，导致 dpdk 内部 **rte_mem_config** 的内容被破坏，进程异常！

一个非常明显的方案是在 rte_config_init 后 close 掉 rte_config 文件，可是真的可行吗？

## 为什么 dpdk primary 进程未关闭 rte_config 文件?
dpdk primary 进程创建 rte_config 文件用于多进程间共享 rte_mem_config 结构的主要过程如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/9da9f2241bed4db487bbf4f222de94b2.png#pic_center)在上述的流程中，dpdk primary 进程会为 rte_config 文件映射到的 rte_mem_config 结构中的 memsegs 字段获取写文件锁，这把锁dpdk  用于自动检测进程属于 secondary 进程还是 primary 进程。只有 primary 进程才能成功获取到锁，同时 primary 进程保证在运行期间不会关闭 rte_config 文件。

dpdk 自动检测进程类型的函数实现如下：

```c
/* Detect if we are a primary or a secondary process */
enum rte_proc_type_t
eal_proc_type_detect(void)
{
        enum rte_proc_type_t ptype = RTE_PROC_PRIMARY;
        const char *pathname = eal_runtime_config_path();

        /* if there no shared config, there can be no secondary processes */
        if (!internal_config.no_shconf) {
                /* if we can open the file but not get a write-lock we are a
                 * secondary process. NOTE: if we get a file handle back, we
                 * keep that open and don't close it to prevent a race condition
                 * between multiple opens.
                 */
                if (((mem_cfg_fd = open(pathname, O_RDWR)) >= 0) &&
                                (fcntl(mem_cfg_fd, F_SETLK, &wr_lock) < 0))
                        ptype = RTE_PROC_SECONDARY;
        }

        RTE_LOG(INFO, EAL, "Auto-detected process type: %s\n",
                        ptype == RTE_PROC_PRIMARY ? "PRIMARY" : "SECONDARY");

        return ptype;
}
```
核心逻辑为打开 rte_config 文件后尝试获取 wr_lock 中设定的 memsegs 字段的写锁，成功获取则为 primary 进程，获取失败则为 secondary 进程。

这就是 dpdk primary 进程未关闭 rte_config 文件的原因 ，close 了这个文件后，primary 进程在其上获取的文件锁会释放，这样就不能自动检测 dpdk 进程的类型了！

要实现关闭 rte_config 的功能需要提供另外一种不依赖文件加锁的探测 dpdk 程序类型的机制。

## 真实环境中的问题
上文中通过 l2fwd 模拟这个问题看上去挺轻松，但这个问题在真实环境中出现的时候我们只观测到 strace 中有 close stdout 的操作，但是由于代码过于复杂，仔细找了下却没有找到这个逻辑是在哪里被调用的。

为了解决这个问题，我们想到了一种思路：
1. hook c 库 close 函数
2. 在 hook 函数中判断关闭的 fd 是否为 1，为 1 则回溯函数调用栈帧信息，根据栈帧信息确认出现问题的地方
3. 指定 LD_PRELOAD 加载 hook close 函数的 so 来复现问题

hook close 函数的示例代码如下：

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <unistd.h>
#include <dlfcn.h>
#include <unistd.h>
#include <fcntl.h>           /* Definition of AT_* constants */
#include <execinfo.h>
#include <stdlib.h>

#define BACKTRACE_SIZE 256
/* dump the stack of the calling core */
void dump_stack(void)
{
        void *func[BACKTRACE_SIZE];
        char **symb = NULL;
        int size;

        size = backtrace(func, BACKTRACE_SIZE);
        symb = backtrace_symbols(func, size);

        if (symb == NULL)
                return;

        while (size > 0) {
                printf("%d: [%s]\n", size, symb[size - 1]);
                size --;
        }

        free(symb);
}

#define BUFFER_SIZE 1024
typedef (*close_t) (int fd);

int close(int fd)
{
        close_t old_close;

        if (fd == 1) {
                dump_stack();
        }

        old_close = dlsym(RTLD_NEXT, "close");
        return old_close(fd);
}
```

使用如下命令编译：

```jsx
gcc -fPIC -shared hook_close.c -o close.so -ldl
```

复现问题后，排查发现问题指向的函数中没有相关的代码，但位置大致明确。有了这个信息后，仔细分析代码确认问题出在一个对象的析构函数调用中，问题得到解决！

## 总结
有些问题的表象简单却不容易定位，对于这些问题可能得结合一些其它的技术来加速。在上文描述的要找到关闭 stdout 的位置时，由于已经确定了进程一定会关闭 stdout，则可以在这个关键路径上下功夫，hook close c 库函数就是一次这样的实践！

同时也需要注意的是特定的框架设计，可能存在一些限定因素，有时候这些因素并不那么明显，需要对框架的实现细节仔细分析，有这样的过程就能够有所提升！