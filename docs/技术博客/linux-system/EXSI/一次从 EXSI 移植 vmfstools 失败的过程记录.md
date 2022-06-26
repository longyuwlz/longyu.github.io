# 一次从 EXSI 移植 vmfstools 失败的过程记录
## vmkfstools 是干嘛的？

vmkfstools 是用于管理 VMFS 卷、存储设备和虚拟磁盘的 ESXi Shell 命令之一。可以使用 vmkfstools 命令执行很多存储操作。例如，可以在物理分区上创建和管理 VMFS 数据存储，或操作 VMFS 或 NFS 数据存储中存储的虚拟磁盘文件。（摘自 [vmware 官网](https://docs.vmware.com/cn/VMware-vSphere/6.7/com.vmware.vsphere.storage.doc/GUID-A5D85C33-A510-4A3E-8FC7-93E6BA0A048F.html)）

## 从 EXSI 系统移植 vmfstools 的尝试

### 打包 vmfstools 程序及依赖库

EXSI 系统缺少 ldd 命令，不能直接查询到依赖的动态库，可以通过设定 **LD_TRACE_LOADED_OBJECTS** 为 1 来获取 vmfstools 依赖的动态库。

获取到的内容如下：

```c
[root@localhost] vmkfstools
        libvmkfslib.so => /lib64/libvmkfslib.so (0x0000003f23cff000)
        libvmlibs.so => /lib64/libvmlibs.so (0x0000003f23f15000)
        libvmsnapshot.so => /lib64/libvmsnapshot.so (0x0000003f2444d000)
        libpollDefault.so => /lib64/libpollDefault.so (0x0000003f249be000)
        libpthread.so.0 => /lib64/libpthread.so.0 (0x0000003f24bc4000)
        libc.so.6 => /lib64/libc.so.6 (0x0000003f24de1000)
        librt.so.1 => /lib64/librt.so.1 (0x0000003f25190000)
        libcrypto.so.1.0.2 => /lib64/libcrypto.so.1.0.2 (0x0000003f25398000)
        libdl.so.2 => /lib64/libdl.so.2 (0x0000003f2585e000)
        libssl.so.1.0.2 => /lib64/libssl.so.1.0.2 (0x0000003f25a63000)
        libz.so.1 => /lib64/libz.so.1 (0x0000003f25cd7000)
        libgcc_s.so.1 => /lib64/libgcc_s.so.1 (0x0000003f25ef2000)
        /lib64/ld-linux-x86-64.so.2 (0x0000003ee3adc000)
        libtreestructs.so => /lib64/libtreestructs.so (0x0000003f26109000)
```

直接打包依赖库与可执行程序，在目标环境中执行 chroot，执行后有如下报错：

```c
[root@localhost test]# chroot . /bin/vmkfstools
MD5 signature mismatch with running vmkernel built on _Unknown_ (my build date: Apr  3 2018 14:22:21)
```

报错信息表明，vmkfstools 对内核版本信息增加了校验。

### strace 跟踪 vmfstools 程序执行

执行 strace -f chroot . /bin/vmkfstools 得到如下关键信息：

```c
uname({sys="Linux", node="sasl", ...})  = 0
access("/etc/vmware/hostd/mockupEsxHost.txt", F_OK) = -1 ENOENT (No such file or directory)
write(2, "MD5 signature mismatch with runn"..., 102MD5 signature mismatch with running vmkernel built on _Unknown_ (my build date: Apr  3 2018 14:22:21)
```

上面的信息表明，此程序是通过 uname 系统调用来获取内核版本信息，然后校验。可以通过 hook uname 库函数来跳过这个检查。

### hook uname

```c
#include <sys/utsname.h>
#include <string.h>

#define SYSNAME "VMkernel"
#define NODENAME "localhost"
#define RELEASE "6.7.0"
#define VERSION "#1 SMP Release build-8169922 Apr  3 2018 14:48:22"
#define MACHINE "x86_64"

int uname(struct utsname *name)
{
        if (!name)
                return 0;

        memcpy(name->sysname, SYSNAME, sizeof(SYSNAME));
        memcpy(name->nodename, NODENAME, sizeof(NODENAME));
        memcpy(name->release, RELEASE, sizeof(RELEASE));
        memcpy(name->version, VERSION, sizeof(VERSION));
        memcpy(name->machine, MACHINE, sizeof(MACHINE));

        return 0;
}
```

执行如下命令编译动态库：

```c
gcc -fPIC -shared uname.c -o uname.so
```

验证是否生效：

```c
[root@localhost ~]# LD_PRELOAD="/root/uname.so" uname -a
VMkernel localhost 6.7.0 #1 SMP Release build-8169922 Apr  3 2018 14:48:22 x86_64 x86_64 x86_64 GNU/Linux
```

如上输出信息表明生效。

## chroot 环境 preload

执行在 chroot 之后的命令行设置 **LD_PRELOAD** 变量执行，发现程序运行报错。于是在 chroot 的环境中添加 **etc/ld.so.preload** 文件，并将文件内容设置为 /lib64/uname.so。此后拷贝 uname.so 到 chroot 环境的 lib64 目录中。

重新执行 chroot .   /bin/vmkfstools，此时又报了如下错误：

```c
[root@localhost test]#  chroot .   /bin/vmkfstools
Error during version check: Failed to get vmkernel version: 0xffffffda
```

第一次的内核版本校验通过，报错信息表明除此之外还有其它的校验手段。

## 继续 strace 跟踪

strace -f chroot . /bin/vmkfstools 得到下面的关键信息：

```c
syscall_1024(0x7ffcaf2fb6ac, 0, 0, 0x7ffcaf2fb300, 0xb, 0x3) = -1 (errno 38)
write(2, "Error during version check: Fail"..., 71Error during version check: Failed to get vmkernel version: 0xffffffda
```

这个信息表明，vmkfstools 运行的内核中实现了一个用于校验版本的系统调用，我们系统使用的内核没有实现这个系统调用，进而检验失败。

确认返回值 38 表示函数未实现，相关定义如下：

```c
#define ENOSYS          38      /* Function not implemented */
```
strace 对比了下在原生环境上执行此命令时的系统调用，没有看到特别的项目，感到有些奇怪，只能先放弃了。

