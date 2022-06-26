# linux 中文件批量重命名
## mv 命令与批量重命名
linux 中文件重命名一般使用 mv 命令来完成。此命令以单个文件为参数将旧文件重命名为一个新的文件。如果要实现批量化重命名操作，用户需要自行编写程序。

## 实现批量重命名

### 最简单的实现

```sh
	file=$(find ./ -name '*test*')
	for i in $file;
	do mv $i ${i//test/data}
	done

```
上面的实现中首先使用 find 命令来获取需要批量重命名的文件名并存储到变量 file 中。然后遍历变量内容，使用 bash 中的 pattern substitution 功能来生成新的文件名，以此文件名作为 mv 命令的参数来完成重命名工作。

上述实现相当简单，它其实并不完整。文件名列表、待替换的文件名内容与替换字符串可以通过命令行参数来指定，这样就算是一个完整的功能。

这里使用的 bash 模式替换功能并不常见，可以算作是 bash 的一个技巧。虽然能够解决问题，但总有点奇技淫巧的意味。

### 使用 awk 的实现

使用 awk 来完成相同的功能时，可以使用 awk 来完成文件名的替换并生成命令，然后调用 system 函数执行命令即可。

下面是一个具体的实现：

```c
#!/usr/bin/gawk -f

function parse_regex(string, regex_arg,    regex_cmd, sep, array_index)
{
    if (string == "" ) {
        return 0
    }
    
    sep = substr(string, 2, 1)

    if (sep ~! /[[:punct:]]/) {
        print sep " is invalid" > "/dev/stderr"
        return 0
    }
    
    array_index = split(string, regex_cmd, sep)
    
    regex_arg["cmd"] = regex_cmd[1]
    regex_arg["regex"] = regex_cmd[2]
    regex_arg["replace"] = regex_cmd[3]
    regex_arg["opt"] = regex_cmd[4]

    return array_index;
}

function execute_substitute(string, regex_cmd)
{
    if (string == "") {
        return ""
    }
    
    switch (regex_cmd["cmd"]) {
    case "s":
    default:
        if (regex_cmd["opt"] == "g") {
            gsub(regex_cmd["regex"], regex_cmd["replace"], string)
            return string
        } else {
            sub(regex_cmd["regex"], regex_cmd["replace"], string)
            return string
        }
    }
}

BEGIN {
    if (!parse_regex(ARGV[1], regex_cmd)) {
        print "invalid regex cmd" ARGV[1] >"/dev/stderr"
        exit 1
    }

    for (i = 2; i < ARGC; i++) {
        string = execute_substitute(ARGV[i], regex_cmd)

        if (string != ARGV[i]) { # add single quote to avoid special character problem
            cmd_buffer = "mv -i -v " "'"ARGV[i]"'" " " "'"string"'"
            system(cmd_buffer)
        }
    }
    
    exit 0
}
```
用户需要在命令行中指定类似于 sed 中的替换命令。这里仅仅实现了 's' 命令，不过由于时间原因它并不是一个很严格的实现。

程序首先解析用户指定的替换命令，将字符串切割并放到一个哈希数组中。解析成功后首先执行替换，然后使用替换的结果生成命令行，调用 system 执行命令即可完成重命名工作。依次遍历命令行参数中指定的文件名来批量重命名文件。

运行示例如下:
```sh
    [longyu@debian:17:00:23] awk $ ./rename.awk 's;awk;gawk;' *
    "alarm.ggawk分析.md" -> "alarm.gggawk分析.md"
    "anagram.ggawk分析" -> "anagram.gggawk分析"
    "egrep-ggawk分析.md" -> "egrep-gggawk分析.md"
    "ggawksed分析.md" -> "gggawksed分析.md"
    "使用ggawk生成代码的两种不同方式.md" -> "使用gggawk生成代码的两种不同方式.md"
```

### 使用 rename 命令

最近发现了一个更为方便的脚本——rename。它是一个 perl 脚本，支持批量重命名工作，并且支持使用 perl 风格的正则替换命令，功能十分强大。

研究发现这个脚本使用了 perl File 模块中的 Rename 功能，更详细的信息请自行百度。

下面是 manual 中的两个示例：

```sh
  rename 's/\e.bak$//' *.bak　　＃　移除当前目录中后缀为 .bak 的文件名的后缀	
　rename 'y/A-Z/a-z/' *　　　　  #　将当前目录中所有文件的文件名中的大写字母转化为小写

```

### 该使用哪一种实现呢
在上面的几种实现中，我推荐使用 rename 。需要注意这种批量化操作虽然方便，却可能产生致命的后果，因此执行命令前一定要多测试测试！


