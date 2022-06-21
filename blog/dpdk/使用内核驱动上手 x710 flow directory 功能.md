# 环境介绍
i40e 驱动版本为 5.0 内核主线版本，网卡为 x710 网卡。需要测试 flow directory 功能能否正常使用。

# 第一个问题：不支持 flow-type 为 ether

使用下面这条命令，设定一个 flow-type 为 ether 类型的过滤条件时报了 NOTSUPP 的错误。

```bash
ethtool -U enp11s0f0  flow-type ether  ....
```
## 分析 flow-type 为 ether 时的执行过程
### ethtool 中的流程分析

ethtool 中解析代码如下：

```c
else if (!strcmp(argp[0], "ether"))
		flow_type = ETHER_FLOW;

	fsp->flow_type = flow_type;
```
当 ethtool 命令行中设定了 flow-type 为 ether 时，ethtool 会将 flow_type 设定为 **ETHER_FLOW**。

然后立刻判断 **flow_type**，分发到不同的 **options** 中，相关代码如下：

```c
	case ETHER_FLOW:
		options = rule_nfc_ether;
		n_opts = ARRAY_SIZE(rule_nfc_ether);
		break;
```

options 表示解析参数的规则，rule_nfc_ether 定义如下：

```c
static const struct rule_opts rule_nfc_ether[] = {
	{ "src", OPT_MAC, NFC_FLAG_SADDR,
	  offsetof(struct ethtool_rx_flow_spec, h_u.ether_spec.h_source),
	  offsetof(struct ethtool_rx_flow_spec, m_u.ether_spec.h_source) },
	{ "dst", OPT_MAC, NFC_FLAG_DADDR,
	  offsetof(struct ethtool_rx_flow_spec, h_u.ether_spec.h_dest),
	  offsetof(struct ethtool_rx_flow_spec, m_u.ether_spec.h_dest) },
	{ "proto", OPT_BE16, NFC_FLAG_PROTO,
	  offsetof(struct ethtool_rx_flow_spec, h_u.ether_spec.h_proto),
	  offsetof(struct ethtool_rx_flow_spec, m_u.ether_spec.h_proto) },
	{ "action", OPT_U64, NFC_FLAG_RING,
	  offsetof(struct ethtool_rx_flow_spec, ring_cookie), -1 },
	{ "vf", OPT_RING_VF, NFC_FLAG_RING_VF,
	  offsetof(struct ethtool_rx_flow_spec, ring_cookie), -1 },
	{ "queue", OPT_RING_QUEUE, NFC_FLAG_RING_QUEUE,
	  offsetof(struct ethtool_rx_flow_spec, ring_cookie), -1 },
	{ "loc", OPT_U32, NFC_FLAG_LOC,
	  offsetof(struct ethtool_rx_flow_spec, location), -1 },
	{ "vlan-etype", OPT_BE16, NTUPLE_FLAG_VETH,
	  offsetof(struct ethtool_rx_flow_spec, h_ext.vlan_etype),
	  offsetof(struct ethtool_rx_flow_spec, m_ext.vlan_etype) },
	{ "vlan", OPT_BE16, NTUPLE_FLAG_VLAN,
	  offsetof(struct ethtool_rx_flow_spec, h_ext.vlan_tci),
	  offsetof(struct ethtool_rx_flow_spec, m_ext.vlan_tci) },
	{ "user-def", OPT_BE64, NTUPLE_FLAG_UDEF,
	  offsetof(struct ethtool_rx_flow_spec, h_ext.data),
	  offsetof(struct ethtool_rx_flow_spec, m_ext.data) },
};
```
解析完所有的参数同时配置好 **struct ethtool_rx_flow_spec** 结构体，然后调用 **ioctl** 来下发配置到网卡。

配置方式有两种类型，相关代码如下：

