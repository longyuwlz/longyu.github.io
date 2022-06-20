## dpdk-pdump 是什么

**dpdk-pdump 是 dpdk 提供的一个工具。它可以可以作为 secondary 程序运行，能够捕获 dpdk 的端口的数据包。**

## 编译 dpdk-pdump 

**dpdk-pdump** 工具的源码位于 dpdk 源码根目录下的 **./app/pdump** 目录中，不需要像 examples 中的 demo 一样单独编译，它会在编译 dpdk 的同时也被编译，我们可以在编译生成的 app 目录中找到这个程序。

在我的虚拟机中，编译 dpdk 后，它的位置如下：

>/home/longyu/dpdk-stable-17.05.2/x86_64-native-linuxapp-gcc/app/dpdk-pdump

## 使用 dpdk-pdump 
**dpdk-pdump 的用法如下：**

**usage: ./dpdk-pdump [EAL options] -- --pdump '(port=<port id> | device_id=<pci id or vdev name>),(queue=<queue_id>),(rx-dev=<iface or pcap file> | tx-dev=<iface or pcap file>,[ring-size=<ring size>default:16384],[mbuf-size=<mbuf data size>default:2176],[total-num-mbufs=<number of mbufs>default:65535]' [--server-socket-path=<server socket dir>default:/var/run/.dpdk/ (or) ~/.dpdk/] [--client-socket-path=<client socket dir>default:/var/run/.dpdk/ (or) ~/.dpdk/]**

**dpdk-pdump** 需要依赖一个 **dpdk primary** 进程，我就以 **l2fwd** 命令作为 **dpdk primary** 进程。

有了 **dpdk primary** 进程之后，根据我的环境，我使用如下命令行启动 dpdk-pdump
```bash
	sudo ./dpdk-pdump -n 4 -- --pdump 'port=0,queue=*,rx-dev=./rx-pcap'
```
## no driver for pcap 的问题

我第一次执行上面的命令时程序异常终止，错误信息如下：

> EAL: no driver found for eth_pcap_rx_0
> EAL: Driver, cannot attach the device

通过搜索，我发现上面的错误是因为在编译 dpdk 时没有启用 PCAP 相关的功能所致，参考链接如下：

[dpdk-pdump-no-driver-found-for-net-pcap](https://stackoverflow.com/questions/44357995/dpdk-pdump-no-driver-found-for-net-pcap-rx-0)

根据网页中的回答我对 **.config** 文件做了如下修改以使能 **PCAP** 的相关功能：

```bash
longyu@longyu-pc:~/dpdk-stable-17.05.2/x86_64-native-linuxapp-gcc$ grep 'PCAP' .config
# Compile software PMD backed by PCAP files
CONFIG_RTE_LIBRTE_PMD_PCAP=y
CONFIG_RTE_PORT_PCAP=y
```
这之后重新编译后继续测试，这个问题得到了解决，可又遇到了一个新的问题。

## 无法与 primary server 端通信的问题

解决了 **pcap driver** 的问题后，我重新执行 **dpdk-pdump** 时新的报错信息如下：

> PDUMP: failed to send to server:No such file or directory,
> pdump_create_client_socket:702 PDUMP: client request for pdump
> enable/disable failed PDUMP: failed to send to server:No such file or
> directory, pdump_create_client_socket:702 PDUMP: client request for
> pdump enable/disable failed

通过阅读官方网页中的说明，我发现了问题所在。官方的说明中提到 **dpdk-pdump** 工具只能与初始化了 **packet capture framework** 的主程序通信，而 **packet capture framework** 的初始化需要修改程序的源码。

在 dpdk 提供的工具中，**testpmd** 工具的源码中添加了 **packet capture framework** 的初始化代码，我查看相关代码，找到了如下源码行：

```c
	diag = rte_eal_init(argc, argv);
	    if (diag < 0)
	        rte_panic("Cannot init EAL\n");
	
	#ifdef RTE_LIBRTE_PDUMP
	    /* initialize packet capture framework */
	    rte_pdump_init(NULL);
	#endif
```
上面的代码会在 **RTE_LIBRTE_PDUMP** 宏定义时执行 **rte_pdump_init** 函数来进行必要的初始化，**RTE_LIBRTE_PDUMP** 功能在 **.config** 中进行配置，默认为开启。

**.config** 中与 **RTE_LIBRTE_PDUMP** 功能相关的配置如下：

```bash
	# Compile architecture we compile for. pdump library
	CONFIG_RTE_LIBRTE_PDUMP=y
```

当使用能了这个参数后，编译目录下的头文件 **rte_config.h** 中会定义 **RTE_LIBRTE_PDUMP** 宏，相关的代码如下：

```c
	#undef RTE_LIBRTE_PDUMP
	#define RTE_LIBRTE_PDUMP 1
```
我按照上面的描述修改了 dpdk-pdump 程序的源码后，终于能够正常执行了！

## 查看 dump 出的数据包文件
**dpdk-pdump** 中已经对 dump 出的原始数据包进行了转化，我们可以直接使用 **tcpdump** 的 **-r** 选项来查看生成的文件。
 
 我指定 **dpdk-pdump dump** 端口接收到的包，指定存储文件为 **./rx-pcap**。我只需要执行下面的命令就可以看到接收到的数据包的详细信息。

```bash
 	sudo tcpdump -r ./rx-pcap
```

## 总结
**dpdk 提供的程序在使用时可能会遇到一些问题，解决这些问题的一般步骤如下：**

1. 查看依赖的功能是否开启（修改 .config 文件）
2. 修改必要的源代码以执行必要的初始化工作
3. 重新编译后再次执行

