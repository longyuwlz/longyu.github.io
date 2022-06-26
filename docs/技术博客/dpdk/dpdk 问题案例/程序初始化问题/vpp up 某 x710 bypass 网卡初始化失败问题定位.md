# vpp up 某 x710 bypass 网卡初始化失败问题定位.md
## 问题描述
**软件版本**：
vpp

**网卡类型与对端设备**：

某万兆 x710 bypass 卡对端连接测试仪

**问题现象**：

重启 vpp，x710 网卡灯不亮

**vppcli 查看接口信息**: 

接口状态为 error，并报 pmd-init-fail 的错误

**复现方法与概率**：

重启 vpp 就能够复现，复现概率较大

## 收集信息
### 1. vpp 配置文件中 dpdk 接口相关配置项目
```maunal
dpdk
{
  uio-driver igb_uio
        dev 0000:04:00.0
        {
            name vEth0
            num-rx-desc 1024
        }
        dev 0000:04:00.1
        {
            name vEth1
            num-rx-desc 1024
        }
}
```

### 2. lspci 查看到的网卡信息

```bash
04:00.0 Ethernet controller: Intel Corporation Ethernet Controller X710 for
10GbE SFP+ (rev 02)
04:00.1 Ethernet controller: Intel Corporation Ethernet Controller X710 for
10GbE SFP+ (rev 02)
```
### 3. lspci -xxx 获取到的网卡配置空间信息

```bash
[root@localhost] # lspci -xxx -s 04:00.0
04:00.0 Ethernet controller: Intel Corporation Ethernet Controller X710 for
10GbE SFP+ (rev 02)
00: 86 80 72 15 06 04 10 00 02 00 00 02 10 00 80 00
10: 0c 00 00 db 00 00 00 00 00 00 00 00 0c 80 80 db
20: 00 00 00 00 00 00 00 00 00 00 00 00 bb 15 00 00
30: 00 00 28 df 40 00 00 00 00 00 00 00 0b 01 00 00
40: 01 50 23 c8 08 20 00 00 00 00 00 00 00 00 00 00
50: 05 70 80 01 00 00 00 00 00 00 00 00 00 00 00 00
60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
70: 11 a0 80 80 03 00 00 00 03 10 00 00 00 00 00 00
80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
a0: 10 00 02 00 e4 8c 00 10 30 21 09 00 43 58 42 00
b0: 40 00 43 10 00 00 00 00 00 00 00 00 00 00 00 00
c0: 00 00 00 00 1f 00 00 00 00 00 00 00 0e 00 00 00
d0: 01 00 1e 00 00 00 00 00 00 00 00 00 00 00 00 00
e0: 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00

[root@localhost] # lspci -xxx -s 04:00.1
04:00.1 Ethernet controller: Intel Corporation Ethernet Controller X710 for
10GbE SFP+ (rev 02)
00: 86 80 72 15 06 04 10 00 02 00 00 02 10 00 80 00
10: 0c 00 80 da 00 00 00 00 00 00 00 00 0c 00 80 db
20: 00 00 00 00 00 00 00 00 00 00 00 00 bb 15 00 00
30: 00 00 20 df 40 00 00 00 00 00 00 00 0b 01 00 00
40: 01 50 23 c8 08 20 00 00 00 00 00 00 00 00 00 00
50: 05 70 80 01 00 00 00 00 00 00 00 00 00 00 00 00
60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
70: 11 a0 80 80 03 00 00 00 03 10 00 00 00 00 00 00
80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
a0: 10 00 02 00 e4 8c 00 10 30 21 09 00 43 58 42 00
b0: 40 00 43 10 00 00 00 00 00 00 00 00 00 00 00 00
c0: 00 00 00 00 1f 00 00 00 00 00 00 00 0e 00 00 00
d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
e0: 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```

## vpp 代码分析

相关函数为 dpdk_device_setup 函数，关键代码如下：

