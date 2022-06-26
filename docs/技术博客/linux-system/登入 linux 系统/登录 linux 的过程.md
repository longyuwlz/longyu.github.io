# 登录 linux 的过程
我们使用 LINUX 系统是从登录开始的。下面是一个登录的示例：

```shell
 [longyu@debian: 二 3 月 22 07:36:45] $ sudo login 
 debian 用户名：longyu 
 密码：
 [longyu@debian: 二 3 月 22 07:37:10] $    <- 命令提示符 (prompt)(PS1)
```

输入用户名与密码就可以进行登录，账户与密码校验通过就可以进入系统了。进入系统后我们最先注意到
的东西应该是终端里的命令提示符。这个命令提示符显示的具体内容实际是由 **PS1** 变量进行控制的。 
 
 下面是我的 **PS1** 配置：

```shell
\[\e]0;\u@\h \d \t: \a\]${debian_chroot:+($debian_chroot)}[\u@\h: \d \t] \$
```

 仅供了解，后面再介绍。

## 登录过程中做了那些工作?
 在登入 **Linux** 之时，我们要输入用户名与密码 ( 输入密码不回显 )。当我们输入完成，按下 ENTER 
 键之后，系统会在 **/etc/passwd**（密码文件）中查找用户名。下面是我自己的系统中 **/etc/passwd** 
 的一个示例：

```shell
longyu:x:1000:1000:This is my user:/home/longyu:/bin/bash
```

 细心的读者可以发现，上面的一行中有七项——项与项之间用冒号分隔。字段描述与内容示例如下表所示：
 

| field description( 字段描述 ) | 		my field component（我的字段内容） |
|	------							|		---------			|
| the login name( 登录名 ) |           		 longyu  |
| encrypted password（加密密码） |			x 	|           
| numeric user ID（用户 ID） | 1000 |
| numeric group ID( 默认组 ID) | 1000		|      
| a comment field( 注释字段 )　|　This is my user |         
| home directory( 家目录 ) |		／home/longyu	 |
| shell program( 默认 shell) |		/bin/bash  |


 在这里你必须了解各个项对应的不同意义。同时需要指出的是，加密后的用户密码存储在影子文件 **/etc/shadow**  中。这两个文件的属性如下：    

```shell
-rw-r--r-- 1 root root   2238 3 月  18 09:32 /etc/passwd
-rw-r----- 1 root shadow 1348 3 月  18 09:32 /etc/shadow
```

 这样的话你应该知道为什么要加密密码了吧。如果你将密码——即使是加密之后的长串字符直接放在 **/etc/passwd** 中，那么账户的安全性就会大幅度降低。毕竟 **/etc/passwd** 是对所有人可读的呀！
 
 好了，回归正题！

 当 **linux** 在 **/etc/passwd** 中查到 **longyu** 的存在之后，就启动 **PAM** 验证机制，来验证密码。当密码验证成功之后，我的屏幕上打印出了如下信息：

> ** 上一次登录：六 3 月 19 14:50:05 CST 2016 tty6 上 **
>  **Linux debian 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt20-1+deb8u4 (2016-02-29) x86_64**
> 
> The programs included with the Debian GNU/Linux system are free
> software; the exact distribution terms for each program are described
> in the individual files in /usr/share/doc/*/copyright.
> 
> Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
> permitted by applicable law.

 **那这个信息是怎么产生的呢?**

 首先你必须明确的是，**系统会将你每次的登陆信息记录在登陆日志文件中，然后在你进行新的登入时，就会有相关的程序 (**lastlog**) 执行，来显示你的上一次登陆的记录**。这个记录包括时间 (**六 3 月 19 14:50:05 CST 2016**)， 以及登陆位置 (**tty6**)。

这之后你可能已经注意到下面这行输出内容了。

**`Linux debian 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt20-1+deb8u4 (2016-02-29) x86_64`**

 这一输出内容可以说是系统的概述，它的显示依赖于你在 **/etc/issue** 或 **/etc/issue.net** 中的设定。下面是我的设定：

```sh
[longyu@debian: 二 3 月 22 08:05:27] $ cat /etc/issue /etc/issue.net
Debian GNU/Linux 8 \n \l
```
更多的细节你可以 **man** 一下！

在打印了上面的信息之后又继续打印了一段文字。这段文字的内容在 **/etc/motd** 文件中存储，我的系统中该文件的内容如下：

```sh
[longyu@debian: 二 3 月 22 08:09:57] $ cat /etc/motd
The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
```

 你有没有发现，上面的文件正文跟之前打印出来的两个段落一模一样呢！本该如此啊！


 好了说了这么多，那这些信息打印出来之后我们能干什么？我们能打命令了 !

## 在 shell 中执行命令
 执行我们所输入命令的程序叫做 **shell**（这里就不翻译了）。正如我之前所讲的 **/etc/passwd** 的七个项的代表意义一样，你会发现第七项就是这个 **shell** 了。而我的 **shell** 是 **/bin/bash** 这个呀！在我的 **debian** 中总共有以下几种合法 **shell** ：

```sh
  #　/etc/shells: valid login shells
  /bin/sh
  /bin/dash
  /bin/bash
  /bin/rbash
```

 这个你一样还是了解了解就行，你只需要知道它们是不同的程序，但具有极其相似的功能。

**那么 **shell** 到底是干嘛的？**

官方的描述是——**A shell is a command-line interpreted that reads user input and executes commands**。 简单的说，这里的 **shell** 就是一个命令行解释器，通过读取用户输入的命令，来完成用户所赋予的任务。如果将每个命令都看做大学宿舍的每个房间，那你第一次进你宿舍之前，你是不是得先弄吧钥匙？这个钥匙怎么弄呢？偷？这个钥匙是学校提供给你的，因此你要得到这个钥匙你就必须去特定的地方，找特定的人。

**那到底命令是怎样找的？**

命令其实是按照下面这个 PATH 的设定来找的！

```
[longyu@debian: 二 3 月 22 08:21:36] $ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/local/texlive/2015/bin/x86_64-linux
```

上述配置中，每一个路径之间使用冒号分隔。shell 在执行命令时会在需要的时候按照这个变量的设定依次去找待执行的命令，找到了则调用执行，找不到就打印错误信息。

如果你对 shell 的工作原理有更进一步的认识的话，你会发现 shell 在找命令的时候并不会马上去 PATH 变量中指定的路径中查找。实际上 shell 支持的 alias 语句与內建函数都是在此之前先被查找的，找不到才会按照 PATH 中指定的路径去找。这样的处理方式在一些情况下可能会造成问题，不过这并不是我们现在需要过分在意的事情，还是不进一步讨论了！

 好了，登录就先说到这吧！

　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　	　　　　　　**龙瑜**