```c
		/* attempt to add rule via N-tuple specifier */
		err = do_srxntuple(ctx, &rx_rule_fs);
		if (!err)
			return 0;

		/* attempt to add rule via network flow classifier */
		err = rxclass_rule_ins(ctx, &rx_rule_fs, rss_context);
		if (err < 0) {
			fprintf(stderr, "Cannot insert"
				" classification rule\n");
			return 1;
		}
```
第一种配置方式是 ntuple，第二种是 classifier，这两种不同方式**传递给 ioctl 的 ethtool 子命令存在区别**。

**当驱动不支持 ntuple 方式配置时（返回值为 EOPNOTSUPP 时），不会打印失败信息，继续尝试 classifier 方式**。

当两种方式都失败后，软件执行如下代码打印错误信息：

```c
			fprintf(stderr, "Cannot insert"
				" classification rule\n");
```
#### ntuple 方式 ioctl 的参数
```c
	/* send rule via N-tuple */
	ntuplecmd.cmd = ETHTOOL_SRXNTUPLE;
	err = send_ioctl(ctx, &ntuplecmd);
```
#### classifier 方式 ioctl 的参数
```c
	/* notify netdev of new rule */
	nfccmd.cmd = ETHTOOL_SRXCLSRLINS;
	nfccmd.rss_context = rss_context;
	nfccmd.fs = *fsp;
	err = send_ioctl(ctx, &nfccmd);
```
#### i40e 内核驱动支持哪一种类型?
5.0 内核中，ethtool 框架不支持 ntuple 方式。

### ioctl 的内核流程
ethool 调用 ioctl 最终会走到 **dev_ethtool** 函数中，在这个函数中 ETHTOOL_SRXCLSRLINS 被分发到 ethtool_set_rxnfc 函数中，相关代码如下：

```c
2705     case ETHTOOL_SRXFH:
2706     case ETHTOOL_SRXCLSRLDEL:
2707     case ETHTOOL_SRXCLSRLINS:
2708         rc = ethtool_set_rxnfc(dev, ethcmd, useraddr);
2709         break;
```

ethtool_set_rxnfc 核心代码如下：

```c
rc = dev->ethtool_ops->set_rxnfc(dev, &info);
```
可以看到它调用了 **ethtool_ops** 中的 **set_rxnfc** 函数指针，此函数指针在 **i40e_ethtool.c** 中实现，**i40e_ethtool.c** 中实现的函数代码如下：

```c
4308 static int i40e_set_rxnfc(struct net_device *netdev, struct ethtool_rxnfc *cmd)
4309 {
4310     struct i40e_netdev_priv *np = netdev_priv(netdev);
4311     struct i40e_vsi *vsi = np->vsi;
4312     struct i40e_pf *pf = vsi->back;
4313     int ret = -EOPNOTSUPP;
4314 
4315     switch (cmd->cmd) {
4316     case ETHTOOL_SRXFH:
4317         ret = i40e_set_rss_hash_opt(pf, cmd);
4318         break;
4319     case ETHTOOL_SRXCLSRLINS:
4320         ret = i40e_add_fdir_ethtool(vsi, cmd);
4321         break;
4322     case ETHTOOL_SRXCLSRLDEL:
4323         ret = i40e_del_fdir_entry(vsi, cmd);
4324         break;
4325     default:
4326         break;
4327     }
4328 
4329     return ret;
4330 }
```

**i40e_add_fdir_ethtool** 在真正设定到网卡前做了许多检查，其中有 **i40e_check_fdir_input_set** 这个对 input_set 的检查。

**i40e_check_fdir_input_set** 中判断 **flow_type**，当这个字段设定为 **ETHER_FLOW** 此函数将会返回 -EOPNOTSUPP。相关代码如下：

