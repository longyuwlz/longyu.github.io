编译 dpdk-20.02 时，有如下报错信息：
```
error: ‘__ATOMIC_RELAXED’ undeclared (first use in this function)
error: ‘__ATOMIC_ACQUIRE’ undeclared (first use in this function)
error: ‘__ATOMIC_RELAXED’ undeclared (first use in this function)
error: ‘__ATOMIC_ACQUIRE’ undeclared (first use in this function)
```
## 分析解决
### 头文件的问题
根据过去的经验，未声明的符号这个错误很大概率是头文件的问题。首先需要确定的是编译的源码中是否有相关的符号声明。

使用上述符号在 dpdk-20.02 的源码里面搜索，只发现很多使用的地方，没有发现声明。

这意味着上面找不到的符号不是 dpdk 内部定义的符号，那么这些符号可能是 dpdk 依赖的外部头文件中声明的。

### 内核头文件是否声明这些符号 
考虑到 dpdk 编译的时候需要指定内核源码路径，这些符号可能在内核头文件中声明。

使用上述符号在内核源码中全局搜索，没有找到。

### 在网上搜索
搜索了下，发现如下链接中有相同的问题案例：

[__ATOMIC_RELAXED undeclared](https://github.com/nim-lang/Nim/issues/2620)

浏览上述链接网页，发现这个问题可能是 gcc 版本过低导致的。网页中的讨论中有下面这一句：

>The atomic builtins referenced in atomic.nim are only available with GCC 4.7+

我检查自己编译环境下的 gcc 版本，发现使用的 gcc 为 4.5.3 版本。

这之后我在另外一个编译环境上重新编译，编译前确认 gcc 的版本高于 4.7，编译成功。


