# linux 中 phy 驱动框架简析
## 描述文档在哪里？

Documentation/net/phy.txt

## phy 的驱动代码
drivers/net/phy/*

## 设计 phy 驱动框架的目的

大部分网络设备由向 MAC 层提供接口的多个寄存器的集合组成，MAC 层通过 PHY 与物理链路连接。

phy自身要解决**与对端网络链接时链路参数协商的功能**，并且提供一个寄存器接口让驱动来确定当前选择的配置，同时驱动也能够配置那些 phy 运行的设置。

phy与网络设备有明确的区别，并符合寄存器的标准布局。常见的网卡设备设计中会在网卡驱动中集成 phy 的管理代码。这样的方式产生了一大堆**不能复用**的代码。同时，在一些具有多个以太网控制器并连接到相同总线的设备上，要确保安全的使用总线相对困难。

phy 也是一种设备，用于访问 phy 的管理总线实际上也是一种总线，phy 抽象层就是这样对待它们的。这样做的好处如下：

1. 增加代码的可复用性
2. 提高整个代码的可维护性
3. 加速新驱动、新系统开发的时间

## phy 驱动提供的功能
每一个 phy 驱动的行为由以下多个函数指针代表的方法组成：

函数名称     | 功能描述
-------- | -----
soft_reset  | 执行 phy 的软件复位
config_init  | 在 phy 复位后将 phy 配置为一个既定的状态
probe  | 创建 phy->priv 并执行类似驱动绑定的过程
suspend/resume | 电源管理挂起与恢复功能
config_aneq | 修改速率双工模式自协商等配置
aneq_done | 驱动自协商的结果
read_status | 获取当前的速率双工与自协商配置状态
ack_interrupt | 清楚挂起的中断
did_interrupt | 检查是否 phy 触发了一个中断信号
config_intr | 开启、关闭中断
remove | 当驱动被移除时调用的接口
ts_info | 请求查询 HW 时间戳状态
hwtstap | 设置 phy 的 HW时间戳配置
rxtstamp | 在 phy 这一层为 skb 请求一个接收时间戳
txtsamp | 在 phy 这一层为 skd 请求一个发送时间戳
set_wol | 使能 Wake-on-Lan
get_wol | 获取 Wake-on-Lan 状态
read_mmd_indirect | 读取 phy MMD 间接寄存器
write_mmd_indirect | 写入 phy MMD 间接寄存器
.................. | ...................

在常见的网卡驱动中，phy 一般作为驱动内部的组件，每个驱动都有独立的操作函数来对 phy 进行操作，也就是说网卡会直接调用类似 phy_ops 中的虚函数来使用 phy 的功能。而对于这种 phy 驱动而言，它与网卡驱动是独立的，那么**怎样将网卡驱动与 phy 驱动关联起来呢？**

## 连接 phy 

有时在启动过程中，网络驱动需要建立网络设备与 phy 设备之间的连接。在这种情况下，phy 的总线和驱动及其它所有相关的部分都需要被加载，phy 进入就绪状态等待连接。

在这个条件下，有几种不同的连接到 phy 的方式。

1. phy 抽象层控制一切，并且只在链路状态改变的时候调用网络驱动，网卡能够做出反应

2. phy 抽象层控制除中断外的所有状态
3. phy 抽象层控制一切状态，但是每秒在网络驱动中检测一次状态，这样的过程允许网络驱动在 phy 抽象层反应之前做出响应
4. phy 抽象层只提供函数库，网络设备自行调用这些函数来更新状态并且配置 phy


## 让 phy 抽象层控制一切

如果你选择使用第一种方式，连接到 phy 非常简单，主要有以下过程：

首先你需要一个对链接状态改变做出响应的函数，这个函数的原型如下：


```c
   static void adjust_link(struct net_device *dev);
```

然后你需要知道连接到网卡设备的 phy 的设备名称。这个名称看上去像 "0:00" 这种格式，第一个数字是总线 id，第二个数字是在总线上的 phy 地址。一般而言，总线负责唯一标识自己的 id.

现在，可以调用如下函数连接到 phy:

```c
   phydev = phy_connect(dev, phy_name, &adjust_link, interface);
```

phydev 是一个指向 phy_device 结构体的指针，该结构体代表了 phy。如果 phy_connect 执行成功，它将会返回这个指针，这里的 dev 参数是指向你的网络设备的。一旦完成，这个函数将会启动 phy 的软件状态机并且注册 phy 的中断，如果 phy 支持的话。phydev 结构体将会提供当前状态信息，尽管在这个点 phy 还没有真正运行。

## phydev 
phy_connect 获取到 phydev 结构体将作为 phy 框架提供的 api 接口的参数传递到不同的 api 中，该参数代表一个 phy 的实例化对象，这相当于 C++ 中的隐式 this 指针，这是 c 语言实现面向对象的常用手法。


include/linux/phy.h 中的相关函数接口声明内容部分列举如下：

```C
 949 void phy_disconnect(struct phy_device *phydev); 
 950 void phy_detach(struct phy_device *phydev);
 951 void phy_start(struct phy_device *phydev);
 952 void phy_stop(struct phy_device *phydev);
 953 int phy_start_aneg(struct phy_device *phydev);
 954 int phy_aneg_done(struct phy_device *phydev);
 955 int phy_speed_down(struct phy_device *phydev, bool sync);
 956 int phy_speed_up(struct phy_device *phydev);
 957 
 958 int phy_stop_interrupts(struct phy_device *phydev);
 959 int phy_restart_aneg(struct phy_device *phydev);
 960 int phy_reset_after_clk_enable(struct phy_device *phydev);
```

可以看到这些接口都需要传入一个 phydev 参数，这与上文的描述一致。
## phy 设备的硬件结构

阅读 phy 驱动框架发现 phy 设备实际是挂到 mdio 总线中，phy 驱动框架的主要源文件名称如下：

1. phy_device.c
2. phy-core.c
3. phy.c

phy_device.c 中是 phy 设备注册与释放相关的代码。

phy-core.c、phy.c 中是对获取、设定 phy 信息的封装层，这一层的函数大都要访问 phy_driver 实例中的不同字段来完成其功能。


摘录如下 api 接口作为示例：
```c
/**
 * phy_print_status - Convenience function to print out the current phy status
 * @phydev: the phy_device struct
 */
