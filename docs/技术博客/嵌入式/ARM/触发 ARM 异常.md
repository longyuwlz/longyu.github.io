# 触发 ARM 异常

ARM 处理器有多种类型的异常，如 data abort、prefetch abort、undefine instruction
等等。下面是具体的触发方式。

1.触发 data abort
    
	通过访问地址为空的内存完成

2.触发 prefetch abort

	a. 通过执行一个为空的函数指针来完成
	b. 通过内联汇编给 pc 赋非指令地址完成

3.触发 undefine instruction 

	对于支持捕获除零异常的 ARM 架构，可以通过除零来完成。
	对于不支持捕获除零异常的架构，可以通过给 pc 赋未定义指令来完成。

详情请访问 [stackoverflow - 触发未定义指令异常](https://stackoverflow.com/questions/16081618/programmatically-cause-undefined-instruction-exception)


