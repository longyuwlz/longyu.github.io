## ethtool 读到的链接状态

使用 ethtool 读取网卡链接状态的一个示例如下：
```
longyu@longyu-pc:~$ sudo /sbin/ethtool ens37 
[sudo] password for longyu: 
Settings for ens37:
	Supported ports: [ TP ]
	Supported link modes:   10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Supported pause frame use: No
	Supports auto-negotiation: Yes
	Supported FEC modes: Not reported
	Advertised link modes:  10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	......                       
	Link detected: yes
```
上面的示例中，最后一行中的 Link detected 表示链路的状态，为 yes 表示链路 up，为 no 表示链路 down。目前链路为 up 状态。同时上面的输出中也表明此网卡支持自动协商。

**自动协商用于网卡端口与对端协商连接速度和双工模式，通过协商确定两端能够达到的最大连接速度与两端都支持的双工模式，主要与 phy 有关。**

通过搜索，我发现了如下链接：

[以太网自动协商的原理](https://blog.csdn.net/skyflying2012/article/details/17557743)
 
 下面的信息来于 [以太网自动协商的原理](https://blog.csdn.net/skyflying2012/article/details/17557743) 这篇博客。

> 千兆光口自协商过程:
> 
> 1.两端都设置为自协商模式
> 
> 双方互相发送/C/码流，如果连续接收到3个相同的/C/码且接收到的码流和本端工作方式相匹配，则返回给对方一个带有Ack应答的/C/码，对端接收到Ack信息后，认为两者可以互通，设置端口为UP状态
> 
> 2.一端设置为自协商，一端设置为强制
> 
> 自协商端发送/C/码流，强制端发送/I/码流，强制端无法给对端提供本端的协商信息，也无法给对端返回Ack应答，故自协商端DOWN。但是强制端本身可以识别/C/码，认为对端是与自己相匹配的端口，所以直接设置本端端口为UP状态
> 
> 3.两端均设置为强制模式
> 
> 双方互相发送/I/码流，一端接收到/I/码流后，认为对端是与自己相匹配的端口，直接设置本端端口为UP状态
> 
阅读上面的信息可以发现，当**两端都设置为自协商模式时，自协商成功后两端的端口状态都为 UP**；**当一端设置自协商，一端设置强制时，自协商时设置自协商模式的端口状态会变为 DOWN，设置强制端的端口状态会变为 UP；当两端均设置为强制模式时，进行自协商会使两端端口都变为 UP 状态。**

## 对端口执行自协商
有了这个基础我们来进行下面的操作，这里我使用的网卡型号如下：

```
02:05.0 Ethernet controller: Intel Corporation 82545EM Gigabit Ethernet Controller (Copper) (rev 01)
```
这款网卡在我的系统中对应的 netdev 接口的名字为 ens37。

**1. 执行 sudo ifconfig ens37 down 命令将网卡设定为 down** 

**ethotool 查看链路状态，输出信息截取如下：**

```bash
longyu@longyu-pc:~$ sudo ethtool ens37 
[sudo] password for longyu: 
Settings for ens37:
	Supported ports: [ TP ]
	Supported link modes:   10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Supported pause frame use: No
	Supports auto-negotiation: Yes
	.........
	Link detected: no
```
Link detected 为 no 表示链路为 down 状态。

**ethtool dump 寄存器信息，有如下与链路状态相关的信息：**

```bash
longyu@longyu-pc:~$ sudo ethtool -d ens37  | grep -i 'Link'
      Link reset:                        reset
      Set link up:                       1
      Link up:                           link config
      Link speed:                        1000Mb/s
      Link State:                        Down
      Force Link Good:                   disabled
```
此时 Link State 为 Down 与上面的 Link detected : no 一致。

**2. 执行 sudo ethtool -s ens37 autoneg on 进行自协商** 

**ethtool 查看链路状态，截取主要信息如下：**

```bash
longyu@longyu-pc:~$ sudo ethtool ens37
Settings for ens37:
	Supported ports: [ TP ]
	Supported link modes:   10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Supported pause frame use: No
	Supports auto-negotiation: Yes
	......
	Link detected: no
```
Link detected: no 表示链路为 down 的状态。

**ethtool -d 查看寄存器信息，相关内容如下：**

```bash
longyu@longyu-pc:~$ sudo ethtool -d ens37  | grep -i 'Link'
      Link reset:                        reset
      Set link up:                       1
      Link up:                           link config
      Link speed:                        1000Mb/s
      Link State:                        Up
      Force Link Good:                   disabled
```

注意这里 Link State 状态变为 UP，这表明自协商成功。根据上文中引用的千兆光口自协商的过程，同时注意到我们的网卡支持自协商，我们用 ethtool -s 命令打开网卡的自协商功能，这之后 phy 的状态变为 UP 表明自协商成功，这与千兆光口自协商过程的第一种类型一致，两端都支持并开启了自协商，协商成功后两端的 phy 状态都变为了 UP。

这时候 ethtool 直接查看网卡，Link detected 显示为 no 表明链路状态为 down，为什么不是 UP 呢？

这里 phy 的状态由 DOWN 变为 UP 这是自协商成功的结果。这个是可以解释的。自协商的目的就是为了确定连接速度、双工模式这些配置，而这些配置都是要在 phy up 的状态下才有作用。

这时候直接使用 ifconfig 查看网卡信息，输出如下：

```bash
longyu@longyu-pc:~$ sudo ifconfig ens37 
ens37: flags=4098<BROADCAST,MULTICAST>  mtu 1500
        ether 00:0c:29:5e:ba:35  txqueuelen 1000  (Ethernet)
        RX packets 1154  bytes 672588 (656.8 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 136  bytes 16616 (16.2 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

上面的输出表明网卡的链路状态为 down，这与 ethtool 命令查看到的网卡状态为 no 是一致的。

## ethtool: Link detected: no 是怎样检测的？

这里我使用 ethtool-4.19 的源代码进行分析。

首先是 ethtool 中设定 ETHTOOL_GLINK 命令，调用 ioctl 函数获取链路状态。相关代码如下：

	edata.cmd = ETHTOOL_GLINK;
	err = send_ioctl(ctx, &edata);
	if (err == 0) {
		fprintf(stdout, "	Link detected: %s\n",
			edata.data ? "yes":"no");
		allfail = 0;
	} else if (errno != EOPNOTSUPP) {
		perror("Cannot get link status");
	}
edata.cmd 中填充的是 ethtool 中的子命令，属于 SIOCETHTOOL 下面的子命令。send_ioctol 函数的源码如下：

注意这里的子命令通过 ctx->ifr 来传递给 ioctl。

```c
int send_ioctl(struct cmd_context *ctx, void *cmd)
{
	ctx->ifr.ifr_data = cmd;
	return ioctl(ctx->fd, SIOCETHTOOL, &ctx->ifr);
}
```


这之后 ioctl 会进行分发，由 ioctl 到 sock_ioctl 到 dev_ioctl 到 dev_ethtool 适配层。dev_ethtool 适配层相关函数在内核路径下的 net/core/ethtool.c 文件中。

dev_ethtool 函数是一个大的分发函数，通过 switch 来将不同的 ethtool 子命令分发到不同的子函数调用之上。子函数里面的核心逻辑在于调用网卡内核接口 net_device 中注册的 ethtool_ops 虚函数表中的函数。

上面 Link detected 中使用的 ethtool 子命令为 ETHTOOL_GLINK，在 dev_ethtool 函数中被分发到 ethtool_get_link 子函数。相关代码如下： 

```c
	case ETHTOOL_GLINK:
		rc = ethtool_get_link(dev, useraddr);
		break;
```

ethtool_get_link 子函数的核心在于下面这行代码：

```c
edata.data = netif_running(dev) && dev->ethtool_ops->get_link(dev);
```
netif_running 函数在内核头文件路径 include/linux/netdevice.h 中定义，它通过检测 netdev 结构体中 state 变量的 __LINK_STATE_START 位来确定接口是否 running。

```c
static inline bool netif_running(const struct net_device *dev)
{
	return test_bit(__LINK_STATE_START, &dev->state);
}
```
了解了 ethtool_get_link 子函数的部分代码，我们可以发现，上文中提到的在网卡接口 down 的状态下进行自协商后，phy 的状态变为 UP，而 ethtool 输出的 Link detected 项为 no 的情况是正常的现象。

此时 ifconfig 显示的网卡状态不是 RUNNING，netif_running 将会返回 false，&& 语句之后的读取硬件寄存器中保存的链路状态的操作将被忽略，edata.data 将会返回 false，对应 ethtool 中 Link detected 项的输出为 no。

## dev->ethtool_ops->get_link(dev) vs rte_eth_link_get 
```dev->ethtool_ops->get_link(dev)```最终是通过访问网卡中的寄存器来获取链路状态。



dpdk 中的 rte_eth_link_get 函数根据 lsc 中断是否开启，有两种不同的处理方式。

1. lsc 中断使能

	原子读取 dev 结构体中的 eth_link 成员。这个成员只能在 interrupt host 线程中被更新。用户注册的 lsc 中断回调函数也是在 interrupt host 线程中被调用的，可以在 lsc 中断回调函数中改变 eth_link 的值。

2. lsc 中断关闭
	调用 dev_ops 中实现的 link_update 函数，该函数通过直接访问网卡寄存器来获取链路的最新状态。


在 lsc 中断关闭的情况下，rte_eth_link_get 与 dev->ethtool-ops->get_link(dev) 最终都是通过访问网卡寄存器来确定链路状态的。

至于说 ethtool 读到的状态与 dpdk 读到的网卡状态不一致，这是指 ethtool 中的 Link detected 中检测到的链路状态与 rte_eth_link_get 函数的输出不同。

**从上面的分析中我们可以发现，ethtool 中的 Link detected 输出 yes 的必备条件还有 netif_running 返回 true，而 rte_eth_link_get 却没有使用这个状态，这两者从逻辑上来说也不是在任何时候都会一致的。**

**综上所述，这个问题其实不是功能的问题，而是不了解功能的实现而误判的问题。**



