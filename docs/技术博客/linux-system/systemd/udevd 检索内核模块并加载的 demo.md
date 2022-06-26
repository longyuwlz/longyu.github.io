# udevd 检索内核模块并加载的 demo
## udevd 自动加载内核模块
在 [从 systemd-udevd 运行 log 中研究其自动加载内核模块的过程](https://blog.csdn.net/Longyu_wlz/article/details/121109303) 这篇文章中，我描述了 systemd-udevd 自动加载内核模块的一些原理。自动加载内核模块可以分为如下两方面内容：
1. 加载内核模块
2. 自动加载内核模块

自动加载内核模块涉及 udevd 跟内核之间的通信，及 udevd 自身规则的解析执行，在后续的文章中进行分析。

udevd 加载内核模块的功能使用 **libkmod** 库完成，本文通过一个简单的 demo 来模拟这一过程，代码摘自 udevd 源码并针对性修改。

## demo 程序
```c
#include <errno.h>
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>
#include <libkmod.h>

static struct kmod_ctx *ctx;

static int load_module(const char *alias) {
        struct kmod_list *list = NULL;
        struct kmod_list *l;
        int err;

        err = kmod_module_new_from_lookup(ctx, alias, &list);
        if (err < 0)
                return err;

        if (list == NULL)
                printf("No module matches '%s'\n", alias);

        kmod_list_foreach(l, list) {
                struct kmod_module *mod = kmod_module_get_module(l);

                err = kmod_module_probe_insert_module(mod, KMOD_PROBE_APPLY_BLACKLIST, NULL, NULL, NULL, NULL);
                if (err == KMOD_PROBE_APPLY_BLACKLIST)
                        printf("Module '%s' is blacklisted\n", kmod_module_get_name(mod));
                else if (err == 0)
                        printf("Inserted '%s'\n", kmod_module_get_name(mod));
                else
                        printf("Failed to insert '%s'\n", kmod_module_get_name(mod));

                kmod_module_unref(mod);
        }

        kmod_module_unref_list(list);
        return err;
}


static int kmod_init(void) {
        if (ctx)
                return 0;

        ctx = kmod_new(NULL, NULL);
        if (!ctx)
                return -ENOMEM;

        kmod_load_resources(ctx);
        return 0;
}

static void kmod_exit(void) {
        ctx = kmod_unref(ctx);
}

int main(int argc, char *argv[])
{
        kmod_init();

        if (argc < 2) {
                printf("Usage:%s alias\n", argv[0]);
        }

        load_module(argv[1]);

        kmod_exit();
}
```
kmod_init 初始化 libkmod 内部数据结构，load_module 命令通过传入参数先获取到需要加载的模块，获取成功后加载之。kmod_exit 接初始化 libkmod 内部数据结构。
## 安装 libkmod-dev
```bash
apt install libkmod-dev
```

## 编译命令

**gcc kmod.c -lkmod -o kmod**

## 命令测试
1. 使用 modalias 匹配驱动
	```bash
	longyu@debian:~/module_load_demo$ sudo  ./kmod "pci:v00008086d0000158Bsv*sd*bc*sc*i*"
	Inserted 'i40e'
	longyu@debian:~/module_load_demo$ lsmod |grep i40e
	i40e                  405504  0
	```
2. 使用驱动名称匹配驱动
	```bash
	longyu@debian:~/module_load_demo$ sudo ./kmod ixgbe
	Inserted 'ixgbe'
	longyu@debian:~/module_load_demo$ lsmod | grep ixgbe
	ixgbe                 333244  0
	mdio                   14073  1 ixgbe
	```

