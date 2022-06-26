# 嵌入式中 lst文件的创建与调试价值

在使用 **eclipse** 进行嵌入式开发时，有时会遇到程序跳入异常服务程序的情况。这种情况一旦出现，往往让人有点无处着力的感觉。可如果你了解 **lst** 文件，那么在这种情况下它往往能起到关键的作用。

**lst** 文件实际是使用 **objdump** 反汇编 **elf** 文件得到的输出文件，它拥有比 **map** 文件更详细的信息。如果你的程序中加入了调试信息，那么你可以在 lst 中看到每一条指令的地址。借助 **lst** 文件，同时通过查看栈帧结构（可以通过查看相应的手册来确定栈帧的组成），通过在 **lst** 文件中查找 **lr** 的地址所在的位置，你就能立刻定位到问题。

你可以在 **eclipse** 的工程配置中的 **Toolchains** 子菜单中选择 **Create extended listing** 选项，应用设置后切换到 **Tool Settings** 子菜单，你会发现下方多了一个 **GNU ARM Cross Create Listing** 选项，你可以在这个选项中指定更详细的信息。

下面是一个典型的命令行输出：

    Invoking: GNU ARM Cross Create Listing
    arm-none-eabi-objdump --source --all-headers --demangle --file-headers --line-numbers --wide "hello world.elf" > "hello world.lst"
    Finished building: hello world.lst

上述命令行使用 **objdump** 反汇编 **elf** 文件，然后将结果重定向为 **lst** 文件。你也可以直接使用命令行生成 **lst** 文件。


