# bash 中捕获每一个输入字符如何实现？
## 问题描述
bash 是一个非常重要的程序，它提供了一套命令行执行的接口。bash 能够调用众多的实用程序，这些应用程序的输入与输出又可以通过管道连接起来，这更是大大扩展了命令行的能力。

如果你对 bash 的工作原理感兴趣，也许你会注意到它从终端中读取字符的特别之处。

## strace -p 一个已经运行的 bash
首先找到一个正在运行的 bash 程序，通过查看 /proc/pid/exe 文件内容来确认。

示例过程如下：
```bash
[longyu@debian-10:17:54:56] apue.3e $ ls -lh /proc/2924/exe 
lrwxrwxrwx 1 longyu longyu 0 11月 29 17:15 /proc/2924/exe -> /usr/bin/bash
```
可以看到 2924 进程的 exe 文件指向的文件就是 bash，下面我将执行 strace 跟踪到这个进程，并在它的终端中输入 ls 命令后按回车执行。

操作过程如下：
```bash
[longyu@debian-10:17:56:14] apue.3e $ sudo strace -p 2924
strace: Process 2924 attached
pselect6(1, [0], NULL, NULL, NULL, {[], 8}) = 1 (in [0])
read(0, "l", 1)                         = 1
select(1, [0], NULL, [0], {tv_sec=0, tv_usec=0}) = 0 (Timeout)
write(2, "l", 1)                        = 1
pselect6(1, [0], NULL, NULL, NULL, {[], 8}) = 1 (in [0])
read(0, "s", 1)                         = 1
select(1, [0], NULL, [0], {tv_sec=0, tv_usec=0}) = 0 (Timeout)
write(2, "s", 1)                        = 1
pselect6(1, [0], NULL, NULL, NULL, {[], 8}) = 1 (in [0])
read(0, "\r", 1)                        = 1
write(2, "\n", 1)                       = 1
```
这里打出的系统调用表明，bash 使用 pselect6 来监控 stdin 的输入事件，当有事件产生时，它立刻从系统中读取一个字符，然后使用 select 来监控 stdout 是否可用，select 返回后就立刻将字符打印到 stdout 中，这样我们就能够看到终端输入的内容。

这个功能表面上看上去好像非常简单，但是如果你尝试过去实现它，你会发现其实它可能并不像你想象的那样，尤其当你欠缺 **Linux 终端 I/O** 相关知识时。

## 一些失败的尝试
### 1. 使用 read、write 系统调用实现
我最开始想到了使用 read、write 系统调用实现这个功能，相关代码如下：

```c
#include <stdio.h>
#include <fcntl.h>
#include <sys/select.h>
#include <sys/time.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>

int main(void)
{
    int fd;
    fd_set readfds;
    unsigned char c;
    int result;

	fd = STDIN_FILENO;

    FD_ZERO(&readfds);
    FD_SET(0, &readfds);

    while (1) {
        result = pselect(1, &readfds, NULL, NULL, NULL, NULL);
        result = read(fd, &c, 1);

        if (result != 1) {
            break;
        } 

        write(STDOUT_FILENO, (void *)&c, 1);
    }
         
    return 0;
}
```
运行上述程序，同样在另外一个终端中执行 strace，在本终端中输入字符，结果发现一直在 pselect，而不是每敲一个字符就返回，当输入换行的时候 pselect 才返回。

### 2. 设定文件描述符为非阻塞模式
在上面的尝试失败的基础上，我觉得也许可以将文件描述符修改为非阻塞模式来解决。

使用 fcntl 设定输入描述符为 O_NONBLOCK 后发现仍然存在问题。

### 3. 使用 libc 库中的 fread、fwrite 函数
使用系统调用 read、write 没有成功后，我想到了问题可能是字符被缓冲起来了，想到也许可以调用 setvbuf 参数来设定针对输入的 FILE 模式为非缓冲，同时 buff 长度为 1。

核心在于如下函数调用：

```bash
setvbuf(stdin, buf, _IONBF, 1);
```
一般来说 stdin 是行缓冲的，它会在读取到一个换行或者缓冲区满的时候返回，如果我将它的缓冲模式设定为非缓冲，并且将缓冲 buf 大小设定为 1，也许能够实现这个功能。

修改代码后测试发现仍旧有相同的问题，这种尝试宣告失败。

