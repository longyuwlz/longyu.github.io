# 使用命令行连接 wifi

以前尝试过通过命令行连接 wifi，最后没有成功，已经是几年前的印象。继续尝试，我发
现 iwconfig 不支持秘钥，只能用于连接开放的热点。

下面是我在使用命令行连接 wifi 的时候遇到的问题及解决方法。

1.  RF-kill 控制无效

	报错如下:
	> SIOCSIFFLAGS: Operation not possible due to RF-kill

更详细的信息如下:

 
```sh
       [longyu@debian:16:03:24] shell $ sudo rfkill list all
        0: phy0: Wireless LAN
        Soft blocked: yes
        Hard blocked: no
        1: asus-wlan: Wireless LAN
        Soft blocked: yes
        Hard blocked: no
        2: asus-bluetooth: Bluetooth
        Soft blocked: yes
        Hard blocked: no
```
上面的输出表示我的无线网卡目前处于 soft-blocked 状态，这是当我在图形端关闭无
线网卡时，内核通知无线网卡关闭后产生的。

这个问题可以在图形界面选择打开无线连接完成，不过在这里我选择使用命令解决这个问题。

[operation not possible due to RF-kill](https://askubuntu.com/questions/62166/siocsifflags-operation-not-possible-due-to-rf-kill)

上面的链接有详细的操作步骤，这里我也列出主要的步骤。

1. unblock wifi
   
       sudo rfkill unblock wifi

2. 确认网卡已经解除锁定

    	sudo rfkill list
    
3. 重启

  		 reboot

4. 再次确认网卡已经解除锁定

   		sudo rfkill list 

5. 执行 sudo lshw -class network
   
        sudo lshw -class network
       
从输出中就能够看到现在内核应该已经识别出来或仍未识别出无线网卡。

正确的输出与下面的信息类似：

> *-network
 >     description: Wireless interface
>     product: BCM43142 802.11b/g/n
>     vendor: Broadcom Corporation
>     physical id: 0
>     bus info: pci@0000:03:00.0
>     logical name: wlan0
>     version: 01
>     serial: 30:10:b3:c9:82:f1
>     width: 64 bits
>     clock: 33MHz
>     capabilities: pm msi pciexpress bus_master cap_list ethernet physical wireless
>     configuration: broadcast=yes driver=wl0 driverversion=6.30.223.248 (r487574) ip=192.168.2.168 latency=0 multicast=yes wireless=IEEE 802.11abg
>     resources: irq:19 memory:f7800000-f7807fff

此时网络管理器面板中将能够看到无线网络选项。

无线网卡可以正常工作后，首先尝试连接开放的热点。

1.    使用 iwlist 扫描附近热点
```sh
	 	     [longyu@debian:16:09:14] shell $ sudo iwlist wlan0 scanning 
 ```
  
2. 使用 iwconfig 连接开放热点
 ```sh 
     	  iwconfig wlan0 essid NETWORK_NAME
```
4. 获取 ip 地址
```sh  
       	dhclient wlan0
```

这之后尝试连接使用 WPA-PSK 的热点。

1. 使用 wpa_passphrase 生成 WPA PSK 秘钥
  	
  	  		 wpa_passphrase [ ssid ] [ passphrase ]


2. 编辑 /etc/wpa_supplicant.conf 文件，具体的配置详见 man 5 wpa_supplicant.conf

	我使用的配置如下:

	> network={
	>     ssid="longyu"
	>   	  scan_ssid=1
	>     key_mgmt=WPA-PSK
	>     psk=79c2be1deb5d5010dc00c183babf19a3a896fa1310bebaad2e8aee5e010f7f2f
	> }

我最初按照网上的配置，没有设定 scan_ssid 与 key_mgmt，结果一直连接不上。最后我查看系统中的 manual，使用上面的配置成功连接到热点。

有人说连接不上可能是 wpa_passphrase 生成秘钥的问题。我按照网上的教程生成了新的密码，确实与我在本地生成的不同，但仍旧连接不上，看来这里应当没有太大的问题。

３. 使用 wpa_supplicant 连接到热点
```sh
    [longyu@debian:16:27:36] tmp $ sudo wpa_supplicant -i wlan0  -c file
    Successfully initialized wpa_supplicant
    wlan0: Trying to associate with 02:1a:11:f1:cb:c5 (SSID='longyu' freq=2437 MHz)
    wlan0: Associated with 02:1a:11:f1:cb:c5
    wlan0: CTRL-EVENT-DISCONNECTED bssid=02:1a:11:f1:cb:c5 reason=0
    wlan0: CTRL-EVENT-REGDOM-CHANGE init=CORE type=WORLD
    wlan0: Trying to associate with 02:1a:11:f1:cb:c5 (SSID='longyu' freq=2437 MHz)
    wlan0: Associated with 02:1a:11:f1:cb:c5
    wlan0: WPA: Key negotiation completed with 02:1a:11:f1:cb:c5 [PTK=CCMP GTK=CCMP]
    wlan0: CTRL-EVENT-CONNECTED - Connection to 02:1a:11:f1:cb:c5 completed [id=0 id_str=]
```
至此就完成了使用命令行连接 wifi 的全过程。

## 反思
这次的尝试也给了我一个教训——不要遇到问题就搜索，也不要认为搜索出来的结果一定适用于自己的系统，既然有 manual ，首先直接查看 manual。这算是我思维中的一大误区吧！




