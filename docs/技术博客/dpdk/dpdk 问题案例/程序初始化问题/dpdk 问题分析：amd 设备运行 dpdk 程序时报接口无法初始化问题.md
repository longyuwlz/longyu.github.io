# dpdk 问题分析：amd 设备运行 dpdk 程序时报接口无法初始化问题
## 问题描述
某 amd 设备，dpdk 程序初始化的时候报错，程序异常终止。

dmesg 中有如下报错信息：

```dmesg
[Tue Jun 22 10:28:52 2021] AMD-Vi: Event logged [IO_PAGE_FAULT device=02:00.0 domain=0x005d address=0x000000024e398d40 flags=0x0010]
[Tue Jun 22 10:28:53 2021] AMD-Vi: Event logged [IO_PAGE_FAULT device=02:00.0 domain=0x005d address=0x000000024e398d40 flags=0x0010]
[Tue Jun 22 10:28:53 2021] AMD-Vi: Event logged [IO_PAGE_FAULT device=02:00.0 domain=0x005d address=0x000000024e398d40 flags=0x0010]
[Tue Jun 22 10:28:54 2021] AMD-Vi: Event logged [IO_PAGE_FAULT device=02:00.0 domain=0x005d address=0x000000024e398d40 flags=0x0010]
[Tue Jun 22 10:28:54 2021] AMD-Vi: Event logged [IO_PAGE_FAULT device=02:00.0 domain=0x005d address=0x000000024e398d40 flags=0x0010]
[Tue Jun 22 10:28:54 2021] AMD-Vi: Event logged [IO_PAGE_FAULT device=02:00.0 domain=0x005d address=0x000000024e398d40 flags=0x0010]
```

## 问题分析
dmesg 报错中，02:00.0 是 dpdk 程序接管的网卡 pci 设备，报错信息表明访问此设备的 io 地址时出现页错误。

## 解决方法
**第一种方法：**
	
在 grub.conf 文件中内核引导参数添加 **amd_iommu=off** 的配置项目后重启
	
**第二种方法:**
在 grub.conf 文件中内核引导参数添加 **iommu=pt** 配置项目后重启

