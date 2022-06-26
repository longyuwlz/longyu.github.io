# linux 内核信号机制需要解决的两个关键问题
## 前言
信号作为一种进程间通信的方式，在 linux 中被广泛使用。我一直对信号背后的工作原理非常好奇，在本文中我将对信号机制中的几个关键问题进行研究，以期揭开信号的神秘面纱。

## 从不可靠信号入手
信号并不是从一开始就像今天一样可靠，正相反，它最初的设计有一些严重的问题，被称为不可靠的信号。

我第一次了解到可靠信号与不可靠信号的概念，是在啃 《APUE》的时候。本文中我只针对不可靠信号进行描述。为了准确的说明不可靠信号的特征，我将从一个例子着手进行描述。

## 选自《APUE》的例子

```c
#include <stdio.h>
#include <unistd.h>
#include <signal.h>

#define err_sys(S)	\
	do {			\
			fprintf(stderr, "%s\n", S); \
	} while (0);


static void sig_usr(int); /* one handler for both signals */

int
main(void)
{
    if (signal(SIGUSR1, sig_usr) == SIG_ERR)
        err_sys("can't catch SIGUSR1");
    if (signal(SIGUSR2, sig_usr) == SIG_ERR)
        err_sys("can't catch SIGUSR2");
    for ( ; ; )
        pause();

    return 0;
}

static void
sig_usr(int signo) /* argument is signal number */
{
    if (signo == SIGUSR1)
        printf("received SIGUSR1\n");
    else if (signo == SIGUSR2)
        printf("received SIGUSR2\n");
    else
        printf("received signal %d\n", signo);
}
```
编译上述程序，后台运行生成的 a.out 文件，然后向这个进程发送三次 SIGUSR1 信号。

```c
$ gcc ./signal.c 
$ ./a.out &
[2] 6443
$ kill -USR1 6443
received SIGUSR1
$ kill -USR1 6443
received SIGUSR1
$ kill -USR1 6443
received SIGUSR1
```
在 debian 10 系统中，上面的测试结果并不符合预期。**预期的效果是在第二次向程序发送 SIGUSR1 的时候程序被杀死**。这就是不可靠信号的特点，**信号处理函数执行一次后就会被重置为默认值**，**默认值的响应方式是杀死进程**。
## 为什么 signal 函数的行为变化了？
man signal 获取到如下相关信息：
```manual
       The situation on Linux is as follows:

       * The kernel's signal() system call provides System V semantics.

       * By default, in glibc 2 and later, the signal() wrapper function does not invoke the kernel system call.  Instead, it calls sigaction(2) using flags that supply
         BSD semantics.  This default behavior is provided as long as a suitable feature test macro is defined: _BSD_SOURCE on glibc 2.19 and earlier or _DEFAULT_SOURCE
         in  glibc  2.19  and later.  (By default, these macros are defined; see feature_test_macros(7) for details.)  If such a feature test macro is not defined, then
         signal() provides System V semantics.
```
上述内容说明了如下两点内容：

1. linux 内核的 signal 系统调用与 System V 系统中的 signal 系统调用行为一致
2. glibc 2 以及之后的版本，libc 库中的 signal 函数与 BSD 系统中 signal 系统调用行为一致

上面的说明指出如果 feature test macro 没有定义，libc 库中提供的 signal 函数的行为将与 System V 系统保持一致。

一通研究确定可以使用 -std=c90 选项编译来使用与 System V 中行为一致的 signal 函数：

```bash
$ gcc signal.c -std=c90
$ ./a.out &
[2] 7513
$ kill -USR1 7513
received SIGUSR1
$ kill -USR1 7513
[2]+  用户定义信号 1    ./a.out
$ pgrep a.out
$
```
使用 -std=c90 指定使用 c90 标准来编译程序，第二次向程序发送 SIGUSR1 信号之后，程序被杀死，符合不可靠信号的特征。

## 中断 vs 信号
信号是对硬件中断的模拟，中断有中断向量表，信号也有信号向量表，相应的中断处理需要考虑嵌套中断的情况，信号处理也需要考虑信号嵌套的情况。

