# dpdk 常见问题：uio 设备文件创建以及 iommu 导致 x710 网卡初始化失败问题
# uio 设备文件创建的问题
使用 dpdk 程序进行收发包需要依赖 uio 设备文件，这个设备文件在一些系统中并不会自动创建，我们需要在启动流程中添加相应的创建流程。一般来说我们会在绑定驱动前来完成这个任务。

可以使用如下脚本来完成：

```bash
#!/bin/bash

uiomajor_id=$(awk '/ uio$/ {print $1}' /proc/devices)

for id in $(seq 0 63);
do
        mknod /dev/uio"$id" c $uiomajor_id $id
done
```
这里需要注意，uio 设备文件的 major 号可能会改变，因此我们最好每次都从 /proc/devices 文件中获取最新的，避免造成问题。

同时注意这里我创建了 64 个 uio 设备文件，这意味着系统中最多使用 64 个网络接口。
## iommu 导致 x710 网卡初始化失败问题
网上搜索了下，这个问题与 iommu 相关，按照这个思路，进行了如下尝试：

   1. bios 中关闭 VT-d 后进行测试问题仍旧存在
   2. 修改 grub.cfg 脚本，设定 linux 启动参数 intel_iommu=off 

添加 **intel_iommu=off** 参数后 x710 网卡能够正常使用，这个 iommu 导致问题的情况在 dpdk known issues 中应该是有说明的。



