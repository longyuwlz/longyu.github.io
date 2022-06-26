# lspci 与 setpci
lspci -nvv 查看到的部分信息：

```bash
01:00.0 0200: 1af4:1041 (rev 01)
       Subsystem: 1af4:1100
        Physical Slot: 0
        Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR+ FastB2B- DisINTx+
        Status: Cap+ 66MHz- UDF- FastB2B- ParErr- DEVSEL=fast >TAbort- <TAbort- <MAbort- >SERR- <PERR- INTx-
```
lspci 通过读取接口的 pci 配置空间获取**源信息**，然后进行**解析**并输出解析的结果。setpci 可以用来**读取、修改**接口 pci 配置空间的内容。

下面我使用 setpci 读取上述 lspci -nvv 输出访问的一些 pci 配置空间内容。

# 使用 setpci 读取 pci 配置空间
## 1. 查看 setpci 支持读取的 pci 配置空间寄存器
```c
root@virt-debian10:/home/longyu# setpci --dumpregs | head -n 10
cap pos w name
     00 W VENDOR_ID
     02 W DEVICE_ID
     04 W COMMAND
     06 W STATUS
     08 B REVISION
     09 B CLASS_PROG
     0a W CLASS_DEVICE
     0c B CACHE_LINE_SIZE
     0d B LATENCY_TIMER
```
第一列表示偏移量，第二列表示数据的长度（W 表示一个字长即两个字节长度，B 表示一个字节长度），第三列表示数据字段的名称。例如 0x00 处的一个字为 vendor id 的值，0x02 处的一个字为 device id 的值，0x04 处则为 COMMAND 的值等等。
## 2. 读取相关字段配置空间的值
```bash
root@virt-debian10:/home/longyu# setpci -s 01:00.0 00.w
1af4
root@virt-debian10:/home/longyu# setpci -s 01:00.0 02.w
1041
root@virt-debian10:/home/longyu# setpci -s 01:00.0 04.w
0507
root@virt-debian10:/home/longyu# setpci -s 01:00.0 06.w
0010
root@virt-debian10:/home/longyu# setpci -s 01:00.0 08.b
01
root@virt-debian10:/home/longyu# setpci -s 01:00.0 09.b
00
root@virt-debian10:/home/longyu# setpci -s 01:00.0 0a.w
0200
root@virt-debian10:/home/longyu# setpci -s 01:00.0 0c.b
00
root@virt-debian10:/home/longyu# setpci -s 01:00.0 0d.b
00
```
上述命令行中，-s 指定访问的 pci 设备，xxx.[wb] 表示需要读取的配置空间偏移量与长度，可以看到读取的值与文首 lspci -nvv 的部分输出（vendor id、device id）一致。
# 使用 setpci 写入 pci 配置空间寄存器
这里我以写入 pci 配置空间 COMMAND 寄存器为例进行描述。

写入前的 pci 配置空间 command 寄存器信息：

```bash
	Control: I/O+ Mem+ BusMaster+ SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR+ FastB2B- DisINTx+
```

执行写入命令：

```bash
root@virt-debian10:/home/longyu# setpci  -s 01:00.0 04.W=0
```
setpci 读取写入信息确认写入生效：

```bash
root@virt-debian10:/home/longyu# setpci -s 08:00.0 04.W
0000
```
重新查看 lspci 显示信息：

```bash
	Control: I/O- Mem- BusMaster- SpecCycle- MemWINV- VGASnoop- ParErr- Stepping- SERR- FastB2B- DisINTx-
```
能够看到写入生效了。注意**不要写入**一个【正在使用】的 pci 网卡的上述 **COMMAND** 配置空间寄存器，一旦写入会造成网卡无法正常工作。

# pci_enable_device 与 pci_disable_device 对 pci 配置空间的设定
下文中的代码摘自 **3.16.35** 内核。

## 1. pci_enable_device

```c
/**
 * pci_enable_device - Initialize device before it's used by a driver.
 * @dev: PCI device to be initialized
 *
 *  Initialize device before it's used by a driver. Ask low-level code
 *  to enable I/O and memory. Wake up the device if it was suspended.
 *  Beware, this function can fail.
 *
 *  Note we don't actually enable the device many times if we call
 *  this function repeatedly (we just increment the count).
 */
int pci_enable_device(struct pci_dev *dev)
{
        return pci_enable_device_flags(dev, IORESOURCE_MEM | IORESOURCE_IO);
}
EXPORT_SYMBOL(pci_enable_device);
```

## pci_enable_device_flags