中断处理过程中当一个本地中断的处理程序执行的时候会暂时性的关闭本地中断，保证中断程序的串行执行，但是这意味着在中断服务程序执行的这个窗口期间，**新接收到的同级中断会被丢失**，这就是为什么**中断服务程序要写的尽可能短**的主要原因。

信号嵌套也需要解决类似的问题，场景是在执行一个信号处理函数的窗口中再次接收到同一个信号处理函数的情况。

下面的内容摘自《Linux 内核源代码情景分析》：
>使用不可靠信号的实现时，由内**核自动将"信号向量表" 中相应的函数指针设置成 SIG_DFL**。从而在执行一个信号处理程序的时候如果又接收到了同种信号的话，就会因为此时的”信号向量“ 已经修改为了 SIG_DFL 而不会嵌套进入同一个处理程序。

>这样这种信号的注册的信号处理函数就是"一次性的"，信号处理函数执行完信号处理过程后需要**重新调用 signal 来再次设置信号向量**，为下一次执行同一信号处理程序做好准备。

>当信号非常密集的时候，可能在刚进入信号处理程序，还没有重新设置信号向量之前就又收到了一个同种类型的信号，这时信号处理程序已经被重置为 SIG_DFL默认行为，而对 SIG_DFL 的默认反应又是结束程序的运行，所以第二个相同类型的信号到来时就会把程序杀死，因为这样，这种信号机制被称为"不可靠信号"

## strace 跟踪
执行 ```strace ./a.out &```命令跟踪程序的执行过程，发送信号给目标程序后，信号处理过程涉及下面几个系统调用：

```strace
$ kill -USR1 13225
pause()                                 = ? ERESTARTNOHAND (To be restarted if no handler)
--- SIGUSR1 {si_signo=SIGUSR1, si_code=SI_USER, si_pid=5380, si_uid=1000} ---
fstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(0x88, 0x3), ...}) = 0
brk(NULL)                               = 0x564512f26000
brk(0x564512f47000)                     = 0x564512f47000
write(1, "received SIGUSR1\n", 17received SIGUSR1
)      = 17
rt_sigreturn({mask=[]})                 = -1 EINTR (被中断的系统调用)
```
第一行的输出表示 pause 系统调用被打断，第二行的输出能够看到进程收到了一个 SIGUSR1 信号及发送者的信息。SI_USER 表示信号从用户态程序发送，si_pid 与 si_uid 表示发送信号的程序的 pid 与 uid，这两个字段用于信号的权限控制。

fstat、brk、write 这几个系统调用都是 printf 执行的过程中调用到的，write 系统调用执行后 printf 函数完成，最后一行输出表明程序调用了 **rt_sigreturn** 系统调用。

## 信号处理的流程
在进一步的描述前，从《Linux 内核源代码情景分析》中摘录下图以说明信号处理的流程。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201219103839514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
从图 6.6 能够看出进程对信号的响应与执行是在从系统空间返回用户空间的过程中做的，信号处理程序在用户空间中执行，执行完成后会再次返回到内核中，恢复到之前正在执行的断点。

**关键的步骤在于跳转到信号处理程序执行以及信号程序执行完成后返回内核后恢复之前被中断的现场继续执行。**

