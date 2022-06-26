# 动态链接 lazy binding 的原理与 GOT 表的保留表项
## 前言
我最近对动态库的实现非常好奇，自己琢磨了半天没有看出什么名堂，就想着能不
能找到一本讲相关内容的书籍，网上搜索了下发现确实有这样的一本书，书名为
**《Linux 二进制分析》**。

动态库的工作原理从这本书中能够找到解答，在本文中，我将使用下面这个 hello 
程序来验证。


```ｃ
#include <stdio.h>

int main(int argc, char* argv[])
{
	printf("hello world\n");
	return 0;
}
```

## 第一个问题：printf 函数调用哪去了？

将上述程序保存为 hello.c 后执行 gcc hello.c -o hello 进行编译，编译后反汇编
程序，发现没有对 printf 函数的调用，只有对 puts 函数的调用。

重新审视上面的代码，我发现可能是 printf 函数调用被优化为 puts 函数了，这里
我打印 hello world 字符串不需要解析参数，功能与 puts 函数一样。

将上述 printf 代码改为 printf("hello world!%d\n", 1); 后重新编译，这次没有被
优化。

进一步的测试发现，如下调用 printf 函数的代码也将会被优化为 puts 函数调用。

```c
printf("%s\n", hello world\n); 
```
这算是一个经验。

## 第二个问题：lazy binding 的原理

**动态库使用了一种 lazy binding 的机制，真实的函数地址的绑定过程由编译时
推迟到运行后的第一次调用时，使用动态库中的符号的情况下，对符号的第一次
引用与第二次引用有不同的行为，第一次引用会执行绑定操作，第二次引用则
直接跳转执行。**


这里有一个问题—— lazy binding 有怎样的过程呢？

## 从 gdb 着手

执行 gcc -g -no-pie hello.c -o hello 编译上述程序，编译后使用 gdb 运行。

让程序执行到调用 puts@plt 代码的如下指令处：

```bash
=> 0x0000000000401138 <+22>:	callq  0x401030 <puts@plt>
```

执行 si 单步运行程序，进入到 puts@plt 函数中，反汇编 puts@plt 函数：

```bash
(gdb) si
0x0000000000401030 in puts@plt ()
(gdb) disass
Dump of assembler code for function puts@plt:
=> 0x0000000000401030 <+0>:	jmpq   *0x2fe2(%rip)        # 0x404018 <puts@got.plt>
   0x0000000000401036 <+6>:	pushq  $0x0
   0x000000000040103b <+11>:	jmpq   0x401020
```

查看 0x404018 地址存储的值：

```bash
(gdb) x 0x404018
0x404018 <puts@got.plt>:	0x00401036
```
可以看到它存储的值是 0x401036，这个地址就是 puts@plt 函数的第二行
指令地址。

继续执行 si，执行后继续反汇编查看，**确认程序确实跳转到了 puts@plt 的
第二条指令处。** 相关过程记录如下：

```bash
(gdb) si
0x0000000000401036 in puts@plt ()
(gdb) disass
Dump of assembler code for function puts@plt:
   0x0000000000401030 <+0>:	jmpq   *0x2fe2(%rip)        # 0x404018 <puts@got.plt>
=> 0x0000000000401036 <+6>:	pushq  $0x0
   0x000000000040103b <+11>:	jmpq   0x401020
End of assembler dump.
```

继续单步后，执行最后一行跳转指令后 gdb 看不到其它信息了，这时打断点
让程序直接运行完 puts 函数，运行完后，重新查看 0x404018 这个地址
存储的值，获取到了如下信息：

```bash
(gdb) x 0x404018
0x404018 <puts@got.plt>:	0xf7e5a910
```
可以看到 0x404018 地址中存储的值被修改了，变为了 0xf7e5a910，这个
地址正是 puts 函数的地址。

disass puts 函数得到了如下信息i：

```bash
(gdb) disass puts
Dump of assembler code for function __GI__IO_puts:
Address range 0x7ffff7e5a910 to 0x7ffff7e5aaad:
   0x00007ffff7e5a910 <+0>:	push   %r14
```
观察 puts 函数地址的后 32 位，其数值与 0x404018 地址处存储的地址
是相同的，这里我的系统是 x86_64 架构，其虚拟内存位
数为 48 位，从内核源码树中 **Documentation/x86/x86_64/mm.txt**  中可
以获知，对于四级页表，用户虚拟内存空间实际是 47 位宽段。

相关信息如下：


