# dpkg 命令分析之 /var/lib/dpkg 目录
## /var/lib/dpkg 目录
/var/lib/dpkg 是 dpkg 命令使用的一个重要目录，dpkg 命令的一些重要子命令依赖此目录中的文件运作，本文对此目录下的文件功能进行描述。

## man dpkg 获取到的信息
```manual
       The other files listed below are in their default directories, see option --admindir to see how to change locations of these files.

       /var/lib/dpkg/available
              List of available packages.

       /var/lib/dpkg/status
              Statuses of available packages. This file contains information about whether a package is marked for removing or not, whether it is installed or not, etc.
              See section INFORMATION ABOUT PACKAGES for more info.

              The status file is backed up daily in /var/backups. It can be useful if it's lost or corrupted due to filesystems troubles.

```
manual 提到的 /var/lib/dpkg 下的两个重要文件及其功能列表如下：

文件     | 功能
-------- | -----
/var/lib/dpkg/available  | 可用包列表
/var/lib/dpkg/status  | 可用包的状态

/var/lib/dpkg/status 额外存储一个包是否处于标记移除、标记安装等状态。包的状态信息可以分为如下类别：

1. Package states 
2. Package seletion states
3. Package flag

这三个类别还有子类，下面列举其子类的功能。

### 1. Package states

状态     | 描述
-------- | -----
not-installed  | 包未在系统中安装
config-files  | 系统中只安装了包的配置文件
half-installed  | 安装已经开始却因为某种原因还未结束
unpacked | 包已经解压但还未配置
half-configured | 包已经解压并开始配置，但是由于某种原因还未完成
trigger-awaited | 包等待其它包触发器处理
trigger-pending | 触发器已经被触发
installed | 包被正确解压并配置完成

### 2. Package selection states
状态     | 描述
-------- | -----
install  | 包被选中安装
hold  | 标记为此状态的包不会被 dpkg 处理，除非指定 --force-hold 参数强制处理
deinstall  | 包被选中卸载（例如我们想移除包内除了配置文件之外的所有文件） 
purge | 包被选中完全移除（包中的所有文件（包含配置文件）都被移除）
unknown | 未知的包选择状态

### 3. Package flags
标志     | 功能
-------- | -----
ok  | 包处于已知状态但可能需要进一步的处理
reinsreq  | 包损坏且需要重新安装

## 真实环境中的内容示例
available 文件示例内容如下；

```bash
..........
Package: whiptail
Source: newt
Version: 0.52.20-8
Installed-Size: 70
Maintainer: Alastair McKinstry <mckinstry@debian.org>
Architecture: amd64
Depends: libc6 (>= 2.14), libnewt0.52 (>= 0.52.20), libpopt0 (>= 1.14), libslang2 (>= 2.2.4)
Description: Displays user-friendly dialog boxes from shell scripts
Description-md5: 845a08009ef9f0ef4ecc0aedd3a36ffa
Multi-Arch: foreign
Homepage: https://pagure.io/newt
Tag: implemented-in::c, interface::TODO, interface::text-mode, role::program,
 scope::utility, use::viewing
Section: utils
Priority: important
Filename: pool/main/n/newt/whiptail_0.52.20-8_amd64.deb
Size: 39356
MD5sum: afe221a9833b61e885392b5622168af6
SHA256: f281a4773127cc66ff56e0c0150789055adfaa9f08834c0ee76a71caff9f90c0
..........
```

status 文件中的一个示例内容如下：
```bash
.........
Package: whiptail
Status: install ok installed
Priority: important
Section: utils
Installed-Size: 70
Maintainer: Alastair McKinstry <mckinstry@debian.org>
Architecture: amd64
Multi-Arch: foreign
Source: newt
Version: 0.52.20-8
Depends: libc6 (>= 2.14), libnewt0.52 (>= 0.52.20), libpopt0 (>= 1.14), libslang2 (>= 2.2.4)
Description: Displays user-friendly dialog boxes from shell scripts
 Whiptail is a "dialog" replacement using newt instead of ncurses. It
 provides a method of displaying several different types of dialog boxes
 from shell scripts. This allows a developer of a script to interact with
 the user in a much friendlier manner.
Homepage: https://pagure.io/newt
```
status 文件相较 avaialble 文件，少了一些与 deb 相关的项目，增加了 Status 项目。此项目的一个示例如下：

```bash
Status: install ok installed
```
此状态表明程序安装成功，它由三个状态组成：
1. Package 状态为 installed 表明安装与配置完成
2. Package selection 状态为 install 表明包被选中安装
3. Package flags 为 ok 表明包处于已知状态

备注（此处的解读缺少官方文档说明）

## dpkg 对 /var/lib/dpkg 目录文件的使用
### dpkg -l 命令
命令执行示例：
```bash
root@virt-debian10:/tmp/etc# dpkg -l
期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
| 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
|/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
||/ 名称                                 版本                            体系结构     描述
+++-====================================-===============================-============-===============================================================================
ii  acpi-support-base                    0.142-8                         all          scripts for handling base ACPI events such as the power button
ii  acpid                                1:2.0.31-1                      amd64        Advanced Configuration and Power Interface event daemon
ii  acpitool                             0.5.1-4+b4                      amd64        command line ACPI client
ii  adduser                              3.118                           all          add and remove users and groups
ii  adwaita-icon-theme                   3.30.1-1                        all          default icon theme of GNOME
ii  apparmor                             2.13.2-10                       amd64        user-space parser utility for AppArmor
ii  apt                                  1.8.2.1                         amd64        commandline package manager
ii  apt-listchanges                      3.19                            all          package change history notification tool
ii  apt-utils                            1.8.2.1                         amd64        package management related utility programs
ii  arch-test                            0.15-2+deb10u1                  all          detect architectures supported by your machine/kernel
ii  at-spi2-core                         2.30.0-7                        amd64        Assistive Technology Service Provider Interface (dbus core)
.......
```
上述输出内容的来源就是 /var/lib/dpkg/status 文件。

## 能够从 /var/lib/dpkg/status 文件中获取到什么信息？
1. 系统中可用的包列表
2. 系统中已经安装的包列表
3. 每个包的版本、依赖关系、适用架构、安装状态等信息