```c
  if (xd->flags & DPDK_DEVICE_FLAG_ADMIN_UP)
    dpdk_device_start (xd);

  if (vec_len (xd->errors))
    goto error;

  return;

error:
  xd->flags |= DPDK_DEVICE_FLAG_PMD_INIT_FAIL;
  sw->flags |= VNET_SW_INTERFACE_FLAG_ERROR;

```

调用 **dpdk_device_start** 失败后会设置 **xd->flags** 的标志，标志问题为 **pmd_init_fail**。

## 问题定位的初步结论

出问题的口及其 pci 号如下：

```bash
vEth0   0000:04:00.0
vEth1   0000:04:00.1
```

阅读代码确定，当这两个口 start 失败时会触发这个问题。读取网卡配置空间，确认配置空间内容正常，不确定失败的位置及原因。

## 复现方法

多次杀掉 vpp，使用 vppcli 执行 show hardware-interfaces x/x 查看报错信息！

## 解决计划

1. 修改 dpdk 驱动，添加 x710 驱动 log 信息，重新编译 vpp 复现问题（设置 loglevel 即可）
2. 复现后观测失败位置，排查是软件问题还是硬件问题
3. 使用 l2fwd 运行 10 次，观察是否有报错信息

## 扩展 log 信息
### 1. dpdk 设置不同 loglevel 的打印级别
相关参数：

```bash
  --log-level=<int>   Set global log level
  --log-level=<type-match>:<int>
```
i40e 驱动相关 log-level type：

```bash
pmd.net.i40e.init

pmd.net.i40e.driver

pmd.net.i40e.rx
```

### 2. vpp 中查看 dpdk 初始化 log 信息的命令

vppcli 中执行命令：

```bash
show log
```

## 问题！！！
vpp 中能够配置的 dpdk 参数是固定的，需要内部代码解析，不能直接设置！

解决方法：

1. 尝试使用 l2fwd 来复现问题
2. 编译带调试信息的 dpdk 库，并修改 i40e 代码，将 i40e 驱动的 log 级别调低。

第二点问题，使用如下 patch 解决：

```c
        /* If link needs to go up and it is in autoneg mode the speed is OK,
@@ -2969,6 +2985,7 @@
                            &oes->tx_errors, &nes->tx_errors);
        vsi->offset_loaded = true;

@@ -12895,10 +12915,10 @@
 {
        i40e_logtype_init = rte_log_register("pmd.net.i40e.init");
        if (i40e_logtype_init >= 0)
-               rte_log_set_level(i40e_logtype_init, RTE_LOG_NOTICE);
+               rte_log_set_level(i40e_logtype_init, RTE_LOG_DEBUG);
        i40e_logtype_driver = rte_log_register("pmd.net.i40e.driver");
        if (i40e_logtype_driver >= 0)
-               rte_log_set_level(i40e_logtype_driver, RTE_LOG_NOTICE);
+               rte_log_set_level(i40e_logtype_driver, RTE_LOG_DEBUG);

 #ifdef RTE_LIBRTE_I40E_DEBUG_RX
        i40e_logtype_rx = rte_log_register("pmd.net.i40e.rx");
```

## 复现过程记录
搭建了个本地环境，使用 l2fwd 与 vpp 复现问题，一直复现不出来。协调测试仪，将 x710 连接到测试仪上的口后，vpp 能够复现出来，**表明问题与测试仪强相关。**
### vpp 运行 log
出错位置的 log 信息：
```bash
Alloc function will be used on port=1, queue=1.
i40e_set_tx_function(): Vector tx finally be used.
i40e_pf_config_rss(): Max of contiguous 2 PF queues are configured
i40e_set_rx_function(): Vector Rx path will be used on port=1.
i40e_dev_rx_queue_start():  >>
i40e_dev_rx_queue_start():  >>
i40e_dev_tx_queue_start():  >>
i40e_dev_tx_queue_start():  >>
i40e_phy_conf_link(): Failed to get the current PHY config: -7
```