### 如何从内核态跳转到用户态信号处理程序开始执行
在继续阅读前，建议先阅读下 [移植实时操作系统到 risc-v 架构芯片时上下文切换的实现](https://blog.csdn.net/Longyu_wlz/article/details/100130013?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522160838234716780271152002%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fblog.%252522%25257D&request_id=160838234716780271152002&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-1-100130013.pc_v1_rank_blog_v1&utm_term=%E7%AC%AC%E4%B8%80%E4%B8%AA%E4%BB%BB%E5%8A%A1) 这篇博客。

进程的上下文切换与子函数调用类似，它从一个执行流切换到另外一个执行流，核心的栈帧的切换，而函数调用过程正是是由栈帧维持的。

更具体点讲，**每个任务的栈帧都维持了任务当前执行的一个快照**，恢复到某个任务开始执行，其实就是从栈帧中拿出一份**机器的现场**，**一份寄存器集合的值**，恢复这些值到相应的寄存器中即完成了切换的过程。

如果在寄存器集合的基础上再细化一下，那可以说改变执行流就是通过**修改 pc 寄存器来完成的**，这是物理机器的特征。

类比我们这里需要解决的问题，从内核中返回用户态并跳转到信号处理程序开始执行，一定要涉及对 pc 的修改，可是要怎么完成呢？

我们都知道用户态进入内核态需要通过系统调用来完成，但是系统调用本身属于一种同步异常，类比异常的执行流程，它也涉及保存用户态现场的工作，在 linux 中这个现场由 pt_regs 寄存器结构体集合来描述。

当进入内核态执行的时候 pt_regs 代表的进程的用户态 cpu 现场会保存到进程的内核态栈帧中，同时当进程返回内核态时，内核态栈帧中保存的 pt_regs 维持的现场会恢复到 cpu 寄存器中。

如下内容摘自《linux 内核源代码情景分析》
>在返回到用户空间前夕，系统空间堆栈的内容，也就是指针 regs 所指向的 pt_regs 数据结构，实际上就是一个框架。这个框架决定了当处理器返回到用户空间时从何处继续执行指令，用户空间堆栈在何处以及各个寄存器的内容。现在既然要求处理器在回到用户空间的时候要执行另一段程序，就得在用户空间堆栈中为之准备一个不同的框架。
> 可是，最终还是要会到当初做出系统调用或者被中断的地方去，所以原先的框架不能丢掉，要保存起来。保存在哪里呢？一个进程的系统空间堆栈大小是很有限的，所以最合理的就是把它作为信号处理程序的附加局部量，也就是保存在进程的用户空间堆栈中的因调用该处理程序而形成的框架中。这样，就有必要在进入用户空间执行信号处理程序之前，就准备好用户空间堆栈中的框架，只有如此才能先把原来的框架复制到用户空间的框架中作为局部量保存起来，回到系统空间中以后再从那里复制回来。
> 框架的形成是在程序运行过程中，特别是在子程序调用的过程中自然形成的，但是框架的形成有规律可循。现在尚未执行对信号处理程序的调用，当然也不存在调用该处理程序的框架，所以实际上是按照形成框架的规律先作好准备，预先在用户空间堆栈中打下一些埋伏。

这段描述总结一下就是，我们首先需要将内核态现场保存到进程的用户态栈帧中，然后按照子函数调用的规律，插入一个对信号处理程序调用的框架，这样当返回到用户态时就能够执行信号处理程序。

### 以 riscv 架构为例研究从内核态返回用户态信号处理程序前执行的关键流程
从内核源码树 arch/riscv/kernel/signal.c 文件中摘录如下代码：

```c
215	regs->sepc = (unsigned long)ksig->ka.sa.sa_handler;
216	regs->sp = (unsigned long)frame;
217	regs->a0 = ksig->sig;                     /* a0: signal number */
218	regs->a1 = (unsigned long)(&frame->info); /* a1: siginfo pointer */
219	regs->a2 = (unsigned long)(&frame->uc);   /* a2: ucontext pointer */
```
这段代码摘自 **setup_rt_frame** 函数中，它就是跳转到用户态信号处理程序执行前内核调整用户态堆栈的关键所在。

215 行将信号处理程序的地址赋值给 **pt_regs** 结构中的 **sepc** 字段，这个字段就是**返回用户态时将会被赋值给 pc 的值**。

216 行设定**栈顶指针为调整后的 frame 的位置**，这个 frame 中已经存放了内核态的断点现场。

217-219 行设定用户态信号处理程序的三个参数——信号 number，siginfo 的地址，ucontext 的地址。

pt_regs 中的内容在返回用户态前被恢复到 cpu 寄存器中，这样回到用户态就会从信号处理函数开始执行。
### 如何从用户态信号处理函数中返回到内核态？
解决了上面的问题后，从用户态信号处理函数返回内核态又成为了下一个重点问题。《Linux内核源代码情景分析中》描述中提到，这一过程是通过内核自动向用户态栈帧中插入调用 sigreturn 系统调用的指令来实现的。

调整后的用户态堆栈内容如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201219224923968.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
图 6.7 中，pretcode 指向内核自动插入的指令的起始位置，并且由于这里是返回到信号处理程序执行，而非 call 调用，则 pretcode 实际上就是信号处理程序执行完成后将取出的返回地址。

原书中相关的代码如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201219225737506.png)
写到这里应该算已经解决了从用户态程序返回到内核态的问题，但是这里其实隐含了一个非常重要的点。

