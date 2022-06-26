# 从 systemd-udevd 运行 log 中研究其自动加载内核模块的过程
## 环境信息

linux 环境：debian10 系统

systemd 版本：systemd 241

运行环境：VMware 虚机环境

## systemd-udevd 命令 help 信息

```bash
longyu@debian:~$ /lib/systemd/systemd-udevd --help
systemd-udevd [OPTIONS...]

Manages devices.

  -h --help                   Print this message
  -V --version                Print version of the program
  -d --daemon                 Detach and run in the background
  -D --debug                  Enable debug output
  -c --children-max=INT       Set maximum number of workers
  -e --exec-delay=SECONDS     Seconds to wait before executing RUN=
  -t --event-timeout=SECONDS  Seconds to wait before terminating an event
  -N --resolve-names=early|late|never
                              When to resolve users and groups

See the systemd-udevd.service(8) man page for details.
```
-D 参数可以使能 debug 信息，首先开启这个参数来观察 systemd-udevd 的输出信息。

## systemd-udevd -D 参数前台运行

1. 执行 sudo systemctl stop systemd-udevd 停止正在运行的进程
2. 手动执行 sudo /lib/systemd/systemd-udevd -D

手动运行时终端的部分输出信息如下：

```bash
.........
Load module index
timestamp of '/etc/systemd/network' changed
timestamp of '/usr/lib/systemd/network' changed
Parsed configuration file /usr/lib/systemd/network/99-default.link
Created link configuration context.
timestamp of '/etc/udev/rules.d' changed
timestamp of '/lib/udev/rules.d' changed
Reading rules file: /usr/lib/udev/rules.d/50-firmware.rules
Reading rules file: /usr/lib/udev/rules.d/50-udev-default.rules
Reading rules file: /usr/lib/udev/rules.d/55-dm.rules
Reading rules file: /usr/lib/udev/rules.d/60-block.rules
Reading rules file: /usr/lib/udev/rules.d/60-cdrom_id.rules
Reading rules file: /usr/lib/udev/rules.d/60-drm.rules
.........
Rules contain 24576 bytes tokens (2048 * 12 bytes), 12517 bytes strings
1770 strings (22169 bytes), 1165 de-duplicated (10258 bytes), 606 trie nodes used
```
上面输出的大部分在读取并解析 udev 的规则，这些规则描述了 systemd-udevd 接收到一个事件时的处理过程。

## 虚拟机动态添加新的网络设备模拟热插拔
添加一个新的网络设备操作图示如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/346312ddf01741b69036dc11da04b23b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_15,color_FFFFFF,t_70,g_se,x_16)
添加后终端输出信息中与**加载模块相关的信息**如下：

```bash
Successfully forked off 'n/a' as PID 2557.
0000:02:08.0: Worker [2557] is forked for processing SEQNUM=4168.
0000:02:08.0: Processing device (SEQNUM=4168, ACTION=add)
0000:02:08.0: IMPORT builtin 'hwdb' /usr/lib/udev/rules.d/50-udev-default.rules:14
0000:02:08.0: RUN 'kmod load $env{MODALIAS}' /usr/lib/udev/rules.d/80-drivers.rules:5
0000:02:08.0: sd-device: Created db file '/run/udev/data/+pci:0000:02:08.0' for '/devices/pci0000:00/0000:00:11.0/0000:02:08.0'
Loading module: pci:v00008086d0000100Fsv000015ADsd00000750bc02sc00i00
Module 'e1000' is already loaded
0000:02:08.0: Device (SEQNUM=4168, ACTION=add) processed
0000:02:08.0: sd-device-monitor: Passed 547 byte to netlink monitor
```
从上面的输出看 systemd-udevd 自动加载内核模块的过程可能有如下流程：
1. 内部创建一个子进程处理从内核收到的 uevent 消息
2. 根据消息的内容匹配 udev 规则，依次执行匹配到的规则对应的内部命令，这里 pci 设备会创建 MODALIAS 属性，udevd 匹配到 /usr/lib/udev/rules.d/80-drivers.rules 规则，进而执行 kmod load 命令，此命令的参数为 MODALIAS 属性的值
3. 创建内部的数据库文件
4. 使用 MODALIAS 匹配关联的内核驱动并判断是否加载，未加载就加载，已经加载则继续向下执行
5. 事件处理完成后正常返回

