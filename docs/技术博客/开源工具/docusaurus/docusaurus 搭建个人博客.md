# 使用 Docusaurus 与 github pages 快速上线个人博客站点

## 用 github pages 来做知识管理

最近几年，我输出了大量的文章，主要包含技术博客与随笔。随着文章数目的快速增加，如何呈现、管理这些内容变得更具挑战性。

技术博客主要在 csdn 输出，博客量目前接近 400 篇。工作时我常常需要在我的 csdn 博客里面搜索相关主题，也经常会把在 csdn 上发表的一些博客推送到其它的平台上发布。在这一过程中，我发现了如下几个痛点问题：

1. 在 csdn 里面搜索没有本地搜索效率高
2. 在 csdn 中上传的图片被打上了 csdn 的水印，转载到其它平台时颇有点不伦不类
3. csdn 文章的分类方式相对固定，文章的排布主要按照发布的顺序实行，不容易调整
4. csdn 上普通用户无法批量导出博文，不确定开了会员后是否支持
5. 我常常会对已经发布的博文进行修改， csdn 不支持查看文章的修改记录

基于如上的问题，我决定将我现有的文章迁移到新的平台上，我对这个平台的主要诉求如下：

1. 不需要掌握太多的网页设计知识就能上手，维护成本不要太高
2. 能够很好的兼容 markdown 文档
3. 能够跟踪文章的修改版本，便于回溯内容的变更过程
4. 能够批量的导出博文，搜索方便
5. 能够非常灵活的组织文档的目录结构

基于以上诉求，我在 google blogger、自己建站、notion、github pages、gitbooks 这几个可能的选项中选择了 **github pages**。

## 如何通过 github pages 来搭建个人博客？

确定了平台后，下一步就需要考虑如何将网站搭建起来？域名这块直接使用 [github.io](http://github.io/) 下的子域名即可，重点的问题变成了如何使用我现有的 markdown 文档将网站组织起来。
网上搜索到的基本流程如下：

1. 创建一个 github 项目（名字有讲究）
2. 在创建的 github 项目中通过分支来区分源码与静态网站，例如 main 分支用来开发，gh-pages 分支用来推送静态网站

经过一通搜索，我发现了 Docusaurus 这个东东，它的功能与我的诉求非常契合，于是决定使用 Docusaurus 来构建 github pages。

## Docusaurus 简介

🧐 Docusaurus 是一个静态网站生成器。它将你的网站构建成一个单页面应用程序（single-page application），具有快速地客户端导航功能并充分利用了 React 的强大能力，为你的网站赋予更好地交互性。虽然 Docusaurus 是为文档功能而生的，它也可以用来构建任何类型的网站（个人站点、产品介绍、博客、营销页面等）。

如上信息来自互联网，更多信息请访问 [Docusaurus 中文网](https://www.docusaurus.cn/)。

## 搭建好的网站截图

链接：[龙瑜的文字天下](https://longyuwlz.github.io/longyu.github.io/)

主页截图：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/733c33ba-ae53-4097-bcb4-819f28fac18e/Untitled.png)

dpdk 主题技术博客截图：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/00b41973-897c-48a4-823d-cdbc481cbe0e/Untitled.png)

blog 页面截图：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/110c2794-ec8b-4666-ad9e-0d7f785002d0/Untitled.png)

本地搜索功能截图：

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/721fef0c-1860-4883-a8fc-0ef1b1a9c8a1/Untitled.png)

## 搭建过程遇到的几个使用问题