从图 6.7 中可以看出，内核自动插入的代码其位置是在**用户空间栈帧中**，而用户空间栈帧一般是**没有执行权限的**，也没有看到介绍设定页面执行权限的内容，我想肯定是原书中描述的内核版本没有这种严格的限定，故而能够这样玩，而高版本的内核中已经不能这样玩了。

高版本内核中 x86-64 架构使用如下玩法：

```c
	if (ksig->ka.sa.sa_flags & SA_RESTORER)
		restorer = ksig->ka.sa.sa_restorer;

	/* Set up to return from userspace.  */
	err |= __put_user(restorer, &frame->pretcode);
```

这里的核心在于将 frame->pretcode 指向一个 restorer，这个 restorer 在我们这个情境中最终生效的将是 libc 中提供的版本，同时也由于 libc 库代码被 mmap 的页有执行权限，就解决了在栈中插入代码缺少执行权限的问题。

### sa_restorer 是被谁注册的？
man rt_sigreturn 系统调用获取到了如下重要信息：

```manual
       Once upon a time, UNIX systems placed the signal trampoline code onto the user stack.  Nowadays, pages of the user stack are protected so as to disallow code ex‐
       ecution.  Thus, on contemporary Linux systems, depending on the architecture, the signal trampoline code lives either in the vdso(7) or in the C library.  In the
       latter  case,  the  C library's sigaction(2) wrapper function informs the kernel of the location of the trampoline code by placing its address in the sa_restorer
       field of the sigaction structure, and sets the SA_RESTORER flag in the sa_flags field.
```
这段内容首先说明了我在上文中提到的由于用户态栈帧不具有执行权限，导致插入在用户态栈帧中的代码无法执行的问题。

此后，它描述了当前 Linux 系统中解决这个问题的两种不同方式：
1. 使用 vdso 这个内核动态库中提供的代码
2. 使用 c 库中提供的代码

#### c 库注册 sa_restorer 的方式
对于使用 c 库中提供的代码这种方式，c 库的 sigaction 封装函数将会将返回内核态的代码的起始地址放到 sigaction 结构体的 sa_restorer 字段中，并设定 sa_flags 的 SA_RESTORER 标志来完成。可以理解为，c 库替代用户隐藏了信号处理函数返回用户态函数的注册过程，实际上这个函数就是在注册信号处理函数的时候也随之注册的。

重新使用上文中选自《APUE》的例子来测试，使用 strace 跟踪 signal 函数执行的系统调用，得到了如下信息：

```strace
rt_sigaction(SIGUSR1, {sa_handler=0x5617d68341f2, sa_mask=[], sa_flags=SA_RESTORER|SA_INTERRUPT|SA_NODEFER|SA_RESETHAND, sa_restorer=0x7f451f401840}, {sa_handler=SIG_DFL, sa_mask=[], sa_flags=0}, 8) = 0
rt_sigaction(SIGUSR2, {sa_handler=0x5617d68341f2, sa_mask=[], sa_flags=SA_RESTORER|SA_INTERRUPT|SA_NODEFER|SA_RESETHAND, sa_restorer=0x7f451f401840}, {sa_handler=SIG_DFL, sa_mask=[], sa_flags=0}, 8) = 0
```
这里 sa_restorer 的值为 0x7f451f401840，pmap 查看程序的虚拟内存空间，得到了如下信息：