```c
3801     switch (fsp->flow_type & ~FLOW_EXT) {
3802     case SCTP_V4_FLOW:
3803         index = I40E_FILTER_PCTYPE_NONF_IPV4_SCTP;
3804         fdir_filter_count = &pf->fd_sctp4_filter_cnt;
3805         break;
3806     case TCP_V4_FLOW:
3807         index = I40E_FILTER_PCTYPE_NONF_IPV4_TCP;
3808         fdir_filter_count = &pf->fd_tcp4_filter_cnt;
3809         break;
3810     case UDP_V4_FLOW:
3811         index = I40E_FILTER_PCTYPE_NONF_IPV4_UDP;
3812         fdir_filter_count = &pf->fd_udp4_filter_cnt;
3813         break;
3814     case IP_USER_FLOW:
3815         index = I40E_FILTER_PCTYPE_NONF_IPV4_OTHER;
3816         fdir_filter_count = &pf->fd_ip4_filter_cnt;
3817         flex_l3 = true;
3818         break;
3819     default:
3820         return -EOPNOTSUPP;
3821     }
```
可以确定对于执行 **ethtool -U devname ether xxx** 的设定 linux 5.0 的 i40e 驱动并不支持！

# 第二个问题：如何丢掉所有的 ipv4 udp 报文?
在测试前我首先执行 **ifconfig enp11s0f0 -promisc** 命令打开混淆模式。

构造 udp 报文开始打流，然后执行如下命令能够丢掉所有的 ipv4 udp 报文：

```bash
ethtool -U enp11s0f0  flow-type udp4  action -1
```
设定完成可以通过 **ethtool -u enp11s0f0** 来查看配置内容，同时可以通过执行如下命令查看 **fdir_match** 计数确定配置生效：

```bash
ethtool -S enp11s0f0 | grep fdir
```

设定后会得到一个 id，我测试时 id 是 7679，可以使用 **ethtool -U enp11s0f0  delete 7679** 来移除这一条配置。

# 第三个问题：如何使用 flex filter 功能？
linux 内核源码树 networking/device_drivers/intel/i40e.rst 文件中描述了可以通过使用 user-def 字段来匹配协议的 payload 中的字段内容。

manual 说明贴到下面：

```manual
The driver also supports matching user-defined data within the packet payload.
This flexible data is specified using the "user-def" field of the ethtool
command in the following way:

+----------------------------+--------------------------+
| 31    28    24    20    16 | 15    12    8    4    0  |
+----------------------------+--------------------------+
| offset into packet payload | 2 bytes of flexible data |
+----------------------------+--------------------------+

For example,

::

  ... user-def 0x4FFFF ...

tells the filter to look 4 bytes into the payload and match that value against
0xFFFF. The offset is based on the beginning of the payload, and not the 
beginning of the packet. Thus

::

  flow-type tcp4 ... user-def 0x8BEAF ...

would match TCP/IPv4 packets which have the value 0xBEAF 8 bytes into the 
TCP/IPv4 payload.
```
上述说明信息讲了下面这几个内容：

1. user-def 只能从 payload 开始匹配
2. user-def 由 4 字节组成，高 16 位的两个字节代表相对 payload 的偏移量，低 16 位为匹配的内容

由于 flexible data 的单位是两个字节，offset 只支持偶数，不能使用奇数。实际测试时，我发现按照上面的描述配置能够正常配置，但是过滤功能并不生效。


唯一一次生效的命令如下：

```bash
ethtool -U enp11s0f0 flow-type udp4 user-def 0x0 action -1
Added rule with ID 7679
```
测试仪发送的 udp 报文，其 payload 的前两个字节都是 0，dmesg 有如下信息：

```c
[165763.336866] i40e 0000:0b:00.0 enp11s0f0: Input set change requested for udp4 flows:
[165763.336871] i40e 0000:0b:00.0 enp11s0f0:   Current input set: 2000
[165763.336874] i40e 0000:0b:00.0 enp11s0f0: Requested input set: 2000
[165763.336877] i40e 0000:0b:00.0 enp11s0f0: FLEX index 0: Offset -> 0
```
根据上面的描述，当针对 UDPv4 设置 flex 的时候，payload 的起始位置指向的是 UDPv4 报文的 data 区域起始位置。

我构造如下 udp payload 内容进行测试：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201205111937571.png)
测试命令如下：

```bash
ethtool -U enp11s0f0 flow-type udp4 user-def 0x9013 action -1
```

dmesg 的打印信息如下：

