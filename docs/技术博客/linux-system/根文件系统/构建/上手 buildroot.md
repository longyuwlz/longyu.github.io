# 上手 buildroot
## buildroot 是干嘛的？
buildroot 可以用来处理交叉工具链、生成根文件系统，编译内核镜像与 
bootloader 镜像等，它最终会生成一个**根文件系统镜像**。

它使用了类似于内核 menuconfig、gconfig、xconfig 的配置接口，编译
一个基础的系统非常容易，一般只需要花费 15-30 分钟。

它包含了很多网络相关、系统相关的使用命令，能够定制编译出需要的根
文件系统。同时也**支持交叉编译**，能够统一多平台的根文件系统编译
过程。

同时 buildroot 管理的包还提供了一些问题的补丁，在编译的时候会从仓
库中下载源码包，然后打上补丁后进行编译。

## buildroot 的实际应用
据我了解，我们公司就使用了 buildroot 来完成多个平台根文件系统的
编译过程，有了这个工具，**多平台编译**得到很好的管理。其实根文
件系统的是一个**非常繁琐**的东东，它涉及了**很多命令与众多的动
态库**，没有很好的管理，现场将会一片混乱！

不过要真正用上 buildroot 这个功能，提高生产力，还必须解决它从仓库
中获取源码包的问题。这个问题算是对 buildroot 的定制，从 buildroot 
源码的 docs 目录下的手册中找到了如下内容：

