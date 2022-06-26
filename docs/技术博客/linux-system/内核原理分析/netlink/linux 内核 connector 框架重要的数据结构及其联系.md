# linux 内核 connector 框架重要的数据结构及其联系
## connector 中重要的数据结构
connector 中有几个重要的数据结构：

1. cn_queue_dev
2. cn_callback_id
3. cn_callback_entry
4. cn_dev

### cn_queue_dev 与 cn_dev
cn_queue_dev 与 cn_dev 结构体中都有一个指向 struct sock 的指针，使用这个**指针与网络模块关联起来**。

### cn_callback_entry 与 cn_callback_id
cn_callback_entry 是 connector 内部提供的**注册事件回调函数**的事件抽象，其中有一个指向一个 struct cn_queue_dev 的指针，使用这个指针来绑定到一个 cn_queue_dev 上。同时每一个 callback_entry本身需要唯一标识，这是通过 **cn_callback_id** 结构体来完成的。

在注册一个新的 callback_entry 的时候会先确定是否已经注册，如果已经注册则返回错误，否则继续完成注册的过程。

具体的结构体定义如下：

```c
struct cn_queue_dev {
	atomic_t refcnt;
	unsigned char name[CN_CBQ_NAMELEN];

	struct list_head queue_list;
	spinlock_t queue_lock;

	struct sock *nls;
};

struct cn_callback_id {
	unsigned char name[CN_CBQ_NAMELEN];
	struct cb_id id;
};

struct cn_callback_entry {
	struct list_head callback_entry;
	refcount_t refcnt;
	struct cn_queue_dev *pdev;

	struct cn_callback_id id;
	void (*callback) (struct cn_msg *, struct netlink_skb_parms *);

	u32 seq, group;
};

struct cn_dev {
	struct cb_id id;

	u32 seq, groups;
	struct sock *nls;
	void (*input) (struct sk_buff *skb);

	struct cn_queue_dev *cbdev;
};
```
##  connector 驱动的源码
connector 驱动主要由两个源文件实现：

1. connector.c
2. cn_queue.c

connector.c 中写的是 connector 模块的**初始化与解初始化代码以及封装后的标准的 netlink 消息发送函数以及添加、删除、执行 connector 事件回调函数的
功能。**

cn_queue.c 中写的是对 **cn_queue_dev 的相关操作的代码**。


