## 问题描述
82599 万兆网卡，一个正常工作，另外一个口不能正常工作，初始化失败，导致 dpdk 程序不能正常启动。

## 问题排查过程
1. 检查程序使用的配置文件
2. 检查 /dev/uioX 设备文件
3. 检查 dmesg 信息

排查了上面的三点内容，没有发现异常。首先使用 ethool 收集异常接口的信息，然后准备用官方驱动测试。

在使用官方驱动测试之前，我想到了可能是光模块的问题，但是客户现场没有支持的同事，且我们没有工具直接获取光模块信息，这一点暂时不能排查。

## 使用 l2fwd 测试
在初步的排查没有定位到问题后，我想使用 l2fwd 程序测试了一下，排查下软件问题。

运行 l2fwd 后，注意到 l2fwd 启动中有打印探测到的光模块类型信息，记录如下：

```bash
PMD: eth_ixgbe_dev_init(): MAC: 2, PHY: 15, SFP+: 5
PMD: eth_ixgbe_dev_init(): port 4 vendorID=0x8086 deviceID=0x10fb
EAL: PCI device 0000:04:00.1 on NUMA socket -1
EAL:   probe driver: 8086:10fb rte_ixgbe_pmd
EAL:   PCI memory mapped at 0x4001af234000
EAL:   PCI memory mapped at 0x4001af254000
PMD: eth_ixgbe_dev_init(): MAC: 2, PHY: 17, SFP+: 14
PMD: eth_ixgbe_dev_init(): port 5 vendorID=0x8086 deviceID=0x10fb
```
port 5 就是出问题的接口，ixgbe 初始化打印出了 SFP+ 的值为 14，这个 14 是在 sfp_type 枚举结构中定义的，此结构内容如下：

```c
enum ixgbe_sfp_type {
    ixgbe_sfp_type_da_cu = 0,
    ixgbe_sfp_type_sr = 1,
    ixgbe_sfp_type_lr = 2,
    ixgbe_sfp_type_da_cu_core0 = 3,
    ixgbe_sfp_type_da_cu_core1 = 4,
    ixgbe_sfp_type_srlr_core0 = 5,
    ixgbe_sfp_type_srlr_core1 = 6,
    ixgbe_sfp_type_da_act_lmt_core0 = 7,
    ixgbe_sfp_type_da_act_lmt_core1 = 8,
    ixgbe_sfp_type_1g_cu_core0 = 9,
    ixgbe_sfp_type_1g_cu_core1 = 10,
    ixgbe_sfp_type_1g_sx_core0 = 11,
    ixgbe_sfp_type_1g_sx_core1 = 12,
    ixgbe_sfp_type_1g_lx_core0 = 13,
    ixgbe_sfp_type_1g_lx_core1 = 14,
    ixgbe_sfp_type_1g_lha_core0 = 15,
    ixgbe_sfp_type_1g_lha_core1 = 16,
    ixgbe_sfp_type_not_present = 0xFFFE,
    ixgbe_sfp_type_unknown = 0xFFFF
};
```
14 对应的是 ```ixgbe_sfp_type_1g_lx_core1```看这个名称应该是个千兆的光模块。

继续在代码中搜索，发现在 ixgbe_identify_sfp_module_generic 中识别 sfp 模块类型的时候有下面相关代码：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201212105203219.png)
这个代码基本上能够确定 dpdk 程序不能正常运行的原因，这些信息明确指向光模块，于是对这个问题有了如下结论：

这个问题为在**万兆光口上接了一个千兆的光模块导致万兆接口初始化失败**。

最终确定的问题与上面的结论一致！

## 总结
其实光模块的问题我已经遇到好多次了，客户现场偶尔会有这种问题，前期遇到这类问题，需要花不少的时间来定位。

针对这种问题，我们梳理了公司导入的光模块，输出了 excel 表格，当问题出现时，**首先获取客户现场使用的光模块型号，然后查 excel 表格就能立刻得出结论**。

输出一个光模块型号列表花了**一个小时左右**，但梳理出这个流程后，下一次遇到相同问题时分分钟就能够解决了，无疑提**高了我们解决问题的效率**。

其实这里还可以进一步优化，可以写一个**能够直接获取光模块型号等信息的工具**，这样就能够打破前场的某些限制条件。

进一步再想，其实可以搞一个整合这个获取光模块型号信息的工具与兼容光模块 excel 列表的工具。这个工具首先**使用获取光模块型号信息的工具获取接口的模块信息**，然后**使用某种方式获取兼容的光模块型号列表**，**直接判断模块是否支持并输出结果**。

有了这种工具光模块问题解决时间可能能够控制在 10 分钟以内，比起之前的几周、几天，这种效率不可同日而语！


