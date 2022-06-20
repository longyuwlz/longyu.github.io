## 命令行指定 CFLAGS 不生效
dpdk 的 Makefile 中有对 CFLAGS 的设定，在很多 Makefile 单独设定了 CFLAGS 增加 -O3 参数。

下面是 dpdk-17.05 中一些 Makefile 在 CFLAGS 标志中增加 -O3 选项的语句。

```
.......
./lib/librte_reorder/Makefile:37:CFLAGS += -O3
./drivers/net/fm10k/Makefile:39:CFLAGS += -O3
./drivers/net/tap/Makefile:42:CFLAGS += -O3
./drivers/net/pcap/Makefile:40:CFLAGS += -O3
./drivers/net/sfc/Makefile:38:CFLAGS += -O3
./drivers/net/vhost/Makefile:41:CFLAGS += -O3
./drivers/net/null/Makefile:39:CFLAGS += -O3
./drivers/net/mlx4/Makefile:47:CFLAGS += -O3
./drivers/net/af_packet/Makefile:45:CFLAGS += -O3
........
```
全局设定 ```export CFLAGS=" -O0 0g"```后重新编译发现还是使用了 -O3 编译，这表明 dpdk 的编译脚本中对 CFLAGS 的值重新进行了设定，**不能通过命令行指定 CFLAGS 来编译出 debug 版本。**

在 doc 目录下找到了如下相关内容：
```rst
331 Variables that Can be Set/Overridden in a Makefile Only
332 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
333 
334 *   VPATH: The path list that the build system will search for sources. By default, RTE_SRCDIR will be included in VPATH.
335 
336 *   CFLAGS: Flags to use for C compilation. The user should use +=  to append data in this variable.
337 
```
从上面的内容中可以看出，用户不能通过命令行设定 CFLAGS，只能通过 Makefile 文件来设定。

## 命令行设置 EXTRA_CFLAGS 标志生成 debug 版
继续阅读 doc 目录中的帮助文档，我发现 EXTRA_CFLAGS 标志可以使用。文档中相关的内容摘取如下：

```rst
Variables that Can be Set/Overridden by the User in a Makefile or Command Line
389 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
390 
391 *   CFLAGS_my_file.o: Specific flags to add for C compilation of my_file.c.
392 
393 *   LDFLAGS_my_app: Specific flags to add when linking my_app.
394     
395 *   EXTRA_CFLAGS: The content of this variable is appended after CFLAGS when compiling.
396 
397 *   EXTRA_LDFLAGS: The content of this variable is appended after LDFLAGS when linking.
398 
399 *   EXTRA_LDLIBS: The content of this variable is appended after LDLIBS when linking.
400 
401 *   EXTRA_ASFLAGS: The content of this variable is appended after ASFLAGS when assembling.
402 
403 *   EXTRA_CPPFLAGS: The content of this variable is appended after CPPFLAGS when using a C preprocessor on assembly files.
```

上面的介绍表明 EXTRA_CFLAGS 变量可以通过命令行进行设定，同时它会在编译时追加到 CFLAGS 内容之后。

执行 export EXTRA_CFLAGS="-O0 -g" 后重新编译 dpdk 的库，使用 gdb 调试 app 目录下生成的可执行文件发现 gdb 能够读取到调试信息。

虽然有了调试信息，但是 Makefile 中对 CFLAGS 变量增加的 -O3 选项可能意味着编译出来的是 O3 版本的程序，这样就不能算作是 debug 版本。

我查看编译编译目录中 *.o.cmd 中保存的编译命令，发现库函数的编译命令中同时设定了 -O3 与 -O0 -g 参数。

示例如下：

```bash
[longyu@debian-10:22:02:09] x86_64-native-linuxapp-gcc $ cat ./build/lib/librte_eal/linuxapp/eal/.eal_alarm.o.cmd 
cmd_eal_alarm.o = gcc -Wp,-MD,./.eal_alarm.o.d.tmp  -m64 -pthread  -march=native -DRTE_MACHINE_CPUFLAG_SSE -DRTE_MACHINE_CPUFLAG_SSE2 -DRTE_MACHINE_CPUFLAG_SSE3 -DRTE_MACHINE_CPUFLAG_SSSE3 -DRTE_MACHINE_CPUFLAG_SSE4_1 -DRTE_MACHINE_CPUFLAG_SSE4_2 -DRTE_MACHINE_CPUFLAG_AES -DRTE_MACHINE_CPUFLAG_PCLMULQDQ -DRTE_MACHINE_CPUFLAG_AVX -DRTE_MACHINE_CPUFLAG_RDRAND -DRTE_MACHINE_CPUFLAG_FSGSBASE -DRTE_MACHINE_CPUFLAG_F16C -DRTE_MACHINE_CPUFLAG_AVX2  -I/home/longyu/Downloads/dpdk-stable-17.02.1/x86_64-native-linuxapp-gcc/include -include /home/longyu/Downloads/dpdk-stable-17.02.1/x86_64-native-linuxapp-gcc/include/rte_config.h -I/home/longyu/Downloads/dpdk-stable-17.02.1/lib/librte_eal/linuxapp/eal/include -I/home/longyu/Downloads/dpdk-stable-17.02.1/lib/librte_eal/common -I/home/longyu/Downloads/dpdk-stable-17.02.1/lib/librte_eal/common/include -W -Wall -Wstrict-prototypes -Wmissing-prototypes -Wmissing-declarations -Wold-style-definition -Wpointer-arith -Wcast-align -Wnested-externs -Wcast-qual -Wformat-nonliteral -Wformat-security -Wundef -Wwrite-strings -O3  -O0 -g  -o eal_alarm.o -c /home/longyu/Downloads/dpdk-stable-17.02.1/lib/librte_eal/linuxapp/eal/eal_alarm.c  
```

查看到编译命令，我想到了一个问题——**指定了多个优化选项时 gcc 编译时会使用哪个呢？**

## gcc 同时指定多个优化选项的问题
经过搜索，我发现 gcc 的官方网页中对这个问题进行了描述。当 gcc 编译命令中指定了多个优化选项时，只有最后一个优化选项生效。

-O3 是在 CFLAGS 变量中指定的，EXTRA_CFLAGS 是我们在命令行中指定的，根据 dpdk 的帮助文档中的说明，EXTRA_CFLAGS 的值会在编译时追加到 CFLAGS 的值后，这样我们就看到了有 -O3 ..... -O0 -g 这样的编译命令。

-O0 是最后一个指定的优化选项，实际生效的是 -O0，而非 -O3，这样我们通过设定 EXTRA_CFLAGS 为 -O0 -g 就能够编译出 debug 版本的 dpdk。

备注: EXTRA_CFLAGS 是在  mk/internal/rte.compile-pre.mk 中使用的。

## 最终确定的编译 dpdk debug 版本的方法
命令行中执行如下命令设定 EXTRA_CFLAGS 后重新编译即可。

```bash
export EXTRA_CFLAGS="-O0 -g"
```



