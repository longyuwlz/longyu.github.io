# tcpdump与 bpf 指令集
## 前言
tcpdump 这个工具经常使用，却对其背后的原理一直没有太深入的研究。在学习 ebpf 在网络上的应用时，对 tcpdump 背后的一些原理有了更进一步的认识，在本篇博客中记录一下。

## bpf overview
在一头栽进 bpf 内部之前，用下面这个图来建立对 bpf 的认识：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109162250709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
## bpf 虚拟机器的基础元素
tcpdump 依附标准的 bpf 机器来运行，tcpdump 的过滤规则会被转化为一段 bpf 指令并被加载到内核中的 bpf 虚拟机器上执行，这一切都是 tcpdump 自动完成的，并不为用户可见。

从内核源代码 Documentation/networking/filter.txt 文件中摘录下面这些 bpf 虚拟机器的基础元素介绍内容。

### bpf 虚拟机器寄存器

```manual
  Element          Description

  A                32 bit wide accumulator
  X                32 bit wide X register
  M[]              16 x 32 bit wide misc registers aka "scratch memory
                   store", addressable from 0 to 15
```
常用的寄存器是 A 累加寄存器，X 寄存器，这两个寄存器都是 32 位宽度。

### bpf 虚拟机器指令集
bpf 虚拟机指令格式规则如下：

```manual
  op:16, jt:8, jf:8, k:32
```
op 表示 16-bit 操作码，唯一标识具体的指令，jt 与 jf 表示 8 位宽度的跳转目标，8 位限制了跳转范围为 256 字节。k 是一个工具混杂的参数，可以被每一个指令按照不同的规则解释。

指令集包括 load、store、branch、alu、miscellaneous 和 return 等指令，支持的指令功能列表如下：

```manual
  Instruction      Addressing mode      Description

  ld               1, 2, 3, 4, 12       Load word into A
  ldi              4                    Load word into A
  ldh              1, 2                 Load half-word into A
  ldb              1, 2                 Load byte into A
  ldx              3, 4, 5, 12          Load word into X
  ldxi             4                    Load word into X
  ldxb             5                    Load byte into X

  st               3                    Store A into M[]
  stx              3                    Store X into M[]

  jmp              6                    Jump to label
  ja               6                    Jump to label
  jeq              7, 8, 9, 10          Jump on A == <x>
  jneq             9, 10                Jump on A != <x>
  jne              9, 10                Jump on A != <x>
  jlt              9, 10                Jump on A <  <x>
  jle              9, 10                Jump on A <= <x>
  jgt              7, 8, 9, 10          Jump on A >  <x>
  jge              7, 8, 9, 10          Jump on A >= <x>
  jset             7, 8, 9, 10          Jump on A &  <x>

  add              0, 4                 A + <x>
  sub              0, 4                 A - <x>
  mul              0, 4                 A * <x>
  div              0, 4                 A / <x>
  mod              0, 4                 A % <x>
  neg                                   !A
  and              0, 4                 A & <x>
  or               0, 4                 A | <x>
  xor              0, 4                 A ^ <x>
  lsh              0, 4                 A << <x>
  rsh              0, 4                 A >> <x>

  tax                                   Copy A into X
  txa                                   Copy X into A

  ret              4, 11                Return
```
中间一列用逗号隔开的数字代表不同指令支持的寻址类型，总共有 13 种，每一种的描述信息如下：

```manual
  Addressing mode  Syntax               Description

   0               x/%x                 Register X
   1               [k]                  BHW at byte offset k in the packet
   2               [x + k]              BHW at the offset X + k in the packet
   3               M[k]                 Word at offset k in M[]
   4               #k                   Literal value stored in k
   5               4*([k]&0xf)         Lower nibble * 4 at byte offset k in the packet
   6               L                    Jump label L
   7               #k,Lt,Lf             Jump to Lt if true, otherwise jump to Lf
   8               x/%x,Lt,Lf           Jump to Lt if true, otherwise jump to Lf
   9               #k,Lt                Jump to Lt if predicate is true
  10               x/%x,Lt              Jump to Lt if predicate is true
  11               a/%a                 Accumulator A
  12               extension            BPF extension
```
有了上面这些基础信息，下面我用一个实例具体将这些内容串联起来。

## 一个 tcpdump 过滤功能的实例
tcpdump 程序支持使用 -d 参数来 dump 出过滤规则转化后的 bpf 指令，下面是一个具体的示例，这一示例用来过滤端口号为 8080 的 tcp ipv4 报文。

```bash
$ sudo tcpdump -d 'ip and tcp port 8080'
(000) ldh      [12]
(001) jeq      #0x800           jt 2	jf 12
(002) ldb      [23]
(003) jeq      #0x6             jt 4	jf 12
(004) ldh      [20]
(005) jset     #0x1fff          jt 12	jf 6
(006) ldxb     4*([14]&0xf)
(007) ldh      [x + 14]
(008) jeq      #0x1f90          jt 11	jf 9
(009) ldh      [x + 16]
(010) jeq      #0x1f90          jt 11	jf 12
(011) ret      #262144
(012) ret      #0
```
这个例子选自《linux 内核观测技术 ebpf》第六章，它是个非常经典的例子，在 tcpdump 经典论文中也能够看到。

上述指令中，加载指令地址偏移量是从报文的 ether 头开始算的，有了这个认识再加上对以太网头部、IP 头部、TCP 头部字段的认识，不难理解上面这些指令。

我重点讲一下下面这几行指令的含义：

```manual
(004) ldh      [20]
(005) jset     #0x1fff          jt 12	jf 6
(006) ldxb     4*([14]&0xf)
(007) ldh      [x + 14]
```
偏移为 4 处的指令从报文起始偏移为 20 字节处加载一个半字（16-bit）到 A 寄存器中，这个内容表示的值为  IP 报文中 3 bits 的 Flags 与 13 bits 的 Fragment Offset 的值。

偏移为 5 处的指令将 A 寄存器值的低 13 位与 0x1fff 进行与运算并根据结果进行跳转，实现当 **Fragment Offset 为 0 的时候才继续判断端口号**，**非 0 则直接跳到 12 行**。

偏移为 6 处的指令比较难懂，它的功能是加载实际的 ip 头长度，[14] & 0xf 对应的是 ip 报文中 IHL 的内容。**由于 IHL 单位为 4 字节**，**因此对 IHL 的值乘了 4**，就将**真实的 ip 头长度字节数**保存到了 X 寄存器中。

偏移为 7 处的指令以 X 寄存器中 ip 报文的长度为基础，加上 14 ( ether header 长度）得到 TCP 源端口的偏移量，并读取其值到 A 寄存器中。




## 总结
tcpdump 工具在定位网络问题中经常用到，可是我以前并不清楚其背后的一些细节。本篇文章中借 tcpdump 描述了 bpf 指令集并根据一个经典的过滤例子将这些指令串联了起来。

使用虚拟机器的形式解决包过滤问题是 tcpdump 的一大亮点，依赖 bpf 虚拟机tcpdump 实现了一套更高效的从内核捕获报文到用户态的架构。

bpf 是 ebpf 的基础，相较 ebpf 虚拟机而言它更简单，却与 ebpf 的原理有共同之处，在进军 ebpf 内部原理前，不妨先研究研究 bpf。

## 参考文档

[The BSD Packet Filter: A New Architecture for User-level Packet Capture](https://www.tcpdump.org/papers/bpf-usenix93.pdf)

