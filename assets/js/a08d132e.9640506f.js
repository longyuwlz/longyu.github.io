"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[1588],{3905:function(e,t,n){n.d(t,{Zo:function(){return f},kt:function(){return k}});var p=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);t&&(p=p.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,p)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,p,r=function(e,t){if(null==e)return{};var n,p,r={},l=Object.keys(e);for(p=0;p<l.length;p++)n=l[p],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(p=0;p<l.length;p++)n=l[p],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=p.createContext({}),o=function(e){var t=p.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},f=function(e){var t=o(e.components);return p.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return p.createElement(p.Fragment,{},t)}},c=p.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,f=d(e,["components","mdxType","originalType","parentName"]),c=o(n),k=r,b=c["".concat(i,".").concat(k)]||c[k]||u[k]||l;return n?p.createElement(b,a(a({ref:t},f),{},{components:n})):p.createElement(b,a({ref:t},f))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,a=new Array(l);a[0]=c;var d={};for(var i in t)hasOwnProperty.call(t,i)&&(d[i]=t[i]);d.originalType=e,d.mdxType="string"==typeof e?e:r,a[1]=d;for(var o=2;o<l;o++)a[o]=n[o];return p.createElement.apply(null,a)}return p.createElement.apply(null,n)}c.displayName="MDXCreateElement"},6298:function(e,t,n){n.r(t),n.d(t,{assets:function(){return f},contentTitle:function(){return i},default:function(){return k},frontMatter:function(){return d},metadata:function(){return o},toc:function(){return u}});var p=n(7462),r=n(3366),l=(n(7294),n(3905)),a=["components"],d={},i=void 0,o={permalink:"/longyu.github.io/blog/dpdk/\u8bd5\u73a9 dpdk ebfp \u529f\u80fd",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/\u8bd5\u73a9 dpdk ebfp \u529f\u80fd.md",source:"@site/blog/dpdk/\u8bd5\u73a9 dpdk ebfp \u529f\u80fd.md",title:"dpdk/\u8bd5\u73a9 dpdk ebfp \u529f\u80fd",description:"ebpf \u662f\u4ec0\u4e48\uff1f",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:4.395,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk/\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8\u53ca\u5176\u4f7f\u7528\u7684 bind\u3001unbind\u3001new_id \u7b49 sys \u6587\u4ef6",permalink:"/longyu.github.io/blog/dpdk/\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8\u53ca\u5176\u4f7f\u7528\u7684 bind\u3001unbind\u3001new_id \u7b49 sys \u6587\u4ef6"},nextItem:{title:"dpdk/dpdk kni \u53e3 ifconfig up down \u7684\u6267\u884c\u6d41\u7a0b",permalink:"/longyu.github.io/blog/dpdk/dpdk kni \u53e3 ifconfig up down \u7684\u6267\u884c\u6d41\u7a0b"}},f={authorsImageUrls:[]},u=[{value:"ebpf \u662f\u4ec0\u4e48\uff1f",id:"ebpf-\u662f\u4ec0\u4e48",level:2},{value:"dpdk \u5bf9 ebpf \u7684\u652f\u6301",id:"dpdk-\u5bf9-ebpf-\u7684\u652f\u6301",level:2},{value:"dpdk ebpf \u7684\u4f7f\u7528\u8fc7\u7a0b",id:"dpdk-ebpf-\u7684\u4f7f\u7528\u8fc7\u7a0b",level:2},{value:"dpdk \u4e2d\u4e0a\u624b ebpf \u7684\u4e00\u4e9b\u524d\u7f6e\u6761\u4ef6",id:"dpdk-\u4e2d\u4e0a\u624b-ebpf-\u7684\u4e00\u4e9b\u524d\u7f6e\u6761\u4ef6",level:2},{value:"\u4f7f\u7528 dpdk \u793a\u4f8b\u4ee3\u7801\u4e0a\u624b dpdk ebpf",id:"\u4f7f\u7528-dpdk-\u793a\u4f8b\u4ee3\u7801\u4e0a\u624b-dpdk-ebpf",level:2},{value:"dpdk ebpf  \u7684\u5b89\u5168\u6027",id:"dpdk-ebpf--\u7684\u5b89\u5168\u6027",level:2},{value:"dpdk ebpf \u6846\u67b6\u7684\u6027\u80fd\u8d1f\u8f7d",id:"dpdk-ebpf-\u6846\u67b6\u7684\u6027\u80fd\u8d1f\u8f7d",level:2},{value:"\u53c2\u8003\u94fe\u63a5",id:"\u53c2\u8003\u94fe\u63a5",level:2}],c={toc:u};function k(e){var t=e.components,n=(0,r.Z)(e,a);return(0,l.kt)("wrapper",(0,p.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"ebpf-\u662f\u4ec0\u4e48"},"ebpf \u662f\u4ec0\u4e48\uff1f"),(0,l.kt)("p",null,"eBPF \u662f\u4e00\u4e2a\u5728\u5185\u6838\u4e2d\u8fd0\u884c\u7684\u865a\u62df\u673a\uff0c\u652f\u6301\u901a\u8fc7 C \u7b49\u9ad8\u7ea7\u8bed\u8a00\u7f16\u7801\u751f\u6210eBPF \u6307\u4ee4\u7801\u3002eBPF \u6307\u4ee4\u7801\u4ece\u7528\u6237\u6001\u52a0\u8f7d\u5230\u5185\u6838\u540e\u4ee5\u672c\u5730\u4ee3\u7801\u7684\u5f62\u5f0f\u548c\u901f\u5ea6\u53bb\u6267\u884c\uff0c\u73b0\u5df2\u652f\u6301\u5185\u6838\u591a\u4e2a\u5b50\u7cfb\u7edf\u7684\u89c2\u6d4b\u70b9\uff0c\u63d0\u4f9b\u4e86\u51e0\u4e4e\u65e0\u9650\u7684\u53ef\u89c2\u6d4b\u6027\u3002"),(0,l.kt)("p",null,"ebpf \u4e3b\u8981\u5de5\u4f5c\u6d41\u7a0b\u5982\u4e0b\u56fe\uff1a\n",(0,l.kt)("img",{parentName:"p",src:"https://img-blog.csdnimg.cn/91f3ab72c26942a5860d38b9db93f52b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbG9uZ3l1X3dseg==,size_18,color_FFFFFF,t_70,g_se,x_16#pic_center",alt:"\u5728\u8fd9\u91cc\u63d2\u5165\u56fe\u7247\u63cf\u8ff0"})),(0,l.kt)("h2",{id:"dpdk-\u5bf9-ebpf-\u7684\u652f\u6301"},"dpdk \u5bf9 ebpf \u7684\u652f\u6301"),(0,l.kt)("p",null,"dpdk 18.0 \u5f15\u5165 ebpf\uff0c\u5b9e\u73b0\u4e3a librte_bpf \u5e93\u3002\u652f\u6301\u7684\u7279\u6027\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u652f\u6301 ebpf \u67b6\u6784\uff08\u4e0d\u652f\u6301 tail-pointer\uff09"),(0,l.kt)("li",{parentName:"ol"},"x86_64 \u4e0e arm64 \u67b6\u6784\u652f\u6301\u4f7f\u7528 JIT\u5c06 ebpf \u4ee3\u7801\u7f16\u8bd1\u4e3a native code"),(0,l.kt)("li",{parentName:"ol"},"\u652f\u6301 ebpf \u4ee3\u7801\u6821\u9a8c\u652f\u6301\u7528\u6237\u5b9a\u4e49\u7684\u8f85\u52a9\u51fd\u6570"),(0,l.kt)("li",{parentName:"ol"},"\u652f\u6301 rx/tx \u5305\u8fc7\u6ee4"),(0,l.kt)("li",{parentName:"ol"},"\u652f\u6301 ebpf \u4ee3\u7801\u8bbf\u95ee mbuf \u7ed3\u6784")),(0,l.kt)("p",null,"\u4e0d\u652f\u6301\u7684\u7279\u6027\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"cbpf"),(0,l.kt)("li",{parentName:"ol"},"maps"),(0,l.kt)("li",{parentName:"ol"},"stail-pointer calls")),(0,l.kt)("h2",{id:"dpdk-ebpf-\u7684\u4f7f\u7528\u8fc7\u7a0b"},"dpdk ebpf \u7684\u4f7f\u7528\u8fc7\u7a0b"),(0,l.kt)("p",null,"\u901a\u8fc7\u6ce8\u518c rx\u3001tx \u51fd\u6570\u5185\u7684 callback \u6765\u5b9e\u73b0\u8fc7\u6ee4\u529f\u80fd\uff0c\u6700\u7ec8\u63a7\u5236\u7684\u662f",(0,l.kt)("strong",{parentName:"p"},"\u8fd4\u56de\u7ed9\u4e0a\u5c42\u3001\u4f20\u8f93\u7ed9\u4e0b\u5c42\u7684\u7279\u5b9a\u8fc7\u6ee4\u683c\u5f0f\u7684 mbuf"),"\u3002"),(0,l.kt)("p",null,"\u8fc7\u6ee4\u529f\u80fd\u7684\u5b9e\u73b0\u901a\u8fc7 epbf \u6307\u4ee4\u6765\u5b8c\u6210\uff0c\u652f\u6301\u865a\u62df\u673a\u6a21\u62df\u4e0e jit \u4e24\u79cd\u65b9\u5f0f\u3002jit \u4f1a\u5c06 bpf \u6307\u4ee4\u8f6c\u5316\u4e3a x86 \u6307\u4ee4\u6765\u8fd0\u884c\u3002"),(0,l.kt)("p",null,"\u76ee\u524d\u7684\u7f16\u7a0b\u65b9\u5f0f\uff1a\u7528 c \u7b49\u9ad8\u7ea7\u8bed\u8a00\u7f16\u5199 ebpf \u8fc7\u6ee4\u64cd\u4f5c\uff0c\u7136\u540e\u7f16\u8bd1\u4e3a bpf \u6307\u4ee4\u7801\u6765\u52a0\u8f7d\u3002"),(0,l.kt)("h2",{id:"dpdk-\u4e2d\u4e0a\u624b-ebpf-\u7684\u4e00\u4e9b\u524d\u7f6e\u6761\u4ef6"},"dpdk \u4e2d\u4e0a\u624b ebpf \u7684\u4e00\u4e9b\u524d\u7f6e\u6761\u4ef6"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"config \u914d\u7f6e\u6587\u4ef6\u4e2d\u4f7f\u80fd\u5982\u4e0b\u914d\u7f6e\uff1a"),(0,l.kt)("p",{parentName:"li"},"RTE_LIBRTE_GRO"),(0,l.kt)("p",{parentName:"li"},"RTE_LIBRTE_GSO"),(0,l.kt)("p",{parentName:"li"},"RTE_LIBRTE_BPF"),(0,l.kt)("p",{parentName:"li"},"RTE_LIBRTE_BPF_ELF\nRTE_TEST_PMD"),(0,l.kt)("p",{parentName:"li"},"RTE_ETHDEV_RXTX_CALLBACKS")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u4f7f\u7528 clang \u7f16\u8bd1 examples/bpf/ \u76ee\u5f55\u4e0b\u7684\u6587\u4ef6\u4e3a bpf \u6307\u4ee4\u7801")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u8fd0\u884c testpmd\uff0c\u901a\u8fc7 bpf-load \u547d\u4ee4\u52a0\u8f7d\u7b2c\u4e8c\u6b65\u751f\u6210\u7684\u6307\u4ee4\u7801"))),(0,l.kt)("h2",{id:"\u4f7f\u7528-dpdk-\u793a\u4f8b\u4ee3\u7801\u4e0a\u624b-dpdk-ebpf"},"\u4f7f\u7528 dpdk \u793a\u4f8b\u4ee3\u7801\u4e0a\u624b dpdk ebpf"),(0,l.kt)("p",null,"ebpf \u8fc7\u6ee4 c \u7a0b\u5e8f\u6e90\u7801\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"#include <stdint.h>\n#include <net/ethernet.h>\n#include <netinet/ip.h>\n#include <netinet/udp.h>\n#include <arpa/inet.h>\n\nuint64_t\nentry(void *pkt)\n{\n        struct ether_header *ether_header = (void *)pkt;\n\n        if (ether_header->ether_type != htons(0x0800))\n                return 0;\n\n        struct iphdr *iphdr = (void *)(ether_header + 1);\n        if (iphdr->protocol != 17 || (iphdr->frag_off & 0x1ffff) != 0 ||\n                        iphdr->daddr != htonl(0x1020304))\n                return 0;\n\n        int hlen = iphdr->ihl * 4;\n        struct udphdr *udphdr = (void *)iphdr + hlen;\n\n        if (udphdr->dest != htons(5000))\n                return 0;\n\n        return 1;\n}\n")),(0,l.kt)("p",null,"\u4e0a\u8ff0\u4ee3\u7801\u5b9e\u73b0\u7c7b\u4f3c ",(0,l.kt)("strong",{parentName:"p"},"tcpdump -s 1 -d 'dst 1.2.3.4 && udp && dst port 5000"),"\u2019 \u547d\u4ee4\u884c\u7684\u529f\u80fd\uff0c\u8fc7\u6ee4\u51fa\u76ee\u7684 ip \u4e3a 1.2.3.4 \u4e14\u76ee\u7684\u7aef\u53e3\u4e3a 5000 \u7684 udp \u62a5\u6587\u3002"),(0,l.kt)("p",null,"\u4e0a\u8ff0\u6e90\u7801\u6458\u81ea ",(0,l.kt)("strong",{parentName:"p"},"dpdk")," \u5de5\u7a0b\u4e2d\u7684 ",(0,l.kt)("strong",{parentName:"p"},"examples/bpf/t1.c"),"\uff0c\u7f16\u8bd1\u547d\u4ee4\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},"clang -O2 -U __GNUC__ -target bpf -c t1.c\n")),(0,l.kt)("p",null,"\u7f16\u8bd1\u6210\u529f\u540e\uff0c\u8fd0\u884c ",(0,l.kt)("strong",{parentName:"p"},"testpmd")," \u7a0b\u5e8f\uff0c\u6267\u884c ",(0,l.kt)("strong",{parentName:"p"},"bpf-load")," \u547d\u4ee4\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},'testpmd> bpf-load rx 0 0 J ./examples/bpf/t1.o\nrte_bpf_elf_load(fname="./examples/bpf/t1.o", sname=".text") successfully creates 0x7f4f2d9dc000(jit={.func=0x7f4f2d9b0000,.sz=93});\n0:Success\n')),(0,l.kt)("p",null,"\u6267\u884c ",(0,l.kt)("strong",{parentName:"p"},"bpf-unload")," \u547d\u4ee4\u5373\u53ef\u5378\u8f7d ebpf \u89c4\u5219\u3002"),(0,l.kt)("h2",{id:"dpdk-ebpf--\u7684\u5b89\u5168\u6027"},"dpdk ebpf  \u7684\u5b89\u5168\u6027"),(0,l.kt)("p",null,"dpdk ebpf \u5b9e\u73b0\u505a\u4e86\u5982\u4e0b\u5b89\u5168\u6027\u4fdd\u969c\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u53c2\u6570\u5408\u6cd5\u6027\u6821\u9a8c"),(0,l.kt)("li",{parentName:"ol"},"ebpf \u6307\u4ee4\u5408\u6cd5\u6027\uff08\u6b63\u786e\u7684\u683c\u5f0f\u3001\u6709\u6548\u5b57\u6bb5\u503c\u7b49\uff09\u6821\u9a8c"),(0,l.kt)("li",{parentName:"ol"},"\u6821\u9a8c\u662f\u5426\u5b58\u5728\u4e0d\u53ef\u8fbe\u7684\u6307\u4ee4\u6216\u5faa\u73af"),(0,l.kt)("li",{parentName:"ol"},"\u52a0\u8f7d\u524d\u6a21\u62df\u6267\u884c\u6240\u6709\u53ef\u80fd\u5b58\u5728\u7684\u5206\u652f\u4e2d\u7684 ebpf \u6307\u4ee4\n\u6821\u9a8c\u5931\u8d25\u5219\u7ec8\u6b62\u52a0\u8f7d\n\u5176\u5b83\u7684\u5b89\u5168\u4fdd\u969c\uff1a"),(0,l.kt)("li",{parentName:"ol"},"ebpf jit \u7ffb\u8bd1\u5b8c\u6210\u540e\u5c06 rte_bpf \u6240\u5728\u7684\u9875\u8bbe\u7f6e\u4e3a READ ONLY"),(0,l.kt)("li",{parentName:"ol"},"ebpf jit \u7ffb\u8bd1\u540e\u751f\u6210\u7684 native code \u5b58\u50a8\u7684\u9875\u8bbe\u7f6e\u4e3a\u8bfb\u4e0e\u53ef\u6267\u884c")),(0,l.kt)("h2",{id:"dpdk-ebpf-\u6846\u67b6\u7684\u6027\u80fd\u8d1f\u8f7d"},"dpdk ebpf \u6846\u67b6\u7684\u6027\u80fd\u8d1f\u8f7d"),(0,l.kt)("p",null,"\u6d4b\u8bd5\u65b9\u6cd5\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u57fa\u4e8e dpdk-19.11 testpmd \u6d4b\u8bd5"),(0,l.kt)("li",{parentName:"ol"},"\u7f16\u5199\u4e00\u4e2a\u76f4\u63a5\u8fd4\u56de 1 \u7684 ebpf \u7a7a\u89c4\u5219"),(0,l.kt)("li",{parentName:"ol"},"\u4f7f\u7528 testpmd \u52a0\u8f7d\u7b2c\u4e8c\u6b65\u751f\u6210\u7684 dpdk \u89c4\u5219"),(0,l.kt)("li",{parentName:"ol"},"\u6301\u7eed\u6253\u6d41 100% \u5e26\u5bbd\u89c2\u6d4b\u6027\u80fd\u6570\u636e")),(0,l.kt)("p",null,"\u5728\u98de\u817e D2000 \u4e0a\u4f7f\u7528\u4e00\u4e2a\u4e24\u4e07\u5146\u7f51\u5361\u6d4b\u8bd5\uff0c\u6d4b\u8bd5\u786e\u5b9a\u5bf9 512\u30011518 \u5b57\u8282\u6027\u80fd\u51e0\u4e4e\u6ca1\u6709\u5f71\u54cd\uff0c64 \u5b57\u8282\u4e0b\u964d\u4e86\u4e0d\u5230 3%\u3002"),(0,l.kt)("h2",{id:"\u53c2\u8003\u94fe\u63a5"},"\u53c2\u8003\u94fe\u63a5"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://blog.csdn.net/force_eagle/article/details/117365557"},"https://blog.csdn.net/force_eagle/article/details/117365557")),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://doc.dpdk.org/guides/testpmd_app_ug/testpmd_funcs.html#bpf-functions"},"https://doc.dpdk.org/guides/testpmd_app_ug/testpmd_funcs.html#bpf-functions")))}k.isMDXComponent=!0}}]);