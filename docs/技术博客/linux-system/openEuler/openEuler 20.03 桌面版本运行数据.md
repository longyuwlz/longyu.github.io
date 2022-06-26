# openEuler 20.03 桌面版本运行数据
# 登录界面

```c
Authorized users only. All activities may be monitored and reported.
Activate the web console with: systemctl enable --now cockpit.socket

localhost login: root
å¯†ç ï¼š
ä¸Šæ¬¡ç™»å½•ï¼šWed Jul 21 13:43:03 äºŽ tty1

Authorized users only. All activities may be monitored and reported.

Welcome to 4.19.90-2003.4.0.0036.oe1.x86_64

System information as of time:  2021å¹´ 07æœˆ 21æ—¥ æ˜ŸæœŸä¸‰ 17:01:10 CST

System load:    0.00
Processes:      138
Memory used:    12.6%
Swap used:      0.0%
Usage On:       22%
IP address:     192.168.122.1
Users online:   1
```

# 启动后内存占用

```c
[root@localhost ~]# free -h
              total        used        free      shared  buff/cache   available
Mem:          1.9Gi       247Mi       1.4Gi       0.0Ki       239Mi       1.4Gi
Swap:         2.0Gi          0B       2.0Gi
[root@localhost ~]#
```

# 内核信息

