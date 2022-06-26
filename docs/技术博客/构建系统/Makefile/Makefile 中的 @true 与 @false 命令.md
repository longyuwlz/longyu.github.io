# Makefile 中的 @true 与 @false 命令
## 问题描述
在一些 Makefile 文件中，能够看到 @true 与 @false 这两个命令。我对这两个命令的功能不清楚，在本篇文章中探讨一下。

## @ 与 @true 与 @false
@true 与 @false 均由两部分组成，第一部分是 @ 符号，第二部分是 true、false 命令。

**@ 符号告诉 make 不要将这个命令输出到 stdout 中。**
**false 命令会返回一个非 0 值给 make 表示失败**
**true 命令会返回一个 0 值给 make 表示成功**

**false 与 @false 功能相同，只是 false 将会输出命令执行信息到 stdout 中。**

make 在编译过程中，会**逐行调用** Makefile 中的命令，如果某行返回了一个非 0 值（false），make 将会**停止编译**。在这种情况下 make 命令会认为编译目标文件**构建失败**，并且所有**依赖**这个目标文件的项目也将会失败，因此 make 命令将会失败，会返回一个**非零的状态值**。

## 一个示例
查看如下 Makefile：
```makefile
foo:
    @echo this will be printed '(foo)'
    @false
    @echo this will not be printed '(foo)'

bar: foo
    @echo this will not be printed '(bar)'
```

foo 中的第二个 echo 语句将**不会出现**，make 将在执行它上方的 @false 命令处失败并终止编译。

bar 也同样**不会被编译**因为它**依赖的对象不被编译**，因此你也不会看到 bar 中的 echo 命令的输出。

## 忽略命令执行失败的方法
如果你确认某一个脚本行将会失败，但是你想要忽略这个失败，你可以在该行的 Makefile **命令前添加一个 - 号**。例如：

```Makefile
foo:
    @echo this will be printed '(foo)'
    -@false
    @echo this will also be printed '(foo)'
```

两个 echo 命令都会打印。false 命令将会运行，但是没有任何影响，**执行后 false 命令的返回值因为 - 号的存在而被忽略。**

## dpdk 中的一个实例
dpdk 的编译脚本中生成 rte_config.h 的步骤中使用到了 @true 的功能。Makefile 中相关的代码摘录如下：


```Makefile
# clean installed files, and generate a new config header file
# if NODOTCONF variable is defined, don't try to rebuild .config
$(RTE_OUTPUT)/include/rte_config.h: $(RTE_OUTPUT)/.config
        $(Q)rm -rf $(RTE_OUTPUT)/include $(RTE_OUTPUT)/app \
                $(RTE_OUTPUT)/hostapp $(RTE_OUTPUT)/lib \
                $(RTE_OUTPUT)/hostlib $(RTE_OUTPUT)/kmod $(RTE_OUTPUT)/build
        $(Q)mkdir -p $(RTE_OUTPUT)/include
        $(Q)$(RTE_SDK)/scripts/gen-config-h.sh $(RTE_OUTPUT)/.config \
                > $(RTE_OUTPUT)/include/rte_config.h

# generate the rte_config.h
.PHONY: headerconfig
headerconfig: $(RTE_OUTPUT)/include/rte_config.h
        @true
```

这里 @true 语句的作用如下：

**当 rte_config.h 文件存在且已经是最新的时候时，阻止构建 headerconfig 时 make 打印警告消息。**

当 @true **去掉后**，重新编译会看到如下打印：

>make[3]: Nothing to be done for `headerconfig'.

参考链接：
[What is false and true in makefile](https://stackoverflow.com/questions/49756183/what-is-false-and-true-in-makefile)
```

