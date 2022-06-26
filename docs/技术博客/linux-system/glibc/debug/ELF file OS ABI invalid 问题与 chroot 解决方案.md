# ELF file OS ABI invalid 问题与 chroot 解决方案
## ELF file OS ABI invalid
最近在解决一个 gui 程序运行问题时，在目标机器上运行 gui 程序时报了如下错误信息：

>ELF file OS ABI invalid

这里 invalid 的 OS ABI 指向的目标文件是编译环境中的 libc.so，readelf
-h libc.so 得到了如下信息：

```bash
[longyu@debian-10:20:40:42] program-problem $ readelf -h ./libc.so.6 
ELF 头：
  Magic：  7f 45 4c 46 02 01 01 03 00 00 00 00 00 00 00 00 
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - GNU
  ABI 版本:                          0
  类型:                              DYN (共享目标文件)
  系统架构:                          Advanced Micro Devices X86-64
  版本:                              0x1
  入口点地址：              0x241b0
  程序头起点：              64 (bytes into file)
  Start of section headers:          1820144 (bytes into file)
  标志：             0x0
  本头的大小：       64 (字节)
  程序头大小：       56 (字节)
  Number of program headers:         12
  节头大小：         64 (字节)
  节头数量：         68
  字符串表索引节头： 67
```
上述输出信息中 **OS/ABI** 的值为 **UNIX - GNU**，而在目标机器上，它的 libc 库
的 elf 头中 OS/ABI 版本为 **System V** 格式，目标机器上使用的是 **4.1** 版本的古董级 gcc 版本，这个报错是**目标机器上的 ld-linux.so.2 动态库加载器在加载高版本的 libc.so 时触发的**。

## System V 格式 ABI 接口
一般大多数可执行程序与链接库的 ABI 接口都是 System V 格式，一个具体的示例如下：

```bash
文件：/lib/x86_64-linux-gnu/gawk/time.so
ELF 头：
  Magic：  7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - System V
  ABI 版本:                          0
  类型:                              DYN (共享目标文件)
  系统架构:                          Advanced Micro Devices X86-64
  版本:                              0x1
  入口点地址：              0x10c0
  程序头起点：              64 (bytes into file)
  Start of section headers:          12696 (bytes into file)
  标志：             0x0
  本头的大小：       64 (字节)
  程序头大小：       56 (字节)
  Number of program headers:         9
  节头大小：         64 (字节)
  节头数量：         25
  字符串表索引节头： 24
```
可以看到这里的 **OS/ABI** 为 **System V** 版本，这与 libc.so 是不同的，至于区别在哪里我最开始解释不了，说明这里的问题是一道超纲题。

## 编译环境中的 libc.so 存在问题吗？
表面上看来这个问题应该是**编译环境的问题**，但是我在多个环境中查看了 libc.so 的 elf 头，发现其 OS/ABI 的值**都是 UNIX - GNU 格式**，这其中最老的 gcc 版本也有 **4.7**，这样的情况让我对这个 GNU 格式的 ABI 充满了困惑，看来必须搞清楚这里的机关。

## 只有 libc 库是 GNU ABI 格式吗？
直觉告诉我也许 ABI 格式为 GNU 的 so 库应该不止一个，通过在我的系统中执行如下脚本证实了我的判断。

```bash
for file in $(find /lib/ -name '*.so'); 
do 
	ABI=$(readelf -h $file 2> /dev/null | grep 'ABI:');
    if [ "${ABI##*- }" == "GNU" ];
    then 
    	echo $file; 
    fi 
done
```
在我的系统中至少有如下动态库，其 ABI 都是 GNU 扩展版本，其中当然也包含了 libc.so 库，部分路径列举如下：

```
/lib/libinproctrace.so
/lib/liblibreofficekitgtk.so
/lib/gcc-cross/arm-linux-gnueabi/8/libatomic.so
/lib/x86_64-linux-gnu/gstreamer-1.0/libgstwebrtcdsp.so
/lib/x86_64-linux-gnu/libmvec.so
/lib/x86_64-linux-gnu/librt-2.28.so
/lib/x86_64-linux-gnu/libpthread-2.28.so
/lib/x86_64-linux-gnu/dri/nouveau_drv_video.so
/lib/x86_64-linux-gnu/dri/r300_dri.so
/lib/x86_64-linux-gnu/uim/plugin/libuim-mozc.so
/lib/x86_64-linux-gnu/libm-2.28.so
/lib/x86_64-linux-gnu/qt4/plugins/script/libqtscriptdbus.so
/lib/x86_64-linux-gnu/qt4/plugins/sqldrivers/libqsqlmysql.so
/lib/x86_64-linux-gnu/qt4/plugins/accessiblebridge/libqspiaccessiblebridge.so
/lib/x86_64-linux-gnu/qt4/plugins/inputmethods/qtim-fcitx.so
/lib/x86_64-linux-gnu/qt4/plugins/bearer/libqnmbearer.so
/lib/x86_64-linux-gnu/qt4/plugins/bearer/libqconnmanbearer.so
/lib/x86_64-linux-gnu/qt4/plugins/accessible/libqtaccessiblewidgets.so
/lib/x86_64-linux-gnu/libpthread.so
/lib/x86_64-linux-gnu/libc-2.28.so
.......................
```
上面的输出中，libpthread.so 与 libc-2.28.so 是使用率非常高的动态库，既然它们两个都是这种 GNU 的 ABI 格式，而且我的系统已经稳定运行超过一年时间，**我判断问题不在这里**。