```manual
Virtual memory map with 4 level page tables:

0000000000000000 - 00007fffffffffff (=47 bits) user space, different per mm
hole caused by [47:63] sign extension
```

页表级数可以是通过 **CONFIG_PGTABLE_LEVELS** 配置项目来控制
的，在我的系统中其值如下：

```manual
/boot/config-4.19.0-11-amd64:CONFIG_PGTABLE_LEVELS=4
```

将 0xf7d5a910 符号扩展到 47 位就会得到 0x00007ffff7e5a910 这个地址，
它正是 puts 函数映射到内存中的地址。

这其实就是 lazy binding 的工作过程，它会在符号第一次被引用的时候绑
定符号的地址，之后的访问由于地址已经绑定完成，会直接跳转到对应的
函数执行。

## gdb 跟踪失败的中间过程

上面的叙述中，在 puts@plt 的最后一行跳转指定执行完成后，到 puts 执
行完成这个过程中进行的操作是一个黑盒，使用 gdb 跟丢了。

这里我首先执行 objdump 反汇编 hello 程序来研究一下，反汇编的输出中
与这个问题相关的部分信息摘录如下：


```bash
Disassembly of section .plt:

0000000000401020 <.plt>:
  401020:       ff 35 e2 2f 00 00       pushq  0x2fe2(%rip)        # 404008 <_GLOBAL_OFFSET_TABLE_+0x8>
  401026:       ff 25 e4 2f 00 00       jmpq   *0x2fe4(%rip)        # 404010 <_GLOBAL_OFFSET_TABLE_+0x10>
  40102c:       0f 1f 40 00             nopl   0x0(%rax)

0000000000401030 <puts@plt>:
  401030:       ff 25 e2 2f 00 00       jmpq   *0x2fe2(%rip)        # 404018 <puts@GLIBC_2.2.5>
  401036:       68 00 00 00 00          pushq  $0x0
  40103b:       e9 e0 ff ff ff          jmpq   401020 <.plt>
```

这里可以看到 puts@plt 函数的最后一个跳转语句实际上跳转到了 .plt 
section 中，这个 section 的第一行指令将 ```_GLOBAL_OFFSET_TABLE_+ 0x8```
 的值压栈，然后又跳转到 ```_GLOBAL_OFFSET_TABLE_ + 0x10```指向的函数
 处执行。

这里 0x8 与 0x10 是连续的两个 8 字节，**如果我们将每一个 8 字节
看做是一个表项**，那么这里时间上就是使用了 ```_GLOBAL_OFFSET_TABLE_ ```
表的表项 1，与表项 2，可以简写为 **GOT[1]，GOT[2]**。

**这个 ```_GLOBAL_OFFSET_TABLE_```是啥东东呢？**

其实它就是**全局的 got 表**，程序中引用的每一个动态库中的符号都在
这个全局的 got 表中占据一个表项，动态库链接器会在符号第一次被引用
的时候对符号的地址进行解析，并把解析出来的符号地址存到符号占据的 
got 表项中。

这里 puts@plt 函数的第二行将 0 压栈，这个 0 表示的就是 puts@plt 在 
GOT 表中的位置，不过它并不像我们想的那样指向 GOT[0]，而是指向 
GOT[3]。

GOT 表中的前几项有特殊的作用，相关内容摘自《Linux 二进制分析》
一书，描述如下：

>GOT[0]:存放了指向可执行文件动态段的地址,动态链
接器利用该地址提取动态链接相关的信息。

>GOT[1]:存放 link_map 结构的地址,动态链接器利用该地址来对符号进行解析。

>GOT[2]:存放了指向动态链接器 _dl_runtime_resolve()
函数的地址,该函数用来解析共享库函数的实际符号地址

在这个 hello 程序中，puts 函数实际占据的是 GOT[3] 这个项目。

### 继续使用 gdb 来验证上面的

对于上面陈述的 GOT[0]、GOT[1]、GOT[2] 保存的内容其实际情况
究竟是怎样的呢？我下面继续通过使用 gdb 来确认。

#### GOT[0] 存放了指向可执行文件动态段的地址

首先使用 gdb 打印出 GOT[0] 地址中存储的值，确定这个值是 0x403e20。
相关信息如下：


```bash
(gdb) x 0x404000
0x404000:	0x00403e20
```

然后我通过生成 map 文件来查看程序动态段的地址，验证确实是 0x403e20，
过程记录如下：

