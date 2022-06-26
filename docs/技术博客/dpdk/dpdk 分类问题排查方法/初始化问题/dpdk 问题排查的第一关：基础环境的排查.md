# dpdk 问题排查的第一关：基础环境的排查
## uio 驱动是否加载
igb_uio 驱动依赖 uio 驱动，**实际上 igb_uio 可以看做是一个使用 uio 驱动映射硬件设备到用户态的实例**。

一般来说 uio 驱动大多都是直接编译到内核中的，不过也存在将这个驱动编译为模块的方式。

检查 uio 驱动是否加载可以通过查看 **/sys/class/uio 文件是否存在**来判断。

## igb_uio 与 rte_kni 驱动是否加载
编译 dpdk 时一般会生成两个内核模块：

1. igb_uio.ko
2. rte_kni.ko

igb_uio 驱动负责**将硬件设备映射到用户态**，rte_kni 负责**创建虚拟网络设备用于 ifconfig、ethtool 命令控制、获取接口状态**。

一般来说 igb_uio.ko 是**必须加载**的，而 rte_kni.ko 是否加载则看业务需求，在一些不需要创建 kni 虚拟网络接口的程序中，不需要加载 rte_kni.ko。

可以通过查看 /**sys/module/igb_uio** 与 **/sys/module/rte_kn**i 目录是否存在来判断这两个驱动是否正常加载，或者执行 **lsmod | grep igb_uio**、l**smod | grep rte_kni** 来判断。

## 网卡是否绑定驱动
dpdk 控制的硬件是网卡接口，网卡在 linux 内核中一般都有自己的内核驱动，dpdk 要正常使用的话，需要**将这些网卡接口绑定到 igb_uio 驱动中**以在**用户态控制硬件**。

dpdk 中提供了一个 dpdk-devbind.py 的脚本来完成接口绑定的工作，在老版本中这个脚本的名字是 dpdk_nic_bind.py。

执行 -s 命令来查看需要使用的网卡接口是否绑定到了 igb_uio 中，执行示例如下：

```bash
longyu@virt-debian10:~/dpdk-test$ dpdk-devbind.py -s 
Network devices using DPDK-compatible driver
============================================
0000:04:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=
0000:08:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=
0000:09:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=

Network devices using kernel driver
===================================
0000:01:00.0 'Virtio network device' if=enp1s0 drv=virtio-pci unused=igb_uio *Active*

Other network devices
=====================
```
drv=igb_uio 表示接口绑定到了 igb_uio 驱动上，可以看到我上面的示例中 04:00.0、08:00.0、09:00.0 这三个 e100e 的 82574L 网卡都绑定到了 igb_uio 中。

## /dev/uioX 设备文件是否正常生成
在一些内核中，在将网卡接口绑定到 igb_uio 的时候会自动生成 /dev/uioX 文件，在另外一些内核中 /dev/uioX 文件不会自动生成，需要手动创建。

这种需要手动创建的情况可能会出现 major 设备号不一致的情况，这常常会导致 dpdk 程序运行异常。

首先我们查看 /dev/uioX 字符设备文件中 major id 的值，可以执行 ls -lh 来查看。执行示例如下：

```bash
longyu@virt-debian10:~/dpdk-test$ ls -lh /dev/uio*
crw------- 1 root root 244, 0 9月   5 13:46 /dev/uio0
crw------- 1 root root 244, 1 9月   5 13:41 /dev/uio1
crw------- 1 root root 244, 2 9月   5 13:41 /dev/uio2
longyu@virt-debian10:~/dpdk-test$ 
```

这里 244 就是 uio 设备 major_id 的值，0, 1, 2 为 minor_id 的值，这里的 major_id 要与 /proc/devices 文件中 uio 设备的 major_id 对应。

我们可以执行如下命令查看当前系统中 uio 设备文件的 major_id:

