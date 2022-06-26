# bad interpreter
## 问题描述
今天在 linux 上执行一个脚本时产生了如下错误：
```sh
    [longyu@debian:17:08:10] ui $ ./rename.sh 
    bash: ./rename.sh: /bin/bash^M: bad interpreter: No such file or directory
```
## 问题分析
看到这个错误我竟然一时间想不到问题在哪，傻傻的再次确认了下 bash 确实在 bin 目录下放着，那这到底是什么问题呢？

由于我最初是在 emacs 中的 shell 里面执行的这个脚本，我怀疑是不是执行环境的原因，然后在 guake 的终端中执行得到的错误相同。

终于，终于我注意到了 ^M 这个特殊的符号。我想起了这个脚本是在 windows 上面写的，换行符使用的是 windows 中的换行符，就是这个不同的换行符造成了问题。

## dos2unix 的替代方案
使用 dos2unix 能够将换行符转化为 unix 格式，可是我的系统中竟然没有装 dos2unix，就使用最近我颇为自豪的 sed 命令来完成吧！

我做了如下尝试：
```sh
    [longyu@debian:17:14:34] ui $ sed -i 's/^M//g' rename.sh 
    [longyu@debian:17:14:59] ui $ ./rename.sh 
    bash: ./rename.sh: /bin/bash^M: bad interpreter: No such file or directory
    [longyu@debian:17:15:01] ui $ sed -i 's/\^M//g' rename.sh 
    [longyu@debian:17:15:08] ui $ ./rename.sh 
    bash: ./rename.sh: /bin/bash^M: bad interpreter: No such file or directory
    [longyu@debian:17:15:10] ui $ sed -n '/\^M/p' rename.sh 
    [longyu@debian:17:15:29] ui $ sed -i 's/\r//g' rename.sh 
```
我以为 sed 能够识别 ^M 这个特殊字符，或者说转义 ^ 之后能够识别，但结果却出乎意料。最终我想到，应该使用 \r，果然完成了任务。

其实用 tr 命令更好点，执行 tr -d '\r' < rename.sh 就可以，只是这样不会直接修改原文件，还是 sed 大法好点。



