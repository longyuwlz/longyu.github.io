# gawk 示例脚本 alarm.awk 代码分析
## gawk 示例脚本 alarm.awk 代码
```gawk
# alarm.awk --- set an alarm
#
# Requires getlocaltime() library function
#
# Arnold Robbins, arnold@skeeve.com, Public Domain
# May 1993
# Revised December 2010

# usage: alarm time [ "message" [ count [ delay ] ] ]

BEGIN {
    # Initial argument sanity checking
    usage1 = "usage: alarm time ['message' [count [delay]]]"
    usage2 = sprintf("\t(%s) time ::= hh:mm", ARGV[1])

    if (ARGC < 2) {
        print usage1 > "/dev/stderr"
        print usage2 > "/dev/stderr"
        exit 1
    }
    switch (ARGC) {
    case 5:
        delay = ARGV[4] + 0
        # fall through
    case 4:
        count = ARGV[3] + 0
        # fall through
    case 3:
        message = ARGV[2]
        break
    default:
        if (ARGV[1] !~ /[[:digit:]]?[[:digit:]]:[[:digit:]]{2}/) {
            print usage1 > "/dev/stderr"
            print usage2 > "/dev/stderr"
            exit 1
        }
        break
    }

    # set defaults for once we reach the desired time
    if (delay == 0)
        delay = 180    # 3 minutes
    if (count == 0)
        count = 5
    if (message == "")
        message = sprintf("\aIt is now %s!\a", ARGV[1])
    else if (index(message, "\a") == 0)
        message = "\a" message "\a"
    # split up alarm time
    split(ARGV[1], atime, ":")
    hour = atime[1] + 0    # force numeric
    minute = atime[2] + 0  # force numeric

    # get current broken down time
    getlocaltime(now)

    # if time given is 12-hour hours and it's after that
    # hour, e.g., `alarm 5:30' at 9 a.m. means 5:30 p.m.,
    # then add 12 to real hour
    if (hour < 12 && now["hour"] > hour)
        hour += 12

    # set target time in seconds since midnight
    target = (hour * 60 * 60) + (minute * 60)

    # get current time in seconds since midnight
    current = (now["hour"] * 60 * 60) + \
               (now["minute"] * 60) + now["second"]

    # how long to sleep for
    naptime = target - current
    if (naptime <= 0) {
        print "alarm: time is in the past!" > "/dev/stderr"
        exit 1
    }
    # zzzzzz..... go away if interrupted
    if (system(sprintf("sleep %d", naptime)) != 0)
        exit 1

    # time to notify!
    command = sprintf("sleep %d", delay)
    for (i = 1; i <= count; i++) {
        print message
        # if sleep command interrupted, go away
        if (system(command) != 0)
            break
    }

    exit 0
}
```
## alarm.awk 如何使用

alarm.awk 用法如下：

    usage: alarm time [ "message" [ count [ delay ] ] ]

注意中括号中为可选参数，time 的格式为 hh:mm。

## 从命令行中获取参数的注意事项
对于需要从命令行中获取参数的脚本，首先要检查参数个数是否足够，然后要检查参数格式是否正确。

对参数个数的检查可以通过判断 ARGC 的值来完成，对参数格式的检查可以通过正则表达式匹配来完成。

当检查到用户传入的参数不合法时，需要打印使用信息，以供用户参考。对于将要打印的使用信息或者错误信息，可以提前制作好。当检测到错误时，就打印出制作好的信息，这样就将错误信息与具体的异常处理过程分隔开，修改错误信息将不会影响异常处理的代码。也许当仅仅有一个异常处理流程时，上述操作的意义并不大，当数目上升后，修改一次错误信息意味着要修改多个实例，无疑增加了错误产生的几率。

判断参数个数与参数合法性的顺序也要注意。当参数个数都不合法时，在此之上检查参数合法性就失去了意义，毕竟你无法从一个错误的前提推出一个正确的结论。所以，首先检查参数个数，不合法则终止程序，合法则继续检查参数格式。

## alarm.awk 中对参数的检验与使用
alarm.awk 中在检查参数格式合法性的同时也按照参数生成初始化配置。注意命令行传给 awk 的参数都是字符串，对 message 参数不需要进行任何进一步的处理，对于整型变量，却要进行转化。

转化方式如下：
```awk   
      delay = ARGV[4] + 0
      count = ARGV[3] + 0
   ```
对于 time 的校验通过以下代码完成：
```awk
     if (ARGV[1] !~ /[[:digit:]]?[[:digit:]]:[[:digit:]]{2}/)
```
[:digit:] 为字符类的一种。字符类仅仅在一个正则表达式中的字符列表中有效，上面将所有的字符类都包在字符列表之中，符合字符类的使用要求。


? 表示最多匹配一次或者不匹配，{2} 表示重复匹配两次。

上述正则表达式检查的字符串格式如下：
    
    [h]h:mm
       
## switch 中的注意事项
在 switch 语句中需要注意没有加 break 的 case 项将继续向下执行！
```sh
    case 5:
        delay = ARGV[4] + 0
        # fall through
    case 4:
        count = ARGV[3] + 0
        # fall through
    case 3:
        message = ARGV[2]
        break
