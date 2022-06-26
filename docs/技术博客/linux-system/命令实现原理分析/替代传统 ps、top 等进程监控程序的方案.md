# 替代传统 ps、top 等进程监控程序的方案
## 传统的 ps、top 命令的工作原理与缺点
在 linux 中，我们一般会使用 ps 与 top 命令来**获取**系统中的**进程信息**。
ps 与 top 命令其工作原理是通过**扫描** /proc 下的每个 **pid 子目录**来
收集信息，这样的方式非常**简单**，却有如下几个缺点：

1. **需要执行许多次系统调用**

	对于每一个 pid 至少需要三次系统调用——open, read, close

2. **多种格式**

	/proc/PID 目录中有需要不同的文件格式，这意味着对每种特定的格式都要
编写解析器。

3. **不可扩展的格式**

	一些位于 /proc/PID 中的格式是不可扩展的。例如，/proc/PID/maps 的
最后一列（文件名）是可选的，因此没有其它方式来打破当前的格式以添加更多的列。

4. **额外的信息负载造成读取速度降低**

	一些时候，获取信息的速度会由于获取一些不需要的属性信息而变慢。例如，/proc/PID/smaps 包含 VmFlags 字段（不能被添加到 /proc/PID/maps
，中，但是其中也包含了需要花较长时间来生成的页统计信息）。


