# blockdev getsize64 的实现
最近在整 initrd 的时候，发现 initrd 中缺少 blockdev 命令，我们的 initrd 中需要用这个命令来获取磁盘的大小，fdisk 命令倒是有，但是不支持 fdisk -s。

既然这样我就直接把 blockdev 中 getsize64 的代码抠出来，单独编写个程序来搞。同时为了不添加其它的动态库，使用静态链接来编译程序。

源码如下：

```c
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <sys/stat.h>

#ifndef BLKGETSIZE64
#define BLKGETSIZE64 _IOR(0x12,114,size_t)
#endif

int main(int argc, char *argv[])
{
    int fd;
    unsigned long long size = -1;
    struct stat stat;

    if (argc < 3) {
        printf("invalid argument\n");
        return -1;
    }

    if ((fd = open(argv[2], O_RDONLY)) < 0) {
              printf("open %s failed\n", argv[2]);
              return -1;
    }

    if (ioctl(fd, BLKGETSIZE64, &size) < 0) {
        close(fd);
        printf("ioctl failed\n");
        return -1;
    }

    close(fd);
    printf("%llu\n", size);

    return 0;
}
```

代码逻辑非常简单，首先打开设备文件，然后执行 ioctl，然后输出信息即可。

编译后执行，其参数与 blockdev 一样，其实 --getsize64 参数根本没有任何作用，只是为了不修改 initrd 中的代码这样搞得。

执行信息摘录如下：
```bash
root@longyu:/home/longyu# ./blockdev --getsize64 /dev/vda
21474836480
```
系统中的 blockdev 程序执行得到的信息摘录如下：
```bash
root@longyu:/home/longyu# blockdev --getsize64 /dev/vda
21474836480
```
可以看到获取到的磁盘大小一致，测试通过。


