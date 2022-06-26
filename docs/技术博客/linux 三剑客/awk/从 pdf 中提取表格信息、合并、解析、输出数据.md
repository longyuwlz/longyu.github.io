## 从 pdf 中提取表格信息、合并、解析、输出数据

## pdf 格式浅述
pdf 作为一种使用极为广泛的【可移植文件格式】，常用于各种用户手册及专业文档的撰写。可能很多人都认为 pdf 只是一些图片的打包合集，这其实是对 pdf 格式的一种误解。

作为专业的文档格式，pdf 中支持插入各种【图表、公式】等。完全使用图片来构建一个 pdf 仅仅使用了 pdf 中很小的一部分功能，且生成的 pdf 的内容不能直接复制。

## word 文档 与 pdf  
也许很多人在日常办公中经常接触到 pdf ，经常扫描文件生成扫描版 pdf。word 文档可能还经常撰写，但 pdf 却从来没有自己编写过。实际上对于专业性要求不高的内容， word 文档的撰写确实要比 pdf 文档更容易，图形化的排版过程隐藏了背后复杂的命令，更方便用户使用。

word 文档的优点一目了然，可在专业的文档撰写中 word 文档却常常被诟病。实际上，使用 word 排版专业文档并不容易。每次排版设定的格式可复用性不高，保存的文件格式也极不便于进行版本控制。

## pdf 文档撰写的优点与难点
pdf 文档弥补了 word 的上述缺陷，但 pdf 撰写的门槛却比 word 高出许多，这也就意味着你几乎不太可能只【点点鼠标】就能排版出一篇文章，你需要对排版系统进行学习，了解各种命令。虽然这种学习会耗费许多的时间与精力，可学到的知识能够一直使用下去，同时你对排版本身的各种原理也能有更进一步的认识。

使用过 Latex 排版系统的人可能对上面的描述有切身的体会。使用 Latex 来撰写一篇 pdf 文档时，你需要用到许多的宏与命令来对文档格式进行精细的控制，这比 word 中点点鼠标就能排版更加困难，也更加接近排版本身。 

我不对排版系统进行更进一步的叙述，感兴趣的读者可以搜索相关的网页进一步了解。

# 从 pdf 中抽取表格所在的页
常见的图文混排 pdf 中，表格零散的分布在 pdf 文档的各个部分。我们需要从 pdf 文档中将需要抽取的表格所在的页【抽取】出来。这一过程可以通过一些高级的 【pdf 编辑器】来完成。我没有使用 【pdf 编辑器】，我使用了一种命令行工具——【pdftk】来完成了这一任务。下面是相关的操作命令：

```sh
sudo apt-get install pdftk
pdftk in.pdf cat 50-60 output out.pdf 
```
命令说明文档请 **man pdftk** 。
# 从 pdf 中抽取表格
从一个大的 pdf 中抽取出来表格所在的页后，我们就可以从生成的 pdf 中抽取表格内容。注意抽出来的内容不能是扫描生成的图片，如果是图片将抽取失败！！！

pdf 格式有自己的文件格式规范，这一规范能够在网上找到。从 pdf 中抽取信息的参考便是这一文件格式规范。在这里我并没有尝试自己去撰写一个抽取工具，我直接使用了网页搜索得到的方法。

