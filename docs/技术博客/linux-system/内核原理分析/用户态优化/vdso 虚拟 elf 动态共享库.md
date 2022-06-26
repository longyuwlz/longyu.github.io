# vdso——虚拟 elf 动态共享库
## 前言
在写 [linux 内核信号机制需要解决的两个关键问题](https://blog.csdn.net/Longyu_wlz/article/details/109350395) 这篇博客的时候，涉及到了 vdso 相关的内容，在本篇文章中我用一个实例来描述下 vdso 的使用过程。

## vdso 是什么？它为什么存在？
man vdso 获取到如下介绍信息：

```manual
DESCRIPTION
       The  "vDSO"  (virtual  dynamic shared object) is a small shared library that the kernel automatically maps into the address space of all user-space applications.
       Applications usually do not need to concern themselves with these details as the vDSO is most commonly called by the C library.  This way you  can  code  in  the
       normal way using standard functions and the C library will take care of using any functionality that is available via the vDSO.

       Why  does the vDSO exist at all?  There are some system calls the kernel provides that user-space code ends up using frequently, to the point that such calls can
       dominate overall performance.  This is due both to the frequency of the call as well as the context-switch overhead that results from exiting user space and  en‐
       tering the kernel.

       The  rest  of this documentation is geared toward the curious and/or C library writers rather than general developers.  If you're trying to call the vDSO in your
       own application rather than using the C library, you're most likely doing it wrong.
```
上述内容描述了两个重要的内容：

1. vdso 是什么？

	vdso 是一个非常小的动态库，它由内核自动映射到每一个用户态进程的地址空间中。vdso 的使用隐藏在 libc 库中，普通用户并不需要关心。

2. 为什么需要 vdso ？
	
	有一些内核提供的系统调用会被用户态程序频繁使用，在这种情况下这些系统调用对系统性能有很大的影响。其调用频率与从用户态到内核中上下文切换的频率是两个主要的影响因素。vdso 针对这一场景进行优化，将原来需要通过系统调用完成的任务转化为类似普通库函数调用的过程，消除了频繁的系统调用带来的性能问题。
	
## 一个简单的 demo
在进一步探讨之前，先用如下 demo 来测试下这个功能：

```c
#include <sys/time.h>
#include <stdio.h>

int main(void)
{
	struct timeval tv;
	
	gettimeofday(&tv, NULL);

	return 0;
}
```
ldd 查看生成的 a.out 依赖的动态库，得到了如下内容：

```bash
$ ldd ./a.out 
	linux-vdso.so.1 (0x00007ffe6698b000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f3e0aea6000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f3e0b092000)
```
linux-vdso.so.1 就是我的系统中使用的 vdso 动态库，这个库并不存在于文件系统中，它由内核自动加载并映射到程序的地址空间中。

设定 **LD_DEBUG="symblos"** 环境变量运行编译生成的 a.out 程序，能够看到 **gettimeofday** 函数的符号解析过程如下：

```bash
     25112:     symbol=gettimeofday;  lookup in file=./a.out [0]
     25112:     symbol=gettimeofday;  lookup in file=/lib/x86_64-linux-gnu/libc.so.6 [0]
     25112:     symbol=__vdso_gettimeofday;  lookup in file=linux-vdso.so.1 [0]
```
最开始需要解析的是 gettimeofday，从 c 库中找到后又开始解析 __vdso_gettimeofday，这个符号正是在 linux-vdso.so.1 vdso 动态库中的符号。

ltrace 跟踪 a.out 得到了如下信息：
```bash
$ ltrace ./a.out
gettimeofday(0x7fff14f64370, 0)                                                                            = 0
+++ exited (status 0) +++
```
确定只调用了 c 库中的 gettimeofday 函数。

strace 跟踪程序执行过程，发现没有执行 gettimeofday 系统调用，测试记录如下：

```bash
$ strace ./a.out 2>&1  | grep gettime
$
```
可以确定 gettimeofday 函数没有调用任何系统调用！这意味着我们没有进入内核态就从用户态获取到了内核的数据，混淆了内核态与用户态的边界。

## vdso 被映射的位置
使用 pmap -X -p pid 能够看到 vdso 被映射到的位置，不过格式有点复杂。检索当前终端的 /proc/pid/maps 文件获取到了如下信息：

```bash
$ grep 'vdso' /proc/$$/maps 
7ffefb51f000-7ffefb521000 r-xp 00000000 00:00 0                          [vdso]
```
可以看到这个段没有写权限，只有读权限与执行权限。

## manual 中与 gettimeofday 相关的内容
 ```manual
       One frequently used system call is gettimeofday(2).  This system call is called both directly by user-space applications as well as indirectly by the C  library.
       Think  timestamps or timing loops or polling—all of these frequently need to know what time it is right now.  This information is also not secret—any application
       in any privilege mode (root or any unprivileged user) will get the same answer.  Thus the kernel arranges for the information required to answer this question to
       be placed in memory the process can access.  Now a call to gettimeofday(2) changes from a system call to a normal function call and a few memory accesses.
```
上面的描述说明，内核会将 timestamps 信息放到进程能够访问到的内存中，将 gettimeofday 从一个系统调用变为了一个普通的函数调用和几个内存访问操作。

## vdso 对 strace、secomp 的影响
man vdso 中的如下信息说明了当使用了 vDSO 中的函数后，strace 将不能跟踪到，同时这些函数也不对 seccomp 的过滤器可见。

```manual
   strace(1), seccomp(2), and the vDSO
       When  tracing  systems  calls  with strace(1), symbols (system calls) that are exported by the vDSO will not appear in the trace output.  Those system calls will
       likewise not be visible to seccomp(2) filters.
```
## 总结
本文对 vdso 做了简单的介绍，并没有深入到其背后的原理中。从 vdso 的存在上可以反思，对于内核态与用户态这种不同的特权级，明确的区分提高了操作系统的安全性，但同时也在某些场景中带来了一些问题。

vdso 机制模糊了用户态与内核态之间的边界，可能会有某些安全性问题，但是它的存在就非常好的说明了技术情景的重要性。

不同的技术，只要存在，那一定有它适用的情景，也许它不适用与 A 场景，但是可能在 B 场景中就能够一展拳脚。站在产品的视野上，我们应该找到不同的技术适合的场景，将多个技术整合起来实现我们的需求，而不是割裂的看待单个技术及其适用的场景。

要相信存在即合理，应该投入主要的时间在寻找合理性上，而不是质疑存在本身！

