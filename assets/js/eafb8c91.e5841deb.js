"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[9951],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),d=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=d(e.components);return r.createElement(i.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=d(t),m=o,f=u["".concat(i,".").concat(m)]||u[m]||s[m]||l;return t?r.createElement(f,a(a({ref:n},c),{},{components:t})):r.createElement(f,a({ref:n},c))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var l=t.length,a=new Array(l);a[0]=u;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var d=2;d<l;d++)a[d]=t[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9633:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return p},metadata:function(){return d},toc:function(){return s}});var r=t(7462),o=t(3366),l=(t(7294),t(3905)),a=["components"],p={},i=void 0,d={permalink:"/longyu.github.io/blog/dpdk/\u5173\u95ed stdout \u5f15\u53d1\u7684\u707e\u96be",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/\u5173\u95ed stdout \u5f15\u53d1\u7684\u707e\u96be.md",source:"@site/blog/dpdk/\u5173\u95ed stdout \u5f15\u53d1\u7684\u707e\u96be.md",title:"dpdk/\u5173\u95ed stdout \u5f15\u53d1\u7684\u707e\u96be",description:"\u95ee\u9898\u63cf\u8ff0",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:13.295,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"\u73af\u5883\u4ecb\u7ecd",permalink:"/longyu.github.io/blog/dpdk/\u4f7f\u7528\u5185\u6838\u9a71\u52a8\u4e0a\u624b x710 flow directory \u529f\u80fd"},nextItem:{title:"dpdk/\u6740\u6389\u6570\u901a\u5f15\u64ce\u5bfc\u81f4\u865a\u62df\u673a\u91cd\u542f\u95ee\u9898\u5b9a\u4f4d",permalink:"/longyu.github.io/blog/dpdk/\u6740\u6389\u6570\u901a\u5f15\u64ce\u5bfc\u81f4\u865a\u62df\u673a\u91cd\u542f\u95ee\u9898\u5b9a\u4f4d"}},c={authorsImageUrls:[]},s=[{value:"\u95ee\u9898\u63cf\u8ff0",id:"\u95ee\u9898\u63cf\u8ff0",level:2},{value:"\u95ee\u9898\u6a21\u62df",id:"\u95ee\u9898\u6a21\u62df",level:2},{value:"\u5173\u95ed stdout \u5f71\u54cd\u5230\u4e86\u4ec0\u4e48\uff1f",id:"\u5173\u95ed-stdout-\u5f71\u54cd\u5230\u4e86\u4ec0\u4e48",level:3},{value:"\u4e3a\u4ec0\u4e48\u5173\u95ed stdout \u4f1a\u5e26\u6765\u5982\u6b64\u5927\u7684\u5f71\u54cd\u5462\uff1f",id:"\u4e3a\u4ec0\u4e48\u5173\u95ed-stdout-\u4f1a\u5e26\u6765\u5982\u6b64\u5927\u7684\u5f71\u54cd\u5462",level:2},{value:"\u4e3a\u4ec0\u4e48 dpdk primary \u8fdb\u7a0b\u672a\u5173\u95ed rte_config \u6587\u4ef6?",id:"\u4e3a\u4ec0\u4e48-dpdk-primary-\u8fdb\u7a0b\u672a\u5173\u95ed-rte_config-\u6587\u4ef6",level:2},{value:"\u771f\u5b9e\u73af\u5883\u4e2d\u7684\u95ee\u9898",id:"\u771f\u5b9e\u73af\u5883\u4e2d\u7684\u95ee\u9898",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],u={toc:s};function m(e){var n=e.components,t=(0,o.Z)(e,a);return(0,l.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u95ee\u9898\u63cf\u8ff0"},"\u95ee\u9898\u63cf\u8ff0"),(0,l.kt)("p",null,"2021 \u5e74\u524d\u7684 dpdk \u7248\u672c\u4e2d\u9ed8\u8ba4\u7684 log \u4e3a ",(0,l.kt)("strong",{parentName:"p"},"stdout"),"\uff0c\u5728\u5b9e\u9645\u4f7f\u7528\u4e2d\u53d1\u73b0\u5728",(0,l.kt)("strong",{parentName:"p"},"\u8c03\u7528 rte_eal_init \u4e4b\u524d\u5173\u95ed stdout \u65f6"),"\uff0cdpdk \u7a0b\u5e8f",(0,l.kt)("strong",{parentName:"p"},"\u8fd0\u884c\u5f02\u5e38"),"\u3002"),(0,l.kt)("p",null,"\u8868\u9762\u4e0a\u770b\u6709\u70b9\u532a\u5937\u6240\u601d\uff0c\u771f\u6b63\u7814\u7a76\u8d77\u6765\u7adf\u7136\u53d1\u73b0\u5728 dpdk \u7684\u6846\u67b6\u4e2d\u8fd9\u4e2a\u95ee\u9898\u7b97\u662f\u4e00\u4e2a\u6b63\u5e38\u7684\u73b0\u8c61\uff0c\u8ba9\u4eba\u5fcd\u4e0d\u4f4f\u53f9\u4e86\u53f9\u6c14~"),(0,l.kt)("p",null,"\u5728\u672c\u6587\u4e2d\u6211\u5c06\u63a2\u8ba8\u4e0b\u8fd9\u4e2a\u6b63\u5e38\u7684\u5f02\u5e38\u73b0\u8c61\uff0c\u540c\u65f6\u4e5f\u5f15\u7533\u63cf\u8ff0\u4e00\u4e2a\u771f\u5b9e\u573a\u666f\u4e2d\u7684\u95ee\u9898\u3002"),(0,l.kt)("h2",{id:"\u95ee\u9898\u6a21\u62df"},"\u95ee\u9898\u6a21\u62df"),(0,l.kt)("p",null,"\u4fee\u6539 dpdk-19.11.1 \u7248\u672c l2fwd \u793a\u4f8b\u7a0b\u5e8f\u4ee3\u7801\uff0c\u4ee3\u7801\u4fee\u6539\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"Index: examples/l2fwd/main.c\n===================================================================\n--- examples/l2fwd/main.c\n+++ examples/l2fwd/main.c\n@@ -530,6 +530,8 @@\n        unsigned int nb_lcores = 0;\n        unsigned int nb_mbufs;\n\n+       close(1);\n")),(0,l.kt)("p",null,"\u8fd0\u884c l2fwd \u540e\u53d1\u73b0\u7a0b\u5e8f\u5361\u4f4f\uff0c\u5361\u4f4f\u7684\u4f4d\u7f6e\u4e0e\u53cd\u6c47\u7f16\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},'Thread 1 (Thread 0x7f84b9150440 (LWP 33746) "l2fwd"):\n#0  0x0000000000654d59 in rte_eal_memzone_init ()\n#1  0x00000000006463a5 in rte_eal_init ()\n#2  0x000000000049255c in main ()\n(gdb) disass\nDump of assembler code for function rte_eal_memzone_init:\n   0x0000000000654d30 <+0>:     push   %rbx\n   0x0000000000654d31 <+1>:     sub    $0x10,%rsp\n   0x0000000000654d35 <+5>:     call   0x645340 <rte_eal_get_configuration>\n   0x0000000000654d3a <+10>:    mov    $0xffffffff,%ecx\n   0x0000000000654d3f <+15>:    mov    0x438(%rax),%rbx\n   0x0000000000654d46 <+22>:    lea    0x10(%rbx),%rdx\n   0x0000000000654d4a <+26>:    mov    (%rdx),%eax\n   0x0000000000654d4c <+28>:    test   %eax,%eax\n   0x0000000000654d4e <+30>:    mov    %eax,(%rsp)\n   0x0000000000654d51 <+33>:    je     0x654d5e <rte_eal_memzone_init+46>\n   0x0000000000654d53 <+35>:    pause\n   0x0000000000654d55 <+37>:    mov    (%rdx),%eax\n   0x0000000000654d57 <+39>:    test   %eax,%eax\n=> 0x0000000000654d59 <+41>:    mov    %eax,(%rsp)\n   0x0000000000654d5c <+44>:    jne    0x654d53 <rte_eal_memzone_init+35>\n   0x0000000000654d5e <+46>:    mov    (%rsp),%eax\n   0x0000000000654d61 <+49>:    lock cmpxchg %ecx,(%rdx)\n   0x0000000000654d65 <+53>:    jne    0x654da8 <rte_eal_memzone_init+120>\n   0x0000000000654d67 <+55>:    call   0x646910 <rte_eal_process_type>\n   0x0000000000654d6c <+60>:    test   %eax,%eax\n')),(0,l.kt)("p",null,"\u5c06\u53cd\u6c47\u7f16\u7684\u7ed3\u679c\u4e0e\u6e90\u4ee3\u7801\u6bd4\u5bf9\uff0c\u786e\u8ba4\u5361\u5728\u5982\u4e0b\u4ee3\u7801\u5904\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"    rte_rwlock_write_lock(&mcfg->mlock);\n")),(0,l.kt)("p",null,"\u6b64\u65f6 ps \u68c0\u7d22\u5230 l2fwd \u7a0b\u5e8f\u7684 pid \u4e3a 33746\uff0c\u67e5\u770b /proc/33746/fd \u76ee\u5f55\u5185\u5bb9\uff0c\u6536\u96c6\u5230\u5982\u4e0b\u5173\u952e\u4fe1\u606f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"root@debian:/home/longyu/# ls -lh /proc/33746/fd/\ntotal 0\nlrwx------ 1 root root 64 Apr 20 04:39 0 -> /dev/pts/0\nlrwx------ 1 root root 64 Apr 20 04:40 1 -> /run/dpdk/rte/config\nlrwx------ 1 root root 64 Apr 20 04:40 2 -> /dev/pts/0\nlr-x------ 1 root root 64 Apr 20 04:40 3 -> 'pipe:[173766]'\nl-wx------ 1 root root 64 Apr 20 04:40 4 -> 'pipe:[173766]'\nlrwx------ 1 root root 64 Apr 20 04:40 5 -> 'anon_inode:[timerfd]'\nlrwx------ 1 root root 64 Apr 20 04:40 6 -> 'socket:[173775]'\nlrwx------ 1 root root 64 Apr 20 04:40 7 -> 'socket:[173770]'\nlrwx------ 1 root root 64 Apr 20 04:40 8 -> 'anon_inode:[eventpoll]'\nlr-x------ 1 root root 64 Apr 20 04:40 9 -> /dev/hugepages**\n")),(0,l.kt)("p",null,"\u53ef\u4ee5\u770b\u5230 ",(0,l.kt)("strong",{parentName:"p"},"/run/dpdk/rte/config")," \u6587\u4ef6\u7684 fd \u4e3a 1\uff0c\u6070\u597d\u5bf9\u5e94\u5173\u95ed\u7684 stdout \u63cf\u8ff0\u7b26\u3002\u5728\u6b64\u57fa\u7840\u4e0a\uff0c\u4f7f\u7528 od -c \u67e5\u770b ",(0,l.kt)("strong",{parentName:"p"},"/run/dpdk/rte/config")," \u6587\u4ef6\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"root@debian:/home/longyu/# od -c /run/dpdk/rte/config\n0000000   E   A   L   :       P   r   o   b   i   n   g       V   F   I\n0000020   O       s   u   p   p   o   r   t   .   .   .  \\n  \\0  \\0  \\0\n0000040  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0\n*\n0040300  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0 260 377 276 376   ?  \\0  \\0\n0040320  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0  \\0\n*\n0040400\n")),(0,l.kt)("p",null,"\u53ef\u4ee5\u770b\u5230 ",(0,l.kt)("strong",{parentName:"p"},"rte_config")," \u6587\u4ef6\u6700\u5f00\u59cb\u7684\u5185\u5bb9\u53d8\u4e3a\u4e86 ",(0,l.kt)("strong",{parentName:"p"},"EAL:Probing VFIO support..."),"\uff0c\u7ed3\u5408\u4e0a\u6587\u4e2d\u63cf\u8ff0\u7684 l2fwd \u5361\u5728 ",(0,l.kt)("strong",{parentName:"p"},"rte_rwlock_write_lock")," \u7684\u73b0\u8c61\uff0c\u53ef\u4ee5\u660e\u786e\u5361\u4f4f\u7684\u539f\u56e0\u662f\u83b7\u53d6\u4e0d\u5230 ",(0,l.kt)("strong",{parentName:"p"},"mlock")," \u7684\u5199\u9501\u3002"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"rte_config")," \u6587\u4ef6\u5728 dpdk \u4e2d\u88ab\u6620\u5c04\u4e3a\u4e00\u4e2a ",(0,l.kt)("strong",{parentName:"p"},"rte_mem_config")," \u7ed3\u6784\uff0c\u6b64\u7ed3\u6784\u7684\u5b9a\u4e49\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"struct rte_mem_config {\n    volatile uint32_t magic;   /**< Magic number - sanity check. */\n    uint32_t version;\n    /**< Prevent secondary processes using different DPDK versions. */\n\n    /* memory topology */\n    uint32_t nchannel;    /**< Number of channels (0 if unknown). */\n    uint32_t nrank;       /**< Number of ranks (0 if unknown). */\n\n    /**\n     * current lock nest order\n     *  - qlock->mlock (ring/hash/lpm)\n     *  - mplock->qlock->mlock (mempool)\n     * Notice:\n     *  *ALWAYS* obtain qlock first if having to obtain both qlock and mlock\n     */\n    rte_rwlock_t mlock;   /**< used by memzones for thread safety. */\n")),(0,l.kt)("p",null,"\u4e00\u4e2a rte_rwlock_t \u7684\u5927\u5c0f\u662f 4 \u4e2a\u5b57\u8282\uff0c\u5b83\u7531\u4e00\u4e2a CNT \u53d8\u91cf\u7ec4\u6210\u3002\u5728",(0,l.kt)("a",{parentName:"p",href:"https://blog.csdn.net/Longyu_wlz/article/details/124261738?spm=1001.2014.3001.5501"},"\u7a0b\u5e8f\u542f\u52a8\u987a\u5e8f\u5f15\u53d1\u7684\u8840\u6848\u4e4b dpdk \u8fdb\u7a0b\u6b7b\u9501")," \u8fd9\u7bc7\u6587\u7ae0\u4e2d\uff0c\u6211\u63cf\u8ff0\u8fc7 dpdk \u5185\u90e8\u5b9e\u73b0\u7684\u8bfb\u5199\u9501\u673a\u5236\u5982\u4e0b\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u4e00\u628a\u9501\u7531\u4e00\u4e2a\u5b9a\u4e49\u4e3a volatile \u7684 32 \u4f4d\u8ba1\u6570\u503c\u63cf\u8ff0\uff0c\u5b9a\u4e49\u4e3a volatile \u9650\u5b9a\u6bcf\u6b21\u90fd\u4ece\u5185\u5b58\u4e2d\u8bfb\u53d6\u6b64\u8ba1\u6570\u503c"),(0,l.kt)("li",{parentName:"ol"},"\u8ba1\u6570\u503c\u4e3a 0 \u8868\u660e\u6ca1\u6709\u4eba\u5360\u6709\u9501\uff0c\u8ba1\u6570\u503c\u5927\u4e8e 0 \u8868\u660e\u6709\u8bfb\u8005\u5360\u7528\uff0c\u8ba1\u6570\u503c\u5c0f\u4e8e 0 \u8868\u660e\u6709\u5199\u8005\u5360\u7528"),(0,l.kt)("li",{parentName:"ol"},"\u83b7\u53d6\u8bfb\u9501\u901a\u8fc7\u539f\u5b50\u64cd\u4f5c\u7ed9\u8ba1\u6570\u503c\u52a0 1\uff0c\u83b7\u53d6\u5199\u9501\u901a\u8fc7\u539f\u5b50\u64cd\u4f5c\u7ed9\u8ba1\u6570\u503c\u51cf 1"),(0,l.kt)("li",{parentName:"ol"},"\u83b7\u53d6\u5199\u9501\u7684\u65f6\u5019\u4e0d\u80fd\u6709\u4eba\u8bfb\u3001\u5199\uff0c\u83b7\u53d6\u8bfb\u9501\u7684\u65f6\u5019\u4e0d\u80fd\u6709\u4eba\u5199\uff0c\u6761\u4ef6\u4e0d\u6210\u7acb\u5219\u4e00\u76f4\u91cd\u8bd5")),(0,l.kt)("p",null,"\u6839\u636e\u6b64\u65f6 ",(0,l.kt)("strong",{parentName:"p"},"rte_config \u6587\u4ef6\u7684\u5185\u5bb9\u4e0e mlock \u5728 rte_mem_config \u4e2d\u7684\u504f\u79fb"),"\uff0c\u53ef\u4ee5\u786e\u5b9a\u6b64\u65f6 mlock \u4e2d cnt \u7684\u503c\u4e3a ",(0,l.kt)("strong",{parentName:"p"},'" sup"'),"\uff0c\u6b64\u503c",(0,l.kt)("strong",{parentName:"p"},"\u4e0d\u4e3a 0")," \u8868\u660e\u6709\u4eba\u5360\u4e86\u9501\uff0c\u4ece\u800c\u5bfc\u81f4\u83b7\u53d6\u5199\u9501\u5931\u8d25\uff0cl2fwd \u7a0b\u5e8f\u6b7b\u9501\u3002"),(0,l.kt)("h3",{id:"\u5173\u95ed-stdout-\u5f71\u54cd\u5230\u4e86\u4ec0\u4e48"},"\u5173\u95ed stdout \u5f71\u54cd\u5230\u4e86\u4ec0\u4e48\uff1f"),(0,l.kt)("p",null,"\u5728\u4e0a\u6587\u4e2d\uff0c\u6211\u901a\u8fc7\u8bbf\u95ee ",(0,l.kt)("strong",{parentName:"p"},"/proc")," \u76ee\u5f55\u67e5\u770b\u5230\u4e86 l2fwd \u8fd0\u884c\u65f6 ",(0,l.kt)("strong",{parentName:"p"},"rte_config")," \u6587\u4ef6\u7684 fd \u4e3a 1\uff0c\u800c stdout \u5bf9\u5e94\u7684\u63cf\u8ff0\u7b26\u4e5f\u662f 1\u3002"),(0,l.kt)("p",null,"\u540c\u65f6\u6211\u5728 dpdk \u4ee3\u7801\u4e2d\u641c\u7d22 ",(0,l.kt)("strong",{parentName:"p"},'"Probing VFIO support"'),"\uff0c\u641c\u7d22\u5230\u5982\u4e0b\u4ee3\u7801\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},'RTE_LOG(INFO, EAL, "Probing VFIO support...\\n");\n')),(0,l.kt)("p",null,"\u8fdb\u4e00\u6b65\u9605\u8bfb\u4ee3\u7801\u786e\u8ba4\u4e0a\u8ff0\u4fe1\u606f\u5c06\u4f1a\u8f93\u51fa\u5230 stdout \u4e2d\uff0c\u800c\u6b64\u65f6\u7531\u4e8e stdout \u5bf9\u5e94\u7684 fd 1 \u5bf9\u5e94\u7684\u662f rte_config \u6587\u4ef6\uff0c\u5219 ",(0,l.kt)("strong",{parentName:"p"},"stdout \u7684\u8f93\u51fa\u5185\u5bb9\u4f1a\u8f93\u51fa\u5230 rte_config \u6587\u4ef6\u4e2d"),"\uff0c\u8fdb\u800c\u8986\u76d6 ",(0,l.kt)("strong",{parentName:"p"},"dpdk")," \u5185\u90e8 ",(0,l.kt)("strong",{parentName:"p"},"rte_mem_config")," \u7ed3\u6784\u7684\u5185\u5bb9\uff0c\u5bfc\u81f4 mlock \u5b57\u6bb5\u7684\u503c\u88ab\u5f02\u5e38\u8986\u76d6\uff0c\u5bfc\u81f4 dpdk \u8fdb\u7a0b\u6b7b\u9501\u3002"),(0,l.kt)("p",null,"\u8fd9\u4e00\u5207\u7684\u89e6\u53d1\u56e0\u7d20\u4ec5\u4ec5\u662f\u5728\u8c03\u7528 rte_eal_init \u524d\u5173\u95ed\u4e86 stdout \u63cf\u8ff0\u7b26\uff0c\u800c dpdk \u4e5f\u5e76\u6ca1\u6709\u660e\u786e\u9650\u5b9a\u4e0d\u80fd\u5173\u95ed\uff0c\u96be\u9053\u8fd9\u662f\u4e00\u79cd\u6f5c\u89c4\u5219\uff1f\u90a3\u4e3a\u4f55\u4f1a\u6709\u8fd9\u6837\u7684\u8868\u73b0\u5462\uff1f"),(0,l.kt)("p",null,"\u8fd9\u4e2a\u95ee\u9898\u7684\u8868\u9762\u539f\u56e0\u662f dpdk \u7684\u5185\u90e8 log \u8f93\u51fa\u5230 stdout\uff0c\u67e5\u9605 dpdk git log\uff0c\u53d1\u73b0\u9488\u5bf9\u9ed8\u8ba4\u7684 log \u6709\u5982\u4e0b commit\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"commit 5988725d0efeb7021670986aafeb3ff3d87839e1\nAuthor: Ferruh Yigit <ferruh.yigit@intel.com>\nDate:   Tue Feb 9 15:06:20 2021 +0000\n\n    log/linux: make default output stderr\n    \n    In Linux by default DPDK log goes to stdout, as well as syslog.\n    \n    It is possible for an application to change the library output stream\n    via 'rte_openlog_stream()' API, to set it to stderr, it can be used as:\n    rte_openlog_stream(stderr);\n    \n    But still updating the default log output to 'stderr'.\n    \n    Bugzilla ID: 8\n    Fixes: af75078fece3 (\"first public release\")\n    Cc: stable@dpdk.org\n    \n    Reported-by: Alexandre Ferrieux <alexandre.ferrieux@orange.com>\n    Signed-off-by: Ferruh Yigit <ferruh.yigit@intel.com>\n")),(0,l.kt)("p",null,"\u6b64 commit \u5c06 dpdk \u9ed8\u8ba4 log \u8bbe\u7f6e\u4e3a stderr\uff0c\u6b64\u65f6\u8981\u590d\u73b0\u76f8\u540c\u7684\u95ee\u9898\uff0c\u53ea\u9700\u8981\u5c06 close \u7684\u63cf\u8ff0\u7b26\u6539\u4e3a stderr \u5373\u53ef\uff01"),(0,l.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u5173\u95ed-stdout-\u4f1a\u5e26\u6765\u5982\u6b64\u5927\u7684\u5f71\u54cd\u5462"},"\u4e3a\u4ec0\u4e48\u5173\u95ed stdout \u4f1a\u5e26\u6765\u5982\u6b64\u5927\u7684\u5f71\u54cd\u5462\uff1f"),(0,l.kt)("p",null,"\u5728 ",(0,l.kt)("a",{parentName:"p",href:"https://blog.csdn.net/Longyu_wlz/article/details/124261738?spm=1001.2014.3001.5501"},"\u7a0b\u5e8f\u542f\u52a8\u987a\u5e8f\u5f15\u53d1\u7684\u8840\u6848\u4e4b dpdk \u8fdb\u7a0b\u6b7b\u9501")," \u8fd9\u7bc7\u6587\u7ae0\u4e2d\uff0c\u6211\u63cf\u8ff0\u4e86 dpdk \u5185\u90e8\u591a\u8fdb\u7a0b\u4e4b\u95f4\u5171\u4eab\u7684\u6570\u636e\u7ed3\u6784\uff0c\u6838\u5fc3\u7684\u7ed3\u6784\u56fe\u5982\u4e0b\uff1a\n",(0,l.kt)("img",{parentName:"p",src:"https://img-blog.csdnimg.cn/271474e9e9b54b6cbf480f19fa445641.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_20,color_FFFFFF,t_70,g_se,x_16",alt:"\u5728\u8fd9\u91cc\u63d2\u5165\u56fe\u7247\u63cf\u8ff0"}),"rte_config \u7ed3\u6784\u5728\u591a\u4e2a dpdk \u8fdb\u7a0b\u4e4b\u95f4\u5171\u4eab\uff0c\u5176\u6838\u5fc3\u601d\u60f3\u662f\u591a\u4e2a\u8fdb\u7a0b mmap \u76f8\u540c\u7684\u6587\u4ef6\u5230\u7279\u5b9a\u7684\u5730\u5740\u6765\u5171\u4eab\u5185\u5b58\u3002"),(0,l.kt)("p",null,"\u6838\u5fc3\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"}," 305     const char *pathname = eal_runtime_config_path();\n.........\n 310     if (mem_cfg_fd < 0){\n 311         mem_cfg_fd = open(pathname, O_RDWR);\n.........\n 278     mapped_mem_cfg_addr = mmap(rte_mem_cfg_addr,\n 279             cfg_len_aligned, PROT_READ | PROT_WRITE,\n 280             MAP_SHARED | MAP_FIXED, mem_cfg_fd, 0);\n")),(0,l.kt)("p",null,"\u4ee3\u7801\u7ec6\u8282\u4e0d\u7528\u8d58\u8ff0\u3002\u5f53\u5728\u6267\u884c rte_eal_init \u51fd\u6570\u524d\u5173\u95ed stdout \u65f6\uff0c\u5185\u6838\u56de\u6536 1 \u53f7\u63cf\u8ff0\u7b26\uff0c\u6b64\u65f6\u53ef\u7528\u7684\u6700\u5c0f\u7684 fd \u5c31\u662f 1\u3002"),(0,l.kt)("p",null,"dpdk \u5728\u6253\u5f00 rte_config \u6587\u4ef6\u65f6\u5206\u914d\u5230\u7684 fd \u4e3a 1\uff0c\u800c stdout \u5bf9\u5e94\u7684\u4e5f\u662f 1\u3002\u6b64\u540e dpdk \u7ee7\u7eed\u521d\u59cb\u5316\uff0c",(0,l.kt)("strong",{parentName:"p"},"\u5185\u90e8 log \u4fe1\u606f\u8f93\u51fa\u5230 stdout \u4e2d\u7684\u6548\u679c\u5c31\u662f\u5199\u5165\u5230 rte_config \u6587\u4ef6\u4e2d"),"\uff0c\u5bfc\u81f4 dpdk \u5185\u90e8 ",(0,l.kt)("strong",{parentName:"p"},"rte_mem_config")," \u7684\u5185\u5bb9\u88ab\u7834\u574f\uff0c\u8fdb\u7a0b\u5f02\u5e38\uff01"),(0,l.kt)("p",null,"\u4e00\u4e2a\u975e\u5e38\u660e\u663e\u7684\u65b9\u6848\u662f\u5728 rte_config_init \u540e close \u6389 rte_config \u6587\u4ef6\uff0c\u53ef\u662f\u771f\u7684\u53ef\u884c\u5417\uff1f"),(0,l.kt)("h2",{id:"\u4e3a\u4ec0\u4e48-dpdk-primary-\u8fdb\u7a0b\u672a\u5173\u95ed-rte_config-\u6587\u4ef6"},"\u4e3a\u4ec0\u4e48 dpdk primary \u8fdb\u7a0b\u672a\u5173\u95ed rte_config \u6587\u4ef6?"),(0,l.kt)("p",null,"dpdk primary \u8fdb\u7a0b\u521b\u5efa rte_config \u6587\u4ef6\u7528\u4e8e\u591a\u8fdb\u7a0b\u95f4\u5171\u4eab rte_mem_config \u7ed3\u6784\u7684\u4e3b\u8981\u8fc7\u7a0b\u5982\u4e0b\u56fe\uff1a\n",(0,l.kt)("img",{parentName:"p",src:"https://img-blog.csdnimg.cn/9da9f2241bed4db487bbf4f222de94b2.png#pic_center",alt:"\u5728\u8fd9\u91cc\u63d2\u5165\u56fe\u7247\u63cf\u8ff0"}),"\u5728\u4e0a\u8ff0\u7684\u6d41\u7a0b\u4e2d\uff0cdpdk primary \u8fdb\u7a0b\u4f1a\u4e3a rte_config \u6587\u4ef6\u6620\u5c04\u5230\u7684 rte_mem_config \u7ed3\u6784\u4e2d\u7684 memsegs \u5b57\u6bb5\u83b7\u53d6\u5199\u6587\u4ef6\u9501\uff0c\u8fd9\u628a\u9501dpdk  \u7528\u4e8e\u81ea\u52a8\u68c0\u6d4b\u8fdb\u7a0b\u5c5e\u4e8e secondary \u8fdb\u7a0b\u8fd8\u662f primary \u8fdb\u7a0b\u3002\u53ea\u6709 primary \u8fdb\u7a0b\u624d\u80fd\u6210\u529f\u83b7\u53d6\u5230\u9501\uff0c\u540c\u65f6 primary \u8fdb\u7a0b\u4fdd\u8bc1\u5728\u8fd0\u884c\u671f\u95f4\u4e0d\u4f1a\u5173\u95ed rte_config \u6587\u4ef6\u3002"),(0,l.kt)("p",null,"dpdk \u81ea\u52a8\u68c0\u6d4b\u8fdb\u7a0b\u7c7b\u578b\u7684\u51fd\u6570\u5b9e\u73b0\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},'/* Detect if we are a primary or a secondary process */\nenum rte_proc_type_t\neal_proc_type_detect(void)\n{\n        enum rte_proc_type_t ptype = RTE_PROC_PRIMARY;\n        const char *pathname = eal_runtime_config_path();\n\n        /* if there no shared config, there can be no secondary processes */\n        if (!internal_config.no_shconf) {\n                /* if we can open the file but not get a write-lock we are a\n                 * secondary process. NOTE: if we get a file handle back, we\n                 * keep that open and don\'t close it to prevent a race condition\n                 * between multiple opens.\n                 */\n                if (((mem_cfg_fd = open(pathname, O_RDWR)) >= 0) &&\n                                (fcntl(mem_cfg_fd, F_SETLK, &wr_lock) < 0))\n                        ptype = RTE_PROC_SECONDARY;\n        }\n\n        RTE_LOG(INFO, EAL, "Auto-detected process type: %s\\n",\n                        ptype == RTE_PROC_PRIMARY ? "PRIMARY" : "SECONDARY");\n\n        return ptype;\n}\n')),(0,l.kt)("p",null,"\u6838\u5fc3\u903b\u8f91\u4e3a\u6253\u5f00 rte_config \u6587\u4ef6\u540e\u5c1d\u8bd5\u83b7\u53d6 wr_lock \u4e2d\u8bbe\u5b9a\u7684 memsegs \u5b57\u6bb5\u7684\u5199\u9501\uff0c\u6210\u529f\u83b7\u53d6\u5219\u4e3a primary \u8fdb\u7a0b\uff0c\u83b7\u53d6\u5931\u8d25\u5219\u4e3a secondary \u8fdb\u7a0b\u3002"),(0,l.kt)("p",null,"\u8fd9\u5c31\u662f dpdk primary \u8fdb\u7a0b\u672a\u5173\u95ed rte_config \u6587\u4ef6\u7684\u539f\u56e0 \uff0cclose \u4e86\u8fd9\u4e2a\u6587\u4ef6\u540e\uff0cprimary \u8fdb\u7a0b\u5728\u5176\u4e0a\u83b7\u53d6\u7684\u6587\u4ef6\u9501\u4f1a\u91ca\u653e\uff0c\u8fd9\u6837\u5c31\u4e0d\u80fd\u81ea\u52a8\u68c0\u6d4b dpdk \u8fdb\u7a0b\u7684\u7c7b\u578b\u4e86\uff01"),(0,l.kt)("p",null,"\u8981\u5b9e\u73b0\u5173\u95ed rte_config \u7684\u529f\u80fd\u9700\u8981\u63d0\u4f9b\u53e6\u5916\u4e00\u79cd\u4e0d\u4f9d\u8d56\u6587\u4ef6\u52a0\u9501\u7684\u63a2\u6d4b dpdk \u7a0b\u5e8f\u7c7b\u578b\u7684\u673a\u5236\u3002"),(0,l.kt)("h2",{id:"\u771f\u5b9e\u73af\u5883\u4e2d\u7684\u95ee\u9898"},"\u771f\u5b9e\u73af\u5883\u4e2d\u7684\u95ee\u9898"),(0,l.kt)("p",null,"\u4e0a\u6587\u4e2d\u901a\u8fc7 l2fwd \u6a21\u62df\u8fd9\u4e2a\u95ee\u9898\u770b\u4e0a\u53bb\u633a\u8f7b\u677e\uff0c\u4f46\u8fd9\u4e2a\u95ee\u9898\u5728\u771f\u5b9e\u73af\u5883\u4e2d\u51fa\u73b0\u7684\u65f6\u5019\u6211\u4eec\u53ea\u89c2\u6d4b\u5230 strace \u4e2d\u6709 close stdout \u7684\u64cd\u4f5c\uff0c\u4f46\u662f\u7531\u4e8e\u4ee3\u7801\u8fc7\u4e8e\u590d\u6742\uff0c\u4ed4\u7ec6\u627e\u4e86\u4e0b\u5374\u6ca1\u6709\u627e\u5230\u8fd9\u4e2a\u903b\u8f91\u662f\u5728\u54ea\u91cc\u88ab\u8c03\u7528\u7684\u3002"),(0,l.kt)("p",null,"\u4e3a\u4e86\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\uff0c\u6211\u4eec\u60f3\u5230\u4e86\u4e00\u79cd\u601d\u8def\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"hook c \u5e93 close \u51fd\u6570"),(0,l.kt)("li",{parentName:"ol"},"\u5728 hook \u51fd\u6570\u4e2d\u5224\u65ad\u5173\u95ed\u7684 fd \u662f\u5426\u4e3a 1\uff0c\u4e3a 1 \u5219\u56de\u6eaf\u51fd\u6570\u8c03\u7528\u6808\u5e27\u4fe1\u606f\uff0c\u6839\u636e\u6808\u5e27\u4fe1\u606f\u786e\u8ba4\u51fa\u73b0\u95ee\u9898\u7684\u5730\u65b9"),(0,l.kt)("li",{parentName:"ol"},"\u6307\u5b9a LD_PRELOAD \u52a0\u8f7d hook close \u51fd\u6570\u7684 so \u6765\u590d\u73b0\u95ee\u9898")),(0,l.kt)("p",null,"hook close \u51fd\u6570\u7684\u793a\u4f8b\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},'#define _GNU_SOURCE\n#include <stdio.h>\n#include <unistd.h>\n#include <dlfcn.h>\n#include <unistd.h>\n#include <fcntl.h>           /* Definition of AT_* constants */\n#include <execinfo.h>\n#include <stdlib.h>\n\n#define BACKTRACE_SIZE 256\n/* dump the stack of the calling core */\nvoid dump_stack(void)\n{\n        void *func[BACKTRACE_SIZE];\n        char **symb = NULL;\n        int size;\n\n        size = backtrace(func, BACKTRACE_SIZE);\n        symb = backtrace_symbols(func, size);\n\n        if (symb == NULL)\n                return;\n\n        while (size > 0) {\n                printf("%d: [%s]\\n", size, symb[size - 1]);\n                size --;\n        }\n\n        free(symb);\n}\n\n#define BUFFER_SIZE 1024\ntypedef (*close_t) (int fd);\n\nint close(int fd)\n{\n        close_t old_close;\n\n        if (fd == 1) {\n                dump_stack();\n        }\n\n        old_close = dlsym(RTLD_NEXT, "close");\n        return old_close(fd);\n}\n')),(0,l.kt)("p",null,"\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\u7f16\u8bd1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx"},"gcc -fPIC -shared hook_close.c -o close.so -ldl\n")),(0,l.kt)("p",null,"\u590d\u73b0\u95ee\u9898\u540e\uff0c\u6392\u67e5\u53d1\u73b0\u95ee\u9898\u6307\u5411\u7684\u51fd\u6570\u4e2d\u6ca1\u6709\u76f8\u5173\u7684\u4ee3\u7801\uff0c\u4f46\u4f4d\u7f6e\u5927\u81f4\u660e\u786e\u3002\u6709\u4e86\u8fd9\u4e2a\u4fe1\u606f\u540e\uff0c\u4ed4\u7ec6\u5206\u6790\u4ee3\u7801\u786e\u8ba4\u95ee\u9898\u51fa\u5728\u4e00\u4e2a\u5bf9\u8c61\u7684\u6790\u6784\u51fd\u6570\u8c03\u7528\u4e2d\uff0c\u95ee\u9898\u5f97\u5230\u89e3\u51b3\uff01"),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u6709\u4e9b\u95ee\u9898\u7684\u8868\u8c61\u7b80\u5355\u5374\u4e0d\u5bb9\u6613\u5b9a\u4f4d\uff0c\u5bf9\u4e8e\u8fd9\u4e9b\u95ee\u9898\u53ef\u80fd\u5f97\u7ed3\u5408\u4e00\u4e9b\u5176\u5b83\u7684\u6280\u672f\u6765\u52a0\u901f\u3002\u5728\u4e0a\u6587\u63cf\u8ff0\u7684\u8981\u627e\u5230\u5173\u95ed stdout \u7684\u4f4d\u7f6e\u65f6\uff0c\u7531\u4e8e\u5df2\u7ecf\u786e\u5b9a\u4e86\u8fdb\u7a0b\u4e00\u5b9a\u4f1a\u5173\u95ed stdout\uff0c\u5219\u53ef\u4ee5\u5728\u8fd9\u4e2a\u5173\u952e\u8def\u5f84\u4e0a\u4e0b\u529f\u592b\uff0chook close c \u5e93\u51fd\u6570\u5c31\u662f\u4e00\u6b21\u8fd9\u6837\u7684\u5b9e\u8df5\uff01"),(0,l.kt)("p",null,"\u540c\u65f6\u4e5f\u9700\u8981\u6ce8\u610f\u7684\u662f\u7279\u5b9a\u7684\u6846\u67b6\u8bbe\u8ba1\uff0c\u53ef\u80fd\u5b58\u5728\u4e00\u4e9b\u9650\u5b9a\u56e0\u7d20\uff0c\u6709\u65f6\u5019\u8fd9\u4e9b\u56e0\u7d20\u5e76\u4e0d\u90a3\u4e48\u660e\u663e\uff0c\u9700\u8981\u5bf9\u6846\u67b6\u7684\u5b9e\u73b0\u7ec6\u8282\u4ed4\u7ec6\u5206\u6790\uff0c\u6709\u8fd9\u6837\u7684\u8fc7\u7a0b\u5c31\u80fd\u591f\u6709\u6240\u63d0\u5347\uff01"))}m.isMDXComponent=!0}}]);