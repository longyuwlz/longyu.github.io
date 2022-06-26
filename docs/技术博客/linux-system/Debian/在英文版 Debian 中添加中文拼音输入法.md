# 在英文版 Debian 中添加中文拼音 ( 双拼 ) 输入法 

**Although for most time english is enough, we have to input some chinese when
  browse some chinese sites.This post will show how to add chinese input method
  in Debian(english version).**

**尽管大多数时间英文可以满足用户的大部分需求，但当我们浏览一些中文页面时我们必
   须输入一些中文字符。这篇博客将会教给你怎样在英文版的 debian 系统中添加中文输入法！**

## Chinese Support( 中文支持 )

 - **add chinese locales support:（添加中文语系支持）**

```shell
	sudo dpkg-reconfigure locales
```

 
 **Add（添加） zh_CN GB2312, zh_CN_GBK, zh_CN.UTF-8**
 **使用空格键选择**
 
![ 这里写图片描述 ](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwMjI0MDYxNjUxNjEy)

**but still set default locale as en_US.UTF-8**
**但是仍然设置默认语系为 en_US.UTF-8**

> *This step can be manually configured in /etc/locale.gen*
> **这一步也可以通过配置 /etc/locale.gen 文件完成**

- **install fonts（安装字体）**

```shell
	sudo aptitude install fonts-arphic-uming xfonts-intl-chinese xfonts-wqy
```

## Fcitx Input Method（Fcitx 输入法）
	
- **install fcitx and fcitx-pinyin（安装 fcitx 和 fcitx-pinyin）**

```shell
	sudo aptitude install fcitx fcitx-pinyin
```

- **install im-config to config the input method**
- **安装 im-config 来配置输入法**

```sh
	sudo aptitude install im-config
```

- **config the input method to fcitx（将输入法配置为 fcitx）**

**use** *im-config*, then choose **fcitx（执行 im-config 命令，然后选择 fcitx，如下图所示）**

![ 这里写图片描述 ](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwMjI0MDYxOTE3Mjkx)

- **restart the xwindows with（执行 *sudo startx* 命令 重启 xwindows ）** **sudo startx**

- **Add shuangpin or pinyin in Input Method**（**将双拼或拼音添加到输入法中**）

	**use** *fcitx-configuretool* **to add shuangpin and pinyin（使用 *fcitx-configuretool* 来添加双拼和拼音）**

![ 这里写图片描述 ](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwMjI0MDYyMDAyODY2)

## Problem（问题）

sometimes, we can’t add pinyin or shuangpin in english environment. Just set
system’s **Region and Language** as chinese

 当我们不能在英文环境下添加拼音或者双拼时，先将系统的地区与语言设为中文 

In chinese environment, use **fcitx-configuretool** to add shuangpin or pinyin
in Input Method. Then change system language back to english. Now you can just
use chineseinput in english debian.

 在中文环境中，使用 ***fcitx-configuretool*** 来添加拼音与双拼到输入法中。然后重
 新将系统的语言设置为英语。现在你应该可以在英文版 ***debian*** 中使用中文输入法了 

## Supplement

To use Wubi or Google Pinyin etc, you have to add these input method like **sudo
aptitude intall fcitx-googlepinyin**.

**想使用五笔或者谷歌拼音等输入法，必须执行类似（sudo aptitude intall
   fcitx-googlepinyin）这条指令来安装相关输入法，然后后面的操作与前面叙述的相同**

## Attention
当你按照上面的配置操作之后如果输入法仍旧不能正常使用，那你需要看看你的系统中是否
还使用了 **ibus**。如果确实使用了 **ibus**，那么你需要解除关联。直接的方式是把
它从系统中移除，这之后前面配置的输入法应该便可以正常工作了。


