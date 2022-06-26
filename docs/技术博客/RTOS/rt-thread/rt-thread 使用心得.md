# rt-thread 使用心得 

 最近做了一个项目，接触到了 rt-thread 这款国产实时操作系统，进行了简单的配置之后就能够在板子上面调试，确实很方便！

 下面是我在配置的过程中遇到的一些问题，以及对这些问题的思考。

#### rt-thread 驱动与组件初始化 

**rt-thread 系统驱动与组件的初始化与常见的嵌入式实时操作系统有较大区别。rt-thread 通过将初始化函数地址以不同的初始化级别排序后存储到初始化段中，在段的前后设置锚点，通过遍历获取锚点间存储的函数指针，依次执行来完成初始化工作。**
    
   rt-thread 中的初始化工作可以分为组件板级初始化与组件系统级初始化两种，这两种类别的初始化函数指针依次存放。根据 rt-thread 中 component.c 源代码可以发现这些初始化函数的执行有如下顺序 :      
  
>a. rti_start         --> 0
>b. BOARD_EXPORT      --> 1
>c.  rti_board_end     --> 1.end
>d. DEVICE_EXPORT     --> 2
>e. COMPONENT_EXPORT  --> 3
> f.  FS_EXPORT         --> 4
> g. ENV_EXPORT        --> 5
> h. APP_EXPORT        --> 6
> i. rti_end           --> 6.end
 
 下面是我的项目的 map 文件中与初始化函数段相关的数据：
 
	                0x60033030                __rt_init_start = .
	 *(SORT(.rti_fn*))
	 .rti_fn.0      0x60033030        0x4 build/kernel/src/components.o
	                0x60033030                __rt_init_rti_start
	 .rti_fn.0.end  0x60033034        0x4 build/kernel/src/components.o
	                0x60033034                __rt_init_rti_board_start
	 .rti_fn.1      0x60033038        0x4 build/drivers/drv_uart.o
	                0x60033038                __rt_init_imxrt_hw_uart_init
	 .rti_fn.1      0x6003303c        0x4 build/drivers/drv_pin.o
	                0x6003303c                __rt_init_rt_hw_pin_init
	 .rti_fn.1      0x60033040        0x4 build/drivers/drv_spi_bus.o
	                0x60033040                __rt_init_rt_hw_spi_bus_init
	 .rti_fn.1.end  0x60033044        0x4 build/kernel/src/components.o
	                0x60033044                __rt_init_rti_board_end
	 .rti_fn.2      0x60033048        0x4 build/kernel/components/dfs/src/dfs.o
	                0x60033048                __rt_init_dfs_init
	 .rti_fn.2      0x6003304c        0x4 build/kernel/components/net/lwip-2.0.2/src/arch/sys_arch.o
	                0x6003304c                __rt_init_lwip_system_init
	 .rti_fn.2      0x60033050        0x4 build/kernel/components/drivers/sdio/mmcsd_core.o
	                0x60033050                __rt_init_rt_mmcsd_core_init
	 .rti_fn.3      0x60033054        0x4 build/drivers/drv_rtc.o
	                0x60033054                __rt_init_rt_hw_hp_rtc_init
	 .rti_fn.3      0x60033058        0x4 build/drivers/drv_i2c.o
	                0x60033058                __rt_init_rt_hw_i2c_init
	 .rti_fn.3      0x6003305c        0x4 build/drivers/drv_lcd.o
	                0x6003305c                __rt_init_rt_hw_lcd_init
	 .rti_fn.3      0x60033060        0x4 build/drivers/drv_sdio.o
	                0x60033060                __rt_init_imxrt_mci_init
	 .rti_fn.3      0x60033064        0x4 build/drivers/drv_eth.o
	                0x60033064                __rt_init_rt_hw_imxrt_eth_init
	 .rti_fn.4      0x60033068        0x4 build/kernel/components/dfs/filesystems/elmfat/dfs_elm.o
	                0x60033068                __rt_init_elm_init
	 .rti_fn.4      0x6003306c        0x4 build/kernel/components/libc/compilers/newlib/libc.o
	                0x6003306c                __rt_init_libc_system_init
	 .rti_fn.4      0x60033070        0x4 build/kernel/components/drivers/i2c/i2c_core.o
	                0x60033070                __rt_init_rt_i2c_core_init
	 .rti_fn.6      0x60033074        0x4 build/kernel/components/finsh/shell.o
	                0x60033074                __rt_init_finsh_system_init
	 .rti_fn.6.end  0x60033078        0x4 build/kernel/src/components.o
	                0x60033078                __rt_init_rti_end
	                0x6003307c                __rt_init_end = .
	               
	  
