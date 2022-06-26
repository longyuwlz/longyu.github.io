# chroot 命令帮助信息中的几个重要问题
## chroot 命令的帮助信息
chroot 命令的详细帮助信息通过执行如下命令来查看：

```bash
info coreutils 'chroot invocation'
```

## chroot 帮助信息的翻译
### chroot : 使用一个不同的 root 目录运行程序
chroot 使用指定的 root 目录运行程序。在许多系统上面，只有 root 用户能够使用这个功能。命令参数如下：

```
     chroot OPTION NEWROOT [COMMAND [ARGS]...]
     chroot OPTION
```
通常，文件名从根目录结构开始搜索。 chroot 将这个根目录切换为 NEWROOT 目录（必须存在）然后使用可选的 ARGS 参数运行 COMMAND 中指定的命令。如果用户没有指定 COMMAND，默认将会使用 SHELL 环境变量的值，如果该环境变量未设定则使用 /bin/sh 程序并设定 -i 选项来执行。

COMMAND 不能是一个特殊的内置函数。

chroot 程序接受下面的参数。

1. --userspec=USER[:GROUP]
    默认情况下，COMMAND 将会使用与调用程序相同的权限运行。使用这个选项能够以一个不同的用户、不同的组、不同的用户与不同的组来运行。
  
2. --groups=GROUPS
	使用这个选项指定新的进程使用的可选组。GROUPS 列表中的每一项（名字或数字 id）必须使用逗号分隔。

3. --skip-chdir
	使用这个选项在切换 root 目录为 NEWROOT 的时候不切换当前的工作目录为根目录。这个选项在只在新的根目录与老的根目录一致时才能够生效，因此在与 '--groups' 和 '--userspec ' 选项一起使用时能够被用来保持旧的工作目录。

这里有一些帮助用户解决使用 chroot 遇到的常见问题的技巧。首先以一个简单的示例开始，让 COMMAND 指向一个静态链接的程序。如果你想要使用一个动态链接的程序，你必须在你要切换的新的 root 目录中将程序执行依赖的动态库放在正确的位置中。

例如，如果你创建了一个静态链接的 ls 可执行程序，并将它放在 /tmp/empty 目录中，你可以使用 root 运行这个命令：

```bash
     $ chroot /tmp/empty /ls -Rl /
```
然后你将会看到像下面一样的输出信息：

```bash
     /:
     total 1023
     -rwxr-xr-x 1 0 0 1041745 Aug 16 11:17 ls
```
如果你想使用一个动态链接的程序，例如 bash，你首先要运行 ldd bash 来查看它依赖了那些动态库。然后拷贝实际的可执行程序，并且拷贝 ldd 输出的依赖文件到你打算使用的新的 root 目录中的正确位置中。最后，如果可执行程序还依赖了其它文件（例如数据、状态、设备文件），也将它们拷贝到正确的位置中。

错误状态:

     125 chroot 自身执行失败
     126 COMMAND 被找到但是不能被执行
     127 COMMAND 不能找到
 	其它 COMMAND 的退出状态

备注：

然而，一些系统（例如 FreeBSD）能够被配置为允许特定的普通用户使用 chroot 系统调用，因此一些普通用户也能够运行 chroot 程序。同样在 Cygwin 环境中，任何人都能够运行 chroot 命令，因为缺少 MS-Windows 的支持这个 chroot 是非特权函数。

## 如何让外部目录在 chroot 环境中可见？
为了达到这样的效果，我们可以在宿主机上挂载设备到 chroot 切换的根目录内的新目录中，从宿主机上挂载设备到 chroot 使用的新的根目录内，chroot 运行的程序就能够访问到宿主机上的目录了。

## 如何在 chroot 环境中调用外部脚本？
可以在 chroot 环境中通过 ssh 来实现，如果外部脚本是图形化程序，可能还需要设定 DISPLAY 变量的值。

## 如何让外部环境访问到 chroot 环境内创建的文件？
chroot 只限定当前进程到某个目录中，并不是让某个目录只能被某个进程所使用、直接对外部环境隐藏目录。chroot 前后宿主机仍旧能够访问到 chroot 的新目录，这意味着在 chroot 环境内创建的文件直接可以被外界访问。

## 参考链接
https://stackoverflow.com/questions/3171964/call-external-script-within-chroot-environment


