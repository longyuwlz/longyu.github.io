# gcc x64 环境中默认链接脚本分析之 preinit_array、constructor、destructor 相关分析
## preinit_array 段脚本
```link
  .preinit_array     :
  {
    PROVIDE_HIDDEN (__preinit_array_start = .);
    KEEP (*(.preinit_array))
    PROVIDE_HIDDEN (__preinit_array_end = .);
  }
```
preinit_array section 与 init_array section 功能类似，不过**此 section 中的函数地址对应的函数在 init_array section 中的函数执行前执行**，目前没有看到过相关的应用。

### gcc constructor 与 destructor 属性
c 代码中使用 gcc  **__attribute__((constructor))** 属性修饰的函数，其**函数地址**将会被放到 **init_array section** 中，这些函数在 **main 函数执行前**执行，进行一些必要的**初始化**工作。

与之类似的的还有 **destructor** 属性，这个 **destructor** 属性修饰的函数会将**函数地址**放到 **fini_array section** 中，在 main 函数执行完成后或在 exit 函数中被调用。

也可以向 constructor 与 destructor 属性修饰的函数指定一个可选的**整型优先级**。对于 constructor 函数来说**小数字对应高优先级**，相关的函数**优先执行**，destructor 正相反。

destructor 一般很少使用，我在 glibc 中找到了一个示例函数，其代码如下：

```c
209 static void
210 __attribute__ ((destructor))
211 fini (void)
212 {
213   check_free (&last_result);
214 }
```
map 文件中的相关信息如下：
```map
4727  .fini_array    0x00000000004a2118        0x8 /usr/lib/gcc/x86_64-linux-gnu/8/../../../x86_64-linux-gnu/libc.a(sdlerror.o)
```
根据 map 文件的信息确定此 fini 函数的地址被放到了 fini_array section 中。

需要额外说明，当 __attribute__((constructor)) 修饰的函数被编译到动态库中时，链接相应动态库时，处理方法与这里描述的内容有所区别。
## init_array 与 fini_array 段脚本
```link
  .init_array     :
  {
    PROVIDE_HIDDEN (__init_array_start = .);
    KEEP (*(SORT_BY_INIT_PRIORITY(.init_array.*) SORT_BY_INIT_PRIORITY(.ctors.*)))
    KEEP (*(.init_array EXCLUDE_FILE (*crtbegin.o *crtbegin?.o *crtend.o *crtend?.o ) .ctors))
    PROVIDE_HIDDEN (__init_array_end = .);
  }
  .fini_array     :
  {
    PROVIDE_HIDDEN (__fini_array_start = .);
    KEEP (*(SORT_BY_INIT_PRIORITY(.fini_array.*) SORT_BY_INIT_PRIORITY(.dtors.*)))
    KEEP (*(.fini_array EXCLUDE_FILE (*crtbegin.o *crtbegin?.o *crtend.o *crtend?.o ) .dtors))
    PROVIDE_HIDDEN (__fini_array_end = .);
  }
```
上面的脚本内容中，使用了 KEEP 命令，这是由于 **finit_array section** 并不会被程序直接使用，为了**避免被移除**需要添加 KEEP 命令。

同时 init_array 与 fini_array 都通过 PROVIDE_HIDDEN 在 section 内容前后设定了**开始与结束标号的地址**，这两个地址在 libc 的初始化函数中被使用，通过遍历这两个标号地址中的函数地址并执行就完成了任务。

相关代码如下：

```c
 86   const size_t size = __init_array_end - __init_array_start;
 87   for (size_t i = 0; i < size; i++)
 88       (*__init_array_start [i]) (argc, argv, envp);
```
这里使用 PROVIDE_HIDDEN 方式设定一个标号有两个意义：

1. 用户程序不能获取标号的地址（所谓的隐藏）
2. 用户程序可以重新定义这些标号

注意这里的第二点内容。由于用户程序能够重新定义这些标号，而这些标号又在 main 函数执行前被使用，那一旦用户程序重新定义，在 glibc 中引用的这些标号将**使用用户程序中定义**的值，这会带来**严重的问题**。

我用下面这个非常简单的 hello world 程序来说明这个问题，程序代码如下：

```c
#include <stdio.h>

void __init_array_start(void)
{
	return;
}

int main(void)
{
	printf("hello world\n");

	return 0;
}
```
可以看到程序中定义了 **__init_array_start** 函数，这个函数将会覆盖链接脚本中的定义。编译并使用 gdb 执行此程序会触发段错误，打出的堆栈信息如下：

```gdb
#0  0x00005555555551a1 in __libc_csu_init ()
#1  0x00007ffff7e0e02a in __libc_start_main (main=0x55555555513c <main>, argc=1, argv=0x7fffffffdab8, init=0x555555555160 <__libc_csu_init>, fini=<optimized out>, 
    rtld_fini=<optimized out>, stack_end=0x7fffffffdaa8) at ../csu/libc-start.c:264
#2  0x000055555555507a in _start ()
```
这里 __libc_csu_init 中就调用了上面遍历 __init_array_start 到 __init_array_end 之间的地址执行初始化函数的逻辑，这时它将 __init_array_start 函数中的指令作为函数来执行，一定会出问题欧。