```bash
gcc -no-pie -g ./hello.c -Wl,-Map=output.map -o hello

[longyu@debian-10:22:03:01] cwd $ grep '.dynamic' output.map 
.dynamic        0x0000000000403e20      0x1d0
 *(.dynamic)
 .dynamic       0x0000000000403e20      0x1d0 /usr/lib/gcc/x86_64-linux-gnu/8/../../../x86_64-linux-gnu/crt1.o
```
**GOT[0] 的描述成立！**

#### GOT[1] 存放 link_map 结构的地址

继续用 x 命令打印 GOT[1] 的值，获取到了如下信息：

```bash
(gdb) x 0x404008
0x404008:	0xf7ffe190
```

同样对这个值进行符号扩展，然后将这个地址强转为一个 link_map 
结构体，打印此结构体的内容，记录如下：

```
(gdb) print /x *(struct link_map *)0x7ffff7ffe190
$2 = {l_addr = 0x0, l_name = 0x7ffff7ffe728, l_ld = 0x403e20, l_next = 0x7ffff7ffe730, l_prev = 0x0, l_real = 0x7ffff7ffe190, l_ns = 0x0, l_libname = 0x7ffff7ffe710, 
  l_info = {0x0, 0x403e20, 0x403f00, 0x403ef0, 0x0, 0x403ea0, 0x403eb0, 0x403f30, 0x403f40, 0x403f50, 0x403ec0, 0x403ed0, 0x403e30, 0x403e40, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 
    0x403f10, 0x403ee0, 0x0, 0x403f20, 0x0, 0x403e50, 0x403e70, 0x403e60, 0x403e80, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x403f70, 0x403f60, 0x0 <repeats 13 times>, 0x403f80, 
    0x0 <repeats 25 times>, 0x403e90}, l_phdr = 0x400040, l_entry = 0x401040, l_phnum = 0xb, l_ldnum = 0x0, l_searchlist = {r_list = 0x7ffff7faa520, r_nlist = 0x3}, 
  l_symbolic_searchlist = {r_list = 0x7ffff7ffe708, r_nlist = 0x0}, l_loader = 0x0, l_versions = 0x7ffff7faa540, l_nversions = 0x3, l_nbuckets = 0x1, 
  l_gnu_bitmask_idxbits = 0x0, l_gnu_shift = 0x0, l_gnu_bitmask = 0x400318, {l_gnu_buckets = 0x400320, l_chain = 0x400320}, {l_gnu_chain_zero = 0x400320, 
    l_buckets = 0x400320}, l_direct_opencount = 0x1, l_type = 0x0, l_relocated = 0x1, l_init_called = 0x1, l_global = 0x1, l_reserved = 0x0, l_phdr_allocated = 0x0, 
  l_soname_added = 0x0, l_faked = 0x0, l_need_tls_init = 0x0, l_auditing = 0x0, l_audit_any_plt = 0x0, l_removed = 0x0, l_contiguous = 0x0, 
  l_symbolic_in_local_scope = 0x0, l_free_initfini = 0x0, l_cet = 0x0, l_rpath_dirs = {dirs = 0xffffffffffffffff, malloced = 0x0}, l_reloc_result = 0x0, 
  l_versyms = 0x4003c6, l_origin = 0x0, l_map_start = 0x400000, l_map_end = 0x404038, l_text_end = 0x4011bd, l_scope_mem = {0x7ffff7ffe450, 0x0, 0x0, 0x0}, 
  l_scope_max = 0x4, l_scope = 0x7ffff7ffe4f0, l_local_scope = {0x7ffff7ffe450, 0x0}, l_file_id = {dev = 0x0, ino = 0x0}, l_runpath_dirs = {dirs = 0xffffffffffffffff, 
    malloced = 0x0}, l_initfini = 0x7ffff7faa500, l_reldeps = 0x0, l_reldepsmax = 0x0, l_used = 0x1, l_feature_1 = 0x0, l_flags_1 = 0x0, l_flags = 0x0, l_idx = 0x0, 
  l_mach = {plt = 0x0, gotplt = 0x0, tlsdesc_table = 0x0}, l_lookup_cache = {sym = 0x400370, type_class = 0x4, value = 0x0, ret = 0x0}, l_tls_initimage = 0x0, 
  l_tls_initimage_size = 0x0, l_tls_blocksize = 0x0, l_tls_align = 0x0, l_tls_firstbyte_offset = 0x0, l_tls_offset = 0x0, l_tls_modid = 0x0, l_tls_dtor_count = 0x0, 
  l_relro_addr = 0x403e10, l_relro_size = 0x1f0, l_serial = 0x0, l_audit = 0x7ffff7ffe608}
```
看到这个结构并不能说明 GOT[1] 的值是指向一个 link_map 结构体
的指针，不过看上去 link_map 是个非常复杂的结构体，这是我的第
一印象。

