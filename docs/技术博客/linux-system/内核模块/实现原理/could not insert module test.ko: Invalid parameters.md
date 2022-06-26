# could not insert module test.ko: Invalid parameters
## 问题描述
在 insmod 一个单独编译的内核模块时遇到了如下问题：

```bash
insmod test.ko
Error: could not insert module test.ko: Invalid parameters   
```
## 问题分析
dmesg 查看内核日志有如下报错：
```
[  343.796058] test: disagrees about version of symbol _dev_info
[  343.796066] test: Unknown symbol _dev_info (err -22)
```
在网上搜索该报错信息发现与内核使能的 MODVERSIONS 功能有关。当开启了这个功能之后，内核会对每一个 EXPORT_SYMBOL  导出的外部符号生成 crc 校验码，上面的错误表示在我加载模块中引用的 _dev_info 的 crc 校验码与内核中的校验码不同。

这之后我怀疑是编译环境的问题，重新从服务器上拉取最新的内核代码后重新编译，这之后再次尝试加载模块问题得到了解决。
## 对 MODVERSIONS 的研究
我们可以将 MODVERSIONS 理解为内核对模块中使用 EXPORT_SYMBOL 导出符号的版本控制。对于特定的版本，每一个外部符号都对应一个 crc 码，当模块被加载或使用时，内核会使用内部的外部符号校验码来对模块进行简单的 ABI 校验。只有当校验成功，即外部符号版本一致的情况下，模块才能成功加载。

我们在编译外部模块时，编译过程中会生成一个后缀为 .mod.c 的文件，在这个文件中就包含了编译模块使用的内核提供的外部符号与符号的 crc 码值表。

一个具体的示例如下：

```c
static const struct modversion_info ____versions[]
__used
__attribute__((section("__versions"))) = {
	...
	{ 0x362ef408, "_copy_from_user" },
};
```
上面定义了一个 ```modversion_info```结构体数组，并将该数组放到 ```__versions```段中。```modversion_info ```结构体的定义如下：

```c
struct modversion_info {
	unsigned long crc;
	char name[MODULE_NAME_LEN];
};
```
拿 _copy_from_user 符号来说，它的 crc 码值就是 0x362ef408。写到这里也许有人问，这里 crc 码是怎么来的？这其实是从 ```Module.symvers```文件中查表获取到的。

## Module.symvers 文件
在内核编译完成后，我们会在内核源码根目录中发现 Module.symvers 文件。当 config 中使能了 MODVERSIONS 时，Module.symvers 文件内容的一个典型示例如下：

```
[longyu@debian-10:13:09:02] linux-4.19.81 $ head -n 4 Module.symvers 
0xb3106e55	ipv6_chk_custom_prefix	vmlinux	EXPORT_SYMBOL
0x87b7abdc	pcmcia_reset_card	vmlinux	EXPORT_SYMBOL
0x747ce8f4	sata_pmp_error_handler	vmlinux	EXPORT_SYMBOL_GPL
0x55417264 	unregister_vt_notifier	vmlinux	EXPORT_SYMBOL_GPL
...
0x112d3d6c	nf_nat_l4proto_unique_tuple	net/netfilter/nf_nat	EXPORT_SYMBOL_GPL
...
 ```
上面的信息中，第一列表示的就是 crc 码，第二列是符号名，第三列是符号所在的模块，第四列是导出符号使用的宏。

**注意第三列中符号所在的模块为 vmlinux 时，表示符号的位置在内核中而非外部模块中。**

**当你自己的外部模块依赖的外部符号未编译到内核中时，你在加载自己的内核模块时需要先加载所依赖的符号所在的模块，这就是模块依赖所要解决的问题。**

当你在单独编译一个内核模块时，外部符号的 crc 码是从 ```Module.symvers```文件中获取到的，它可以在你指定的内核树中找到。

我是使用的是 debian 10 系统，在我的系统的内核树中，```Module.symvers```	文件所在的位置如下：

>/usr/src/linux-headers-$(uname -r)/Module.symvers

## Module.symvers 是被谁生成的？
Module.symvers 是在内核编译期间，make 调用 genksyms 生成的。在我的系统中，genksyms 命令的位置如下：

>/usr/lib/linux-kbuild-4.19/scripts/genksyms/genksyms

genksyms 的源码位于内核源码树的 scripts/genksyms/ 目录中，感兴趣的朋友可以去研究研究。由于我对内核编译的过程不是非常清楚，暂时还讲不清楚生成 Module.symvers 的中间过程。

我使用下面的测试代码来演示下 genksyms 如何使用。

首先将下面的代码保存为 test.c。

```c
int func1(void)
{

}

void func2(int)
{
}

int variable1;
short variable2;

EXPORT_SYMBOL(func1);
EXPORT_SYMBOL(func2);
EXPORT_SYMBOL_GPL(variable1);
EXPORT_SYMBOL_GPL(variable2);
```
调用 genksyms 扫描该代码，得到计算出的 crc 值。具体的结果如下：

```bash
[longyu@debian-10:17:57:20] genksyms $ ./genksyms  < test.c
__crc_func1 = 0x438ca36d;
__crc_func2 = 0x23c1ae77;
__crc_variable1 = 0x04648b27;
__crc_variable2 = 0xbf2f306e;
 ```
genksyms 会根据符号的属性如符号名称、函数的返回值、函数的参数类型、变量的类型等输入信息来计算 crc 的值，这些都只与符号的原型有关，与符号实际的值没有关系。

由于符号原型中可能会用到一些 typedef、宏等，在调用 genksyms 进行扫描之前需要进行预处理，也就是说 genksyms 的输入应当是预处理后的 .i 的内容。

## 参考链接

[invalid parameters error when trying to insert module that accesses exported symbol](https://stackoverflow.com/questions/16360689/invalid-parameters-error-when-trying-to-insert-module-that-accesses-exported-s/16363156)
[linux kernel version check](https://www.zzsec.org/2014/10/linux-kernel-module-version-check/%5C)

