# gcc constructor 函数属性
constructor destructor constructor (priority)destructor (priority)

The constructor attribute causes the function to be called automatically be-fore execution enters main ().

Similarly, the destructor attribute causes thefunction to be called automatically after main () completes or exit ()is called. Functions with these attributes are useful for initializing data that is used im-plicitly during the execution of the program. You may provide an optional integer priority to control the order in which constructor and destructor functions are run.

A constructor with a smallerpriority number runs before a constructor with a larger priority number; the opposite relationship holds for destructors.

So, if you have a constructor that allocates a resource and a destructor that deallocates the same resource, both functions typically have the same priority.

The priorities for constructor and destructor functions are the same as those specified for namespace-scope Cobjects (seeSection 7.7 [CAttributes], page 797). However, at present, the order in which constructors for C++ objects with static storage duration and functions decorated with attribute constructor are invoked is unspecified. In mixed declarations, attribute init_priority can be used to impose a specific ordering.

## 总结
从一手资料中找到自己关注的点，这也是一大能力。在这一过程中重要的是**知道一手资料的位置**，并且知道**该怎样搜索**，对于最终结果的形式却不太过在意。

拿这篇博客来说，上方的英文是我从 gcc 用户手册中找到的与构造函数属性相关的描述，gcc 用户手册是这个问题中的一手资料，最终呈现的结果是英文的形式，有时我也考虑自己翻译翻译，但是最近想想真的要必要这样做吗？

将英文翻译为中文对我自己重要吗？我的答案是根本不重要，这是建立在我能够看的懂的基础上，不过我认为每一次的翻译过程确实都能够给我带来收获，但现实情况是我需要花更多的时间在阅读与思考之上。

以后可能很多问题要保持最初的形式，这没什么不好，可能对一些人来说算是点门槛，可我觉得如果想走的更远这点门槛还是需要努力越过的。

