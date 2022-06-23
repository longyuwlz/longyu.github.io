# dpdk-16.04 eal 初始化 log 信息解析
## 前言
最近一年左右我解决了很多 dpdk 程序相关的问题，这些问题中有一些问题能够从程序运行的输出信息中找到原因，可由于对这部分信息的重视程度不够，东绕西绕才能找出真正的问题，其效率无疑【非常低下】。

同时也遇到过产品的同事咨询 dpdk 程序输出信息的问题，一些问题自己也无法解释，场面一度【十分尴尬】。

鉴于以上两点内容，我在本篇文章中基于 dpdk-16.04 l2fwd 描述下 dpdk 程序输出信息的不同含义，作为记录的同时也希望能为定位问题提供【参考】。

## 设备环境信息
我使用本地的虚拟机测试，下面是一些相关的环境信息：

### 1. cpu 核与 numa 信息

```bash
longyu@virt-debian10:~/$ lscpu
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
Address sizes:       40 bits physical, 48 bits virtual
CPU(s):              4
On-line CPU(s) list: 0-3
Thread(s) per core:  4
Core(s) per socket:  1
Socket(s):           1
NUMA node(s):        1
Vendor ID:           GenuineIntel
CPU family:          6
Model:               94
Model name:          Intel Core Processor (Skylake, IBRS)
Stepping:            3
CPU MHz:             1800.000
BogoMIPS:            3600.00
Virtualization:      VT-x
Hypervisor vendor:   KVM
Virtualization type: full
L1d cache:           32K
L1i cache:           32K
L2 cache:            4096K
L3 cache:            16384K
NUMA node0 CPU(s):   0-3
Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault invpcid_single pti ssbd ibrs ibpb tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid mpx rdseed adx smap clflushopt xsaveopt xsavec xgetbv1 xsaves arat umip
```
我使用的虚机为单核 4 线程，有 1 个 numa 节点，cpu 频率为 1.8G。

### 2. hugepage 信息
```bash
longyu@virt-debian10:~$ grep -i 'huge' /proc/meminfo 
AnonHugePages:      2048 kB
ShmemHugePages:        0 kB
HugePages_Total:     512
HugePages_Free:      512
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:         1048576 kB
```
虚机设定了 512 个 2M 大小的 hugepage 并挂载 hugetlbfs。

### 3. 接口绑定信息
```bash
longyu@virt-debian10:~$ dpdk-devbind.py -s 

Network devices using DPDK-compatible driver
============================================
0000:04:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=e1000e
0000:08:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=e1000e
0000:09:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=e1000e

Network devices using kernel driver
===================================
0000:01:00.0 'Virtio network device' if=enp1s0 drv=virtio-pci unused=virtio_pci,igb_uio *Active*

Other network devices
=====================
<none>
```
管理口使用 virtio 网卡，其它三个业务口使用 e1000e 网卡并绑定到 igb_uio 驱动中。

### 4. dpdk 版本与测试程序
dpdk 版本：dpdk-16.04
dpdk 测试程序：dpdk 示例程序——l2fwd

