# rt-thread 与 ucos 中任务退出时如何调用退出函数

rt-thread 与 ucos 中都提供了删除任务的函数，同时系统也支持任务正常终止。相较于死循环的任务执行函数，这是一大改进。

 任务的创建很容易，也不易产生问题。任务的销毁却十分不易，任务占有资源的释放更是令人头疼。以前我一直调用系统提供的删除任务的函数强制删除任务，这在大多数时间并没有造成太大的问题，但这样的方式其实不太合理。

**任务删除时必须考虑当前任务的状态，当前任务占有的 ipc 资源，以及当前任务在系统的哪个表，这都是删除一个任务必须考虑的情况。如果待删除任务在等待链表中，那么删除该任务意味着从等待表中移除该任务节点。如果待删除任务在就绪表中，那么删除该任务需要从就绪表中移除，这样此任务就不再会被系统调度运行。**

 删除一个占用 ipc 资源的任务需要特别小心。例如当任务未释放占有的 mutex 时，强制删除任务将造成其它在就绪表中永久等待 mutex 的任务永久阻塞，这常常是我们不想看到的，这也是一个常见的问题。

 在 rt-thread 的内核源码 thread.c 中有 rt_thread_exit 函数，此函数在任务正常终止后被调用，这是我最初在调试时发现的。但我一直不明白为什么在任务正常终止后系统就能调用这个函数，有一天突然发现这与任务栈中预存的数据有关。

rt-thread 的任务初始化函数中调用了 rt_hw_stack_init 子函数，调用的具体语句如下：
```c
	  thread->sp = (void *)rt_hw_stack_init(thread->entry, thread->parameter,
	                                          (void *)((char *)thread->stack_addr + thread->stack_size - 4),
	                                          (void *)rt_thread_exit);
```	                                    
 在上面的函数调用中，将 rt_thread_exit 函数地址作为参数传入到 rt_hw_stack_init 函数中，rt_hw_stack_init 函数的部分源码如下：	                                    
		                                    
```c	                                    
		                                   
	 rt_uint8_t *rt_hw_stack_init(void *tentry, void *parameter,
		rt_uint8_t *stack_addr, void *texit)
	{
		rt_uint32_t *stk;
	
	    stack_addr += sizeof(rt_uint32_t);
	    stack_addr  = (rt_uint8_t *)RT_ALIGN_DOWN((rt_uint32_t)stack_addr, 8);
	    stk      = (rt_uint32_t *)stack_addr;
	
	    *(--stk) = (rt_uint32_t)tentry;         /* entry point */
	    *(--stk) = (rt_uint32_t)texit;          /* lr */
	    ...................................................................
```
	    
上面的最后一行代码将传入的 rt_thread_exit 函数地址压入到任务栈中，旁边的注释写着 **lr**？**lr** 是链接寄存器，在任务栈初始化时就保存了 rt_thread_exit 函数的地址，这就是谜底。

**任务的执行函数使用任务栈，任务栈动态增减。当执行函数返回，任务栈弹栈，作为 **lr** 的 rt_thread_exit 的地址恢复到 PC 中，程序继续执行此函数，完成任务的正常退出。神奇吗？这就是任务退出的魔法。**

ucos-III 中也能够找到类似的实现，不再赘述。



