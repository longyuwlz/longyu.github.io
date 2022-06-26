# 使用 awk 生产表的两种不同方式

awk 可以用于解决重复性高的任务，核心在于使用 awk 来批量的生成需要的表。这里的表既可以是特定的格式设置，如图形界面中的 style ，也可以是代码或者其它。

这里我以图形界面中的 style 为例。

当我需要对多个功能不同，操作方式相同的 checkbutton 指定不同的 style 来完成各自不同的界面显示效果时，我可以使用 awk 来生成不同的 style ，这样我就不需要手动编写每一个 style 了，提高了我的工作效率。

首先我需要得到一张表，这张表中列举出每一个特定的实例不同的变化，我编写的 awk 脚本为不变量。这里我将变化量从 style 中提取并转移到 awk 的输入表中，使用 awk 脚本对不同的输入实例以同样的过程进行处理，得到最终的 style 表。这样做不仅减少了重复性的工作，也让我能更好的处理未来的变化。如果需要频繁更换具体的 style, 我只需要修改 awk 的输入表然后执行脚本生成新表即可。

对于 awk 而言，可以有以下两种不同的实现方式:

1. 直接在函数中输出
   
   这种方式实现较为简单，如果你需要延时输出，你可以考虑第二种方式。
   
2. 在函数中将输出复制到动态数组中，将动态数组返回
   
   延缓输出。将输出暂存到动态数组中，由用户决定在什么时候进行输出。

程序代码如下：
```awk
    #!/usr/bin/awk -f
    
    function make_style_one(stylename, srcicon, desticon)
    {
        if ((stylename == "") || (srcicon == "") || (desticon == ""))
        {
            printf("invalid parameters\n");
            return
        }
    
        printf("\t<style name=\"%s\">\n", stylename)
        printf("\t\t<normal  icon=\"%s\"/>\n", srcicon)
        printf("\t\t<over   icon=\"%s\"/>\n", srcicon)
        printf("\t\t<pressed icon=\"%s\" x_offset=\"12\" y_offset=\"12\"/>\n", srcicon)
        printf("\t\t<normal_of_checked icon=\"%s\"/>\n", desticon)
        printf("\t\t<pressed_of_checked icon=\"%s\" x_offset=\"12\" y_offset=\"12\"/>\n", desticon)
        printf("\t\t<over_of_checked    icon=\"%s\"/>\n", desticon)
        printf("\t</style>\n")
    }
    
    
    function make_style_two(stylename, srcicon, desticon)
    {
        string = ""
        
        if ((stylename == "") || (srcicon == "") || (desticon == ""))
        {
            printf("invalid parameters\n");
            return
        }
    
        string = sprintf("\t<style name=\"%s\">\n", stylename)
        string = string sprintf("\t\t<normal  icon=\"%s\"/>\n", srcicon)
        string = string sprintf("\t\t<over   icon=\"%s\"/>\n", srcicon)
        string = string sprintf("\t\t<pressed icon=\"%s\" x_offset=\"12\" y_offset=\"12\"/>\n", srcicon)
        string = string sprintf("\t\t<normal_of_checked icon=\"%s\"/>\n", desticon)
        string = string sprintf("\t\t<pressed_of_checked icon=\"%s\" x_offset=\"12\" y_offset=\"12\"/>\n", desticon)
        string = string sprintf("\t\t<over_of_checked    icon=\"%s\"/>\n", desticon)
        string = string sprintf("\t</style>\n")
    
        return string
    }
    
    BEGIN {
        string = ""
    }
    
    {
        if (NF != 3) {
            printf("%s is invalid\n", $0)
            next
        }
        
        string = make_style_two($1, $2, $3)
    
        make_style_one($1, $2, $3)
       
        print "\n", string
    }

```

测试如下：
  

    asd sd er wer
    asd sd er wer is invalid
    re weqr wer ewr q ewrq 
    re weqr wer ewr q ewrq  is invalid
    q
    q is invalid
    q w 
    q w  is invalid
    light light_on light_off
    	<style name="light">
    		<normal  icon="light_on"/>
    		<over   icon="light_on"/>
    		<pressed icon="light_on" x_offset="12" y_offset="12"/>
    		<normal_of_checked icon="light_off"/>
    		<pressed_of_checked icon="light_off" x_offset="12" y_offset="12"/>
    		<over_of_checked    icon="light_off"/>
    	</style>
    
     	<style name="light">
    		<normal  icon="light_on"/>
    		<over   icon="light_on"/>
    		<pressed icon="light_on" x_offset="12" y_offset="12"/>
    		<normal_of_checked icon="light_off"/>
    		<pressed_of_checked icon="light_off" x_offset="12" y_offset="12"/>
    		<over_of_checked    icon="light_off"/>
    	</style>

推荐使用第二种方式，此种方式灵活性更好。在编写 awk 函数时，对于 print 类函数输出
中的特殊字符处理，你可以预先使用 sed 来进行替换，甚至于 printf 中的每一行你都可
以使用 sed 来处理得到。

你可以在 print、printf 后使用重定向操作将输出结果直接输出到文件中，可以直接使用 '>' string、'>>' string 来完成。在 awk 中重定位操作只打开文件一次，然后成功执行的 print、printf 语句将数据添加到打开的文件中。使用 '>' 时，第一次打开文件将会清空文件内容，使用 '>>' 则不会清空文件内容。

参考书籍 《The AWK Programming Language》。






