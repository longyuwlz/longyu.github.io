# strace 跟踪多线程程序不能打印系统调用的问题
## 问题描述
在分析 ```netlink: 8 bytes leftover after parsing attributes in process server```这个内核异常打印日志的时候，最先想到可以通过 strace 来跟踪进程，看看是在执行哪个系统调用的时候打印的告警，理论上能够行的通。

实际测试发现，strace -p 跟踪到 server 程序后，没有追踪到新的系统调用，等了几分钟也没有任何的打印。使用 strace 跟踪其它进程是正常的，说明 strace 命令本身可能没有问题，问题可能出在我们的 server 中。

一开始没有想明白这里的机关，就转向去研究 netlink 的执行过程了。

## 对这个问题的思考
最近定位一些问题时，我对这个问题有了新的认识，我发现对于多线程的程序，每一个线程都有一个 pid，且在 /proc 下都有一个目录，但是 ps 的时候只能够看到一个 pid，这个 pid 实际就是进程的 pid，也是领头线程的 pid。

有这样的信息，我觉得可能 strace -p 跟踪 server 没有新的系统调用记录是因为 strace -p 跟踪的领头线程一直阻塞，没有执行系统调用的结果。

## strace 命令 manual 中的相关信息
man strace 浏览发现了如下相关内容：

```
  -f          Trace child processes as they are created by currently traced processes as a result of the fork(2), vfork(2) and clone(2) system calls.  Note that -p
                   PID -f will attach all threads of process PID if it is multi-threaded, not only thread with thread_id = PID.
```
上述内容说明，使用了 -p PID -f 参数，如果进程是多线程程序，那么 strace 将会跟踪到 PID 指向程序的所有线程，而不是 thread id 与 PID 相等的线程。
 
## 编写程序测试验证
下面这个代码中子线程在一段时间内保持运行，同时领头线程通过 pthread_join 等待子线程死亡。

源码如下：

```c
#include <pthread.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <ctype.h>

#define handle_error_en(en, msg)                                        \
    do { errno = en; perror(msg); exit(EXIT_FAILURE); } while (0)

static void *
thread_start(void *arg)
{
    struct thread_info *tinfo = arg;
    int count = 0;

    while(count < 100000) {
        printf("thread running %d times\n", count);
        usleep(10000);
        count++;
    }

    return NULL;
}

int
main(int argc, char *argv[])
{
    pthread_t tid;
    int ret;
    void *res;

    ret = pthread_create(&tid, NULL,
                         &thread_start, NULL);
    if (ret != 0)
        handle_error_en(ret, "pthread_create");

    ret = pthread_join(tid, &res);
    if (ret != 0)
        handle_error_en(ret, "pthread_join");

    free(res);  
    exit(EXIT_SUCCESS);
}
```
将上述程序保存为 thread.c，然后执行如下命令进行编译：

```bash
gcc thread.c -o thread -lpthread
```

编译成功后进行下面的测试过程：

### 执行 strace -p PID
```bash
[longyu@debian-10:23:10:50] The_C_Language $ ./thread > /dev/null &
[1] 12414
[longyu@debian-10:23:11:00] The_C_Language $ sudo strace -p 12414
strace: Process 12414 attached
futex(0x7f6e0fd6f9d0, FUTEX_WAIT, 12417, NULL^Cstrace: Process 12414 detached
 <detached ...>
```
这里我首先后台执行 thread 程序，然后使用 strace -p 跟踪进程 pid，发现一直没有新的系统调用打印出来。

### 执行 strace -p PID -f
执行 strace -p PID -f 能够看到子线程的系统调用能够监控到，测试过程记录如下；

```bash
[longyu@debian-10:23:11:04] The_C_Language $ sudo strace -p 12414 -f 
strace: Process 12414 attached with 2 threads
[pid 12414] futex(0x7f6e0fd6f9d0, FUTEX_WAIT, 12417, NULL <unfinished ...>
[pid 12417] restart_syscall(<... resuming interrupted nanosleep ...>) = 0
[pid 12417] nanosleep({tv_sec=0, tv_nsec=10000000}, NULL) = 0
[pid 12417] nanosleep({tv_sec=0, tv_nsec=10000000}, NULL) = 0
[pid 12417] nanosleep({tv_sec=0, tv_nsec=10000000}, NULL) = 0
[pid 12417] nanosleep({tv_sec=0, tv_nsec=10000000}, NULL) = 0
```
这里不断的打印 nanosleep，就是我们程序中的 usleep 调用的结果，但是这里有个问题，为什么 printf 的打印没有相关的 write 系统调用？

仔细查看终端输出，发现了如下信息：

```bash
[pid 12417] write(1, " times\nthread running 23319 time"..., 4096) = 4096
```
可以看出，这里向描述符 stdout 写入了 4096 个字符，printf 并不是没有执行 write 系统调用，只是它内部存在缓冲，这里明显是填满了缓冲区才执行系统调用，这种方式减少了系统调用的次数，提高了效率。

## 回到最初的问题
根据上文中的描述与测试程序的测试结果，确定之前遇到的 strace -p 没有追踪到系统调用的问题是没有添加 -f 选项，导致 strace 只跟踪 thread id 等于 PID 的线程，这个线程一般是领头线程，它正好阻塞的话，当然就没有系统调用执行喽，也就不会跟踪到喽。

## 思考与总结
能够被这种问题阻塞，只能说明我们对 strace 的一些细节功能并不是太清楚。

其实这个问题并没有太复杂，只需要使用 strace -p PID -f -t 来追终 server 的所有线程、子进程的系统调用及其时间，然后与系统中 dmesg 信息 netlink: xxx 打印的时间对比，当下一次出现问题的时候就能够找到出问题的点，这样这个问题就变得非常简单了。

可是正因为我们对 strace 的功能存在盲区，不得不从内核入手，最终却学习到了更多的知识，真是塞翁失马，焉知非福。


