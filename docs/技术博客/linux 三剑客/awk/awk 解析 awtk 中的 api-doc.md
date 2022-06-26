# awk 解析 [awtk](https://github.com/zlgopen/awtk) 中的 api-doc
## [awtk](https://github.com/zlgopen/awtk) 生成说明文档与外部脚本绑定的原理
[awtk](https://github.com/zlgopen/awtk) 绑定外部脚本时首先解析头文件中的描述信息，然后生成 idl ，通过进一步操作 idl 来完成外部脚本绑定。

[awtk](https://github.com/zlgopen/awtk) 组件的头文件中，描述了类结构，事件，属性，函数接口的信息，这些信息既可用于外部脚本绑定，也可用于生成组件的说明文档。

[awtk](https://github.com/zlgopen/awtk) 中使用 js 编写了转化工具实现上述功能，这里我尝试使用 awk 来实现生成组件说明文档的功能。

## 对问题的分析
我们可以将头文件中撰写的注释信息做为一种特定文档格式。它与一般文档格式的不同之处在于它仅被用于作为生成其它文件的输入文件。使用 awk 来编写解析代码，完成了这段代码就相当于实现了一种自己的文档格式。

首先对头文件中的注释进行区分，可以分为如下几个类别:

| 类别 | 描述 |
| ---- | ------ |
| class | 类信息 |
| class property | 类成员描述 |
| event | 事件描述　 |
| method | 接口描述 |

根据上面的类别，代码中可以对整个解析任务进行分割，依次处理不同类型的信息，解析完成后合并、写入到同一个文件中。


## 代码
```c
#!/usr/bin/gawk -f

function current_state(state, i)
{
    for (i in state) {
        if (state[i] == 1)
            return i
    }

    return ""
}

function set_state_and_add_to_file(state, type, file, string)
{
    state[type] = 1;
    print string > file[type]
}

function make_class_data(filename, class,
                         buff)
{
    buff = sprintf("## 概述 %s\n", class)

    while (getline < filename > 0) {
        if ($0 ~ /^ \* @/) {
            continue
        } else {
            gsub(/^ \*([ \/])?/, "")
            buff = buff $0 "\n"
        }
    }

    return buff
}

function param_start(table, i,
                     j, m, start)
{
    j = 1
    m = 1
    start = 1

    while (table[m] != "") {
        if (table[m] == "end") {
            if (j == i) {
                return start
            } else {
                j++
                start = m + 1 # notice this
            }
        }
        m++
    }

    return 0
}

function param_end(table, i,
                   j, m)
{
    j = 1
    m = 1

    while (table[m] != "") {
        if (table[m] == "end") {
            if (j == i) {
                return m
            } else {
                j++
            }
        }
        m++
    }

    return 0
}

function output_function_proto(funcname, param, retvalue, i,
                               rettable, paramtable, end,
                               buff, j)
{
    buff = "```\n"

    split(retvalue[i], rettable, " ")

    buff = buff rettable[1] " " funcname "("

    end = param_end(param, i)

    for (j = param_start(param, i); j < end; j++) {
        split(param[j], paramtable, " ")
        buff = buff paramtable[1] " " paramtable[2]
        if (j + 1 < end) {
            buff = buff ", "
        }
    }

    buff = buff ");\n"

    buff = buff "```\n"

    return buff
}

function make_event_data(filename, class,
                         array, desc, buff)
{

    buff = sprintf("### 事件\n\n")
    buff = buff sprintf("<p id=\"%s_events\">\n\n", class)
    buff = buff sprintf("| 事件名称 | 类型  | 说明 | \n"\
                        "| -------- | ----- | ------- |\n")
                        
    while (getline < filename > 0) {
        if ($0 ~ /@event/) {
            split($0, array, "{|}")
        } else if ($0 ~ /\*\//) {
            gsub(/_/, "\\_", array[2])
            gsub(/_/, "\\_", array[3])
            buff = buff sprintf("| %s | %s | %s |\n", array[3], array[2], desc)
        } else if ($0 ~ /\* .*/) {
            desc = $0
            gsub(/^[ \t]{1,}\* /, "", desc)
        }
    }

    close(filename)

    return buff
}

function make_annotation_data(annotation,
                              output_key, i, array, buff)
{
    output_key["set_prop"] = "否"
    output_key["get_prop"] = "否"
    output_key["readable"] = "否"
    output_key["writable"] = "否"
    output_key["persitent"] = "否"
    output_key["design"] = "否"
    output_key["scriptable"] = "否"
    output_key["xmlset"] = "是"

    gsub(/\[/, "", annotation)
    gsub(/\]/, "", annotation)
    gsub(/"/, "", annotation)

    split(annotation, array, ",")

    for (i = 1; i <= length(array); i++) {
        output_key[array[i]] = "是"
    }
    
    buff = sprintf("| 特性 |　是否支持　|\n")
    buff = buff sprintf("| ---- | ----- |\n")
    buff = buff "| 可直接读取 | " output_key["readable"] " |\n"
    buff = buff "| 可直接修改 | " output_key["writable"] " |\n"
    buff = buff "| 可持久化 　| " output_key["persitent"] " |\n"
    buff = buff "| 可脚本化 　| " output_key["scriptable"] " |\n"
    buff = buff "| 可在 IDE 中设置 | " output_key["design"] " |\n"
    buff = buff "| 可在 XML 中设置 | " output_key["xmlset"] " |\n"
    buff = buff "| 可通过 widget\\_set\\_prop修改 | " output_key["set_prop"] " |\n"
    buff = buff "| 可通过 widget\\_get\\_prop读取 | " output_key["get_prop"] " |\n"
    
    return buff
}

function make_properties_data(filename, class,
                              array, desc, buff, desc_id, anno_table)
{
    while (getline < filename > 0) {
        if ($0 ~ /@property/) {
            split($0, array, " {|} ")
            continue
        } else if ($0 ~ /\*\//) {
            desc_id = sprintf("<p id=\"%s_%s\"> %s\n\n", class, array[3], desc);
            gsub(/_/, "\\_", array[2])
            gsub(/_/, "\\_", array[3])
            buff = buff sprintf("#### %s 属性\n\n", array[3])
            buff = buff "--------------\n"
            buff = buff desc_id
            buff = buff sprintf("* 类型：%s\n\n", array[2])
            buff = buff anno_table
            continue
        } else if ($0 ~ /@annotation/) {
            gsub(/.*@annotation /, "", $0)
            anno_table = make_annotation_data($0)
            continue
        } else {
            desc = $0
            gsub(/^[ \t]{1,}\* /, "", desc)
            continue
        }
    }

    close(filename)

    return buff
}

function make_method_data(filename, class,
                          method, param, retvalue,
                          m, p, r, i, array, buff, new_data)
{
    m = p = r = 1
    while (getline < filename > 0) {
        if ($0 ~ /^ \* @method/) {
            sub(/^ \* @method /, "")
            method[m++] = $0
        } else if ($0 ~ /^ \* @param/) {
            gsub(/^.*\{/, "")
            split($0, array, "}|  *")
            param[p++] = array[1] " " array[3] " " array[4]
        } else if ($0 ~ /^ \* @return/) {
            gsub(/^.*\{/, "")
            split($0, array, "}| ")
            retvalue[r++] = array[1] " " array[3]
        } else if ($0 ~ /^ \*\//) {
            param[p++] = "end"
        } else if ($0 ~ /^ \* [^@]*$/) {
            gsub(/^ \* /, "")
            method[m - 1] = method[m - 1] " " $0
        }
    }

    close(filename)

    buff = sprintf("| 函数名称 |　说明　| \n"\
                   "| ------- | -------- | \n")

    for (i = 1; i <= length(method); i++) {
        split(method[i], array, " ")
        new_data = array[2]
        gsub(/_/, "\\_", new_data)
        buff = buff sprintf("| <a href\"%s_%s\">%s</a> | %s | \n", class,
                            array[1], array[1], new_data)
    }

    for (i = 1; i<= length(method); i++) {
        split(method[i], array, " ")
        buff = buff sprintf("#### %s 函数\n\n", array[1])
        buff = buff sprintf("* 函数功能：\n\n")
        buff = buff sprintf("> <p id = \"%s_%s\"> %s\n\n", class, array[1], array[2])
        buff = buff sprintf("*　函数原型: \n\n")
        buff = buff output_function_proto(array[1], param, retvalue, i)
        buff = buff sprintf("参数说明：\n\n")
        buff = buff output_param_table(param, retvalue, i)
        buff = buff "\n"
    }

    return buff
}

function output_param_table(param, retvalue, i,
                            rettable, paramtable, buff, new_data, end)
{
    buff = sprintf("| 参数 | 类型 | 说明 |\n")
    buff = buff sprintf("| ------- | ---- | -------- |\n")

    split(retvalue[i], rettable, "  *")
    gsub(/_/, "\\_", rettable[1])
    gsub(/_/, "\\_", rettable[2])
       
    buff = buff sprintf("| 返回值 | %s | %s | \n", rettable[1], rettable[2])

    end = param_end(param, i)

    for (i = param_start(param, i); i < end; i++) {
        split(param[i], paramtable, "  *")
        gsub(/_/, "\\_", paramtable[1])
        gsub(/_/, "\\_", paramtable[2])
        gsub(/_/, "\\_", paramtable[3])
        buff = buff sprintf("| %s | %s | %s |\n", paramtable[2], paramtable[1], paramtable[3])
    }

    return buff
}

function parse_file(filename,
                    output_filename, method_buffer, method, method_index,
                    properties, properties_index, properties_buffer, i)
{
    start = 0
    method_index = 1
    properties_index = 1;
    
    data = filename
    gsub(".*/", "", data)

    class = ""
    file["class"] = sprintf("%s%s", data, "_class")
    file["properties"] = sprintf("%s%s", data, "_properties")
    file["event"] = sprintf("%s%s", data, "_event")
    file["method"] = sprintf("%s%s", data, "_method")

    state["class"] = 0
    state["properties"] = 0
    state["method"] = 0
    state["event"] = 0

    while (getline < filename > 0) {
        if ($0 ~ /^[ \t]*\/\*\*/) {
            start = 1
            continue
        }

        if ($0 ~ /\*\//) {
            start = 0
            if (current_state(state) != "") {
                if (current_state(state) == "method") {
                    method_buffer[method[method_index - 1]] = \
                        method_buffer[method[method_index - 1]] $0 "\n"
                } else if (current_state(state) == "properties") {
                    properties_buffer[properties[properties_index - 1]] = \
                    properties_buffer[properties[properties_index - 1]] $0
                } else {
                    print $0 > file[current_state(state)]
                }

                state[current_state(state)] = 0
            }
            continue
        }

        if (start == 0)
            continue

        if ($0 ~ /@class/) {
            class = $0
            gsub(/^.* /, "", class)
            set_state_and_add_to_file(state, "class", file, $0)
            continue
        } else if ($0 ~ /@property/) {
            properties[properties_index] = $0
            state["properties"] = 1
            properties_index++
            continue
        } else if ($0 ~ /@method/) {
            method[method_index] = $0
            state["method"] = 1
            method_index++
            continue
        } else if ($0 ~ /@event/) {
            set_state_and_add_to_file(state, "event", file, $0)
            continue
        }

        if (current_state(state) != "") {
            if (current_state(state) == "method") {
                method_buffer[method[method_index - 1]] = \
                method_buffer[method[method_index - 1]] $0 "\n"
            } else if (current_state(state) == "properties") {
                properties_buffer[properties[properties_index - 1]] =   \
                properties_buffer[properties[properties_index - 1]] $0 "\n"
            }
            else {
                print $0 > file[current_state(state)]
            }
        }
    }

    sort_by_key(method, length(method), "method_cmp")
    sort_by_key(properties, length(properties), "others")

    for (i = 1; i <= length(method); i++) {
        print method[i] " "
    }
    
    for (i = 1; i <= length(method); i++) {
        print method[i] > file["method"]
        print method_buffer[method[i]] > file["method"]
    }

    for (i = 1; i <= length(properties); i++) {
        print properties[i] > file["properties"]
        print properties_buffer[properties[i]] > file["properties"]
    }

    for (i in file) {
        close(file[i])
    }

    for (i in method_buffer) {
        delete method_buffer[i]
    }
    
    for (i in properties_buffer) {
        delete properties_buffer[i]
    }

    gsub(/.h$/, ".md", data)
    print make_class_data(file["class"], class) > data
    print make_method_data(file["method"], class) > data
    print make_event_data(file["event"], class) > data
    print make_properties_data(file["properties"], class) > data
}

function exchange_data(array, first, second, temp)
{
    temp = array[first]
    array[first] = array[second]
    array[second] = temp
}

function sort_by_key(array, len, cmp_type, i, j, first_string, second_string)
{
    for (i = 1; i <= len; i++) {
        for (j = i + 1; j <= len; j++) {
            first_string = array[j]
            second_string = array[i]

            if (cmp_type != "method_cmp") {
                gsub(/.* /, "", first_string)
                gsub(/.* /, "", second_string)
            }
            
            if (first_string > second_string) {
                exchange_data(array, j, i);
            }
        }
    }
}

BEGIN {
    for  (j = 1; j < ARGC; j++) {
        if (ARGV[j] ~ /^[a-zA-Z0-9][a-zA-Z0-9_.]{1,}/) {
            parse_file(ARGV[j])
        }
    }
}

END {
    buff = sprintf("rm -rf *.h_*")
    system(buff)
}
```

## 代码的主要工作流程
在上面的代码中，【parse_file】 函数中首先会按照上述类别将头文件中的信息分发到各个临时文件中存放。对于需要进行排序的内容，排序后写入文件中。

这之后，依次读入不同类别的临时文件，解析文件内容，生成新的内容，将新生成的内容存放到 【buff】 中，依次写入 【buff】 到同一文件中，最后【删除临时文件】就完成了所有的处理过程。

## 反思
上面的实现中，文件的读写使用了多次。

其实可以考虑另外一种实现。在这种实现中首先读入文件内容到内存中，然后按照类别处理，合并 buff 后写入文件即可。

在这种实现中，可以使用 gawk 的函数 index 与 substr 来完成。


