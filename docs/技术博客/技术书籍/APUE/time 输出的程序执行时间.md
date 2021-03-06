# time 输出的程序执行时间

* real

	real 时间指的是从进程开始创建运行到运行完成整个的系统时间。这个时间可能包括其它进程执行的时间，以及进程挂起的时间。

* user

	在用户态中执行代码花费的 cpu 时间。

* sys

	在内核态中执行的代码花费的 cpu 时间。
	
	
user + sys 就是你的进程使用的 cpu 总时间，这个时间是在所有的 cpu 上的执行时间的总和。当一个进程有多个线程时且存在多个 cpu 核心时，user 与 sys 时间的和可能会超过 real。

注意这里统计的时间是在所有 cpu 上的执行时间，并行执行时不是只计算单次，而是全部都要计算，因此就可能会有上述情况的存在。

当你在优化程序时，在执行多次系统调用时将会带来额外的开销。拿 write 系统调用来讲，当你每次 write 所使用的缓冲区很小时，写相同字节长度，那么从用户空间复制参数到内核空间会频繁进行，切换 cpu 模式也会相当频繁。当你每次 write 使用的缓冲区较大时，一次可以写更多的字节，切换频率就会降低，参数复制频率也会降低，就能够提高性能，但并不是越多越好！

下面这张图选自 《APUE》，能够很好的说明问题！可以看出，当缓冲区长度大于 4096 时就没有可观的性能提升了。更详细的内容详见 《APUE》section 3.8！
![在这里插入图片描述](https://img-blog.csdn.net/20181021225648857?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