## 使用编译环境的 ld-linux.so.2 动态库加载器运行程序
网上搜索了下，发现 ELF file OS ABI invalid 这个问题可能能够通过使用高版本的动态库链接器来解决，实际上在 [低版本 libc 中运行高本版 libc 库链接的程序](https://blog.csdn.net/Longyu_wlz/article/details/108023117) 这篇博客中我有描述过这种操作。

参考进行操作后，发现确实不报 **ELF file OS ABI invalid** 了，但是会报**非法指令**。单独运行这个高版本的 ld-linux.so.2 时，没有报错，感觉有些不对劲，难道是要注册一个 binfmt？

尽管 binfmt 使用了 elf 中的 magic 字段标识每一种可执行文件格式，但是高版本的 linux 内核中并没有看到针对 GNU ABI 的不同 binfmt，说明这个猜测不合理。

## 使用 chroot 的尝试
在上述尝试失败后，开始用 chroot 进行尝试，首先在编译环境中运行目标程序，然后跟踪所有的系统调用，将其打开的文件创建一个列表，一段时间后杀死程序，打包文件列表中的文件，同时拷贝编译环境上的 ld-linux.so.2 到目标设备中。

相关的命令行如下：
```bash
strace -f /bin/ls 2>&1 | awk  -F'"' '/(open|execve)/ && !/DIRECTORY/ && !/ENOENT/{ print $2}' > filelist 
```
```bash
cat filelist | sort -u | xargs tar -cvhzf output.tar.gz
```

将上述压缩包上传到目标机器上，然后创建必要的目录，mount --bind /proc、/dev、/sys 等挂载点到待 chroot 的根木录中的 /proc、/dev、/sys，然后编译静态链接的 busybox 程序，编译完成后执行 busybox --install ./bin 将可执行文件安装到 ./bin 目录中，完成了这些操作后执行如下命令切根：

```bash
chroot . sh
```
切根后目标程序能够正常运行！在这种情况中可以将 strace 程序及其依赖的动态库也打包到。

## 再次尝试使用 ld-linux.so.2 加载程序
chroot 成功后，我觉得在目标环境中 ld-linux.so.2 直接运行程序也应该能够成功，为此，我进行了如下尝试。

1. 设定 LD_LIBRARY_PATH

	设定后仍旧失败

2. ld-linux.so.2 的 --library-path 参数

	此参数可以用来屏蔽 LD_LIBRARY_PATH，设定后发现不报非法指令了，但是在加载一个 xxx.so 的时候报了 /lib64/libc.so 中没有 2.15 的符号。

3. 设定 LD_DEBUG="libs" 查看动态库 search 过程

	查看这个过程发现，最开始加载了我当前子目录中 lib64/libc.so 的 libc 库，然而当加载某个依赖 libc.so 的其它动态库的时候，又使用了默认的路径搜索，结果又加载了系统中的 libc.so 动态库。

这之后 check 了如下点：

1. ld.so 的 manual
2. 出问题的动态库的 rpath 路径
3. 互联网搜索

check 上述过程，没有发现其它可以设定的内容，这说明使用 ld-linux.so.0 这种方式在低版本运行高版本动态库链接的程序并不能在任何时候都生效，而 chroot 却没有这个限制。

## chroot 与使用 ld-linux.so.2 的区别
chroot 可以解释为**切根**，执行 chroot 后，**根目录的位置切换了**，新的环境与老的环境**隔离**，这样在 chroot 的环境就不会使用系统中的 /lib/ 目录中的库，**能够保证只使用那些我们拷贝的库。**

ld-linux.so.2 表面上好像也能够指定库的搜索路径，找到我们拷贝的库，但是在处理 xx 库依赖 zz 库这种情况时，它又会使用默认的库搜索路径，这意味着用这种方式在执行的时候会混合不同系统中的库，有时能够运行，有时却会失败。

## 总结
针对这样的事实，以后这类问题的解决思路应该是这样的：

1. 首先尝试 ld-linux.so.2 加载的方式
2. 使用 chroot 的方式

chroot 可以作为一个压箱底的技能了！



