# Program xxx tried to access /dev/mem between f0000-＞100000.
## 问题描述
3.16.35 内核 dmesg 信息中能够看到很多如下打印信息：

```bash
Program xxx tried to access /dev/mem between xxx -＞xxxx.
```
打印的频率非常频繁，冲掉了一些重要的 dmesg 内容，需要进行处理。

## 相关的内核代码在哪里？
检索确定，打印是由如下代码控制的：

```c
 61 #ifdef CONFIG_STRICT_DEVMEM
 62 static inline int range_is_allowed(unsigned long pfn, unsigned long size)
 63 {
 64     u64 from = ((u64)pfn) << PAGE_SHIFT;
 65     u64 to = from + size;
 66     u64 cursor = from;
 67 
 68     while (cursor < to) {
 69         if (!devmem_is_allowed(pfn)) {
 70             printk(KERN_INFO
 71         "Program %s tried to access /dev/mem between %Lx->%Lx.\n",
 72                 current->comm, from, to);
 73             return 0;
 74         }
 75         cursor += PAGE_SIZE;
 76         pfn++;
 77     }
 78     return 1;
 79 }
 80 #else
 81 static inline int range_is_allowed(unsigned long pfn, unsigned long size)
 82 {
 83     return 1;
 84 }
 85 #endif
```
当内核 .config 中开启了 CONFIG_STRICT_DEVMEM 后，会对程序通过 /dev/mem 映射的内存区域进行严格检查，检查失败则阻止程序访问。

## 程序 mmap /dev/mem 过程图示
![Figure 1](https://img-blog.csdnimg.cn/20210614194442368.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)
如上图所示，用户态程序通过 mmap /dev/mem 来将指定长度的物理地址映射为用户态的物理地址，在内核中  mmap_mem 负责完成此过程。mmap_mem 在执行 mmap 之前会作一些检查，其中就包括**检查请求地址是否允许访问**。

我们的程序访问了一个不在允许访问的条件之内的地址，且调用的非常频繁就会造成 dmesg 不断的打印警告信息。

在这个流程中，程序实际上是**无法访问**不允许访问的地址区域的，对此区域进行 mmap 会返回无权限。

内核中可以针对这个告警添加限速，但是**修改内核的成本太高**（一些依赖内核的组件都需要重新编译），并且我们判定这个问题为**正常告警**，故而**在用户态程序中进行了处理，跳过了非法地址区域，解决了此问题**。

## 查看内核 git log 寻找相关信息
尽管我们通过修改用户态程序解决了此问题，但是其实只是治标不治本，在内核中屏蔽此条打印能够从根本上解决问题，可也觉得有些不太好。

进一步想到，内核中可能在后续的版本中有对这个问题的处理。检索 git log，果然找到了相关修改。

内容如下：

              
```git
commit 39380b80d72723282f0ea1d1bbf2294eae45013e
Author: Jiri Kosina <jkosina@suse.cz>
Date:   Fri Jul 8 11:38:28 2016 +0200

    x86/mm/pat, /dev/mem: Remove superfluous error message 
    
    Currently it's possible for broken (or malicious) userspace to flood a 
    kernel log indefinitely with messages a-la
    
            Program dmidecode tried to access /dev/mem between f0000->100000
    
    because range_is_allowed() is case of CONFIG_STRICT_DEVMEM being turned on
    dumps this information each and every time devmem_is_allowed() fails.
    
    Reportedly userspace that is able to trigger contignuous flow of these
    messages exists. 
    
    It would be possible to rate limit this message, but that'd have a
    questionable value; the administrator wouldn't get information about all
    the failing accessess, so then the information would be both superfluous
    and incomplete at the same time :) 
    
    Returning EPERM (which is what is actually happening) is enough indication
    for userspace what has happened; no need to log this particular error as
    some sort of special condition.
 ```
相关 patch 内容如下：
```c
diff --git a/arch/x86/mm/pat.c b/arch/x86/mm/pat.c
index fb0604f11eec..db00e3e2f3dc 100644
--- a/arch/x86/mm/pat.c
+++ b/arch/x86/mm/pat.c
@@ -755,11 +755,8 @@ static inline int range_is_allowed(unsigned long pfn, unsigned long size)
        return 1;
 
    while (cursor < to) {
-       if (!devmem_is_allowed(pfn)) {
-           pr_info("x86/PAT: Program %s tried to access /dev/mem between [mem %#010Lx-%#010Lx], PAT prevents it\n",
-               current->comm, from, to - 1);
+       if (!devmem_is_allowed(pfn))
            return 0;
-       }
        cursor += PAGE_SIZE;
        pfn++;
    }
diff --git a/drivers/char/mem.c b/drivers/char/mem.c
index 71025c2f6bbb..d633974e7f8b 100644
--- a/drivers/char/mem.c
+++ b/drivers/char/mem.c
@@ -66,12 +66,8 @@ static inline int range_is_allowed(unsigned long pfn, unsigned long size)
    u64 cursor = from;
 
    while (cursor < to) {
-       if (!devmem_is_allowed(pfn)) {
-           printk(KERN_INFO
-       "Program %s tried to access /dev/mem between %Lx->%Lx.\n",
-               current->comm, from, to);
+       if (!devmem_is_allowed(pfn))
            return 0;
-       }
        cursor += PAGE_SIZE;
        pfn++;
    }
```
 根据时间，确定在 linux 4.x 版本才合入此修改！

## 总结
遇到问题的时，首先界定问题，这常常需要具体的经验。界定问题后再寻找最适合当前场景的解决方案，有时候并不一定优雅，但是却是最适合的，存在取舍。

改与不改都值得推敲，不过它们都必须围绕着解决问题这一目的！

