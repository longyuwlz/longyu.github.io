# 使用 ar 命令合并多个静态库
## 为什么要合并多个静态库

实际嵌入式项目开发中我们经常会使用静态库，这些静态库一般都是通过自动构建工具来生成。这种方式虽然很方便，但当静态库的数量非常多的时候管理起来就不太容易了。这时我们可以尝试将这些静态库进行合并，这样就能够减少静态库的数量，从而减轻【管理多个静态库的工作量】。

##  ar 命令

使用 GNU 编译套件来编译并打包生成静态库时，**ar** 命令完成打包生成静态库的任务。**ar** 命令既可以创建新的静态库，也可以查看、修改已经生成的静态库。这里要合并静态库从 **ar** 命令着手是一个比较好的方向。

## 查看命令说明文档

如果你是在 Windows 中使用交叉编译器来编译，那么你可以在编译器的安装目录的【share】子目录中找到 GNU 编译器相关的文档。**ar** 命令手册并不在独立的文档中，它在【**binutils.pdf**】 中。

查看与 **ar** 命令相关的部分，我发现 **ar** 命令可以使用脚本来进行控制。按照手册的描述，这里提到的脚本与 【**MRI "librarian"**】 程序使用的脚本一致。脚本实际非常简单，提供了几种不同的命令来使用。你可以在 **ar** 的交互式模式中输入这些命令来操作，也可以预先将这些命令写入到文件中，以这个文件来重定向标准输入也能完成控制，这里我使用后者。


## ar 控制脚本的主要内容

研究发现这个脚本的内容可以分为如下几个方面：

1. 使用 create、open 来指定一个当前使用的静态库，这个静态库是大部分其它命令需要的临时文件

	create 用于【创建】新的文件，open 用于【打开】已经存在的静态库。

2. 打开一个静态库后，你可以执行【添加、删除、替换、提取、查看】等命令

3. 执行 save 命令【保存修改】到文件中

4. 执行 end 退出 ar，并返回 0 表示操作成功执行。这个命令并不会保存输出文件。这也就意味着你在最后一次 save 命令执行后如果还执行了其它修改库的命令，这些修改将会【丢失】。

## 一个示例

下面是我用[【awtk】](https://github.com/zlgopen/awtk)编译出的静态库进行的测试。脚本内容如下：

```
    create  libawtk-all.a
    addlib  libassets.a
    addlib  libawtk.a
    addlib  libcommon.a
    addlib  libfont_gen.a
    addlib  libglad.a
    addlib  libgpinyin.a
    addlib  libimage_gen.a
    addlib  liblinebreak.a
    addlib  libnanovg.a
    addlib  libSDL2.a
    addlib  libstr_gen.a
    addlib  libtheme_gen.a
    save
    end
```

上述脚本将[【awtk】](https://github.com/zlgopen/awtk)中 lib 目录下的所有静态库合并为一个命名为 libawtk-all.a 的静态库。

## 执行结果

将上述文件保存为 **ar-sr**c 文件，执行 **ar -M < ar-src** 命令就能够完成静态库的合并。执行结果如下：

```sh
    [longyu@debian-10:15:36:48] lib $ ar -M < ar-src  && ls -lh libawtk-all.a
    -rw-r--r-- 1 longyu longyu 37M 8月   7 15:36 libawtk-all.a
    [longyu@debian-10:15:36:54] lib $ ar -t libawtk-all.a | head -n 2
    xml_theme_gen.o
    theme_gen.o
```

## 一个问题

如果你的编译参数中指定了 **-lto** 参数来进行链接时优化，执行 **ar** 命令的时候需要指定一个插件来加载链接时优化的信息，没有指定的话会有如下报错信息：

>xxx.o: plugin needed to handle lto object

Debian 10 中的 **ar manual** 中对这个参数也进行了说明。使用 GNU 编译套件的话，这个插件是 【**liblto_plugin.so.0.0.0**】 库。如果你是在 Windows上安装的交叉编译器，这个插件名称一般是 【**liblto_plugin-0.dll**】。指定这个文件作为 **--plugin** 的参数时要注意路径问题，路径正确就能够正常运行。

## 总结
**合并多个静态库有着实际的需求。这个需求的实现相对简单，从打包工具着手便找到了问题的解决方案，这就是解铃还须系铃人吧！**


