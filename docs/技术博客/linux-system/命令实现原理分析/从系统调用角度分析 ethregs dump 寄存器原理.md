# 从系统调用角度分析 ethregs dump 寄存器原理
## 1. 首先遍历 /sys/bus/pci/devices 子目录，扫描每个 pci 信息，获取 vendor id、device id、config、resource 中的相关信息。

部分信息信息示例如下：

```bash
 [root@localhost] # cat /sys/bus/pci/devices/0000\:86\:00.1/vendor
0x8086
 [root@localhost] # cat /sys/bus/pci/devices/0000\:86\:00.1/device
0x1583

 [root@localhost] # cat /sys/bus/pci/devices/0000\:86\:00.1/resource
0x000038017e800000 0x000038017effffff 0x000000000014220c
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x000038017f800000 0x000038017f807fff 0x000000000014220c
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x00000000e0e00000 0x00000000e0e7ffff 0x000000000004e200
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
0x0000000000000000 0x0000000000000000 0x0000000000000000
```
resource 文件的每一行表示一个 pci 资源空间，对于普通的 pci 设备来说，只有前 6 行有效，代表 6 个 bar 空间。每**一行的第一列表示 pci resource 资源的起始物理地址，第二列表示 pci resource 资源的结束物理地址，第三列表示 pci resource 资源的 flags。**

示例 resource 文件内容的第一行含义解析如下：

**在 bar0 上存在 resource 空间，起始物理地址为 38017e800000，终止物理地址为 38017effffff，标志为 14220c，空间长度为 8M。**

ethregs 需要 dump 寄存器，这就需要访问 pci 设备的 resource 资源空间，获取 resource 资源空间的物理地址是第一步，稍后就使用这些地址读取寄存器值。

相关的系统调用如下：

```strace
openat(AT_FDCWD, "/sys/bus/pci/devices/0000:00:17.0/resource", O_RDONLY) = 5
fstat(5, {st_mode=S_IFREG|0444, st_size=4096, ...}) = 0
read(5, "0x00000000c1214000 0x00000000c12"..., 4096) = 741
close(5)                                = 0
openat(AT_FDCWD, "/sys/bus/pci/devices/0000:00:17.0/irq", O_RDONLY) = 5
read(5, "127\n", 1024)                  = 4
close(5)                                = 0
openat(AT_FDCWD, "/sys/bus/pci/devices/0000:00:17.0/vendor", O_RDONLY) = 5
read(5, "0x8086\n", 1024)               = 7
close(5)                                = 0
openat(AT_FDCWD, "/sys/bus/pci/devices/0000:00:17.0/device", O_RDONLY) = 5
read(5, "0x9dd3\n", 1024)               = 7
close(5)                                = 0
openat(AT_FDCWD, "/sys/bus/pci/devices/0000:00:17.0/class", O_RDONLY) = 5
read(5, "0x010601\n", 1024)             = 9
close(5)                                = 0
```
上面的系统调用访问了 0000:00:17.0 pci 设备在 /sys 子目录中创建的一些重要文件，获取必要的信息。

## 2. open /dev/mem 文件
相关的系统调用如下：

```mmap
open("/dev/mem", O_RDONLY)              = 3
```
从内核 Documentation/admin-guide/devices.txt 文件中能够找到如下对 /dev/mem 文件功能的描述信息：

```c
   5    1 char   Memory devices
   6           1 = /dev/mem      Physical memory access
```
描述内容为 /dev/mem 被用来访问物理内存！在第一步解析到的 pci 资源物理地址最终通过 /dev/mem 文件映射到用户态后进行访问。

## 3. 通过 mmap /dev/mem 文件，映射 pci 设备 bar resource 的物理地址到用户态程序中
相关的系统调用如下：

```strace
mmap(NULL, 4194304, PROT_READ, MAP_SHARED, 3, 0x38017e800000) = 0x7ffff62a9000
```
这里 mmap 传递的最后一个参数为 bar0 resource 物理地址的起始地址，4194304 是 4M 大小，这是 bar0 resource 大小的一半，阅读 ethregs 源码发现 ethregs 针对 i40e 网卡，设定的 mmap size 就是 4M，ethregs 中相关的宏定义如下：

```c
#define I40E_MAX_REG_OFFSET     0x0400000
```
通过 mmap /dev/mem **将 pci 网卡寄存器所在的物理地址空间映射到了用户态程序中，将物理地址转化为了用户态的虚拟地址**，mmap 返回的地址就是 ethregs dump 寄存器使用的寄存器基地址。

## 4.通过 config 文件，读取 pci 配置空间内容并将 pci.ids 表载入到内存中
相关的系统调用如下：

```strace
open("/sys/bus/pci/devices/0000:86:00.1/config", O_RDONLY) = 4
pread64(4, "\0\2", 2, 10)               = 2
open("/usr/share/pci.ids.gz", O_RDONLY) = 5
lseek(5, 0, SEEK_CUR)                   = 0
read(5, "\37\213\10\0\0\0\0\0\2\3\234[[s\3338\262~\266\177\5\252\362\260N\225i\21\340U\251\363"..., 8192) = 8192
brk(0x67b000)                           = 0x67b000
read(5, "\203\332H3\24\264\361\0334s\254\240\307\204vu\241\241\351\213\372\375\343\177\274\340v\321\274\212hV"..., 8192) = 8192
................
```
上面的系统调用获取 pci 配置空间内容，系统调用侧看不出信息的流向。读取 /usr/share/pci.ids.gz 文件是为了显示每个 pci 设备的人性化字符描述信息。

## 5. 直接访问 mmap 出的虚拟内存空间，根据设备类别获取并 dump 寄存器信息
相关系统调用如下：
```c
mmap(NULL, 4194304, PROT_READ, MAP_SHARED, 3, 0x38017e800000) = 0x7ffff62a9000
write(1, "\tName                  Value\n", 29) = 29
write(1, "\t~~~~                  ~~~~~\n", 29) = 29
write(1, "\tVPINT_LNKLSTN(0)       ffffffff"..., 33) = 33
write(1, "\tVPINT_RATEN(0)         ffffffff"..., 33) = 33
write(1, "\tVPINT_CEQCTL(0)        ffffffff"..., 33) = 33
write(1, "\tVPINT_LNKLST0(0)       ffffffff"..., 33) = 33
write(1, "\tVPINT_RATE0(0)         ffffffff"..., 33) = 33
write(1, "\tVPINT_AEQCTL(0)        ffffffff"..., 33) = 33
```
mmap 映射 pci resource 的物理地址到用户态后就可以像访问普通内存地址那样获取寄存器的值，不同的 vendor id 与 device id 标识不同的网卡，ethregs 内部通过判断网卡的 vendor id 与 device id 分发到不同的 dump 寄存器子流程中，然后调用 write 将获取到的寄存器值输出到 stdout 上。

## ethregs mmap resource 空间的可选方式
ethregs 通过 /dev/mem 来实现 dump pci 网卡寄存器功能，其核心在于将 pci 网卡的 resource 资源空间映射到用户态，mmap /dev/mem 文件是一种方式，也可以参照 dpdk 用户态驱动的方式通过 mmap /sys/bus/pci/devices/xxx/resourceX 文件的方式来将网卡的 pci resource 资源映射到用户态。

ethregs 的实现方式让它能够直接访问 pci 设备 dump 寄存器，此方式完全不同于 ethtool dump 寄存器的过程，在一些场景中能够派上很大用场。


