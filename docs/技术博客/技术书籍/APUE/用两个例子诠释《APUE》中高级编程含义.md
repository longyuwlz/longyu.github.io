# 用两个例子诠释《APUE》中高级编程含义
## 字符串拷贝问题
上一周，我无意中发现一本书—— **《Writing Bug-Free C Code》**。在这本书的某一章中提到了 **strncpy** 函数存在的两个问题 ，看到这里的时候我比较惊讶。在很多书中都一直在强调 **strcpy** 中存在的问题，鼓励 **c** 语言开发者使用更安全的 **strncpy** 来代替 **strcpy**，确实没看到哪本书说 **strncpy** 函数存在的问题。

心里面有点不以为然，就自己写代码去验证该书中提及的第一个问题——目标字符串没有足够空间时字符串的结尾 '\0' 缺失的问题，结果发现确实如此，颇有点世界观崩塌的意味。在此之后，我检查系统中的帮助文档，发现有如下描述:

>  The strncpy() function is similar, except that at most n bytes of src are  copied.   Warning:
>    If  there  is no null byte among the first n bytes of src, the string placed in dest will not  be null-terminated.
>
>   If the length of src is less than n, strncpy() writes additional null bytes to dest to ensure that a total of n bytes are written.
>

上面的说明已经清楚的说明了 strncpy 存在的问题，我就不进一步解释了。

如果说使用 **strcpy** 可以看做普通编程，以更安全的 **strncpy** 替代 **strcpy** 看做较高级编程，那么避免了 **strncpy** 潜在问题的编程应该可以称为相对高级的编程了吧！

## 非局部跳转问题
另外一个具体的例子与 **setjmp、longjmp** 函数(宏)相关。**setjmp** 与 **longjmp** 是 **C** 语言中用来实现非局部跳转的手段。**setjmp** 通过保存必要的栈信息来设置跳转点，在嵌套程序处理中发生错误时则调用 **longjmp** 以设定的返回值跳转到 **setjmp** 设置的跳转点处继续执行。

这里存在的问题在于 **POSIX** 标准并没有指定 **setjmp** 保存 **signal mask** 信息，这在 **UNIX** 系统编程中常常会造成问题。为了避免该问题，引入了新的函数—— **sigsetjmp** 与 **siglongjmp**。使用新的函数就能避免 **signal mask** 不能得到保存的问题。

## 进一步探讨高级编程中高级的含义
上面两个例子旨在说明**高级编程**的概念，其本身并不足以展现高级编程的全貌，但却能够给我们一个好的视角去深入的理解高级编程所要达到的**目标**。

事实上我们所要掌握的**远不止如何使用**，更要明白**种种限制**与**种种风险的避免措施**，理解**具体的过程**以及**该过程对整个系统的影响**，这一点至关重要！

这也体现了学习过程的一般方法——我们不断的对系统进行**改变**，然后**观察并思考**改变对**整个系统**造成了什么样的**影响**。当我们能够看清楚改变这一动作在系统中造成的影响，并能够进行**反向推理**，我们就达到了**专家**的级别。（摘自《计算机程序的构造与解释》）


