# 为啥 bash 没有按照我想象的样子执行脚本呢？
## 问题描述
最近在写升级脚本的时候遇到了一个问题：

需要在升级脚本中卸载升级脚本所在的分区，同时由于我不能修改其它流程的代码，我无法将升级脚本拷贝到其它路径运行！

## 问题复现方法
我本地使用下面的步骤来复现这个问题：

**dd 制作一个 100M 大小的文件**


```bash
[longyu@debian-10:13:47:19] ~ $ dd if=/dev/zero of=loop_disk bs=1M count=100
记录了100+0 的读入
记录了100+0 的写出
```

**对这个文件制作分区并格式化为 ext4**

```bash
[longyu@debian-10:13:48:19] ~ $ sudo mkfs.ext4 ./loop_disk 
mke2fs 1.44.5 (15-Dec-2018)
Discarding device blocks: done                            
Creating filesystem with 102400 1k blocks and 25688 inodes
Filesystem UUID: bc862d44-21e4-4b2d-8098-98a395bf58f0
Superblock backups stored on blocks: 
	8193, 24577, 40961, 57345, 73729

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (4096 blocks): done
Writing superblocks and filesystem accounting information: done 
```
**挂载此分区并拷贝 demo 脚本到挂载点中**

```basg
[longyu@debian-10:13:48:23] ~ $ sudo mount ./loop_disk  /mnt
[longyu@debian-10:13:48:39] ~ $ sudo cp ./demo.sh /mnt
```
脚本内容如下：
```bash
#!/bin/bash

umount /mnt
```
注意需要给脚本**添加执行权限**！

**在挂载点外运行 demo 脚本**

```bash
[longyu@debian-10:13:51:52] ~ $ sudo /mnt/demo.sh 
umount: /mnt: target is busy.
```

运行程序的时候 umount 脚本所在的分区会显示分区 busy，**umount 失败**。

## 解决问题的尝试
对于这个问题我首先执行了如下命令：

```bash
umount -f /mnt 
```
执行了这个命令后仍旧报 device busy 的信息，卸载失败。

网上搜索了下发现也许可以通过 **umount -l** 命令来卸载，执行 umount -l 后挂载点移除了，但是由于我们的分区还是加密分区，还需要 cryptsetup 来关闭，执行 **cryptsetup** 就报 **ioctl busy**，关闭失败。

### 到底是谁在占用目标分区？
上面的尝试失败后，我觉得应该要找到谁占用了目标分区的文件。表面上看好像是 /mnt/demo.sh 占用了，但是根据我的经验，bash 在开始执行 shell script 的时候就会将脚本内容读取到内存中，因此不应该会是 /mnt/demo.sh 占用了。

执行 lsof 查看发现确实是 demo.sh 文件占用了目标分区，既然这样那我想也许我可以在脚本中直接删除 /mnt/demo.sh 文件，然后再卸载。于是将 demo.sh 修改为如下内容：

```bash
#!/bin/bash

rm -rf /mnt/demo.sh

umount /mnt
```

执行上面的脚本后，仍然报 target is busy 的错误。这个尝试的失败让我对 bash 的执行流程产生了疑问，看来只有用 strace 跟踪看看了。

### strace 跟踪
由于 strace 的输出很多，这里我只截取出关键的过程。
### 打开并读取 demo.sh 阶段
```strace
openat(AT_FDCWD, "/mnt/demo.sh", O_RDONLY) = 3
stat("/mnt/demo.sh", {st_mode=S_IFREG|0744, st_size=25, ...}) = 0
ioctl(3, TCGETS, 0x7ffe4f603fa0)        = -1 ENOTTY (对设备不适当的 ioctl 操作)
lseek(3, 0, SEEK_CUR)                   = 0
read(3, "#!/bin/bash\n\numount /mnt\n", 80) = 25
lseek(3, 0, SEEK_SET)                   = 0
prlimit64(0, RLIMIT_NOFILE, NULL, {rlim_cur=1024, rlim_max=1024*1024}) = 0
fcntl(255, F_GETFD)                     = -1 EBADF (错误的文件描述符)
dup2(3, 255)                            = 255
close(3)                                = 0
[pid 30364] wait4(-1,  <unfinished ...>
```
上面的过程中首先打开了 /mnt/demo.sh 来读取，读取完成后有一个 dup2 操作，将指向 /mnt/demo.sh 的描述符 3 复制为 255 描述符，然后关闭了描述符 3。

### bash 创建子进程以执行 umount 程序
然后需要执行 umount 程序，为此 bash 创建一个新的子进程，在新的自己成中执行 umount 过程，同时原来的 bash 进程调用 wait 等待子进程终止。