```dmesg
[163317.273795] i40e 0000:0b:00.0 enp11s0f0: Input set change requested for udp4 flows:
[163317.273801] i40e 0000:0b:00.0 enp11s0f0:   Current input set: 2000
[163317.273805] i40e 0000:0b:00.0 enp11s0f0: Requested input set: 2000
[163317.273808] i40e 0000:0b:00.0 enp11s0f0: FLEX index 0: Offset -> ０
````

可以确定设置成功了，但是没有生效，怀疑大小端、偏移量的影响并都进行了排查，没有找到问题。

## 对 flex filter 的认识
flex filter 是针对报文的 **payload** 进行 filter，也就是说我们无法针对报文的 header 进行过滤，但是在网络报文封装中，**上层的协议帧可以看做是下层协议帧的 payload**．

也就是说如果我们要过滤一个 96 字节的 udp 报文，那么要设定过滤一个 ip 报文的命令，因为在过滤 ip 报文的时候 udp 的头是可见的，有了这个知识，然后计算出 96 字节支持的 udp 包的大小，编写命令。

同时需要了解的是**接口的混淆模式可能对过滤条件有影响**，根据测试情况看，在**开混淆模式后过滤功能仍然能够生效**。

有了上面的理解，我继续尝试过滤 udp 报文的 payload 字段，结果都失败了，网上搜索了下发现相关的内容非常少，看来只有怼代码了！

## 尝试分析代码以找到 flex filter 不能生效的原因
研究代码，发现设定一个 flow directory 规则的流程大致如下：

1. 选择 input set 
2. 获取 fdir 对应的 ring
3. 根据 flow-type 等参数设定一个 i40e_filter_program_desc 描述符内容
4. 构造一个报文，此报文根据 flow-type 等参数来设定，它也需要占一个描述符
5. 写入 tail 让网卡处理这两个描述符
6. 检查设定是否生效

i40e_fdir 函数负责填充 i40e_filter_program_desc 描述符，这个描述符的定义如下：

```c
struct i40e_filter_program_desc {
	__le32 qindex_flex_ptype_vsi;
	__le32 rsvd;
	__le32 dtype_cmd_cntindex;
	__le32 fd_id;
};
```
i40e_fdir 代码如下：
```c
static void i40e_fdir(struct i40e_ring *tx_ring,
		      struct i40e_fdir_filter *fdata, bool add)
{
	struct i40e_filter_program_desc *fdir_desc;
	struct i40e_pf *pf = tx_ring->vsi->back;
	u32 flex_ptype, dtype_cmd;
	u16 i;

	/* grab the next descriptor */
	i = tx_ring->next_to_use;
	fdir_desc = I40E_TX_FDIRDESC(tx_ring, i);

	i++;
	tx_ring->next_to_use = (i < tx_ring->count) ? i : 0;

	flex_ptype = I40E_TXD_FLTR_QW0_QINDEX_MASK &
		     (fdata->q_index << I40E_TXD_FLTR_QW0_QINDEX_SHIFT);

	flex_ptype |= I40E_TXD_FLTR_QW0_PCTYPE_MASK &
		      (fdata->pctype << I40E_TXD_FLTR_QW0_PCTYPE_SHIFT);

	flex_ptype |= I40E_TXD_FLTR_QW0_PCTYPE_MASK &
		      (fdata->flex_offset << I40E_TXD_FLTR_QW0_FLEXOFF_SHIFT);

	/* Use LAN VSI Id if not programmed by user */
	flex_ptype |= I40E_TXD_FLTR_QW0_DEST_VSI_MASK &
		      ((u32)(fdata->dest_vsi ? : pf->vsi[pf->lan_vsi]->id) <<
		       I40E_TXD_FLTR_QW0_DEST_VSI_SHIFT);

	dtype_cmd = I40E_TX_DESC_DTYPE_FILTER_PROG;

	dtype_cmd |= add ?
		     I40E_FILTER_PROGRAM_DESC_PCMD_ADD_UPDATE <<
		     I40E_TXD_FLTR_QW1_PCMD_SHIFT :
		     I40E_FILTER_PROGRAM_DESC_PCMD_REMOVE <<
		     I40E_TXD_FLTR_QW1_PCMD_SHIFT;

