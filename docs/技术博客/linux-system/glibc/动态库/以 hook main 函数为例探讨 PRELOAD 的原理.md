## 前言
在支持某个项目的时候，需要打包图形化程序运行依赖的文件，然后在非常老的 linux 版本上运行，直接使用 chroot 命令可以达成目标，但是我觉得也许可以通过 preload 的方式来隐藏 chroot 的行为。

由于 chroot 的影响是系统级的，我只要在 main 函数之前执行 chroot 就能够达成目标。

## 如何实现在 main 函数之前执行某些逻辑
既然已经确定了目标，那么我需要找到一种机制，允许我在 main 函数之前执行 chroot 系统调用，按照我掌握的知识有如下两种方式来实现这个目标：

1. 使用 gcc 的 constructor 属性
2. hook main 函数，先执行 chroot 相关逻辑，然后执行程序中的 main 函数

由于我不能重新编译目标图形化程序，第一种方式不可用，第二种方式倒是可以尝试一下。

## hook main 函数的代码
如下代码从 [Hook main() using LD_PRELOAD ](https://gist.github.com/apsun/1e144bf7639b22ff0097171fa0f8c6b1) 这个 github 项目中拷贝并针对我的需求进行了修改。

修改后的代码贴到下面：

```c
/*
 ** Hook main() using LD_PRELOAD, because why not?
 ** Obviously, this code is not portable. Use at your own risk.
 **
 ** Compile using 'gcc hax.c -o hax.so -fPIC -shared -ldl'
 ** Then run your program as 'LD_PRELOAD=$PWD/hax.so ./a.out'
 **/

#define _GNU_SOURCE
#include <stdio.h>
#include <dlfcn.h>
#include <unistd.h>

/* Trampoline for the real main() */
static int (*main_orig)(int, char **, char **);

/* Our fake main() that gets called by __libc_start_main() */
int main_hook(int argc, char **argv, char **envp)
{
    int i;
    for (i = 0; i < argc; ++i) {
        printf("argv[%d] = %s\n", i, argv[i]);
    }
    printf("--- Before main ---\n");
    chroot("./");
    chdir("/");
    int ret = main_orig(argc, argv, envp);
    printf("--- After main ----\n");
    printf("main() returned %d\n", ret);
    return ret;
}

/*
 *  * Wrapper for __libc_start_main() that replaces the real main
 *   * function with our hooked version.
 *    */
int __libc_start_main(
    int (*main)(int, char **, char **),
    int argc,
    char **argv,
    int (*init)(int, char **, char **),
    void (*fini)(void),
    void (*rtld_fini)(void),
    void *stack_end)
{
    /* Save the real main function address */
    main_orig = main;

    /* Find the real __libc_start_main()... */
    typeof(&__libc_start_main) orig = dlsym(RTLD_NEXT, "__libc_start_main");

    /* ... and call it with our custom main function */
    return orig(main_hook, argc, argv, init, fini, rtld_fini, stack_end);
}
```
在 main_hook 中我添加了下面两行与 chroot 相关的代码：

```c
    chroot("./");
    chdir("/");
```
这里使用的是当前目录，也可以改为绝对路径，这**两行代码其实就是 chroot 命令的核心。**

## 上述代码有怎样的逻辑？
实际上上述代码 hook 的是  __libc_start_main 这个函数！

动态链接的程序，其 **main 函数是 __libc_start_main 函数的一个参数**，上面的代码先 **hook __libc_start_main** 得到需要调用的 main 函数，以其值设定**静态变量  main_orig**，然后使用 **dlsym** 函数找到程序中**真实的 __libc_start_main 函数的位置**，使用 main_hook 替换参数 main 调用真实的 __libc_start_main。

当真正的 __libc_start_main 执行的时候，其第一个参数已经被替换为了 hook 库中的 main_hook 函数，同时原来的 main 函数地址也已经保存到了 main_orig 中。

main_hook 函数首先执行需要在 main 函数之前执行的逻辑，然后调用 main_orig 就串起了整个过程。

## 编译参数与执行参数
将上面的源码保存为 hook_main.c，然后使用如下命令编译：

```c
gcc -fPIC -shared hook_main.c -o libhooker.so -ldl
```
执行示例如下：

```bash
LD_PRELOAD=/tmp/libhooker.so ./a.out
```

## 动态库相关函数调用
上面的代码寻找真实的 __libc_start_main 函数是通过调用 dlsym 函数完成的。

man dlsym 找到了如下关联信息：

```manual
       RTLD_NEXT
              Find  the  next  occurrence of the desired symbol in the search order after the current object.  This allows one to provide a wrapper around a function in
              another shared object, so that, for example, the definition of a function in a preloaded shared object (see LD_PRELOAD in ld.so(8)) can  find  and  invoke
              the  "real" function provided in another shared object (or for that matter, the "next" definition of the function in cases where there are multiple layers
              of preloading).
       The _GNU_SOURCE feature test macro must be defined in order to obtain the definitions of RTLD_DEFAULT and RTLD_NEXT from <dlfcn.h>.
```
RTLD_NEXT 将会跳过当前的对象，在其后的对象中搜索符号的位置。这种行为让用户能够在 preload 的共享库中找到在其它共享库中提供的符号的真实定义位置。

最下面的一行说明了要使用 RTLD_DEFAULT 和 RTLD_NEXT 这两个宏需要在包含 dlfcn.h 之前定义 _GNU_SOURCE 宏。

## preload 到底是怎样工作的？
为了确定 preload 的工作原理，我执行如下命令进行测试：

```c
export LD_DEBUG="symbols";   LD_PRELOAD=/home/longyu/chroot_test/libhooker.so ls  > output 2>&1
```
上面两个环境变量的含义可以参考 [man ld.so 的翻译](https://blog.csdn.net/Longyu_wlz/article/details/108511931) 这篇文章。

在输出的 output 文件中查找 __libc_start_main 符号的解析过程，获取到了如下信息：

```bash
     symbol=__libc_start_main;  lookup in file=ls [0]
     symbol=__libc_start_main;  lookup in file=/home/longyu/chroot_test/libhooker.so [0]
     
     symbol=__libc_start_main;  lookup in file=/lib/x86_64-linux-gnu/libselinux.so.1 [0]
     symbol=__libc_start_main;  lookup in file=/lib/x86_64-linux-gnu/libc.so.6 [0]
```
上面的信息对 __libc_start_main 符号解析了两次，第一次在 libhooker.so 中找到了函数定义，第二次在 libc 库中找到了定义。

查看其它的符号解析过程，我发现当设定了 PRELOAD 后，PRELOAD 设定的动态库将会在可执行程序对象之后，其它动态库之前被搜索，这就确保了能够先在 PRELOAD 指定的动态库中找到 hook 的符号，从而达成 hook 的目的，其实只需要通过调整动态库搜索顺序就能够实现这个功能。

同时在 libhooker.so 中调用 dlsym 查找 __libc_start_main 函数的真实位置时，动态库搜索路径跳过了当前对象（libhooker.so），在 libc 库中找到了真实的位置，这与上文从 man dlsym 中摘录的信息的描述一致。

## 总结
我最近在写博客的时候发现，对于之前已经搞过的问题，当我将它记录下来时，常常能够发现新的问题点，这些新的问题点又引发了我的好奇心，最终文章的内容会超出我的预期。

有些问题我以前也搞过，但是并不能发现太多的问题，很多知识我之前也学习过，但是也没有提出什么问题，其实从某种程度上说明我还没有完全掌握。

问题就在那里，一直都在那里，但是你能不能发现却很不一定。现在搞得东西也不算是新的东西，能够发现新的问题并加以研究最终找到答案，算是有所成长吧！