## dpdk 驱动中出问题的地方

i40e_apply_link_speed 调用 i40e_phy_conf_link 的时候获取硬件信息失败。i40e_phy_conf_link 关键代码：

```c
/* To get the current phy config. */
	status = i40e_aq_get_phy_capabilities(hw, false, false, &phy_ab,
					      NULL);
	if (status) {
		PMD_DRV_LOG(ERR, "Failed to get the current PHY config: %d\n",
				status);
		return ret;
	}
```
aq_get_phy_capabilities 通过 i40e 网卡的硬件 admin queue 来获取信息，-7 代表 **I40E_ERR_UNKNOWN_PHY**，表明 **hw->aq.asq_last_status** 状态为 **I40E_AQ_RC_EIO**，**I/O** 错误。

这些信息表明问题指向**网卡硬件**。

## l2fwd 程序测试
正常 log 信息：

```bash
i40e_dev_rx_queue_start():  >>
i40e_dev_tx_queue_start():  >>
i40e_phy_conf_link():   Current: abilities 0, link_speed c
i40e_phy_conf_link():   Config:  abilities 38, link_speed 7e
```

## dpdk 中相关的 patch
在 dpdk git log 中搜索找到如下提交信息:

```bash
commit 935bceb9ba0de8a7a276d5b3dd41e0168a273f26
Author: David Hunt [david.hunt@intel.com](mailto:david.hunt@intel.com)
Date:   Mon Jul 24 09:48:44 2017 +0100

net/i40e: fix sync phy type by adding retry

Some phy's take longer than others to come up. Add a retry to give
more phy's a chance to come up before returning an error.

Fixes: 2209c3e2c275 ("net/i40e: avoid PCI probing failure when using bogus SFP")

Signed-off-by: David Hunt <david.hunt@intel.com
Acked-by: Jingjing Wu <jingjing.wu@intel.com>
```

## 补丁代码
参考上面的 git commit，在我们出错的逻辑中添加重试的逻辑，相关 patch 如下：

```c
Index: i40e_ethdev.c
===================================================================
--- i40e_ethdev.c       (revision xxxxx)
+++ i40e_ethdev.c       (working copy)
@@ -2159,6 +2159,7 @@
        enum i40e_aq_phy_type cnt;
        uint8_t avail_speed;
        uint32_t phy_type_mask = 0;
+       int retries = 0;

        const uint8_t mask = I40E_AQ_PHY_FLAG_PAUSE_TX |
                        I40E_AQ_PHY_FLAG_PAUSE_RX |
@@ -2169,20 +2170,35 @@
        /* To get phy capabilities of available speeds. */
        status = i40e_aq_get_phy_capabilities(hw, false, true, &phy_ab,
                                              NULL);
-       if (status) {
+       while (status) {
                PMD_DRV_LOG(ERR, "Failed to get PHY capabilities: %d\n",
                                status);
-               return ret;
+               retries++;
+               rte_delay_us(100000);
+               if (retries < 10)
+                       status = i40e_aq_get_phy_capabilities(hw, false, true, &phy_ab,
+                                       NULL);
+               else
+                       return ret;
        }
        avail_speed = phy_ab.link_speed;

        /* To get the current phy config. */
        status = i40e_aq_get_phy_capabilities(hw, false, false, &phy_ab,
                                              NULL);
-       if (status) {
+       retries = 0;
+
+       while (status) {
                PMD_DRV_LOG(ERR, "Failed to get the current PHY config: %d\n",
                                status);
-               return ret;
+               retries++;
+                rte_delay_us(100000);
+
+               if (retries < 10)
+                       status = i40e_aq_get_phy_capabilities(hw, false, false, &phy_ab,
+                                                             NULL);
+               else
+                       return ret;
        }
```
## 测试记录
重新编译 dpdk 与 vpp 后测试十次，没有出现问题，验证通过。
