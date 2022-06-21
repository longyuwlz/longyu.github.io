## 环境信息

**虚机环境**：KVM x86 虚机环境

虚机的配置的网卡：
```bash
00:03.0 Ethernet controller: Red Hat, Inc Virtio network device
00:04.0 Ethernet controller: Red Hat, Inc Virtio network device
00:09.0 Ethernet controller: Red Hat, Inc Virtio network device
00:0a.0 Ethernet controller: Red Hat, Inc Virtio network device
00:0b.0 Ethernet controller: Red Hat, Inc Virtio network device
```

**网口功能**：00:03.0 作为管理口，其余四个口绑定到 igb_uio 作为业务口。

**dpdk 版本：dpdk-16.04**

## 问题描述

运行 l2fwd 后，运行 dpdk_proc_info 获取信息，获取信息的时候出现段错误。

**段错误信息：**

```bash
Thread 1 "dpdk_proc_info" received signal SIGSEGV, Segmentation fault.
0x00007ffff691856f in vtpci_with_feature (hw=0x0, bit=15)
    at /home/longyu/dpdk-16.04/drivers/net/virtio/virtio_pci.h:295
295     /home/longyu/dpdk-16.04/drivers/net/virtio/virtio_pci.h: No such file or directory.
(gdb) bt
#0  0x00007ffff691856f in vtpci_with_feature (hw=0x0, bit=15)
    at /home/longyu/dpdk-16.04/drivers/net/virtio/virtio_pci.h:295
#1  0x00007ffff691a835 in rx_func_get (
    eth_dev=0x69d0c0 <rte_eth_devices+65824>)
    at /home/longyu/dpdk-16.04/drivers/net/virtio/virtio_ethdev.c:1160
#2  0x00007ffff691ab13 in eth_virtio_dev_init (
    eth_dev=0x69d0c0 <rte_eth_devices+65824>)
    at /home/longyu/dpdk-16.04/drivers/net/virtio/virtio_ethdev.c:1287
#3  0x00007ffff600ad69 in rte_eth_dev_init (
    pci_drv=0x7ffff6c9eae0 <rte_virtio_pmd>, pci_dev=0x2772b20)
    at /home/longyu/dpdk-16.04/lib/librte_ether/rte_ethdev.c:302
#4  0x00007ffff604c628 in rte_eal_pci_probe_one_driver (
    dr=0x7ffff6c9eae0 <rte_virtio_pmd>, dev=0x2772b20)
    at /home/longyu/dpdk-16.04/lib/librte_eal/common/eal_common_pci.c:199
#5  0x00007ffff604c88a in pci_probe_all_drivers (dev=0x2772b20)
    at /home/longyu/dpdk-16.04/lib/librte_eal/common/eal_common_pci.c:275
```

dpdk_proc_info 初始化中的重要信息：

```bash
EAL: lcore 0 is ready (tid=f1b6d700;cpuset=[0])
EAL: PCI device 0000:00:03.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:04.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:09.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:0a.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:0b.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
```

## 问题分析

dpdk_proc_info 作为 secondary 进程，在初始化的时候**把 00:03.0 管理口也作为普通的业务口初始化了**，没有**跳过 virtio 管理口**。

**在 l2fwd 中只初始化了四个业务口**，**secondary** 进程在初始化到第五个口时，由于 l2fwd 并**没有创建**第五个业务口的 hw 数据结构，导致**获取到的共享数据结构为 NULL，访问此字段触发段错误**。

## 相关的函数调用

```c
rte_eal_init
	rte_eal_pci_probe
		pci_probe_all_drivers
			rte_eal_pci_probe_one_driver
				rte_eth_dev_init
					rte_eth_dev_allocate
						eth_virtio_dev_init
							rx_func_get 
```

重点研究下 rte_eth_dev_allocate 函数，其代码如下：

```bash
struct rte_eth_dev *
rte_eth_dev_allocate(const char *name, enum rte_eth_dev_type type)
{
	uint8_t port_id;
	struct rte_eth_dev *eth_dev;

	port_id = rte_eth_dev_find_free_port();
	if (port_id == RTE_MAX_ETHPORTS) {
		RTE_PMD_DEBUG_TRACE("Reached maximum number of Ethernet ports\n");
		return NULL;
	}

	if (rte_eth_dev_data == NULL)
		rte_eth_dev_data_alloc();

	if (rte_eth_dev_allocated(name) != NULL) {
		RTE_PMD_DEBUG_TRACE("Ethernet Device with name %s already allocated!\n",
				name);
		return NULL;
	}

	eth_dev = &rte_eth_devices[port_id];
	eth_dev->data = &rte_eth_dev_data[port_id];
	.........
	nb_ports++;
	return eth_dev;
}
```

rte_eth_dev_allocate 函数用于**分配 ethdev 结构**，**每个 ethdev 结构**会**关联**到一个 **struct rte_eth_dev_data 数据指针**，primary 进程在初始化的时候会分配一块 **RTE_MAX_ETHPORTS** 个 rte_eth_dev_data 数据结构，并将其清零。

rte_eth_dev_data_alloc 函数完成每个 port struct rte_eth_dev_data 结构的创建，其代码如下：