以上信息摘自：[add a new interface to get information about processes ](https://lwn.net/Articles/683371/)。

## 网上搜到的相关内容

从上面提到的信息中，我们可以看到 ps 与 top 命令所代表的 linux 中传统
、程序信息获取、监控工具**需要进行改进**。从网上能够搜索到两种类似的解决方案，
两者都使用了 **netlink 来获取进程信息**，具体的细节又有所区别。

## task_diag 方式
task_diag 需要对内核进行修改以提供必要的功能，项目 github 地址如下：

[linux task diag](https://github.com/avagin/linux-task-diag)

这个方式不仅需要修改内核，还需要编写用户态程序来接收、解析 netlink 消息。

此项目基于 **linux 5.8** 内核修改，更早的版本需要**进行适配**。这个方案中会创
建一个 /proc/task_diag 文件，这个文件的控制依赖如下规则进行：

>1. 传输：写请求，读回复
>2. netlink 信息格式 (与 sock_diag 使用的类似，数据是二进制格式并且可以
扩展)
> 3. 可以支持获取指定集合的进程信息**
> 4. 可选的属性组信息 一个组中的任何一个属性都不会影响响应时间。

更多的信息请访问 [linux task diag](https://github.com/avagin/linux-task-diag)。

## connector 的实例 cn_proc 驱动
connector 提供了一种统一的用户态与内核态之间通过 netlink socket 协议层
进行通信的**标准框架**，它实现了一种**虚拟设备**，通过这种设备内核可
以与用户态程序通过 netlink 进行通信，传输固定格式信息的报文。

cn_proc 驱动使用了 connector 驱动，**能够将进程事件报告给用户态程序**。它
会发送诸如进程 fork、exec、id change (uid，gid，suid，etc 等)，以及
exit 事件的 netlink 消息。

cn_proc 驱动针对不同的进程事件编写了不同的事件处理函数，这些事件处理函
数执行的过程大抵相同，都有如下步骤：

>1. 使用传入的参数（进程的 task_struct 指针、其它值）制作消息与事件
>2. 调用 connector 框架提供的 cn_netlink_send 函数发送 netlink 消息

这里需要注意的在调用 cn_netlink_sendcn_netlink_send 函数发送 netlink 消息前，需要**设定消息的 seq 号**，为了保持这个 seq 号的**一致性**，在调用 cn_netlink_send 时会**关闭内核抢占功能**。

在内核代码中搜索，能够检索到如下相关代码：


```c
./exec.c:1701:		proc_exec_connector(current);
./exit.c:901:	proc_exit_connector(tsk);
./ptrace.c:455:		proc_ptrace_connector(task, PTRACE_ATTACH);
./ptrace.c:565:	proc_ptrace_connector(child, PTRACE_DETACH);
./signal.c:2564:			proc_coredump_connector(current);
./cred.c:491:		proc_id_connector(task, PROC_EVENT_UID);
./cred.c:497:		proc_id_connector(task, PROC_EVENT_GID);
./sys.c:1182:		proc_sid_connector(group_leader);
./sys.c:2326:		proc_comm_connector(me);
./fork.c:2079:	proc_fork_connector(p);
```
可以看到，多个进程的状态事件，诸如 fork、exec、exit、traced 都会发送相
应的 netlink 消息。

### cn_proc 驱动使用 demo

demo 摘自——[linux process monitoring (exec, fork, exit, set*uid, set*gid)](https://bewareofgeek.livejournal.com/2945.html)

```c
#include <sys/socket.h>
#include <linux/netlink.h>
#include <linux/connector.h>
#include <linux/cn_proc.h>
#include <signal.h>
#include <errno.h>
#include <stdbool.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

/*
 * connect to netlink
 * returns netlink socket, or -1 on error
 */
static int nl_connect()
{
    int rc;
    int nl_sock;
    struct sockaddr_nl sa_nl;

    nl_sock = socket(PF_NETLINK, SOCK_DGRAM, NETLINK_CONNECTOR);
    if (nl_sock == -1) {
        perror("socket");
        return -1;
    }

    sa_nl.nl_family = AF_NETLINK;
    sa_nl.nl_groups = CN_IDX_PROC;
    sa_nl.nl_pid = getpid();

    rc = bind(nl_sock, (struct sockaddr *)&sa_nl, sizeof(sa_nl));
    if (rc == -1) {
        perror("bind");
        close(nl_sock);
        return -1;
    }

    return nl_sock;
}

/*
 * subscribe on proc events (process notifications)
 */
static int set_proc_ev_listen(int nl_sock, bool enable)
{
    int rc;
    struct __attribute__ ((aligned(NLMSG_ALIGNTO))) {
        struct nlmsghdr nl_hdr;
        struct __attribute__ ((__packed__)) {
            struct cn_msg cn_msg;
            enum proc_cn_mcast_op cn_mcast;
        };
    } nlcn_msg;

    memset(&nlcn_msg, 0, sizeof(nlcn_msg));
    nlcn_msg.nl_hdr.nlmsg_len = sizeof(nlcn_msg);
    nlcn_msg.nl_hdr.nlmsg_pid = getpid();
    nlcn_msg.nl_hdr.nlmsg_type = NLMSG_DONE;

    nlcn_msg.cn_msg.id.idx = CN_IDX_PROC;
    nlcn_msg.cn_msg.id.val = CN_VAL_PROC;
    nlcn_msg.cn_msg.len = sizeof(enum proc_cn_mcast_op);

    nlcn_msg.cn_mcast = enable ? PROC_CN_MCAST_LISTEN : PROC_CN_MCAST_IGNORE;

    rc = send(nl_sock, &nlcn_msg, sizeof(nlcn_msg), 0);
    if (rc == -1) {
        perror("netlink send");
        return -1;
    }

    return 0;
}

/*
 * handle a single process event
 */
static volatile bool need_exit = false;
static int handle_proc_ev(int nl_sock)
{
    int rc;
    struct __attribute__ ((aligned(NLMSG_ALIGNTO))) {
        struct nlmsghdr nl_hdr;
        struct __attribute__ ((__packed__)) {
            struct cn_msg cn_msg;
            struct proc_event proc_ev;
        };
    } nlcn_msg;

    while (!need_exit) {
        rc = recv(nl_sock, &nlcn_msg, sizeof(nlcn_msg), 0);
        if (rc == 0) {
            /* shutdown? */
            return 0;
        } else if (rc == -1) {
            if (errno == EINTR) continue;
            perror("netlink recv");
            return -1;
        }
        switch (nlcn_msg.proc_ev.what) {
            case PROC_EVENT_NONE:
                printf("set mcast listen ok\n");
                break;
            case PROC_EVENT_FORK:
                printf("fork: parent tid=%d pid=%d -> child tid=%d pid=%d\n",
                        nlcn_msg.proc_ev.event_data.fork.parent_pid,
                        nlcn_msg.proc_ev.event_data.fork.parent_tgid,
                        nlcn_msg.proc_ev.event_data.fork.child_pid,
                        nlcn_msg.proc_ev.event_data.fork.child_tgid);
                break;
            case PROC_EVENT_EXEC:
                printf("exec: tid=%d pid=%d\n",
                        nlcn_msg.proc_ev.event_data.exec.process_pid,
                        nlcn_msg.proc_ev.event_data.exec.process_tgid);
                break;
            case PROC_EVENT_UID:
                printf("uid change: tid=%d pid=%d from %d to %d\n",
                        nlcn_msg.proc_ev.event_data.id.process_pid,
                        nlcn_msg.proc_ev.event_data.id.process_tgid,
                        nlcn_msg.proc_ev.event_data.id.r.ruid,
                        nlcn_msg.proc_ev.event_data.id.e.euid);
                break;
            case PROC_EVENT_GID:
                printf("gid change: tid=%d pid=%d from %d to %d\n",
                        nlcn_msg.proc_ev.event_data.id.process_pid,
                        nlcn_msg.proc_ev.event_data.id.process_tgid,
                        nlcn_msg.proc_ev.event_data.id.r.rgid,
                        nlcn_msg.proc_ev.event_data.id.e.egid);
                break;
            case PROC_EVENT_EXIT:
                printf("exit: tid=%d pid=%d exit_code=%d\n",
                        nlcn_msg.proc_ev.event_data.exit.process_pid,
                        nlcn_msg.proc_ev.event_data.exit.process_tgid,
                        nlcn_msg.proc_ev.event_data.exit.exit_code);
                break;
            default:
                printf("unhandled proc event\n");
                break;
        }
    }

    return 0;
}

static void on_sigint(int unused)
{
    need_exit = true;
}

int main(int argc, const char *argv[])
{
    int nl_sock;
    int rc = EXIT_SUCCESS;

    signal(SIGINT, &on_sigint);
    siginterrupt(SIGINT, true);

    nl_sock = nl_connect();
    if (nl_sock == -1)
        exit(EXIT_FAILURE);

    rc = set_proc_ev_listen(nl_sock, true);
    if (rc == -1) {
        rc = EXIT_FAILURE;
        goto out;
    }

    rc = handle_proc_ev(nl_sock);
    if (rc == -1) {
        rc = EXIT_FAILURE;
        goto out;
    }

	set_proc_ev_listen(nl_sock, false);

out:
    close(nl_sock);
    exit(rc);
}
```

运行示例如下；

```bash
[longyu@debian-10:18:12:28] program-problem $ sudo ./a.out 
[sudo] longyu 的密码：
set mcast listen ok
fork: parent tid=2759 pid=2759 -> child tid=9529 pid=9529
unhandled proc event
exec: tid=9529 pid=9529
fork: parent tid=2759 pid=2759 -> child tid=9530 pid=9530
fork: parent tid=9529 pid=9529 -> child tid=9531 pid=9531
gid change: tid=9530 pid=9530 from 1001 to 43
exec: tid=9530 pid=9530
exec: tid=9531 pid=9531
exit: tid=9530 pid=9530 exit_code=0
exit: tid=9531 pid=9531 exit_code=0
fork: parent tid=9529 pid=9529 -> child tid=9532 pid=9532
exec: tid=9532 pid=9532
exit: tid=9532 pid=9532 exit_code=0
fork: parent tid=9529 pid=9529 -> child tid=9533 pid=9533
exec: tid=9533 pid=9533
exit: tid=9533 pid=9533 exit_code=0
```
通过终端输出能够看到在进程 fork、exec、exit、gid change 的时候都能够接
收到相应的事件消息。

可以对上述 demo 进行扩展，在**开机**的时候将修改后的程序作为一个 **daemon** 来运行，这个 **daemon** 通过接收内核 **netlink** 消息来监**控进程状态**，可以在程序内部按照进程状态划分添加多个队列，同时将这个 daemon 作为一个 server 程序，另外编写一个客户端程序来获取进程信息以完成进程信息查询任务。