在上述假想流程中，对于 udevd 规则与 udevd 从内核收到的 uevent netlink 消息的内容存在盲区，在进一步的分析前先查看下这些信息。

### 与加载内核模块相关的 udev 规则
50-udev-default.rules 规则信息：

```bash
longyu@debian:~$ sed -n '14p' /usr/lib/udev/rules.d/50-udev-default.rules
ENV{MODALIAS}!="", IMPORT{builtin}="hwdb --subsystem=$env{SUBSYSTEM}"
```

80-drivers.rules 规则信息：

```bash
longyu@debian:~$ sed -n '5p' /usr/lib/udev/rules.d/80-drivers.rules
ENV{MODALIAS}=="?*", RUN{builtin}+="kmod load $env{MODALIAS}"
```
关键的规则为 80-drivers.rules 规则，加载模块实际是通过 kmod load 命令完成的。
### 2. 模拟 udevd 从内核收到的 uevent netlink 消息的内容
使用如下程序（部分代码摘自 udevd 源码并进行了一些修改）：
```c
#include <stdio.h>  
#include <stdlib.h>  
#include <string.h>  
#include <ctype.h>  
#include <sys/un.h>  
#include <sys/ioctl.h>  
#include <sys/socket.h>  
#include <linux/types.h>  
#include <linux/netlink.h>  
#include <errno.h>  
#include <unistd.h>  
#include <arpa/inet.h>  
#include <netinet/in.h>  

#ifndef NEWLINE
#define NEWLINE "\r\n"
#endif

#define UEVENT_BUFFER_SIZE 2048  

static int init_hotplug_sock()  
{  
  const int buffersize = 1024;  
  int ret;  

  struct sockaddr_nl snl;  
  bzero(&snl, sizeof(struct sockaddr_nl));  
  snl.nl_family = AF_NETLINK;  
  snl.nl_pid = getpid();  
  snl.nl_groups = 1;  

  int s = socket(PF_NETLINK, SOCK_DGRAM, NETLINK_KOBJECT_UEVENT);  
  if (s == -1)   
  {  
	  perror("socket");  
	  return -1;  
  }  
  setsockopt(s, SOL_SOCKET, SO_RCVBUF, &buffersize, sizeof(buffersize));  

  ret = bind(s, (struct sockaddr *)&snl, sizeof(struct sockaddr_nl));  
  if (ret < 0)   
  {  
	  perror("bind");  
	  close(s);  
	  return -1;  
  }  

  return s;  
}  

char *truncate_nl(char *s) {

        s[strcspn(s, NEWLINE)] = 0;
        return s;
}

int device_new_from_nulstr(uint8_t *nulstr, size_t len) {
		int i = 0;
        int r;

        while (i < len) {
                char *key;
                const char *end;

                key = (char*)&nulstr[i];
                end = memchr(key, '\0', len - i);
                if (!end)
					return 0;

                i += end - key + 1;
                truncate_nl(key);
				printf("%s\n", key);	
        }
}	

int main(int argc, char* argv[])  
{  
	int hotplug_sock = init_hotplug_sock();  
	int bufpos;

  	while(1)  
  	{  
		int len;
  		/* Netlink message buffer */  
  		char buf[UEVENT_BUFFER_SIZE * 2];

		memset(&buf, 0x00, sizeof(buf));	
  		len = recv(hotplug_sock, &buf, sizeof(buf), 0);
		
		if (len <= 0)
			continue;
		
		printf("\nnew message:\n");
		bufpos = strlen(buf) + 1;
		
		printf("%s\n", buf);

		device_new_from_nulstr((uint8_t*)&buf[bufpos], len - bufpos);
  	}
  	return 0;  
 }
```

编译并运行此程序，重新添加一个网络设备后，终端输出信息如下：

