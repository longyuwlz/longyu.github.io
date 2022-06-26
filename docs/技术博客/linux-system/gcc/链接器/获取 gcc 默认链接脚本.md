# 获取 gcc 默认链接脚本
前几个月研究了下内核模块的加载过程，发现在这一过程中有很多针对 **elf 可执行文件**的操作代码，如 elf **头的校验**，elf **代码段与数据段的加载**与内存中**重新布局**等等过程，最近在研究 **exec** 系统调用的实现时也看到了类似的过程，诸如 **load_binary、load_shlib** 等函数指针的实现代码。

以上两个例子足以说明 elf 格式的**重要性**，基于这样的情况，我开一个新的专栏，着重研究下 elf 格式文件，同时也将内核中与 elf 解析等操作相关的代码进行分析，以期清除**程序的加载运行**、**内核模块的加载运行**其中的的**部分迷团**！

## 第一弹：获取 gcc 默认链接脚本
###  gcc linker 手册中翻译对链接脚本与其默认值的描述信息

**链接脚本**的主要目标是描述**如何将输入文件中的 section 映射到输出文件中**，并且控制**输出文件的内存布局**。大多数链接脚本做的事情都不超过这个范畴。然而，当必要的时候，链接脚本能够**指导链接器执行其它控制命令**。

链接器需要使用一个**链接脚本**。如果你没有自己指定一个，链接器会使用默认的已经被**编译到链接器可执行程序**中的**默认链接脚本**。你可以使用 **'--verbose' 命令行参数**来输出默认的链接脚本。

一些命令行参数例如 '-r' 或 '-N' 将会影响默认的链接脚本。

你可以使用 **-T** 命令行选项指定自己的链接脚本，当你指定了 **-T** 选项后，默认的链接脚本将会被你指定的链接脚本代替。

## 如何获取 linux 中默认的链接脚本

手册中描述添加 **--verbose 选项** 就能够**输出默认链接脚本内容**，我进行了如下尝试：

1. 使用 gcc 编译的时候指定 --verbose 没有找到链接脚本的内容。
2. 搜索了下发现这个参数要传递给 ld 命令，单独运行 ld 命令指定 --verbose 时由于缺少一些必要的参数链接报错。
3.  最后确认可以通过 gcc 的 -Wl 选项将 --verbose 参数传递给 linker 来获取。

示例命令如下：

```c
	gcc hello.c -Wl,--verbose
```

这里通过 -Wl 指定向链接器传递 --verbose 参数。

## 默认链接脚本的部分内容
获取到的默认链接脚本的部分内容截取如下：

```link script
OUTPUT_FORMAT("elf64-x86-64", "elf64-x86-64",
	      "elf64-x86-64")
OUTPUT_ARCH(i386:x86-64)
ENTRY(_start)
SEARCH_DIR("=/usr/local/lib/x86_64-linux-gnu"); SEARCH_DIR("=/lib/x86_64-linux-gnu"); SEARCH_DIR("=/usr/lib/x86_64-linux-gnu"); SEARCH_DIR("=/usr/lib/x86_64-linux-gnu64"); SEARCH_DIR("=/usr/local/lib64"); SEARCH_DIR("=/lib64"); SEARCH_DIR("=/usr/lib64"); SEARCH_DIR("=/usr/local/lib"); SEARCH_DIR("=/lib"); SEARCH_DIR("=/usr/lib"); SEARCH_DIR("=/usr/x86_64-linux-gnu/lib64"); SEARCH_DIR("=/usr/x86_64-linux-gnu/lib");
SECTIONS
{
  /* Read-only sections, merged into text segment: */
  PROVIDE (__executable_start = SEGMENT_START("text-segment", 0)); . = SEGMENT_START("text-segment", 0) + SIZEOF_HEADERS;
  .interp         : { *(.interp) }
  .note.gnu.build-id : { *(.note.gnu.build-id) }
  .hash           : { *(.hash) }
  .gnu.hash       : { *(.gnu.hash) }
  .dynsym         : { *(.dynsym) }
  .dynstr         : { *(.dynstr) }
  .gnu.version    : { *(.gnu.version) }
  .gnu.version_d  : { *(.gnu.version_d) }
  .gnu.version_r  : { *(.gnu.version_r) }
  ..............
```
这个链接脚本中有我曾经思考的一些问题的答案，诸如 constructor 等等，在后续文章中我会对这个链接脚本进行深入的分析。


