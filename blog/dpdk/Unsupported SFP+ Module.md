# Unsupported SFP+ Module
## 问题描述
ixgbe 网卡使用了不兼容的光模块后，dpdk 程序启动报 Unsupported SFP+ Module 错误，程序无法正常工作。

## 经验之谈
dpdk 的不同版本对光模块的兼容性存在着差别，不同版本的 dpdk pmd 驱动支持的光模块型号存在着差别。

## dpdk ixgbe pmd allow_unsupported_sfp 参数
dpdk 中的 ixgbe 驱动中可以设置允许使用不支持的 sfp 模块。

在 eth_ixgbe_dev_init 函数中有如下语句：

```c
hw->allow_unsupported_sfp = 1;
```

这里将 allow_unsupported_sfp 设置为 1 允许 ixgbe 驱动使用不支持的 sfp 模块。这种配置下的 ixgbe pmd 驱动可以使用的光模块型号会得到扩充，但使用官方未支持的 sfp 型号可能会引入新的问题。

## ixgbe 官方驱动 allow_unsupported_sfp 参数
ixgbe 官方驱动也支持 allow_unsupported_sfp 参数，在 insmod ixgbe 驱动的时候可以设置 allow_unsupported_sfp 参数。

modinfo 查看 ixgbe.ko 的参数得到如下相关的信息i：

```
parm:           allow_unsupported_sfp:Allow unsupported and untested SFP+ modules on 82599-based adapters (uint)
```

在使用 ixgbe 官方驱动的时候可以在加载模块时设置这个参数，不同的驱动版本支持的光模块型号可能也存在着差别。

注意，设置了 allow_unsupported_sfp 并不代表 sfp 模块就能够正常使用，需要以实际的测试结果为准。

