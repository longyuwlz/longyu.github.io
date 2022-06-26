# 从 dpkg deb 包开始分析 deb 包的内容及 dpkg 安装包的过程
# 下载 dpkg deb 包
执行 apt-get download dpkg 下载 dpkg 程序的 deb 包：

```bash
longyu@virt-debian10:/tmp$ sudo apt-get download dpkg
longyu@virt-debian10:/tmp$ ls -lh ./dpkg_1.19.7_amd64.deb 
-rw-r--r-- 1 root root 2.2M 6月   4  2019 ./dpkg_1.19.7_amd64.deb
```
1.19.7 为 dpkg 包的版本，amd64 表示包适用的架构。

# deb 的内容

file deb 包示例：
```bash
longyu@virt-debian10:/tmp$ file ./dpkg_1.19.7_amd64.deb 
./dpkg_1.19.7_amd64.deb: Debian binary package (format 2.0)
```
可以看到示例中 deb 包为 2.0 格式的 Debian 二进制包。

man deb 获取到的重要信息：

```manual
FORMAT
       The file is an ar archive with a magic value of !<arch>.  Only the common ar archive format is supported, with no long file name extensions, but with file  names
       containing  an  optional  trailing  slash,  which limits their length to 15 characters (from the 16 allowed).  File sizes are limited to 10 ASCII decimal digits,
       allowing for up to approximately 9536.74 MiB member files.

       The tar archives currently allowed are, the old-style (v7) format, the pre-POSIX ustar format, a subset of the GNU format (new  style  long  pathnames  and  long
       linknames,  supported  since  dpkg  1.4.1.17;  large  file  metadata  since  dpkg  1.18.24), and the POSIX ustar format (long names supported since dpkg 1.15.0).
       Unrecognized tar typeflags are considered an error.  Each tar entry size inside a tar archive is limited to 11 ASCII octal digits, allowing for up to 8  GiB  tar
       entries.  The GNU large file metadata support permits 95-bit tar entry sizes and negative timestamps, and 63-bit UID, GID and device numbers.

       The first member is named debian-binary and contains a series of lines, separated by newlines. Currently only one line is present, the format version number, 2.0
       at the time this manual page was written.  Programs which read new-format archives should be prepared for the minor number to be increased and new  lines  to  be
       present, and should ignore these if this is the case.

       If  the  major  number  has  changed,  an incompatible change has been made and the program should stop. If it has not, then the program should be able to safely
       continue, unless it encounters an unexpected member in the archive (except at the end), as described below.

       The second required member is named control.tar.  It is a tar archive containing the package control information, either not  compressed  (supported  since  dpkg
       1.17.6),  or  compressed with gzip (with .gz extension) or xz (with .xz extension, supported since 1.17.6), as a series of plain files, of which the file control
       is mandatory and contains the core control information, the conffiles, triggers, shlibs and symbols files contain optional control information, and the  preinst,
       postinst, prerm and postrm files are optional maintainer scripts.  The control tarball may optionally contain an entry for ‘.’, the current directory.

       The  third,  last  required  member  is  named  data.tar.   It contains the filesystem as a tar archive, either not compressed (supported since dpkg 1.10.24), or
       compressed with gzip (with .gz extension), xz (with .xz extension, supported since dpkg 1.15.6), bzip2 (with .bz2 extension, supported  since  dpkg  1.10.24)  or
       lzma (with .lzma extension, supported since dpkg 1.13.25).

       These members must occur in this exact order. Current implementations should ignore any additional members after data.tar.  Further members may be defined in the
       future, and (if possible) will be placed after these three. Any additional members that may need to be inserted after debian-binary  and  before  control.tar  or
       data.tar and which should be safely ignored by older programs, will have names starting with an underscore, ‘_’.

       Those  new  members  which won't be able to be safely ignored will be inserted before data.tar with names starting with something other than underscores, or will
       (more likely) cause the major version number to be increased.
```
上述描述表明 deb 包是一个带有魔术值 ```!<arch>``` 的 ar 包。它由三部分组成：
1. debian-binary
2. control.tar
3. data.tar

debian-binary 中存放了 deb 格式版本号，目前是 2.0 版本。