```bash
new message:
add@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0
SUBSYSTEM=pci
PCI_CLASS=20000
PCI_ID=8086:10D3
PCI_SUBSYS_ID=8086:0000
PCI_SLOT_NAME=0000:0a:00.0
MODALIAS=pci:v00008086d000010D3sv00008086sd00000000bc02sc00i00
SEQNUM=2068

new message:
add@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/ptp/ptp4
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/ptp/ptp4
SUBSYSTEM=ptp
MAJOR=249
MINOR=4
DEVNAME=ptp4
SEQNUM=2069

new message:
add@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/net/eth0
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/net/eth0
SUBSYSTEM=net
INTERFACE=eth0
IFINDEX=7
SEQNUM=2070

new message:
add@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/net/eth0/queues/rx-0
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/net/eth0/queues/rx-0
SUBSYSTEM=queues
SEQNUM=2071

new message:
add@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/net/eth0/queues/tx-0
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/net/eth0/queues/tx-0
SUBSYSTEM=queues
SEQNUM=2072

new message:
bind@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0
ACTION=bind
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0
SUBSYSTEM=pci
DRIVER=e1000e
PCI_CLASS=20000
PCI_ID=8086:10D3
PCI_SUBSYS_ID=8086:0000
PCI_SLOT_NAME=0000:0a:00.0
MODALIAS=pci:v00008086d000010D3sv00008086sd00000000bc02sc00i00
SEQNUM=2073
```
可以看到内核触发了多个不同设备的 uevent 消息，每一个 uevent 消息都有自己的键值对，ACTION 表示 uevent 的动作，add 表示设备添加，DEVPATH 的值添加 /sys 前缀指向设备在 /sys 目录中的具体位置，SEQNUM 表示消息号，依次递增，SUBSYSTEM 表示设备所属的子系统。

当 systemd-udevd 收到一个上述类型的 uevent 消息时就会按照键值对的形式进行解析并设置内部的数据结构。

### 3. ２ 中与 udevd 自动加载驱动相关的 netlink 消息
```bash
add@/devices/pci0000:00/0000:00:03.1/0000:0a:00.0
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:03.1/0000:0a:00.0
SUBSYSTEM=pci
PCI_CLASS=20000
PCI_ID=8086:10D3
PCI_SUBSYS_ID=8086:0000
PCI_SLOT_NAME=0000:0a:00.0
MODALIAS=pci:v00008086d000010D3sv00008086sd00000000bc02sc00i00
SEQNUM=2068
```
上述消息在被 udevd 解析后，pci 设备 0000:0a:00.0 的 MODALIAS 属性被设置，最终匹配到上文提到的 80-drivers.rules 规则完成模块加载过程。

当设备成功 probe 驱动后，设备在 sys 目录中对应的 uevent 文件内容如下：

```bash
longyu@virt-debian10:~$ cat /sys/devices/pci0000:00/0000:00:03.1/0000:0a:00.0/uevent
DRIVER=e1000e
PCI_CLASS=20000
PCI_ID=8086:10D3
PCI_SUBSYS_ID=8086:0000
PCI_SLOT_NAME=0000:0a:00.0
MODALIAS=pci:v00008086d000010D3sv00008086sd00000000bc02sc00i00
```
## udevd 如何通过 MODALIAS 获取到需要加载的驱动?
udevd 通过 libkmod 模块来完成内核模块的查找、加载工作。libkmod 实际是通过解析 /lib/modules/$(uname -r)/modules.alias.bin 来获取不同设备使用的模块信息。

在我的虚拟机中使用 pci:v00008086d000010D3sv00008086sd00000000bc02sc00i00 中的前几个字段（表示 vendor id 与 device id 的字段）检索  /lib/modules/$(uname -r)/modules.alias 获取到如下信息：

```bash
longyu@virt-debian10:/lib/modules/4.19.0-8-amd64$ grep 'v00008086d000010D3' ./modules.alias
alias pci:v00008086d000010D3sv*sd*bc*sc*i* e1000e
```
最后一列 e1000e 表示此设备使用的驱动，获取到这个驱动后就可以调用 libkmod 提供的接口加载 e1000e 模块。

## 总结
本文从 systemd-udevd 的 manual 入手，通过 debug 选项获取 udevd 执行的 log 信息，通过扩大信息来为进一步研究 udevd 的代码做了铺垫。

这些信息定义了 udevd 的关键流程，有了这些信息再来理解它的实现就不那么困难了。

