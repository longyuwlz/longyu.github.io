# linux 命令分析之 chroot 的原理
## chroot 的功能
chroot 可以用来切换当前进程的【根目录】，它能够将当前进程能够访问的目录树结构限制
在某个子目录中，同时由于当前进程创建的子进程将会继承父进程的根目录结构，所以子进
程也随之被限定。
## chroot 命令的原理
通过 strace 来跟踪一次 chroot 命令执行过程来研究其代码执行过程。

这里我删除了与这个问题没有太大关系的一些输出，重要的系统调用信息如下：

```strace
[root@localhost new_test]# strace chroot . sh
execve("/usr/sbin/chroot", ["chroot", ".", "sh"], 0x7fffbf1a9580 /* 28 vars */) = 0
..............................
chroot(".")                             = 0
chdir("/")                              = 0
execve("/usr/local/sbin/sh", ["sh"], 0x7fff5cd3d1a8 /* 28 vars */) = -1 ENOENT (没有那个文件或目录)
execve("/usr/local/bin/sh", ["sh"], 0x7fff5cd3d1a8 /* 28 vars */) = -1 ENOENT (没有那个文件或目录)
execve("/usr/sbin/sh", ["sh"], 0x7fff5cd3d1a8 /* 28 vars */) = -1 ENOENT (没有那个文件或目录)
execve("/usr/bin/sh", ["sh"], 0x7fff5cd3d1a8 /* 28 vars */) = 0
.............................
```

上述过程可以总结为如下几个步骤：

1. execve 运行 chroot 程序
2. chroot 系统调用切换当前命令的根目录
3. chdir 系统调用切换当前命令的工作目录到新的根目录
4. 根据路径搜索默认 shell 的位置，使用 execve 进行执行

这里它搜索默认 shell 的路径时有几个备选路径，搜索顺序如下：

1. /usr/local/sbin/sh
2. /usr/local/bin/sh
3. /usr/sbin/sh
4. /usr/bin/sh

从上面的捕获到的 chroot 命令的系统调用可以看到 chroot 命令的核心其实就是调用
 **chroot** 系统调用，这也就是其内核态的主要行为，这个行为并不是直接完成这项功能
 的，它实际是通过一种间接的方式修改 task_struct 中的数据结构来达成的。

##  为什么 chroot 要 chdir 到 "/" 目录中呢？
细心的读者也许会注意到 chroot 在执行了 chroot 系统调用后，又调用了 **chdir** 切换
【当前目录】到【新的根目录】的行为，这个行为是必不可少的！

chdir 系统调用将会修改当前进程 task_sturct fs 中的 pwd 字段，这个字段保存了当前工作
目录的 **dentry** 结构体。

核心代码如下：

```c
	set_fs_pwd(current->fs, &path);
```

如果 chroot 命令不 chdir 到 "/" 目录，那么我们**仍旧可以在 chroot 后的程序中通过访问到
外界的目录**，这样就会出现非常好玩的情景。

## 不让 chroot 执行 chdir 过程的测试
为了验证这点，我进行了如下几个尝试。

### 1. 指定 --skip-chdir 参数

chroot 命令中有一个 **--skip-chdir** 参数，在根目录中运行如下命令来使用它：


```bash
[root@localhost /]# /root/chroot --skip-chdir /root/chroot_environment/ sh
/root/chroot: option --skip-chdir only permitted if NEWROOT is old '/'
```
这里报错信息表明 **--skip-chdir 只在新的 root 目录与老的根目录相同时才被允许使用**。

### 2. 修改 chroot 命令源码
chroot 命令在 **coreutils** 包中，执行 **sudo apt-get source coreutils** 来下载，其源
码在 **src/chroot.c** 中，对代码进行如下修改让 chroot 不执行 chdir 操作：

```c
#if 0
  if (! skip_chdir && chdir ("/"))
    die (EXIT_CANCELED, errno, _("cannot chdir to root directory"));
#endif
```

### 终端中测试不执行 chdir 的 chroot 
重新编译后运行，在终端中执行如下命令：

```bash
[root@localhost /]# /chroot /root/chroot_environment sh
(unreachable)/ # ls
bin     chroot  etc     lib     media   opt     root    sbin    sys     usr
boot    dev     home    lib64   mnt     proc    run     srv     tmp     var
(unreachable)/ # chroot .
[root@localhost /]# ls
bin  boot  chroot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@localhost /]# exit
exit
(unreachable)/ # cd ./root
sh: cd: can't cd to ./root: No such file or directory
(unreachable)/ # cd /root
~ # cd ..
/ # ls
bin    dev    etc    lib64  proc   root   sys    usr    var
/ #
```

第一行命令切根后，由于没有 chdir 到新的根目录，**cwd 中仍然保存了旧的工作目录的 
dentry 信息**，这样我们**仍旧能够访问到旧的根目录下的所有文件**，第二行的 ls 命令的
输出信息证实了这点。

第三行命令继续执行了 chroot，注意这里的参数为 **.**，**.** 表示当前目录，这行命令执行后，又
切回了原来的根目录。

第四行命令从第三行命令的 chroot 环境中退出，退出后尝试 cd ./root，发现会报**这个目录
不存在的错误。**

通过 strace 跟踪这个 sh，发现它传递给 chdir 系统调用的命令并不是 ./root，而是 "
(unreachable)/root"，这个目录当然不存在喽，就报了目录不存在的错误。

相关的系统调用内容如下：

```strace
chdir("(unreachable)/root")             = -1 ENOENT (没有那个文件或目录)
write(2, "sh: ", 4)                     = 4
write(2, "cd: ", 4)                     = 4
write(2, "can't cd to ./root: No such file"..., 45) = 45
```

单独编写了一个调用 chdir("root") 的代码编译后运行测试，确认能够 chdir，看来应该是 sh 
进行了某种处理。

### sh 中对当前目录的处理
这里添加的 (unreachable) 是 **PS1** 变量控制的，查看 manual 确定这个字符串实际上对
应的是当前的工作目录。相关信息如下：

```manual
\w     当前工作目录
```
我当前 shell  的 PS1 设定如下：

```bash
(unreachable)/ # echo $PS1
\w \$
```
看来 sh 执行的时候应该是通过当前目录的变量将我输入的 ./ 展开了，这样就有上面的
问题了。

### chdir 到 /root 后切到新的根目录，完成 chroot 的所有过程
第五行命令中 cd /root 成功，这是肯定的，因为当前进程的根目录已经切换了，所以我们能
够进入到这个 /root 目录，而且这个目录也是新的目录。

第六行命令中 cd .. 返回根目录，然后运行 ls 命令，可以看到此时根目录下的文件已经变
了，直至这里才完成了 chroot 的所有过程。