```c
[root@localhost ~]# uname -a
Linux localhost.localdomain 4.19.90-2003.4.0.0036.oe1.x86_64 #1 SMP Mon Mar 23 19:10:41 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

# cmdline 参数

```c
[root@localhost ~]# cat /proc/cmdline
BOOT_IMAGE=/vmlinuz-4.19.90-2003.4.0.0036.oe1.x86_64 root=/dev/mapper/openeuler-root ro resume=/dev/mapper/openeuler-swap rd.lvm.lv=openeuler/root rd.lvm.lv=openeuler/swap rhgb quiet quiet crashkernel=512M
```

# ps 命令输出

```c
[root@localhost ~]# ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.7 105880 14400 ?        Ss   15:34   0:01 /usr/lib/syst
root           2  0.0  0.0      0     0 ?        S    15:34   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<   15:34   0:00 [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<   15:34   0:00 [rcu_par_gp]
root           6  0.0  0.0      0     0 ?        I<   15:34   0:00 [kworker/0:0H
root           8  0.0  0.0      0     0 ?        I<   15:34   0:00 [mm_percpu_wq
root           9  0.0  0.0      0     0 ?        S    15:34   0:00 [ksoftirqd/0]
root          10  0.0  0.0      0     0 ?        I    15:34   0:00 [rcu_sched]
root          11  0.0  0.0      0     0 ?        I    15:34   0:00 [rcu_bh]
root          12  0.0  0.0      0     0 ?        S    15:34   0:00 [migration/0]
root          13  0.0  0.0      0     0 ?        S    15:34   0:00 [cpuhp/0]
root          14  0.0  0.0      0     0 ?        S    15:34   0:00 [cpuhp/1]
root          15  0.0  0.0      0     0 ?        S    15:34   0:00 [migration/1]
root          16  0.0  0.0      0     0 ?        S    15:34   0:00 [ksoftirqd/1]
root          18  0.0  0.0      0     0 ?        I<   15:34   0:00 [kworker/1:0H
root          20  0.0  0.0      0     0 ?        S    15:34   0:00 [kdevtmpfs]
root          21  0.0  0.0      0     0 ?        I<   15:34   0:00 [netns]
root          22  0.0  0.0      0     0 ?        S    15:34   0:00 [kauditd]
root          25  0.0  0.0      0     0 ?        S    15:34   0:00 [khungtaskd]
root          26  0.0  0.0      0     0 ?        S    15:34   0:00 [oom_reaper]
root          27  0.0  0.0      0     0 ?        I<   15:34   0:00 [writeback]
root          28  0.0  0.0      0     0 ?        S    15:34   0:00 [kcompactd0]
root          29  0.0  0.0      0     0 ?        SN   15:34   0:00 [ksmd]
root          30  0.0  0.0      0     0 ?        SN   15:34   0:00 [khugepaged]
root          31  0.0  0.0      0     0 ?        I<   15:34   0:00 [crypto]
root          32  0.0  0.0      0     0 ?        I<   15:34   0:00 [kintegrityd]
root          33  0.0  0.0      0     0 ?        I<   15:34   0:00 [kblockd]
root          34  0.0  0.0      0     0 ?        I<   15:34   0:00 [md]
root          35  0.0  0.0      0     0 ?        I<   15:34   0:00 [edac-poller]
root          36  0.0  0.0      0     0 ?        S    15:34   0:00 [watchdogd]
root          48  0.0  0.0      0     0 ?        S    15:34   0:00 [kswapd0]
root          67  0.0  0.0      0     0 ?        I    15:34   0:00 [kworker/u256
root          99  0.0  0.0      0     0 ?        I<   15:34   0:00 [kthrotld]
root         100  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/24-pcieh
root         101  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/25-pcieh
root         102  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/26-pcieh
root         103  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/27-pcieh
root         104  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/28-pcieh
root         105  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/29-pcieh
root         106  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/30-pcieh
root         107  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/31-pcieh
root         108  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/32-pcieh
root         109  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/33-pcieh
root         110  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/34-pcieh
root         111  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/35-pcieh
root         112  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/36-pcieh
root         113  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/37-pcieh
root         114  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/38-pcieh
root         115  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/39-pcieh
root         116  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/40-pcieh
root         117  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/41-pcieh
root         118  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/42-pcieh
root         119  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/43-pcieh
root         120  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/44-pcieh
root         121  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/45-pcieh
root         122  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/46-pcieh
root         123  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/47-pcieh
root         124  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/48-pcieh
root         125  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/49-pcieh
root         126  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/50-pcieh
root         127  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/51-pcieh
root         128  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/52-pcieh
root         129  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/53-pcieh
root         130  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/54-pcieh
root         131  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/55-pcieh
root         132  0.0  0.0      0     0 ?        I<   15:34   0:00 [acpi_thermal
root         133  0.0  0.0      0     0 ?        I<   15:34   0:00 [kmpath_rdacd
root         134  0.0  0.0      0     0 ?        I<   15:34   0:00 [kaluad]
root         135  0.0  0.0      0     0 ?        I<   15:34   0:00 [ipv6_addrcon
root         136  0.0  0.0      0     0 ?        I<   15:34   0:00 [kstrp]
root         397  0.0  0.0      0     0 ?        I<   15:34   0:00 [mpt_poll_0]
root         398  0.0  0.0      0     0 ?        I<   15:34   0:00 [mpt/0]
root         400  0.0  0.0      0     0 ?        I<   15:34   0:00 [ata_sff]
root         401  0.0  0.0      0     0 ?        S    15:34   0:00 [scsi_eh_0]
root         402  0.0  0.0      0     0 ?        I<   15:34   0:00 [scsi_tmf_0]
root         403  0.0  0.0      0     0 ?        S    15:34   0:00 [scsi_eh_1]
root         404  0.0  0.0      0     0 ?        I<   15:34   0:00 [scsi_tmf_1]
root         405  0.0  0.0      0     0 ?        I    15:34   0:00 [kworker/u256
root         407  0.0  0.0      0     0 ?        I<   15:34   0:00 [ttm_swap]
root         409  0.0  0.0      0     0 ?        S    15:34   0:00 [irq/16-vmwgf
root         416  0.0  0.0      0     0 ?        S    15:34   0:00 [scsi_eh_2]
root         417  0.0  0.0      0     0 ?        I<   15:34   0:00 [scsi_tmf_2]
root         421  0.0  0.0      0     0 ?        I<   15:34   0:00 [kworker/1:1H
root         435  0.0  0.0      0     0 ?        I<   15:34   0:00 [kworker/0:1H
root         478  0.0  0.0      0     0 ?        I<   15:34   0:00 [kdmflush]
root         485  0.0  0.0      0     0 ?        I<   15:34   0:00 [kdmflush]
root         508  0.0  0.0      0     0 ?        S    15:34   0:00 [jbd2/dm-0-8]
root         509  0.0  0.0      0     0 ?        I<   15:34   0:00 [ext4-rsv-con
root         612  0.0  0.7  36868 16064 ?        Ss   15:34   0:00 /usr/lib/syst
root         640  0.0  0.6  32908 12188 ?        Ss   15:34   0:00 /usr/lib/syst
root        1759  0.0  0.0      0     0 ?        S    15:34   0:00 [jbd2/sda1-8]
root        1765  0.0  0.0      0     0 ?        I<   15:34   0:00 [ext4-rsv-con
rpc         1824  0.0  0.2  10592  5072 ?        Ss   15:34   0:00 /usr/bin/rpcb
root        1830  0.0  0.0   2960   124 ?        Ss   15:34   0:00 /sbin/mdadm -
root        1859  0.0  0.1  91976  2124 ?        S<sl 15:34   0:00 /sbin/auditd
root        1873  0.0  0.0   6368  1400 ?        S<   15:34   0:00 /usr/sbin/sed
root        1898  0.0  0.0      0     0 ?        I<   15:34   0:00 [rpciod]
root        1900  0.0  0.0      0     0 ?        I<   15:34   0:00 [kworker/u257
root        1901  0.0  0.0      0     0 ?        I<   15:34   0:00 [xprtiod]
dbus        2003  0.0  0.2  15804  4920 ?        Ssl  15:34   0:00 /usr/bin/dbus
libstor+    2049  0.0  0.0   2488  1880 ?        Ss   15:34   0:00 /usr/bin/lsmd
polkitd     2052  0.0  1.1 1522588 23380 ?       Ssl  15:34   0:00 /usr/lib/polk
root        2054  0.0  0.2  16972  5868 ?        Ss   15:34   0:01 /sbin/rngd -f
root        2056  0.0  1.7 203432 35548 ?        Ssl  15:34   0:00 /usr/sbin/rsy
chrony      2061  0.0  0.1  78964  2700 ?        S    15:34   0:00 /usr/sbin/chr
root        2070  0.0  0.2   7808  4608 ?        Ss   15:34   0:00 /usr/sbin/sma
root        2078  0.0  0.3  18132  6368 ?        Ss   15:34   0:00 /usr/lib/syst
root        2085  0.0  0.1  80096  2124 ?        Ssl  15:34   0:00 /usr/sbin/irq
root        2096  0.0  0.5  20000 10420 ?        Ss   15:34   0:00 /usr/lib/syst
root        2098  0.0  0.2 262728  4388 ?        Ssl  15:34   0:00 /usr/sbin/gss
root        2103  0.0  0.3  17268  6504 ?        Ss   15:34   0:00 /usr/sbin/res
root        2181  0.0  1.2 538476 25716 ?        Ssl  15:34   0:00 /usr/bin/pyth
root        2282  0.0  1.7 326320 35508 ?        Ssl  15:34   0:00 /usr/bin/pyth
root        2283  0.0  1.0 816460 20936 ?        Ssl  15:34   0:00 /usr/sbin/Net
systemd+    2284  0.0  0.3  18944  7672 ?        Ss   15:34   0:00 /usr/lib/syst
root        2337  0.0  0.3  13492  6732 ?        Ss   15:34   0:00 /usr/sbin/ssh
root        2338  0.0  1.2 464728 25732 ?        Ssl  15:34   0:00 /usr/bin/pyth
root        2604  0.0  2.1 1534008 42548 ?       Ssl  15:34   0:00 /usr/sbin/lib
root        2612  0.0  0.1   3684  2268 ?        Ss   15:34   0:00 /usr/sbin/atd
root        2613  0.0  0.1 214688  3024 ?        Ss   15:34   0:00 /usr/sbin/cro
root        2619  0.0  0.0 212952  1836 tty1     Ss+  15:34   0:00 /sbin/agetty
root        2620  0.0  0.3 220576  6476 ?        Ss   15:34   0:00 login -- root
dnsmasq     2746  0.0  0.1   8484  2444 ?        S    15:34   0:00 /usr/sbin/dns
root        2747  0.0  0.0   8380   364 ?        S    15:34   0:00 /usr/sbin/dns
root        2868  0.0  0.0      0     0 ?        I    16:33   0:00 [kworker/0:0-
root        2884  0.0  0.0      0     0 ?        I    16:45   0:00 [kworker/1:1-
root        2885  0.0  0.0      0     0 ?        I    16:45   0:00 [kworker/1:2-
root        2887  0.0  0.0      0     0 ?        I    16:50   0:00 [kworker/0:2-
root        2888  0.0  0.0      0     0 ?        I    16:55   0:00 [kworker/0:1-
root        2912  0.0  0.0      0     0 ?        I    17:01   0:00 [kworker/1:0-
root        2913  0.0  0.4  20256 10060 ?        Ss   17:01   0:00 /usr/lib/syst
root        2915  0.0  0.0      0     0 ?        I    17:01   0:00 [kworker/0:3-
root        2917  0.0  0.2 108796  5716 ?        S    17:01   0:00 (sd-pam)
root        2924  0.0  0.2 215544  5496 ttyS1    Ss   17:01   0:00 -bash
root        3044  0.0  0.1 216028  3396 ttyS1    R+   17:02   0:00 ps aux
```

# top 命令输出

```c
top - 17:03:39 up  1:29,  1 user,  load average: 0.00, 0.00, 0.00
Tasks: 135 total,   1 running, 134 sleeping,   0 stopped,   0 zombie
%Cpu0  :  0.8 us,  0.0 sy,  0.0 ni, 98.4 id,  0.0 wa,  0.0 hi,  0.8 si,  0.0 st
%Cpu1  :  0.0 us,  0.0 sy,  0.0 ni, 99.2 id,  0.0 wa,  0.8 hi,  0.0 si,  0.0 st
MiB Mem :   1966.8 total,   1478.8 free,    248.2 used,    239.8 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   1419.3 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
      1 root      20   0  105880  14400   9024 S   0.0   0.7   0:01.67 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kthreadd
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par+
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker+
      8 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_perc+
      9 root      20   0       0      0      0 S   0.0   0.0   0:00.16 ksoftir+
     10 root      20   0       0      0      0 I   0.0   0.0   0:00.80 rcu_sch+
     11 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_bh
     12 root      rt   0       0      0      0 S   0.0   0.0   0:00.00 migrati+
     13 root      20   0       0      0      0 S   0.0   0.0   0:00.00 cpuhp/0
     14 root      20   0       0      0      0 S   0.0   0.0   0:00.00 cpuhp/1
     15 root      rt   0       0      0      0 S   0.0   0.0   0:00.00 migrati+
     16 root      20   0       0      0      0 S   0.0   0.0   0:00.01 ksoftir+
     18 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker+
     20 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kdevtmp+
```

# 中断执行统计

```c
[root@localhost ~]# cat /proc/interrupts
            CPU0       CPU1
   0:          6          0   IO-APIC    2-edge      timer
   1:          0          9   IO-APIC    1-edge      i8042
   3:          0       1693   IO-APIC    3-edge      ttyS1
   8:          1          0   IO-APIC    8-edge      rtc0
   9:          0          0   IO-APIC    9-fasteoi   acpi
  12:         16         26   IO-APIC   12-edge      i8042
  14:          0          0   IO-APIC   14-edge      ata_piix
  15:         39       5345   IO-APIC   15-edge      ata_piix
  16:          2          0   IO-APIC   16-fasteoi   vmwgfx, snd_ens1371
  17:       6294        855   IO-APIC   17-fasteoi   ehci_hcd:usb1, ioc0
  18:          0         63   IO-APIC   18-fasteoi   uhci_hcd:usb2
  19:      59447        103   IO-APIC   19-fasteoi   ens33
  24:          0          0   PCI-MSI 344064-edge      PCIe PME, pciehp
  25:          0          0   PCI-MSI 346112-edge      PCIe PME, pciehp
  26:          0          0   PCI-MSI 348160-edge      PCIe PME, pciehp
  27:          0          0   PCI-MSI 350208-edge      PCIe PME, pciehp
  28:          0          0   PCI-MSI 352256-edge      PCIe PME, pciehp
  29:          0          0   PCI-MSI 354304-edge      PCIe PME, pciehp
  30:          0          0   PCI-MSI 356352-edge      PCIe PME, pciehp
  31:          0          0   PCI-MSI 358400-edge      PCIe PME, pciehp
  32:          0          0   PCI-MSI 360448-edge      PCIe PME, pciehp
  33:          0          0   PCI-MSI 362496-edge      PCIe PME, pciehp
  34:          0          0   PCI-MSI 364544-edge      PCIe PME, pciehp
  35:          0          0   PCI-MSI 366592-edge      PCIe PME, pciehp
  36:          0          0   PCI-MSI 368640-edge      PCIe PME, pciehp
  37:          0          0   PCI-MSI 370688-edge      PCIe PME, pciehp
  38:          0          0   PCI-MSI 372736-edge      PCIe PME, pciehp
  39:          0          0   PCI-MSI 374784-edge      PCIe PME, pciehp
  40:          0          0   PCI-MSI 376832-edge      PCIe PME, pciehp
  41:          0          0   PCI-MSI 378880-edge      PCIe PME, pciehp
  42:          0          0   PCI-MSI 380928-edge      PCIe PME, pciehp
  43:          0          0   PCI-MSI 382976-edge      PCIe PME, pciehp
  44:          0          0   PCI-MSI 385024-edge      PCIe PME, pciehp
  45:          0          0   PCI-MSI 387072-edge      PCIe PME, pciehp
  46:          0          0   PCI-MSI 389120-edge      PCIe PME, pciehp
  47:          0          0   PCI-MSI 391168-edge      PCIe PME, pciehp
  48:          0          0   PCI-MSI 393216-edge      PCIe PME, pciehp
  49:          0          0   PCI-MSI 395264-edge      PCIe PME, pciehp
  50:          0          0   PCI-MSI 397312-edge      PCIe PME, pciehp
  51:          0          0   PCI-MSI 399360-edge      PCIe PME, pciehp
  52:          0          0   PCI-MSI 401408-edge      PCIe PME, pciehp
  53:          0          0   PCI-MSI 403456-edge      PCIe PME, pciehp
  54:          0          0   PCI-MSI 405504-edge      PCIe PME, pciehp
  55:          0          0   PCI-MSI 407552-edge      PCIe PME, pciehp
  56:          0          0   PCI-MSI 129024-edge      vmw_vmci
  57:          0          0   PCI-MSI 129025-edge      vmw_vmci
 NMI:          0          0   Non-maskable interrupts
 LOC:     332026     102235   Local timer interrupts
 SPU:          0          0   Spurious interrupts
 PMI:          0          0   Performance monitoring interrupts
 IWI:          0          0   IRQ work interrupts
 RTR:          0          0   APIC ICR read retries
 RES:      10386      36491   Rescheduling interrupts
 CAL:       4095       4553   Function call interrupts
 TLB:         11         33   TLB shootdowns
 TRM:          0          0   Thermal event interrupts
 THR:          0          0   Threshold APIC interrupts
 DFR:          0          0   Deferred Error APIC interrupts
 MCE:          0          0   Machine check exceptions
 MCP:         17         18   Machine check polls
 HYP:          0          0   Hypervisor callback interrupts
 HRE:          0          0   Hyper-V reenlightenment interrupts
 HVS:          0          0   Hyper-V stimer0 interrupts
 ERR:          0
 MIS:          0
 PIN:          0          0   Posted-interrupt notification event
 NPI:          0          0   Nested posted-interrupt event
 PIW:          0          0   Posted-interrupt wakeup event
```

# 文件系统挂载情况

```c
[root@localhost ~]# mount
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime,seclabel)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
devtmpfs on /dev type devtmpfs (rw,nosuid,seclabel,size=991888k,nr_inodes=247972,mode=755)
securityfs on /sys/kernel/security type securityfs (rw,nosuid,nodev,noexec,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev,seclabel)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,seclabel,gid=5,mode=620,ptmxmode=000)
tmpfs on /run type tmpfs (rw,nosuid,nodev,seclabel,mode=755)
tmpfs on /sys/fs/cgroup type tmpfs (ro,nosuid,nodev,noexec,seclabel,mode=755)
cgroup on /sys/fs/cgroup/systemd type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,xattr,release_agent=/usr/lib/systemd/systemd-cgroups-agent,name=systemd)
pstore on /sys/fs/pstore type pstore (rw,nosuid,nodev,noexec,relatime,seclabel)
bpf on /sys/fs/bpf type bpf (rw,nosuid,nodev,noexec,relatime,mode=700)
cgroup on /sys/fs/cgroup/freezer type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,freezer)
cgroup on /sys/fs/cgroup/cpuset type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,cpuset)
cgroup on /sys/fs/cgroup/net_cls,net_prio type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,net_cls,net_prio)
cgroup on /sys/fs/cgroup/cpu,cpuacct type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,cpu,cpuacct)
cgroup on /sys/fs/cgroup/perf_event type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,perf_event)
cgroup on /sys/fs/cgroup/pids type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,pids)
cgroup on /sys/fs/cgroup/blkio type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,blkio)
cgroup on /sys/fs/cgroup/devices type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,devices)
cgroup on /sys/fs/cgroup/hugetlb type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,hugetlb)
cgroup on /sys/fs/cgroup/memory type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,memory)
cgroup on /sys/fs/cgroup/rdma type cgroup (rw,nosuid,nodev,noexec,relatime,seclabel,rdma)
configfs on /sys/kernel/config type configfs (rw,nosuid,nodev,noexec,relatime)
/dev/mapper/openeuler-root on / type ext4 (rw,relatime,seclabel)
selinuxfs on /sys/fs/selinux type selinuxfs (rw,relatime)
systemd-1 on /proc/sys/fs/binfmt_misc type autofs (rw,relatime,fd=31,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=18875)
hugetlbfs on /dev/hugepages type hugetlbfs (rw,relatime,seclabel,pagesize=2M)
mqueue on /dev/mqueue type mqueue (rw,nosuid,nodev,noexec,relatime,seclabel)
debugfs on /sys/kernel/debug type debugfs (rw,nosuid,nodev,noexec,relatime,seclabel)
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,seclabel)
/dev/sda1 on /boot type ext4 (rw,relatime,seclabel)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw,relatime)
tmpfs on /run/user/0 type tmpfs (rw,nosuid,nodev,relatime,seclabel,size=201396k,mode=700)
```

## 对所有用户操作日志的记录

```c
[root@localhost ~]# cat /var/log/messages
Jul 22 03:46:01 localhost rsyslogd[2056]: [origin software="rsyslogd" swVersion="8.1907.0" x-pid="2056" x-info="https://www.rsyslog.com"] rsyslogd was HUPed
Jul 22 03:46:03 localhost rhsmd[3747]: In order for Subscription Manager to provide your system with updates, your system must be registered with the Customer Portal. Please enter your Red Hat login to ensure your system is up-to-date.
Jul 22 03:54:32 localhost systemd[1]: Starting dnf makecache...
Jul 22 03:54:53 localhost dnf[3764]: openEuler-20.03                                 0.0  B/s |   0  B     00:20
Jul 22 03:54:53 localhost dnf[3764]: Error: Failed to download metadata for repo 'repository': Cannot download repomd.xml: Curl error (6): Couldn't resolve host name for https://repo.openeuler.org/openEuler-20.03-LTS/OS/x86_64/repodata/repomd.xml [Could not resolve host: repo.openeuler.org]
Jul 22 03:54:53 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=failed'
Jul 22 03:54:53 localhost systemd[1]: dnf-makecache.service: Main process exited, code=exited, status=1/FAILURE
Jul 22 03:54:53 localhost systemd[1]: dnf-makecache.service: Failed with result 'exit-code'.
Jul 22 03:54:53 localhost systemd[1]: Failed to start dnf makecache.
Jul 22 04:55:42 localhost systemd[1]: Starting dnf makecache...
Jul 22 04:55:42 localhost dnf[3824]: Metadata cache refreshed recently.
Jul 22 04:55:42 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 04:55:42 localhost audit[1]: SERVICE_STOP pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 04:55:42 localhost systemd[1]: dnf-makecache.service: Succeeded.
Jul 22 04:55:42 localhost systemd[1]: Started dnf makecache.
Jul 22 05:56:42 localhost systemd[1]: Starting dnf makecache...
Jul 22 05:56:42 localhost dnf[3881]: Metadata cache refreshed recently.
Jul 22 05:56:42 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 05:56:42 localhost audit[1]: SERVICE_STOP pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 05:56:42 localhost systemd[1]: dnf-makecache.service: Succeeded.
Jul 22 05:56:42 localhost systemd[1]: Started dnf makecache.
Jul 22 06:57:32 localhost systemd[1]: Starting dnf makecache...
Jul 22 06:57:53 localhost dnf[3937]: openEuler-20.03                                 0.0  B/s |   0  B     00:20
Jul 22 06:57:53 localhost dnf[3937]: Error: Failed to download metadata for repo 'repository': Cannot download repomd.xml: Curl error (6): Couldn't resolve host name for https://repo.openeuler.org/openEuler-20.03-LTS/OS/x86_64/repodata/repomd.xml [Could not resolve host: repo.openeuler.org]
Jul 22 06:57:53 localhost systemd[1]: dnf-makecache.service: Main process exited, code=exited, status=1/FAILURE
Jul 22 06:57:53 localhost systemd[1]: dnf-makecache.service: Failed with result 'exit-code'.
Jul 22 06:57:53 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=failed'
Jul 22 06:57:53 localhost systemd[1]: Failed to start dnf makecache.
Jul 22 07:58:42 localhost systemd[1]: Starting dnf makecache...
Jul 22 07:58:42 localhost dnf[3993]: Metadata cache refreshed recently.
Jul 22 07:58:42 localhost systemd[1]: dnf-makecache.service: Succeeded.
Jul 22 07:58:42 localhost systemd[1]: Started dnf makecache.
Jul 22 07:58:42 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 07:58:42 localhost audit[1]: SERVICE_STOP pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 08:59:42 localhost systemd[1]: Starting dnf makecache...
Jul 22 08:59:42 localhost dnf[4049]: Metadata cache refreshed recently.
Jul 22 08:59:42 localhost systemd[1]: dnf-makecache.service: Succeeded.
Jul 22 08:59:42 localhost systemd[1]: Started dnf makecache.
Jul 22 08:59:42 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 08:59:42 localhost audit[1]: SERVICE_STOP pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
Jul 22 10:00:01 localhost systemd[1]: Starting dnf makecache...
Jul 22 10:00:21 localhost dnf[4105]: openEuler-20.03                                 0.0  B/s |   0  B     00:20
Jul 22 10:00:21 localhost dnf[4105]: Error: Failed to download metadata for repo 'repository': Cannot download repomd.xml: Curl error (6): Couldn't resolve host name for https://repo.openeuler.org/openEuler-20.03-LTS/OS/x86_64/repodata/repomd.xml [Could not resolve host: repo.openeuler.org]
Jul 22 10:00:21 localhost systemd[1]: dnf-makecache.service: Main process exited, code=exited, status=1/FAILURE
Jul 22 10:00:21 localhost systemd[1]: dnf-makecache.service: Failed with result 'exit-code'.
Jul 22 10:00:21 localhost systemd[1]: Failed to start dnf makecache.
Jul 22 10:00:21 localhost audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=dnf-makecache comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=failed'
Jul 22 10:49:39 localhost [/bin/bash]: [cat /var/log/messages] return code=[0], execute success by [root(uid=0)] from [ttyS1 17:01]
Jul 22 10:49:45 localhost [/bin/bash]: [cat /var/log/messages] return code=[0], execute success by [root(uid=0)] from [ttyS1 17:01]
```

## selinux 状态

```c
[root@localhost ~]# getenforce
Enforcing
[root@localhost ~]# sestatus -v
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          enforcing
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Memory protection checking:     actual (secure)
Max kernel policy version:      31

Process contexts:
Current context:                unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
Init context:                   system_u:system_r:init_t:s0
/sbin/agetty                    system_u:system_r:getty_t:s0-s0:c0.c1023
/usr/sbin/sshd                  system_u:system_r:sshd_t:s0-s0:c0.c1023

File contexts:
Controlling terminal:           unconfined_u:object_r:user_tty_device_t:s0
/etc/passwd                     system_u:object_r:passwd_file_t:s0
/etc/shadow                     system_u:object_r:shadow_t:s0
/bin/bash                       system_u:object_r:shell_exec_t:s0
/bin/login                      system_u:object_r:login_exec_t:s0
/bin/sh                         system_u:object_r:bin_t:s0 -> system_u:object_r:shell_exec_t:s0
/sbin/agetty                    system_u:object_r:getty_exec_t:s0
/sbin/init                      system_u:object_r:bin_t:s0 -> system_u:object_r:init_exec_t:s0
/usr/sbin/sshd                  system_u:object_r:sshd_exec_t:s0
```

