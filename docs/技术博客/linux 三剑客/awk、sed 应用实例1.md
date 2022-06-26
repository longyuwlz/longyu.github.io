# awk、sed 应用实例1
## 问题描述
昨天，一位群友在群里面问如何使用 sed 生成目标格式的问题。问题的详细描述如下：

一个文件中有多行数据，每一行数据的格式如下：

> a b c d
>  x y

输出数据格式如下：

> a_B b_I c_I d_E
>  v_B g_E

## 解决方案
通过对输入与输出的分析，不难看出开头的一个字段要添加 _B 后缀，中间字段添加 _I 后缀，末尾字段添加 _E 后缀。这种格式转换使用 sed 的话相对麻烦，因此我先使用 awk 解决了这个问题。

使用的 awk 脚本内容如下：
```awk
    {
    	if ($0 ~ /^$/)
            next
    
        if (NF == 1) {
            printf("%s_B\n", $1)
        } else if (NF == 2) {
            printf("%s_B ", $1)
            printf("%s_E\n", $2)
        } else {
            printf("%s_B ", $1)
            for (i = 2; i < NF; i++) {
                printf("%s_I ", $i)
            }
            printf("%s_E\n", $NF)
        }
    }
```
将上述脚本保存为 make.suffix.awk 文件，使用 gawk -f make.suffix.awk  filename 执行。

测试使用的输入文件的内容如下：

> a b c d 
> x y
>  x y z
>   a b c d e g e
>   x
>   y
>   x z
>   z x

执行结果如下：
```sh
    [longyu@debian:09:39:26] awk $ gawk -f make_suffix.awk data
    a_B b_I c_I d_E
    x_B y_E
    x_B y_I z_E
    a_B b_I c_I d_I e_I g_I e_E
    x_B
    y_B
    x_B z_E
    z_B x_E
```
## sed 如何解决
使用 sed 也能够解决这个问题。这里使用的 sed 脚本内容如下：
```sh
    /.*/{
        s/\([[:alpha:]]\{1,\}\) /\1_I /g
        s/[[:alpha:]]\{1,\}$/&_E/
        s/\(^[[:alpha:]]\{1,\}\)_[IE]/\1_B/
    }
```
执行示例如下：
```sh
    [longyu@debian:09:46:29] awk $ sed -f  sedsrc-make-suffix.sed   data
    a_B b_I c_I d_E
    x_B y_E
    x_B y_I z_E
    a_B b_I c_I d_I e_I g_I e_E
    x_B
    y_B
    x_B z_E
    z_B x_E
```
首先在所有的单词后面追加 _I，然后先处理结尾的 _E，最后替换行首的单词即可。


