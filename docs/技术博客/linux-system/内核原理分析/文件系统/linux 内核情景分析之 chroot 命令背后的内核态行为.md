# linux 内核情景分析之 chroot 命令背后的内核态行为
## 基础知识
1. [linux 命令分析之 chroot 的原理](https://blog.csdn.net/Longyu_wlz/article/details/109253298)
2. 目录访问的原理

关于目录访问的原理，我选择从《Linux 内核源代码情景分析》 第 5 章摘取如下内容进行说
明。

>要访问一个文件就得先访问一个目录，才能根据文件名从目录中找到该文件的目录项，进而
找到其 inode 节点：可是目录本身也是文件，它本身的目录项又在另一个目录项中，这一来不
是成了"先有鸡还是先有蛋的问题"，或者说递归了吗？这个圈子的出口在哪儿呢？

>我们不妨换一个方式来问这个问题，那就是：是否有这样一个目录，它本身的“目录项”不在其
它目录中，而可以在一个固定的位置上或者通过一个固定的算法找到，并且从这个目录出发可
以找到系统中的任何一个文件?

>答案是肯定的，这个目录就是系统的根目录“/”，或者说“根设备”上的根目录。系统在初始化的
时候会将一个存储设备挂载作为整个系统的“根设备”，它的根目录就成为了整个文件系统的“总
根”，就是“/”。

>有了根设备后还可以进而把其它存储设备也安装到文件系统中空闲的目录节点上。所谓的“安
装”，就是从一个存储设备上读入超级块，在内存够中建立起一个 super_block 结构。进而将
此设备上的根目录与文件系统中已经存在的一个空白目录挂上钩。系统初始化时整个文件系统
只有一个空白目录“/”，所以根设备的根目录就安装在这个节点上。

>这样，从根目录“/” 开始，按照指定的“全路径名”就可以找到系统中的任何一个文件，而不
论这个文件是在哪一个存储设备上，只要文件所在的存储设备已经安装就行了。

有了这些基础知识，在开始分析之前需要说明的是我使用的**内核代码版本是 linux-4.19**。

## chroot 系统调用的内核态行为
chroot 系统调用对应的内核函数为 **ksys_chroot**，此函数的功能实际上非常简单，主要过程描述如下：

1. 使用用户传入的路径名获取路径的 dentry 结构，填充到一个 path 结构体中
2. 检查是否有正确的权限
3. 调用 set_fs_root 设置当前进程 task_struct 中 fs 结构体中的 root 结构体内容
4. 调用 path_put 递减 path 结构体的引用计数后退出

ksys_chroot 的代码如下：

```c
int ksys_chroot(const char __user *filename)
{
        struct path path;
        int error;
        unsigned int lookup_flags = LOOKUP_FOLLOW | LOOKUP_DIRECTORY;
retry:
        error = user_path_at(AT_FDCWD, filename, lookup_flags, &path);
        if (error)
                goto out;

        error = inode_permission(path.dentry->d_inode, MAY_EXEC | MAY_CHDIR);
        if (error)
                goto dput_and_out;

        error = -EPERM;
        if (!ns_capable(current_user_ns(), CAP_SYS_CHROOT))
                goto dput_and_out;
        error = security_path_chroot(&path);
        if (error)
                goto dput_and_out;

        set_fs_root(current->fs, &path);
        error = 0;
dput_and_out:
        path_put(&path);
        if (retry_estale(error, lookup_flags)) {
                lookup_flags |= LOOKUP_REVAL;
                goto retry;
        }
out:
        return error;
}
```

在这个函数最后还有根据错误信息与标志检查是否重试的操作，加上这个操作代码仍旧非常简单。

## set_fs_root
这里关键的代码在于执行 set_fs_root 操作，它改变了当前进程 task_struct 结构体中的 fs 结构体中**根目录节点的 dentry 内容**。

set_fs_root 代码如下：

```c
void set_fs_root(struct fs_struct *fs, const struct path *path)
{
	struct path old_root;

	path_get(path);
	spin_lock(&fs->lock);
	write_seqcount_begin(&fs->seq);
	old_root = fs->root;
	fs->root = *path;
	write_seqcount_end(&fs->seq);
	spin_unlock(&fs->lock);
	if (old_root.dentry)
		path_put(&old_root);
}
```

这里在获取了 fs->lock 与 fs->seq lock 之后修改 fs 结构体中的 root 字段。

## path 结构体
root 字段是一个 path 结构体，这里重要的数据结构是 path 结构体，该结构体定义如下：

```c
struct path {
    struct vfsmount *mnt;
    struct dentry *dentry;
}__randomize_layout;
```

这里重点关注这个 dentry，**每一个目录与文件**都会建立一个 **dentry** 结构，根节点的 dentry 在固定的位置处，避免了自指的问题。

文件系统实际是一颗倒过来的树，我们访问一个**绝对路径**的文件会从根目录逐层向下找，最终的目标是找到目标节点的 dentry 结构体。

## chroot 作用于每个进程
同时注意每一个进程的 task_struct 中都有一个 fs 结构，这意味着 chroot 是向每一个进程提供的功能。实际上 chroot 是对每个进程根目录的限定，执行了 chroot 运行的进程及其子进程都被限定到了一个指定的目录中，外界目录对于 chroot 运行的程序是不可见的，增强了安全性。


上面大致描述了 ksys_chroot 的工作原理，实际上主要有两部分的内容，这两部分的内容可以用如下两个问题代替：

1. chroot 切换当前进程的 fs 结构体中的 root 字段，这个字段在哪里被使用？
2. chroot 创建的程序其子程序也同样被隔离到指定目录中的原因？

下面是我将通过分析内核源码，分别对这两个问题进行回答。

## chroot 切换当前进程的 fs 结构体中的 root 字段，这个字段在哪里被使用？

chroot 系统调用的源码在 fs/open.c 中，同时这个源文件中还有诸如 open、openat、creat、close、truncate、access、chdir、chmod 等等系统调用的代码，这些代码的功能都作用于**用户使用文件的第一步上**，**chroot 实际影响的也是这第一步**。

chroot 前后当前进程执行 open、openat、creat 系统调用的内核过程会有变化，这个变化正是我们**修改了当前进程 task_struct 结构体中 fs 结构体中的 root 字段带来的影响**。

open、creat、openat 都会调用 do_sys_open 函数，其主要过程如下：

1. do_sys_open 首先根据传入的参数制作 open_flags 结构体
2. 使用 open_flags 结构体为参数调用  get_unused_fd_flags 获取到一个空闲的描述符
3. 调用 do_filp_open 函数遍历文件系统目录树获取、创建一个 file 结构体，创建成功后将这个事件进行上报
4. 上报完成后将这个 file 结构体指针安装到当前进程的 fdtable 中的一个表项中

### do_filp_open
do_filp_open 函数调用 path_openat 来获取到一个 file 结构体，在 path_openat 中根据路径名访问目录树。

**do_filp_open** 遍历文件系统目录树的过程依赖一个名为 **nameidata** 的结构体来完成功能，在每一个进程的 task_struct 中有一个指向当前进程 **nameidata** 结构体的指针，**这种结构用来返回搜索的结果，最为重要的数据结构是 path 结构体与 inode 字段，其中保存了获取到的 vfs_mount 与 dentry 的信息以及 inode 结构体的信息。**

nameidata 结构体定义如下：

```c
struct nameidata {
	struct path	path;
	struct qstr	last;
	struct path	root;
	struct inode	*inode; /* path.dentry.d_inode */
	unsigned int	flags;
	unsigned	seq, m_seq;
	int		last_type;
	unsigned	depth;
	int		total_link_count;
	struct saved {
		struct path link;
		struct delayed_call done;
		const char *name;
		unsigned seq;
	} *stack, internal[EMBEDDED_LEVELS];
	struct filename	*name;
	struct nameidata *saved;
	struct inode	*link_inode;
	unsigned	root_seq;
	int		dfd;
} __randomize_layout;
```
do_file_open 函数遍历目录树前会调用 set_nameidata 更新当前进程的 nameidata 中的字段，并保存旧的几个重要状态在 saved 字段中。

set_nameidata 中的一个重要的操作是将待处理的 filename 结构体设定为当前要查找的 filename 结构体，当完成文件系统遍历后，又会调用 restore_nameidata 恢复旧的数据。

#### path_openat
对于一个普通文件来说，path_openat 通过如下代码遍历目录树来打开、创建一个文件。

```c
		const char *s = path_init(nd, flags);
		while (!(error = link_path_walk(s, nd)) &&
			(error = do_last(nd, file, op)) > 0) {
			nd->flags &= ~(LOOKUP_OPEN|LOOKUP_CREATE|LOOKUP_EXCL);
			s = trailing_symlink(nd);
		}
		terminate_walk(nd);
```

这几行代码中调用的函数都传入了一个 nd 参数，这个 nd 就是上面提到的当前进程的 nameidata 结构体的指针。

注意这里 path_openat 函数调用到的 **path_init** 函数，实际上**我们在 chroot 系统调用中设定的当前进程 fs 结构体中的 root 字段就是在 path_init 函数被使用的！**

#### path_init 函数
对于路径名以 / 开始的调用，path_init 首先会调用 **set_root** 来用当前进程中 fs 结构体中的 root 字段设定 nameidata 结构体中的字段。

相关代码如下：

```c
	if (*s == '/') {
		set_root(nd);
```
与此类似的使用**相对路径方式的路径名**，将会设定当前进程中 fs 结构体中的 pwd 字段到 nameidata 结构体的 path 字段中。

set_root 函数的代码如下所示：
```c
static void set_root(struct nameidata *nd)
{
	struct fs_struct *fs = current->fs;

	if (nd->flags & LOOKUP_RCU) {
		unsigned seq;

		do {
			seq = read_seqcount_begin(&fs->seq);
			nd->root = fs->root;
			nd->root_seq = __read_seqcount_begin(&nd->root.dentry->d_seq);
		} while (read_seqcount_retry(&fs->seq, seq));
	} else {
		get_fs_root(fs, &nd->root);
	}
}
```
从 path_init 函数返回后**搜索路径起点的 dentry** 就确定了，然后开始遍历目录树进行搜索，对于绝对路径名来说搜索将**从根目录的 dentry 开始**，这里使用的根目录的 **dentry** 实际上就是我们在 **chroot 中设定的新的根目录的 dentry 结构**，它将当前进程能够看到的目录树限制为旧的根目录中的**某个子树**。

后续过程相当复杂，与这里要说明的问题也关系不大，在这里结束这个问题的描述。 
## chroot 创建的程序其子程序也同样被隔离到指定目录中的原因
linux 系统中新的进程一般都是通过一个**现有的进程派生**出来的，由一个进程创建出来的进程一般被称为子进程。子进程的许多重要的数据结构都是从父进程继承过来的，对应这里，**子进程的 fs 结构体也是从父进程继承过来的**，因此**子进程**也**同样被隔离到指定目录中**。

**_do_fork** 中调用的 **copy_process** 完成了大部分的资源继承任务，在 **copy_process** 中与 fs 结构体相关的函数调用如下：


```c
	retval = copy_fs(clone_flags, p);
```
当 clone_flags 中的 CLONE_FS 标志未设定时父进程 task_struct 中的 fs 结构体才会被拷贝，**对于 fork、vfork 来说，CLONE_FS 标志均未设定**。

copy_fs 函数的代码如下：

```c
static int copy_fs(unsigned long clone_flags, struct task_struct *tsk)
{
	struct fs_struct *fs = current->fs;
	if (clone_flags & CLONE_FS) {
		/* tsk->fs is already what we want */
		spin_lock(&fs->lock);
		if (fs->in_exec) {
			spin_unlock(&fs->lock);
			return -EAGAIN;
		}
		fs->users++;
		spin_unlock(&fs->lock);
		return 0;
	}
	tsk->fs = copy_fs_struct(fs);
	if (!tsk->fs)
		return -ENOMEM;
	return 0;
}
```
对于需要继承父进程 fs 结构体的情况，这通过 **copy_fs_struct** 函数来完成，这个函数的代码非常简单，贴到下面并且不进一步分析了。

```c
struct fs_struct *copy_fs_struct(struct fs_struct *old)
{
	struct fs_struct *fs = kmem_cache_alloc(fs_cachep, GFP_KERNEL);
	/* We don't need to lock fs - think why ;-) */
	if (fs) {
		fs->users = 1;
		fs->in_exec = 0;
		spin_lock_init(&fs->lock);
		seqcount_init(&fs->seq);
		fs->umask = old->umask;

		spin_lock(&old->lock);
		fs->root = old->root;
		path_get(&fs->root);
		fs->pwd = old->pwd;
		path_get(&fs->pwd);
		spin_unlock(&old->lock);
	}
	return fs;
}
```
这样第二个问题也得到了回答。

## 总结
chroot 命令非常简单，但是其背后的内核态行为相当复杂。单就 ksys_chroot 函数代码量来说，其实并不算多，但是**要理解 ksys_chroot 对内核数据结构的修改对进程执行造成的影响**却不太简单，尤其当跟踪到文件系统后更显得困难重重。

linux 内核模块的分类其实做的很好，可以单独研究某个模块的功能原理，但是对于进程来说它使用到的内核资源是非常全面的，这些全面代表了非常复杂的联系网络，这是分析学习内核代码的一大难题。

对于某些代码的分析一定要**适可而止**，不然分析着分析着可能就忘记了最开始要研究的问题，这也算是**不忘初心**在分析内核代码时的一个展现吧！






