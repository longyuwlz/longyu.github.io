# max file descriptors [4096] for elasticsearch process is too low 问题定位
## 问题描述
某产品反馈在我们的系统中以某 A 用户部署运行 elasticsearch，启动 elasticsearch  时 log 中有如下报错信息：

>max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536] in elasticsearch log

报错信息表明 elasticsearch 程序的 max file descriptors 的限制为 4096，需要增加到 65536。

在 centos 下面部署相同的程序没有这个问题。
## 软件版本信息
systemd 219
linux kernel 3.16.35

## 搜索互联网得到的结果
使用 log 信息搜索互联网，在检索的信息表明可以通过修改 /etc/security/limits.conf 文件设置 elasticsearch 执行用户的 nofile 限制来解决此问题，于是在此文件中添加如下行：

```bash
A       hard    nofile  65536
A       soft    nofile  65536
```
A 表示运行 elasticsearch 的用户，hard 与 soft 表示限制的类型，nofile 表示 max number of open file descriptors，65536 表示设置的大小。

修改后重新测试，发现**问题仍旧存在**！

## 提问环节
### 1. 如何确定修改 /etc/security/limits.conf 生效？
首先观测 su 切换到 A 账号的时候是否读取此文件，执行了下面两个测试：

**A. su - 切换账户**

```strace
[root@localhost ~] # ./strace -f  su -  A -c 'ulimit -Hn' 2>&1 | grep limits
openat(AT_FDCWD, "/usr/lib64/security/pam_limits.so", O_RDONLY|O_CLOEXEC) = 6
openat(AT_FDCWD, "/etc/security/limits.conf", O_RDONLY) = 3
read(3, "# /etc/security/limits.conf\\n#\\n#T"..., 4096) = 2584
openat(AT_FDCWD, "/etc/security/limits.d", O_RDONLY|O_NONBLOCK|O_DIRECTORY|O_CLOEXEC) = 3
openat(AT_FDCWD, "/etc/security/limits.d/20-nproc.conf", O_RDONLY) = 3
```
**B. su  切换账户**

```strace
[root@localhost ~] # ./strace -f  su   A -c 'ulimit -Hn' 2>&1 | grep limits
openat(AT_FDCWD, "/usr/lib64/security/pam_limits.so", O_RDONLY|O_CLOEXEC) = 5
openat(AT_FDCWD, "/etc/security/limits.conf", O_RDONLY) = 3
read(3, "# /etc/security/limits.conf\\n#\\n#T"..., 4096) = 2584
openat(AT_FDCWD, "/etc/security/limits.d", O_RDONLY|O_NONBLOCK|O_DIRECTORY|O_CLOEXEC) = 3
openat(AT_FDCWD, "/etc/security/limits.d/20-nproc.conf", O_RDONLY) = 3
```
输出信息表明 limits.conf 文件被成功读取，此后再观察切换后的 ulimit -Hn 的输出信息：

```bash
[root@localhost ~] # su A
[A@localhost ~] $ ulimit -Hn
65536
[A@localhost ~] $  exit
exit
[root@localhost ~] # su A -
[A@localhost ~] $ ulimit -Hn
65536
```
ulimit -Hn 的输出就是 max number of open file descriptors 的 hard 限制，输出信息表明配置是生效的。

### 2. 普通用户通过 ssh 登录的方式是否读取 /etc/security/limits.conf 文件？
使用 strace 跟踪 ssh 登录过程，发现在我们的系统中通过 ssh 登录的时候并没有读取 /etc/security/limits.conf 文件，**自然配置也不会生效**，但登录成功后查询确定句柄数量硬限制为 **4096**，不禁要问这个 **4096 是从哪里来的？**

### 3. 普通用户 ssh 登录后 ulimit -Hn、ulimit -Sn 的配置是从哪里来的？
继续使用 strace 跟踪普通用户 ssh 登录过程，获取到如下关键信息：

```strace
[pid 13588] prlimit64(0, RLIMIT_NOFILE, NULL, {rlim_cur=1024, rlim_max=4*1024}) = 0
```
prlimit64 的第二个参数用于设置 rlimit，第三个参数用于获取 **rlimit**，**RLIMIT_NOFILE** 标识资源类型为 **max open file descriptors**，这里获取到的软限制为 1024，硬限制为 4096，同时确定没有任何设置 **RLIMIT_NOFILE** 的操作。