```bash
$ pmap -p 26267
26267:   ./a.out
00005617d6833000      4K r---- /tmp/a.out
00005617d6834000      4K r-x-- /tmp/a.out
00005617d6835000      4K r---- /tmp/a.out
00005617d6836000      4K r---- /tmp/a.out
00005617d6837000      4K rw--- /tmp/a.out
00007f451f3ca000    136K r---- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007f451f3ec000   1312K r-x-- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007f451f534000    304K r---- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007f451f580000      4K ----- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007f451f581000     16K r---- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007f451f585000      8K rw--- /usr/lib/x86_64-linux-gnu/libc-2.28.so
00007f451f587000     24K rw---   [ anon ]
00007f451f5b1000      4K r---- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007f451f5b2000    120K r-x-- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007f451f5d0000     32K r---- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007f451f5d8000      4K r---- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007f451f5d9000      4K rw--- /usr/lib/x86_64-linux-gnu/ld-2.28.so
00007f451f5da000      4K rw---   [ anon ]
00007fffa1d1e000    136K rw---   [ stack ]
00007fffa1dd1000     12K r----   [ anon ]
00007fffa1dd4000      8K r-x--   [ anon ]
 total             2148K
```
可以确定这个地址位于 libc 库中。使用 [使用 mtrace 追踪内存泄露问题](https://blog.csdn.net/Longyu_wlz/article/details/109397938?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522160839266216780276340278%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fblog.%252522%25257D&request_id=160839266216780276340278&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-1-109397938.pc_v1_rank_blog_v1&utm_term=mtrace) 这篇博客中提到的计算代码偏移量的方法，使用 0x7f451f401840 - 00007f451f3ca000 得到地址为 37840，反汇编 libc 库查找这个地址获取到如下信息：

```bash
$ objdump -d /usr/lib/x86_64-linux-gnu/libc-2.28.so | grep -A 1 '37840'
   37840:	48 c7 c0 0f 00 00 00 	mov    $0xf,%rax
   37847:	0f 05                	syscall 
```
mov 指令设定系统调用号为 f，在我的机器上 **/usr/include/asm/unistd_64.h** 中 f 对应的系统调用定义如下：

```c
 19 #define __NR_rt_sigreturn 15
```
可以确定这里使用的系统调用号对应的就是 sigreturn 系统调用，设定了系统调用号后，执行 syscall 进入内核就完成了所有的过程。

#### vdso 注册 sa_restorer 的方式
vdso 是内核提供的一个加速系统调用执行过程的动态库，它由内核初始化的时候加载，并为所有的程序共享。

继续从内核源码树 arch/riscv/kernel/signal.c 文件中摘录如下代码：

```c
	/* Set up to return from userspace. */
	regs->ra = (unsigned long)VDSO_SYMBOL(
		current->mm->context.vdso, rt_sigreturn);
```
这行代码也同样出自 **setup_rt_frame** 函数中，在 riscv 架构中，**ra** 全称为 **return address**，它被用来保存返回地址，它与 x86 中 **pretcode** 字段的功能一致。

x86 没有这样设计的原因在于 x86 中没有专门设计一个保存返回地址的寄存器，只能够依靠栈帧来完成，所以其过程相对复杂。

VDSO_SYMBOL 类似于用户态的 dlsym 函数，可以从动态库中检索到函数的地址。

rt_sigreturn 函数位于 **arch/riscv/kernel/vdso/rt_sigreturn.S** 中，其代码如下：

```asm
	.text
ENTRY(__vdso_rt_sigreturn)
	.cfi_startproc
	.cfi_signal_frame
	li a7, __NR_rt_sigreturn
	scall
	.cfi_endproc
ENDPROC(__vdso_rt_sigreturn)
```
li 指令将 rt_sigreturn 系统调用的系统调用号加载到 a7 寄存器中，然后调用 scall 指令触发系统调用，与我上文描述的 c 库中的 x86 汇编代码功能类似。同时需要说明的是 vdso 这个内核提供的动态库也一定被映射到用户态空间中，这也是一个值得研究的点，后面可能会写文章专门研究下。
## 总结
在完成本篇博文的过程中，着实遇到了一些问题。从 stackoverflow 中找的示例代码尝试编写自己的信号 restorer 函数，这个函数用汇编写的，写完后第一次测试发现没有啥问题。

可是当我在本文中描述到相关内容时，我发现我忽略了一个非常重要的点，其实我自己写的信号 restorer 函数根本没有生效，使用的还是 c 库中的版本，之后又尝试了一下使用 syscall 来调用结果也没成功，看了 glibc 里的相关代码，要比想象中复杂的多，只能先放弃了！

同时 x86 架构中信号的处理与用户态栈帧与内核态栈帧切换这些都有些过于复杂了，而 riscv 这种 RISC 架构就实现的非常简单。尽管指令集变化了，但是核心的过程是一致的，没必要死磕 x86，研究 riscv 架构马上海阔天空！