相关系统调用如下：

```strace
clone(child_stack=NULL, flags=CLONE_CHILD_CLEARTID|CLONE_CHILD_SETTID|SIGCHLD, child_tidptr=0x7f0519caaa10) = 30365
rt_sigprocmask(SIG_SETMASK, [], NULL, 8) = 0
rt_sigprocmask(SIG_BLOCK, [CHLD], strace: Process 30365 attached
[], 8) = 0
[pid 30364] rt_sigprocmask(SIG_SETMASK, [], NULL, 8) = 0
[pid 30364] rt_sigprocmask(SIG_BLOCK, [CHLD], [], 8) = 0
[pid 30364] rt_sigaction(SIGINT, {sa_handler=0x55f318e3fde0, sa_mask=[], sa_flags=SA_RESTORER, sa_restorer=0x7f0519ce4840}, {sa_handler=SIG_DFL, sa_mask=[], sa_flags=SA_RESTORER, sa_restorer=0x7f0519ce4840}, 8) = 0
[pid 30364] wait4(-1,  <unfinished ...>
[pid 30365] getpid()                    = 30365
[pid 30365] close(255)                  = 0
```
这里使用了 clone 来克隆父进程以创建子进程，子进程的 pid 为 30365，由于我指定了 -f 选项，strace 也会跟踪程序创建的所有子进程。

父进程 30364 调用 wait 等待子进程死亡，子进程 30365 关闭了 255 描述符，它并不影响父进程的 255 描述符。

### 子进程 30365 的 umount 操作
30365 子进程执行 umount 操作实际是通过 umount2 系统调用完成的，相关内容如下：

```strace
[pid 30365] umount2("/mnt", 0)          = -1 EBUSY (设备或资源忙)
```
可以看到 umount2 系统调用返回了 EBUSY 的错误，表明设备或资源忙。

### 子进程死亡，父进程被唤醒
当 30365 子进程死亡后，父进程被唤醒，可以看到它继续从 255 描述符读取，然后读取到脚本内容为空就退出了，相关记录如下：

```strace
[pid 30365] exit_group(32)              = ?
[pid 30365] +++ exited with 32 +++
<... wait4 resumed> [{WIFEXITED(s) && WEXITSTATUS(s) == 32}], 0, NULL) = 30365
rt_sigaction(SIGINT, {sa_handler=SIG_DFL, sa_mask=[], sa_flags=SA_RESTORER, sa_restorer=0x7f0519ce4840}, {sa_handler=0x55f318e3fde0, sa_mask=[], sa_flags=SA_RESTORER, sa_restorer=0x7f0519ce4840}, 8) = 0
ioctl(2, TIOCGWINSZ, 0x7ffe4f603d80)    = -1 ENOTTY (对设备不适当的 ioctl 操作)
rt_sigprocmask(SIG_SETMASK, [], NULL, 8) = 0
--- SIGCHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=30365, si_uid=0, si_status=32, si_utime=0, si_stime=0} ---
wait4(-1, 0x7ffe4f603690, WNOHANG, NULL) = -1 ECHILD (没有子进程)
rt_sigreturn({mask=[]})                 = 0
read(255, "", 25)                       = 0
rt_sigprocmask(SIG_BLOCK, [CHLD], [], 8) = 0
rt_sigprocmask(SIG_SETMASK, [], NULL, 8) = 0
exit_group(32)                          = ?
```
注意上述记录中，**父进程从 255 描述符读取的操作，由于 255 描述符是指向 /mnt/demo.sh 的，这表明父进程一直在占用 /mnt/demo.sh 文件，这就导致在子进程中执行 umount 的时候失败。**

## 第一个解决方案
既然已经确定了就是执行 /mnt/demo.sh 文件的程序占用了 /mnt 分区，那么可以将 demo.sh 的程序分为两个阶段写入到两个脚本中。

在 /mnt/demo.sh 中将卸载 /mnt 分区的脚本拷贝到分区外的某个路径中，然后使用 nohup 创建一个后台进程并传入自己的 pid 号，然后直接执行 kill -9 $$ 自杀。

创建的后台进程通过判断 /proc/pid 是否存在来判断父进程是否死亡，当父进程死亡后就执行 umount 操作，注意父进程死亡将会使子进程被 init 进程回收，init 进程会成为它的新的父进程。

修改后的 demo.sh 脚本内容如下：

```bash
#!/bin/bash

cp /mnt/umount.sh /tmp/umount.sh
nohup /tmp/umount.sh $$ &

kill -9 $$  
```
umount 的脚本内容如下：

