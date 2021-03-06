# 以 cat 为例讲述更高效的命令行使用方式

cat 是 unix 中的一个基础命令，你可以在很多基础命令学习书籍的例子中看到它。cat 属于查看文件内容的命令，与它功能相似的一个命令是 tac，只是这个命令从后向前输出文件内容。

**一般情况下，我们经常需要查询文件中的特定内容，这时我们可以先通过 cat 来读取文件，并将文件内容通过匿名管道发送到子进程中进行处理。这是一个常见的解决方案，但这个方案并不高效。在普通情况下也许这点并不重要，但在处理多个文件时就显得相对重要了。**

下面以一个具体的例子来讲。有一天，我们需要判断系统中是否存在指定用户，我们可以通过在系统数据文件 /etc/passwd 中查询用户名的方式来确定。具体的命令如下：
	
	cat /etc/passwd | grep 'username'
	
上述命令有着这样的流程：

**首先，shell 读取命令行，发现 | （pipe line）则创建一个匿名管道。shell 将为每个命令创建独立的进程。在这个例子中，shell 首先创建 cat 命令的执行任务，然后创建 grep 的执行任务。shell 使用创建好的匿名管道将 cat 命令的标准输出连接到 grep 命令的标准输入，这就是所有的过程。**

在上述命令中，shell 需要创建两个任务，并创建匿名管道来完成进程间通信工作，这两个进程分别写、读管道的一端来完成数据的传输任务。这是匿名管道的一个经典使用方式，十分常见。

尽管我们经常这样使用，但这种方式其实是对 cat 命令与管道的滥用。unix 中同过多个命令之间的组合来完成复杂的功能，这是 unix 体系结构的一大特征，但这并不意味着你每次都需要这样做。当能够使用单个命令来完成上述过程时，你完全可以使用单个命令来实现。

对于 cat 命令的使用，当你需要查看某些极短内容的文件或者查看文件中的某些特殊字符时，你可以使用 cat 来完成，仅仅这一个命令就可以完成工作。当你需要在文件中查询特定字符的时候你可以使用 grep 、sed、awk 来完成。

应用于上述例子，你就可以使用如下命令行替换上述命令行，这是其中的一种方式。
	
```sh
	grep 'username' /etc/passwd 
	
	sed -n '/username/p' /etc/passwd
	
	awk '/username/ {print $0}' /etc/passwd
```

单个命令的方式减少了多个任务创建与销毁及使用进程间通信的性能损耗，这可以称为一种更高效的命令行使用方式。