control.tar 存储包的控制信息。它打包了 coffiles、triggers、shlibs、symbols 等文件，这些文件包含可选的控制信息，也打包了 preinst、postinst、prerm、postrm 等可选的部署脚本。

data.tar 是安装文件在文件系统中的 tar 包。

这三项的顺序是固定的，不可颠倒。当前的实现会忽略 data.tar 之后的内容。

## dpkg-deb 命令
dpdk-deb 命令用于处理 deb 包，manual 中描述的功能如下：

```bash
       dpkg-deb actions
              See dpkg-deb(1) for more information about the following actions.

              -b, --build directory [archive|directory]
                  Build a deb package.
              -c, --contents archive
                  List contents of a deb package.
              -e, --control archive [directory]
                  Extract control-information from a package.
              -x, --extract archive directory
                  Extract the files contained by package.
              -X, --vextract archive directory
                  Extract and display the filenames contained by a
                  package.
              -f, --field  archive [control-field...]
                  Display control field(s) of a package.
              --ctrl-tarfile archive
                  Output the control tar-file contained in a Debian package.
              --fsys-tarfile archive
                  Output the filesystem tar-file contained by a Debian package.
              -I, --info archive [control-file...]
                  Show information about a package.
```
### dpkg-deb -c 执行示例
```bash
root@virt-debian10:/tmp# dpkg-deb  -c ./dpkg_1.19.7_amd64.deb 
drwxr-xr-x root/root         0 2019-06-04 05:22 ./
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/alternatives/
-rw-r--r-- root/root       100 2019-06-04 05:22 ./etc/alternatives/README
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/cron.daily/
-rwxr-xr-x root/root      1187 2019-04-19 10:14 ./etc/cron.daily/dpkg
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/dpkg/
-rw-r--r-- root/root       446 2014-11-28 09:08 ./etc/dpkg/dpkg.cfg
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/dpkg/dpkg.cfg.d/
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/logrotate.d/
-rw-r--r-- root/root       120 2019-04-19 10:14 ./etc/logrotate.d/alternatives
-rw-r--r-- root/root       112 2019-04-19 10:14 ./etc/logrotate.d/dpkg
```
### dpkg-deb -e 执行示例

```bash
root@virt-debian10:/tmp/test# dpkg-deb  -e ./dpkg_1.19.7_amd64.deb 
root@virt-debian10:/tmp/test# ls
DEBIAN	dpkg_1.19.7_amd64.deb
root@virt-debian10:/tmp/test# cat DEBIAN/
conffiles  control    md5sums    postinst   postrm  
```
### dpkg-deb -x 执行示例

