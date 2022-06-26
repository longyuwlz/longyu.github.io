# 问题描述
在某款新导入的硬件中，业务口使用四光口的 x710 网卡，dpdk 程序初始化的时候报了如下错误：

```bash
EAL: PCI device 0000:16:00.0 on NUMA socket -1
EAL:   probe driver: 8086:1581 rte_i40e_pmd
EAL:   PCI memory mapped at 0x4200120000
EAL:   PCI memory mapped at 0x4200920000
PMD: eth_i40e_dev_init(): FW 6.2 API 1.5 NVM 06.08.00 eetrack 80004cf1
PMD: i40e_dcb_init_configure(): Failed to stop lldp
EAL: PCI device 0000:16:00.1 on NUMA socket -1
EAL:   probe driver: 8086:1581 rte_i40e_pmd
EAL:   PCI memory mapped at 0x4200928000
EAL:   PCI memory mapped at 0x4201128000
PMD: eth_i40e_dev_init(): FW 6.2 API 1.5 NVM 06.08.00 eetrack 80004cf1
PMD: i40e_dcb_init_configure(): Failed to stop lldp
EAL: PCI device 0000:16:00.2 on NUMA socket -1
EAL:   probe driver: 8086:1581 rte_i40e_pmd
EAL:   PCI memory mapped at 0x4201130000
EAL:   PCI memory mapped at 0x4201930000
PMD: eth_i40e_dev_init(): FW 6.2 API 1.5 NVM 06.08.00 eetrack 80004cf1
PMD: eth_i40e_dev_init(): Failed to do parameter init: -22
EAL: Error - exiting with code: 1
```
16:00.0、16:00.1 正常初始化，16:00.2 初始化的时候报了**参数错误**。

# 问题定位过程
## 1. dpdk-16.04 l2fwd 测试
开始相关调试信息后，增加了如下错误打印：

```bash
PMD: eth_i40e_dev_init(): FW 6.1 API 1.7 NVM 06.08.00 eetrack 80003cf1
PMD: i40e_configure_registers(): Read from 0x26ce00: 0x10000200
PMD: i40e_configure_registers(): Read from 0x26ce08: 0x11f0200
PMD: i40e_configure_registers(): Read from 0x269fbc: 0x3030303
PMD: i40e_pf_parameter_init(): No queue or VSI left for VMDq
PMD: i40e_pf_parameter_init(): Failed to allocate 2 VSIs, which exceeds the hardware maximum 0
PMD: eth_i40e_dev_init(): Failed to do parameter init: -22
PMD: i40e_free_dma_mem_d(): memzone i40e_dma_664339303382194
```
上述信息表明在 i40e_pf_parameter_init 函数中创建 2 个 VSI 结构失败，这个数目超过了硬件限制。

为了快速验证是否为驱动问题，使用 dpdk-19.11 继续测试。

## 2. dpdk-19.11 l2fwd 测试
相关报错：

```bash
i40e_pf_parameter_init(): Failed to allocate 2 VSIs, which exceeds the hardware maximum 0
eth_i40e_dev_init(): Failed to do parameter init: -22
EAL: ethdev initialisation failedEAL: Requested device 0000:16:00.2 cannot be used
EAL: PCI device 0000:16:00.3 on NUMA socket -1
EAL:   Invalid NUMA socket, default to 0
EAL:   probe driver: 8086:1581 net_i40e
i40e_pf_parameter_init(): Failed to allocate 2 VSIs, which exceeds the hardware maximum 0
eth_i40e_dev_init(): Failed to do parameter init: -22
EAL: ethdev initialisation failedEAL: Requested device 0000:16:00.3 cannot be used
```
报错内容一致，基本排除驱动问题！

## 3. 相关代码分析

i40e_pf_parameter_init 函数中与此判断相关的代码如下：

```c
if (qp_count > hw->func_caps.num_tx_qp) {
		PMD_DRV_LOG(ERR, "Failed to allocate %u queues, which exceeds "
			    "the hardware maximum %u", qp_count,
			    hw->func_caps.num_tx_qp);
		return -EINVAL;
	}
	if (vsi_count > hw->func_caps.num_vsis) {
		PMD_DRV_LOG(ERR, "Failed to allocate %u VSIs, which exceeds "
			    "the hardware maximum %u", vsi_count,
			    hw->func_caps.num_vsis);
		return -EINVAL;
	}
```
这里的判断其数据来源是通过访问网卡硬件获取的，加之此款驱动已经在很多 x710 网卡上正常运行的数据，故而判断**大概率是硬件问题**。

# 提问环节
## 1. 四光口网卡，四个口的软件配置是否一致？

l2fwd 对所有的接口统一配置，可以确认软件配置一致。

## 2. 是否是单点故障？
经过测试确认，多张网卡有同样的问题。

## 3. 在新适配的硬件环境中主要差异点在哪里？
 主要**差异点**为**物理网卡本身而非驱动**，驱动的版本是相同的。在分层的视角上应该优先排查硬件问题。

# 最终确认的问题
排查问题确认，厂商烧录的固件信息异常，导致问题，重新烧录固件后，问题得到解决。

# 总结
排查问题时优先寻找**基线数据**，在这个问题里基线数据是 **x710 驱动的版本以及此版本在多个环境的 x710 网卡上都能正常运行的事实依据。**

有了基线数据，使用分层的思想先找到**重要的差异点所在的层次**，然后优先排查此层的问题。在这个问题里，变化的项目指向网卡本身，故而需要优先排查网卡硬件问题，不能过早的陷入到驱动细节中。这个问题最终定位到为硬件问题，证明了驱动是正常的这一结论，进一步说明了分层方法的合理性。

