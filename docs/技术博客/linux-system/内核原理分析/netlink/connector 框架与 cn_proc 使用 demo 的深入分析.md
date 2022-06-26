# connector 框架与 cn_proc 使用 demo 的深入分析
## 前言
我在 [替代传统 ps、top 等进程监控程序的方案](https://blog.csdn.net/Longyu_wlz/article/details/108879110) 这篇文章中描述了目前现有的两种替代 ps、top 等进程监控程序的方案，在 [linux 内核 connector 框架重要的数据结构及其联系](https://blog.csdn.net/Longyu_wlz/article/details/109128656) 这篇文章我描述了 connector 框架的几个重要数据结构及其之间的关联。

在本篇文章中借助 **cn_proc** 的使用 demo 将这些过程串起来，同时也对一些其它的细节进行描述。

### demo 程序的关键代码总览

 [替代传统 ps、top 等进程监控程序的方案](https://blog.csdn.net/Longyu_wlz/article/details/108879110) 中 cn_proc 使用示例 demo 程序中，有下面几个关键步骤：

**1. 创建一个 NETLINK socket，指定 proto 为 NETLINK_CONNECTOR**

```c
    nl_sock = socket(PF_NETLINK, SOCK_DGRAM, NETLINK_CONNECTOR);
```

**2. bind netlink 到 sa_nl 表示的地址中，这里的关键点是 nl_groups 设置的
    CN_IDX_PROC 组号。**
    
```c
    sa_nl.nl_family = AF_NETLINK;
    sa_nl.nl_groups = CN_IDX_PROC;
    sa_nl.nl_pid = getpid();

    rc = bind(nl_sock, (struct sockaddr *)&sa_nl, sizeof(sa_nl));
```

**3. 向内核发送 netlink 消息以通知内核以增加 proc_event_num_listeners 计
数值**

```c
    set_proc_ev_listen(nl_sock, true)
```

**4. 接收内核发送的 netlink 消息并解析消息，将获取到的数据打印到终端中**

```c
    rc = handle_proc_ev(nl_sock);
```

**5. 程序退出，向内核发送 netlink 消息以通知内核减少　proc_event_num_listeners 计数值**

```c
    set_proc_ev_listen(nl_sock, false)
```
### demo 程序的关键代码对应内核中的相关行为
在清楚了 demo 程序的关键过程后，我们继续探讨下这些过程背后对应
**内核中有怎样的执行过程**，这里我只讲几个重要的点，

#### 1. 创建一个 NETLINK socket，指定 proto 为 NETLINK_CONNECTOR
这个过程是所有过程中最为复杂的内容，单独发一篇博客进行分析，请访问[cn_proc demo 中创建一个 netlink socket 背后的内核行为](https://blog.csdn.net/Longyu_wlz/article/details/108940087)。
#### 2. bind netlink 到 sa_nl 表示的地址中，这里的关键点是 nl_groups 设置的 CN_IDX_PROC 组号。
bind 系统调用最终会调用到 netlink 的 proto_ops 中的 **netlink_bind** 方法。**netlink_bind** 函数中会使用 sock 字段中的 sk_protocol 的值，使用该值为下标从 nl_table 数组中获取相应的表项，并将 sock 结构体插入到此表项中，这个 sk_protocol 在创建 socket 的时候被赋值为转化后的 NETLINK_CONNECTOR 值。

**此表项属于 NETLINK_CONNECTOR，在 connector 框架的初始化代码中注册到 nl_table 中。**

**netlink_bind** 中另外一个非常重要的工作是在 NETLINK_CONNECTOR 使用的 nl_table 中的项目中，在其 **mc_list** 链表中**添加**一个 **sock** 节点。

相关代码如下：
```c
		sk_add_bind_node(sk, &nl_table[sk->sk_protocol].mc_list);
```
这个 mc_list 在由内核向用户态发送广播 netlink 消息时使用。

其它操作这里不进行说明。

#### 3. 向内核发送 netlink 消息以通知内核增加 proc_event_num_listeners 计数值
完成了 bind 后，就能够与内核进行通信，这时 demo 会首先向内核发送一条 netlink 消息。demo 中调用 send 接口，在内核中最终会调用到 **netlink_sendmsg** 函数。

**netlink_sendmsg** 函数中**解析** msg 头获取到**目的组与目的端口 id**，这两个字段在 netlink_boradcast、netlink_unicast 函数中被使用。

这里使用的是 **netlink_unicast** 函数，这里目的端口被用来查找对应的 sock 结构，这里的目标就是 connector 初始化时创建的 sock 结构体。

通过目的 port id 获取 sock 结构体内容通过如下代码来实现：

```c
	sk = netlink_getsockbyportid(ssk, portid);
```

完成了这个过程后判断**报文是否发向内核**，如果是则调用 **netlink_unicast_kernel** 函数，在 **netlink_unicaset_kernel** 函数中调用 **netlink_sock** 中注册的 **netlink_rcv** 函数。对应于 connector 框架中的 **cn_rx_skb** 函数，此函数核心代码如下：

```c
		err = cn_call_callback(skb_get(skb));
```

可以看到，它执行预先注册的回调函数，对于 cn_proc 驱动而言，这个函数就是 cn_proc_mcast_ctl 函数，其代码如下：

```c
static void cn_proc_mcast_ctl(struct cn_msg *msg,
			      struct netlink_skb_parms *nsp)
{
	enum proc_cn_mcast_op *mc_op = NULL;
	int err = 0;

	if (msg->len != sizeof(*mc_op))
		return;

	/* 
	 * Events are reported with respect to the initial pid
	 * and user namespaces so ignore requestors from
	 * other namespaces.
	 */
	if ((current_user_ns() != &init_user_ns) ||
	    (task_active_pid_ns(current) != &init_pid_ns))
		return;

	/* Can only change if privileged. */
	if (!__netlink_ns_capable(nsp, &init_user_ns, CAP_NET_ADMIN)) {
		err = EPERM;
		goto out;
	}

	mc_op = (enum proc_cn_mcast_op *)msg->data;
	switch (*mc_op) {
	case PROC_CN_MCAST_LISTEN:
		atomic_inc(&proc_event_num_listeners);
		break;
	case PROC_CN_MCAST_IGNORE:
		atomic_dec(&proc_event_num_listeners);
		break;
	default:
		err = EINVAL;
		break;
	}

out:
	cn_proc_ack(err, msg->seq, msg->ack);
}
```

此函数首先解析报文，然后根据 **mc_op** 进行分发，核心是对 **proc_event_num_listeners** 变量的**原子增减**，完成后调用 **cn_proc_ack** 函数发送一个 netlink ack 消息到用户态表明成功接收。

#### 4. 接收内核发送的 netlink 消息并解析消息，将获取到的数据打印到终端中
用户态程序调用 recv 来捕获内核发送给用户态的 netlink 消息，最终调用的函数接口是 **netlink_recvmsg** 函数，此函数的主要工作原理是遍历 sock 中的 **sk_receive_queue** 链表，尝试从中获取一个 skb。

对于 cn_proc 驱动而言，当有进程状态发生变化后，会调用 **cn_netlink_send** 来发送不同内容的 neltink 消息到用户态中，这个函数最终会调用 netlink_broadcast、netlink_unicast 函数。

对于从内核发向用户态的 netlink 消息，netlink_broadcast 会使用到我上文中描述的 **mc_list** 链表，它访问的是 NETLINK_CONNECTOR 的 nl_table 中的 mc_list 链表的内容，**会对每一个挂到这个链表上的 sock 结构执行发送操作。**

相关代码如下：

```c
	sk_for_each_bound(sk, &nl_table[ssk->sk_protocol].mc_list)
		do_one_broadcast(sk, &info);
```
这里 ssk->sk_protocol 中的 sk_protocol 是在 bind 过程中赋值的，它保存的就是 NETLINK_CONNECTOR 在 nl_table 数组中的下标。

do_one_broadcast 通过调用如下函数完成发送的过程:

```c
static int __netlink_sendskb(struct sock *sk, struct sk_buff *skb)
{
	int len = skb->len;

	netlink_deliver_tap(sock_net(sk), skb);

	skb_queue_tail(&sk->sk_receive_queue, skb);
	sk->sk_data_ready(sk);
	return len;
}
```

这个函数非常简单，首先将报文发送到 netlink_tap 口，然后将报文追加到一个 sock 结构体的接收队列中，最后再调用 **sk_data_ready** 函数做一些额外的处理，这就完成了所有的过程。

当将报文追加到一个 sock 结构体的接收队列中时，用户态程序调用 read 接口就能够从自己绑定的 sock 结构体中获取到相应的报文，这样用户程序就能够成功接收到报文。

netlink_unicast 除了**获取目的 sock 结构体的过程**与 broadcast 方式**不同**外，其它的处理过程类似 broadcast 方式。

#### ５. 向内核发送 netlink 消息以通知内核减少 proc_event_num_listeners 计数值
此过程与第 3 步的过程原理相同，区别之处只在于它会减少 proc_event_num_listeners 计数值，其它的过程就不再描述了。

## 总结
本文篇幅很长，其中描述了 netlink 报文收发的大致流程，一些细节仍旧需要完善！但大的方向上的数据流动过程还是抓住了，同时也提高了我对 linux 网络协议栈的认识。

本文仅仅列出了关键代码，并不像以前写的一些文章一样每一个函数都列举完整的代码，这算作一个进步。写完了后再反思反思，不免觉得这样的过程倾向于描述不同部分的关联，面向的是完整的框图，可以坚持这样写下去，至少对于 linux 内核代码的研究可以这样干！

## 参考链接
https://lwn.net/Articles/157150/