```bash
#!/bin/bash

i=0
while true;
do
	if [ $i -gt 5 ]; then
		break
	fi
	
	if [ ! -e "/proc/$1" ]; then
		umount /mnt
		break
	fi
	sleep 1
	let i++
done
```
这里间隔 1s 来判断父进程是否死亡，判断 6 次后父进程还没有死亡则退出。

测试过程记录如下：
```bash
[longyu@debian-10:15:01:45] ~ $ ls /mnt
demo.sh  lost+found  umount.sh
[longyu@debian-10:15:01:49] ~ $ sudo /mnt/demo.sh
已杀死
nohup: 把输出追加到'nohup.out'
[longyu@debian-10:15:01:56] ~ $ 
[longyu@debian-10:15:01:58] ~ $ ls /mnt
huge  rootfs
```
**/mnt 分区成功卸载！**

## 第二种方案
上面的方案尽管能够解决问题，但是不够优美，我仔细琢磨了下，想到应该能够**通过 exec 内建命令来解决这个问题**。

我之前研究过 linux 内核中 fork、exec、exit 的过程，有印象 exec 的时候可能会关闭一些描述符。

于是我将 demo.sh 脚本修改为如下内容：

```bash
#!/bin/bash

if [ ! -e "/tmp/demo.sh" ] ; then
    cp /mnt/demo.sh /tmp/demo.sh
    exec /tmp/demo.sh
fi

umount /mnt
```
测试过程记录如下：

```bash
[longyu@debian-10:15:08:29] ~ $ ls /mnt
demo.sh  lost+found  umount.sh
[longyu@debian-10:15:08:37] ~ $ sudo /mnt/demo.sh
[longyu@debian-10:15:08:40] ~ $ ls /mnt
huge  rootfs
[longyu@debian-10:15:08:42] ~ $ 
```
**可以看到 /mnt 成功卸载了！**

### FD_CLOEXEC 的作用
第二种方案非常简单且能够工作，但是我写到这里发现我其实并没有完全描述清楚为什么使用 exec 能够工作，我只是觉得它应该能够工作！

这里继续用 strace 跟踪脚本的执行过程，这次我注意到了下面的信息：

```strace
100 dup2(3, 255)                            = 255
101 close(3)                                = 0
102 fcntl(255, F_SETFD, FD_CLOEXEC)         = 0
103 fcntl(255, F_GETFL)                     = 0x8000 (flags O_RDONLY|O_LARGEFILE)
.......
295 execve("/tmp/demo.sh", ["/tmp/demo.sh"], 0x55c27348f230 /* 28 vars */) = 0  
```
这里的描述符 3 仍旧指向 /mnt/demo.sh，在第 102 行，fcntl 系统调用将 255 描述符设定为了 **FD_CLOEXEC**，这个属性将会让内核在第 295 行 execve 系统调用过程执行过程中**将 255 描述符关闭**。

这样当脚本执行了 exec /tmp/demo.sh 后对 /mnt/demo.sh 文件的占用就释放了，这时我们再卸载 /mnt 分区就没有任何问题了！

## 进一步的思考
上面第二种方案中 exec 尽管能够完成工作，但是同样的方式使用到我们的升级脚本中会引入一个问题。

我们的升级脚本为 update.sh，它是在 initrd 的初始化流程中被调用的，调用命令如下：

```bash
. update.sh
```
这里的 . 与直接调用 update.sh 不同的地方在于 **. 不会创建子进程来执行 update.sh**，**它会直接在当前进程中执行 update.sh**。

一般 . 主要被用来读取当前 bash 的配置文件，与之类似的还有 source 命令。

那么问题来了，在 update.sh 中执行 exec 会覆盖原来的 bash 进程，而对于原来那个进程来说，**update.sh 脚本只是中间的一个步骤**，在 update.sh 后还有其它步骤，这些步骤在使用了 exec 后都不会执行了。真的要执行就需要把这些代码搬到 update.sh 中。

如果不是使用 . update.sh、source update.sh 文件来执行脚本，而是直接指定脚本名称，那么就不会存在这种问题。写到这里我不由的感慨**编程真的是个技术活，而很多人所谓的编程其实真的没有太多技术含量！**