```c
static int pci_enable_device_flags(struct pci_dev *dev, unsigned long flags)
{
        struct pci_dev *bridge;
        int err;
        int i, bars = 0;

        /*
         * Power state could be unknown at this point, either due to a fresh
         * boot or a device removal call.  So get the current power state
         * so that things like MSI message writing will behave as expected
         * (e.g. if the device really is in D0 at enable time).
         */
        if (dev->pm_cap) {
                u16 pmcsr;
                pci_read_config_word(dev, dev->pm_cap + PCI_PM_CTRL, &pmcsr);
                dev->current_state = (pmcsr & PCI_PM_CTRL_STATE_MASK);
        }

        if (atomic_inc_return(&dev->enable_cnt) > 1)
                return 0;               /* already enabled */

.........

        /* only skip sriov related */
        for (i = 0; i <= PCI_ROM_RESOURCE; i++)
                if (dev->resource[i].flags & flags)
                        bars |= (1 << i);
        for (i = PCI_BRIDGE_RESOURCES; i < DEVICE_COUNT_RESOURCE; i++)
                if (dev->resource[i].flags & flags)
                        bars |= (1 << i);

        err = do_pci_enable_device(dev, bars);
        if (err < 0)
                atomic_dec(&dev->enable_cnt);
```

此函数中会使用每个设备的使能计数判定是否已经使能过，**已经使能过则不再使能**，直接返回。此函数核心在于调用 do_pci_enable_device 函数。

## do_pci_enable_device 函数主要代码
```c
static int do_pci_enable_device(struct pci_dev *dev, int bars)
{
        int err;
        struct pci_dev *bridge;
        u16 cmd;
        u8 pin;

        err = pci_set_power_state(dev, PCI_D0);
        if (err < 0 && err != -EIO)
                return err;

.........

        err = pcibios_enable_device(dev, bars);
        if (err < 0)
                return err;
        pci_fixup_device(pci_fixup_enable, dev);

        if (dev->msi_enabled || dev->msix_enabled)
                return 0;

        pci_read_config_byte(dev, PCI_INTERRUPT_PIN, &pin);
        if (pin) {
                pci_read_config_word(dev, PCI_COMMAND, &cmd);
                if (cmd & PCI_COMMAND_INTX_DISABLE)
                        pci_write_config_word(dev, PCI_COMMAND,
                                              cmd & ~PCI_COMMAND_INTX_DISABLE);
        }

        return 0;
}
```

do_pci_enable_device 函数首先设定设备的电源状态为 **PCI_D0** 状态。然后首先调用 **pcibios_enable_device** 做一些【架构相关】的 pci 设备使能操作。

中间跳过了我不太熟悉的 pci 桥的配置逻辑。

**pci_fixup_device** 用于修复一些可恢复的错误。此后对于未使能 msi 与 misx 的 pci 设备，读取 pci 配置空间中的中断引脚。当设备绑定到一个中断引脚上时，读取 PCI 配置空间的控制字节 04 偏移处的一个字节，根据读取的结果判断 INTX 是否开启，未开启，则使能 INTX 中断。

## pci_disable_device 函数

```c
/**
 * pci_disable_device - Disable PCI device after use
 * @dev: PCI device to be disabled
 *
 * Signal to the system that the PCI device is not in use by the system
 * anymore.  This only involves disabling PCI bus-mastering, if active.
 *
 * Note we don't actually disable the device until all callers of
 * pci_enable_device() have called pci_disable_device().
 */
void pci_disable_device(struct pci_dev *dev)
{
        struct pci_devres *dr;

        dr = find_pci_dr(dev);
        if (dr)
                dr->enabled = 0;

        dev_WARN_ONCE(&dev->dev, atomic_read(&dev->enable_cnt) <= 0,
                      "disabling already-disabled device");

        if (atomic_dec_return(&dev->enable_cnt) != 0)
                return;

        do_pci_disable_device(dev);

        dev->is_busmaster = 0;
}
EXPORT_SYMBOL(pci_disable_device);
```

**pci_disable_device** 用于【禁用】一个 pci 设备，当设备已经被禁用时，会打印禁用一个已经禁用过的设备的 oops 告警信息。

此后读取使能标记，原子减 1 后不为 0 时此函数直接返回。正常流程继续调用 do_pci_disable_device 函数。

## do_pci_disable_device 函数

```c
static void do_pci_disable_device(struct pci_dev *dev)
{
        u16 pci_command;

        pci_read_config_word(dev, PCI_COMMAND, &pci_command);
        if (pci_command & PCI_COMMAND_MASTER) {
                pci_command &= ~PCI_COMMAND_MASTER;
                pci_write_config_word(dev, PCI_COMMAND, pci_command);
        }

        pcibios_disable_device(dev);
}
```

此函数中读取 pci 配置空间 04 偏移处两个字节大小的控制信息，清除 PCI_COMMAND_MASTER 标志后重新写回到配置空间中。最后调用 pcibios_disable_device 来执行一些架构相关的使能操作。