```
## alarm.awk 提供的默认配置
由于 message 、delay、count 都是可选参数，当用户没有指定时，应该设置为默认值。

delay 默认值为 180，表示时间到了之后每 3 分钟提醒一次。count 默认值为 5，表示总共提醒 5 次。message 默认值使用 snprintf　制作，snprintf　将会返回一个字符串，而不是直接输出到 stdout 中。

代码如下：
```awk
	# set defaults for once we reach the desired time
	    if (delay == 0)
	        delay = 180    # 3 minutes
	    if (count == 0)
	        count = 5
	    if (message == "")
	        message = sprintf("\aIt is now %s!\a", ARGV[1])
	    else if (index(message, "\a") == 0)
	        message = "\a" message "\a"
```

## 获取时间时字符串与数字的转化
在此之后，使用 split 以冒号为分割符分割时间字符串，将结果存储到数组 atime 中。以切割后的小时与分钟设置 hour 与 minute 变量，这里需要将字符串转化为数字。这部分的代码如下：
```sh	
	  # split up alarm time
	    split(ARGV[1], atime, ":")
	    hour = atime[1] + 0    # force numeric
	    minute = atime[2] + 0  # force numeric
```

## alarm.awk 中如何处理时间
alarm 的时间需要以当前时间为基准来比较，当前时间如何生成是现在需要解决的问题。查看 gawk 的 manual 发现，可以通过调用 strftime 来按照指定的格式生成时间戳，也可以通过 mktime 来生成时间戳。注意这两个函数都需要以 systime 函数的返回值为参数来制作时间戳。

alarm.awk 中使用了 getlocaltime。这个函数并不是 gawk 内置的函数，在查看 lib 目录后，我发现了它的定义如下：
```awk

	function getlocaltime(time,    ret, now, i)
	{
	    # get time once, avoids unnecessary system calls
	    now = systime()
	
	    # return date(1)-style output
	    ret = strftime("%a %b %e %H:%M:%S %Z %Y", now)
	
	    # clear out target array
	    delete time
	
	    # fill in values, force numeric values to be
	    # numeric by adding 0
	    time["second"]       = strftime("%S", now) + 0
	    time["minute"]       = strftime("%M", now) + 0
	    time["hour"]         = strftime("%H", now) + 0
	    time["althour"]      = strftime("%I", now) + 0
	    time["monthday"]     = strftime("%d", now) + 0
	    time["month"]        = strftime("%m", now) + 0
	    time["monthname"]    = strftime("%B", now)
	    time["shortmonth"]   = strftime("%b", now)
	    time["year"]         = strftime("%y", now) + 0
	    time["fullyear"]     = strftime("%Y", now) + 0
	    time["weekday"]      = strftime("%w", now) + 0
	    time["altweekday"]   = strftime("%u", now) + 0
	    time["dayname"]      = strftime("%A", now)
	    time["shortdayname"] = strftime("%a", now)
	    time["yearday"]      = strftime("%j", now) + 0
	    time["timezone"]     = strftime("%Z", now)
	    time["ampm"]         = strftime("%p", now)
	    time["weeknum"]      = strftime("%U", now) + 0
	    time["altweeknum"]   = strftime("%W", now) + 0
	
	    return ret
	}
```

getlocaltime 使用 strftime 转化 systime 生成的 Epoch 时间，将结果填充到 hash 数组 time 中，这里同样使用了将字符串转化为数字的方法。与此同时此函数也制作了类似于 date 命令输出风格的时间戳格式作为返回值。	

## 如何在其它源文件中使用 getlocaltime 函数
可以使用 @include 语句将该源文件包含进当前源文件即可。

格式如下：

	＠include filename

也可以在命令行中使用 -i 参数来指定源文件。

## 与 alarm 相关的代码逻辑
生成了当前时间之后，将用户输入的时间与当前时间做比较，根据比较的结果进行补偿，计算出需要延时的时间 naptime。如果计算出的延时时间小于等于 0，表示时间已经过去，输出错误信息，终止程序，返回值为 1 表示产生了错误。

如果 naptime 大于 0 ，使用 system 函数来调用系统中的 sleep 命令进行延时操作，延时过程中出现错误则终止程序。

延时时间结束后需要通知用户。如果用户指定了 count ，则会以 3 分钟为间隔进行 count 次提醒后自动退出。如果在 3 分钟的延时中接收到了中断信号则跳出循环，终止程序，此时的返回值为 0 表示正常终止。


## 测试示例
```sh
	[longyu@debian:21:59:11] prog $ awk -i ../lib/gettime.awk -f alarm.awk  
	usage: alarm time ['message' [count [delay]]]
		() time ::= hh:mm

	[longyu@debian:21:56:23] prog $ awk -i ../lib/gettime.awk -f alarm.awk   21:55 "time is coming!" 5  1
	time is in the past!

	[longyu@debian:21:57:01] prog $ awk -i ../lib/gettime.awk -f alarm.awk   21:58 "time is coming!" 5  1
	time is coming!
	time is coming!
	time is coming!
	time is coming!
	time is coming!
```

## 功能扩展
这个程序类似于手机上的闹钟！message 中添加的 '\a' 在我的系统上没有发出任何警示音，倒是我通过 nvlc 完成了以音乐通知的操作，我或许有几年没有使用过 nvlc 这个命令了，唯一要感谢的是 man -k vlc，没有它我就免不了百度、谷歌一下了，其实我大可不必这样做！

