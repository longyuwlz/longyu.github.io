# git 中子模块的使用
## 为什么要使用子模块
一个软件项目一般由许多模块构成，这些模块很多并不从头进行开发，而是选择使用开源的项目。

你可以在 github 中搜索符合需要的项目，然后将项目代码或相关文件放到工程中，这样做的话当使用的项目更新后你又需要重复添加新的文件到工程中，既不便于管理又常常会造成很多令人困扰的问题。

为了方便开发者在自己的项目中使用其它项目的代码或相关文件，git 中提供了子模块功能。在你的项目中需要使用到的其它项目都可以通过创建子模块的方式来添加，这样既可以方便的跟踪项目更新，也更利于管理自己的项目。子模块让开发者不用直接承受管理子项目的压力，开发者成为了一个间接的引用者，更多的时间与精力能够用在其它功能的实现上。

既然已经有了这样的功能可以用，那么这个功能该如何使用呢？下面便是我的一些经验之谈。

### 1.添加一个子模块
添加一个子模块意味着你需要在项目中保存外部项目的信息，例如名称、地址等。这些必要的信息描述了一个外部项目，你的项目通过这些信息与外部项目建立联系。

添加一个子模块你首先需要切换目录到本地的 git 项目中。然后执行下面的步骤：

##### 1. git submodule add
```sh
[longyu@debian:17:59:12] test $ git submodule add  https://github.com/longyuwlz/awtk_slider_circle.git awtk_slider_circle
正克隆到 'awtk_slider_circle'...
remote: Enumerating objects: 123, done.
remote: Counting objects: 100% (123/123), done.
remote: Compressing objects: 100% (83/83), done.
remote: Total 123 (delta 36), reused 119 (delta 32), pack-reused 0
接收对象中: 100% (123/123), 1.58 MiB | 364.00 KiB/s, 完成.
处理 delta 中: 100% (36/36), 完成.
检查连接... 完成。
```
执行 git status 命令有如下输出：

```sh
[longyu@debian:18:00:45] test $ git status
位于分支 master
要提交的变更：
  （使用 "git reset HEAD <file>..." 撤出暂存区）

	新文件：   .gitmodules
	新文件：   awtk_slider_circle
```
子项目已经从远端克隆到了本地，同时本地新建了 .gitmodules 文件，文件中保存着描述子模块的信息。这里我们可以查看下 .gitmodules 的内容。

```sh
[longyu@debian:18:01:02] test $ cat .gitmodules
[submodule "awtk_slider_circle"]
	path = awtk_slider_circle
	url = https://github.com/longyuwlz/awtk_slider_circle.git
```

第一行中描述子模块名称，第二行的 path 表示克隆到子项目的路径，第三行表示项目的地址。
##### 2. git commit 
添加了子模块之后，我们需要提交更改到项目中。示例如下：

```sh
[longyu@debian:18:00:47] test $ git commit -m "add awtk_slider_circle as submodule"
[master 85d81e4] add awtk_slider_circle as submodule
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 awtk_slider_circle
```
注意第一行输出说明了当前使用的分支及 commit 的 hash 值，这里使用的分支是 master ，你也可以使用其它分支上的 commit ，只需要在 commit 之前切换到相应分支即可。

### 2. 删除一个子模块
删除一个子模块并不常用，删除操作相较添加也更为繁琐。在 git 的子模块帮助手册中对删除子模块操作的步骤描述如下：

> 1. 从 .gitmodules 文件中删除相关的子模块描述信息
> 2. 从 .git/config 中删除关联部分
> 3. 执行 **git rm --cached path_to_submodule**（不要在子模块路径前后添加斜杠）
> 4. 提交变更到最外层项目中
> 5. 删除所有未追踪的子模块文件

注意 **.gitmodules** 这个文件在上文中已经描述过了，**.git/config**  文件却还没有提及。如果我们使用一个文本编辑器打开此文件，我们会发现其中有对分支与子模块的描述。我们不需要看分支相关行，只需要删除与待删除子模块有关的行即可。这一删除操作可以通过文本编辑器来操作，但并不推荐这种方式。最好使用 git 移除配置的命令来完成，这样可以最大程度避免人为遗漏的问题。这里使用的命令如下：

```sh
git config -f .git/config --remove-section submodule.submodulename
git config -f .gitmodules --remove-section submodule.submodulename
```
当本地项目中子模块未初始化时，**.git/config** 没有与对应子模块相关的信息，这样执行移除其中与子模块相关的内容会报 **No such section!** 的错误，这里直接执行后续操作即可。

我按照上面的方式操作，结果发现在执行第三步时会报错，报错信息如下：

> fatal: 请将您的修改缓存到 .gitmodules 中或保存进度后再继续

这个报错信息表明我应当提交当前的修改。我查看仓库状态，发现需要提交对 **.gitmodules** 的修改。提交之后，重新执行第三步中的命令，执行成功。

最后请注意最后一步删除的文件中还应该包含 **.git/submodules** 文件夹下的相关内容，不过如果未初始化且没有拉取子模块到本地，这个文件夹下一般是没有东西的，直接忽略即可！

### 3.克隆带有一个有子模块的项目
克隆带有一个子模块的项目大致可以按照子模块拉取的时间划分为两类。

第一类是在克隆项目的同时也递归的克隆子模块，第二类是先克隆项目，成功后再执行命令拉取子模块。

这里需要注意，子模块中可能仍旧会包含其它的子模块，因此这里的拉取操作应该是递归的，这样才能保证成功拉取到所有依赖的子模块。相关操作如下：

##### 1.克隆项目的同时递归克隆子模块

```sh
git clone --recursive project_path
```
##### 2.克隆项目成功后再拉取子模块

```sh
git clone repository
cd project_path
git submodule update --init --recursive
```
git 中子模块的常见操作到这里便叙述的七七八八，更详细的信息请参考 manual。

