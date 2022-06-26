# gawk 示例脚本 egrep.awk 分析
## egrep.awk 代码
```gawk
# egrep.awk --- simulate egrep in awk
#
# Arnold Robbins, arnold@skeeve.com, Public Domain
# May 1993

# Options:
#    -c    count of lines
#    -s    silent - use exit value
#    -v    invert test, success if no match
#    -i    ignore case
#    -l    print filenames only
#    -e    argument is pattern
#
# Requires getopt and file transition library functions

BEGIN {
    while ((c = getopt(ARGC, ARGV, "ce:svil")) != -1) {
        if (c == "c")
            count_only++
        else if (c == "s")
            no_print++
        else if (c == "v")
            invert++
        else if (c == "i")
            IGNORECASE = 1
        else if (c == "l")
            filenames_only++
        else if (c == "e")
            pattern = Optarg
        else
            usage()
    }
    if (pattern == "")
        pattern = ARGV[Optind++]

    for (i = 1; i < Optind; i++)
        ARGV[i] = ""
    if (Optind >= ARGC) {
        ARGV[1] = "-"
        ARGC = 2
    } else if (ARGC - Optind > 1)
        do_filenames++

#    if (IGNORECASE)
#        pattern = tolower(pattern)
}
#{
#    if (IGNORECASE)
#        $0 = tolower($0)
#}
function beginfile(junk)
{
    fcount = 0
}
function endfile(file)
{
    if (! no_print && count_only) {
        if (do_filenames)
            print file ":" fcount
        else
            print fcount
    }

    total += fcount
}
{
    matches = ($0 ~ pattern)
    if (invert)
        matches = ! matches

    fcount += matches    # 1 or 0

    if (! matches)
        next

    if (! count_only) {
        if (no_print)
            nextfile

        if (filenames_only) {
            print FILENAME
            nextfile
        }

        if (do_filenames)
            print FILENAME ":" $0
        else
            print
    }
}
END {
    exit (total == 0)
}
function usage()
{
    print("Usage: egrep [-csvil] [-e pat] [files ...]") > "/dev/stderr"
    print("\n\tegrep [-csvil] pat [files ...]") > "/dev/stderr"
    exit 1
}

```
## egrep.awk 实现的功能
egrep.awk 只实现了 grep 功能的一个子集，它支持的参数如下：

    -c    计数行
    -s    静默模式
    -v    反转测试，不匹配则成功
    -i    忽略大小写
    -l    仅仅输出文件名
    -e    参数为匹配模式

## 参数如何提取
使用库函数 getopt 来提取参数，调用语句如下：

    while ((c = getopt(ARGC, ARGV, "ce:svil")) != -1)

getopt 通过解析命令行来生成参数信息，该函数有如下外部变量：

    Optind -- index in ARGV of first nonoption argument ARGV 中第一个非选项参数下
    标
    Optarg -- string value of argument to current option 当前选项的字符串参数值
    Opterr -- if nonzero, print our own diagnostic 非空则输出对应的诊断信息
    Optopt -- current option letter 当前选项字母

## 解析到参数后如何处理
处理规则如下:

**如果指定了命令行选项则设置一全局变量来保存命令行选项设定。**

例如：

如果指定了 -c 选项则 count_only++ ，count_only 大于 0 表示执行计数匹配行操作。
如果指定了 -s 选项则 no_print++，no_print 大于 0 表示禁止打印。

参数处理完成后，对每一输入文件进行匹配。按照解析的命令行配置处理方式与输出格式。

## 调用示例
```sh
	[longyu@debian:22:42:50] prog $ gawk -i ../lib/getopt.awk -f egrep.awk '#'  egrep.awk 
	# egrep.awk --- simulate egrep in awk
	#
	# Arnold Robbins, arnold@skeeve.com, Public Domain
```

## 解决传递选项异常的问题
　　　　　　　
使用此方法向脚本传递选项时会产生问题，为此修改源码如下:

