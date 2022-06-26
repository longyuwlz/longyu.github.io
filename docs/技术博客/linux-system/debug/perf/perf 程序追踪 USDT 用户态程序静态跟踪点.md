# perf 程序追踪 USDT 用户态程序静态跟踪点
## perf 中的 usdt
在学习 ebpf 的 usdt 探针的时候遇到了问题，看了一些网上的链接，在 gregg 大神的博客中找到了 perf 中与 usdt 相关的内容，就研究了一下。

perf 程序源码在内核源码树中的 ./tools/perf/ 目录中，进入到这个目录执行 make 进行编译即可。

编译完成后我执行 make install 后直接执行发现会报 perf_5.0 找不到的错误，make install V=1 发现 perf 被安装到了我的家目录下的 bin 目录中，先配置下环境变量凑合用吧。

## 上手 perf 的 usdt 追踪功能
如下命令从 [Static User Tracing](http://www.brendangregg.com/perf.html#StaticUserTracing) 中摘录。

```bash
# perf buildid-cache --add `which node`
# perf list | grep sdt_node
  sdt_node:gc__done                                  [SDT event]
  sdt_node:gc__start                                 [SDT event]
  sdt_node:http__client__request                     [SDT event]
  sdt_node:http__client__response                    [SDT event]
  sdt_node:http__server__request                     [SDT event]
  sdt_node:http__server__response                    [SDT event]
  sdt_node:net__server__connection                   [SDT event]
  sdt_node:net__stream__end                          [SDT event]
# perf record -e sdt_node:http__server__request -a
^C[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.446 MB perf.data (3 samples) ]
# perf script
            node  7646 [002]   361.012364: sdt_node:http__server__request: (dc2e69)
            node  7646 [002]   361.204718: sdt_node:http__server__request: (dc2e69)
            node  7646 [002]   361.363043: sdt_node:http__server__request: (dc2e69)
```
它使用了 node 程序的探测点，我想偷懒就用了一个简单的 hello_usdt 程序替换了 node 命令，程序代码如下：

```c
#include <sys/sdt.h>

int main(int argc, char const *argv[]) {
    DTRACE_PROBE(hello_usdt, probe-main);
    return 0;
}
```

perf list 报了如下错误：

```bash
Semantic error :sdt_hello-usdt is bad for event name -it must follow C symbol-naming rule.
```
看上去应该是事件的名称不符合 c 的符号命令规则，于是将代码修改为如下内容：

```c
#include <sys/sdt.h>

int main(int argc, char const *argv[]) {
    DTRACE_PROBE(hello_usdt, probe_main);
    return 0;
}
```
修改完成后重新编译，重新执行上面的步骤，perf list 这次能够看到如下内容：

```bash
  sdt_hello_usdt:probe_main                          [SDT event]
```
执行 perf record 的时候报了如下错误：

```bash
[root@debian-10:10:30:33] usdt # perf record -e sdt_hello_usdt:probe_main -a
event syntax error: 'sdt_hello_usdt:probe_main'
                     \___ unknown tracepoint

Error:	File /sys/kernel/debug/tracing/events/sdt_hello_usdt/probe_main not found.
Hint:	SDT event cannot be directly recorded on.
	Please first use 'perf probe sdt_hello_usdt:probe_main' before recording it.

Run 'perf list' for a list of valid events

 Usage: perf record [<options>] [<command>]
    or: perf record [<options>] -- <command> [<options>]

    -e, --event <event>   event selector. use 'perf list' to list available events
```
首先检查 tracing/events 子目录中确实不存在 sdt_hello_usdt，看后面的提示需要先执行一下 perf probe，就操作了一下。

操作后再次执行 perl list 并搜索 sdt 得到了如下信息：
```bash
  sdt_hello_usdt:probe_main                          [Tracepoint event]
  sdt_hello_usdt:probe_main                          [SDT event]
```
然后重新执行 perf record，这次没有报错，运行了这个 perf 命令后，在其它终端中执行一次 hello_usdt 程序，然后在 perf 所在的终端按 Ctrl+C 退出 perf。

操作记录如下：

```bash
[root@debian-10:10:37:31] usdt # perf record -e sdt_hello_usdt:probe_main -a
^C[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 1.137 MB perf.data (1 samples) ]
```
最后的 1 samples 表示捕获到了一次事件，执行 perf script 来查看记录的内容，操作记录如下：

```bash
[root@debian-10:10:38:10] usdt # perf script
      hello_usdt  5457 [005] 25700.337067: sdt_hello_usdt:probe_main: (563b1d927130)
```
能够看到成功捕获到了！但是 USDT 真正生效了吗？

## 检查 USDT 是否生效 

为了验证这点，我将上面的 hello_usdt 的代码修改为如下内容：

```c
#include <sys/sdt.h>
#include <unistd.h>
#include <stdio.h>

int add(int a, int b) {
	DTRACE_PROBE(hello_usdt, probe_main);

	return a + b;
}
int main(int argc, char const *argv[]) {

    while (1) {
    	printf("result is %d\n", add(1, 2));
		sleep(1);
    }
    return 0;
}
```

添加跟踪点的过程与上面一致，这里我在 perf record 程序执行后，执行 hello_usdt 程序，在终端中打印了 **result is 3** 后我使用 gdb -p 跟踪 hello_usdt 程序，反汇编 add 函数，得到了如下信息：

```bash
(gdb) disass add
Dump of assembler code for function add:
   0x0000565285243145 <+0>:	push   %rbp
   0x0000565285243146 <+1>:	mov    %rsp,%rbp
   0x0000565285243149 <+4>:	mov    %edi,-0x4(%rbp)
   0x000056528524314c <+7>:	mov    %esi,-0x8(%rbp)
   0x000056528524314f <+10>:	int3   
   0x0000565285243150 <+11>:	mov    -0x4(%rbp),%edx
   0x0000565285243153 <+14>:	mov    -0x8(%rbp),%eax
   0x0000565285243156 <+17>:	add    %edx,%eax
   0x0000565285243158 <+19>:	pop    %rbp
   0x0000565285243159 <+20>:	retq   
End of assembler dump.
```
可以看到 10 偏移量处的指令被替换为了 int3，这表示 usdt 生效。

## perf 的其它功能

### 1. 追踪内核函数中某变量的值
```bash
[root@debian-10:23:36:18] perf # ./perf probe -a 'dev_ethtool ifr->ifr_ifrn.ifrn_name[0]'
Added new event:
  probe:dev_ethtool    (on dev_ethtool with ifrn_name=ifr->ifr_ifrn.ifrn_name[0])

You can now use it in all perf tools, such as:

	perf record -e probe:dev_ethtool -aR sleep 1

[root@debian-10:23:36:31] perf # ./perf record -e probe:dev_ethtool -aR sleep 100
^C[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 1.041 MB perf.data (25 samples) ]

[root@debian-10:23:36:48] perf # ./perf report -n
# To display the perf.data header info, please use --header/--header-only options.
#
#
# Total Lost Samples: 0
#
# Samples: 25  of event 'probe:dev_ethtool'
# Event count (approx.): 25
#
# Overhead       Samples  Trace output                    
# ........  ............  ................................
#
   100.00%            25  (ffffffff9f5ed470) ifrn_name=119
```

上述示例打印出了 dev_ethtool 函数中 ifr->ifr_ifrn.ifrn_name[0] 的值，这个数字为 119，表示的是小写字母 w，而我执行的命令就是 **ethtool wlp0s20f3，ifrn_name 中存储的就是 wlp0s20f3 这个字符串**。

### 2. perf 查看内核堆栈
这个功能可以用于研究内核，查看内核中某个函数的调用关系，示例如下：
```bash
[root@debian-10:23:41:21] perf # ./perf record -e probe:dev_ethtool -a -g -- sleep 100
^C[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 1.094 MB perf.data (5 samples) ]
[root@debian-10:23:41:56] perf # ./perf report --stdio
# To display the perf.data header info, please use --header/--header-only options.
#
#
# Total Lost Samples: 0
#
# Samples: 5  of event 'probe:dev_ethtool'
# Event count (approx.): 5
#
# Children      Self  Trace output      
# ........  ........  ..................
#
   100.00%   100.00%  (ffffffff9f5ed470)
            |
            ---0x3d4c4c4548530033
               0x3
               ioctl
               entry_SYSCALL_64
               do_syscall_64
               __x64_sys_ioctl
               ksys_ioctl
               do_vfs_ioctl
               sock_ioctl
               sock_do_ioctl
               dev_ioctl
               dev_ethtool
..........
```
其实这个示例与第一个示例操作过程大致相同，只是在 perf record 的时候添加了一个 -g 参数，执行 perf record -h 得到了如下描述信息：

```bash
    -g                    enables call-graph recording
```
我觉得这个功能挺实用的，我以前用过 dump_stack 来打印内核堆栈信息，这种方式需要修改源码，有了 perf 的这个功能几行命令就可以看函数调用信息了！

### 3. perf vs strace
gregg 的博客中提到了 perf 与 strace 的对比，这个内容我有点兴趣。strace 命令的原理我是比较清楚的，但是 perf 的原理我还一知半解。不过对于两者对程序性能的影响这个问题倒是已经有些研究了。

strace 的原理在 《LINUX 内核源代码情景分析》中有非常详细的描述，它与 gdb 类似，都是使用了 ptrace 系统调用来完成工作。

strace 跟踪的子进程会在系统调用执行前后都停下来，并向 strace 进程发送信号，然后 strace 执行 ptrace 获取相关的信息，再发信号到子进程恢复其执行，这意味着 strace 将会对程序的性能带来直接的影响。

下面的测试方法来自于 [Linux perf Examples](http://www.brendangregg.com/perf.html#StaticUserTracing) 这篇博客。

#### 正常状态下的性能测试
```bash
[root@debian-10:23:51:36] perf # dd if=/dev/zero of=/dev/null bs=512 count=10000k
记录了10240000+0 的读入
记录了10240000+0 的写出
5242880000 bytes (5.2 GB, 4.9 GiB) copied, 3.77995 s, 1.4 GB/s
```
总共花了不到 4s 的时间，速度在 1.4GB/s

#### 使用 strace 跟踪下的性能测试
strace -c 选项告诉 strace 在跟踪系统调用的同时统计不同类型系统调用的执行次数。

```bash
[root@debian-10:23:47:54] perf #  strace -c dd if=/dev/zero of=/dev/null bs=512 count=10000k
^Cstrace: Process 16264 detached
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 50.90   13.133820           2   5162749           read
 49.10   12.671348           2   5162748           write
  0.00    0.000000           0         6           close
  0.00    0.000000           0         4           fstat
  0.00    0.000000           0         1           lseek
  0.00    0.000000           0         9           mmap
  0.00    0.000000           0         4           mprotect
  0.00    0.000000           0         2           munmap
  0.00    0.000000           0         3           brk
  0.00    0.000000           0         3           rt_sigaction
  0.00    0.000000           0         1           access
  0.00    0.000000           0         2           dup2
  0.00    0.000000           0         1           execve
  0.00    0.000000           0         1           arch_prctl
  0.00    0.000000           0         6           openat
------ ----------- ----------- --------- --------- ----------------
100.00   25.805168              10325540           total
记录了5162748+0 的读入
记录了5162748+0 的写出
2643326976 bytes (2.6 GB, 2.5 GiB) copied, 110.966 s, 23.8 MB/s
```
上述命令已经执行了快 2 分钟还没有结束，因此我就按了 Ctrl + C 终止了。可以看到它的性能急剧下降，拷贝速度只有 23.8 MB/s。

#### 使用 perf 跟踪下的性能测试
```bash
[root@debian-10:23:51:18] perf # ./perf stat -e 'syscalls:sys_enter_*' dd if=/dev/zero of=/dev/null bs=512 count=10000k
记录了10240000+0 的读入
记录了10240000+0 的写出
5242880000 bytes (5.2 GB, 4.9 GiB) copied, 4.62303 s, 1.1 GB/s

 Performance counter stats for 'dd if=/dev/zero of=/dev/null bs=512 count=10000k':

                 0      syscalls:sys_enter_socket                                   
                 0      syscalls:sys_enter_socketpair                                   
                 0      syscalls:sys_enter_bind                                     
                 0      syscalls:sys_enter_listen                                   
                 ..........
```
可以看到它花了快 5s 的时间就拷贝完了，速度在 1.1 GB/s。

#### 性能损耗总结
使用 strace 跟踪比正常情况慢了 60.2 倍左右，使用 perf 跟踪比正常情况慢了 1.2 倍左右。

当系统调用不太频繁时 strace 与 perf 跟踪程序对程序性能的影响不会这样大，系统调用越频繁差距将会拉的越大。

这里性能测试的结果反映出了 perf 与 strace 执行过程的不同。

**strace 会导致子进程在执行每一个系统调用的前后都停下来，并且 strace 自身调用 ptrace 获取信息也有很大的损耗，而 perf 使用了内核中的 tracepoint 来跟踪系统调用，其信息的采集完全在内核中完成，只在最后完成的时候才会输出到用户态中，对程序性能的影响相较 strace 要低很多！**

### perf 支持多少 tracepoint 点呢
执行如下程序统计我使用的 5.0 内核中 tracepoing 的数目，得到了如下信息：

```bash
[root@debian-10:23:59:51] perf # ./perf list | awk -F: '/Tracepoint event/ { lib[$1]++ } END {
> for (l in lib) { printf "  %-16.16s %d\n", l, lib[l] } }' | sort | column
    alarmtimer     4	    fib            1	    intel-sst      10	    mmc            2	    probe          3	    sdt_hello_usdt 1	    udp            1
    asoc           13	    fib6           1	    iommu          7	    module         5	    probe_hello_us 1	    signal         2	    v4l2           6
    block          18	    filelock       11	    irq            5	    mpx            5	    probe_libc     1	    skb            3	    vb2            4
    bridge         4	    filemap        4	    irq_matrix     12	    msr            3	    qdisc          1	    smbus          4	    vmscan         16
    btrfs          65	    fs_dax         14	    irq_vectors    34	    napi           1	    random         15	    sock           3	    vsyscall       1
    cfg80211       164	    ftrace         2	    jbd2           16	    net            17	    ras            6	    spi            7	    wbt            4
    cgroup         9	    gpio           2	    kmem           12	    nfsd           23	    raw_syscalls   2	    sunrpc         36	    workqueue      4
    clk            16	    hda            5	    kvm            70	    nmi            1	    rcu            1	    swiotlb        1	    writeback      29
    compaction     14	    hda_controller 6	    kvmmmu         14	    nvme           4	    regmap         15	    syscalls       640	    x86_fpu        12
    cpuhp          3	    hda_intel      4	    libata         6	    oom            8	    regulator      7	    task           2	    xdp            8
    devlink        1	    huge_memory    4	    mac80211       123	    page_isolation 1	    rpm            4	    tcp            7	    xen            27
    dma_fence      7	    hwmon          3	    mce            1	    pagemap        2	    rseq           2	    thermal        5	    xhci-hcd       48
    drm            3	    i2c            4	    mdio           1	    percpu         5	    rtc            12	    timer          13
    exceptions     2	    i915           36	    mei            3	    power          23	    sched          24	    tlb            1
    ext4           105	    initcall       3	    migrate        1	    printk         1	    scsi           5	    ucsi           7
```
可以看到它基本上覆盖了内核代码中的主要子模块，支持的系统调用的 tracepoint 的数目是 320 个左右（一个系统调用有 enter 与 exit 两个，不确定是否有不成对存在的项目）。

## 总结
perf 的功能比我们所了解的还要多出许多，很多功能是非常实用滴，下一次需要某些功能时就执行下 perf xx -h 命令吧！

