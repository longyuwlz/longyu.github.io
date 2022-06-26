# shell umask 内建命令的原理及其背后的内核态行为
## umask 命令的功能
shell 中的 umask 内建命令是用来修改当前 shell 的文件权限创建掩码的。

## umask 命令的使用
umask 的使用方法如下所示：

```bash
       umask [-p] [-S] [mode]
```
此命令将当前进程的文件创建权限掩码设定为参数 mode 指定的内容。**如果 mode 以一个数字开始，它将被以 8 进制数解析，否则它将会被以类似 chmod 中指定的符号模式掩码的方式解析。**

如果没有指定 mode 参数，当前的 mask 值将会被打印。-S 选项表明通过符号形式打印 mask；默认的输出格式是 8 进制数字。如果指定了 -p 参数，并且没有指定 mode 参数，输出将会以一种能够被输入复用的格式打印。

返回值为 0 时表示 mode 被成功修改或未指定 mode 参数，其它情况下将会返回 false。

## umask 的使用示例
上文中解释 -p 参数的时候说明其输出将会以一种能够被输入复用的格式打印，这里的描述不太直观，通过下面一个例子就能够很好的说明这点内容。

```bash
[longyu@debian-10:07:16:53] Downloads $ umask -p -S 
umask -S u=rwx,g=rx,o=rx
```
可以看到，它输出的格式其实又是一条 umask 命令，这个命令可以被直接用于输入命令。

umask 的默认值为 0022，除非我们修改了它否则这个值应该是保持不变的，下文描述的创建文件目录的过程中使用的 umask 都是 0022。
### touch 普通文件
touch 命令可以被用来创建文件，下面的内容是我从 strace touch test 的输出中截取的关键内容：

```strace
openat(AT_FDCWD, "./test", O_WRONLY|O_CREAT|O_NOCTTY|O_NONBLOCK, 0666) = 3
```
可以看到，这里创建 test 文件的时候，传入的文件模式为 0666，我们先来看看最终创建出来的文件模式是什么？通过执行如下命令来查看：

```bash
[longyu@debian-10:07:24:07] Downloads $ ls -l test
-rw-r--r-- 1 longyu longyu 0 10月 29 07:24 test
```
最终创建出来的文件权限是 0644，我们用 0666 减掉 0644 就得到了 umask 的值，它就是上文提到过的 0022。

从这里可以看出，umask 将会在文件创建是从文件权限中减掉 umask 的值，也正是这里 mask 的含义，实际是屏蔽某个权限。
### mkdir 创建目录
mkdir 命令可以被用来创建目录，下面的内容是我从 strace mkdir test 的输出中截取的关键内容：

```strace
mkdir("test", 0777)                     = 0
```
可以看到这里系统调用 mkdir 被传入了 0777 这个文件权限，最终创建出来的目录权限如下：

```bash
[longyu@debian-10:07:16:48] Downloads $ ls -ld ./test
drwxr-xr-x 2 longyu longyu 4096 10月 29 07:16 ./test
```
这里最终的目录权限与上面文件创建的过程类似，同样屏蔽掉 umask 表示的权限。

## umask 命令的原理
umask 命令其实是通过同名系统调用 umask 来完成工作的，通过 strace bash 进程，然后运行 umask 命令来获取当前进程的 umask 值，得到了如下关键信息：

```strace
umask(022)                              = 022
umask(022)                              = 022
```

这里执行了两次 umask 系统调用，传入 umask 系统调用的参数表示要设定为的值，返回值表示旧的 umask 的值。

**那这里为什么要执行两次 umask 系统调用呢？**

man 2 umask 能够看到如下信息：
```
       It is impossible to use umask() to fetch a process's umask without 
       at the same time changing it.  
       A second call to umask() would then be needed  to  restore  the
       umask.  The nonatomicity of these two steps provides the potential 
       for races in multithreaded programs.
```
上述信息说明，我们只能在**修改进程 umask 的同时才能获取到旧的 umask 的值**。

这样当我们需要**获取当前进程 umask 的值时**，我们需要执行两次系统调用，第一次系统调用设定 umask 的值并返回旧的 umask 值，**但这时 umask 值可能因为我们传入的参数而被改变，因此需要第二次调用，以恢复旧的 umask 值。**

这样的过程在多线程编程中将会引入一个**竞争条件**，主要问题在于**两次 umask 系统调用中间 umask 的值可能会被修改。**

从 **Linux 4.7** 版本后，每一个进程的 **umask** 值都可以通过 **/proc/[pid]/status** 中的 **Umask** 字段来查看。观察 **/proc/self/status** 的值让程序不用修改 **umask** 就能够获取到 **umask** 的值。

示例如下：

```bash
[longyu@debian-10:07:48:36] iproute2-3.10.0 $ cat /proc/self/status
Name:	cat
Umask:	0022
```

### 修改 umask 值
同样 strace bash 来测试修改 umask 值时的行为，确认通过下面一行系统调用来完成：

```bash
umask(044)                              = 022
```
## umask 命令背后的内核行为
umask 系统调用在 kernel/sys.c 中定义，其代码如下：

```c
1811 SYSCALL_DEFINE1(umask, int, mask)
1812 {
1813     mask = xchg(&current->fs->umask, mask & S_IRWXUGO);
1814     return mask;
1815 }
```
**可以看到这里直接使用传入的 mask 的值（限定在 S_IRWXUGO 权限中）修改当前进程 fs 结构体中的 umask 字段。**

这里使用了 **xchg** 函数**原子交换**新旧 mask 的值！

### umask 真正起作用的点
内核中一般通过 **current_umask** 获取当前进程的 umask 值，其代码如下：

```c
int current_umask(void)
{
	return current->fs->umask;
}
EXPORT_SYMBOL(current_umask);
```
几个典型的使用场景如下：

```cscope
*** fs/namei.c:
lookup_open[3179]              mode &= ~current_umask();
do_mknodat[3759]               mode &= ~current_umask();
do_mkdirat[3836]               mode &= ~current_umask();
```
上面使用 **current_umask** 的代码中，可以看到 **current_umask** 返回的值被**从 mode 中屏蔽掉**，**这就是 umask 真正起作用的地方**。

**do_mknodat** 与 **do_mkdirat** 都是在**创建文件**的过程，这些过程涉及到对文件权限的控制是可以理解的，**那 lookup_open 又是用在哪里呢？**

阅读代码我发现 lookup_open 有如下调用过程：

```
path_openat->do_last->lookup_open
```

lookup_open 用于普通文件创建时，在这一过程中 umask 真正起作用的代码摘录如下：

```c
	if (open_flag & O_CREAT) {
		if (!IS_POSIXACL(dir->d_inode))
			mode &= ~current_umask();
```

其实文件的权限是存储在 inode 节点中的，inode 结构体与文件权限相关的字段如下：

```c
struct inode {
	umode_t			i_mode;
	unsigned short		i_opflags;
```
文件的权限存储在 inode 节点中，每一个文件至少会使用到一个 inode，在 inode 的分配过程中 mode 被使用。