```bash
root@virt-debian10:/tmp/test# dpkg-deb  -x ./dpkg_1.19.7_amd64.deb  ./package
root@virt-debian10:/tmp/test# ls ./package/
etc  sbin  usr	var
```
### dpkg-deb -X 执行示例
```bash
root@virt-debian10:/tmp/test# dpkg-deb -X ./dpkg_1.19.7_amd64.deb  package
./
./etc/
./etc/alternatives/
./etc/alternatives/README
./etc/cron.daily/
./etc/cron.daily/dpkg
./etc/dpkg/
./etc/dpkg/dpkg.cfg
./etc/dpkg/dpkg.cfg.d/
./etc/logrotate.d/
./etc/logrotate.d/alternatives
./etc/logrotate.d/dpkg
.........
```
### dpkg-deb -f 执行示例
```bash
root@virt-debian10:/tmp/test# dpkg-deb -f ./dpkg_1.19.7_amd64.deb 
Package: dpkg
Version: 1.19.7
Architecture: amd64
Essential: yes
Maintainer: Dpkg Developers <debian-dpkg@lists.debian.org>
Installed-Size: 6693
Pre-Depends: libbz2-1.0, libc6 (>= 2.15), liblzma5 (>= 5.2.2), libselinux1 (>= 2.3), zlib1g (>= 1:1.1.4)
Depends: tar (>= 1.28-1)
Suggests: apt, debsig-verify
Breaks: acidbase (<= 1.4.5-4), amule (<< 2.3.1+git1a369e47-3), beep (<< 1.3-4), im (<< 1:151-4), libapt-pkg5.0 (<< 1.7~b), libdpkg-perl (<< 1.18.11), lsb-base (<< 10.2019031300), netselect (<< 0.3.ds1-27), pconsole (<< 1.0-12), phpgacl (<< 3.3.7-7.3), pure-ftpd (<< 1.0.43-1), systemtap (<< 2.8-1), terminatorx (<< 4.0.1-1), xvt (<= 2.1-20.1)
Section: admin
Priority: required
Multi-Arch: foreign
Homepage: https://wiki.debian.org/Teams/Dpkg
Description: Debian package management system
 This package provides the low-level infrastructure for handling the
 installation and removal of Debian software packages.
 .
 For Debian package development tools, install dpkg-dev.
```
### dpkg-deb --ctrl-tarfile 执行示例
```bash
root@virt-debian10:/tmp/test# dpkg-deb --ctrl-tarfile ./dpkg_1.19.7_amd64.deb > control.tar
root@virt-debian10:/tmp/test# tar -tvf ./control.tar 
drwxr-xr-x root/root         0 2019-06-04 05:22 ./
-rw-r--r-- root/root       117 2019-06-04 05:22 ./conffiles
-rw-r--r-- root/root       976 2019-06-04 05:22 ./control
-rw-r--r-- root/root      8877 2019-06-04 05:22 ./md5sums
-rwxr-xr-x root/root       789 2019-06-04 05:22 ./postinst
-rwxr-xr-x root/root       498 2019-06-04 05:22 ./postrm
```
### dpkg-deb --fsys-tarfile 执行示例
```bash
root@virt-debian10:/tmp/test# dpkg-deb --fsys-tarfile ./dpkg_1.19.7_amd64.deb > data.tar
root@virt-debian10:/tmp/test# tar -tvf ./data.tar
drwxr-xr-x root/root         0 2019-06-04 05:22 ./
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/alternatives/
-rw-r--r-- root/root       100 2019-06-04 05:22 ./etc/alternatives/README
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/cron.daily/
-rwxr-xr-x root/root      1187 2019-04-19 10:14 ./etc/cron.daily/dpkg
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/dpkg/
.........
```
### dpkg-deb -I 执行示例
```bash
root@virt-debian10:/tmp/test# dpkg-deb -I ./dpkg_1.19.7_amd64.deb 
 新格式的 Debian 软件包，格式版本 2.0。
 大小 2208136 字节：主控包=4424 字节。
     117 字节，    5 行      conffiles            
     976 字节，   19 行      control              
    8877 字节，  123 行      md5sums              
     789 字节，   46 行   *  postinst             #!/bin/sh
     498 字节，   36 行   *  postrm               #!/bin/sh
 Package: dpkg
 Version: 1.19.7
 Architecture: amd64
 Essential: yes
 Maintainer: Dpkg Developers <debian-dpkg@lists.debian.org>
 Installed-Size: 6693
 Pre-Depends: libbz2-1.0, libc6 (>= 2.15), liblzma5 (>= 5.2.2), libselinux1 (>= 2.3), zlib1g (>= 1:1.1.4)
 Depends: tar (>= 1.28-1)
 Suggests: apt, debsig-verify
 Breaks: acidbase (<= 1.4.5-4), amule (<< 2.3.1+git1a369e47-3), beep (<< 1.3-4), im (<< 1:151-4), libapt-pkg5.0 (<< 1.7~b), libdpkg-perl (<< 1.18.11), lsb-base (<< 10.2019031300), netselect (<< 0.3.ds1-27), pconsole (<< 1.0-12), phpgacl (<< 3.3.7-7.3), pure-ftpd (<< 1.0.43-1), systemtap (<< 2.8-1), terminatorx (<< 4.0.1-1), xvt (<= 2.1-20.1)
 Section: admin
 Priority: required
 Multi-Arch: foreign
 Homepage: https://wiki.debian.org/Teams/Dpkg
 Description: Debian package management system
  This package provides the low-level infrastructure for handling the
  installation and removal of Debian software packages.
  .
  For Debian package development tools, install dpkg-dev.
```

## 以 dpkg deb 包为例，查看 deb 包真实内容

