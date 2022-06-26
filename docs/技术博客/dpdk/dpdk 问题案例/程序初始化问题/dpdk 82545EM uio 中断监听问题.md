# Eal:Error reading from file descriptor 33

## 问题描述
**VMWARE** 虚机中，**82545EM** 虚拟网卡绑定 **igb_uio** 后，运行 dpdk 程序，dpdk 程序一直有如下报警信息：

```bash
Eal:Error reading from file descriptor 33: Input/output error
```
使用的 dpdk 版本为 **16.04**，程序为 l2fwd。
## 问题分析

### 1. dpdk 内部代码

与报错相关的代码：

```c
						bytes_read = read(events[n].data.fd, &buf, bytes_read);
                        if (bytes_read < 0) {
                                if (errno == EINTR || errno == EWOULDBLOCK)
                                        continue;

                                RTE_LOG(ERR, EAL, "Error reading from file "
                                        "descriptor %d: %s\n",
                                        events[n].data.fd,
                                        strerror(errno));
```

strerror 打印的结果为 Input/output error，查询**标准错误值表**，相关返回值的定义如下：

```c
#define EIO              5      /* I/O error */
```

表明问题为从 uio 文件读取时返回了 EIO 错误值，那么问题来了 **EIO 这个返回值是从哪里返回的呢？**

### 2. uio 模块中的代码
uio 模块中对 uio 文件注册的 read 回调函数部分代码如下：
```bash
static ssize_t uio_read(struct file *filep, char __user *buf,
                        size_t count, loff_t *ppos)
{
        struct uio_listener *listener = filep->private_data;
        struct uio_device *idev = listener->dev;
        DECLARE_WAITQUEUE(wait, current);
        ssize_t retval;
        s32 event_count;

        if (!idev->info->irq)
                return -EIO;
```

上述代码中的 **uio_read** 就是读取 /dev/uioX 文件时内核中最终调用到的函数。从上面的函数逻辑可以看出，当 **idev->info->irq** 的值为 0 时就会返回 **-EIO** 错误。

**那么 idev->info->irq 是在哪里初始化的呢？**

研究确定它在 igb_uio.c 中被初始化。

### 3. igb_uio.c 中初始化 uio_info 结构中 irq 字段的位置

相关代码如下： 

```c
switch (igbuio_intr_mode_preferred) {
        case RTE_INTR_MODE_MSIX:
                /* Only 1 msi-x vector needed */
                msix_entry.entry = 0;
                if (pci_enable_msix(dev, &msix_entry, 1) == 0) {
                        dev_dbg(&dev->dev, "using MSI-X");
                        udev->info.irq = msix_entry.vector;
                        udev->mode = RTE_INTR_MODE_MSIX;
                        break;
                }
                /* fall back to INTX */
        case RTE_INTR_MODE_LEGACY:
                if (pci_intx_mask_supported(dev)) {
                        dev_dbg(&dev->dev, "using INTX");
                        udev->info.irq_flags = IRQF_SHARED;
                        udev->info.irq = dev->irq;
                        udev->mode = RTE_INTR_MODE_LEGACY;
                        break;
                }
                dev_notice(&dev->dev, "PCI INTX mask not supported\n");
                /* fall back to no IRQ */
        case RTE_INTR_MODE_NONE:
                udev->mode = RTE_INTR_MODE_NONE;
                udev->info.irq = 0;
                break;

        default:
                dev_err(&dev->dev, "invalid IRQ mode %u",
                        igbuio_intr_mode_preferred);
                err = -EINVAL;
                goto fail_release_iomem;
        }
```

上述流程首先根据 **igb_uio** 模块加载时设置的中断模式进行匹配，默认值为 **RTE_INTR_MODE_MSIX**，由于 VMWARE 环境下，82545EM 网卡不支持 msic 与 intx 中断，流程执行到 **RTE_INTR_MODE_NONE** case 中，irq 的值被设置为 0，这就导致 **dpdk 通过 read 读取 uio 文件时一直报错**。

## 解决方法
尽管 VMWARE 环境下 82545EM 虚拟网卡不支持 msix、intx 中断，但是 dpdk 程序仍然能够正常运行，一定程度上说明没有使用到中断部分的功能。

同时分析代码确定相关的只有 lsc 中断，且我们并未对 82545EM 网卡使能 lsc 中断。

基于这样的事实，修改 igb_uio 代码，判断到网卡型号为 82545EM 则执行 RTE_INTR_MODE_LEGACY 中的流程。 

**测试确定修改后问题得到解决。**

另外一种可选的修改方案是在 dpdk pmd 驱动中针对 82545EM 网卡不注册监听 uio 中断的事件。

具体的修改方法如下：

**在 eth_em_dev_init 判断网卡型号，如果为 82545EM，则将接口 pci_dev 中 intr_handle 的 fd 字段设置为 -1。**