```bash
longyu@virt-debian10:~/dpdk-test$ grep ' uio$' /proc/devices 
244 uio
```
这里 244 表示 major_id 的值，uio 表示一类设备名称，可以看到这里的 244 与上面 /dev/uioX 中的 major_id 能够对应的上，这就是正常的。

## /dev/uiox 能否正常访问
dpdk 程序中通过 uio 设备文件映射物理硬件的硬件资源，同时监听 uio 设备文件事件来捕获中断，在一些情况中，/dev/uiox 文件尽管已经创建了但是不能正常访问，这也会造成问题。

可以 cat /dev/uiox 文件来查看是否能够正常访问此文件。执行示例如下：
```bash
root@virt-debian10:/home/longyu/dpdk-test# cat /dev/uio2
cat: /dev/uio2: Invalid argument
```
这里 Invalid argument 表示我们可以正常打开文件，不过因为 /dev/uiox 文件并不像普通的文件那样能够直接读取字符，会报 Invalid argument 的错误。

一个异常情况如下所示：

```bash
root@virt-debian10:/home/longyu/dpdk-test# cat /dev/uio4
cat: /dev/uio4: No such device
root@virt-debian10:/home/longyu/dpdk-test# ls -lh /dev/uio4
crw-r--r-- 1 root root 244, 4 9月   5 13:52 /dev/uio4
```
可以看到当我们 cat /dev/uio4 的时候报了 No such device 的错误，而我们 ls 查看发现这个设备文件确实是存在的，这就是一个异常的状态。这种状态多半还是某个网卡接口没有绑定到 igb_uio 上的结果。
 
## /dev/kni 文件是否创建
对于要使用 rte_kni 程序创建虚拟网络接口的设备来说，/dev/kni 文件需要正常创建。

kni 中注册了一个 misc 设备，并且动态分配了 misc 设备的 minor id。我们可以提通过执行如下命令获取 misc 的 major id 与 kni 动态分配的 minor id。

```bash
root@virt-debian10:/home/longyu/dpdk-test# grep 'misc' /proc/devices 
 10 misc
root@virt-debian10:/home/longyu/dpdk-test# grep 'kni' /proc/misc
 58 kni
```
可以看到在我的系统中，misc 的 major id 为 10，kni 动态分配的 minor id 为 58，有了这个信息我们查看 /dev/kni 文件信息来判断是否正确生成。

```bash
root@virt-debian10:/home/longyu/dpdk-test# ls -lh /dev/kni
crw------- 1 root root 10, 58 9月   5 08:52 /dev/kni
```
可以看到，/dev/kni 设备文件存在，且 major id 与 minor id 正常。

## 大页内存是否正常
dpdk 程序的启动一般都会依赖大页内存，使用大页内存能够**降低缺页带来的性能损耗达到提高性能的目的**。

dpdk 程序运行前需要配置好大页内存，一些系统在启动时指定启动参数预留指定大小的大页内存数目，一些系统在启动过程中写入 **/sys/kernel/mm/hugepages/hugepages-*/nr_hugepages** 来创建大页内存。

我们可以通过查看 **/proc/meinfo** 来查看系统中大页内存的使用情况，示例信息如下：

```bash
HugePages_Total:     512
HugePages_Free:      512
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:         1048576 kB
```
上述字段的含义如下表：

| 名称 |含义  |
|--|--|
| HugePages_Total | 大页总数 |
|HugePages_Free|空闲的大页数目|
|HugePages_Rsvd|保留的大页内存数目（已经提交 alloc 申请但是没有真正 alloc 的大页数目）|
|HugePages_Surp|大页内存池中超过 /proc/sys/vm/nr_hugepages 的大页数目|
|Hugepagesize|大页的单个页面大小|
|Hugetlb|大页的总大小|

我们需要关注 HugePages_total 的数目，在一些情况下可能会有大页内存数目过少导致 dpdk 程序无法正常启动的问题。

确认了大页内存的数目后，还需要检查 hugetlbfs 文件系统是否正常挂载。可以通过查看 /etc/mtab 来判断。一个正常的示例如下：


