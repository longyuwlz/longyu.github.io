# dpdk程序启动顺序引发的血案
## 问题描述
在某个特定的场景中，**dpdk primary** 进程在宿主机上运行，在 **dpdk primary** 进程运行前，宿主机上的**某 A 程序**负责创建 **/dev/hugepages** 目录并挂载 **hugetlbfs** 到此目录中。

同时在此宿主机上也以**容器**为基本单位指定特权模式运行其它的 **dpdk secondary** 进程，**dpdk secondary** 进程需要与 **primary** 进程共享的目录通过**容器启动参数**来映射。

容器的启动时机与 **A 程序**创建 /dev/hugepages 目录并挂载大页内存的时序没有严格保证。

在某次测试时，容器内的 dpdk secondary 进程初始化报了如下错误：

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
上述报错信息表面上看是内存获取失败，做了如下排查：
1. 容器内 hugetlbfs 挂载排查 -- 正常挂载
2. 容器内 /dev/hugepages 目录中映射的大页内存内容排查 -- 内容均为 0x00
3. 宿主机内 /dev/hugepages 目录中映射的大页内存内容排查 -- 内容正常

问题指向容器映射的 **/dev/hugepages** 目录**存在异常**，进一步分析，怀疑容器在 **A 程序**创建 **/dev/hugepages** 目录前就已经启动。此时由于 **/dev/hugepages** 目录还没有创建，**容器自动创建了该目录并成功启动**，此后 A 程序在宿主机上挂载 hugetlbfs 到 /dev/hugepages 目录中，dpdk primary 进程正常运行，而容器内的 **secondary** 进程由于**没有挂载 hugetlbfs** 而无法启动。

那有哪些证据来支撑这个怀疑呢？

经过一些思考交流后，确认有如下信息就能够在一定程度上说明问题：
1. 容器内 /dev/hugepages 文件的创建时间
2. 容器的启动时间
3. 容器的启动时间早于 /dev/hugepages 文件的创建时间
4. 在宿主机上 umount 掉 hugetlbfs 后查看 /dev/hugepages 的 inode 号并与容器内的对比

那么问题来了：**该如何获取 /dev/hugepages 目录的创建时间呢？**
ctime 立刻涌出了脑海，可是过去的经验告诉我 ctime 根本不代表文件的创建时间，它的全称是 **change time，而非 create time**，也就是说我其实压根不知道该如何获取文件的创建时间。

## 搜索互联网
使用关键词 “find file create time on linux” 搜索，找到如下链接

[https://unix.stackexchange.com/questions/20460/how-do-i-do-a-ls-and-then-sort-the-results-by-date-created](https://unix.stackexchange.com/questions/20460/how-do-i-do-a-ls-and-then-sort-the-results-by-date-created)

此链接中描述了在 linux 中获取文件创建时间的方法，get 到了新的技能，同时我也完成了本篇文章的部分草稿。

在 linux 4.11 内核中，引入了一个 statx 系统调用，对于特定的文件系统如 ext4、xfs，支持通过 statx 结构的 stx_btime 字段获取文件的创建时间。

使用示例如下：

```bash
[longyu@debian] ~ $ stat ./file_backup/
  File: ./file_backup/
  Size: 4096      	Blocks: 8          IO Block: 4096   directory
Device: 10308h/66312d	Inode: 1572919     Links: 4
Access: (0755/drwxr-xr-x)  Uid: ( 1000/  longyu)   Gid: ( 1001/ UNKNOWN)
Access: 2022-04-18 20:16:01.562883033 +0800
Modify: 2021-02-10 20:37:36.536293084 +0800
Change: 2021-02-10 20:37:36.536293084 +0800
 Birth: 2019-12-06 21:25:25.340826235 +0800
```
上述输出的最后一项 Birth 就代表文件的创建时间。整理这篇博客的时候我发现获取文件的创建时间在本文描述的问题中根本不可用，关键的问题在于 /dev/ 挂载点的文件系统为 devtmpfs，这个文件系统目前压根不支持获取文件的创建时间
！

## 灵机一动
写的过程中突然想到其实有一个非常关键的证据能够证明上文的怀疑点，基于如下几个基础的认识：
1. 容器内的挂载点信息与宿主机是隔离的，这一点由 namespace 保证
2. 容器尽管可能会创建 /dev/hugepages 目录，但是不会挂载 hugetlbfs 
3. 容器内未挂载 hugetlbfs，则在容器内访问 /proc/mounts 文件，其输出中一定检索不出来 hugetlbfs 的挂载点

于是重新 check 了下容器内 /proc/mounts 文件内容，却发现存在 hugetlbfs 的挂载点，问题仿佛又走入了死胡同。

此后，我们继续确认了如下信息：
1. 宿主机上的 /dev/hugepages 目录的 inode 与容器内 /dev/hugepages 目录中的 inode 不一致
2. 在宿主机上 umount 一次 hugetlbfs 后，宿主机与容器内 /dev/hugepages inode 号一致

在上面操作的基础上，我们发现宿主机上 umount 一次 hugetlbfs 后 /proc/mounts 文件中还是有 hugetlbfs 的挂载点，也是在 /dev/hugepages 目录中，只不过挂载参数与之前的有些区别，这说明 **hugetlbfs 在 /dev/hugepages 目录上被挂载了两次**。

## 谁挂载了 hugetlbfs？
将系统中的 mount 命令用一个 shell 脚本覆盖，在脚本中获取父进程的 pid 并通过访问 /proc/ 目录下的文件来记录信息，包含调用时间、 cmdline、comm 信息，修改完成后重启系统，启动完成后查看记录信息，发现有两个调用者：
1. /sbin/init
2. 某 A 程序

这次仍旧能够复现问题，此时查看容器的启动时间，发现容器启动时间在**两次 hugetlbfs 的挂载中间**，而宿主机中 dpdk primary 进程的启动时间在**第二次 hugetlbfs 挂载之后**。

两次 hugetlbfs 的挂载属于历史代码继承，抛开这个问题，根本原因在与容器的启动时序不正常，它应该在第二次 hugetlbfs 挂载之后、dpdk primary 进程启动后再启动。

**修改启动时序**，问题得到解决。

## 总结
本文是在解决问题后编写的总结，其实自己对一些关键的信息已经有些模糊，这算是一种事后的复盘与重演。

在写的过程中我发现了一些新的思路，虽然不能用于这一次问题定位，但是通过总结，我的思路更宽阔了。

最后我想提出一个问题：

对于自己未知的如何获取文件创建时间的知识，真的成为了阻碍问题推进的原因吗？

答案显而易见！