1. Docusaurus 中的源 markdown 文档生成的页面题目使用主标题，如果主标题不存在则使用文件路径
2. [local](http://localhost) search 插件不支持全量搜索，它使用 nodejieba nodejs 插件来分词，nodejieba 的安装最好配置代理，不然容易失败
3. 自动 deploy 需要设定几个重要的环境变量，github 秘钥认证需要处理下，不然无法自动化
4. git 命令行中要正常显示中文文件名，需要执行 ```git config --global core.quotepath false``` 关闭 quotepath 功能
5. 当博客数量很多时，编译的时候，local search 生成 json 数据库的时间显著增加

## 在 debian11 服务器上部署我的 docusaurus 博客站点并配置自动推送

### 依赖工具安装

1. 命令行依赖工具

```bash
	apt install git make gcc g++ xz-utils
```

1. nodejs 新版本安装
    
    访问 [https://nodejs.org/en/](https://nodejs.org/en/)，下载 node-v16.15.1 LTS 版本。下载链接如下：
    
    [https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz](https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz)
    
    下载完成后解压到特定路径，然后修改 ~/.bashrc 文件，将 nodejs 相关可执行程序路径添加到 PATH 中。示例如下：
    
    ```bash
    NODEJS=/home/longyu/program/node-v16.15.1-linux-x64/bin
    export PATH=$NODEJS:$PATH
    ```
    

### 项目 clone

执行 git clone [https://github.com/longyuwlz/longyu.github.io.git](https://github.com/longyuwlz/longyu.github.io.git) 克隆我的 docusaurus 项目到本地，此时不能直接编译，需要先安装依赖的 node_modules。

### nodejs 插件安装

执行如下操作安装之：

```bash
npx create-docusaurus@latest my-website classic
cd ./my-website
npm install @cmfcmf/docusaurus-search-local
```

成功安装后将 node_modules 目录移动到克隆的 [longyu](https://www.notion.so/longyu.github.io).github.io 根目录中。国内安装 node_models 插件较慢，可以配置代理。

bash 中配置代理的方法如下：

```bash
export http_proxy=socks5://127.0.0.1:1080
export https_proxy=socks5://127.0.0.1:1080
```

docusaurus 本地搜索插件依赖 nodejieba 来分词，安装此插件可能会失败，可以参考 [https://gitee.com/yanyiwu/nodejieba](https://gitee.com/yanyiwu/nodejieba) 来安装它。

### 编译项目

进入 [longyu.github.io](http://longyu.github.io/) 目录中，执行 `npm run build`来编译，编译成功的主要日志如下：

```
> longyu-website@0.0.0 build
> docusaurus build
[INFO] [zh-Hans] Creating an optimized production build...
✔ Client
✔ Server
  Compiled successfully in 2.17m
✔ Client
● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
 stored
[Local Search] [INFO]: Gathering documents
[Local Search] [INFO]: Parsing documents
[Local Search] [INFO]: 3 indexes will be created.
[Local Search] [INFO]: Building index blog_posts_list (27 documents)
[Local Search] [INFO]: Building index default (27 documents)
[Local Search] [INFO]: Building index docs-default-current (1846 documents)
```

### 配置 deploy

1. 部署环境中执行 ssh-keygen 生成一个公钥
2. 登录到 github，在 Settings 的 Access 子页面中使用生成的公钥添加一个新的 SSH keys
3. 执行一次 `git clone --depth 1 --branch gh-pages [git@github.com](<mailto:git@github.com>):longyuwlz/longyu.github.io.git /tmp/longyu.github.io-gh-pagesUOkBdR-tes`完成认证过程（一定要执行这一步！！）
4. 终端设置 export USE_SSH=true
5. 执行 `npm run deploy`，基线数据如下
    
    ```
    longyu@localhost:~/longyu.github.io$ npm run deploy
    > longyu-website@0.0.0 deploy
    > docusaurus deploy
    [WARNING] When deploying to GitHub Pages, it is better to use an explicit "trailingSlash" site config.
    Otherwise, GitHub Pages will add an extra trailing slash to your site urls only on direct-access (not when navigation) with a server redirect.
    This behavior can have SEO impacts and create relative link issues.
    [INFO] Deploy command invoked...
    [INFO] organizationName: longyuwlz
    [INFO] projectName: longyu.github.io
    [INFO] deploymentBranch: gh-pages
    [INFO] Remote repo URL: git@github.com:longyuwlz/longyu.github.io.git
    94d1523b76596197b5d4db4c300fa326b683e723
    [INFO] `git rev-parse HEAD` code: 0
    [INFO] [zh-Hans] Creating an optimized production build...
    
    ✔ Client
    ✔ Server
      Compiled successfully in 2.04m
    ✔ Client
    ● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
     stored
    [SUCCESS] Generated static files in "build".
    [INFO] Use `npm run serve` command to test your build locally.
    Cloning into '/tmp/longyu.github.io-gh-pagesZKVJZJ'...
    [INFO] `git clone --depth 1 --branch gh-pages git@github.com:longyuwlz/longyu.github.io.git "/tmp/longyu.github.io-gh-pagesZKVJZJ"` code: 0
    ...............................................
    rm '那些年写的诗歌/软文一篇/index.html'
    [INFO] `git rm -rf .` code: 0
    ............................................
    [INFO] `git add --all` code: 0
    [gh-pages 92822d6] Deploy website - based on 94d1523b76596197b5d4db4c300fa326b683e723
     317 files changed, 4167 insertions(+), 4268 deletions(-)
     ...............................................................
     rewrite "\\351\\232\\217\\347\\254\\224/\\346\\203\\263\\345\\276\\227\\345\\215\\264\\344\\270\\215\\345\\217\\257\\345\\276\\227/index.html" (63%)
     rewrite "\\351\\232\\217\\347\\254\\224/\\346\\265\\205\\350\\260\\210\\351\\200\\211\\346\\213\\251/index.html" (63%)
    [INFO] `git commit -m "Deploy website - based on 94d1523b76596197b5d4db4c300fa326b683e723"` code: 0
    Warning: Permanently added the ECDSA host key for IP address 'xxx.xxx.xxx.xxx' to the list of known hosts.
    To github.com:longyuwlz/longyu.github.io.git
       4062f5c..92822d6  gh-pages -> gh-pages
    [INFO] `git push --force origin gh-pages` code: 0
    Website is live at "<https://longyuwlz.github.io/>".
    ```
    

### 配置定时 deploy

deploy 简易脚本：

```bash
#!/bin/bash

export PATH=/home/longyu/program/node-v16.15.1-linux-x64/bin:$PATH
export USE_SSH=true
cd /home/longyu/longyu.github.io

npm run deploy > ./deploy.log 2>&1
```

注意一定要配置 NODEJS 可执行文件路径到 PATH 中并添加可执行权限！contab -e 添加如下项目：

```bash
0 21 * * * /home/longyu/longyu.github.io/run_deploy.sh
```

配置在每天 21:00 执行 deploy！

## 总结

刚开始写博客的时候，核心问题是提高博文的数量与质量，当有一定量的积累后，如何更好的展示成为了一个新的核心问题。选择一个适合的平台更有利于长期发展，而 github pages 对我的博文来说就是一个非常好的平台。

对现有的博文进行平台迁移是一个相对痛苦的过程，可是如果现在不改变，当数量再增加一倍就更难改变了。这样一个过程让我更深刻的意识到，许多事情在不同的发展阶段面临的问题很不一样，个人需要持续改变下去，这样才能不断迈入更高的层次。

最近我在回顾过去写的文章的时候，发现内容是那样的稚嫩，现在再提笔当然比以前写得更好了，可是这一个过程并不是一蹴而就的，可文字是怎样变成现在这个样子的？我一点也说不清楚。这让我萌生了一个很好的想法，就是通过项目管理的方式来把自己博文的成长过程记录下来，让这个记录作为输入来进一步提高个人的能力，同时也期望将这些记录 share 出来，希望能够给其他有相同经历的人提供参考。

## 参考链接

[https://github.com/cmfcmf/docusaurus-search-local](https://github.com/cmfcmf/docusaurus-search-local)

[https://www.thelinuxfaq.com/npm/npm-packages/nodejieba](https://www.thelinuxfaq.com/npm/npm-packages/nodejieba)

[https://github.com/cmfcmf/docusaurus-search-local](https://github.com/cmfcmf/docusaurus-search-local)

[https://gitee.com/yanyiwu/nodejieba](https://gitee.com/yanyiwu/nodejieba)