## l2fwd 执行输出信息
执行命令如下：
```bash
	sudo ./l2fwd -- -p0x1
```
l2fwd 程序执行的输出信息如下：
```bash
EAL: Detected lcore 0 as core 0 on socket 0
EAL: Detected lcore 1 as core 0 on socket 0
EAL: Detected lcore 2 as core 0 on socket 0
EAL: Detected lcore 3 as core 0 on socket 0
EAL: Support maximum 128 logical core(s) by configuration.
EAL: Detected 4 lcore(s)
EAL: No free hugepages reported in hugepages-1048576kB
EAL: Probing VFIO support...
EAL: Module /sys/module/vfio_pci not found! error 2 (No such file or directory)
EAL: VFIO modules not loaded, skipping VFIO support...
EAL: Setting up child physically contiguous memory...
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400005000000 (size = 0x200000)
EAL: Ask a virtual area of 0x9000000 bytes
EAL: Virtual area found at 0x400005200000 (size = 0x9000000)
EAL: Ask a virtual area of 0xc00000 bytes
EAL: Virtual area found at 0x40000e200000 (size = 0xc00000)
EAL: Ask a virtual area of 0x20c00000 bytes
EAL: Virtual area found at 0x40000ee00000 (size = 0x20c00000)
EAL: Ask a virtual area of 0x14800000 bytes
EAL: Virtual area found at 0x40002fa00000 (size = 0x14800000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044200000 (size = 0x200000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044400000 (size = 0x200000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044600000 (size = 0x200000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044800000 (size = 0x200000)
EAL: Ask a virtual area of 0x400000 bytes
EAL: Virtual area found at 0x400044a00000 (size = 0x400000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044e00000 (size = 0x200000)
EAL: Requesting 512 pages of size 2MB from socket 0
EAL: TSC frequency is ~1800013 KHz
EAL: WARNING: cpu flags constant_tsc=yes nonstop_tsc=no -> using unreliable clock cycles !
EAL: Master lcore 0 is ready (tid=794d43c0;cpuset=[0])
EAL: lcore 1 is ready (tid=78cd1700;cpuset=[1])
EAL: lcore 2 is ready (tid=784d0700;cpuset=[2])
EAL: lcore 3 is ready (tid=77ccf700;cpuset=[3])
EAL: PCI device 0000:01:00.0 on NUMA socket -1
EAL:   probe driver: 1af4:1041 rte_virtio_pmd
EAL:   Not managed by a supported kernel driver, skipped
EAL: PCI device 0000:04:00.0 on NUMA socket -1
EAL:   probe driver: 8086:10d3 rte_em_pmd
EAL:   PCI memory mapped at 0x400045000000
EAL:   PCI memory mapped at 0x400045020000
EAL:   PCI memory mapped at 0x400045040000
PMD: eth_em_dev_init(): port_id 0 vendorID=0x8086 deviceID=0x10d3
EAL: PCI device 0000:08:00.0 on NUMA socket -1
EAL:   probe driver: 8086:10d3 rte_em_pmd
EAL:   PCI memory mapped at 0x400045044000
EAL:   PCI memory mapped at 0x400045064000
EAL:   PCI memory mapped at 0x400045084000
PMD: eth_em_dev_init(): port_id 1 vendorID=0x8086 deviceID=0x10d3
EAL: PCI device 0000:09:00.0 on NUMA socket -1
EAL:   probe driver: 8086:10d3 rte_em_pmd
EAL:   PCI memory mapped at 0x400045088000
EAL:   PCI memory mapped at 0x4000450a8000
EAL:   PCI memory mapped at 0x4000450c8000
PMD: eth_em_dev_init(): port_id 2 vendorID=0x8086 deviceID=0x10d3
--------------(nil)
```
有了完整的输出信息后，下面根据不同的功能拆分进行描述。

### 1. cpu 核与 numa 的关系
```bash
EAL: Detected lcore 0 as core 0 on socket 0
EAL: Detected lcore 1 as core 0 on socket 0
EAL: Detected lcore 2 as core 0 on socket 0
EAL: Detected lcore 3 as core 0 on socket 0
EAL: Support maximum 128 logical core(s) by configuration.
EAL: Detected 4 lcore(s)
```
测试环境为 4 核单 numa 结构，numa 在上述输出中对应的信息为 **socket 0**，0 表示第一个 numa 节点。

在这个环境中，l2fwd 检测到四个逻辑核，这四个核都位于一个 cpu 上。

### 2. 映射的 hugepage 种类与大小
```c
EAL: No free hugepages reported in hugepages-1048576kB
...........
EAL: Requesting 512 pages of size 2MB from socket 0
```
dpdk 支持多种不同大小的 hugepage size，常见的有 2M、512M、1G 等类型，具体支持哪种 hugepage size 与内核配置有关。

上述输出的第一行表明，当前系统中未创建 1G 的 hugepage 大页，第二行输出表明 hugepage 从 numa 0 中映射了 512 个 2M 的大页，共计 1G 空间。