__rti_init_start 是初始化函数段的开始，__rt_init_end 是该段的结束，且段中函数指针变量以相同的前缀名进行排序。为什么会有这样的布局呢？这与链接脚本有关。以 gcc 链接脚本为例，你可以在链接脚本中发现这样几行：

       /* section information for initial. */
        . = ALIGN(4);
        __rt_init_start = .;
        KEEP(*(SORT(.rti_fn*)))
        __rt_init_end = .;
        . = ALIGN(4);

 第一行是注释，第二行表示当前行开始以四字节对齐，四字节就是 32 位 cpu 中一个指针的长度。然后在 __rti_init_start 中保存段的起始地址，同理在 __rt_init_end 中保存段的结束地址。KEEP(\*(SORT(.rti_fn\*))) 有两个作用：

1. 强制链接器保留以名称中包含 .rti_fn* 的段。

2. 以 .rti_fn* 为关键词对不同 .o 中的段定义进行排序，这一点至关重要。

 我在构建第一个可以调试的工程时就发现在我的链接脚本中缺少了   KEEP(\*(SORT(.rti_fn\*))) 这句，造成无法正常完成初始化工作，系统一运行便进入断言。如果你在使用 rt-thread 时遇到断言问题，那么你首先在生成的 map 文件中以关键字 __rti_fn 搜索，不仅要确认这样的段确实存在，而且一定排好了序存放。如果搜索不到，或者搜索到的结果乱序排放，那么你可以检查链接脚本，这常常就是问题所在。

 为什么一定要排序呢？我也曾经心存疑惑，当我阅读了初始化部分的源代码，我发现了问题的答案。

 两个主要的初始化函数的主要内容如下：

```c
	void rt_components_board_init(void)
	{
	.................................
	    for (fn_ptr = &__rt_init_rti_board_start; fn_ptr < &__rt_init_rti_board_end; fn_ptr++)
	    {
	        (*fn_ptr)();
	    }
	     .................................
	}
	
	void rt_components_init(void)
	{
	.............................................
	    const init_fn_t *fn_ptr;
	
	    for (fn_ptr = &__rt_init_rti_board_end; fn_ptr < &__rt_init_rti_end; fn_ptr ++)
	    {
	        (*fn_ptr)();
	    }
	.....................................
	}
```	
rt_components_board_init 是组件的板级初始化函数，该函数以 __rt_init_rti_board_start 为起始地址，__rt_init_rti_board_end 为终止地址，程序依次遍历这两个锚点间存放的初始化函数地址并执行。如果没有进行排序，那么需要执行的函数的地址可能不在这两个锚点之间，无法获取到相应的函数地址也就无法完成初始化工作，这就是要排序的原因。

rt_components_init 是组件的系统级初始化函数，原理与上述函数相同，这里就不赘述了。

#### 入口函数设定
 我使用 gnu 工具来编译 rt-thread 工程。进一步阅读源码，我发现系统中并没有使用常规的 main 函数为入口，它使用 entry 函数作为系统执行入口，在 arm-none-eabi-gcc 中设置 -eentry 来以 entry 代替 main，这算是一个技巧吧！



