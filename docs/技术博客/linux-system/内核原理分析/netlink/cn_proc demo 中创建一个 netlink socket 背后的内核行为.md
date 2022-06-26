# cn_proc demo 中创建一个 netlink socket 背后的内核行为
## 前言
本文中对 netlink socket 建立过程中的 socket 系统调用对应内核中的行为进行了分析，它围绕用户态程序中的如下代码展开：

```c
    nl_sock = socket(PF_NETLINK, SOCK_DGRAM, NETLINK_CONNECTOR);
```
## NETLINK socket 
上述代码旨在创建一个 **NETLINK socket**，从字面意义上其实可以看出来是对 socket 的一种限定，可以将 netlink socket 看做是 socket 的一种**子类**。

## socket 系统调用的两个主要过程
socket 系统调用的主要有两个过程：

1. 调用 sock_create 创建一个 socket 结构
2. 调用 sock_map_fd 将 socket 映射为一个文件描述符（与标准的 read、write 等系统调用兼容）

这里我只讲讲 sock_create 函数的关键过程。

## sock_create 函数的参数
首先，看看这里的调用 sock_create 传入的参数，内核函数调用代码如下：

```c
	retval = sock_create(family, type, protocol, &sock);
```
对应上面的 demo，family 为 PF_NETLINK，protocol 为 NETLINK_CONNECTOR。

## sock_create 函数的主要执行过程
sock_create 函数的主要过程如下：

>1. 调用 sock_alloc 函数创建一个 socket 
> 2. 调用 net_families 结构体表中 PF_NETLINK 项目的 create 函数，创建与 netlink 协议相关的数据结构

sock_alloc 通过调用 **sock_alloc_inode** 从 **sock_inode_cache** 中分配一个 **struct socket_alloc** 结构体内容，此结构体定义如下：

```c
struct socket_alloc {
	struct socket socket;
	struct inode vfs_inode;
};
```
可以看到它由一个 socket 结构体与一个 inode 结构体组成，这里调用到 sock_alloc_inode 之前已经**预先挂载了一个 sock_fs_type 类型的虚拟文件系统**，这个虚拟文件系统的 mount 函数为 **sockfs_mount**，它通过 **mount_pseudo_xattr** 注册了一个名为 "socket:" 的文件系统，并将 **super_operations** 设置为 **sockfs_ops** 结构体， sockfs_ops 结构体内容如下：

```c
static const struct super_operations sockfs_ops = {
	.alloc_inode	= sock_alloc_inode,
	.destroy_inode	= sock_destroy_inode,
	.statfs		= simple_statfs,
};
```
sock_alloc 中实际是通过调用 sockfs_ops 中的 **sock_alloc_inode** 函数从 **sock_inode_cachep** **slab** 中申请空间的。

## pf->create 函数调用
sock_create 函数完成了一个 socket 结构体的创建后，它会根据 family 中指定的**协议族类型**，来调用 net_proto_family ops 中的 create 函数。

netlink 的 net_proto_family ops 结构体定义如下：

```c
 static const struct net_proto_family netlink_family_ops = {
	.family = PF_NETLINK,
	.create = netlink_create,
	.owner	= THIS_MODULE,	/* for consistency 8) */
};
```

netlink_create 函数通过调用 sk_alloc 来创建一个 netlink_sock 结构体，netlink_sock 结构体的**第一个字段**是 **struct sock** 结构体，这意味着可以很方便的使用**指针强转**来**将一个 netlink_sock 结构体转化为一个 sock 结构体**。

函数调用代码如下：

```c
	sk = sk_alloc(net, PF_NETLINK, GFP_KERNEL, &netlink_proto, kern);
```
值得注意的是 sk_alloc 函数并**不使用** netlink_create 中的 **protocol** 参数，它额外使用了一个 netlink_proto 结构体，结构体内容如下：

```c
static struct proto netlink_proto = {
	.name	  = "NETLINK",
	.owner	  = THIS_MODULE,
	.obj_size = sizeof(struct netlink_sock),
};
```
这里的 **obj_size** 指定了**申请的 sock 结构体的大小**，它是**整个 netlink_sock 结构体**的大小，这个参数在**未使用** proto->slab 的情况下传递给 **kmalloc** 函数使用。

sk_alloc 中完成了创建一个 sock 结构体后它会调用 sock_net_set 函数设定 sock 结构体中的 sk_net 字段的值。

## sock 结构体重要字段初始化
完成了 sock 结构体的创建后，__netlink_create 函数调用 **sock_init_data** 来初始化其中的一些重要的字段，在这个函数中完成 **socket 与 sock 结构体指针的互指**，在这一步完成后，我们就能够**通过 socket 结构体访问到 sock 结构体**，同时也能够**通过 sock 结构体访问到 socket 结构体**。

其它字段的初始化就不进一步描述了。

## protocol 参数的使用
**__netlink_create** 函数中的一个关键的操作是设定 sock 结构体中的 **sk_protocol 字段**，这个字段的值由**边界检查后的 protocol 值**填充，是非常重要的一个字段，它在 bind 的时候会使用到！！

相关的代码如下：

```c
	sk->sk_protocol = protocol;
```
执行完成 netlink family_ops 中的 create 函数调用后，socket 系统调用通过 **sock_map_fd** 将 sock 结构映射到一个文件描述符上，然后将描述符返回，至此 **socket 系统调用完成。**

