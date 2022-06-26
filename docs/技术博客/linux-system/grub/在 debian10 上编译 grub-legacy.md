# 在 debian10 上编译 grub-legacy
## 尝试编译 grub-legacy 
在 [扩容使用了 grub-legacy 引导下的 boot 分区](https://blog.csdn.net/Longyu_wlz/article/details/110304976) 这篇文章中，我描述了在 grub-legacy 引导中扩展 /boot 分区的过程，有这个基础，我想尝试下编译一个对应版本的 grub 程序来调试调试，在本文中记录一下。

## 获取 grub-legacy 的源码
我们系统使用的 grub 版本是 0.97，对应现在发行版中的程序是 grub-legacy，可以执行如下命令获取其源码：

```bash
sudo apt-get source grub-legacy
```
## 遇到的问题及其解决方案
### 32 位库不存在的问题
执行 ./configure 的时候报了如下错误：
```bash
/usr/bin/ld: cannot find Scrt1.o: No such file or directory
/usr/bin/ld: cannot find crti.o: No such file or directory
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/8/libgcc.a when searching for -lgcc
/usr/bin/ld: cannot find -lgcc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/8/libgcc.a when searching for -lgcc
/usr/bin/ld: cannot find -lgcc
collect2: error: ld returned 1 exit status
```
这个错误是 32位库没有安装导致的，执行如下命令安装之：

```bash
sudo apt install gcc-multilib
```

安装后重新执行，又遇到如下报错：

```bash
error: GRUB requires a working absolute objcopy; upgrade your binutils
```
参考 [Build failed on Arch Linux with binutils 2.29.1-1 and GCC 7.2.0-3](https://github.com/chenall/grub4dos/issues/160) 将 configure 文件的第 3906 行修改为如下内容：

```ｃ
3906   if { ac_try='${OBJCOPY-objcopy} --only-section=.text -O binary conftest.exec conftest'                                                                                
```
修改后能够正常编译，编译通过后执行 make install prefix=/tmp 后，发现 lib 目录中 stage1、stage2、stage1_5 等等文件非常大，每一个都有 100 多 M，相关内容记录如下：

```bash
[longyu@debian-10:10:57:31] x86_64-unknown $ ls -lh *
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 e2fs_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 fat_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 ffs_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 iso9660_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 jfs_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 minix_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 reiserfs_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 stage1
-rw-r--r-- 1 longyu longyu 257M 11月 29 10:12 stage2
-rw-r--r-- 1 longyu longyu 257M 11月 29 10:12 stage2_eltorito
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 ufs2_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 vstafs_stage1_5
-rw-r--r-- 1 longyu longyu 129M 11月 29 10:12 xfs_stage1_5
```
想到也许可以执行 strip 来搞一下，于是搜索 configure 文件，根据描述可以执行 ```make install-strip```来 strip，试了下发现**没有效果**。

运行编译出来的 grub 程序，能够正常运行。

### 尝试编译 gcc-3.4 版本
看了网上的几个帖子，都提到使用 gcc-3.4 来编译 grub-0.97，于是首先从如下链接下载 gcc-3.4 release 代码：

[releases/gcc/gcc-3.4.0](https://bigsearcher.com/mirrors/gcc/releases/gcc-3.4.0/)

下载后解压，然后使用如下命令进行 configure 配置：

```bash
../gcc-3.4.0/configure --enable-threads=posix --disable-checking --enable--long-long --host=i386-redhat-linux --with-system-zlib --enable-languages=c
```
configure 没有报错，但是 make 的时候一会就报错了，暂时先跳过。

### 尝试安装 gcc-3.4 的 release 程序
直接编译失败后，我想到也许可以通过安装 deb 包的方式来直接安装 gcc-3.4，从如下链接下载 deb 包：

[compat-gcc34-3.4.6-ubuntu1204-1_amd64.deb](https://drive.google.com/file/d/0B7S255p3kFXNRTkzQnRSNXZ6UVU/view)

下载完成后执行如下命令安装之：

```bash
dpkg -i ./compat-gcc34-3.4.6-ubuntu1204-1_amd64.deb 
```
执行 gcc34 -v 查看安装是否成功：

```bash
[longyu@debian-10:11:11:18] Downloads $ gcc34 -v
Reading specs from /usr/lib/gcc/x86_64-redhat-linux/3.4.6/specs
Configured with: ../configure --prefix=/usr --mandir=/usr/share/man --infodir=/usr/share/info --enable-shared --enable-threads=posix --disable-checking --with-system-zlib --enable-__cxa_atexit --disable-libunwind-exceptions --enable-languages=c,c++,f77 --disable-libgcj --host=x86_64-redhat-linux
Thread model: posix
gcc version 3.4.6 20060404 (Red Hat 3.4.6-19.el6)
```
成功安装后在 grub-0.97 源码目录中执行 ./configure CC=gcc34 发现有报错，报错信息如下：

```bash
/usr/bin/ld: i386:x86-64 architecture of input file `/usr/lib/gcc/x86_64-redhat-linux/3.4.6/crt1.o' is incompatible with i386 output
```
看来应该是缺少 32-bit 编译基础库的支持！这之后又参考如下链接尝试直接通过 apt 安装：

[installing an older gcc version 3-4-3 on ubuntu-14-04](https://askubuntu.com/questions/923337/installing-an-older-gcc-version3-4-3-on-ubuntu-14-04-currently-4-8-installed)

修改 source.list 文件后执行 apt update，后报了公钥验证失败，仓库被禁用的错误。

看来这个 2004 年的 gcc release 的版本要在 2020 年的发行版上编译成功还是非常困难的，只能先放弃了。

## 总结
尽管使用了高版本的编译器成功编译出了 grub-legacy，但是进一步却发现了编译出的文件大小不对劲，一通尝试失败后，考虑编译 gcc34，一通尝试又失败后，考虑搜索有没有可用的 deb 文件直接安装，又一通尝试失败后，只能放弃。

这是一次失败的尝试，从这个失败里我觉得我的尝试过程有些问题，其实更合理的过程应该是这样的：

1. 在现有的环境中编译并从网上搜索以解决遇到的问题
2. 通过 deb 文件安装 gcc34
3. 尝试手动编译 gcc34

应该优先尝试成本最低的方案！

