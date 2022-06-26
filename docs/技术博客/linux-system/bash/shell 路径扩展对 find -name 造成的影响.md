# shell 路径扩展对 find -name 造成的影响

最近很多次在使用 *find -name* 时都会遇到一个问题。下面就是这类问题的示例：

	[longyu@debian:21:20:27] ~ $ ls *.log
	problem.log  system-error.log
	[longyu@debian:21:20:31] ~ $ ls "*.log"
	ls: cannot access *.log: No such file or directory
	[longyu@debian:21:20:37] ~ $ ls '*.log'
	ls: cannot access *.log: No such file or directory
	[longyu@debian:21:20:41] ~ $ find ./ -name *.log
	find: paths must precede expression: system-error.log
	Usage: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|	opt|exec] [path...] [expression]
	[longyu@debian:21:20:57] ~ $ find ./ -maxdepth 1 -name "*.log"
	./system-error.log
	./problem.log
	[longyu@debian:21:21:13] ~ $ find ./ -maxdepth 1 -name \*\.log 
	./system-error.log
	./problem.log
	[longyu@debian:21:21:19] ~ $ find ./ -maxdepth 1 -name \*.log
	./system-error.log
	./problem.log
	[longyu@debian:21:21:22] ~ $ find ./ -maxdepth 1 -name '*.log'
	./system-error.log
	./problem.log
	[longyu@debian:21:21:32] ~ $ 

从最上面 *ls* 命令的输出中可以发现，当前目录下存在两个后缀名为 *log* 的文件。紧接着的两个失败的 *ls* 命令只是用来说明 *shell* 的路径扩展对程序的执行可能造成的影响。*shell* 在执行子程序前会进行路径扩展，将通配符展开作为参数传递给子程序，包含在双引号中的变量也会进行变量名扩展。将通配符放在引号中是避免 *shell* 进行路径扩展的一种方案，也可以通过反斜杠转义的方式阻止 *shell* 进行路径扩展。这就是 *find -name* 出现问题的原因，这个问题是由 *shell* 造成的，而非子程序的 *bug*。

关于这点，在 *find* 命令的 *manual* 文件中有如下描述:
 

>NON-BUGS
>       $ find . -name *.c -print
>       find: paths must precede expression
>       Usage: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec] [path...] [expression]
>
>    This  happens because *.c has been expanded by the shell resulting in find actually receiving
> a command line like this:
>
>       find . -name bigram.c code.c frcode.c locate.c -print
>　That command is of course not going to work.  Instead of doing things this  way,  you  should
>       enclose the pattern in quotes or escape the wildcard:
>       $ find . -name \*.c -print
>

在我上面的例子中， *find* 执行的命令行实际为:

	find ./ -name problem.log system-error.log
这显然不符合 *find* 命令的格式，通过使用引号与转义字符便可以解决此问题，上面也给出了实例。

这个问题也会以其它的形式在我们使用其它命令时出现，这就要求我们要梳理 *shell* 的工作流程，至少我们必须要确保命令行是我们想要的格式，命令行很多时候都不是看上去那样，尽管我们常常这样认为！

如果有一天你发现变量名扩展也会造成问题，那么你只需要用单引号代替双引号即可避免变量名扩展。

