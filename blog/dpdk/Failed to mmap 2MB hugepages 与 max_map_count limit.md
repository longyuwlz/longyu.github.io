## 问题描述

### 设备内存信息
```bash
# free -h
              total        used        free      shared  buff/cache   available
Mem:            15G        8.1G        7.0G         22M        512M        7.4G
Swap:            0B          0B          0B
```

### l2fwd 运行报错信息

```bash
# ./l2fwd  -m 64 -- -p0x1
dpdk revision : 41333
EAL: Detected lcore 0 as core 0 on socket 0
EAL: Detected lcore 1 as core 1 on socket 0
EAL: Detected lcore 2 as core 0 on socket 0
EAL: Detected lcore 3 as core 1 on socket 0
EAL: Support maximum 128 logical core(s) by configuration.
EAL: Detected 4 lcore(s)
EAL: Probing VFIO support...
EAL: Module /sys/module/vfio_pci not found! error 2 (No such file or directory)
EAL: VFIO modules not loaded, skipping VFIO support...
EAL: Setting up child physically contiguous memory...
EAL: map_all_hugepages(): mmap failed: Cannot allocate memory
EAL: Failed to mmap 2 MB hugepages
PANIC in rte_eal_init():
Cannot init memory
Aborted
```

关键信息如下：

```
EAL: map_all_hugepages(): mmap failed: Cannot allocate memory
EAL: Failed to mmap 2 MB hugepages
```

从输出信息看问题是 mmap 映射大页的时候失败了，看不出其它问题。

## strace 跟踪扩大问题输入

strace 跟踪确认问题如下：

```bash
open("/dev/hugepages/rtemap_3061", O_RDWR|O_CREAT, 0755) = 5
mmap(0x17ea00000, 2097152, PROT_READ|PROT_WRITE, MAP_SHARED|MAP_POPULATE, 5, 0) = -1 ENOMEM (Cannot allocate memory)
```

在 mmap 第 3061 个 hugepage 的时候报错，根本问题是 mmap 映射失败，出错 mmap 系统调用的返回值是 ENOMEM。

man mmap 找到下面这些与 ENOMEM 相关的信息：

```bash
       ENOMEM No memory is available.

       ENOMEM The  process's  maximum  number  of mappings would have been exceeded.  This error can also occur for munmap(),
              when unmapping a region in the middle of an existing mapping, since this results in two smaller mappings on ei‐
              ther side of the region being unmapped.

       ENOMEM (since Linux 4.7) The process's RLIMIT_DATA limit, described in getrlimit(2), would have been exceeded.
```

上面的信息描述了如下三种不同的问题：

1. 没有可用内存
2. 超过了进程的最大映射数目
3. 超过了进程的 RLIMIT_DATA 限制

ulimit 查看获取到如下信息：

```bash
# ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 63812
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 63812
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

确认 ulimit 没有相关的限制设定内容。

## vm.max_map_count 设定

经过大佬提醒，这个问题可能与 vm.max_map_count 设定有关，查看系统中的设定内容如下：


```
# sysctl -a | grep vm.max_map_count
vm.max_map_count = 3096
```

执行如下命令增加 max_map_count 值后重试，问题得到解决。

```bash
echo 65535 > /proc/sys/vm/max_map_count
```

这里的问题实际上与 man mmap 得到的信息中对 ENOMEM 的第二种解释符合，只不过 manual 中没有直接指出 max_map_count 的限定。

## vm.max_map_count 是干嘛的？

从内核 Documentation 目录中 sysctl/vm.txt 文件中找到了下面这些描述信息：

```man
max_map_count:

This file contains the maximum number of memory map areas a process
may have. Memory map areas are used as a side-effect of calling
malloc, directly by mmap and mprotect, and also when loading shared
libraries.

While most applications need less than a thousand maps, certain
programs, particularly malloc debuggers, may consume lots of them,
e.g., up to one or two maps per allocation.

The default value is 65536.
```

这个 max_map_count 是用来限定进程内存 map 区域的最大数量，每次 mmap 成功内部的 map_count 都会加 1，当内部 mmap_count 大于 sysctl 设定的 max_count 数目时 mmap 会返回 -ENOMEM。

mmap 流程中相关代码如下：

```c
        /* Too many mappings? */
        if (mm->map_count > sysctl_max_map_count)
                return -ENOMEM;
```

同时 munmap 的时候会将内部的 map_count 减 1，而要改变这个数量，可以通过 sysctl 来重新设定，也可以通过写入 /proc/sys/vm/max_map_count 文件来完成，需要注意的是这个限定是全局的，会影响所有的进程。

如果需要永久生效，可以将配置写入到 /etc/sysctl.conf 文件中。

## dpdk-16.04 -m 参数的原理

在这个问题中，l2fwd 命令运行参数如下：

```bash
./l2fwd  -m 64 -- -p0x1
```

指定了 -m 参数限定映射的大页空间为 64M，按照一般的思路不应该出这种问题，但其实如果进一步研究 16.04 hugepage 映射的过程，能够发现如下信息：

dpdk-16.04 会在程序初始化的时候 map 所有的大页，这个行为没有参数来控制。-m 参数实际在映射所有大页的行为之后处理，通过解除超过数量的映射来实现。

这个实现是不合理的，听说高版本已经解决了这个问题，需要研究一下。




