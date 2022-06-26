# STT_GNU_IFUNC 与 libc.so 的 GNU 扩展类型 ABI 问题
## 前言
在 [ELF file OS ABI invalid 与 chroot 大法](https://blog.csdn.net/Longyu_wlz/article/details/109037956) 这篇文章中，我描述了 libc.so ABI 的特别之处，**它的 ABI 为 GNU 扩展格式而非 System V 格式**。在本文中研究下它如此特别的原因。

## elf.h 中的相关定义
系统头文件路径中，与这个 ABI 相关的宏在 /usr/include/elf.h 文件中定义，
相关代码摘录如下：

```c
 138 #define EI_OSABI    7       /* OS ABI identification */
 139 #define ELFOSABI_NONE       0   /* UNIX System V ABI */
 140 #define ELFOSABI_SYSV       0   /* Alias.  */
 141 #define ELFOSABI_HPUX       1   /* HP-UX */
 142 #define ELFOSABI_NETBSD     2   /* NetBSD.  */
 143 #define ELFOSABI_GNU        3   /* Object uses GNU ELF extensions.  */
 144 #define ELFOSABI_LINUX      ELFOSABI_GNU /* Compatibility alias.  */
 ......................
```
System V ABI 值为 0，UNIX ABI 值为 3，这**与 elf 头中的 magic 字段一致**。网上搜索了下，搜了半天，终于找到了一些相关的内容，看描述应该是 libc 库中使用了一种名为 **STT_GNU_IFUNC** 的扩展功能带来的副作用。

## STT_GNU_IFUNC 功能

这个 **STT_GNU_IFUNC** 中的关键词是 **IFUNC**，这里的 "I" 表示的是间接的意思，IFUNC 表示的是**间接的函数调用**。

下面是一个简单的代码示例（内容来自互联网并进行了修改）：

```c
/* Dispatching via IFUNC ELF Extension */
#include <stddef.h>
#include <stdio.h>

extern void foo(unsigned *data, size_t len);

void foo_sse42(unsigned *data, size_t len) { printf("%s\n", __FUNCTION__); }
void foo_avx2(unsigned *data, size_t len) { printf("%s\n", __FUNCTION__); }

int cpu_has_sse42(void)
{
	return 0;
}

int cpu_has_avx2(void)
{
	return 1;
}

void foo(unsigned *data, size_t len) __attribute__((ifunc ("resolve_foo")));

static void *resolve_foo(void)
{
        if (cpu_has_avx2())
                return foo_avx2;
        else if (cpu_has_sse42())
                return foo_sse42;
        else
                return foo_c;
}

int main(void)
{
	foo(NULL, 0);

	return 0;
}
```

这个程序模拟了 **foo 函数根据不同的指令集分发的过程**，实际上 IFUNC 主要的应用就是**屏蔽底层不同架构的区别**，统一的接口就能够支持不同的架构。

它并不是直接调用每个架构提供的函数，它首先通过一个 **resolver** 函数来在**运行时或第一次被调用的时候**获取当前架构提供的 func 函数的指针，并修改 got、plt 表（存疑），然后调用之，由于已经修改了 got、plt 表中的相关表项，后续的调用会直接完成，不会再使用 resolver 函数。

**上述代码中对 foo 函数的 attribute 修饰中将 resolve_foo resolver 函数绑定到 foo 函数上。**

编译此程序后查看 elf 头，有如下记录：

```bash
[longyu@debian-10:22:52:50] program-problem $ gcc ./ifunc_test.c 
[longyu@debian-10:22:52:54] program-problem $ readelf -h ./a.out
ELF 头：
  Magic：  7f 45 4c 46 02 01 01 03 00 00 00 00 00 00 00 00 
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - GNU
  ABI 版本:                          0
  类型:                              DYN (共享目标文件)
  系统架构:                          Advanced Micro Devices X86-64
  版本:                              0x1
  入口点地址：              0x1060
  程序头起点：              64 (bytes into file)
  Start of section headers:          15056 (bytes into file)
  标志：             0x0
  本头的大小：       64 (字节)
  程序头大小：       56 (字节)
  Number of program headers:         11
  节头大小：         64 (字节)
  节头数量：         30
  字符串表索引节头： 29
```
可以看到编译出的 a.out 可执行文件的 elf 头中的 **ABI 也是 GNU 格式**，**与 libc.so 中的相同**。

## glibc 中对 IFUNC 扩展功能的使用
不同的架构，其 memcpy、memset、strcmp、strcpy 等函数针对不同的架构有不同的优化实现，glibc 中就使用了 IFUNC 来在运行时确定当前架构的这些函数。

使用 readelf -s 查看 libc.so 中的符号信息，能够搜索到如下与 IFUNC 相关的内容：

```bash
[longyu@debian-10:22:01:01] program-problem $ readelf -s /lib/x86_64-linux-gnu/libc.so.6  | grep 'IFUNC'
    31: 00000000000b5c30   183 IFUNC   GLOBAL DEFAULT   13 __gettimeofday@@GLIBC_2.2.5
    71: 00000000000a32e0    71 IFUNC   WEAK   DEFAULT   13 wmemset@@GLIBC_2.2.5
    98: 0000000000087c40    46 IFUNC   GLOBAL DEFAULT   13 strcpy@@GLIBC_2.2.5
   109: 000000000008a890    42 IFUNC   GLOBAL DEFAULT   13 __rawmemchr@@GLIBC_2.2.5
   122: 00000000000a3260    93 IFUNC   GLOBAL DEFAULT   13 wmemcmp@@GLIBC_2.2.5
   186: 0000000000088100    81 IFUNC   GLOBAL DEFAULT   13 strncmp@@GLIBC_2.2.5
   233: 0000000000088190    42 IFUNC   GLOBAL DEFAULT   13 strrchr@@GLIBC_2.2.5
   327: 0000000000089220    46 IFUNC   WEAK   DEFAULT   13 stpncpy@@GLIBC_2.2.5
   391: 0000000000107af0   194 IFUNC   GLOBAL DEFAULT   13 __mempcpy_chk@@GLIBC_2.3.4
   421: 0000000000088160    46 IFUNC   GLOBAL DEFAULT   13 strncpy@@GLIBC_2.2.5
   463: 00000000000b5b40   183 IFUNC   GLOBAL DEFAULT   13 time@@GLIBC_2.2.5
   558: 0000000000088ee0    42 IFUNC   GLOBAL DEFAULT   13 memchr@@GLIBC_2.2.5
   ............
   ```
可以看到这里的函数除了上面提到的 memcpy 等等，还多了一些函数，正是因为这些函数使用了 **IFUNC** 功能，**libc.so 的 ABI 成为了 GNU 格式**，**而非标准的 System V 格式**。

## 如何确定当前编译环境是否支持 IFUNC？

glibc 中的 configure 文件使用如下代码确定系统是否支持 IFUNC。

```ｃ
  cat > conftest.c <<EOF
extern int func (int);
int used_func (int a)
{
  return a;
}
static void *resolver ()
{
  return &used_func;
}
extern __typeof (func) func __attribute__ ((ifunc ("resolver")));
EOF
libc_cv_gcc_indirect_function=no
if ${CC-cc} -c conftest.c -o conftest.o 1>&5 \
   2>&5 ; then
  if $READELF -s conftest.o | grep IFUNC >/dev/null 2>&5; then
    libc_cv_gcc_indirect_function=yes
  fi
fi
rm -f conftest*
```
在支持 IFUNC 的系统，readelf 查看编译生成的 conftest.o 的 symbols 将能够看到与 IFUNC 相关的内容，这就是上述过程依赖的原理。

## IFUNC 从什么版本开始支持?
从参考链接的某篇文章中找到了与这个问题相关的信息，摘录如下：


>The “GNU indirect function” feature requires support in the assembler, linker and loader, which is found in Binutils version 2.20 and later.

这里说明在 Binutils 2.20 之后的版本才支持这个扩展功能，由于我在网上没有找到 gnu 的官方说明，暂且就认为就是这个版本吧！

## 参考链接

https://jasoncc.github.io/gnu_gcc_glibc/gnu-ifunc.html

https://www.evanjones.ca/portable-linux-binaries.html

https://stackoverflow.com/questions/2764533/how-do-i-compile-on-linux-to-share-with-all-distributions

http://www.sco.com/developers/gabi/latest/contents.html

https://sites.google.com/site/x32abi/documents