### 1. 使用 ar 命令解压 deb 包
```bash
root@virt-debian10:/tmp/test# ar -x ../dpkg_1.19.7_amd64.deb 
root@virt-debian10:/tmp/test# ls
control.tar.xz	data.tar.xz  debian-binary
```
### 2. 查看 debian-binary 文件内容
```bash
root@virt-debian10:/tmp/test# cat ./debian-binary 
2.0
```
### 3. 查看 control.tar.xz 文件内容
```bash
root@virt-debian10:/tmp/test# tar -xvf ./control.tar.xz 
./
./conffiles
./control
./md5sums
./postinst
./postrm
```
#### 3.1 conffiles 文件内容
```bash
root@virt-debian10:/tmp/test# cat conffiles 
/etc/alternatives/README
/etc/cron.daily/dpkg
/etc/dpkg/dpkg.cfg
/etc/logrotate.d/alternatives
/etc/logrotate.d/dpkg
```
此文件内容为包的配置文件列表。

#### 3.2 control 文件内容
```bash
root@virt-debian10:/tmp/test# cat control
Package: dpkg
Version: 1.19.7
Architecture: amd64
Essential: yes
Maintainer: Dpkg Developers <debian-dpkg@lists.debian.org>
Installed-Size: 6693
Pre-Depends: libbz2-1.0, libc6 (>= 2.15), liblzma5 (>= 5.2.2), libselinux1 (>= 2.3), zlib1g (>= 1:1.1.4)
Depends: tar (>= 1.28-1)
Suggests: apt, debsig-verify
Breaks: acidbase (<= 1.4.5-4), amule (<< 2.3.1+git1a369e47-3), beep (<< 1.3-4), im (<< 1:151-4), libapt-pkg5.0 (<< 1.7~b), libdpkg-perl (<< 1.18.11), lsb-base (<< 10.2019031300), netselect (<< 0.3.ds1-27), pconsole (<< 1.0-12), phpgacl (<< 3.3.7-7.3), pure-ftpd (<< 1.0.43-1), systemtap (<< 2.8-1), terminatorx (<< 4.0.1-1), xvt (<= 2.1-20.1)
Section: admin
Priority: required
Multi-Arch: foreign
Homepage: https://wiki.debian.org/Teams/Dpkg
Description: Debian package management system
 This package provides the low-level infrastructure for handling the
 installation and removal of Debian software packages.
 .
 For Debian package development tools, install dpkg-dev.
```
#### 3. md5sums 文件内容 
```bash
root@virt-debian10:/tmp/test# cat md5sums 
708d64b33f8756aae3f1d0f7a6a2fb54  sbin/start-stop-daemon
9fd4b4d3254e3dcbc9a5ccab720c62f6  usr/bin/dpkg
ece2aef1292c9f4a25879b7cd6f2c4fb  usr/bin/dpkg-deb
5daa197d76b1628b363728adbc1cf6bc  usr/bin/dpkg-divert
5db5f84eef334d26845d752c6087c4a7  usr/bin/dpkg-maintscript-helper
0e68a2e82688114f42e6fc481d50e43c  usr/bin/dpkg-query
964a5c7c08ed40ec3ee86077240a6bc0  usr/bin/dpkg-split
2bb088d154310625d3a98da9a11f6914  usr/bin/dpkg-statoverride
7bce7162bb939bf55d6f27dfe2eff773  usr/bin/dpkg-trigger
01b64f08855d55ee2b1f395920d1ac83  usr/bin/update-alternatives
638083d212928607b198dfb2af90014a  usr/share/bug/dpkg
f5c2a9458457860e236b648010541d67  usr/share/doc/dpkg/AUTHORS
.........
```
此文件中保存包中所有安装文件的 md5sum 值。