void phy_print_status(struct phy_device *phydev)
{
	if (phydev->link) {
		netdev_info(phydev->attached_dev,
			"Link is Up - %s/%s - flow control %s\n",
			phy_speed_to_str(phydev->speed),
			phy_duplex_to_str(phydev->duplex),
			phydev->pause ? "rx/tx" : "off");
	} else	{
		netdev_info(phydev->attached_dev, "Link is Down\n");
	}
}
EXPORT_SYMBOL(phy_print_status);
```

这个 phy_print_status 接口通过访问 phydev 结构体中的相应字段的值来打印当前的 phy 状态。

与这个接口不同的另外一类调用**实例化 phy 中的方法**的一个示例函数如下：

```c
/**
 * phy_clear_interrupt - Ack the phy device's interrupt
 * @phydev: the phy_device struct
 *
 * If the @phydev driver has an ack_interrupt function, call it to
 * ack and clear the phy device's interrupt.
 *
 * Returns 0 on success or < 0 on error.
 */
static int phy_clear_interrupt(struct phy_device *phydev)
{
	if (phydev->drv->ack_interrupt)
		return phydev->drv->ack_interrupt(phydev);

	return 0;
}
```

该函数功能是回应 phy 的设备中断，它展示了真正的行为封装，调用 phydev 中实例化的函数接口 ack_interrupt 来实现其功能。


## stmmac 网卡驱动中的相关应用

stmmac 网卡中就使用了 phy 框架来控制 phy，其驱动中与连接 phy 相关的代码摘录如下：

```C
    if (priv->plat->phy_node) {
                phydev = of_phy_connect(dev, priv->plat->phy_node,
                                        &stmmac_adjust_link, 0, interface);
        } else {
                if (priv->plat->phy_bus_name)
                        snprintf(bus_id, MII_BUS_ID_SIZE, "%s-%x",
                                 priv->plat->phy_bus_name, priv->plat->bus_id);
                else
                        snprintf(bus_id, MII_BUS_ID_SIZE, "stmmac-%x",
                                 priv->plat->bus_id);

                snprintf(phy_id_fmt, MII_BUS_ID_SIZE + 3, PHY_ID_FMT, bus_id,
                         priv->plat->phy_addr);
                pr_debug("stmmac_init_phy:  trying to attach to %s\n",
                         phy_id_fmt);

                phydev = phy_connect(dev, phy_id_fmt, &stmmac_adjust_link,
                                     interface);
        }
