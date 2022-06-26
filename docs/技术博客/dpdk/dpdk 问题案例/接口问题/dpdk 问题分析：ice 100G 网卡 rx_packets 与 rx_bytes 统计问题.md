# dpdk 问题分析：ice 100G 网卡 rx_packets 与 rx_bytes 统计问题
## 问题描述
1. ipackets 减掉 imissed 统计的问题
ice 100G 网卡获取的 ipackets 会减掉 imissed 的报文，此时统计的是**软件实际从网卡收包的 pps**，但**收包的 bps 中没有减掉这部分报文长度**且硬件不能提供这部分信息用于计算，为此屏蔽 ipackets 中减掉 imissed 报文的统计以修复 pps 显示问题。

2. ibytes 每个报文减掉 crc 长度导致显示带宽变少问题
ice 100G 网卡 ibytes 统计会为每个报文减掉 crc 长度，bps 变小。

## 手册中的相关信息

接口收到的正确报文字节统计：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1744616813c44ea5bf64683006062ad6.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/1bd8d0fd18db4926a7ff409232e1065f.png)vsi 收到的正确的报文统计：
![在这里插入图片描述](https://img-blog.csdnimg.cn/457d38d2252c4ab0a22be3d7d5c39da8.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
## dpdk-20.11 ice 驱动代码分析

**ice_stats_get 函数代码：**
```c
/* Get all statistics of a port */
static int
ice_stats_get(struct rte_eth_dev *dev, struct rte_eth_stats *stats)
{
        struct ice_pf *pf = ICE_DEV_PRIVATE_TO_PF(dev->data->dev_private);
        struct ice_hw *hw = ICE_DEV_PRIVATE_TO_HW(dev->data->dev_private);
        struct ice_hw_port_stats *ns = &pf->stats; /* new stats */

        /* call read registers - updates values, now write them to struct */
        ice_read_stats_registers(pf, hw);

        stats->ipackets = pf->main_vsi->eth_stats.rx_unicast +
                          pf->main_vsi->eth_stats.rx_multicast +
                          pf->main_vsi->eth_stats.rx_broadcast -
                          pf->main_vsi->eth_stats.rx_discards;
        stats->opackets = ns->eth.tx_unicast +
                          ns->eth.tx_multicast +
                          ns->eth.tx_broadcast;
        stats->ibytes   = pf->main_vsi->eth_stats.rx_bytes;
        stats->obytes   = ns->eth.tx_bytes;
        stats->oerrors  = ns->eth.tx_errors +
                          pf->main_vsi->eth_stats.tx_errors;
```

**ibytes 为输出的值，从 pf->main_vsi->eth_stats.rx_bytes 字段中获取。**

**ice_read_stats_registers** 函数中从寄存器中读取收发包字节长度，此函数代码：

```c
struct ice_hw_port_stats *ns = &pf->stats; /* new stats */
        struct ice_hw_port_stats *os = &pf->stats_offset; /* old stats */

        /* Get statistics of struct ice_eth_stats */
        ice_stat_update_40(hw, GLPRT_GORCH(hw->port_info->lport),
                           GLPRT_GORCL(hw->port_info->lport),
                           pf->offset_loaded, &os->eth.rx_bytes,
                           &ns->eth.rx_bytes);

.........

/* Workaround: CRC size should not be included in byte statistics,
         * so subtract RTE_ETHER_CRC_LEN from the byte counter for each rx
         * packet.
         * Add crc len size because it's not be included in ns->eth.rx_bytes!
         */
        /*
        ns->eth.rx_bytes -= (ns->eth.rx_unicast + ns->eth.rx_multicast +
                             ns->eth.rx_broadcast) * RTE_ETHER_CRC_LEN;
        */
```

读取发包字节长度：

```c
ice_stat_update_40(hw, GLPRT_GOTCH(hw->port_info->lport),
                           GLPRT_GOTCL(hw->port_info->lport),
                           pf->offset_loaded, &os->eth.tx_bytes,
                           &ns->eth.tx_bytes);
```

当 **pf->main_vsi** 存在时，调用 **ice_update_vsi_stats** 继续获取 **vsi** 的统计信息。相关代码：

```c
static void
ice_update_vsi_stats(struct ice_vsi *vsi)
{
        struct ice_eth_stats *oes = &vsi->eth_stats_offset;
        struct ice_eth_stats *nes = &vsi->eth_stats;
        struct ice_hw *hw = ICE_VSI_TO_HW(vsi);
        int idx = rte_le_to_cpu_16(vsi->vsi_id);

        ice_stat_update_40(hw, GLV_GORCH(idx), GLV_GORCL(idx),
                           vsi->offset_loaded, &oes->rx_bytes,
                           &nes->rx_bytes);

.........

vsi->old_rx_bytes = nes->rx_bytes;
        /* exclude CRC bytes */
        nes->rx_bytes -= (nes->rx_unicast + nes->rx_multicast +
                          nes->rx_broadcast) * RTE_ETHER_CRC_LEN;
```

ice 驱动中，ibytes 是使用 **ice_update_vsi_stats** 中获取的 **pf->vsi->eth_stats->rx_bytes** 的值，此值为每个收到的报文减掉了 crc len 长度。

## 解决方法
1. 去掉 ipackets 减掉 rx_discards 统计的逻辑
2. 将 ibytes 的数据源修改为 ns->eth.rx_bytes 并去掉为每个报文减掉 crc len 的逻辑。

