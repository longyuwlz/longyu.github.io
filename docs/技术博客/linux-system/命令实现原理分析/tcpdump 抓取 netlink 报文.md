# tcpdump 抓取 netlink 报文
## 问题描述
dmesg 中不断的打印如下告警：

```bash
netlink: 4 byptes leftover after parsing attributes in process `server'.
```
网上搜索了下，发现这个问题应该是我们的程序向内核发送 netlink 消息的时候，**传递的消息长度参数不正确。**

搜索了下代码，有很多地方都调用了向内核发送 netlink 消息的代码，需要定位到具体是**哪一个 socket 发的消息有问题。**

## 定位过程
在上面的基础上，开始进一步的定位分析。主要做了如下尝试：

1. 查看程序 socket fd 文件描述符信息
	没有获取到相关的信息
2. lsof -p xx 
　没有查看到是哪个 netlink socket
3. strace -p xx
	strace 存在问题，strace 上去后没有任何输出，等了几分钟仍然没有任何输出
4. gdb -p 
	info os sockets 也不能看到 netlink socket

在上面的尝试中，strace 应该能够很快定位到问题，奈何我们用的 strace 存在问题，不能追踪到程序的系统调用。在这种情况下，我觉得也许可以抓取 netlink 报文来获取一些输入信息。

## 如何抓取 netlink 报文？
之前有用过 tcpdump 抓取普通接口的报文，而 netlink 报文却没有尝试抓取过。网上搜索了下，发现具体的操作也非常简单，主要过程有如下步骤：

1. modprobe nlmon
2. ip link add nlmon0 type nlmon
3. ip link set dev nlmon0 up
4. tcpdump -i nlmon0 -w netlinik.pcap

这里实际上使用了一个 nlmon 驱动模块，这个 nlmon 驱动模块会注册一个 netlink tap 口，用户态向内核发送 netlink 消息、内核向用户态发送 netlink 消息，报文都会经过这个 tap 口。

## 操作示例
具体的操作示例如下：

```bash
[longyu@debian-10:11:38:39] ~ $ sudo modprobe nlmon
[sudo] longyu 的密码：
[longyu@debian-10:11:38:45] ~ $ sudo ip link add nlmon0 type nlmon
[longyu@debian-10:11:39:07] ~ $ sudo ip link set dev nlmon0 up
[longyu@debian-10:11:39:12] ~ $ sudo tcpdump -i nlmon0 -w netlink.pcap
tcpdump: listening on nlmon0, link-type NETLINK (Linux netlink), capture size 262144 bytes
^C34 packets captured
37 packets received by filter
0 packets dropped by kernel
```
这里需要注意的是 tcpdump 一般**不支持**直接将抓取到的 netlink 报文**输出到终端的功能**，这里我将它写入到 pcap 文件中，这个文件可以使用 wireshark 来打开。

使用 wireshark 打开上面抓取到的 netlink 报文，可以看到 wireshark 能够解析 netlink 报文的字段，截图如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200930114131521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70#pic_center)
这里解析的这个包是于获取网络接口信息控制的，具体的字段信息在本文中就不进行解释了。