```bash
static void
rte_eth_dev_data_alloc(void)
{
	const unsigned flags = 0;
	const struct rte_memzone *mz;

	if (rte_eal_process_type() == RTE_PROC_PRIMARY) {
		mz = rte_memzone_reserve(MZ_RTE_ETH_DEV_DATA,
				RTE_MAX_ETHPORTS * sizeof(*rte_eth_dev_data),
				rte_socket_id(), flags);
	} else {   
            mz = rte_memzone_lookup(MZ_RTE_ETH_DEV_DATA);
    }
    
	if (mz == NULL)
		rte_panic("Cannot allocate memzone for ethernet port data\n");

	rte_eth_dev_data = mz->addr;
	if (rte_eal_process_type() == RTE_PROC_PRIMARY)
		memset(rte_eth_dev_data, 0,
				RTE_MAX_ETHPORTS * sizeof(*rte_eth_dev_data));
}
```

secondary 进程通过 **rte_memzone_lookup** 直接 **attach** 到 **primary 进程中创建**的字段中，直接共享使用。这意味着在 **secondary 进程运行的时候 RTE_MAX_ETHPORTS 个 eth_dev 的 rte_eth_dev_data 结构都被创建完成**。

## 我的问题

### 1. 为什么 secondary 进程 probe 网口的时候没有跳过绑定到官方驱动的 virtio 网卡？

**rte_eal_pci_probe_one_driver** 中当 **match** 到一个 **pci** 驱动时，当驱动的 **rte_pci_driver 结构的 drv_flags** 设置了 **RTE_PCI_DRV_NEED_MAPPING** 标志后，**rte_eal_pci_map_device** 函数会被调用，此函数会判断接口绑定到的驱动类型，绑定到管理口的接口 rte_eal_pci_map_device 函数会打印信息并返回错误，随后**rte_eal_pci_probe_one_driver 函数中会直接返回，跳过当前接口**。

**virtio** 驱动的 **rte_pci_driver** 结构中并**没有设定这个标志**，导致不能在这一步识别到。**常见的物理网卡诸如 igb、ixgbe、i40e 都设置了这个标志，不存在这个问题。**

### 2. primary 进程在哪里检测到接口未绑定到 dpdk 支持的驱动中？

primary 进程在调用 **eth_virtio_dev_init** 初始化接口的时候，在子函数调用中会执行与 **rte_eal_pci_map_device** 过程。

相关函数调用：

```c

eth_virtio_dev_init
	vtpci_init
		virtio_read_caps
			rte_eal_pci_map_device
```

**vtpci_init** 函数的子函数调用中映射网卡的 pci 资源空间失败，进而导致 **eth_virtio_dev_init** 返回 1。

**这里的返回值非常关键，当返回值大于 0 时，函数调用返回到 pci_probe_all_drivers 中，此函数检测到返回值大于 0 则继续初始化后续接口**，如果**返回值小于 0，函数返回到 rte_eal_pci_probe 中，打印 Requested device xxxx cannot be used 后程序终止**。

## 解决方案

修复 patch ：

```cpp
Index: drivers/net/virtio/virtio_ethdev.c
===================================================================
--- drivers/net/virtio/virtio_ethdev.c  (revision 666666)
+++ drivers/net/virtio/virtio_ethdev.c  (working copy)
@@ -1266,6 +1266,26 @@
        return 0;
 }

+static int check_device_driver(struct rte_pci_device *dev)
+{
+       int ret = -1;
+
+       switch (dev->kdrv) {
+       case RTE_KDRV_VFIO:
+       case RTE_KDRV_IGB_UIO:
+       case RTE_KDRV_UIO_GENERIC:
+               ret = 0;
+               break;
+       default:
+               RTE_LOG(DEBUG, EAL,
+                       "  Not managed by a supported kernel driver, skipped\n");
+               ret = 1;
+               break;
+       }
+
+       return ret;
+}
+
 /*
  * This function is based on probe() function in virtio_pci.c
  * It returns 0 on success.
@@ -1284,6 +1304,14 @@
        eth_dev->tx_pkt_burst = &virtio_xmit_pkts;

        if (rte_eal_process_type() == RTE_PROC_SECONDARY) {
+               int ret;
+               pci_dev = eth_dev->pci_dev;
+
+               ret = check_device_driver(pci_dev);
+
+               if (unlikely(ret))
+                       return EINVAL;
+
                rx_func_get(eth_dev);
                return 0;
        }
```

此 patch 在 **eth_virtio_dev_init** 中添加在 SECONDARY 进程中判断 pci 接口是否绑定到 dpdk 支持的驱动中，判断失败则返回 EINVAL（**必须返回正数用于上层逻辑处理**）。

## 测试记录

修改后，重新执行 dpdk_proc_info 进程，打印如下：

```cpp
EAL: PCI device 0000:00:03.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL:   Not managed by a supported kernel driver, skipped
EAL: PCI device 0000:00:04.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:09.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:0a.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
EAL: PCI device 0000:00:0b.0 on NUMA socket -1
EAL:   probe driver: 1af4:1000 rte_virtio_pmd
```

可以看到修改后管理口被**跳过**，**问题得到解决**。