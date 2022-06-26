# 问题案例：串口程序被 dmesg 信息干扰与 quiet cmdline 参数
## 问题描述
我们的设备在生产后需要通过串口进行一些基础的配置，在测试过程中发现，当在串口配置的时候会有 dmesg 信息不断打印到串口，影响了正常的配置过程。

## 解决方案
这个问题可以通过在 grub 配置文件中，内核命令行参数中添加 quiet 参数来解决，quiet 参数会阻止大部分的 dmesg 打印，测试能够解决问题。

一个示例如下：
```c
        linux   /boot/vmlinuz-5.0.0+ root=UUID=180490b0-df1c-4632-8727-7824e5d2a8c6 ro  quiet splash resume=UUID=d282ea12-b763-4b11-bfad-a6506634ef72
```
这个示例是我从 debian10 系统的 grub.cfg 文件中拷贝的，可以看到这里就添加了 quiet 参数。

下文中我分析分析添加了 quiet 参数其背后的一些猫腻。

## quiet 内核 cmdline 参数
grub 配置中内核 cmdline 开启了 quiet 后进入了系统后查看到的 printk 打印级别如下：

```bash
longyu@debian:~$ cat /proc/sys/kernel/printk
4       4       1       7
```

grub 配置中内核 cmdline 关闭 quiet 后进入系统，再次查看 printk 打印级别，获取到了如下信息：

```bash
longyu@debian:~$ cat /proc/sys/kernel/printk
7       4       1       7
```
可以看到 quiet 实际作用点在于 printk 的默认打印级别，当设定了这个参数后，打印级别提高，这样大部分的打印就不会打印到串口了。

## printk 的打印级别
man 2 syslog 得到了下面这些与 printk 打印级别相关的信息：

```manual
   /proc/sys/kernel/printk
       /proc/sys/kernel/printk  is  a writable file containing four integer values that influence kernel printk() behavior when printing or logging error messages.  The
       four values are:

       console_loglevel
              Only messages with a log level lower than this value will be printed to the console.  The default value for this field  is  DEFAULT_CONSOLE_LOGLEVEL  (7),
              but  it  is set to 4 if the kernel command line contains the word "quiet", 10 if the kernel command line contains the word "debug", and to 15 in case of a
              kernel fault (the 10 and 15 are just silly, and equivalent to 8).  The value of console_loglevel can be set (to a value in the range 1–8)  by  a  syslog()
              call with a type of 8.

       default_message_loglevel
              This  value  will be used as the log level for printk() messages that do not have an explicit level.  Up to and including Linux 2.6.38, the hard-coded de‐
              fault value for this field was 4 (KERN_WARNING); since Linux 2.6.39, the default value is a defined by the kernel configuration option CONFIG_DEFAULT_MES‐
              SAGE_LOGLEVEL, which defaults to 4.

       minimum_console_loglevel
              The value in this field is the minimum value to which console_loglevel can be set.

       default_console_loglevel
              This is the default value for console_loglevel.
```
上面的帮助信息解释了 **/proc/sys/kernel/printk** 不同字段的含义，也说明了 quiet 参数将会让 printk 的 console_loglevel 变为 4，如果你需要更详细的信息，与 quiet 参数类似，可以设定一个 **debug 参数**，debug 参数将会让 printk 的 console_loglevel 变为 10。

## quiet 参数背后的内核行为
init/main.c 中与 quiet 参数相关的代码摘录如下：

```c 
static int __init quiet_kernel(char *str)
{
	console_loglevel = CONSOLE_LOGLEVEL_QUIET;
	return 0;
}

early_param("quiet", quiet_kernel);
```
当内核 cmdline 中设定了 quiet 参数后，quiet_kernel 函数会被调用，这个函数会将 console_loglevel 设定为 4！

console_loglevel 最终是在 kernel/printk/printk.c 中被使用到的，在 syslog 中会判断 console_level 的值来确定是否打印到 console，对 syslog 的描述后面单独写一篇博客，这里直接跳过。

## 内核 cmdline 参数定义与解析过程
上面的描述针对的是 quiet 参数解析之后的流程，下面我以 quiet 参数为例，描述下 cmdline 的定义与解析过程。

几个非常重要的结构体、宏定义先贴到下面：

```c
struct obs_kernel_param {
	const char *str;
	int (*setup_func)(char *);
	int early;
};

#define __setup_param(str, unique_id, fn, early)			\
	static const char __setup_str_##unique_id[] __initconst		\
		__aligned(1) = str; 					\
	static struct obs_kernel_param __setup_##unique_id		\
		__used __section(.init.setup)				\
		__attribute__((aligned((sizeof(long)))))		\
		= { __setup_str_##unique_id, fn, early }

#define early_param(str, fn)						\
	__setup_param(str, fn, fn, 1)
```
对于 quiet 参数来说，使用 __setup_param 定义后，会创建如下两个重要的结构：

