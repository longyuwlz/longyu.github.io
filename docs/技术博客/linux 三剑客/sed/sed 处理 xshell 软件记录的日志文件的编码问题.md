# sed 处理 xshell 软件记录的日志文件的编码问题
## UTF-16 编码造成 sed 无法正常工作
昨天在使用 sed 替换一个文件中的内容时，发现 sed 无法正常工作。将文件上传到虚拟机中，执行同样的命令仍旧不能正常工作，一度让我怀疑自己是不是把命令记错了。

使用了非常简单的删除命令发现也不能正常工作，让人有点无语。

这之后又用一个系统中的正常文件进行测试，发现 sed 可以正常工作，我感到非常的不解。

## 文件编码的问题
搞了一会，使用 cat -A 查看了下文件的内容时，发现竟让输出了一堆乱码，如下所示：

```
^@o^@l^@d^@_^@r^@e^@g^@ ^@i^@s^@2^@d^@4^@0^@c^@0^@0^@^M^@$
```
看到了这个输出，我才反应过来应该是编码的问题。执行 file 命令查看文件的编码，发现竟然是 UTF-16。

相关的信息如下：

```bash
longyu@longyu-pc:/tmp$ file test.log 
test.log: Little-endian UTF-16 Unicode text, with CRLF line terminators
```
## iconv 编码转换
我使用 sed 替换的 test.log 文件的部分内容如下：
```
old_reg is 12940c00, ret is 12940c00
old_reg is 12d40c00, ret is 12d40c00
```
执行如下 ```iconv```命令转换编码为 UTF-8。

```
longyu@longyu-pc:/tmp$ iconv -f UTF-16 -t UTF-8 ./test.log  | file -
/dev/stdin: ASCII text, with CRLF line terminators
```
再次使用 sed 处理转化过的文件，能够正常工作。

## UTF-16 的编码文件怎么来的
sed 不能处理 Unicode 的问题我是有所了解的，但是我却忽略了文件的格式为 UTF-16 的问题。

这个 test.log 是 xshell 中记录的日志文件，有必要记录一下，免得以后踩相同的坑。



