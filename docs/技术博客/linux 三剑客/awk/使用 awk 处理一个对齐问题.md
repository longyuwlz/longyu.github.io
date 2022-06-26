# 使用 awk 处理一个对齐问题
## 问题描述
前天，同事在编写时钟驱动时，需要对头文件中定义的宏的最后一列进行对齐，问我如何使用 sed 来完成这个功能。我一时想不到处理方法，最后决定使用 awk 来解决这个问题。

## 生成模拟数据
为了模拟数据，我使用如下 awk 脚本生成源数据。
```awk
	BEGIN {	
		result = 1
		for (i = 0; i < 100; i++) {
			result += i * 10
	
			if ( i % 2 ) {
				printf("#define TEST%d    (BASE + %d)\n", result, result) 	
			} else {
				printf("#define TEST%d    (BASE + %d)\n", i, result)
			}
		}
		exit 
	}
```	
执行上述脚本，得到的输出的部分内容如下：
```c	
	#define TEST0    (BASE + 1)
	#define TEST11    (BASE + 11)
	#define TEST2    (BASE + 31)
	#define TEST61    (BASE + 61)
	#define TEST4    (BASE + 101)
	#define TEST151    (BASE + 151)
	#define TEST6    (BASE + 211)
```	

## 问题分析
宏的内容需要对齐，这样看上去更加美观。仔细分析上面的内容，很容易发现宏名与内容之间统一使用四个空格进行间隔，只是由于宏名的长度不同，导致展开内容不对齐。

## 解决方案
解决这个问题的核心在于使用宏名长度来生成宏名与宏内容之间的空格，如下 awk 脚本可以轻松解决这个问题。
```awk
	BEGIN {
			FS=" {2,}" 
			if (linelen == "") {
				linelen = 70 
			}	
	}
		
	function calculate_space_num(string, total_len,     len)
	{
		if (string == "" || total_len <= 0) {
			print "invalid parameter for calculate_space_num\n" > "/dev/stderr"
			return 	
		}	
		
		len = length(string)
		if (total_len < len) {
			print "len is less than string length\n" > "/dev/stderr"
			return 	
		}
	
		return total_len - length(string);
	}
	
	function output_space(num,     i)
	{
		if (num <= 0) {
			return ""
		}	
		
		result = ""	
		for (i = 0; i < num; i++) {
			result = result " "	
		}
		return result
	}
	
	{
		if ($0 ~ /^#define/) {
			len = calculate_space_num($1, linelen)			
			printf("%s%s%s\n", $1, output_space(len), $2)
		} else {
			print $0
		}
	}
```

使用示例如下：
```sh
	[longyu@debian:05:50:15] awk $ gawk -f make_macro.awk | gawk -v linelen=20 -f format_macro.awk  2>/dev/null
	#define TEST0       (BASE + 1)
	#define TEST11      (BASE + 11)
	#define TEST2       (BASE + 31)
	#define TEST61      (BASE + 61)
	#define TEST4       (BASE + 101)
	#define TEST151     (BASE + 151)
	#define TEST6       (BASE + 211)
	#define TEST281     (BASE + 281)
	#define TEST8       (BASE + 361)
	#define TEST451     (BASE + 451)
	#define TEST10      (BASE + 551)
	#define TEST661     (BASE + 661)
	#define TEST12      (BASE + 781)
    ................................
```