### 4. 普通用户 ssh 登录时 prlimit64 获取到的 RLIMIT_NOFILE 的配置是从哪里来的？
根据经验，我猜测 ssh 登陆时 prlimit64 获取到的资源限制来源自 sshd 进程，于是做了如下测试：

```bash
[root@localhost ~] #  ps aux | grep '/sbin/sshd$'
root      1872  0.0  0.2  15852  4332 ?        Ss   22:54   0:00 /sbin/sshd
[root@localhost ~] # grep 'Max open' /proc/1872/limits
Max open files            1024                 4096              files
```
为了进一步验证我的猜想，我在 ssh 的 systemd 服务配置中添加 **LimitNOFILE=16384** 配置，然后执行 **systemctl daemon-reload** 重新加载 systemd 服务配置，加载后重启 sshd 服务，然后重新登录发现 ulimit -Hn 的输出变为了 16384 表明我的猜想成立，在没有任何其它配置的情况下 ssh 登录后的 max open file descriptors 限制继承自父进程 sshd。

### 5. sshd 进程的 max open file descriptors 从哪里继承？
有了 4 的基础，可以猜测 sshd 进程的 max open file descriptors 限制继承自它的父进程，那它的父进程是谁呢？

执行如下命令查看：

```bash
[root@localhost ~] # ps axo ppid,pid,command |grep sshd
    1  3445 /usr/sbin/sshd -D
```
能够看到 sshd 父进程的 pid 号为 1，执行的程序为 /sbin/init，此文件是个软链接，实际执行的程序是 systemd，大胆猜测是 systemd 在执行服务进程的时候配置的。

为了验证这点，我在系统中创建了一个测试服务，服务内容如下：

```bash
[root@localhost ~] # cat /lib/systemd/system/test.service
[Unit]
Description=test max open file limit

[Service]
ExecStart=/bin/test-limit
ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
```
test-limit 是我编译的一个非常简单的程序，其源码如下：
```c
#include <unistd.h>

int main(int argc, char *argv[])
{
        pause();

        return 0;
}
```
执行如下命令使能此服务；
```c
[root@localhost ~] # systemctl enable test
Created symlink from /etc/systemd/system/multi-user.target.wants/test.service to /lib64/systemd/system/test.service.
```
执行 systemctl start test 启动之，正常运行状态如下：
```c
● test.service - test max open file limit
   Loaded: loaded (/lib64/systemd/system/test.service; enabled; vendor preset: enabled)
   Active: active (running) since 六 2021-10-30 13:32:46 +08; 4s ago
 Main PID: 25342 (test-limit)
   CGroup: /system.slice/test.service
           └─25342 /bin/test-limit
```
查看 test-limit 程序的 max open files 限制如下：
 ```bash
[root@localhost ~] # grep 'Max open files' /proc/25342/limits
Max open files            1024                 4096                 files
```
以上信息表明在 **systemd 219** 版本中，不做任何配置的情况下，**systemd 服务创建的进程默认的 max open file descriptors 都会设定为 soft limit 1024，hard limit 4096**。

### 6. systemd 219 源码中对于 RLIMIT_NOFILE 的一些说明
在 systemd 219 源码中找到了如下信息：

>- PID 1 will now increase its RLIMIT_NOFILE to 64K by default
(but not for its children which will stay at the kernel
default). This should allow setups with a lot more listening
sockets.

以上信息表明 systemd 自身的 RLIMIT_NOFILE 会被设定为 64K，但是它创建的子进程的 RLIMIT_NOFILE 配置会保持内核默认值。

### 7. 内核中 RLIMIT_NOFILE 默认配置相关代码
在 3.16.35 内核源码中 init task 进程的默认 RLIMITS 配置如下：

```c
/*
 * boot-time rlimit defaults for the init task:
 */
#define INIT_RLIMITS                                                    \
{                                                                       \
        [RLIMIT_CPU]            = {  RLIM_INFINITY,  RLIM_INFINITY },   \
        [RLIMIT_FSIZE]          = {  RLIM_INFINITY,  RLIM_INFINITY },   \
        [RLIMIT_DATA]           = {  RLIM_INFINITY,  RLIM_INFINITY },   \
        [RLIMIT_STACK]          = {       _STK_LIM,  RLIM_INFINITY },   \
        [RLIMIT_CORE]           = {              0,  RLIM_INFINITY },   \
        [RLIMIT_RSS]            = {  RLIM_INFINITY,  RLIM_INFINITY },   \
        [RLIMIT_NPROC]          = {              0,              0 },   \
        [RLIMIT_NOFILE]         = {   INR_OPEN_CUR,   INR_OPEN_MAX },   \
        .........
}
```