```
[[download-location]]

==== Location of downloaded packages

The various tarballs that are downloaded by Buildroot are all stored
in +BR2_DL_DIR+, which by default is the +dl+ directory. If you want
to keep a complete version of Buildroot which is known to be working
with the associated tarballs, you can make a copy of this directory.
This will allow you to regenerate the toolchain and the target
filesystem with exactly the same versions.

If you maintain several Buildroot trees, it might be better to have a
shared download location. This can be achieved by pointing the
+BR2_DL_DIR+ environment variable to a directory. If this is
set, then the value of +BR2_DL_DIR+ in the Buildroot configuration is
overridden. The following line should be added to +<~/.bashrc>+.

-----------------
 export BR2_DL_DIR=<shared download location>
-----------------

The download location can also be set in the +.config+ file, with the
+BR2_DL_DIR+ option. Unlike most options in the .config file, this value
is overridden by the +BR2_DL_DIR+ environment variable.
~
```
可以在  buildroot 源码目录中建个 dl 目录将要使用的包放到这里面，
这样就不需要从远端下载了。
## buildroot 编译使用及其工作过程
从 [buildroot 官网](https://buildroot.org/) 下载 buildroot 的源码包，下载完成后编译需要执行如下步骤：

1. make menuconfig 选择需要编译的内容
2. make 命令编译
3. buildroot 从仓库中下载源码包，打上 patch 进行编译，直至编完所有的包
4. buildroot 自动打包生成一个 rootfs.tar 文件

## 使用 buildroot 编译时遇到的问题
生成 .config 文件后，执行 make 进行编译，遇到了如下报错信息：

```bash
/usr/bin/make -j1 O=/home/longyu/Downloads/buildroot-2020.02.7/output HOSTCC="/usr/bin/gcc" HOSTCXX="/usr/bin/g++" syncconfig
make[1]: 进入目录“/home/longyu/Downloads/buildroot-2020.02.7”
mkdir -p /home/longyu/Downloads/buildroot-2020.02.7/output/build/buildroot-config/lxdialog
PKG_CONFIG_PATH="" /usr/bin/make CC="/usr/bin/gcc" HOSTCC="/usr/bin/gcc" \
    obj=/home/longyu/Downloads/buildroot-2020.02.7/output/build/buildroot-config -C support/kconfig -f Makefile.br conf
make[2]: 进入目录“/home/longyu/Downloads/buildroot-2020.02.7/support/kconfig”
/usr/bin/gcc -D_DEFAULT_SOURCE -D_XOPEN_SOURCE=600 -DCURSES_LOC="<ncurses.h>" -DNCURSES_WIDECHAR=1 -DLOCALE  -I/home/longyu/Downloads/buildroot-2020.02.7/output/build/buildroot-config -DCONFIG_=\"\"   /home/longyu/Downloads/buildroot-2020.02.7/output/build/buildroot-config/conf.o /home/longyu/Downloads/buildroot-2020.02.7/output/build/buildroot-config/zconf.tab.o  -o /home/longyu/Downloads/buildroot-2020.02.7/output/build/buildroot-config/conf
make[2]: 离开目录“/home/longyu/Downloads/buildroot-2020.02.7/support/kconfig”
make[1]: 离开目录“/home/longyu/Downloads/buildroot-2020.02.7”

You have PERL_MM_OPT defined because Perl local::lib
is installed on your system. Please unset this variable
before starting Buildroot, otherwise the compilation of
Perl related packages will fail
make: *** [support/dependencies/dependencies.mk:27：dependencies] 错误 1
```
这个报错信息里面说明因为我安装了 perl 的 local::lib 库，PERL_MM_OPT
变量被定义，我需要 unset 这个变量。我通过执行如下命令完成：

```bash
[longyu@debian-10:22:24:25] buildroot-2020.02.7 $ unset PERL_MM_OPT
```
完成后重新编译，这次报了一个新的错误，内容如下：

```bash
[longyu@debian-10:22:24:56] buildroot-2020.02.7 $ make 
You must install 'rsync' on your build machine
```
看来是 rsync 命令没有安装，我执行如下命令安装之：

```bash
sudo apt-get install rsync
```
安装完成后开始编译，然后我发现它开始向某个仓库地址发 http 请求，
连接上后开始下载，不过下载速度非常慢，只有几十 kb/s，这个问题
需要解决。

进一步查看发现它是通过 wget 命令来获取源码包的，那看来我应该
给 wget 搞个代理。

## 设置 wget 的代理
man wget 获取到了如下信息：

```manual
ENVIRONMENT
       Wget supports proxies for both HTTP and FTP retrievals.  
       The standard way to specify proxy location, which Wget recognizes, 
       is using the following environment variables:

       http_proxy
       https_proxy
           If set, the http_proxy and https_proxy variables should contain 
           the URLs of the proxies for HTTP and HTTPS connections respectively.
```
看来只需要设定 http_proxy、https_proxy 环境变量就可以了，网上
找了一个代理地址，配置上后发现仍旧很慢。

我自己有 socks5 代理服务器，如果能够用我这个 sock5 代理服务
器，我想应该会很快，但是 **wget 只支持 http、https、ftp 代理** ，
这可怎么办捏？

## privoxy 工具
琢磨了一下，感觉应该有相关的工具，搜索了下找到了 **privoxy** 这
个 http 代理工具。

首先执行如下命令安装之：

```bash
sudo apt-get install privoxy
```
然后研究了下这个工具，发现它在 **/etc/init.d/** 下面有个 **privoxy** 
服务，需要执行 **sudo /etc/init.d/privoxy start** 来启动。

它也有自己的配置文件，配置文件位于 **/etc/privoxy/config** 中，它
默认监听回环地址的 8118 端口。

针对这里的问题，其工作流程如下：

privoxy 不直接转发流量，需要配置 http_proxy、https_proxy 环境变量
让 wget 将流量转发到 privoxy 的端口，privoxy 收到流量后根据配置文
件的设定转发到 sock5 端口中，由 sock5 端口向远端仓库发送请求，
socks5 代理收到远端仓库的报文后先转发到 privoxy 中，再由 privoxy 
转发到 wget 命令中。

需要在 **/etc/privoxy/config** 文件中添加如下配置：

```bash
forward-socks5 / 127.0.0.1:1080 .
```
这个配置的含义就是将收到的任意地址的 http 报文转发到本地回环
端口地址绑定的  1080 端口中的 socks5 代理中，最后的 . 也不要忽
略掉欧。

修改了配置后需要**重新启动 privoxy 服务**来重新读取配置文件。
执行完成这一步后，还需要设定 **http_proxy="127.0.0.1:8118"** 来
让 wget 将 http 请求转发到 privoxy 监听的 8118 端口上。

## 最终生成的文件
最终在 output 目录中生成了一个 rootfs.tar 文件，解压后目录内容
如下：
```
bin  dev  etc  lib  lib64  linuxrc  media  mnt  opt  proc  root  run  sbin  sys  tmp  usr  var
```
这个目录与嵌入式中使用的根文件系统目录结构类似，到这里 buildroot 
就算是用起来了。