	dtype_cmd |= I40E_TXD_FLTR_QW1_DEST_MASK &
		     (fdata->dest_ctl << I40E_TXD_FLTR_QW1_DEST_SHIFT);

	dtype_cmd |= I40E_TXD_FLTR_QW1_FD_STATUS_MASK &
		     (fdata->fd_status << I40E_TXD_FLTR_QW1_FD_STATUS_SHIFT);

	if (fdata->cnt_index) {
		dtype_cmd |= I40E_TXD_FLTR_QW1_CNT_ENA_MASK;
		dtype_cmd |= I40E_TXD_FLTR_QW1_CNTINDEX_MASK &
			     ((u32)fdata->cnt_index <<
			      I40E_TXD_FLTR_QW1_CNTINDEX_SHIFT);
	}

	fdir_desc->qindex_flex_ptype_vsi = cpu_to_le32(flex_ptype);
	fdir_desc->rsvd = cpu_to_le32(0);
	fdir_desc->dtype_cmd_cntindex = cpu_to_le32(dtype_cmd);
	fdir_desc->fd_id = cpu_to_le32(fdata->fd_id);
}
```
上面的代码中，**dtype_cmd** 是个非常重要的字段，它经过一系列的判断设定其值。

i40e_fdir 中设定描述符字段内容完成后，将 **tx_ring->next_to_use** 向后拨一个单位，表示**占用了一个描述符**。

i40e_fdir 填充完成后，继续**填充 raw_packet，占据下一个描述符**，并设定相关的字段。

过滤 udp 报文时构造 raw_packet 报文的代码如下：

```c
	static char packet[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x08, 0,
		0x45, 0, 0, 0x1c, 0, 0, 0x40, 0, 0x40, 0x11, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

	raw_packet = kzalloc(I40E_FDIR_MAX_RAW_PACKET_SIZE, GFP_KERNEL);
	if (!raw_packet)
		return -ENOMEM;
	memcpy(raw_packet, packet, I40E_UDPIP_DUMMY_PACKET_LEN);

	ip = (struct iphdr *)(raw_packet + IP_HEADER_OFFSET);
	udp = (struct udphdr *)(raw_packet + IP_HEADER_OFFSET
	      + sizeof(struct iphdr));

	ip->daddr = fd_data->dst_ip;
	udp->dest = fd_data->dst_port;
	ip->saddr = fd_data->src_ip;
	udp->source = fd_data->src_port;

	if (fd_data->flex_filter) {
		u8 *payload = raw_packet + I40E_UDPIP_DUMMY_PACKET_LEN;
		__be16 pattern = fd_data->flex_word;
		u16 off = fd_data->flex_offset;

		*((__force __be16 *)(payload + off)) = pattern;
	}

	fd_data->pctype = I40E_FILTER_PCTYPE_NONF_IPV4_UDP;
```
使用了 ethtool 设定 user-def 的时候 fd_data->flex_filter 为 true，这时可以看到对 udp 报文的 payload + off 字段的填充逻辑。

**I40E_UDPIP_DUMMY_PACKET_LEN** 的定义如下：

```c
#define I40E_UDPIP_DUMMY_PACKET_LEN	42
```
上述代码计算的 payload 的起始位置正是 udp 报文的 data 字段的起始位置。

与此类似，过滤 tcpv4 报文时填充 payload 字段的代码如下：
```c
	if (fd_data->flex_filter) {
		u8 *payload = raw_packet + I40E_TCPIP_DUMMY_PACKET_LEN;
		__be16 pattern = fd_data->flex_word;
		u16 off = fd_data->flex_offset;

		*((__force __be16 *)(payload + off)) = pattern;
	}
```
**I40E_TCPIP_DUMMY_PACKET_LEN** 宏的定义如下：

```c
#define I40E_TCPIP_DUMMY_PACKET_LEN	54
```
可以确定 **tcpv4 flex payload** 从报文的第 54 字节开始，同理 **ipv4 flex payload** 从报文的第 **34** 字节开始，**sctp flex payload** 从报文的第 **46** 字节开始。

构造完成一个 raw_packet 后同样需要填充描述符，tx_ring->next_to_use 再次向后拨动一个单位。完成上述过程后，最终将 **tx_ring->next_to_use** 写入到 **tx_ring->tail** 以通知网卡处理， t**x_ring->tail** 是网卡中映射的一个**物理地址**。

## 修改代码，打印填充的 raw_packet 报文内容
经过上面对 flex filter 设定过程的研究，我觉得可能是填充的 raw_packet 报文的内容存在问题，故而在驱动中添加了打印报文内容的操作重试。

测试过程记录如下：

```bash
[root] # dmesg -c >/dev/null ; ethtool -U enp11s0f0 flow-type udp4 user-def 0x212da action -1; dmesg | grep -A 10 'packet\[42\]'
Added rule with ID 7679
[165607.394687] packet[42] is 0
[165607.394688] packet[43] is 0
[165607.394689] packet[44] is 12
[165607.394691] packet[45] is da
[165607.394692] packet[46] is 0
[165607.394693] packet[47] is 0
[165607.394694] packet[48] is 0
[165607.394696] packet[49] is 0
[165607.394697] packet[50] is 0
[165607.394698] packet[51] is 0
[165607.394700] packet[52] is 0
```
根据打出的报文内容看，设定是正确的！但是仍旧没有真正生效，看来还是哪里没有整对。

## 唯一一次成功的 use-def 配置时的 raw_packet 内容
一番折腾后，我想到也许可以把那唯一一次生效的 raw_packet 内容打出来，看看有什么不同，结果也没有找到怀疑点，测试过程还是记录到下面。
 
```bash
[root] # dmesg -c >/dev/null ; ethtool -U enp11s0f0 flow-type udp4 user-def 0x0 action -1; dmesg | grep -A 10 'packet\[42\]'
Added rule with ID 7679

[165763.336866] i40e 0000:0b:00.0 enp11s0f0: Input set change requested for udp4 flows:
[165763.336871] i40e 0000:0b:00.0 enp11s0f0:   Current input set: 2000
[165763.336874] i40e 0000:0b:00.0 enp11s0f0: Requested input set: 2000
[165763.336877] i40e 0000:0b:00.0 enp11s0f0: FLEX index 0: Offset -> 0
[165763.337433] packet[0] is 0
[165763.337435] packet[1] is 0
[165763.337436] packet[2] is 0
[165763.337437] packet[3] is 0
[165763.337439] packet[4] is e6
[165763.337440] packet[5] is ff
[165763.337442] packet[6] is ff
[165763.337443] packet[7] is ff
[165763.337444] packet[8] is 0
[165763.337446] packet[9] is 0
[165763.337447] packet[10] is 0
[165763.337448] packet[11] is 0
[165763.337450] packet[12] is 8
[165763.337451] packet[13] is 0
[165763.337452] packet[14] is 45
[165763.337454] packet[15] is 0
[165763.337455] packet[16] is 0
[165763.337456] packet[17] is 1c
[165763.337458] packet[18] is 0
[165763.337459] packet[19] is 0
[165763.337460] packet[20] is 40
[165763.337462] packet[21] is 0
[165763.337463] packet[22] is 40
[165763.337464] packet[23] is 11
```
## 总结
x710 flow directory 是个挺高级的功能，但是我们的业务场景中从来没有使用过，没有相应的技术积累，这次搞起来就显得困难重重。

flex filter 功能没有用起来，但是五元组过滤算是上手了，这个功能刚好能够解决我们遇到的问题，不过当场景切换到 dpdk 中时，即便一个简单的过滤 udp 报文的功能也研究了好几天，期间一度想放弃，被搞到想哭，最终搞定了后又激动到想哭。

现在想想在某天 21:00 的时候，我心怀忐忑的准备测试看 dpdk 中的 flow directory 功能是否生效，之前已经失败了好多次了，仔细 check，最终确定成功了后，我真的激动到眼泪快掉下来！

这并不只是技术上的突破，这更是突破自我局限的一次成功案例，我的成就感又回来了！

