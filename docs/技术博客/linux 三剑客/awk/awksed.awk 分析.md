# gawk 示例脚本 awksed.awk 代码分析
```gawk
# awksed.awk --- do s/foo/bar/g using just print
#    Thanks to Michael Brennan for the idea
#
# Arnold Robbins, arnold@skeeve.com, Public Domain
# August 1995

function usage()
{
    print "usage: awksed pat repl [files...]" > "/dev/stderr"
    exit 1
}

BEGIN {
    # validate arguments
    if (ARGC < 3)
        usage()

    RS = ARGV[1]
    ORS = ARGV[2]

    # don't use arguments as files
    ARGV[1] = ARGV[2] = ""
}

# look ma, no hands!
{
    if (RT == "")
        printf "%s", $0
    else
        print
}
```
## awksed.awk 源码

## awksed.awk 的使用

用法如下：

    usage: awksed pat repl [files...]" > "/dev/stderr"

该脚本使用 print 来完成与 s/foo/bar/g 相同的功能。

## 代码的主要逻辑


1. 检查参数个数

   如果参数个数不合法，则调用 usage 函数打印描述脚本使用方法的信息到标准错误。

2. 以 ARGV[1]、ARGV[2] 制作 RS、ORS 参数

   RS 为输入记录分隔符，默认为换行符。ORS 为输出记录分隔符，默认为换行。
  
   制作 RS、ORS 参数完成后将 ARGV[1] 与 ARGV[2] 的值清空。
  
3. 通过判断 RT 的值输出结果
   
   RT 为记录终止符。 gawk 会将 RT 设置为在输入文本以 RS 指定的字符或者正则表达式匹配得到的内容。
   
   如果 RT 为空则表示没有匹配到字符。如果 RT 不为空则直接输出即可。

## 总结   
这个程序利用了 RS、ORS、RT 这三个 gawk 内建变量完成。首先使用 RS 以指定格式将输入记录进行切割，如果切割成功，则 RT 将不为空。当 RT 不为空时，以 ORS 为记录分隔符输出记录就完成了替换的过程。


