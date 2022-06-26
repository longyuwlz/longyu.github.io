# Open /sys/bus/pci/devices/0000:01:00.0/driver/unbind failed. err 13 (Permission denied)
# 问题描述
同事反馈在系统初始化时，写入设备驱动目录下的 unbind 文件将网卡从内核驱动解绑时会失败，报错信息如下：

```bash
200317 10:33:54.948 ERROR - Open /sys/bus/pci/devices/0000:01:00.0/driver/unbind failed. err 13 (Permission denied)
```
01:00.0 pci 设备是一个 x710 网卡。

# 排查过程
1. 进入系统后查看 /sys/bus/pci/devices/0000:01:00.0/driver/unbind 文件的权限，确认权限正确
2. 进入系统后执行相同的操作解绑 01:00.0 驱动，解绑成功
3. 确认初始化的程序有 root 权限
# 解绑驱动前的操作
查看代码，发现在解绑网卡前，加载了 i40e 驱动。

# /sys 目录中的某个文件报 Permission denied 问题
一般来说，如下几种情况会导致写入 /sys 下的文件失败并报 permission denied 问题：

1. 写入没有 w 权限的 /sys 子目录文件
2. 使用普通用户权限写入 /sys 子目录文件
3. 设置了当文件不存在则创建的行为后写入一个在 /sys 目录下不存在的文件

前两种情况相对常见，第三种情况比较少见。第三种情况下触发的 permission denied 表示的是用户无法在 /sys 目录中动态创建文件、目录。

# 对问题的初步假想
这里我们遇到的问题比较像上面第三种情况。对其流程有如下猜测：

在加载了 i40e 驱动后，pci 会遍历 pci 设备链表，执行驱动 probe 过程。程序中在加载 i40e 驱动后，立刻解绑 x710 网卡接口，这时 /sys/bus/pci/devices/0000:01:00.0 目录中 driver 子目录下的相关文件还没有创建完成。

我们的程序配置了当文件不存在则自动创建的行为，当程序检测到 /sys/bus/pci/devices/0000:01:00.0/driver/unbind 文件不存在时，它尝试创建此文件，就会报 Permission denied 的错误。

# 解决方法
在解绑驱动的代码处添加延时重试的逻辑，测试通过。

# /sys/bus/pci/devices/0000:01:00.0/driver/unbind 文件是在什么时候被创建的？
规避方法能够解决问题，但在写这篇文章的时候我想到上面对 i40e 驱动加载的过程的描述存在一些问题，我根本不知道内核是在什么时候创建每个 pci 设备 sys 子目录中的 driver 目录的，需要深入到内核代码中进行研究。

为此，对我们使用的 3.16.35 内核代码进行分析，梳理 insmod 加载 i40e.ko 文件过程中 /sys 目录中相关文件的变化过程，主要步骤如下：

1. insmod 命令调用 finit_module 将内核模块 load 内核中，内核解析模块，进行一系列的校验后，对模块的内容进行重新排布，最终调用 i40e 驱动模块中的 init 函数来完成模块初始化过程
2. i40e 模块的 init 函数中调用 pci_register_driver 向 pci 总线注册一个新的 pci 设备驱动
3. pci_register_driver 中设定 pci_driver 中的一些变量并设定 bus 为 pci_bus_type 结构地址，最后通过 driver_register 向 pci 总线注册
4. driver_register 首先判断驱动所在的 bus 上是否已经注册了同名的驱动，未注册则调用 bus_add_driver 将驱动注册到总线上
5. bus_add_driver 为驱动创建一个 struct driver_private 结构并初始化相应的数据结构，当 bus 结构中 subsys_private 结构中的 drivers_autoprobe 大于 0 时，执行 driver_attach 函数将驱动 attach 到设备上。pci 总线默认使能 drivers_autoprobe，driver_attach 函数会被执行
6. driver_attach 函数会遍历当前 bus 上的所有设备，以驱动结构体指针为参数执行 __driver_attach 函数
7. __driver_attach 函数首先 bus match 操作，匹配到当前驱动支持的设备且确认当前设备没有绑定任何驱动时，调用 driver_probe_device 函数执行驱动 probe 过程。
8. driver_probe_device 通过调用 really_probe 完成真正的 probe 过程，really_probe 函数调用 driver_sysfs_add 函数完成相关 sysfs 文件链接的创建过程
9. driver_sysfs_add 函数中，在 probe 的驱动的 sysfs 目录中创建链接文件，以设备名为文件名称，链接文件指向设备的 sysfs 目录，成功后在设备的 sysfs 目录中添加一个 driver 链接，指向驱动的 sysfs 目录。
10. really_probe 调用 bus 中实现的 probe 方法完成驱动 probe 过程
11. driver_attach 函数返回后，bus_add_driver 函数会根据条件在驱动的 sysfs 目录中创建 bind、unbind 文件，内核中对应当前驱动的 kobject 中两个不同的 attribute
12. 执行流逐级返回，继续执行上层函数的后续流程，最后 i40e 驱动的 module 初始化函数返回，系统调用执行完成后返回用户态。

 /sys/bus/pci/devices/0000:01:00.0/driver 路径中的 driver 目录实际上是一个软链接，它指向当前设备绑定的驱动所在的 /sys/bus/pci/drivers/ 目录中的相应目录中，在这里目录名称为 i40e。
 
写入 /sys/bus/pci/devices/0000:01:00.0/driver/unbind 文件，实际上是在写入 sys/bus/pci/drivers/i40e/unbind 文件。

根据上文的描述，能够看出，当驱动加载后 unbind 文件等 sys 目录被创建出来，能够正常访问。

我们的程序中调用 system 函数加载 i40e.ko 驱动，这个函数会等待 insmod 命令执行成功后返回，根据这个过程能够推断出上文描述的 /sys/bus/pci/devices/0000:01:00.0/driver/unbind 文件不存在问题是不正确的，其它情况也不符合，毕竟只添加了延时就能够解决问题，一定有其它因素干扰！

# 总结
在分析本文描述问题的过程中，由于不清楚内核中的流程，一些分析与假设是完全错误的。问题是得到解决了，但是根本没有找到触发问题的原因，有死灰复燃的可能，还需要继续进行分析。

