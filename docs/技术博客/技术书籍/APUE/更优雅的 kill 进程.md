# 更优雅的 kill 进程

使用 unix  的时候常常需要 kill 一个进程，而我们又常常记不住进程的 pid，所有一般首先使用 ps 命令来打印系统中的进程，然后对 ps 得到的数据以进程名进行过滤，提取出相对应的 pid，以该 pid 为参数调用 kill 就完成了整个的任务。

一个基础的示例如下:

1. 查找进程
	
	[longyu@debian:18:12:14] ~ $ ps -ef | grep bash
	longyu    7175  1964  0 18:05 pts/0    00:00:00 /bin/bash
	longyu    8313  7175  0 18:12 pts/0    00:00:00 grep --color=auto bash
	
2. kill 进程
	
		kill -9 7175
	
-9 指定 kill 强制终止进程，这在某种情况下可能会造成问题，常常是进程所占有的某些资源没有正常释放的问题。可以使用 kill 的默认发送信号 SIGTERM 来让进程正常终止。

《APUE》 中对 SIGTERM 信号的讲解内容如下:

这是 kill 命令在默认情况下发送的终止信号。因为它可以被应用程序捕捉到，因此使用 SIGTERM 能够给应用程序一个在 exit 之前执行回收工作优雅终止的机会（与  SIGKILL 正相反， SIGKILL 不能被捕捉到或忽略）。

一个可以判定为存在问题的更高级的示例如下:
	
	1. kill $(ps -ef | grep top | awk '/ top$/ {print $2}')
	   bash: kill: (10793) - No such process
	
	2. ps -ef | grep top | awk '/ top$/ {print $2}' | xargs kill

	
上面的第一个命令执行时，子 shell 创建的 grep 命令也将会被找到，子 shell 执行完后 grep 命令的主体进程已经终止，pid 已经无效，因此会有上面的错误。

第二个命令执行时，grep 命令的执行进程也会被找到，只是在发送 kill 信号的时候，该进程还没有终止，因此不会报第一个命令中的错误。

一个改进的示例如下:
	
	
	kill $(ps -ef | grep top | grep -v grep | awk '/ top$/ {print $2}')
	
上述命令能够解决 grep 中找到子 shell 中 grep 命令主体进程的问题，但上述方式的执行效率较低。

一个更好的示例如下:
	
       ps -ef | awk '/ top$/ {print $2}' | xargs kill 
       
       kill $(ps -ef | awk '/ top$/ {print $2}')
       
使用 awk 来代替 grep，不仅没有前几个示例中存在的问题，也减少了进程的使用数目，减少了管道的使用数目。

也可以使用 sed 来代替 awk，不过在这种方式下，sed 中的匹配字符串不容易写出来，你需要使用匹配子串来完成，对于这个简单的任务来讲，你直接使用 awk 就可以了。