### 4. 使用 strace 跟踪 bash 的启动过程
既然我现有的知识搞不定这个问题，那么我可以从已有的解决方案入手，研究下 shell 初始化流程中是不是有某些特别的配置。

strace 跟踪 bash 初始化过程，获取到了如下相关的系统调用点：

```strace
fcntl(0, F_GETFL)                       = 0x8402 (flags O_RDWR|O_APPEND|O_LARGEFILE)
ioctl(0, TIOCGWINSZ, {ws_row=45, ws_col=173, ws_xpixel=0, ws_ypixel=0}) = 0
ioctl(0, TIOCSWINSZ, {ws_row=45, ws_col=173, ws_xpixel=0, ws_ypixel=0}) = 0
ioctl(0, TCGETS, {B38400 opost isig icanon echo ...}) = 0
ioctl(0, TCGETS, {B38400 opost isig icanon echo ...}) = 0
ioctl(0, SNDCTL_TMR_STOP or TCSETSW, {B38400 opost isig -icanon -echo ...}) = 0
ioctl(0, TCGETS, {B38400 opost isig -icanon -echo ...}) = 0
```
这里使用 ioctl 修改 stdin 描述符的一些状态，我怀疑可能跟这里的设定有关，于是下载 bash 源码，搜索与上面相关的 ioctl 系统调用，**没有找到**。

想直接拷贝上面 ioctl 调用的参数使用，发现最后还有三个点，表示还有其它参数，同时传递参数的格式我也不清楚，也只能暂时放弃了。
### ５. 搜索互联网
很遗憾的是没有搜到相关的内容，只能暂时放弃了！

## 事后补充的分析
这篇文章的素材在几个月前就写好了，今天完善内容的过程中，我觉得对于上面的失败尝试，仔细分析不难得出如下结论：

	问题出在 pselect 上!
按照常规理解，每输入一个字符应该就能够触发一次事件，可从上面的测试情况来看，**pselect 并不是在输入每一个字符时就返回，它也是在输入了一个换行后才返回**。

pselect 等待的是异步事件，**pselect 等待事件的过程实际上是将当前进程挂入到输入描述符对应底层设备的等待队列中**。

当底层的设备检测到有输入事件发生，它会**唤醒等待队列中的程序**，将程序添加到**就绪队列**中，当程序被**再次调度运行**的时候，会回到 pselect 的函数中，它需要**检测函数返回的原因**，当它检测到是等待事件就绪后，pselect 会设定一些字段并返回。

那可能是**输入描述符对应的底层设备其行为就是在读取到一个换行、缓冲区满的时候才触发一次事件，唤醒挂起队列中的进程**。

重新阅读 pselect 的手册，没有发现怀疑点，说明问题应该出在输入描述符对应的底层设备上。

## 终端 I/O 的知识浮上水面
回去翻了下 《APUE》，发现在前 17 章并没有相关的内容，后面几个章节我阅读的时候直接跳过了，于是我想可能能从这些跳过的内容中找到一些关联点。

阅读第 18 章——终端 I/O 后果然找到了答案。

这个问题其实与终端 I/O 的一些特性有关，终端 I/O 的 Canonical 模式是默认开启的，这个模式有如下工作过程：

	终端驱动在完整的行被输入后向上层返回

这就会造成了我们上面 pselect 没有及时返回的问题，其实这个问题**并不表示驱动本身存在某种缺陷**，而是 bash 需要实现这样的功能以支持**自动补全功能**。

你想想你在使用 tab 补全的时候按了 enter 吗？显然没有。这意味着 bash 要能够捕获终端输入每个字符的事件，这样补全功能才会生效，如果跟上面失败的尝试一样，必须读入一个换行才返回，那么 tab 补全就没啥意义了。

其实读入一行是终端 I/O 的一个特征点，终端 I/O 的处理过程一般都是以行为单位的，同时行也提供了一个缓冲窗口，能够提高系统的效率，这也是 Canonical 模式默认开启的一大原因。

说到这里好像还没有明确具体的解决方案是啥，其实解决方案非常简单，关闭终端 I/O 的 Canonical 模式就行了。

其实就对应了 bash 初始化过程中执行的如下系统调用：

```strace
ioctl(0, SNDCTL_TMR_STOP or TCSETSW, {B38400 opost isig -icanon -echo ...}) = 0
```
那这个系统调用该怎样使用呢？其实它是通过下面这些函数来调用的：

