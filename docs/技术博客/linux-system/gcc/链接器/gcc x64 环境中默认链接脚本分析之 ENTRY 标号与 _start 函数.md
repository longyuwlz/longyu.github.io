# gcc x64 环境中默认链接脚本分析之 ENTRY 标号与 _start 函数
## ENTRY 标号
>ENTRY(_start)

ENTRY 标号指定**可执行程序的入口**。

对应这里便是 **_start** 函数，这个函数为 main 函数执行做了一些准备工作。需要说明的是对用户程序代码而言 main 函数是执行入口，但对整个 elf 可执行文件而言，_start 文件才是执行入口。

我在 [嵌入式中指定程序执行入口](https://blog.csdn.net/Longyu_wlz/article/details/100140445) 中有对 ENTRY 标号与程序执行入口更具体的描述，这里就不赘述了。

### _start 函数从哪里来？
我们在编码时并没有实现任何名为 _start 函数，那这个函数是从哪里来的呢？

实际上这里的 **ENTRY** 标号说明了程序要**引用** _start 这个函数，在链接的时候，链接器通过**扫描输入文件来解析这个符号**。

这个符号来自于 **libc 库**，在 glibc 中 **sysdeps 中各种架构子目录中的 start.S** 汇编代码中实现。

### elf 头中的入口点地址字段
这个 _start 函数的地址会被写入到 elf 格式文件的头部，这一点可以通过执行 readelf -h 来确定。

一个典型的示例如下：

```bash
[longyu@debian-10:18:12:37] program-problem $ readelf -h ./a.out
ELF 头：
  Magic：  7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - System V
  ABI 版本:                          0
  类型:                              DYN (共享目标文件)
  系统架构:                          Advanced Micro Devices X86-64
  版本:                              0x1
  入口点地址：              0x1050
```
这里的入口点地址为 0x1050，这个 0x1050 就是 _start 函数的起始地址。通过 objdump -d 可以得到确认，相关内容如下：

```bash
[longyu@debian-10:18:15:20] program-problem $ objdump -d a.out | grep '<_start>'
0000000000001050 <_start>:
```

### 内核中对 elf 头中程序入口地址的使用
在内核 exec 执行 **load_binary** 的时候首先会读**可执行文件的头部**，对于一个合法的**静态链接的 elf 可执行文件**，其头部的程序入口地址字段的值经过调整后会作为 **start_thread** 的 **pc** 参数来使用，在 start_thread 中赋值给 pt_regs 表示的进程寄存器环境的 **ip 字段**，在程序被调度执行后就从该地址开始执行。


