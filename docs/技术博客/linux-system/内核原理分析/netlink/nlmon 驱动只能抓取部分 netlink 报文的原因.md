# nlmon 驱动只能抓取部分 netlink 报文的原因
## 前言
我在　[tcpdump 抓取 netlink 报文](https://blog.csdn.net/Longyu_wlz/article/details/108879156) 这篇博文中描述了如何使用 nlmon 驱动抓取 netlink 报文的过程，在实际的测试中我发现对于一些 netlink 消息，例如 usb 设备热插拔事件发送的 netlink 消息就不能抓取到。

## 再次描述 tcpdump 抓取 netlink 报文的原理
我在 [使用 nlmon 驱动抓取 netlink 报文的原理](https://blog.csdn.net/Longyu_wlz/article/details/108883293) 这篇博文中描述了通过 nlmon 驱动抓取 netlink 报文的原理，其核心是创建了一个 **netlink tap** 口，当内核在**发送、接收** netlink 消息时，报文会 **deliver** 到这虚拟的 netlink tap 口上，tcpdump 就是通过这个 tap 口来抓取 netlink 消息的。

## netlink_deliver_tap 函数
上文提到的 deliver netlink 消息到 tap 口上，实际是通过调用 netlink_deliver_tap 函数来完成的。

netlink_deliver_tap 又会调用 __netlink_deliver_tap 函数，在 __netlink_deliver_tap 函数中有如下相关代码：

```c
static void __netlink_deliver_tap(struct sk_buff *skb, struct netlink_tap_net *nn)
{
	int ret;
	struct netlink_tap *tmp;

	if (!netlink_filter_tap(skb))
		return;
```
可以看到，_netlink_deliver_tap 函数会先调用 netlink_filter_tap 函数来**过滤**发送到 tap 口的 netlink 消息，当 netlink_filter_tap 函数返回 **false** 后 _netlink_deliver_tap 函数**直接返回**，相关的 netlink 消息就**不会过 tap 口**，tcpdump 自然也就**抓取不到**这部分报文。

## netlink_filter_tap
netlink_filter_tap 函数的代码如下：

```c
static bool netlink_filter_tap(const struct sk_buff *skb)
{
	struct sock *sk = skb->sk;

	/* We take the more conservative approach and
	 * whitelist socket protocols that may pass.
	 */
	switch (sk->sk_protocol) {
	case NTLINK_ROUTE:
	case NETLINK_USERSOCK:
	case NETLINK_SOCK_DIAG:
	case NETLINK_NFLOG:
	case NETLINK_XFRM:
	case NETLINK_FIB_LOOKUP:
	case NETLINK_NETFILTER:
	case NETLINK_GENERIC:
		return true;
	}

	return false;
}
```
可以看到它通过判断 sock 中的 **sk_protocol** 字段的值进行分发，仅仅当 sk_protocol 的值是 switch 中列举的那些 NETLINK 协议消息类型时它才会返回 true，否则它会返回 false，这就是 tcpdump 无法抓取到诸如 usb 设备热插拔时内核发送的 netlink 报文的原因。

## 热插拔事件 netlink 对应的 sk_protocol 字段的值
热插拔事件处理相关的代码在内核源码树的 **lib/kobject_uevent.c** 中，着实让我一顿好找。这里我们只需要看看其初始化代码中创建 netlink sock 的函数调用就可以了。相关调用代码如下：

```c
ue_sk->sk = netlink_kernel_create(net, NETLINK_KOBJECT_UEVENT, &cfg);
```

此函数最终会调用到 **__netlink_create** 并在其中创建一个 **struct sock 接口**，然后将该结构体中的 sk_protocol 字段赋值为 **NETLINK_KOBJECT_UEVENT**。

这样在 **netlink_filter_tap** 中判断到这个 **sk_protocol** 后，函数将会返回 **false**，不会将相关的报文添加到 **netlink tap** 口中，自然也就抓取不到这种类型的报文了。

