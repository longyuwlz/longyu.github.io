## dpdk pmd 驱动的初始化过程

dpdk 支持多个 pmd 驱动，pmd 驱动的种类随着时间的推移还在不断的扩展。为了避免添加新驱动对现有框架代码的修改，dpdk 对不同驱动的初始化过程进行了抽象，添加一个新的驱动只需要添加一个驱动注册的构造函数即可。

dpdk-16.04 中通过 PMD_REGISTER_DRIVER 宏来注册驱动，这个宏的实现如下：

```c
#define PMD_REGISTER_DRIVER(d)\
void devinitfn_ ##d(void);\
void __attribute__((constructor, used)) devinitfn_ ##d(void)\
{\
	rte_eal_driver_register(&d);\
}
```

每一种网卡驱动实现一个 rte_driver 结构体，通过 PMD_REGISTER_DRIVER 来将这些结构体地址添加到 dev_driver_list 链表中就完成了驱动注册的过程。

一个具体的使用示例如下：

```c
PMD_REGISTER_DRIVER(pmd_igb_drv);
```

使用上面这行代码就完成了 igb 驱动的初始化函数注册过程。

PMD_REGISTER_DRIVER 中使用 gcc constructor 属性来修饰驱动的初始化函数，其语义保证初始化函数在 main 函数之前执行。其功能简单来说就是将驱动的初始化函数从 main 函数、main 函数调用的子函数中移动到 main 函数前隐式调用，这样就避免了每添加一种新驱动就得修改 main 函数、main 函数调用的子函数的行为。

## 复用 dpdk 驱动注册方法

当我在扩展 dpdk 的 proc_info 示例程序代码来 dump 一些关键的数据结构，如网卡收发队列、描述符信息、寄存器信息等内容时，由于每一种网卡的区别，我也需要对 dump 过程进行抽象，用一个结构体描述每一种网卡的 dump 过程，同时复用 dpdk 驱动注册方法，使用 constructor 属性来实现每一种网卡 dump 结构体的注册过程。

我使用如下代码来模拟这一功能的实现过程：

驱动初始化模拟代码 test.c ：

```c
#include <stdio.h>

#define REGISTER_DUMPOPS_DRIVER(d)\
void devinitfn_ ##d(void);\
void __attribute__((constructor, used)) devinitfn_ ##d(void)\
{\
        printf("register dumpops\n");\
}

REGISTER_DUMPOPS_DRIVER(igb);
REGISTER_DUMPOPS_DRIVER(i40e);
```

测试代码 hello.c：

```c
#include <stdio.h>

int main(void)
{
        return 0;
}
```

编译过程：

```bash
$ gcc -c test.c
$ ar -rc libtest.a test.o
$ gcc -L . -ltest hello.c
```

测试过程：

```bash
$ ./hello
$ nm ./hello | grep initfn
$
```

测试发现构造函数未执行，nm 查看 hello 可执行文件没有链接初始化函数。

## constructor 属性修饰的构造函数的特点

