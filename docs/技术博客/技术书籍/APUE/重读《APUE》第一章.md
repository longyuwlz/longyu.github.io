# 重读《APUE》第一章

## 家目录从哪里获取
当我们登录到 linux 中后，【家目录】是当前的工作目录。家目录的位置从 【/etc/passwd】 中的字段中取得。	

## 非缓冲 I/O 相关函数
【unistd.h】 中包含了【非缓冲 I/O】 操作函数 open、read、write、lseek 与 close 函数的原型。这些函数通过使用 【file descriptor】 完成工作。

对于 read、write 而言，它们面向的是【字符流】，通过读写指定的 buffer 长度来完成，对它们而言，一个字符的具体内容是【隐藏的】。

使用非缓冲函数，用户需要自己指定 buffer 的大小。与之相反的是带缓冲的 I/O 操作函数，调用带缓冲的 I/O 操作函数不需要指定缓冲区的大小。

## 带缓冲 I/O 相关函数
带缓冲的 I/O 操作函数使得对输入行的处理操作变得更加容易。用户可以直接调用相关函数来读取一行数据到缓冲区中。

在这里需要注意带缓冲的 i/O 函数【缓冲区刷新】的时机。列举如下：

1. 缓冲区满
2. 输入输出切换
3. 读入一个 '\n' 字符

注意使用带缓冲的 I/O 函数要包含 【stdio.h】 文件，使用不带缓冲的系统调用函数需要包含 【unistd.h】函数。

### 程序与进程

一个程序是一个驻留在磁盘某个目录中的一个可执行目标文件。一个程序可以被读入内存并且可以通过使用７个 exec 函数中的一个而被内核执行。一个程序的执行实例被称为一个进程。

## pid
进程号可以通过调用 getpid 函数来获取。getpid 函数的返回值为 pid_t 类型，这里需要进行类型转化。由于标准中规定 pid_t　要与 long 型整数的大小吻合，使用一个 long 型变量来接收返回值即可。

## 进程的特征与相关的系统调用
	
每一个进程都是独立的单位，分配有唯一的表示符称为进程号。每一个进程都有自己独立的地址空间，为此要在进程间进行通信，内核必须提供额外的函数来完成，这些函数就是 IPC 操作函数。

与进程相关的三个主要函数为：fork (创建进程)，exec (加载执行可执行目标文件)、waitpid (等待子进程终止)。

## Figure 1.7 中存在的问题
Figure 1.7 这里有一个问题需要注意！

用户输入的是可执行程序的名字，这个可执行程序不在当前工作目录下，怎么找到呢？是不是也像 shell 一样会搜索 PATH 呢？

## execlp 系统调用的内部细节
man execlp 发现如下描述：
		
	       The execlp(), execvp(), and execvpe() functions duplicate the actions of the shell in search‐
	       ing  for an executable file if the specified filename does not contain a slash (/) character.
	    　
	    　如果指定的 filename 不包含一个斜杠，execlp、execvp、execvpe 函数将按照 shell 查找一个可执行文件的相同动作执行。
	    　
	       The file is sought in the colon-separated list of directory pathnames specified in  the  PATH
	       environment  variable.
	       
	       这个文件将在PATH中指定的以冒号分隔的目录路径列表中查找。
	       
	         If this variable isn't defined, the path list defaults to the current
	       directory followed by the list of directories returned  by  confstr(_CS_PATH).   (This  conf‐
	       str(3) call typically returns the value "/bin:/usr/bin".)
	
		　　如果未定义此变量，则路径列表默认为当前目录后跟confstr（_CS_PATH）返回的目录列表。confstr 函数通常会返回 /bin/:/usr/bin 这个路径值。
	       
	       If  the  specified filename includes a slash character, then PATH is ignored, and the file at
	       the specified pathname is executed.
		
		如果指定的文件名包含一个斜杠字符，PATH 将被忽略，在指定的路径名下的文件将被执行。
	
## errno 的定义
在异常处理时需要注意 errno 存在的问题。

POSIX 与	ISO C 中 errno 的定义如下：

	extern int errno;
	
上述定义在多进程环境中没有问题，在支持多线程的环境中会导致数据不一致的问题。由于多个线程共享进程的地址空间，每一个线程需要将 errno 私有化，这样才能避免出现错误。linux 中将 errno 定义如下：

	extern int *_ _errno_location(void);
	#define errno (*_ _errno_location())

## errno 的使用规则
对于 errno 有两条规则。

1. 如果未发生错误则 errno 的值不会被执行事务改变。

2. errno 的值不会被任何函数赋值为 0

第一条规则表明我们仅仅需要当函数执行返回错误时再去检查 errno 的值。

## 错误分类
errno.h 中定义的错误可以分为两类：

1. 非致命错误

2. 致命错误

一个致命错误没有恢复操作。对其而言，最好的处理方式就是打印错误信息然后退出。非致命错误与此相反，有时能够得到解决。大多数非致命错误都是临时的，例如资源短缺，并且当系统中的活动很少时将不会产生。

通常从一个非致命错误中恢复的一般流程是延时重试，这种方法也可以被应用到其它环境中。

## 用户 id 与用户组 id 的注意事项

对于磁盘中的每一个文件，文件系统都存储了该文件拥有者的用户 id 与组 id。如果以两个字节分别存储这两个 id ，那么只需要占用 4-byte 的磁盘空间。如果以 ASCII 的格式存储用户名与组名则需要更多的空间。同时，在检查权限时比对字符串要比比对整数耗费更多的 cpu 周期。

对于一个用户而言，用户名与组名字符串却更容易使用。因此，系统通过密码文件来完成用户 id 与用户名之间的映射，通过属组文件来完成组 id 与组名之间的映射。这与 dns 服务器要达成的目标类似，只是这里的实现相对简单。


## 用户最多能加入到多少各组中
一个用户可以加入到多个组中。POSIX 规定一个系统至少支持一个用户加入 ８ 个组。

## 信号的作用

信号是用来通知一个进程一些条件已经发生了。

## 进程处理信号的三种方式

1. 忽略接收到的信号

2. 执行默认行为

3. 提供一个函数以供当捕获到相应的信号后被调用

## 怎样向一个进程发送信号，有什么条件
可以使用 kill 函数来发送信号。必须注意只有当目标进程属于当前用户或者具有 root 权限时才能够向目标进程发送信号。


## UNIX 上面存在的两种时间值表示方法。

1. 日历时间
 3.  进程时间

日历时间以 Epoch 时间为起点，计算经过的秒数。

进程时间也可称为 cpu 时间，它被用来测量进程使用 cpu 资源的时间。 

## 系统调用与库函数的关系

有些库函数可能会使用系统调用，有些库函数却不依赖系统调用。我们可以根据需要替换库函数，而系统调用通常不能被替换。



