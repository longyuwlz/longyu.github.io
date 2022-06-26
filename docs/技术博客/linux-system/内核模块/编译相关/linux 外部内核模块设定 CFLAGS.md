# linux 外部内核模块设定 CFLAGS
## 问题描述
在 linux 中编译高版本的 ixgbe 驱动时，为了研究驱动初始化过程需要设定 CFLAGS 标志，添加 DBG 宏定义。

## 修改方法
根据经验，需要修改 Makefile 文件，在其中添加如下行：

```Makefile
	CFLAGS += -DDBG
```

修改后编译发现有下面的告警信息：

```bash
scripts/Makefile.build:49: *** CFLAGS was changed in "/home/longyu/ixgbe/Makefile". Fix it to use ccflags-y. 
```
报错信息表明 ixgbe Makefile 中的 CFLAGS 标志改变，需要使用 ccflags-y 来修复。

于是将 CFLAGS 语句设定修改为如下语句：

```Makefile
ccflags-y += -DDBG
```
修改完成后能够成功编译，加载模块确定设定生效。

