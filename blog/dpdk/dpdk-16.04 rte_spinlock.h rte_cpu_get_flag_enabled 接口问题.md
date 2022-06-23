# dpdk-16.04 rte_spinlock.h rte_cpu_get_flag_enabled 接口问题
## 问题描述
dpdk-16.04 适配 vpp 测试过程中，执行 vpp 程序遇到了如下报错内容：

```bash
load_one_plugin:145: /lib/vpp_plugins/router.so: undefined symbol: rte_cpu_get_flag_enabled
load_one_plugin:146: Failed to load plugin 'router.so'
```

报错信息表明未找到 rte_cpu_get_flag_enabled 这个符号的定义，使用 nm 查看 router.so 中相关的符号信息，得到了如下内容：


```bash
                 U rte_cpu_get_flag_enabled
00000000000037a0 t rte_rtm_init
```

确定 rte_cpu_get_flag_enabled 函数确实没有定义!

## rte_cpu_get_flag_enabled 在哪里被定义？
在 dpdk 16.04 源码中搜索发现这个函数在下面几个文件中都有定义。

```bash
./lib/librte_eal/common/arch/tile/rte_cpuflags.c:44:rte_cpu_get_flag_enabled(__attribute__((unused)) enum rte_cpu_flag_t feature)
./lib/librte_eal/common/arch/x86/rte_cpuflags.c:187:rte_cpu_get_flag_enabled(enum rte_cpu_flag_t feature)
./lib/librte_eal/common/arch/arm/rte_cpuflags.c:157:rte_cpu_get_flag_enabled(enum rte_cpu_flag_t feature)
./lib/librte_eal/common/arch/ppc_64/rte_cpuflags.c:125:rte_cpu_get_flag_enabled(enum rte_cpu_flag_t feature)
```
我编译的版本为 x86-64 架构，对应 **./lib/librte_eal/common/arch/x86/rte_cpuflags.c** 文件，同时我编译的目标架构为 linux 系统，Makefile 中的编译语句如下：

```bash
./lib/librte_eal/linuxapp/eal/Makefile:104:SRCS-$(CONFIG_RTE_EXEC_ENV_LINUXAPP) += rte_cpuflags.c
```
能够确定 **rte_cpu_get_flag_enabled** 函数被编译到了 librte_eal.a 中，只有链接了这个库应该能够找到这个符号。

## 为什么 rte_cpu_get_flag_enabled 未被链接？
首先检查编译参数，发现编译参数中没有链接 librte_eal.a，这能够解释 rte_cpu_get_flag_enabled 函数找不到定义的问题，但是这个函数又在哪里被调用呢？

在 router.so 代码中搜索，**没有发现调用点**，颇有些意外。想到这个函数可能是在 dpdk 函数中被调用，搜索发现它原来是在 **rte_rtm_init** 函数中被调用。x86 架构中，其定义位于 **./lib/librte_eal/common/include/arch/x86/rte_spinlock.h** 文件中。

rte_spinlock.h 文件中的相关源码摘录如下：

```c
static uint8_t rtm_supported; /* cache the flag to avoid the overhead
                                 of the rte_cpu_get_flag_enabled function */

static inline void __attribute__((constructor))
rte_rtm_init(void)
{
        rtm_supported = rte_cpu_get_flag_enabled(RTE_CPUFLAG_RTM);
}

static inline int rte_tm_supported(void)
{
        rte_cpu_get_flag_enabled(RTE_CPUFLAG_RTM);
        return rtm_supported;
}
```
这个头文件中的定义内容有如下几个特别之处：

1. 在头文件中定义了一个静态变量 rtm_supported
2. rte_rtm_init 被声明为一个内联函数+构造函数，将会在 main 函数执行前被调用
3. rte_rtm_init 中调用了一个非内联函数 rte_cpu_get_flag_enabled

在头文件中定义静态变量，则只要包含了这个头文件都会有一个 rtm_supported 的定义，不过由于**变量类型为静态变量，有局部作用域因而没有造成问题**。

rte_rtm_init 在头文件中定义并被声明为**构造函数**，则只要**包含了这个头文件**就会链接 **rte_rtm_init**。有 **inline** 的修饰加完整的定义，也能够这样玩。

可是在这里， **rte_rtm_init** 中却调用了一个非内联函数 **rte_cpu_get_flag_enabled**，而 **rte_cpu_get_flag_enabled** 却需要链接 **librte_eal.a** 才能找到实际的定义，这就存在一种隐式的依赖。即**包含了 rte_spinlock.h 就必须链接 librte_eal.a**。

router.so 中存在包含了 **rte_spinlock.h** 的情况，却没有链接 **librte_eal.a**，就踩到了这个坑！

## 如何解决问题？
dpdk 16.04 是一个比较老的版本，这个问题可能在高版本已经被修复了。于是查看 git log，找到了如下提交内容：

```bash
commit a088b5ea35e78d3866d492ed5e8c8f47118696a6
Author: Damjan Marion <damarion@cisco.com>
Date:   Thu Jul 14 15:27:29 2016 +0200

    spinlock: move constructor out of x86 header file
    
    Having constructor function in the header file is generally
    a bad idea, as it will eventually be implanted to 3rd party
    library.
    
    In this case it causes linking issues with 3rd party libraries
    when an application is not linked to dpdk, due to missing
    symbol called by constructor.
    
    Fixes: ba7468997ea6 ("spinlock: add HTM lock elision for x86")
    
    Signed-off-by: Damjan Marion <damarion@cisco.com>
    Reviewed-by: Jan Viktorin <viktorin@rehivetech.com>
    Signed-off-by: Thomas Monjalon <thomas.monjalon@6wind.com>
```
从时间上看在 16.07 版本就修复了这个问题，仅仅在 16.04 发布的 3 个月后！！

关键修改内容是添加一个 rte_spinlock.c 文件，将头文件中定义的静态变量与 rte_rtm_init 构造函数放到 .c 中。

相关代码摘录如下：

```c
#include <stdint.h>

#include "rte_cpuflags.h"

uint8_t rte_rtm_supported; /* cache the flag to avoid the overhead
                             of the rte_cpu_get_flag_enabled function */

static void __attribute__((constructor))
rte_rtm_init(void)
{
       rte_rtm_supported = rte_cpu_get_flag_enabled(RTE_CPUFLAG_RTM);
}
```
从高版本导出 patch 然后打上，问题得到解决！！

## 总结
问题一直都存在，而你能否发现它却另当别论！发现问题，解决问题，我们才能不断成长。发现不了新的问题，可能是完全掌握，也可能是一知半解。