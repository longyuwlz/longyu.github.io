# 使用 nlmon 驱动抓取 netlink 报文的原理
## 前言
在 [如何抓取 netlink 报文](https://blog.csdn.net/Longyu_wlz/article/details/108879156) 这篇博客中，我描述了使用 nlmon 驱动创建虚拟 tap 口抓取 netlink 报文的过程，在这篇文章中，我探讨下这一过程背后的原理。

## nlmon 驱动
nlmon 驱动源码位于内核源码树中 drivers/net/ 目录中，由单个源文件——nlmon.c 组成，其代码长度只有 150 多行。

与普通的驱动代码一样，它也有一个初始化与解初始化函数，这两个函数分别实现的功能是在内核中注册一个 rtnl_link_ops 结构，解除注册的 rtnl_link_ops 结构。

## rtnetlink link_ops 链表
这里首先需要指明的是，在 rtnetlink.c 中创建了一个 link_ops 链表，这个链表将**所有的 rtnl_link_ops 以 find 为唯一标识符链接起来**。

## 这里描述的 rtnl_link_ops 是什么东西呢？
**这里的 rtnl_link_ops 是 net device 中 netlink 相关操作的方法**，在每个 struct net 结构体中有一个指向 rtnl_link_ops 的指针，用以**实例化不同的 rtnl_link_ops。**

struct net_device 中的相关定义如下：

```c
  	const struct rtnl_link_ops *rtnl_link_ops;
```
这里我需要说明两点内容：

1. rtnl_link_register 函数与 rtnl_link_unregister 函数都涉及到了**对 link_ops 的操作。**
2. rtnl_link_ops 通过 struct net_device 中的 rtnl_link_ops 指针与一个 netdev **关联**起来，注册一个 rtnl_link_ops 并不涉及与 netdev 的关联，只需要在 link_ops 链表中**添加一个节点**就行，而当删除一个 rtnl_link_ops 时，就需要对 netdev 中使用到待删除的 rtnl_link_ops 的网络设备进行相应处理。

这里也说明其实 rtnl_link_ops 类似于一个**框架性**的功能，netdev 是它的**客户**，它本身的注册类似于扩展功能的行为，对 netdev 客户的正在使用的功能没有影响，但是当解注册时就需要考虑可能正在被一个 netdev 客户使用的场景。

下面我分别描述下 rtnl_link_ops 的注册与解注册相关函数的原理。

## rtnl_link_register 函数
rtnl_link_register 函数的主要逻辑及如下：

1. 使用 rtnl_link_ops 中的 **find** 字段检索 link_ops 链表，如果**存在**则返回 -EEXIST
2. find 字段检索 link_ops 链表发现待链入的 ops **不存在**则将传入的 ops 链入到 link_ops 中。

这里内核还对传入的 rtnl_link_ops 中的函数指针进行了**合法值校验**，**当 setup 函数值非空而 dellink 为空的时候**，内核将 dellink 设定为 **unregister_netdevice_queue** 函数。

同时需要注意的是 link_ops 是一个**共享**的数据结构，对它的修改需要进行**串行化**处理。

可以看到，在 rtnl_link_register 中对 link_ops 链表的修改是在占用了 rtnl 锁的条件下执行的，执行完成后释放 rtnl 锁就完成了注册的完整过程。

## rtnl_link_unregister 函数
相较 rtnl_link_register 而言，unregister 函数做了更多的事情，从这个 unregister 函数中我们可以看到一些更内部的原理。

其主要执行逻辑如下：

1. 获取 pernet_ops_rwsem 信号量，就获取此信号量是为了消除与 setup_net 及 cleanup_net 的竞争条件。（具体的场景目前我并不清楚！）

2. 调用 rtnl_lock_unregistering_all

rtnl_lock_unregisering_all 函数值得研究，其代码如下：

```c
/* Return with the rtnl_lock held when there are no network
 * devices unregistering in any network namespace.
 */
static void rtnl_lock_unregistering_all(void)
{
	struct net *net;
	bool unregistering;
	DEFINE_WAIT_FUNC(wait, woken_wake_function);

	add_wait_queue(&netdev_unregistering_wq, &wait);
	for (;;) {
		unregistering = false;
		rtnl_lock();
		/* We held write locked pernet_ops_rwsem, and parallel
		 * setup_net() and cleanup_net() are not possible.
		 */
		for_each_net(net) {
			if (net->dev_unreg_count > 0) {
				unregistering = true;
				break;
			}
		}
		if (!unregistering)
			break;
		__rtnl_unlock();

		wait_woken(&wait, TASK_UNINTERRUPTIBLE, MAX_SCHEDULE_TIMEOUT);
	}
	remove_wait_queue(&netdev_unregistering_wq, &wait);
}
```
上述函数，当没有任何一个 net namespace 中的 netdev 处于 unregistering 状态时它会直接返回并占有 rtnl_lock，当检测到有 netdev 处于 unregistering 状态时，它会设定 timeout 并将当前线程挂起等待，此函数**会等待所有 namespace 中的即将 unregistering 的 netdev 事件完成后返回并占有 rtnl_lock。在这一过程完成后此函数会将当前进程从 netdev_unregistering_wq 等待队列中移除。**

这里需要注意的是在 for_each_net 中通过判断 **dev_unreg_count** 的**值**来**判断是否有 netdev 待释放**，实际上 netdev 的释放过程使用了类似延后释放的机制，真正释放是在调用了 netdev_run_todo 后完成的，在 netdev_run_todo 中还会唤醒等待 netdev_unregistering 事件的进程，与唤醒相关的代码如下：

```c
		wake_up(&netdev_unregistering_wq);
```

wak_up 最终会调用 **__wake_up_common** 来执行预先注册的**唤醒事件函数**，实际上将挂起到等待队列中的**程序状态修改的过程**也是在这个函数中完成的。

上面提到的唤醒事件函数是 wait_queue_entry 结构体中的 func 函数指针。wait_queue_entry 结构体内容如下：

```ｃ
struct wait_queue_entry {
	unsigned int		flags;
	void			*private;
	wait_queue_func_t	func;
	struct list_head	entry;
};
```


3. 调用 __rtnl_link_unregister

此函数遍历所有的 netdev 结构，并使用 __rtnl_kill_links 来调用 netdev 中使用了传入的 rtnl_link_ops 的 dellink 函数，然后调用 unregister_netdevice_many 来 unregister 这些相关的 netdev。最终将 ops 从注册链表中移除就完成了所有的过程。

4. 释放 pernet_ops_rwsem 信号量

## nlmon_link_ops 
nlmon_link_ops 是一个 rtnl_link_ops 的实例，它通过调用上文描述的 rtnl_link_register 函数来完成工作。

rtnl_link_ops 中的 setup 函数在 nlmon 驱动中有自己的实现，其代码如下：

```c
static void nlmon_setup(struct net_device *dev)
{
	dev->type = ARPHRD_NETLINK;
	dev->priv_flags |= IFF_NO_QUEUE;

	dev->netdev_ops	= &nlmon_ops;
	dev->ethtool_ops = &nlmon_ethtool_ops;
	dev->needs_free_netdev = true;

	dev->features = NETIF_F_SG | NETIF_F_FRAGLIST |
			NETIF_F_HIGHDMA | NETIF_F_LLTX;
	dev->flags = IFF_NOARP;

	/* That's rather a softlimit here, which, of course,
	 * can be altered. Not a real MTU, but what is to be
	 * expected in most cases.
	 */
	dev->mtu = NLMSG_GOODSIZE;
	dev->min_mtu = sizeof(struct nlmsghdr);
}
```
这个 nlmon_setup 函数代码对 netdev 中的多个字段进行了设定，其中需要注意的是 netdev_ops 与 ethtool_ops，这两个字段表明 nlmon 实现了一组**虚拟网卡驱动**。

nlmon 驱动中 netdev_ops 结构体代码如下：

```c
static const struct net_device_ops nlmon_ops = {
	.ndo_init = nlmon_dev_init,
	.ndo_uninit = nlmon_dev_uninit,
	.ndo_open = nlmon_open,
	.ndo_stop = nlmon_close,
	.ndo_start_xmit = nlmon_xmit,
	.ndo_get_stats64 = nlmon_get_stats64,
};
```
这里 ndo_open 与 ndo_stop 是 ifconfig up、ifconfig down 最终调用到的函数接口。

这里我着重描述下 nlmon_open 函数的执行过程。首先贴上函数的代码：

```c
static int nlmon_open(struct net_device *dev)
{
	struct nlmon *nlmon = netdev_priv(dev);

	nlmon->nt.dev = dev;
	nlmon->nt.module = THIS_MODULE;
	return netlink_add_tap(&nlmon->nt);
}
```

这里调用了 netlink_add_tap 接口，这个接口可以理解为创建了一个 netlink 类型的 tap 口，tcpdump 抓取 netlink 消息实际上就是从这个 tap 口的接收与发送队列中获取 netlink 数据包的。

用户态发送 netlink 到内核态以及内核态发送 netlnk 到用户态，报文都会复制到这个注册的 netlink tap 口中，这样 tcpdump 就能够从这个 netlink tap 口中抓取到 netlink 报文了。

可以看到在 netlink 发送与接收的接口中都有调用  netlink_deliver_tap、 netlink_deliver_tap_kernel 来投递消息到 netlink tap 口中。


## tcpdump 抓取 netlink 包的原理
上面已经大致描述完了使用 nlmon 驱动抓取 netlink 报文的原理，不过对于 tcpdump 如何从内核抓取报文却没有进行描述，这里简单的提一提。

tcpdump 首先创建一个 **AF_PACKET** 类型的 **socket**，这个 socket 有自己**独立的 proto_ops 操作**。然后 tcpdump 通过 ioctl 获取 **nlmon0 网络接口**的 **ifindex**，这个 ifindex 被用来获取 **net_device** 结构。

tcpdump 的钩子函数在 af_packet 协议操作的 **bind** 函数中 **hook** 到对应的 **net_device** 结构中，在这个结构中**添加了一个协议**。

核心代码是调用 **register_prot_hook** 函数，此函数中主要通过 **dev_add_pack** 来完成工作。

dev_add_pack 函数代码如下：

```c
void dev_add_pack(struct packet_type *pt)
{
	struct list_head *head = ptype_head(pt);

	spin_lock(&ptype_lock);
	list_add_rcu(&pt->list, head);
	spin_unlock(&ptype_lock);
}
```
这里需要注意 ptype_head 函数，其代码如下：

```c
static inline struct list_head *ptype_head(const struct packet_type *pt)
{
	if (pt->type == htons(ETH_P_ALL))
		return pt->dev ? &pt->dev->ptype_all : &ptype_all;
	else
		return pt->dev ? &pt->dev->ptype_specific :
				 &ptype_base[ntohs(pt->type) & PTYPE_HASH_MASK];
}
```
这里 pt->dev 就是**待 hook** 的 dev，在调用此函数前已经设定了此字段，这里的目标就是 **nlmon0 的 net_device 结构体**。

可以看到 dev_add_pack 实际上是修改 **dev->ptype_all、dev->ptype_specific 链表**的内容。

底层接口在收到包后要进行**协议栈分发**，这时候就会访问 **ptype_all** 与 **ptype_specific** 链表，将报文 **deliver** 到链表中注册的协议中，这里的注册的 af_packet 协议也会被**推送**报文，这样 af_packet 协议就能够得到一份报文的**拷贝**，并传递给**抓包模块**，就完成了抓包的过程。

与上面描述相关的代码如下：

```c
static int __netif_receive_skb_core(struct sk_buff *skb, bool pfmemalloc,
				    struct packet_type **ppt_prev)
{

...............
	list_for_each_entry_rcu(ptype, &ptype_all, list) {
		if (pt_prev)
			ret = deliver_skb(skb, pt_prev, orig_dev);
		pt_prev = ptype;
	}

	list_for_each_entry_rcu(ptype, &skb->dev->ptype_all, list) {
		if (pt_prev)
			ret = deliver_skb(skb, pt_prev, orig_dev);
		pt_prev = ptype;
	}
```

## 总结
本文对 nlmon 驱动以及 tcpdump 抓取 netlink 报文的工作原理进行了描述。尽管 nlmon 驱动的代码内容很少，但是其**依赖**的函数接口的代码量却不容小觑。

同时也必须指出的是 tcpdump 工具的原理也比表面上看上更复杂一些，不过对其原理进行研究有助于提高我对协议栈工作原理的了解。

这篇文章发出，算上私密的两篇文章，就完成了 200 篇文章的目标，这个目标的实现值得庆祝，同时也意味着我能够挑战更高的目标，我想这也是不成问题的。



