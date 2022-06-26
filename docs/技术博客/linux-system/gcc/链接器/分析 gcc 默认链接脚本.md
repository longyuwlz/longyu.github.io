# 分析 gcc 默认链接脚本
## 前言
在 [获取 gcc 默认链接脚本] 这篇文章中，我描述了如何传递 --verbose 给链接器以获取 gcc 使用的默认链接脚本内容的过程，执行 ```gcc hello.c -Wl,--verbose```就能够打印出默认的链接脚本内容。

获取到默认链接脚本的内容只是第一步，有了这个**输入**就能够对链接脚本的内容进行分析，这就是**本文的主要内容**。

由于默认的链接脚本内容过长，我不贴完整的内容，**只针对重要的研究对象**贴上相关的代码。

## 使用到的一些重要的链接脚本命令基础
在阅读下面的内容前，最好先阅读 [gcc x64 环境中默认链接脚本分析之链接器基础命令功能介绍](https://blog.csdn.net/Longyu_wlz/article/details/109128417) 这篇博客来对默认链接脚本中使用到的链接脚本基础命令的功能进行学习。
## ENTRY 标号
相关内容请阅读 [gcc x64 环境中默认链接脚本分析之 ENTRY 标号与 _start 函数](https://blog.csdn.net/Longyu_wlz/article/details/109128381) 这篇博文。

## SEARCH_DIR 配置
**SEARCH_DIR** 命令会向 ld **查找**库的**路径列表**中**添加**一个路径。使用 **SEARCH_DIR(path)** 与使用 **'-L path'** 命令行参数类似。如果这两者都使用到了，链接器将会搜索这两种方式指定的**所有**路径。 需要注意的是链接器将会**优先搜索命令行**中指定的路径。

默认链接脚本中的 SEARCH_DIR 的部分设置内容截取如下：

>SEARCH_DIR("=/usr/local/lib/x86_64-linux-gnu"); SEARCH_DIR("=/lib/x86_64-linux-gnu");

注意这里在路径前添加了一个等号，手册中只描述了路径，并没有描述要添加一个等号。

## 默认链接脚本 SECTION 中的内容
默认链接脚本 SECTION 中的第一行内容如下：
```c
  /* Read-only sections, merged into text segment: */
  PROVIDE (__executable_start = SEGMENT_START("text-segment", 0)); . = SEGMENT_START("text-segment", 0) + SIZEOF_HEADERS;
```
这里首先用 PROVIDE 命令设定了一个**标号**，并设置**标号的地址**为 text-segment 段的基地址，然后将文件从 text-segment 段的基地址向下扩展输出文件头部大小的空间。

这里 SEGMENT_START 的第二个参数为默认值，当链接脚本中找不到 text-segment 基地址时，SEGMENT_START 函数将会返回第二个参数指定的默认值，这里就是 0。

## .interp section
相关的代码如下：

>.interp         : { *(.interp) }

.interp 对我来说并不陌生，它存储的是动态库加载器的路径，这个 section 是**链接器在添加的一个 sectio**n。

我在 [修改 elf 文件中 interp 的两种方法](https://blog.csdn.net/Longyu_wlz/article/details/107829938) 与 [低版本 libc 中运行高本版 libc 库链接的程序](https://blog.csdn.net/Longyu_wlz/article/details/108023117) 这两篇程序中都描述过对其内容的修改。

在动态链接的程序 exec 时，需要使用 .interp 中指定的**动态库加载器路径指向的程序**来**加载运行**。

## init 段描述代码
  ```link
  .init           :
  {
    KEEP (*(SORT_NONE(.init)))
  }
```
init 段使用了 KEEP 命令来阻止链接器回收所在的 section，并且调用 SORT_NONE 对所有输入文件中的 .init 段进行排序。

在 libc 库的 **crti.S、crtn.S** 中有定义 init 段，用户程序中较少看到 init 段的定义内容。

## text 段描述代码
```link
  .text           :
  {
    *(.text.unlikely .text.*_unlikely .text.unlikely.*)
    *(.text.exit .text.exit.*)
    *(.text.startup .text.startup.*)
    *(.text.hot .text.hot.*)
    *(.text .stub .text.* .gnu.linkonce.t.*)
    /* .gnu.warning sections are handled specially by elf32.em.  */
    *(.gnu.warning)
  }
```

text 段中存放了所有输入文件中的代码段，这里 .**gnu.linkonce.t.* section** 需要注意。这里的 **.gnu.linkonce** 用于在链接时遇到多个以 **.gnu.linkonce** 开始的相同名字的 section 时，**只保留一个拷贝。**

更详细的信息请访问 [ Linkonce vs comdat](https://gcc.gnu.org/legacy-ml/gcc/2003-09/msg00984.html).
## fini 段描述代码
```link
  .fini           :
  {
    KEEP (*(SORT_NONE(.fini)))
  }
```
fini 段与 init 段功能相反，却都使用了 KEEP 命令与 SORT_NONE 命令。同样在 libc 库的 **crti.S、crtn.S** 中有定义 fini 段，用户程序中较少看到 fini 段的定义内容。

## text 段结束的标号设定
```link
  PROVIDE (__etext = .);
  PROVIDE (_etext = .);
  PROVIDE (etext = .);
```
text 段在 .fini 段之后结束，在结束位置使用 PROVIDE 命令设定了三个标号，这三个标号在上文的引用链接中已经描述了，这里就不赘述了。
## rodata 段脚本
```link
  .rodata         : { *(.rodata .rodata.* .gnu.linkonce.r.*) }
```
rodata 段放一些只读数据的内容，如字符串常量等等，代码非常简单直接跳过。

## preinit_array、init_array、fini_array 段脚本
相关内容描述请阅读 [gcc x64 环境中默认链接脚本分析之 preinit_array、constructor、destructor 相关分析](https://blog.csdn.net/Longyu_wlz/article/details/109128395) 这篇博文。
## ctors 与 dtors 段脚本
```link
 .ctors          :
  {
	..............
    KEEP (*crtbegin.o(.ctors))
    KEEP (*crtbegin?.o(.ctors))
	..............
    KEEP (*(EXCLUDE_FILE (*crtend.o *crtend?.o ) .ctors))
    KEEP (*(SORT(.ctors.*)))
    KEEP (*(.ctors))
  }

  .dtors          :
  {
    KEEP (*crtbegin.o(.dtors))
    KEEP (*crtbegin?.o(.dtors))
    KEEP (*(EXCLUDE_FILE (*crtend.o *crtend?.o ) .dtors))
    KEEP (*(SORT(.dtors.*)))
    KEEP (*(.dtors))
  }
```

ctors 与 dtors 段描述代码设定了构造函数与析构函数的布局，链接脚本中要对其进行**排序以保证按照正确的顺序执行**。

由于 gcc 使用 crtbegin.o 来**查找第一个构造函数的位**置，因此 ctors 段描述代码中将 crtbegin.o 中的 ctors 段放在输出文件的 ctors段的**起始位置**。

同时 crtend.o 中的 ctor 函数需要**最后执行**，因此先使用 EXCLUDE_FILE 来输出**其它文件中的 ctors 段内容**，dtors 段描述代码中也有类似的执行逻辑。

这里涉及的 **crtbegin.o 和 crtend.o** 两个文件在 libc 库中**没有找到**相关的代码，网上搜索发现这两个文件是 libc++ 库中的，用于配合 glibc 实现 C++ 的全局构造和析构功能。

## data 段脚本
```link
  .data           :
  {
    *(.data .data.* .gnu.linkonce.d.*)
    SORT(CONSTRUCTORS)
  }
```
data 段也相当简单，**CONSTRUCTORS** 命令却比表面上看上去更复杂。它用于 a.out 格式文件链接时，链接器使用的特殊构造集合以支持 C++ 全局构造函数与析构函数，更详细的信息可以阅读 gnu Linker 手册中 3.6.6 小节的内容。

## bss 段脚本
```link
  .bss            :
  {
   *(.dynbss)
   *(.bss .bss.* .gnu.linkonce.b.*)
   *(COMMON)
   /* Align here to ensure that the .bss section occupies space up to
      _end.  Align after .bss to ensure correct alignment even if the
      .bss section disappears because there are no input sections.
      FIXME: Why do we need it? When there is no .bss section, we don't
      pad the .data section.  */
   . = ALIGN(. != 0 ? 64 / 8 : 1);
  }
```
这里 COMMON section 值得研究，它是一个特殊的普通符号的概念，因为在许多对象文件格式中普通符号没有一个特定的输入 section。它一般被放在 bss 段中（摘自 gnu linker 手册）。

## debug 信息相关 section 段脚本
```link
  .debug_info     0 : { *(.debug_info .gnu.linkonce.wi.*) }
  .debug_abbrev   0 : { *(.debug_abbrev) }
  .debug_line     0 : { *(.debug_line .debug_line.* .debug_line_end ) }
  .debug_frame    0 : { *(.debug_frame) }
  .debug_str      0 : { *(.debug_str) }
	.............
```
debug 信息在 gcc 指定了 -g 参数后会生成，gdb 调试程序时就会尝试获取程序中的 debug 信息。

我指定 -g 参数编译一个简单的程序，查看 map 文件得到了如下信息：

```c
407 
408 .debug_aranges  0x0000000000000000       0x30
409  *(.debug_aranges)
410  .debug_aranges
411                 0x0000000000000000       0x30 /tmp/cc9Ez1ky.o
412 
413 .debug_pubnames
414  *(.debug_pubnames)
415 
416 .debug_info     0x0000000000000000      0x31b
417  *(.debug_info .gnu.linkonce.wi.*)
418  .debug_info    0x0000000000000000      0x31b /tmp/cc9Ez1ky.o
419 
420 .debug_abbrev   0x0000000000000000       0xe8
421  *(.debug_abbrev)
422  .debug_abbrev  0x0000000000000000       0xe8 /tmp/cc9Ez1ky.o
423 
424 .debug_line     0x0000000000000000      0x11c
425  *(.debug_line .debug_line.* .debug_line_end)
426  .debug_line    0x0000000000000000      0x11c /tmp/cc9Ez1ky.o
427 
428 .debug_frame
429  *(.debug_frame)
430 
431 .debug_str      0x0000000000000000      0x269
432  *(.debug_str)
433  .debug_str     0x0000000000000000      0x269 /tmp/cc9Ez1ky.o
```
查看 debug_str section 的内容，获取到的信息部分内容截取如下：

```bash
[longyu@debian-10:22:43:16] program-problem $ readelf -p .debug_str ./a.out

String dump of section '.debug_str':
  [     0]  _IO_buf_end
  [     c]  _old_offset
  [    18]  sys_nerr
  [    21]  _IO_save_end
  [    2e]  short int
  [    38]  size_t
  [    3f]  _IO_write_ptr
  [    4d]  _flags
  [    54]  _IO_buf_base
  [    61]  _markers
  [    6a]  _IO_read_end
  [    77]  /home/longyu/problem_and_solution/program-problem```
```
这里能够看到源代码的路径与一些地址及数据大小的字符串信息。

查看 debug_line section 内容获取到的信息部分截取如下：

```bash
[longyu@debian-10:22:43:36] program-problem $ readelf -p .debug_line ./a.out

String dump of section '.debug_line':
  [    1b]  .
  [    1d]  /usr/lib/gcc/x86_64-linux-gnu/8/include
  [    45]  /usr/include/x86_64-linux-gnu/bits
  [    68]  /usr/include/x86_64-linux-gnu/bits/types
  [    91]  /usr/include
  [    9f]  hello.c
```
这里能够看到 hello.c 源文件行信息的记录，实际上在 gdb 中输入 l 命令查看源码，就是通过访问 debug 相关 section 中存储的源文件路径中的源文件内容完成的。
 
## map 文件与 lst 文件
查看 elf 格式中 section 布局非常方便的方法是阅读 map 文件，可以通过 gcc 向链接器发送 -Map=output.map 来输出 map 文件到 output.map 中，通过阅读 output.map 就能够查看程序中 section 的布局。

也可以反汇编生成更详细的 lst 文件格式来查看，生成 lst 文件格式的方法可以参考 [嵌入式中 lst 文件的创建与调试价值](https://blog.csdn.net/Longyu_wlz/article/details/84891850) 这篇文章来操作。

## 参考书籍
gnu《linker》官方手册