```bash
root@virt-debian10:/home/longyu# grep 'huge' /etc/mtab
nodev /mnt/huge hugetlbfs rw,relatime,pagesize=2M 0 0
```
这里 /mnt/huge 的目录并不固定，在一些系统中它也可能是 /dev/huge 等目录。

## 网卡接口类型是否正确
dpdk 官方的 demo 中通过获取 pci 的信息来判断网卡的型号。产品的业务可能需要针对每个接口写额外的配置信息，这样一般会生成一个配置文件，这个配置文件中描述了网卡接口的配置信息，其中与 dpdk 关联比较大的就是网卡的型号，需要确定**网卡的接口类型与真实类型对应**。

## 一个简单的检测脚本
上文中我描述了排查 dpdk 程序运行的环境是否正常的基本点，这些基本点就是**检测脚本的需求**，我们可以预先针对不同的点编写检测脚本，要定位问题时，直接刷脚本看结果。

一个简单的示例如下：

```bash
#!/bin/bash

function check_failed
{	
    echo -e "\033[31m$1\033[0m" > /dev/stderr

    exit 1
}

function check_passed
{
    echo -e "[$1]\033[32m check passed \033[0m"
}

function check_uio_module
{
    local uio_major_id=$(awk '/ uio$/{print $1}' /proc/devices)

    if [ -z "$uio_major_id" ]
    then
        check_failed "uio module not loaded"
    fi

    check_passed "uio module loaded"

    return $uio_major_id
}

function check_specified_module_loaded
{

    if [ -z "$1" ]
    then
        echo "Invalid module_name $1" > /dev/stderr
        return 
    fi
    
    if [ -d "/sys/module/$1" ]
    then
        check_passed "$1 module loaded"
    else
        check_failed "$1 module not loaded"
    fi
}

function check_uiofile
{
    local uiofile=$(ls /dev/uio* 2>/dev/null)
    local uio_major_id=$1

    if [ -z "$uio_major_id" ]
    then
        echo "Invalid parameters $1" > /dev/stderr
        return 1
    fi
    
    if [ -z "$uiofile" ]
    then
        check_failed "/dev/uio* file not created"
    fi

    check_passed "/dev/uioX file exist"

    for file in $uiofile
    do
        local major_id=$(ls -l $file | awk -F ',| ' '{printf("%s",$5)}')
        if [ "$major_id" -ne "$uio_major_id" ]
        then
	    check_failed "$file major id $major_id invalid, should be $uio_major_id"
        fi
        
        check_passed "check $file major_id checked passed"
    done

    # TODO check cat /dev/uioX
}


# 1. check uio module
check_uio_module
uio_device_major_id=$?

# 2. check dpdk module

check_specified_module_loaded igb_uio
check_specified_module_loaded rte_kni

# 3. check /dev/uioX file 
check_uiofile $uio_device_major_id
```
运行示例如下：

```bash
root@virt-debian10:/home/longyu/dpdk-test# ./check_dev_uio.sh 
[uio module loaded] check passed 
[igb_uio module loaded] check passed 
[rte_kni module loaded] check passed 
[/dev/uioX file exist] check passed 
[check /dev/uio0 major_id checked passed] check passed 
[check /dev/uio1 major_id checked passed] check passed 
[check /dev/uio2 major_id checked passed] check passed 
[check /dev/uio4 major_id checked passed] check passed 
```
## 总结
dpdk 程序的执行依赖诸多环节，在定位问题时我们首先要排查这些基本环节是否正确，也就是所谓的 **dpdk 程序运行的基础环境是否正常**。

根据我的经验 dpdk 程序运行出现的很多问题都**集中**在这个**基础环境**中，通过排查这些基本点，我们能够解决一部分问题，同时也能够为定位疑难问题清除一定的盲区。

这些排查点不能跳过，唯有当这些基础环境正常时我们才应该做进一步的排查。


