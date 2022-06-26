# 生成 excel 表格时使用 awk 合并多行为单行
## 问题描述
dpdk release 页面中有 resolved issue 的信息，我需要整理这个信息并输出到一张 excel 表中供内部使用。我尝试使用脚本生成 excel 表。

## 确定方案
首先我从一个现有的 excel 中首先复制一整列，写入文件中，然后调用 cat -A 来查看文件的内容。 发现**不同的列中的项是使用 tab 来分割的**。

因此我只需要将字段的分割符设定为 tab，然后拷贝到 excel 中就可以被 excel 直接解析。

按照这个方案操作后，我遇到了一个问题。

在 dpdk release 页面中对 resolved issue 的描述中，问题与描述信息不在同一行，需要将问题与描述信息所在行合并为单行并使用 tab 来分割以粘贴到 excel 中，我选择使用 awk 来处理这个问题。

## 使用 awk 来合并多行为单行
下面的这个脚本中，excel 中一行的输出由下一行触发，这样的行为**在处理最后一行时会因为没有下一行内容而导致输出无法触发**。解决方法是在 while 中读取完所有的行之后，再次判断输出的条件是否成立，成立则触发一次打印。

有时间的话需要思考不使用正则表达式匹配的方式该如何实现。使用正则表达式来实现虽然很简单，但是不利于理解问题的本质。

代码内容如下：

```awk
#!/usr/bin/awk -f

BEGIN {
        new_line_flag = 0;
        while (getline $1 > 0)
        {
                if ($0 ~ /^[a-z].*:/) {
                        if (new_line_flag >= 1) {
                                print newline;
                                new_line_flag = 0;
                                newline=""
                        }
                        newline = $0;
                        new_line_flag = 1;
                        continue;

                }

                if (new_line_flag == 1) {
                        newline = newline "\t" $0;
                        new_line_flag++;
                } else {
                        newline = newline $0;
                }
        }

        if (new_line_flag >= 1) {
                print newline;
        }
}
```
## 复制内容格式问题
我在 git-bash 开启的 terminal 中执行上面的脚本处理，然后使用 cat 将文件的内容打印到终端中，然后复制粘贴到 excel 中，结果 excel 无法解析。

我觉得这应该是复制时 tab 的格式被改变了。

尝试使用 sublime_text 打开文件并复制粘贴，也没有得到正确的结果。最终我通过使 用 **notepad++** 完成了这个工作。


