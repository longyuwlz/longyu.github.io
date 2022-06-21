# dpdk 程序收发包问题排查
## 接口不收包问题排查

1.确认网卡类型与异常接口

2.收集 ethtool -i x/x、ifconfig x/x、ethtool x/x、ethtool -d x/x、ethtool -S x/x 信息

3.确认接口连线是否正常，接口是否 up，接口处于 down 状态不能说明收包存在异常

4.确认对端是否在发流，对端没有发流则不能说明存在异常

5.dmesg 信息中是否有下面类似的信息：

```dmesg
    dmar: DMAR:[DMA Read] Request device [01:00.0] fault addr 37ae5000 DMAR:[fault reason 02] Present bit in context entry is clear 
```
   device pci 号是 dpdk 程序使用的网卡接口的 pci 号，符合这个问题的特征是**从一开始就不能收包，而且是必现的**，有这个前提则修改 grug.cfg 文件，内核 cmdline 中添加 intel_iommu=off 配置后重试。

6.判断 ethtool -d dump 的寄存器信息中是否有异常如控制寄存器全 F，有异常则判定为硬件问题，可绑定官方驱动进一步排查

7.判断接口的混淆模式是否开启，当接口 up 部分失败时，混淆模式不会被开启，这时网卡会丢掉没有发给自己的报文

8.使用 dpdk_proc_info 判断接口的 RX-nombuf 字段是否一直增加，当存在 mbuf 泄露时，申请 mbuf 失败则无法收包

9.多次执行 ethtool -d dump 寄存器，查看网卡 TAIL 与 HEAD 指针的变化情况，当 HEAD 值 > TAIL 值时，队列 hung 住，无法收包

10.使用 gdb dump 收包队列信息、接收描述符信息查找异常点

11.hung 住的问题需要注意问题出现的环境，是打了一段时间的流后出现的，还是杀 dpdk 程序出现的

12.确认是杀 dpdk 程序出现的则检查程序参数，打了一段时间的流后则重点排查是否异常流量导致队列 hung 住

## 接口不发包问题排查

1.确认网卡类型与异常接口

2.收集 ethtool -i x/x、ifconfig x/x、ethtool x/x、ethtool -d x/x、ethtool -S x/x 信息

3.确认接口连线是否正常，接口是否 up，接口处于 down 状态不能发包是正常情况

4.确认接口有流量转出，tx_drop 等字段在增加

5.dmesg 信息中是否有下面类似的信息：

```dmesg
    dmar: DMAR:[DMA Read] Request device [01:00.0] fault addr 37ae5000 DMAR:[fault reason 02] Present bit in context entry is clear 
```
 device pci 号是 dpdk 程序使用的网卡接口的 pci 号，符合这个问题的特征是从一开始就不能收包，而且是必现的，有这个前提则修改 grug.conf 文件，内核 cmdline 中添加 intel_iommu=off 配置后重试。

6.判断 ethtool -d dump 的寄存器信息中是否有异常如控制寄存器全 F，有异常则判定为硬件问题，可绑定官方驱动进一步排查

9.多次执行 ethtool -d dump 寄存器，查看网卡 tx TAIL 与 HEAD 指针的变化情况，当 HEAD 值 > TAIL 值时，队列 hung 住，无法发包

10.使用 gdb dump 发包队列信息、发送描述符信息查找异常点

11.hung 住的问题需要注意问题出现的环境，是打了一段时间的流后出现的，还是杀 dpdk 程序出现的

12.确认是杀 dpdk 程序出现的则检查程序参数，打了一段时间的流后则重点排查是否异常流量导致队列 hung 住