```awk
	#!/usr/bin/gawk -E 
	# egrep.awk --- simulate egrep in awk
	#
	# Arnold Robbins, arnold@skeeve.com, Public Domain
	# May 1993
	
	# Options:
	#    -c    count of lines
	#    -s    silent - use exit value
	#    -v    invert test, success if no match
	#    -i    ignore case
	#    -l    print filenames only
	#    -e    argument is pattern
	#
	# Requires getopt and file transition library functions
	
	@include "../lib/getopt.awk"
	
	BEGIN {
	    while ((c = getopt(ARGC, ARGV, "ce:svil")) != -1) {
	        if (c == "c")
	            count_only++
	        else if (c == "s")
	            no_print++
	        else if (c == "v")
	            invert++
	        else if (c == "i")
	            IGNORECASE = 1
	        else if (c == "l")
	            filenames_only++
	        else if (c == "e")
	            pattern = Optarg
	        else
	            usage()
	    }
	    if (pattern == "")
	        pattern = ARGV[Optind++]
	
	    for (i = 1; i < Optind; i++)
	        ARGV[i] = ""
	    if (Optind >= ARGC) {
	        ARGV[1] = "-"
	        ARGC = 2
	    } else if (ARGC - Optind > 1)
	        do_filenames++
	
	#    if (IGNORECASE)
	#        pattern = tolower(pattern)
	}
	#{
	#    if (IGNORECASE)
	#        $0 = tolower($0)
	#}
	
	BEGINFILE{
	    fcount = 0	
	}
	{
	    matches = ($0 ~ pattern)
	    if (invert)
	        matches = ! matches
	
	    fcount += matches    # 1 or 0
	
	    if (! matches)
	        next
	
	    if (! count_only) {
	        if (no_print)
	            nextfile
	
	        if (filenames_only) {
	            print FILENAME
	            nextfile
	        }
	
	        if (do_filenames)
	            print FILENAME ":" $0
	        else
	            print
	    }
	}
	ENDFILE {
	    if (! no_print && count_only) {
	        if (do_filenames)
	            print FILENAME ":" fcount
	        else
	            print fcount
	    }
	
	    total += fcount
	}
	END    \
	{
	    if (total == 0)
	        exit 1
	    exit 0
	}
	function usage(    e)
	{
	    e = "Usage: egrep [-csvil] [-e pat] [files ...]"
	    e = e "\n\tegrep [-csvil] pat [files ...]"
	    print e > "/dev/stderr"
	    exit 1
	}　　　　
```		
		
在首行添加　#!/usr/bin/gawk -E ，这就避免了向脚本传递的选项参数被 gawk 解释的问题。同时需要注意的是 -E 与 -f 类似，但是它是最后一个处理的选项，也就是说它后面的参数不再由 gawk 进行解释。

## 处理多个文件的注意事项
gawk 提供两个特殊的模式——BEGINFILE 与 ENDFILE。BEGINFILE 模式会在命令行指定的每个输入文件的第一行被读入前执行，ENDFILE 模式会在命令行指定的每个输入文件的最后一行被读入后执行。注意这两个模式与 BEGIN 和 END 模式的区别。BEGIN 会在任意输入文件被读入之前执行，END 会在输入文件处理完成或者 exit 语句执行后执行。

很明显我们这里需要使用 BEGINFILE 与 ENDFILE 来完成任务。修改 BEGINFILE 与 ENDFILE 函数来添加这两个模式，修改之后程序就能正常工作了。

## 忽略大小写如何实现
注意忽略大小写的操作被注释掉了，指定 -i 将不会有预期效果。这里不区分大小写的处理方式是将每一行记录与匹配模式统一转化为小写来实现。

## 修改的测试结果
```awk	
	[longyu@debian:22:33:50] tmp $ ./egrep.awk  'BEGIN' data getopt.awk 
	data:#BEGIN {
	getopt.awk:#BEGIN {
	[longyu@debian:22:34:05] tmp $ ./egrep.awk -s 'BEGIN' data getopt.awk 
	[longyu@debian:22:34:11] tmp $ ./egrep.awk -f 'BEGIN' data getopt.awk 
	f -- invalid option
	Usage: egrep [-csvil] [-e pat] [files ...]
		egrep [-csvil] pat [files ...]
	[longyu@debian:22:34:15] tmp $ ./egrep.awk -l 'BEGIN' data getopt.awk 
	data
	getopt.awk
	[longyu@debian:22:34:20] tmp $ ./egrep.awk -v -c 'BEGIN' data getopt.awk 
	data:1
	getopt.awk:79
```
## 其它的调用方式
也可以不在脚本的第一行指定解析器，直接使用命令行来指定。这种情况有以下两种方式:

```sh
	root@debian:/usr/share/doc/gawk/examples/prog# gawk -i ../lib/getopt.awk -E egrep.awk -c 'BEGIN' egrep.awk egrep.awk
	egrep.awk:2
	egrep.awk:2
	
	root@debian:/usr/share/doc/gawk/examples/prog# gawk -i ../lib/getopt.awk -f egrep.awk -- -c 'BEGIN' egrep.awk egrep.awk
	egrep.awk:2
	egrep.awk:2
```	
使用 -E 或者使用 \-\- 选项都可以。