相关宏定义：
```c
#define INR_OPEN_CUR 1024       /* Initial setting for nfile rlimits */
#define INR_OPEN_MAX 4096       /* Hard limit for nfile rlimits */
```

## 初步结论
根据上面的分析，在执行 su 切换的时候 limits.conf 的配置会生效。如果 elasticsearch 是先执行 su 切换用户，然后部署运行，理论上不应该报这个错误，除非执行逻辑中 RLIMIT_NOFILE 又被重新设置了。但是在标准的 centos 环境中没有这个问题，差异点在**系统本身**。

同时测试发现通过 ssh 登录时，limits.conf 配置未生效，此时 max open file descriptors 的限制为 4096，于是怀疑**是否是通过 ssh 登录后部署的**。

经过沟通确定是通过 ssh 登录的，直接**修改 sshd 的 systemd 服务配置，将 RLIMIT_NOFILE 修改为 65536 后重新运行 sshd 服务，重新部署 elasticsearch，这次成功运行起来了。**

## 真正的问题：为什么 ssh 登录时没有读取 limits.conf 文件？
一通搜索，发现 limits.conf 是 pam 模块提供的功能。当 sshd_config 配置中使能 PAM 时（确认我们的系统 sshd 配置使能了 PAM ），ssh 登录的时候会访问 /etc/pam.d/sshd 里的配置进行认证，pam_limits.so pam 模块负责设置用户的 limits 配置。

于是查看我们系统中的 /etc/pam.d/sshd 文件，发现并没有添加 **session    required     pam_limits.so** 配置，在文件最后添加了后重新登录发现仍旧不行，strace 继续跟踪发现**加载了 pam_limits.so 但是并没有读取 limits.conf 文件**。

跟比较熟悉 pam 的同事沟通，他告诉我不生效的原因可能跟 pam_limits.so 前面的配置项有关系。

了解到 pam 配置中有如下规则：

**当存在一个 sufficient 的配置时，如果一个用户通过这个模块的验证，PAM 流程就立刻返回验证成功信息把控制权交回应用程序。后面的层叠模块即使使用 requisite 或者 required 控制标志，也不再执行。**

根据这个规则修改 session    required     pam_limits.so 配置的位置后，问题得到解决。

## 总结
有些问题的复杂性在于问题表象跟真正的问题之间有一些距离，处理这些问题时容易陷入到表象中走不出来，造成问题难以推动。

从问题描述开始，不断的提问并通过实践结果回答问题，问题就在这些回答中得以推进。有时可能需要不断的回到问题描述与提问上来，需要多次确认，这都是正常的过程。

同时在定位这些问题过程中表现的个人对问题敏感性的欠缺与提问能力的欠缺也是需要不断改善的。

## 参考链接

[https://www.ibm.com/support/pages/max-file-descriptors-65535-elasticsearch-process-too-low-increase-least-65536-elasticsearch-log](https://www.ibm.com/support/pages/max-file-descriptors-65535-elasticsearch-process-too-low-increase-least-65536-elasticsearch-log)

[https://www.elastic.co/guide/en/elasticsearch/reference/current/file-descriptors.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/file-descriptors.html)

[https://www.programcreek.com/java-api-examples/?api=com.sun.management.UnixOperatingSystemMXBean](https://www.programcreek.com/java-api-examples/?api=com.sun.management.UnixOperatingSystemMXBean)

[https://blog.csdn.net/foart/article/details/8805060](https://blog.csdn.net/foart/article/details/8805060)

[https://cloud.tencent.com/developer/article/1430057](https://cloud.tencent.com/developer/article/1430057)

[https://www.jianshu.com/p/b6d43533aa90](https://www.jianshu.com/p/b6d43533aa90)

[https://www.cyberciti.biz/faq/linux-increase-the-maximum-number-of-open-files/](https://www.cyberciti.biz/faq/linux-increase-the-maximum-number-of-open-files/)

[https://zhuanlan.zhihu.com/p/111364906](https://zhuanlan.zhihu.com/p/111364906)

[https://www.jianshu.com/p/ea32136d4074](https://www.jianshu.com/p/ea32136d4074)

