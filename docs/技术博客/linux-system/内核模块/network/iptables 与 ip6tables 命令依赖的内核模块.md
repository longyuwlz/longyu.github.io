# iptables 与 ip6tables 命令依赖的内核模块
## 问题描述
最近需要给产品编译 iptables 相关的内核模块，需要达成的目标是能够运行下面这两行命令：

```bash
ip6tables -t nat -vnL
iptables -t nat -vnL
```
乍一看感觉挺容易的，但实际搞的时候却发现需要编译多个模块，并且模块之间还有相对复杂的依赖关系，整了一会最终搞定了，在本文中记录一下遇到的一些问题。

## 如何确定 iptables 命令需要使用的内核模块
真正开始搞的时候，我发现 iptables 命令需要使用哪些内核模块让我犯难了。由于我们使用的是定制化的内核，不能从内部找到一个基线参考。

经过同事提醒，我发现可以通过现有的发行版来确定需要使用哪些模块。

debian10 中的 iptables 命令需要使用到的内核模块列表如下：

```bash
nft_chain_nat_ipv6     16384  4
nf_nat_ipv6            16384  1 nft_chain_nat_ipv6
nf_nat                 36864  1 nf_nat_ipv6
nf_conntrack          172032  2 nf_nat,nf_nat_ipv6
nf_defrag_ipv6         20480  1 nf_conntrack
nf_defrag_ipv4         16384  1 nf_conntrack
libcrc32c              16384  2 nf_conntrack,nf_nat
nf_tables             143360  1 nft_chain_nat_ipv6
nfnetlink              16384  1 nf_tables
```
有了这个基线数据，这个问题就变得简单了！

## 确定模块依赖关系
对发行版使用到的内核模块进行梳理，初步确定需要编译下面这些内核模块：

```bash
iptable_filter.ko
nf_nat.ko
nf_defrag_ipv4.ko
nf_conntrack_ipv4.ko
nf_nat_ipv4.ko
iptable_nat.ko
ip6_tables.ko
ip6table_filter.ko
nf_nat_ipv6.ko
ip6table_nat.ko
```
由于我们使用的是 insmod 命令，还必须**确定模块之间的依赖关系**，同时由于我们的系统中移除了 /lib/modules 目录，无法通过 modprobe 来找到模块依赖关系。

我想也许 modinfo 可以解决我的问题，man modinfo 得到了如下信息：

```manual
   -F, --field
           Only print this field value, one per line. This is most useful for scripts. Field names are case-insensitive. Common fields (which may
           not be in every module) include author, description, license, parm, depends, and alias. There are often multiple parm, alias and
           depends fields. The special field filename lists the filename of the module.
```
上面的描述说明，可以设定 modinfo 的 -F 参数来输出模块依赖等信息。将上文中梳理出来的 iptables 相关内核模块列表存储为一个名为 test 的文件，执行如下命令获取模块依赖信息：

```bash
for i in $(cat test); do echo -n -e "$i depends:"; find ./ -name "$i" -exec modinfo -F depends {} \; ; done
```
执行上述命令得到的信息如下：

```bash
iptable_filter.ko depends:
nf_nat.ko depends:
nf_defrag_ipv4.ko depends:
nf_conntrack_ipv4.ko depends:nf_defrag_ipv4
nf_nat_ipv4.ko depends:nf_nat
iptable_nat.ko depends:nf_nat_ipv4
ip6_tables.ko depends:
ip6table_filter.ko depends:ip6_tables
nf_nat_ipv6.ko depends:nf_nat
ip6table_nat.ko depends:ip6_tables,nf_nat_ipv6
```
上面的命令行中的 ./ 所在的目录是已经编译过的内核的根目录，输出信息中 depends: 后为空的项目表明此模块没有依赖。

根据上面这些信息，调整加载命令，测试发现 ipv4 的 iptables 功能可用，但是在加载 nf_nat_ipv6 模块时会失败。

## insmod nf_nat_ipv6 模块失败的问题
从上文中记录的 nf_nat_ipv6 的模块依赖信息可以看出，它**只依赖 nf_nat 模块**，在加载了 nf_nat 后，加载 nf_nat_ipv6.ko 的时候竟然还会报错！错误信息如下：

```bash
insmod: ERROR: could not insert module nf_nat_ipv6.ko: Protocol wrong type for socket 
```
dmesg 也没有看到其它信息，一通折腾发现，**nf_nat_ipv6.ko** 对下面这两个 ko 有隐式的依赖：

```bash
nf_defrag_ipv6 
nf_conntrack_ipv6
```
加载了这两个 ko 后，**nf_nat_ipv6.ko** 就能够正常加载，ip6tables 命令也能够正常执行。

最终系统中加载的 iptables 相关驱动内容如下：

```bash
ip6table_nat            2827  0
nf_nat_ipv6             7249  1 ip6table_nat
nf_conntrack_ipv6      13000  1
nf_defrag_ipv6         29882  1 nf_conntrack_ipv6
ip6table_filter         2451  0
ip6_tables             18750  2 ip6table_filter,ip6table_nat
iptable_nat             2838  0
nf_nat_ipv4             6979  1 iptable_nat
nf_conntrack_ipv4      19999  1
nf_defrag_ipv4          2265  1 nf_conntrack_ipv4
nf_nat                 19269  2 nf_nat_ipv4,nf_nat_ipv6
iptable_filter          2473  0
```
## 总结
在搞一个新的问题时，需要优先考虑有没有现有的方案，这些现有的方案并不能解决 100％ 的问题，但是它们能够提供给我们提供一个基线数据，有了这个基线才能保证我们一直在正确的方向上前进。

在本文描述的问题中，现存的发行版就是一个现有的方案，通过研究现有的方案确定基线数据，然后进行复制与迁移，最终达成预定的需求。

很多时候我们常常忽略基线数据，而热衷于研究技术内部的原理，对于研究来说这没有什么问题，对于工作来说，就显得有些低效了。






