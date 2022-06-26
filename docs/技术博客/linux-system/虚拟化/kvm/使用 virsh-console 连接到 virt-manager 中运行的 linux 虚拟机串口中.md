# 使用 virsh-console 连接到 virt-manager 中运行的 linux 虚拟机串口中
## 1. 执行 virsh list 找到目标虚拟机
## 2. 执行 virsh console xxx
## 3. 虚拟机中运行 echo "hello world" > /dev/ttySX
确定写入那个 /dev/ttySX virsh 连接到的串口上会有输出信息。

## 4. 修改 grub.cfg，内核引导参数中添加 console=ttySX,115200
这里的 ttySX 为第三步中确定的设备文件。

## 5. 重启虚拟机

# 成功的示例

### 1. 修改后的虚拟机内核 cmdline
```bash
[root@192 ~]# cat /proc/cmdline 
BOOT_IMAGE=/vmlinuz-4.19.90-2106.3.0.0095.oe1.x86_64 root=/dev/mapper/openeuler-root ro resume=/dev/mapper/openeuler-swap rd.lvm.lv=openeuler/root rd.lvm.lv=openeuler/swap rhgb quiet crashkernel=512M console=ttyS0,115200
```

### 2. virsh 正常接入且内容正常显示
```bash
[longyu@debian-10:07:34:17] ~ $ sudo virsh console openEuler
Connected to domain openEuler
Escape character is ^]
[  OK  ] Started Show Plymouth Boot Screen.
[  OK  ] Started Forward Password R…s to Plymouth Directory Watch.
[  OK  ] Reached target Paths.
[  OK  ] Reached target Basic System.
         Mounting Kernel Configuration File System...
[  OK  ] Mounted Kernel Configuration File System.
[  OK  ] Found device /dev/mapper/openeuler-root.
[  OK  ] Reached target Initrd Root Device.
.........
```

