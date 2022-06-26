# 修改模块符号 crc 校验码并探讨 modpost 的部分工作原理
## 前言
在 [could not insert module test.ko: Invalid parameters](https://blog.csdn.net/Longyu_wlz/article/details/103292251) 这篇文章中，我描述过
 MODVERSIONS 功能对模块依赖的外部符号校验的功能。
 
最近在搞一个项目时，需要**修改 Module.symvers** 中的**符号 crc 值**来跳过内核
的符号校验过程以成功加载驱动，就按照以前的认识修改了 Module.symvers 文
件内容，却发现并没有生效。

经过一系列的尝试我发现之前对 Module.symvers 文件的理解很不到位，只描述
了其中的一星半点。在这篇文章中，我将通过一个个实验逐步揭开
Module.symvers 文件背后的谜团。

## 需要达成的目标

我的目标在于**使修改后的 Module.symvers 中的符号的 crc 码能够在模块中生
效**，可以通过访问 xx.mod.c 文件来判断，此文件中的相关内容的一个示例如下：

```c
static const struct modversion_info ____versions[]
__used
__attribute__((section("__versions"))) = {
	{ 0x53dfe382, "module_layout" },
	{ 0xa96ff6c5, "alloc_pages_current" },
	{ 0x2d3385d3, "system_wq" },
	{ 0xadcf987e, "netdev_info" },
```

这个 **__versions section** 中存储了**符号的 crc 值与符号名称**。这个 xx.mod.c
文件被用来生成 xx.ko 文件。

也可以通过执行 **modprobe** 命令来 dump xx.ko 文件中的 **modversions** 信息来
判断，一个命令行示例如下：

```bash
[longyu@debian-10:10:51:45] linux.git $ /sbin/modprobe --dump-modversions ./drivers/net/ethernet/intel/e1000/e1000.ko
0x53dfe382	module_layout
0xa96ff6c5	alloc_pages_current
0x2d3385d3	system_wq
0xadcf987e	netdev_info
```

这里以列表的形式列出了 ko 文件中的 modversions 内容，**第一列为 crc 值，
第二列为符号的名称。**

## 先贴出可用的方案

### 方案 1：从生成原理上出发

这里首先需要编译内核，编译完成内核后，需要注意如下文件、目录：

    Module.symvers
    vmlinux
    .tmp_versions

具体的操作步骤如下：

1. 进入到 .tmp_version 目录中，重命名所有的后缀名为 .mod 的文件

	由于有多个 .mod 后缀的文件，我使用 rename perl 脚本来重命名，示例命
令如下：

```bash
	[longyu@debian-10:10:59:37] .tmp_versions $ rename 's/\.mod$/.bak/' *.mod 
```

2. 重命名 vmlinux 文件

```bash
	mv ./vmlinux vmlinux-bak
```

3. 修改 Module.symvers 文件

	我这里通过修改 module_layout 的 crc 校验码作为示例，命令如下：

```bash
	sed -i  '/module_layout/ s/0x[0-9a-f][0-9a-f]*/0xffffffff/' Module.symvers
```
执行上述命令就将 module_layout 的 crc 码设定为全 f。

4. 重新编译模块

	需要进入到模块源码子目录中进行编译，直接使用 make xx/xx.ko 这种方式不
会生成 crc 值与符号表。

	示例命令如下；

```bash
	[longyu@debian-10:11:08:21] linux.git $ cd ./drivers/net/ethernet/intel/e1000/
	[longyu@debian-10:11:15:51] e1000 $ make -C ~/linux.git/ M=$PWD modules 
	........
	[longyu@debian-10:11:16:07] e1000 $ grep 'module_layout' ./*.mod.c
		{ 0xffffffff, "module_layout" },
	[longyu@debian-10:11:20:27] e1000 $ /sbin/modprobe --dump-modversions ./e1000.ko  | grep module_layout
	0xffffffff	module_layout
```
可以看到这里的生成的 xx.mod.c 与 ko 文件中的 module_layout 符号的 crc
均变为了全 F，达到了我们预期的效果。

### 方案 2:从 elf 文件出发

编译内核模块最终生成的 xx.ko 也是个 elf 文件，可以直接修改 elf 文件内
容来完成这个功能，主要步骤如下；

1. objcopy --dump-section __versions=versions ./e1000.ko 
2. hexedit versions
3. objcopy --update-section __versions=versions ./e1000.ko 
4. /sbin/modprobe --dump-modversions ./e1000.ko 

可以用如下程序遍历 dump 出的 versions 文件的内容：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#define MAX_PARAM_PREFIX_LEN (64 - sizeof(unsigned long))
#define MODULE_NAME_LEN MAX_PARAM_PREFIX_LEN

struct modversion_info {
    unsigned long crc;
    char name[MODULE_NAME_LEN];
};

int main(int argc, char *argv[])
{
    int fd = open(argv[1], O_RDWR);
    void *buff = NULL;

    if (fd < 0) {
        printf("open %s failed\n", argv[1]);
        exit(-1);
    }
    
    if ((buff = malloc(sizeof(struct modversion_info))) == NULL) {
        printf("malloc failed\n");
        exit(-1);
    }

    memset(buff, 0x00, sizeof(buff));
	
    while (read(fd, buff, sizeof(struct modversion_info))) {
        struct modversion_info *info =  (struct modversion_info *)buff;
        printf("0x%x\t%s\n", info->crc, info->name);
    }

    free(buff);
    close(fd);
    
    return 0;
}
```
这里使用 **hexedit** 来修改 versions 文件，其实可以从 modpost 拷贝代码，读
入新的 Module.symvers 建立哈希表，在读的过程中直接匹配，并修改，然后写
入到文件中。

也可以使用 vim 来直接修改 versions 文件，过程如下：

1. vim -b versions 打开文件
2. :%!xxd dump 十六进制
3. 修改内容
4. :%!xxd -r 转换格式
5. ：wq 保存并退出

这里我必须吐槽一下，最开始我使用的时候搜到了一篇博客，只描述了使用
:%!xxd 这个命令，打开与转换回去的格式都没有描述，我以为与标准的格式一
样，结果发现直接保存后内容已经变了，用 objcopy 更新回去后 modprobe 无
法识别！

上一次用 vim 直接编辑 interp section 文件，vim 作为普通文本打开，在文件
后追加了个行号，导致 elf 格式不可用，今天又被坑了一次，**看来我还是应该
少看点博客，写博客要远胜于读博客，学习应该通过阅读一手资料，而不是阅读
博客！**

## 上述方案背后的原理

上面的方案其实也体现了 modversion 背后的一些原理，这里我针对上面的
方案提出如下几个问题：

### 1. 为什么要重命名 .tmp_versions 目录中的 .mod 后缀的文件？

make V=1 输出编译命令会发现 modpost 会使用 .tmp_versions 目录中的后缀
名为 .mod 的文件制作参数。

```bash
  find .tmp_versions -name '*.mod' | xargs -r grep -h '\.ko$' | sort -u | sed 's/\.ko$/.o/' | scripts/mod/modpost -m  -o ./Module.symvers    -S    -s -T -
```
上面的命令行将会搜索 .tmp_versions 目录中的后缀名为 .mod 的文件的内容
  中有 .ko 的项目，排序后将 .ko 替换为 .o 后将参数传给 modpost 命令：
    
xx.mod 文件的一个示例信息如下：

```bash
[longyu@debian-10:14:23:32] linux.git $ cat ./.tmp_versions/e1000.mod 
drivers/net/ethernet/intel/e1000/e1000.ko
drivers/net/ethernet/intel/e1000/e1000_main.o drivers/net/ethernet/intel/e1000/e1000_hw.o drivers/net/ethernet/intel/e1000/e1000_ethtool.o drivers/net/ethernet/intel/e1000/e1000_param.o
```

这里每个会被编译的内核模块都会在 .tmp_version 目录中生成一个 .mod 文件，
这个文件的内容说明了 xx.ko 依赖的 .o。模块编译时最终会首先生成一个
modname.o 文件，通过链接这个文件来生成 xx.ko。

如果我们不重命名 .tmp_version 下的 xx.mod 文件，上述命令行会扫到其中的
.mod 文件并制作 modname.o 传递给 modpost 程序，modpost 程序通过读取这
些 .o 文件更新导出符号的 crc 值，这样 Module.symvers 文件中的内容就不
会生效。

### 2. 为什么要重命名 vmlinux

script/Makefile.modpost 文件中有如下内容：

```Makfile
 86 # We can go over command line length here, so be careful.
 87 quiet_cmd_modpost = MODPOST $(words $(filter-out vmlinux FORCE, $^)) modules
 88       cmd_modpost = $(MODLISTCMD) | sed 's/\.ko$$/.o/' | $(modpost) $(MODPOST_OPT) -s -T -
 89 
 90 PHONY += __modpost
 91 __modpost: $(modules:.ko=.o) FORCE
 92     $(call cmd,modpost) $(wildcard vmlinux)
```
这个 Makefile 脚本内容描述了 modpost 的调用过程，它额外传递了 vmlinux
 参数给 modpost，并且只有当 vmlinux 存在的时候才会传递给 modpost 程序。
 
如果我们不重命名 vmlinux，那么 modpost 将会被传入 vmlinux 参数，它会解
析这个 elf 文件，创建符号表、更新已经存在符号的 crc 值，这样最终生成的
crc 值将会是 vmlinux 文件中的值而不是 Module.symvers 文件中修改的值。

### 3. 为什么要使用 make -C 这种外部模块编译方法进行编译呢？

make drivers/xxx/xxx.ko 时的命令行：


```bash
  find .tmp_versions -name '*.mod' | xargs -r grep -h '\.ko$' | sort -u | sed 's/\.ko$/.o/' | scripts/mod/modpost -m  -o ./Module.symvers    -S    -s -T -
```

make -C drivers/xxx/xxx.ko 时的命令行：

```bash
  find /home/longyu/linux.git/drivers/net/ethernet/intel/e1000/.tmp_versions -name '*.mod' | xargs -r grep -h '\.ko$' | sort -u | sed 's/\.ko$/.o/' | scripts/mod/modpost -m  -i ./Module.symvers -I /home/longyu/linux.git/drivers/net/ethernet/intel/e1000/Module.symvers  -o /home/longyu/linux.git/drivers/net/ethernet/intel/e1000/Module.symvers -S  -w  -s -T -
```

这两种不同的编译方式中传递给 modpost 的命令行是不同的，第二种情况下会
使用 **-i ./Module.symvers** 指定 modpost 从**内核源码树根目录的
Module.symvers 文件中获取信息**，此时由于我们也重命名了
vmlinux，.tmp_version 中的 xx.mod 文件，它的输入只剩下 Module.symvers
文件，最终输出使用的 crc 值就是这个 Module.symvers 文件中的值。

**其实 make -C 的时候只会遍历编译模块源码根木录中的 .tmp_versions 下的
xx.mod 文件内容，而 mak drivers/xx.ko 则会遍历内核源码根目录中的 
.tmp_versions 目录中的 xx.mod 文件内容。**

第一种情况不会从 Module.symvers 文件中获取信息，因此它将不会生成
modversion 表。

script/Makefile.modpost 文件中的相关内容如下：

```Makefile
 60 kernelsymfile := $(objtree)/Module.symvers
 61 modulesymfile := $(firstword $(KBUILD_EXTMOD))/Module.symvers
 62 
 63 # Step 1), find all modules listed in $(MODVERDIR)/
 64 MODLISTCMD := find $(MODVERDIR) -name '*.mod' | xargs -r grep -h '\.ko$$' | sort -u
 65 __modules := $(shell $(MODLISTCMD))
 66 modules   := $(patsubst %.o,%.ko, $(wildcard $(__modules:.ko=.o)))
 67 
 68 # Stop after building .o files if NOFINAL is set. Makes compile tests quicker
 69 _modpost: $(if $(KBUILD_MODPOST_NOFINAL), $(modules:.ko:.o),$(modules))
 70 
 71 # Step 2), invoke modpost
 72 #  Includes step 3,4
 73 modpost = scripts/mod/modpost                    \
 74  $(if $(CONFIG_MODVERSIONS),-m)                  \
 75  $(if $(CONFIG_MODULE_SRCVERSION_ALL),-a,)       \
 76  $(if $(KBUILD_EXTMOD),-i,-o) $(kernelsymfile)   \
 77  $(if $(KBUILD_EXTMOD),-I $(modulesymfile))      \
 78  $(if $(KBUILD_EXTRA_SYMBOLS), $(patsubst %, -e %,$(KBUILD_EXTRA_SYMBOLS))) \
 79  $(if $(KBUILD_EXTMOD),-o $(modulesymfile))      \
 80  $(if $(CONFIG_DEBUG_SECTION_MISMATCH),,-S)      \
 81  $(if $(CONFIG_SECTION_MISMATCH_WARN_ONLY),,-E)  \
 82  $(if $(KBUILD_EXTMOD)$(KBUILD_MODPOST_WARN),-w)
```
这里第二种编译方式下会设定 **KBUILD_EXTMOD** 变量，根据上面的条件判断，当
 设定了这个变量后调用 modpost 的参数会增加好几个。
 
### 4. modpost 命令到底在玩些什么？

modpost 其实主要被于生成 Module.symvers 文件与 xx.mod.c 文件，它的具体
流程涉及对 elf 格式的解析，需要对 elf 基础知识有所了解。

我阅读代码的过程中想到了一个问题：

**modpost 怎么确定哪个符号需要生成 crc 码？**

我们知道一个可重定位目标文件中会有很多符号，诸如函数、变量符号等等，有
本地的也有全局的。**对一个模块而言，它所有未定义的符号都被判定为依赖的外
部符号**，modpost 在生成 modversion 表的时候要找到所有这些外部符号的
crc 值，如果没有找到，那么它会报一个 **xxx undefined! 的错误**。

modpost 实际上是通过遍历 **symtab section** 中的每一个符号的 **st_shndx** 字段来判断是否需
要生成 crc 码，st_shndex 为 **SHN_UNDEF** 的合法符号就是要生成 crc 码的符号。

modpost 通过如下代码将一个需要生成 crc 码的符号链入当前处理的模块的
unres 符号链表中。

```c
		mod->unres = alloc_symbol(symname,
					  ELF_ST_BIND(sym->st_info) == STB_WEAK,
					  mod->unres);
```
从 elf 解析到的以 **```__crc_```** 开始的符号，modpost 将会使用这个符号的值来更
新符号的 crc 值。

相关代码如下：

```c
	/* CRC'd symbol */
	if (strstarts(symname, "__crc_")) {
		is_crc = true;
		printf("%s\n", symname);
		crc = (unsigned int) sym->st_value;
		if (sym->st_shndx != SHN_UNDEF && sym->st_shndx != SHN_ABS) {
			unsigned int *crcp;

			/* symbol points to the CRC in the ELF object */
			crcp = (void *)info->hdr + sym->st_value +
			       info->sechdrs[sym->st_shndx].sh_offset -
			       (info->hdr->e_type != ET_REL ?
				info->sechdrs[sym->st_shndx].sh_addr : 0);
			crc = *crcp;
		}
		sym_update_crc(symname + strlen("__crc_"), mod, crc,
				export);
	}
```

**__crc_symname** 是由 EXPORT_SYMBOL 类的宏定义的，其中的 crc 值是由
**genksym** 命令生成的。
    
其它的细节过程我就不进一步描述了。

## 总结
与其一步步的尝试，不如直接阅读源代码。一些问题的答案也只有通过源
码来寻找，应该养成这样的习惯。

拿这里的例子来说，其实 modpost 工具的代码也没有太多，也没有太复杂，
完全能够读懂的，看来我还是没有养成阅读代码的习惯！