我使用 [【tabula】][1] 来从 pdf 中抽取表格信息，关于此模块的安装使用详见——[【使用 tabula 脚本从 pdf 中提取表格信息为 python 数据帧】](https://blog.chezo.uno/tabula-py-extract-table-from-pdf-into-python-dataframe-6c7acfa5f302)。

在安装使用过程中有如下【注意事项】：

1. python-numpy 版本问题

	如果你的系统中安装了多个版本的 【python-numpy】，请参考  [【如何升级 numpy】](https://stackoverflow.com/questions/28517937/how-can-i-upgrade-numpy) 中的回答来解决。

2. java 环境依赖问题
	
	由于我已经安装并配置了 java 环境，我没有遇到这一问题。遇到这个问题的读者请自行 google、百度解决。

[【tabula】][1] 可以将表格信息输出为四种格式：


> 　　1. python DataFrame
>        2. json
>        3. tsv
>        4. csv

在这里我使用 csv 作为输出格式。注意当待抽取的 pdf 文档有多页时，需要设定 pages 属性为 "all"'。

我使用 【tabula】 从下图中的 pdf 表格中提取信息。
![引脚复用功能](https://img-blog.csdnimg.cn/20190706083113235.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70)提取的信息中的部分内容如下：

> 176,Pin,DEFAUL,ALT0,ALT1,ALT2,ALT3,ALT4,ALT5,ALT6,ALT7
>VFBGA,Name,T,,,,,,,,
> C1,PTB3,LPADC0_,LPADC0_,PTB3/,LPSPI0_,LPUART1,I2S0_TX_,FB_AD10,TPM0_C,—
> "",,SE0,SE0,RF0_EXT,PCS3,_TX,FS,,H1, "",,,,_OSC_E,,,,,, "",,,,N,,,,,,
> C2,PTB4/,LPADC0_,LPADC0_,PTB4/,LPSPI0_,LPUART1,I2S0_TX_,FB_AD9,TPM0_C,—
> "",LLWU_P6,SE1,SE1,LLWU_P6,SCK,_CTS,BCLK,,H2, "",,,,/,,,,,,
> "",,,,RF0_RF_,,,,,, "",,,,OFF/,,,,,, "",,,,RF0_DFT,,,,,,
> "",,,,_RESET,,,,,,
> D2,PTB5,DISABLE,—,PTB5/,LPSPI0_,LPUART1,I2S0_MC,FB_AD8,TPM0_C,—
> "",,D,,RF0_ACT,SOUT,_RTS,LK,,H3, "",,,,IVE,,,,,,

上面的输出有点奇怪，它与表格的内容看上去并不一致。如果你仔细观察，你会发现当表格中单行的数据由多个行组成时，每一个行都被单独的提取出来了，这是 【tabula】 的一个缺陷，不过这并不致命，只要信息是正确的，那么编写代码将数据合并起来就行了。

# 合并表格、解析表格、生成输出数据
从上面抽取出来的表格信息中每一行的不同项之间通过逗号分割，使用 awk 来处理这种具有多个字段的信息相对容易，我就使用 awk 脚本来合并被分开的行，并完成【解析与输出】的任务。

代码如下：

```awk
#!/usr/bin/gawk -f

BEGIN {
    parse_and_generate()
    exit 0
}

function make_output_result(hash_table, buffer, gpio_name)
{
    gpio_name = hash_table["GPIONAME"]

    if (hash_table["PIN_MUX_ALT0"] != "") {
        buffer = sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                         hash_table["PIN_MUX_ALT0"],
                         "RV32M1_VEGA_PIN_MUX",
                         "PIN_MUX_ALT0")
    }

    if (hash_table["PIN_MUX_ASGPIO"] != "") {
        buffer =  buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                 "GPIO",
                                 "RV32M1_VEGA_PIN_MUX",
                                 "PIN_MUX_AS_GPIO")
    }

    if (hash_table["PIN_MUX_ALT2"] != "") {
        buffer = buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                hash_table["PIN_MUX_ALT2"],
                                "RV32M1_VEGA_PIN_MUX",
                                "PIN_MUX_ALT2")
    }
    
    if (hash_table["PIN_MUX_ALT3"] != "") {
        buffer = buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                hash_table["PIN_MUX_ALT3"],
                                "RV32M1_VEGA_PIN_MUX",
                                "PIN_MUX_ALT3")
    }
    
    if (hash_table["PIN_MUX_ALT4"] != "") {
        buffer = buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                hash_table["PIN_MUX_ALT4"],
                                "RV32M1_VEGA_PIN_MUX",
                                "PIN_MUX_ALT4")
    }

    if (hash_table["PIN_MUX_ALT5"] != "") {
        buffer = buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                hash_table["PIN_MUX_ALT5"],
                                "RV32M1_VEGA_PIN_MUX",
                                "PIN_MUX_ALT5")
    }
    
    if (hash_table["PIN_MUX_ALT6"] != "") {
        buffer = buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                hash_table["PIN_MUX_ALT6"],
                                "RV32M1_VEGA_PIN_MUX",
                                "PIN_MUX_ALT6")
    }
    
    if (hash_table["PIN_MUX_ALT7"] != "") {
        buffer = buffer sprintf("#define %8s_%-26s%s(%s)\n\n", gpio_name,
                                hash_table["PIN_MUX_ALT7"],
                                "RV32M1_VEGA_PIN_MUX",
                                "PIN_MUX_ALT7")
    }

    buffer = buffer "\n\n"

    return buffer
}

function eval_string(buffer, num,
                     result_buffer,
                     split_array, hash_table, i, j, len)
{
    for (i = 1; i <= num; i++) {
        if (buffer[i] == "") {
            continue
        }

        len = split(buffer[i], split_array, ",")

        gsub(/\/.*/, "", split_array[1])
        gsub(/PT/, "GPIO", split_array[1])
        gsub(/[0-9][0-9]*/, "_&", split_array[1])

        for (j = 2; j <= len; j++) {
            sub(/\/.*/, "", split_array[j])
        }

        hash_table["GPIONAME"] = split_array[1]
        hash_table["PIN_MUX_ALT0"] = split_array[2]
        hash_table["PIN_MUX_ASGPIO"] = split_array[3]
        hash_table["PIN_MUX_ALT2"] = split_array[4]
        hash_table["PIN_MUX_ALT3"] = split_array[5]
        hash_table["PIN_MUX_ALT4"] = split_array[6]
        hash_table["PIN_MUX_ALT5"] = split_array[7]
        hash_table["PIN_MUX_ALT6"] = split_array[8]
        hash_table["PIN_MUX_ALT7"] = split_array[9]

        result_buffer = result_buffer make_output_result(hash_table)
    }

    return result_buffer
}

function parse_table(array_buffer, array_index, output_buffer,
                     split_array, split_array_temp,
                     output_index, i, j, len, start)
{
    if (array_index == 0) {
        return 0
    }

    start = 0
    output_index = 1

    for (i = 1; i < array_index; i++) {
        if (array_buffer[i] ~ /^[A-Z][0-9][0-9]*,PT.*/) {
            start = 1
            len = split(array_buffer[i], split_array, ",")
        } else if ((array_buffer[i] ~ /^""/) && (start == 1)) {
            len = split(array_buffer[i], split_array_temp, ",")
            for (j = 2; j <= len; j++) {
                if (j == 3) {
                    continue
                }

                if (split_array_temp[j] != "\"\"" &&
                    split_array_temp[j] != "") {
                    split_array[j] = split_array[j] split_array_temp[j]
                }
            }
        }

        if (array_buffer[i + 1] !~ /^""/ && (start == 1)) {
            start = 0
            for (j = 2; j <= len; j++) {
                if (j == 2) {
                    output_buffer[output_index] = split_array[j]
                } else if (j >= 4) {
                    output_buffer[output_index] = output_buffer[output_index] ","\
                    split_array[j]
                }
            }
            output_index++
        }
    }

    return output_index - 1
}

function exchange_data(array, first, second,
                      temp)
{
    temp = array[first]
    array[first] = array[second]
    array[second] = temp
}

function transform_key(string)
{
    sub(/[,/].*/, "", string)

    if (!match(string, /[0-9][0-9]/)) {
        sub(/[0-9]/, "0&", string)
    }

    return string
}

function sort_table(array, len,
                    i, j, first_string, second_string)
{
    for (i = 1; i <= len; i++) {
        for (j = i + 1; j <= len; j++) {
            first_string = array[j]
            second_string = array[i]

            first_string = transform_key(first_string)
            second_string = transform_key(second_string)

            if (first_string < second_string) {
                exchange_data(array, j, i)
            }
        }
    }
}

function uniq_table(table, num, i)
{
    for (i = 1; i <= num; i++) {
        if (table[i] == table[i + 1]) {
            table[i] == ""
        }
    }
}

function read_component_then_parse(filename, output_buffer,
                                   buffer, i, num)
{
    i = 1

    if (filename == "") {
        return 0
    }

    while (getline < filename > 0) {
        buffer[i++] = $0 
        gsub(/—/, "", buffer[i - 1])
    }

    num = parse_table(buffer, i, output_buffer)

    sort_table(output_buffer, num)

    uniq_table(output_buffer, num)

    return num
}

function parse_and_generate(result_buffer, output_filename, list_buffer, num, i)
{
    result_buffer = ""

    for (i = 1; i < ARGC; i++) {
        output_filename = ARGV[i] ".out"
        num = read_component_then_parse(ARGV[i], list_buffer)
        result_buffer = eval_string(list_buffer, num)

        printf("%s\n", result_buffer) > output_filename
        
        close(output_filename)
    }
}
```
【parse_and_generate】 函数中依次对命令行中以参数传递的待解析的文件名进行处理。首先读取文件内容到 【buffer】 中，然后解析数据，生成新的表格，并按照特定的 【key】 对表格的行进行排序，并对排序的结果进行 【uniq】 操作。

【read_component_then_parse】 将新的表格填充到 【list_buffer】 中，表项数量通过返回值返回。

【eval_string】 根据传入的表格信息进行 "求值" ，返回 “求值” 得到的输出数据。这个输出数据被输出到预先生成的输出文件名（输入文件名加后缀 .out）中。

执行上述脚本，得到的输出的部分信息如下：

```c
#define  GPIOB_3_LPADC0_SE0                RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT0)

#define  GPIOB_3_GPIO                      RV32M1_VEGA_PIN_MUX(PIN_MUX_AS_GPIO)

#define  GPIOB_3_LPSPI0_PCS3               RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT2)

#define  GPIOB_3_LPUART1_TX                RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT3)

#define  GPIOB_3_I2S0_TX_FS                RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT4)

#define  GPIOB_3_FB_AD10                   RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT5)

#define  GPIOB_3_TPM0_CH1                  RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT6)



#define  GPIOB_4_LPADC0_SE1                RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT0)

#define  GPIOB_4_GPIO                      RV32M1_VEGA_PIN_MUX(PIN_MUX_AS_GPIO)

#define  GPIOB_4_LPSPI0_SCK                RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT2)

#define  GPIOB_4_LPUART1_CTS               RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT3)

#define  GPIOB_4_I2S0_TX_BCLK              RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT4)

#define  GPIOB_4_FB_AD9                    RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT5)

#define  GPIOB_4_TPM0_CH2                  RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT6)



#define  GPIOB_5_GPIO                      RV32M1_VEGA_PIN_MUX(PIN_MUX_AS_GPIO)

#define  GPIOB_5_LPSPI0_SOUT               RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT2)

#define  GPIOB_5_LPUART1_RTS               RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT3)

#define  GPIOB_5_I2S0_MCLK                 RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT4)

#define  GPIOB_5_FB_AD8                    RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT5)

#define  GPIOB_5_TPM0_CH3                  RV32M1_VEGA_PIN_MUX(PIN_MUX_ALT6)
```

## 进一步的反思
虽然上述 awk 脚本输出了正确的结果，但是在编写过程中我发现一些问题很难找到。例如当你使用某个变量时，不小心打错了名字，那么程序便不能正常工作，而寻找这个问题的过程比较困难。

当然，对于变量名打错的问题，你可以通过 【--dump-variables】 参数来生成全局变量表来寻找问题。你也可以通过调试来解决这个问题。不过如果 awk 能够报个错或者警告，那你可能会更快的发现问题。上述脚本有 200 多行代码，算是一个比较复杂的脚本了。编写过程中遇到的问题最后也都在短时间内得到了解决，但我觉得很多问题都应该可以避免。

## 用 perl 来完成文字处理
awk 中还有很多我可能没有接触到的细节，但我觉得浸淫于这种技术一角来解决问题的方法依赖性过强。我们应该使用更为通用的方式来解决问题，而不是玩弄各种奇技淫巧。为此，以后关于文字处理的部分，对于相对复杂的逻辑，我会用 【perl】 来实现，【perl】 的文字处理能力毋庸置疑，只是标识符用的有点多啊！！！

 [1]: https://tabula.technology/
 

