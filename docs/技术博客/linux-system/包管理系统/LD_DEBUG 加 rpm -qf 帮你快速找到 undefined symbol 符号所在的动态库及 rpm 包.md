# LD_DEBUG 加 rpm -qf 帮你快速找到 undefined symbol 符号所在的动态库及 rpm 包
## 问题描述
从某发行版仓库下载 rsyslogd 的 rpm 包，手动解压升级后，运行 rsyslogd 报**符号未定义**的错误。错误信息：

```bash
rsyslogd: symbol lookup error: rsyslogd: undefined symbol: fjson_global_do_case_sensitive_comparison
```
## 问题分析
使用 ldd 查看 rsyslogd 缺库情况，确认**没有缺库**。那只存在一种可能，就是**依赖的某个库的版本不一致**，低版本缺乏相应的符号，需要找到这个符号是由哪个 so 提供的，进而找到这个 so 归属的 rpm 包。

## 解决方法
安装发行版，在安装好的系统中设置 LD_DEBUG 变量，运行 rsyslogd 并检索 fjson_global_do_case_sensitive_comparison 符号从哪个 so 中找到。

命令示例：
```c

[root@localhost ~]# LD_DEBUG='symbols' /usr/sbin/rsyslogd 2>&1 |grep fjson_global_do_case_sen
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/usr/sbin/rsyslogd [0]
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/lib64/libz.so.1 [0]
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/lib64/libpthread.so.0 [0]
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/lib64/libdl.so.2 [0]
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/lib64/librt.so.1 [0]
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/lib64/libestr.so.0 [0]
      3434:     symbol=fjson_global_do_case_sensitive_comparison;  lookup in file=/lib64/libfastjson.so.4 [0]
```
上述输出表明此符号由 /lib64/libfastjson.so.4 文件提供。

## 找到提供这个库的 rpm 包
使用 rpm -qf 参数可以找到系统安装目录中指定文件归属的 rpm 包，执行示例：

```c
[root@localhost ~]# rpm -qf /lib64/libfastjson.so.4
libfastjson-0.99.8-3.oe1.x86_64
```
相关的 rpm 包为 libfastjson-0.99.8-3.oe1.x86_64，下载此包并安装，问题得到解决！

## 一点点引申
我在 [man ld.so 的翻译](https://blog.csdn.net/Longyu_wlz/article/details/108511931) 这篇文章中有描述过 LD_DEBUG 变量的功能，它除了 symbols 外，还有其它参数，在定位一些动态库问题时非常有用。

