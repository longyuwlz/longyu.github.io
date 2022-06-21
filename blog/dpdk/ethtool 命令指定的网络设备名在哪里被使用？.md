使用 ethtool 时需要指定一个网络接口名称，这个名字究竟是在哪里被使用的呢？

## ethtool 命令中对网络设备名的使用
ethtool 程序会将用户指定的网络设备名拷贝到一个 ctx 中，这个  ctx 被用来构建 ioctl 执行的环境。从 ctx.devname ----> ctx.ifr.ifr_name。

ctx.ifr 最终作为 ioctl 系统调用的参数传递给内核。

## ifr_name 在内核中的什么地方被使用呢

在 dev_ioctl 中有如下代码：

```c
	case SIOCETHTOOL:
		dev_load(net, ifr->ifr_name);
		rtnl_lock();
		ret = dev_ethtool(net, ifr);
		rtnl_unlock();
		if (colon)
			*colon = ':';
		return ret;
```

ethtool 调用的 ioctl 最终是在上述代码中执行的。在上面的代码中 dev_load
首先使用 ifr_name 在网络设备接口不存在的情况下加载相应的模块，只有当用
户具有需要的权限之后才能加载成功。

这之后 ifr_name 在 dev_ethtool 中被再次使用。相关的代码如下：

```c
	struct net_device *dev = __dev_get_by_name(net, ifr->ifr_name);
```

这里通过 ifr_name 来检索到对应的 netdev 设备。成功则会获取到一个 net_device 结构。

## net_device 结构中的 ethtool_ops 成员
在 net_device 结构中我们可以发现如下的成员：


```c
    const struct ethtool_ops *ethtool_ops;
```

ethtool_ops 是 ethtool 类的虚函数表，ethtool 命令最终就是通过调用这个虚函数表中的函数来工作的。

## ethtool 与面向对象
这里也是面向对象思想的一个应用。

ethtool 可以看作一个超类，ethool_ops 这个虚函数表中定义了子类能够重载的函数集合。不同的 netdev 设备使用不同的驱动，驱动中实现自己的 ethtool 相关函数并填充到一个虚函数表中。在设备初始化的过程中通过 SET_ETHTOOL_OPS 这个宏来绑定不同的虚函数表，完成对 ethtool 子类的实例化。

## net/core/ethtool.c
内核源码 net/core/ethtool.c 中提供了一个适配层，实现了一系列 ethtool_xxx 函数，这些函数统一了 ethtool 的调用方式，它们并不关心 dev->ethtool_ops 到底被谁实现，只需要在函数指针存在的情况下调用即可，这样便屏蔽了不同 netdev 中 ethtool_ops 的区别，实现了类似 c++ 中的重载功能。