```
       termios,  tcgetattr,  tcsetattr,  tcsendbreak,  tcdrain, tcflush, tcflow, cfmakeraw, cfgetospeed, cfgetispeed, cfsetispeed, cfsetospeed, cfsetspeed - get and set
       terminal attributes, line control, get and set baud rate
```
《APUE》 中 18.11 章节讲了 Noncanonical 模式的内容，并提供了一个示例程序。

根据《APUE》中的示例程序，我使用下面的代码进行测试：

```c
#include <stdio.h>
#include <fcntl.h>
#include <sys/select.h>
#include <sys/time.h>
#include <sys/types.h>
#include <unistd.h>
#include <termios.h>
#include <signal.h>
#include <stdlib.h>

int main(void)
{
    int fd;
    fd_set readfds;
    unsigned char c;
    int result;
    struct termios ts, ots;

    fd = STDIN_FILENO;
         
    tcgetattr(fd, &ts);
    ots = ts;
    ts.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(fd, TCSAFLUSH, &ts);

    FD_ZERO(&readfds);
    FD_SET(0, &readfds);
                
    while (1) {
        result = pselect (1, &readfds, NULL, NULL, NULL, NULL);

        result = read(fd, &c, 1);

        if (result != 1) {
            break;
        }

		write(STDOUT_FILENO, &c, 1);	
    }
         
    return 0;
}
```
编译上述程序，跟踪其初始化过程，有如下关键的系统调用：

```strace
ioctl(0, TCGETS, {B38400 opost isig icanon echo ...}) = 0
ioctl(0, TCGETS, {B38400 opost isig icanon echo ...}) = 0
ioctl(0, SNDCTL_TMR_CONTINUE or TCSETSF, {B38400 opost isig -icanon -echo ...}) = 0
ioctl(0, TCGETS, {B38400 opost isig -icanon -echo ...}) = 0
```
是不是有点熟悉呢？我在上文中描述过使用 strace 跟踪 bash 的启动过程时贴出了如下系统调用：

```strace
ioctl(0, TCGETS, {B38400 opost isig icanon echo ...}) = 0
ioctl(0, TCGETS, {B38400 opost isig icanon echo ...}) = 0
ioctl(0, SNDCTL_TMR_STOP or TCSETSW, {B38400 opost isig -icanon -echo ...}) = 0
ioctl(0, TCGETS, {B38400 opost isig -icanon -echo ...}) = 0
```
可以看到两者几乎完全相同，只第三次 ioctl 传入的第二个参数存在区别，这个点已经超出了本文的描述范围，不进行探讨。

strace 跟踪新的程序，这次每输入一个字符 pselect6 都能捕获到相应的事件，测试记录如下：

```strace 
pselect6(1, [0], NULL, NULL, NULL, {NULL, 8}) = 1 (in [0])
read(0, "s", 1)                         = 1
write(1, "s", 1)                        = 1
pselect6(1, [0], NULL, NULL, NULL, {NULL, 8}) = 1 (in [0])
read(0, "\t", 1)                        = 1
write(1, "\t", 1)                       = 1
```
这几个系统调用中，最后三个是读入了一个 tab，在 bash 补全的时候 tab 并不显示，那应该是 bash 判断确定用户输入的是 tab 后执行了补全操作的关系。

## 总结
本文描述了一个看似简单的问题，实际上这个问题中间隔了几个月才得到了解决。正是因为这个问题刚好落入了我阅读 《APUE》时跳过的知识内容，故而让我手足无措。

最终我重读 《APUE》，补全了这个知识后，问题马上得到了解决。

我想再次重申，对于业内的经典技术书籍还是要完整的阅读一遍，并写 demo 来验证，这肯定要投入非常多的学习资源。这点并不取决于其篇幅，重要的决定因素应该是其所描述的知识的深度与广度，这就是伟大作品的一些门槛吧！

很多人说，像《APUE》这样的书，应该作为工具书来使用，我觉得这只是一种无奈。按照这种说法其实我们压根不用读任何书，只要掌握好搜索引擎的使用就行了。

善用搜索引擎确实要比只会问人高级一点，可其实也没有高级到哪里去，也不算做是什么核心的竞争力。

最近觉得也许掌握任何技术都不能算是核心竞争力，真正的核心竞争力还得回到技术的起源，回归到用户的需求上，回归到你想要做什么之上。