```

这里就调用了我们上文提到过的 phy_connect 来与 phy 建立连接，同时传入了 stmmac_adjust_link 回调函数，在 phy 状态变化的时候调用。


## 一个问题
阅读源码时发现 drivers/phy 目录中并不是上文描述的 phy 驱动框架的目录，与上文描述的 phy 驱动框架相关的目录是 drivers/net/phy/。

这两个目录下的驱动功能完全不同，最开始我查看 drivers/phy 中的代码，读了一会发现不对，然后才发现应该阅读 drivers/net/phy 目录中的代码。

## intel 82599 dpdk pmd 驱动中 phy_ops 中提供的功能

在常见的 pci 接口的网卡中，phy 一般直接集成到网卡上。尽管如此，网卡驱动中还是有对 phy 功能的抽象。这里我列举 ixgbe dpdk pmd 驱动中 phy_ops 的实例来与内核框架中 phy 的功能函数进行对比。


```c
2231 static const struct ixgbe_phy_operations phy_ops_82599 = { 
2232     .identify       = &ixgbe_identify_phy_82599,
2233     .identify_sfp       = &ixgbe_identify_module_generic,
2234     .init           = &ixgbe_init_phy_ops_82599,
2235     .reset          = &ixgbe_reset_phy_generic,
2236     .read_reg       = &ixgbe_read_phy_reg_generic,
2237     .write_reg      = &ixgbe_write_phy_reg_generic,
2238     .setup_link     = &ixgbe_setup_phy_link_generic,
2239     .setup_link_speed   = &ixgbe_setup_phy_link_speed_generic,
2240     .read_i2c_byte      = &ixgbe_read_i2c_byte_generic,
2241     .write_i2c_byte     = &ixgbe_write_i2c_byte_generic,
2242     .read_i2c_sff8472   = &ixgbe_read_i2c_sff8472_generic,
2243     .read_i2c_eeprom    = &ixgbe_read_i2c_eeprom_generic,
2244     .write_i2c_eeprom   = &ixgbe_write_i2c_eeprom_generic,
2245     .check_overtemp     = &ixgbe_tn_check_overtemp,
2246 };
2247 
```

这里主要的函数接口内容如下：

函数名称     | 功能描述
-------- | -----
identify | 识别接口
identify_sfp | 识别 sfp 接口
init | phy 初始化
reset | phy 复位
read_reg、write_reg | 读写 phy 寄存器内容
setup_link、setup_ilnk_speed | 配置链路状态
read_i2c_byte、write_i2c_byte | 读取、写入 i2c 字节值
...... | .......

可以看到这里 phy_ops 抽象出来的 phy 的功能要比 linux 内核中 phy 驱动框架提供的要少，这并不代表它具有的功能少，实际上其它也能划到 phy 的功能零散的分布在网卡驱动的其它部分，这说明这里对 phy 功能的抽象并不完全。

