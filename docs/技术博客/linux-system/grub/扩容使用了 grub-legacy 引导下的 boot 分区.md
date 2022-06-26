# 扩容使用了 grub-legacy 引导下的 boot 分区
## 问题描述
最近在搞一个项目，需要使用其它厂商提供的内核与 initrd 文件，在操作过程中发现，厂商提供的内核与 initrd 文件的大小超过了 /boot 分区的大小，在生产的时候拷贝文件会失败，而我们的生产镜像中只有一个 /boot 分区，需要**扩容 /boot 分区**。

## 对问题的分析
以前安装发行版的时候有注意到如下流程：

1. 配置分区（包含 /boot）
2. 安装软件包
3. update-grub
4. grub-install（会弹出对话框，让用户选择将引导安装到哪个介质中）

上面的步骤中，配置 /boot 在安装 grub 之前执行，我想也许我也可以通过相同的步骤来扩容 /boot 分区。

理想的步骤如下：

1. 打包现在的 /boot 分区内容
2. 虚拟机中添加一个 1G 的硬盘，创建 /boot 分区并设定合适的大小后格式化
3. 挂载创建的 /boot 分区，解压第一步打包的 /boot 分区内容，并调整相关的目录结构
4. 执行 update-grub，grub-install 安装 grub 到磁盘中
5.  dd 磁盘（保证 dd 到超过 /boot 分区扇区位置）重新制作生产镜像

实际操作中，完成上述过程后能够进入 grub 命令行，但是不能正常引导。

## 从 update-grub 与 grub-install 命令着手
在上面的操作失败后，我觉得可以从 update-grub 与 grub-install 命令着手搞起。

大概研究了下这两个脚本，它们的功能如下：

>update-grub 匹配 /boot 目录中以 vmlinuz 开头的文件，生成 grub 配置文件，在 grub-legacy 中这个文件是 **menu.lst** 文件，而非 grub.cfg 文件。

>grub-install 通过访问 /lib/grub/ 下的文件，创建 grub 目录并复制 stage1、stage2、stabe1_5xx 等文件，然后使用 grub shell 安装引导。

grub-install 的 manual 中，相关内容描述摘录如下：
```manual
       INSTALL_DEVICE can be a GRUB device name or a system device filename.

       grub-install  copies  GRUB  images  into the DIR/boot directory specfied by --root-directory, and uses the grub shell to install grub
       into the boot sector.
```
grub-install 将会使用 /lib/grub/ 目录中的文件，此目录中的 x86_64-pc 目录内容如下：

```bash
[longyu@debian-10:12:02:22] grub-0.97 $ ls /lib/grub/x86_64-pc/
e2fs_stage1_5  fat_stage1_5  jfs_stage1_5  minix_stage1_5  reiserfs_stage1_5  stage1  stage2  stage2_eltorito  xfs_stage1_5
```

这里 stage1 与 stage2 是 grub-legacy 引导的两各阶段的程序，xxx1_5 是 grub 引导需要使用的文件系统代码。