1. const char __setup_str_quiet_kernel[] 

	其值为 "quiet"，存放在 **.init.rodata section** 中并以 1 字节为单位对齐。

2. struct obs_kernel_param _setup_quiet_kernel  
	
	此结构体以 sizeof(long) 字节对齐并存放到 **.init_setup section** 中，其内容如下：
	
```c
	struct obs_kernel_param _setup_quiet_kernel = {
		.str = "__setup_str_quiet_kernel",
		.setup_func = quiet_kernel,
		.early = 1,
	}；
```
注意这里 obs_kernel_param 中的 early 字段，内核中通过这个字段的值将 param 划分为两个类别，quiet cmd 对应 early 为 1 这一类，本文中我只描述 early 为 1 这一类内核 cmdline 背后的原理。

在继续阅读前，最好先阅读一下下面这两篇博客，掌握一些基础知识。

[rt-thread 内核初始化原理分析](https://blog.csdn.net/Longyu_wlz/article/details/82975871)

[gcc x64 环境中默认链接脚本分析之链接器基础命令功能介绍](https://blog.csdn.net/Longyu_wlz/article/details/109128417)

## 需要解决的问题
在软件设计中常常需要对现有的场景进行抽象，在这个情景中，cmdline 中的不同 cmd 的解析与设定过程就是需要抽象的内容。

cmd 的解析过程可以按照某种约定来抽象，但是每一个 cmd 的设定过程又该怎么样搞呢？**该如何将这些不同的设定过程统一呢？如果未来要添加新的 cmd，能否做到不修改框架就能够扩展呢？**

## 使用 section 屏蔽 cmdline 中不同 cmd 的解析与设定过程的差异
每个 cmd 的不同设定过程可以通过**函数指针**来抽象，每一个 cmd 实现自己的函数，然后通过函数指针注册，框架只需要**通过函数指针来调用**就能够完成每一个 cmd 的设定过程。

如果未来要添加新的 cmd，一个最简单的做法是实现相应的函数，并在适当的位置添加使用代码，这样的做法意味着**每添加一个新的 cmd 都要修改框架代码**，这是**不可取**的。

我们可以换一个角度考虑这个问题，内核在初始化过程中需要保证的是每一个设定的 cmd 被解析并且其绑定的代码逻辑被执行，并**不需要保证不同 cmd 的执行顺序**。

可以抽象一个 cmd 的结构体，这个结构体**唯一标识每个 cmd 并以函数为单位绑定到具体的设定代码上**，每一个不同的 cmd 都实例化一个这样的结构体，不同的 cmd 结构体之间通过链表链起来，示例内容如下：

```
			| quiet cmd unique id |            | debug cmd unique id |
head --->	| quiet cmd function  |  --------> | debug cmd function  | -----> nil
			| .....               |            | ......              |
```
有了这个数据结构，只需要获取到 head 指针，然后遍历链表与解析到的 cmd 进行匹配，匹配到了则调用相关的 cmd function 设定。

这里使用了链表将不同的 cmd 的结构体组织起来了，对这个行为进一步抽象，可以发现它有如下几个元素：

1. 标识数据单元起始位置
2. 每个数据单元之间建立连接
3. 标识数据单元结束位置

这里使用链表带来了一个问题——**每次加入一个新的 cmd 实例，都需要向链表中注册**，添加注册代码又会涉及框架的修改，通过构造函数的方式注册 cmd 实例也不符合这里的场景，这个方案不可取。

写到这里我们可以思考一下，**添加注册代码的根本目的是什么**？

其实就是为了将不同的 cmd 结构体组织起来，也就是所谓的**建立每个数据单元之间的连接**，更进一步讲用什么数据结构并不重要，重要的是我们要能够获取到每一个 cmd 结构体。

按照这个思路，也许我们可以创建一个结构体数组，不同的 cmd 结构体对应结构体数组中的不同下标，这时 cmd 结构体也被组织起来了。

其组织形式如下：

```
| quiet cmd unique id | debug cmd unique id |
| quiet cmd function  | debug cmd function  |
| .....               |  ......             |
```
这种方式下，添加每一个 cmd 结构体到数组中的代码也要涉及对框架的修改，这个方案也不可取。

尽管使用数组实现的方案也不可取，但是它是一个新的方向。

链表中不同数据结构的关联是在**运行时**建立的，而数组中不同数据结构之间的关联是在**编译的时候**确定的（使用动态数组的方式除外）。

数组的特征在于数据的顺序存储，**数据单元通过空间上的连续分布建立关联**。我们这个场景里并不关注每个 cmd 对应的数组下标，只要确保有一个占坑就行。

总结一下上面的描述，能够得出某种技术需要达成的三个关键点：

1. 编译时确定
2. 顺序存储
3. 只关注存在而非存在的位置

结合这三个点来思考，并加上对编译与链接过程的知识，可以使用如下方式来解决这里的问题：

1. 将所有的 cmd 结构体放到同一个 section 中，如 .init.setup
2. 修改链接脚本，将不同 .o 中的相关 section 输出到连续的存储空间中
3. 修改链接脚本，在这个连续的存储空间前后设置标号，xxx_start 指向起始位置，xxx_end 指向结束位置

当新的 cmd 结构体需要添加时，只需要**使用 gcc 的特性来将 cmd 结构体放到同一个 section 中**，这样就完成了扩展的过程，完全不需要修改框架！

框架中只需要通过**访问 xxx_start 与 xxx_end 标号的地址**，然后**以 cmd 结构体为大小遍历并匹配 cmd 就能够实现需要的功能**。

## 内核中的实现代码分析
在 **/arch/x86/kernel/vmlinux.lds** 链接脚本中有下面的代码：
 
```lds
__setup_start = .; KEEP(*(.init.setup)) __setup_end = .;
```
KEEP(*(.init.setup)) 将所有 .o 中的 .init.setup section 布局到连续的空间中，__setup_start 与 __setup_end 标号确定这个连续空间的起始与终止位置。

以 x86 架构为例，内核初始化中 cmdline 参数中 early cmd 解析与执行过程调用的函数如下：

```
setup_arch call
		parse_early_param call
			parse_early_options call
				parse_args call
					parse_one call
						do_early_param
```

parse_early_options 函数代码如下：
```c
void __init parse_early_options(char *cmdline)
{
	parse_args("early options", cmdline, NULL, 0, 0, 0, NULL,
		   do_early_param);
}
```
在上面的调用流程中 parse_args 负责依次解析每一个 cmd 并调用 parse_one 函数来完成相应的设定，parse_one 函数的原型如下：

```c
static int parse_one(char *param,
		     char *val,
		     const char *doing,
		     const struct kernel_param *params,
		     unsigned num_params,
		     s16 min_level,
		     s16 max_level,
		     void *arg,
		     int (*handle_unknown)(char *param, char *val,
				     const char *doing, void *arg));
```
在这个情景中，parse_one 函数的 params 为空，且 num_params 为 0，实际上生效的是 do_early_param，其代码如下：
```c
475 /* Check for early params. */
476 static int __init do_early_param(char *param, char *val)                                                                                                                 
477 {
478     struct obs_kernel_param *p;
479 
480     for (p = __setup_start; p < __setup_end; p++) {
481         if ((p->early && strcmp(param, p->str) == 0) ||
482             (strcmp(param, "console") == 0 &&
483              strcmp(p->str, "earlycon") == 0)
484         ) {
485             if (p->setup_func(val) != 0)
486                 printk(KERN_WARNING
487                        "Malformed early option '%s'\n", param);
488         }
489     }
490     /* We accept everything at this stage. */
491     return 0;
492 }
```
do_early_params 函数的第一个参数是上层传入的 cmd 的唯一标识，然后 do_early_params 函数使用这个标识在 **__setup_start** 与 **__setup_end** 划定的区域内**遍历每一个 cmd 实例匹配 cmd**，匹配到了则调用相应的 **setup_func** 函数来执行。

在这一套框架下添加一个 cmd 参数，不需要修改框架代码！有很好的扩展性。

## 总结
本文从一个具体的问题入手，不断的向下挖掘，重点描述了内核 cmdline 解析与执行框架如何通过抽象以及其它的技术屏蔽不同 cmd 的差异，达成在实现基础功能的同时，也有非常好的扩展能力的目标。

本文通过如下问题进行推进：

1. 如何让 dmesg 信息不输出到串口？
2. 设定了 quiet 参数前后 printk 打印级别的变化？
3. printk 打印级别不同字段的含义是什么？
4. 设定 quiet 参数背后的内核行为是什么？
5. 如何屏蔽 cmdline 中不同 cmd 的解析与设定过程的差异，并提供很好的扩展性？
6. linux 内核中 quiet 参数代表的 cmdline 参数解析与执行框架是如何实现的？

核心的技术点是将初始化过程的注册函数放到一个 section 中，遍历这个 section 来完成注册过程，这个技术应用的相当广泛！