## man bash 得到的 . 与 source 命令描述信息
```
        .  filename [arguments]
       source filename [arguments]
              Read and execute commands from filename in the current shell environment and return the exit status of the last command executed from filename.  If  file‐
              name  does  not  contain  a  slash,  filenames in PATH are used to find the directory containing filename.  The file searched for in PATH need not be exe‐
              cutable.  When bash is not in posix mode, the current directory is searched if no file is found in PATH.  If the sourcepath option to  the  shopt  builtin
              command  is turned off, the PATH is not searched.  If any arguments are supplied, they become the positional parameters when filename is executed.  Other‐
              wise the positional parameters are unchanged.  If the -T option is enabled, source inherits any trap on DEBUG; if it is not,  any  DEBUG  trap  string  is
              saved  and restored around the call to source, and source unsets the DEBUG trap while it executes.  If -T is not set, and the sourced file changes the DE‐
              BUG trap, the new value is retained when source completes.  The return status is the status of the last command exited within the script (0 if no commands
              are executed), and false if filename is not found or cannot be read.
```

## bash 执行脚本到底有怎样的过程？
我使用如下脚本来研究下 bash 执行脚本的过程：

```bash
[longyu@debian-10:16:04:24] ~ $ cat test.sh
#!/bin/bash

ls 
sleep 1 
ls
```

strace 跟踪上述脚本的执行，摘录出关键的 read 系统调用如下：

```bash
read(3, "#!/bin/bash\n\nls \nsleep 1 \nls\n", 80) = 29
read(255, "#!/bin/bash\n\nls \nsleep 1 \nls\n", 29) = 29
read(255, "sleep 1 \nls\n", 29)         = 12
read(255, "ls\n", 29)                   = 3
read(255, "", 29)                       = 0
```
从上面这些 read 过程不难发现 bash 其实是**读取到一个换行就解析执行**，然后**继续读一个换行继续执行**，直到读取不到任何一个字符。

为了验证这个结论，我将上述测试脚本修改为如下内容：

```bash
#!/bin/bash
ls;sleep 1;ls; 
ls
ls
```
继续 strace，然后摘录相关的 read 系统调用如下：

```bash
read(3, "#!/bin/bash\nls;sleep 1;ls; \nls\nl"..., 80) = 34
read(255, "#!/bin/bash\nls;sleep 1;ls; \nls\nl"..., 34) = 34
read(255, "ls\nls\n", 34)               = 6
read(255, "ls\n", 34)                   = 3
read(255, "", 34)                       = 0
```
上述脚本的第二行，我将多个命令写到同一行，可以看到 bash 只读取了一次，后面两个 ls 行，bash 读取了两次。

## bash 有没有什么选项解决这个问题？
我觉的我遇到的问题可以通过 bash 的一个需求来解决，其内容如下：

	提供将脚本一次性载入内存并关闭相关文件描述符后执行脚本的功能

那么 bash 自己是否支持这个功能呢？读了下 bash 的 manual 找到了如下描述：

```manual
    -s        If the -s option is present, or if no arguments remain after option processing, then commands are read from the standard input.  This option allows the
                 positional parameters to be set when invoking an interactive shell or when reading input through a pipe.
```
这个选项的功能其实跟我上面描述的需求不同，但是通过这个选项我发现**如果我可以修改调用脚本的命令**，其实可以通过将调用命令修改为如下内容来解决本文中的问题。

```bash
cat ./test.sh | bash 
```
在这种方式中，cat 命令将 test.sh 文件内容通过管道传递给 bash，bash 从标准输入读取脚本内容，cat 命令将 test.sh 内容传递完成后关闭文件，然后 bash 开始执行，这意味着 bash 执行的时候就不会占用脚本文件了。

测试过程如下：

```bash
[longyu@debian-10:16:35:22] ~ $ cat /mnt/demo.sh
#!/bin/bash

umount /mnt
[longyu@debian-10:16:35:25] ~ $ ls /mnt
demo.sh  lost+found  umount.sh
[longyu@debian-10:16:35:43] ~ $ cat /mnt/demo.sh | sudo  bash
[longyu@debian-10:16:35:51] ~ $ ls /mnt
huge  rootfs
```
可以看到卸载成功了！
## 总结
这篇文章中根据如下问题展开叙述：

1. 如何本地模拟问题？
2. 网上有没有相关的解决方案？相关的方案是否能够使用？
3. 到底是谁在占用待卸载的分区？
4. 确定是 bash 在占用后，是否能够解释为什么 bash 在占用？
5. 是否有自己的解决方案？
6. 自己的解决方案是否能够解决问题？
7. 为什么解决方案能够工作？其背后有什么原理？
8. 解决方案是否引入新的问题？如果引入了该如何解决？
9. bash 执行脚本的过程到底是这样的？
10. bash 自己有没有解决这个问题的选项？
 
不断的提出这些新的问题并寻找答案，在这一过程中逐渐向真正的问题逼近，最终在解决问题的同时也消除了以前对某些程序执行原理的误解，写的过程有些焦灼，但写完了觉的很痛快！还是很有成就感的！

