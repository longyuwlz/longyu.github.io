# 使用 atexit 函数来注册解初始化函数
## 问题描述
有一次，需要在业务程序使用的**底层组件**(c 语言编码)中添加某种统计功能。

这个统计功能有自己的内部数据结构与操作接口。具体的统计功能在底层组件的一些关键位置进行，统计数据的输出使用组件内部的定时器来周期性的打印到某个指定的文件中。

此项功能仅仅作用于底层组件，业务程序只需要用修改后的底层组件的库与头文件重新编译，不需要修改任何源代码。

实现过程中发现了一个难题：**统计功能初始化与解初始化的流程要放到哪里来调用呢？**
## 问题分析
由于我不能修改业务程序的源码，因此此功能的初始化与解初始化的流程都应当放到底层组件中来调用执行。

经过研究代码，我发现初始化流程可以加在底层组件初始化的代码中，而解初始化的函数却没有确定应该放在哪里。

## 进一步的方法
进一步的研究，我觉得可以尝试在调用底层组件初始化的代码中，使用 atexit 函数来将解初始化的函数注册到 exit 函数中，程序正常退出时就会调用到注册的解初始化函数。

**可是 atexit 函数注册的函数能否保证在异常情况下被调用呢？**

## man atexit 函数
```
DESCRIPTION
       The atexit() function registers the given function to be called at normal process termination, either via exit(3) or via return from the program's main().  Func‐
       tions so registered are called in the reverse order of their registration; no arguments are passed.
```
从上面的描述中可以看出，atexit 函数注册的函数只在程序正常退出的情况会被调用。

这里所谓程序正常退出的情况有如下两种：

1. 调用 exit 函数退出
2. 程序调用 return 语句从 main 函数中返回

manual 中还提及在程序收到信号异常终止的情况下，atexit 注册的函数不会被调用到。下面是我做的一些测试。

## atexit 函数注册的函数是否被调用
首先将下面的源码保存为 test.c，编译并执行。

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static void my_exit1(void);

int main(void)
{
	if (atexit(my_exit1) != 0) {
		fprintf(stderr, "can’t register my_exit1");
		exit(-1);
	}
	
	printf("main is done\n");
	while (1) {
		sleep(1);
	}	
	exit(0);
}

static void my_exit1(void)
{
	printf("in exit handler\n");
}
```
进行了如下测试，测试过程与输出信息如下：

```bash
[longyu@debian-10:13:48:43] source_code $ gcc test.c -o test
[longyu@debian-10:13:48:50] source_code $ ./test 
main is done
^C
[longyu@debian-10:13:48:56] source_code $ ./test &
[3] 8613
[longyu@debian-10:13:49:03] source_code $ main is done

[longyu@debian-10:13:49:04] source_code $ ps aux | grep 'test'
longyu    8613  0.0  0.0   2280   748 pts/0    S    13:49   0:00 ./test
longyu    8615  0.0  0.0  18980   884 pts/0    S+   13:49   0:00 grep --color=auto test
[longyu@debian-10:13:49:08] source_code $ kill -9 8613
[longyu@debian-10:13:49:33] source_code $ 
[3]+  已杀死               ./test
[longyu@debian-10:13:49:34] source_code $ 
```

首先我按下 Ctrl + C 命令向程序发送 SIGINT 信号，注册的 exit handler 函数没有被调用。这之后我重新运行程序，向程序发送 SIGKILL 信号，注册的 exit handler 函数仍然没有被调用。

上面的测试程序中没有注册信号处理函数，默认行为将终止进程。通过测试可以看出收到信号异常终止的情况 atexit 函数注册的 exit handler 函数不会被调用。

## 注册信号处理函数
根据过去的知识，SIGKILL 与 SIGSTOP 信号不能被捕获，这也就意味着我们对这两个信号注册的信号处理函数不会被调用。

SIGKILL 信号比较暴力，它会直接杀死进程。SIGSTOP 信号用在任务控制中来停止进程的执行，一般的用户程序中比较少使用。

**在一些用户程序中会看到对一些可以捕获的信号注册信号处理函数的操作。当程序接收到这些信号后，信号处理函数可以改变某个变量的值。程序的 main_loop 循环中检测到变量值的变化后就执行一些退出的流程然后正常退出。这样就避免了异常退出带来的问题。**

不过对于不能捕获的信号，这个方法是不管用的，而收到不能捕获的信号常常也意味着程序执行出现了异常，在这样的条件下 atexit 函数注册的 exit handler 能否得到执行变得无关紧要。

使用下面的程序进行测试。

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>

static void sig_exit(int);
static void my_exit1(void);
static int running = 1;

int main(void)
{
	signal(SIGTERM, sig_exit);
	
 	if (atexit(my_exit1) != 0) {
		fprintf(stderr, "can’t register my_exit1");
		exit(-1);
	}
	
 	while (running) {
		sleep(1);
	}	

	exit(0);
}

static void my_exit1(void)
{
	printf("in exit handler\n");
}

static void sig_exit(int signo)
{
	(void)signo;

	running = 0;
	return;
}
```
将上述程序保存为 test-signal.c 并编译执行。测试的过程与输出信息如下：
```bash
[longyu@debian-10:14:29:34] source_code $ gcc test-signal.c -o test-signal
[longyu@debian-10:14:30:39] source_code $ ./test-signal &
[1] 15178
[longyu@debian-10:14:30:46] source_code $ kill -SIGTERM 15178
in exit handler
[longyu@debian-10:14:30:51] source_code $ 
[1]+  已完成               ./test-signal
```
从上面测试的输出结果中可以看出，当我们向程序中发送 SIGTERM 信号后，程序捕获到此信号后，预先注册的 sig_exit 信号处理函数被执行，running 变量的值被修改。

main 函数的主循环检测到这一变化后，正常退出， atexit 函数注册的 exit handler 函数得到调用。

写到这里我想到了另一个问题，c++ 中的析构函数在收到信号异常终止时能否被调用呢？

## c++ 析构函数在程序收到信号后异常终止时是否被调用？
我使用如下简单的 c++ 代码进行测试。

```c++
#include <iostream>
#include <unistd.h>

using namespace std;

class test {
	public:	             
		test(){ cout << "constructor\n"; }
	   	~test(){ cout << "destructor\n"; }
};     
 
int main(void)
{

	test a;
	cout <<"in main function\n";
    
	while (1) {
		sleep(1);		
    }      
    return 0;
}  
```
测试输出如下：

```bash
[longyu@debian-10:14:43:18] source_code $ g++ test.cpp -o test
[longyu@debian-10:14:43:25] source_code $ ./test &
[1] 17371
[longyu@debian-10:14:43:29] source_code $ constructor
in main function

[longyu@debian-10:14:43:30] source_code $ kill -SIGTERM 17371
[longyu@debian-10:14:43:42] source_code $ 
[1]+  已终止               ./test
```
从上面的输出中可以发现，程序收到 SIGTERM 后异常终止，析构函数并没有得到调用。

## 总结
程序的执行过程中，有初始化操作就有相应的解初始化操作。初始化操作与解初始化操作放在哪里执行是一个问题。

对于解初始化函数，在程序异常退出时它是否得到执行又是一个问题。在某些情况下，解初始化函数可能得不到运行，这可能意味着一些资源得不到释放，存在一定的资源泄露的风险。

不过现在内核代码中会回收很多资源，基本囊括了常见的资源类别，不过对一些特殊的场景，资源的释放仍旧要依赖解初始化函数来完成，这时候异常情况下的处理就要耗费更多的思考了。

