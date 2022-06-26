# 借通配符展开问题描述 shell 的整个执行流程
# 问题描述
shell 文件名通配符展开是一个非常方便的功能，虽然它的描述能力没有正则表达式那样强大，但是在常规的使用中仍旧给我们带来了很大的便利。

基于这样的情况，在很多 shell script 脚本中也能够看到对文件名通配符展开的应用，不过这里也存在着一些隐含的问题。

**这些问题并不是文件名通配符的问题，而是我们对 shell 的运行流程不清楚造成的使用问题。** 这就是我们欠下的技术债催债来了。

## shell 执行流程的一手资料
现在用的最多的 shell 要属 bash 了，man bash 可以看到有一个 EXPANSION 的 section，这个 section 里面讲到了 bash 中不同的 EXPANSION 功能，这个是一手的资料。

一手资料中 Expansion 流程的概要内容如下：

```
  Expansion is performed on the command line after it has been split into words.  There are seven kinds of expansion performed: brace expansion,  tilde  expansion,
       parameter and variable expansion, command substitution, arithmetic expansion, word splitting, and pathname expansion.

       The  order  of expansions is: brace expansion; tilde expansion, parameter and variable expansion, arithmetic expansion, and command substitution (done in a left-
       to-right fashion); word splitting; and pathname expansion.
```
首先 Expansion 是在命令行被切割为不同的 words 之后执行的。在 bash 中一共有 7 中不同类型的 expansion 步骤，按照执行顺序排列如下：

1. brace expansion 花括号展开
2. tilde expansion 波浪号展开
3. parameter and variable expansion 参数和变量展开
4. arithmetic expansion 算术表达式展开
5.  command substitution 命令替换
6. word splitting 字段切割
7. pathname expansion 路径名展开

那么通配符展开是在哪一个阶段完成的呢？

实际上它是在**第 7 个阶段即路径名展开**中完成的，这也表明它的作用对象是**路径名**。这个认识是非常重要的！
## shell 执行流程的二手资料
讲解 shell script 的书很多，这些书可以算作是 shell 执行流程的二手资料。尽管数目很多，但是真正完整描述 shell 执行流程的书少的可怜。不过幸运的是我恰好读过这些少的可怜的书，下图就是从这些书中拷贝的，书的名字叫做《shell script 脚本学习指南》。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829122846107.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70#pic_center)
上图与我之前描述的 bash 的 Expansion 大致流程一致，不过它更加完整。正常的流程从上面的流程图中已经可以看的很清楚了，不需要再进行描述。

需要注意的是**不连续的处理过**程，例如**双引号与单引号** token 的处理过程。这些过程不同于正常的处理过程，其间**直接跳过**了一些流程。

第一步 shell 将用户输入的命令切割为不同的 tokens，对于由单引号括起来的 token，中间的变量展开直接跳过，对于由双引号括起来的 token，直接跳到变量替换来处理 token。

我通过执行如下命令来研究其中的过程：

```bash
[longyu@debian-10:13:09:34] tmp $ 'ls ~'
bash: ls ~：未找到命令
[longyu@debian-10:13:09:43] tmp $ "ls ~"
bash: ls ~：未找到命令
```
上面这两个命令中都由一个 token 组成，且这个 token 由单引号与双引号括起来，shell 不执行波浪号展开，直接将其中的内容 'ls ~' 作为命令执行，而这个命令并不存在就报了找不到命令的错误。

下面是双引号括起来的 token 中可以执行变量替换的测试：

```bash
[longyu@debian-10:13:10:55] tmp $ config=config
[longyu@debian-10:13:10:55] tmp $ "/sbin/if$config"
enp2s0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether 80:e8:2c:17:f0:77  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
我首先将 config 变量的内容设置为 config，然后执行 "/sbin/if$config" 命令，在这里双引号中变量替换的步骤正常执行，最终执行的命令是 /sbin/ifconfig，命令成功执行。

## 单双引号导致通配符展开跳过的问题
当一个 token 用单引号与双引号括起来后，其中如果使用了通配符，则不会执行通配符展开。对于一个单引号括起来的 token，所有的 expansion 都不会执行，对于一个双引号括起来的 token，只执行到算术表达式替换这里。

下面的示例描述了带有双引号的 token 会导致通配符展开被跳过的过程。

```bash
[longyu@debian-10:13:11:26] tmp $ ls "*"
ls: 无法访问'*': 没有那个文件或目录
```
**可以看到在双引号中包含的通配符元字符 * 并没有被展开，直接作为参数传给了程序**，最终报了 no such file or diretory 的错误。

## 一个具体问题的分析
在工作中，遇到了一个通配符未被展开导致拷贝库文件失败的问题，核心命令如下：

```bash
cp -rf "${NEW_DIR}/lib/*" lib64/dpdk_lib/
```
这个命令预期功能是将新目录中 lib 目录下的所有静态库拷贝到 lib64/dpdk_lib/ 中，结果却因为将通配符的元字符写入到了双引号中，导致 shell 不执行通配符展开，拷贝静态库失败。

正确的命令行：

```bash
cp -rf ${NEW_DIR}/lib/* lib64/dpdk_lib/
```
## 总结
工作时我们很多时候对一些技术没有深入的学习就直接使用了，后期出了问题的时候才可能会进一步的去研究下技术的细枝末节。

单靠工作来提升自己的技术能力是有很大局限的，也很难构建出一个系统的知识架构。无论如何，我们还是需要扎扎实实深入的研究一些技术的具体实现，对工作场景来说短时间内可能看不到太显著的效果，但是将时间拉长，这一定会给我们带来很大的收益！