再检视上面的输出，我注意到了如下字段及其值：

>l_entry = 0x401040

这个字段看上去应该是某某入口，继续使用 x 命令打印这个地址的值，
获取到了如下信息：

```bash
(gdb) x 0x401040
0x401040 <_start>:	0x8949ed31
```
_start 这正是可执行程序的入口，从这点上说明 **GOT[1] 的描述可信**。

#### GOT[2] 存放 dl_runtime_resolve 函数的地址

仍旧使用与上面相同的方法进行验证，获取到了如下信息：

```bash
(gdb) x 0x404010
0x404010:	0xf7fea500
(gdb) x 0x7ffff7fea500
0x7ffff7fea500 <_dl_runtime_resolve_xsavec>:	0xe3894853
(gdb) disas _dl_runtime_resolve_xsavec
Dump of assembler code for function _dl_runtime_resolve_xsavec:
   0x00007ffff7fea500 <+0>:	push   %rbx
```
可以看到 GOT[2] 中存放了 _dl_runtime_resolve_xsavec 函数的地址，
这个函数与 dl_runtime_resolve 并不相同，我使用 gdb 补全功能发现，
能够找到下面 3 个不同类型的函数。 


```bash
(gdb) disass _dl_runtime_resolve
_dl_runtime_resolve_fxsave  _dl_runtime_resolve_xsave   _dl_runtime_resolve_xsavec
```

看来应该是针对不同的指令集编写的不同实现，**GOT[2] 的描述验证通过**！

#### 引用多个动态库符号的情况

上文中我说明了 puts 函数将会指向 GOT[3] 的表项，我使用的 demo 里
只有 printf 这一个动态库函数，那对于多个动态库函数的引用，所占据的
GOT 表项是怎样的呢？

为了回答这个问题，我将上面的 hello.c 代码修改为如下内容：


```c
#include <stdio.h>
#include <unistd.h>

int main(int argc, char* argv[])
{
	printf("hello world\n");

	pause();

	return 0;
}
```

可以看到，这里增加了一个对 pause 函数的调用，继续执行 
gcc -no-pie -g hello.c -o hello 来编译，编译完成后反汇编能够得到\
如下相关的信息：


```bash
0000000000401030 <puts@plt>:
  401030:       ff 25 e2 2f 00 00       jmpq   *0x2fe2(%rip)        # 404018 <puts@GLIBC_2.2.5>
  401036:       68 00 00 00 00          pushq  $0x0
  40103b:       e9 e0 ff ff ff          jmpq   401020 <.plt>

0000000000401040 <pause@plt>:
  401040:       ff 25 da 2f 00 00       jmpq   *0x2fda(%rip)        # 404020 <pause@GLIBC_2.2.5>
  401046:       68 01 00 00 00          pushq  $0x1
  40104b:       e9 d0 ff ff ff          jmpq   401020 <.plt>
```

这里 gcc 生成了 puts@plt 与 pause@plt 这两个函数，注意这两个
函数的第二行指令！ 

puts@plt 将 0 压栈，pause@plt 将 1 压栈，这个数字我在上文中
已经提到过，它代表的是符号在 GOT 表中的下标，最终的值应
该是跳过前三个保留元素的值，在这里就有如下对应关系：

```
puts@plt----->GOT[3]

pause@plt---->GOT[4]
```

这样就将所有的过程串联起来了。

### GOT 表的一些其它特点
动态链接器会修改可执行文件中的 GOT(Global Offset Table, 全
局偏移表)。GOT 位于数据段(.got.plt 节)中，因为 GOT 必须是可
写的(至少最初是可写的，可以将只读重定位看做一种安全特性)，
故而位于数据段中。动态链接器会使用解析好的共享库地址来修
改 GOT。

这样的行为让动态库的加载有更好的性能，但也可能将一些问题
的暴露时间推迟，对于这种情况，可以通过设定 LD_BIND_NOW 
环境变量来通知动态库链接器在程序启动的时候就完成所有符号
的绑定，而不是在符号第一次被引用时才进行绑定。
（部分内容摘自《Linux 二进制分析》）

## 总结
动态库 lazy binding 的原理大致搞清楚了，但是对与动态库链接器的
执行过程却一点也不清楚，以前对动态库的原理不清楚，觉得好像挺
简单的，现在单看看 link_map 接口体就有点头大，真是知道的越多
越明白自己不知道的越多！