grub-install 与 grub-update 都是个 shell script，在 grub-install 中添加 set -x 后执行 grub-install /dev/sdd 来测试，针对结果梳理出如下重要的执行过程：
```bash
root@debian:/home/longyu/grub-0.97/docs# grub-install /dev/sdd
+ bootdir=/boot
+ grubdir=/boot/grub
+ device_map=/boot/grub/device.map
+ set /usr/sbin/grub dummy
+ test -f /usr/sbin/grub
+ :
+ test -f /usr/lib/grub/x86_64-pc/stage1
+ :
+ test -f /usr/lib/grub/x86_64-pc/stage2
.........
+ GRUB_LEGACY_0_BASED_PARTITIONS=1 grub-probe --device-map=/boot/grub/device.map -t drive -d /dev/sdd
+ install_drive=(hd3)
..........
+ rm -f /boot/grub/stage1
+ rm -f /boot/grub/stage2
+ rm -f /boot/grub/e2fs_stage1_5
+ rm -f /boot/grub/fat_stage1_5
+ rm -f /boot/grub/jfs_stage1_5
+ rm -f /boot/grub/minix_stage1_5
+ rm -f /boot/grub/reiserfs_stage1_5
+ rm -f /boot/grub/xfs_stage1_5
+ cp -f /usr/lib/grub/x86_64-pc/stage1 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/stage2 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/e2fs_stage1_5 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/fat_stage1_5 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/jfs_stage1_5 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/minix_stage1_5 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/reiserfs_stage1_5 /boot/grub
+ cp -f /usr/lib/grub/x86_64-pc/xfs_stage1_5 /boot/grub
+ /usr/sbin/grub-set-default --root-directory= default
............
+ grub-probe --device-map=/boot/grub/device.map -t fs /boot/grub
+ [ xext2 = xxfs ]
............
+ tmp=/boot/grub/stage1
+ /usr/sbin/grub --batch --device-map=/boot/grub/device.map
+ cmp /boot/grub/stage1 /tmp/grubTzdldy
+ tmp=/boot/grub/stage2
+ test 5 -gt 0
+ /usr/sbin/grub --batch --device-map=/boot/grub/device.map
+ cmp /boot/grub/stage2 /tmp/grubTzdldy
+ tmp=/boot/grub/e2fs_stage1_5
+ /usr/sbin/grub --batch --device-map=/boot/grub/device.map
+ cmp /boot/grub/e2fs_stage1_5 /tmp/grubTzdldy
+ tmp=/boot/grub/fat_stage1_5
+ /usr/sbin/grub --batch --device-map=/boot/grub/device.map
+ cmp /boot/grub/fat_stage1_5 /tmp/grubTzdldy
.............
    GNU GRUB  version 0.97  (640K lower / 3072K upper memory)
grub> root (hd0,0)
 Filesystem type is ext2fs, partition type 0x83
grub> setup  --stage2=/boot/grub/stage2 --prefix=/boot/grub (hd3)
 Checking if "/boot/grub/stage1" exists... yes
 Checking if "/boot/grub/stage2" exists... yes
 Checking if "/boot/grub/e2fs_stage1_5" exists... yes
 Running "embed /boot/grub/e2fs_stage1_5 (hd3)"...  19 sectors are embedded.
succeeded
 Running "install --stage2=/boot/grub/stage2 /boot/grub/stage1 d (hd3) (hd3)1+19 p (hd0,0)/boot/grub/stage2 /boot/grub/menu.lst"... succeeded
grub> quit
```
总结下上面操作，主要有如下步骤：

1. grub-install 配置环境变量，检查 grub 命令是否存在，检查 /usr/lib/grub/x86_64-pc/ 中的 stage1、stage2 是否存在
2. 根据输入的设备名称找到 grub 中对应的名称，如 hd3
3. 确定 boot 分区的文件系统格式，如 ext2
4. 删除旧的内容，从 usr/lib/grub/x86_64-pc 中拷贝必要的文件到 /boot 中
5. 使用 grub shell 依次 dump stage1、stage2、stage1_5 等文件并与 /boot 目录中的内容对比，确定文件内容一致
6. 进入 grub shell，执行 root 命令与 setup 命令安装引导

## 从头构建 grub 内容并扩展 /boot 分区的方案
如果你需要从头构建 grub 内容并扩展 /boot 分区，可以通过执行如下命令来完成：

1. 安装 grub-legacy
2. 创建 /boot 分区并挂载到 /boot
3. 执行 grub-install 安装 grub 相关文件到 /boot/grub
4. 拷贝内核（以 vmlinux 开头）、initrd 到 /boot 中
5. 运行 update-grub 创建 menu.lst

## 在现有 grub 目录内容的条件下进行扩展 /boot 分区
如果已经有了 grub 的内容，只是要扩展 /boot 分区，可以执行如下步骤来完成：

1. 拷贝 grub 相关文件到 /boot 中并调整目录
2.  grub shell 中执行 grub 命令，安装 grub 引导

第二步操作的一个示例过程如下：

```grub
grub> find /boot/grub/stage1
find /boot/grub/stage1
 (hd0,0)
 (hd1,0)
 (hd3,0)
grub> root (hd3,0)
root (hd3,0)
 Filesystem type is ext2fs, partition type 0x83
grub> setup (hd3)
setup (hd3)
 Checking if "/boot/grub/stage1" exists... yes
 Checking if "/boot/grub/stage2" exists... yes
 Checking if "/boot/grub/e2fs_stage1_5" exists... yes
 Running "embed /boot/grub/e2fs_stage1_5 (hd3)"...  19 sectors are embedded.
succeeded
 Running "install /boot/grub/stage1 (hd3) (hd3)1+19 p (hd3,0)/boot/grub/stage2 /boot/grub/menu.lst"... succeeded
Done.
```
如果系统中存在多个 /boot 目录，grub 的 find 子命令将会找到多个位置，这时候需要确定你要用的是哪个。

这里我使用的参数是 /dev/sdd，对应 grub 识别的驱动标识符就是 (hd3, 0)。
## 总结
在解决一个新的问题时，可以先想想现有的方案，在这个问题里面现有的方案就是发行版安装的过程。

在尝试解决问题前，先研究现有的方案是如何实现的，然后将这个方案进行复制也许就能够解决所谓的“新问题”，做完了也许你会发现它也不过是个老问题而已，只是自己以前掌握的知识不够完善才错误的认为它是个新问题。