我在 [Failed to mmap 2 MB hugepages 与 max_map_count limit](https://blog.csdn.net/Longyu_wlz/article/details/113561592?spm=1001.2014.3001.5501) 中描述了大页数量过多导致映射失败的一个问题。dpdk-16.04 会在程序初始化的时候映射所有的大页，即便存在 -m 参数限定，仍旧会先映射所有的大页。

### 3. vfio 相关功能初始化
```bash
EAL: Probing VFIO support...
EAL: Module /sys/module/vfio_pci not found! error 2 (No such file or directory)
EAL: VFIO modules not loaded, skipping VFIO support...
```
dpdk-16.04 支持 vfio 方式映射网卡到用户态中，dpdk 通过 vfio_pci 内核模块是否加载来判断是否使能 VFIO 模块。

当 vfio_pci 模块加载后，重新执行 dpdk 程序输出信息如下：

```c
EAL: Probing VFIO support...
EAL:   IOMMU type 1 (Type 1) is supported
EAL:   IOMMU type 8 (No-IOMMU) is not supported
EAL: VFIO support initialized
```
这些信息表明 dpdk 内部 vfio 模块成功初始化。

### 3. 使用 hugepage 初始化的 heap 内存信息
```bash
EAL: Setting up child physically contiguous memory...
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400005000000 (size = 0x200000)
EAL: Ask a virtual area of 0x9000000 bytes
EAL: Virtual area found at 0x400005200000 (size = 0x9000000)
EAL: Ask a virtual area of 0xc00000 bytes
EAL: Virtual area found at 0x40000e200000 (size = 0xc00000)
EAL: Ask a virtual area of 0x20c00000 bytes
EAL: Virtual area found at 0x40000ee00000 (size = 0x20c00000)
EAL: Ask a virtual area of 0x14800000 bytes
EAL: Virtual area found at 0x40002fa00000 (size = 0x14800000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044200000 (size = 0x200000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044400000 (size = 0x200000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044600000 (size = 0x200000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044800000 (size = 0x200000)
EAL: Ask a virtual area of 0x400000 bytes
EAL: Virtual area found at 0x400044a00000 (size = 0x400000)
EAL: Ask a virtual area of 0x200000 bytes
EAL: Virtual area found at 0x400044e00000 (size = 0x200000)
EAL: Requesting 512 pages of size 2MB from socket 0
```
dpdk 内部的 heap 使用 hugepage 内存来分配空间，上述输出描述了初始化 heap 的过程。Ask a virtual area of xxx bytes 表明了申请虚拟内存空间的大小，申请的内存总大小为 1G。

上述输出中 Ask a virtual area of xxx 输出多次，这表明内核分配的 hugepage 内存相对分散。

上述输出中初始化的最大内存区域为 549453824 字节（524M），这决定了程序能够申请的单个内存的上限，当 dpdk 程序报错信息表明与申请内存空间有关时，不妨比对下申请空间的大小与这里提到的单个内存的上限。

一般来说在系统运行后通过写入 /sys 目录中的文件来分配大页则容易出现大页不连续分布的情况，这时即便增加大页的数目也可能因为内存空间的分散而遇到相同的问题，一般将预留的大页数目写入到内核引导参数中，在内核初始化过程中就预留好大页内存，避免因后期内存的使用而产生不同大小的离散空间。

### 4. 识别到的频率信息
```bash
EAL: TSC frequency is ~1800013 KHz
EAL: WARNING: cpu flags constant_tsc=yes nonstop_tsc=no -> using unreliable clock cycles !
```
第一行输出表明 dpdk 探测到 cpu 频率在 1.8G 左右，与上文描述过的虚拟机配置接近。这里的频率用于 dpdk 内部延时计算，dpdk 内部需要维护内部定时器时间，同时网卡硬件初始化中也需要按照时序要求而延时，且对精度有一定的要求。

第二行的信息表明系统使用了不可靠的时钟周期，这个输出通过获取 /proc/cpuinfo 中的 cpu flags 参数确定。其中提到的两个与时钟相关的名词解释如下：

>constant_tsc: TSC ticks at a constant rate
>nonstop_tsc: TSC does not stop in C states

constant_tsc 表明时钟周期按照固定的频率触发，nonstop_tsc 表明时钟不会在　ACPI 切换为 C 状态的时候停止。

在我测试用的虚拟机中，支持 constant_tsc 而不支持 nonstop_tsc，故而输出使用不可靠时钟源的信息。
### 5. master 线程所在 cpu 核
```bash
EAL: Master lcore 0 is ready (tid=794d43c0;cpuset=[0])
```
此行输出表明 dpdk 使用 lcorea 0 作为 master 线程，cpuset 表明 master 线程被绑定到 0 核上。

### 6. 非 master 线程的 cpuset 信息
```bash
EAL: lcore 1 is ready (tid=78cd1700;cpuset=[1])
EAL: lcore 2 is ready (tid=784d0700;cpuset=[2])
EAL: lcore 3 is ready (tid=77ccf700;cpuset=[3])
```
上述输出表明创建了三个非 master 线程，这些线程分别被绑定到 1、2、3 核上。
### 7. 识别到了哪些网卡接口类型
dpdk 在初始化过程中会扫描 pci 设备并 probe，可以分为如下两个类别的信息：

### 1. 未绑定到用户态驱动的 pci 设备
```bash
EAL: PCI device 0000:01:00.0 on NUMA socket -1
EAL:   probe driver: 1af4:1041 rte_virtio_pmd
EAL:   Not managed by a supported kernel driver, skipped
```
dpdk 会扫描所有的 pci 设备，建立 pci 设备链表，并尝试 probe 设备。第一行输出中 0000:01:00.0 表示一个 pci 设备，NUMA socket 值为 -1 表明没有获取到设备所在的 numa 节点信息。

第二行输出表明 dpdk 尝试 probe 设备，1af4:1041 是设备的 vendor id 与 device id，rte_virtio_pmd 表示 dpdk 匹配到的设备驱动名称，这是一个 virtio 网卡接口。

第三行输出信息表明此接口未绑定到 dpdk 支持的用户态驱动中，probe 过程被跳过，dpdk 将不会使用该接口。
### 2. 绑定到用户态驱动的 pci 设备
```bash
EAL: PCI device 0000:04:00.0 on NUMA socket -1
EAL:   probe driver: 8086:10d3 rte_em_pmd
EAL:   PCI memory mapped at 0x400045000000
EAL:   PCI memory mapped at 0x400045020000
EAL:   PCI memory mapped at 0x400045040000
PMD: eth_em_dev_init(): port_id 0 vendorID=0x8086 deviceID=0x10d3
```
前两行的信息上文已经解释过，这个接口是 e1000e 网卡，支持的驱动为 rte_em_pmd 驱动，第 3~5 行输出 pci 内存映射地址，这些地址用于后续网卡的初始化工作。

最后一行信息中 PMD: 表明信息输出模块位于 PMD 驱动中，eth_em_dev_init 是此驱动的初始化函数。port_id 是 dpdk 内部对 probe 接口的标识，此接口的 id 为 0，最后输出的 vendorID 与 deviceID 与第二行的输出相同。

dpdk 程序初始化过程中会对扫描到的 pci 号从小到大进行排序，port_id 依次递增。

这些输出信息表明了 dpdk 程序识别并 probe 了哪些接口，当你添加新网卡时，初始化信息看不到对应的接口输出信息，可以从如下两个方面进行排查：

1. dpdk 是否支持新网卡（查看 lib/librte_eal/common/include/rte_pci_dev_ids.h）
2. dpdk 程序是否链接新网卡的 pmd 驱动库

dpdk 使用 gcc 的 constructor 来注册不同的 pmd 驱动，使用静态库时没有链接相关的库则不会支持相应的网卡。更详细的信息请访问 [gcc constructor 属性修饰的构造函数未被链接问题](https://blog.csdn.net/Longyu_wlz/article/details/113725959?spm=1001.2014.3001.5501)。

## 总结
程序运行时常常会有一些**输出信息**，这些输出信息却常常被忽略。这些信息并不是多余的内容，其中可能隐藏着问题的蛛丝马迹。

经常出现的场景是，要定位某问题时，找不到程序的输出信息，或者找到了输出信息，却不懂输出信息的含义，遑论从中找到疑点。

回过头想想，其实输出信息一直都在那里，正如问题一直都在那里一样，你能否发现它并带有好奇心去研究它却因人而异了！