在 [gcc x64 环境中默认链接脚本分析之 preinit_array、constructor、destructor 相关分析](https://blog.csdn.net/Longyu_wlz/article/details/109128395?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161259049716780255247950%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fblog.%252522%25257D&request_id=161259049716780255247950&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-2-109128395.pc_v1_rank_blog_v1&utm_term=constructor) 这篇文章中我对 constructor 属性修饰函数背后的一些原理进行了描述，这些构造函数与普通函数的区别在于它不被直接引用，如果这些构造函数被编译到静态库中，就不会被链接到最终的可执行文件中。

按照上面的说法，dpdk 的示例程序应该也不会链接驱动初始化构造函数，但事实是 dpdk 能够成功链接，我怀疑可能与某些编译参数有关。

## dpdk 示例程序能够成功链接 .a 中驱动初始化函数的原因？

编译 l2fwd，观察编译参数得到如下信息：

```bash
gcc -m64 -pthread -fPIC  -march=core2 -DRTE_MACHINE_CPUFLAG_SSE -DRTE_MACHINE_CPUFLAG_SSE2 -DRTE_MACHINE_CPUFLAG_SSE3 -DRTE_MACHINE_CPUFLAG_SSSE3  -I/tmp/dpdk-16.04/examples/l2fwd/build/include -I/tmp/dpdk-16.04/x86_64-native-linuxapp-gcc/include -include /tmp/dpdk-16.04/x86_64-native-linuxapp-gcc/include/rte_config.h -O3 -W -Wall -Wstrict-prototypes -Wmissing-prototypes -Wmissing-declarations -Wold-style-definition -Wpointer-arith -Wcast-align -Wnested-externs -Wcast-qual -Wformat-nonliteral -Wformat-security -Wundef -Wwrite-strings  -Wl,-Map=l2fwd.map,--cref -o l2fwd main.o -Wl,--no-as-needed -Wl,-export-dynamic -L/tmp/dpdk-16.04/examples/l2fwd/build/lib -L/tmp/dpdk-16.04/x86_64-native-linuxapp-gcc/lib  -L/tmp/dpdk-16.04/x86_64-native-linuxapp-gcc/lib -Wl,--whole-archive -Wl,-lrte_distributor -Wl,-lrte_reorder -Wl,-lrte_kni -Wl,-lrte_pipeline -Wl,-lrte_table -Wl,-lrte_port -Wl,-lrte_timer -Wl,-lrte_hash -Wl,-lrte_jobstats -Wl,-lrte_lpm -Wl,-lrte_power -Wl,-lrte_acl -Wl,-lrte_meter -Wl,-lrte_sched -Wl,-lrte_vhost -Wl,-lm -Wl,-lrt -Wl,--start-group -Wl,-lrte_kvargs -Wl,-lrte_mbuf -Wl,-lrte_ip_frag -Wl,-lethdev -Wl,-lrte_cryptodev -Wl,-lrte_mempool -Wl,-lrte_ring -Wl,-lrte_eal -Wl,-lrte_cmdline -Wl,-lrte_cfgfile -Wl,-lrte_pmd_bond -Wl,-lrte_pmd_vmxnet3_uio -Wl,-lrte_pmd_virtio -Wl,-lrte_pmd_cxgbe -Wl,-lrte_pmd_enic -Wl,-lrte_pmd_i40e -Wl,-lrte_pmd_ice -Wl,-lrte_pmd_fm10k -Wl,-lrte_pmd_ixgbe -Wl,-lrte_pmd_e1000 -Wl,-lrte_pmd_ena -Wl,-lrte_pmd_ngbe -Wl,-lrte_pmd_txgbe -Wl,-lrte_pmd_ring -Wl,-lrte_pmd_af_packet -Wl,-lrte_pmd_null -Wl,-lrte_pmd_null_crypto -Wl,-lrte_pmd_vhost -Wl,-ldl -Wl,--end-group -Wl,--no-whole-archive
```

排查确定相关的编译参数为 --whole-archive 与 --no-whole-archive，从 ld 命令的 manual 中找到了如下信息：

>--whole-archive    
>For each archive mentioned on the command line after the --whole-archive option, include every object filein the archive in the link, rather than searching the archive for the required object files. This is normally used to turn an archive file into a shared library, forcing every object to be included in the resulting shared library.This option may be used more than once.
>
>--no-whole-archive     
>Turn off the effect of the --whole-archive option for subsequent archive files.

--whole-archive 参数之后的库文件其中的所有对象都会被链接，而不是只链接那些需要的内容。--no-whole-archive 用来关闭 --whole-archive 功能。

## 解决方法

既然 --whole-archive 会让链接器链接此参数之后的库文件中的所有对象，只需要将构造函数所在的静态库链接参数放到 --whole-archive 之后即可，同时为了避免对其它链接库的影响，指定 --no-whole-archive 来关闭 --no-whole-archive。

测试过程如下：

```bash
$ gcc hello.c -o hello -L . -Wl,--whole-archive -ltest -Wl,--no-whole-archive
$ ./hello
register dumpops
register dumpops
```

## 一点点联想

在 [rt-thread 使用心得](https://blog.csdn.net/Longyu_wlz/article/details/82975871?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161259392816780262580112%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fblog.%252522%25257D&request_id=161259392816780262580112&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_v1~rank_blog_v1-1-82975871.pc_v1_rank_blog_v1&utm_term=rtthread) 这篇文章中，我描述了一种类似的实现。

这种实现通过修改链接脚本完成。通过将初始化函数的地址放到指定的 section 中，并在链接脚本中在此 section 前后添加锚点实现。

初始化的时候遍历 section 中的所有函数指针，调用之就完成了初始化过程，这种方法常见于嵌入式实时系统初始化的实现中，在 pc 上很少使用。