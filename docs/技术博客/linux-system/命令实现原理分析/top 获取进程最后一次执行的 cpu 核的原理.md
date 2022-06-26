
# top 获取进程最后一次执行的 cpu 核的原理

使用 top -p xx 跟踪某个程序，按 f，然后选择 Last used cpu，然后按 Esc 就能够看到多出来的一列内容就是最后一次运行的 cpu。

# top 如何实现这一功能的？

strace top，发现如下系统调用：

```bash
stat("/proc/35251", {st_mode=S_IFDIR|0555, st_size=0, ...}) = 0
open("/proc/35251/stat", O_RDONLY)      = 8
read(8, "35251 (a.out) S 213180 35251 213"..., 1024) = 331
close(8)
```

man proc 查询到如下信息：

```bash
/proc/[pid]/stat
Status information about the process.  This is used by ps(1).  It is defined in /usr/src/linux/fs/proc/array.c.

processor %d (since Linux 2.2.8)
(39) CPU number last executed on.
```

如上信息表明，/proc/[pid]/stat 文件内容的第 39 列就表示进程最后一次执行的cpu 核。