#### 4. postinst 文件内容
```ｓｈｅｌｌ
root@virt-debian10:/tmp/test# cat ./postinst 
#!/bin/sh
# See deb-postinst(5).

set -e

# Create the database files if they don't already exist
create_database() {
    admindir=${DPKG_ADMINDIR:-/var/lib/dpkg}

    for file in diversions statoverride status; do
	if [ ! -f "$admindir/$file" ]; then
	    touch "$admindir/$file"
	fi
    done
}


# Create log file and set default permissions if possible
create_logfile() {
    logfile=$DPKG_ROOT/var/log/dpkg.log

    if [ ! -f "$logfile" ]; then
        touch "$logfile"
        chmod 644 "$logfile"
        chown root:root "$logfile" 2>/dev/null || chown 0:0 "$logfile"
    fi
}


case "$1" in
    configure)
	create_database
	create_logfile
	;;

    abort-upgrade|abort-deconfigure|abort-remove)
	;;

    *)
	echo "$0 called with unknown argument '$1'" 1>&2
	exit 1
	;;
esac


exit 0
```
此脚本由 deb-postinst 命令在包安装完成后调用。
#### 5. postrm 文件内容 
```shell
root@virt-debian10:/tmp/test# cat ./postrm 
#!/bin/sh
# See deb-postrm(5).

set -e

# Remove log file when dpkg is purged
remove_logfile() {
    logdir=$DPKG_ROOT/var/log

    rm -f "$logdir"/dpkg.log "$logdir"/dpkg.log.* 2>/dev/null
    rm -f "$logdir"/alternatives.log "$logdir"/alternatives.log.* 2>/dev/null
}

case "$1" in
    remove)
	;;

    purge)
	remove_logfile
	;;

    upgrade)
	;;

    failed-upgrade|disappear|abort-install|abort-upgrade)
	;;


    *)
	echo "$0 called with unknown argument '$1'" 1>&2
	exit 1
	;;
esac


exit 0
```
此脚本被 deb-postrm 命令在包移除后调用。

### data.tar 文件内容
```bash
root@virt-debian10:/tmp/test# tar -tvf ./data.tar.xz 
drwxr-xr-x root/root         0 2019-06-04 05:22 ./
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/alternatives/
-rw-r--r-- root/root       100 2019-06-04 05:22 ./etc/alternatives/README
drwxr-xr-x root/root         0 2019-06-04 05:22 ./etc/cron.daily/
-rwxr-xr-x root/root      1187 2019-04-19 10:14 ./etc/cron.daily/dpkg
.........
```
可以看到 data.tar 中存储包中所有安装文件。

## dpkg 安装包的过程
通过 dpkg 命令安装 dpkg 包的终端输出：

```bash
longyu@virt-debian10:/tmp$ sudo dpkg -i ./dpkg_1.19.7_amd64.deb 
(Reading database ... 69152 files and directories currently installed.)
Preparing to unpack ./dpkg_1.19.7_amd64.deb ...
Unpacking dpkg (1.19.7) over (1.19.7) ...
Setting up dpkg (1.19.7) ...
Processing triggers for man-db (2.8.5-2) ...
```
man dpkg 得到如下信息：

```manual
              Install the package. If --recursive or -R option is specified, package-file must refer to a directory instead.

              Installation consists of the following steps:

              1. Extract the control files of the new package.

              2. If another version of the same package was installed before the new installation, execute prerm script of the old package.

              3. Run preinst script, if provided by the package.

              4. Unpack the new files, and at the same time back up the old files, so that if something goes wrong, they can be restored.

              5.  If  another version of the same package was installed before the new installation, execute the postrm script of the old package. Note that this script
              is executed after the preinst script of the new package, because new files are written at the same time old files are removed.

              6. Configure the package. See --configure for detailed information about how this is done.
```
总结一下 dpkg 安装的步骤：

1. 解压新包的控制文件
2. 扫描数据库判断是否已经安装了新包的其它版本，是则执行旧包的 prerm 脚本
3. 当新包的控制文件中存在 preinst 时，执行之
4. 解压新包的 data.tar 同时备份旧的文件用于错误恢复
5. 如果在此次安装前相同包的另外一个版本已经安装，执行旧包的 postrm 脚本
6. 配置包，解包 conffiles 中列举的配置文件同时备份旧的 conffiles 文件用于错误恢复
7. 当新包的控制文件中存在 postinst 时，执行之

备注：旧包的 postrm 脚本在新包的 preinst 脚本执行后执行是由于新文件在旧文件被移除的同时写入，即新包的 preinst 脚本执行完成后相当于旧包文件移除完成

