"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[8251],{3905:function(t,e,n){n.d(e,{Zo:function(){return f},kt:function(){return m}});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var l=r.createContext({}),u=function(t){var e=r.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):p(p({},e),t)),n},f=function(t){var e=u(t.components);return r.createElement(l.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},c=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,a=t.originalType,l=t.parentName,f=o(t,["components","mdxType","originalType","parentName"]),c=u(n),m=i,d=c["".concat(l,".").concat(m)]||c[m]||s[m]||a;return n?r.createElement(d,p(p({ref:e},f),{},{components:n})):r.createElement(d,p({ref:e},f))}));function m(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var a=n.length,p=new Array(a);p[0]=c;var o={};for(var l in e)hasOwnProperty.call(e,l)&&(o[l]=e[l]);o.originalType=t,o.mdxType="string"==typeof t?t:i,p[1]=o;for(var u=2;u<a;u++)p[u]=n[u];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},947:function(t,e,n){n.r(e),n.d(e,{assets:function(){return f},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return s}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),p=["components"],o={},l=void 0,u={permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u7ed1\u4e0d\u540c\u7684\u6838\u6027\u80fd\u6709\u660e\u663e\u5dee\u5f02\u95ee\u9898\u5206\u6790",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u7ed1\u4e0d\u540c\u7684\u6838\u6027\u80fd\u6709\u660e\u663e\u5dee\u5f02\u95ee\u9898\u5206\u6790.md",source:"@site/blog/dpdk/dpdk \u7a0b\u5e8f\u7ed1\u4e0d\u540c\u7684\u6838\u6027\u80fd\u6709\u660e\u663e\u5dee\u5f02\u95ee\u9898\u5206\u6790.md",title:"dpdk/dpdk \u7a0b\u5e8f\u7ed1\u4e0d\u540c\u7684\u6838\u6027\u80fd\u6709\u660e\u663e\u5dee\u5f02\u95ee\u9898\u5206\u6790",description:"\u524d\u8a00",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:8.44,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b"},nextItem:{title:"\u95ee\u9898\u63cf\u8ff0",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u7ed1\u6838\u5931\u8d25\u95ee\u9898\uff1aEAL: pthread_setaffinity_np failed"}},f={authorsImageUrls:[]},s=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"\u5185\u6838\u6587\u6863\u4e2d\u4e0e irq smp_affinity \u76f8\u5173\u7684\u4fe1\u606f",id:"\u5185\u6838\u6587\u6863\u4e2d\u4e0e-irq-smp_affinity-\u76f8\u5173\u7684\u4fe1\u606f",level:2},{value:"\u4e00\u4e2a\u793a\u4f8b",id:"\u4e00\u4e2a\u793a\u4f8b",level:2},{value:"\u9ed8\u8ba4 irq_mask \u4e0b\u7684\u4e2d\u65ad\u6267\u884c\u60c5\u51b5",id:"\u9ed8\u8ba4-irq_mask-\u4e0b\u7684\u4e2d\u65ad\u6267\u884c\u60c5\u51b5",level:2},{value:"soft irq \u670d\u52a1\u7a0b\u5e8f\u6267\u884c\u7684 cpu",id:"soft-irq-\u670d\u52a1\u7a0b\u5e8f\u6267\u884c\u7684-cpu",level:2}],c={toc:s};function m(t){var e=t.components,n=(0,i.Z)(t,p);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,a.kt)("p",null,"dpdk \u7a0b\u5e8f\u4f1a\u5c06",(0,a.kt)("strong",{parentName:"p"},"\u6536\u53d1\u5305\u7ebf\u7a0b\u7ed1\u5b9a\u5230\u6307\u5b9a\u7684 cpu \u6838\u4e0a"),"\uff0c\u5728\u591a\u6838\u73af\u5883\u4e2d\u6267\u884c\u5c31\u8981\u914d\u7f6e\u9700\u8981\u4f7f\u7528\u7684\u6838\u3002\u5728\u6027\u80fd\u6d4b\u8bd5\u7684\u65f6\u5019\uff0c\u53d1\u73b0\u5f53\u6536\u53d1\u5305\u7ebf\u7a0b\u7ed1\u5b9a\u5230 0 \u6838\u30011 \u6838\u5bf9\u5e94\u7684 cpu \u4e0a\u540e\uff0c",(0,a.kt)("strong",{parentName:"p"},"\u6027\u80fd\u4f1a\u6709\u660e\u663e\u7684\u4e0b\u964d"),"\uff0c\u800c\u7ed1\u5b9a\u5230 0 \u6838\u30011 \u6838\u4e4b\u540e\u7684\u6838\u4e0a\u5374\u6ca1\u6709\u8fd9\u4e2a\u95ee\u9898\u3002"),(0,a.kt)("p",null,"\u5728\u6392\u67e5\u8fd9\u4e2a\u95ee\u9898\u7684\u65f6\u5019\u53d1\u73b0\uff0c",(0,a.kt)("strong",{parentName:"p"},"\u7cfb\u7edf\u4e2d\u7684\u4e00\u4e9b\u4e2d\u65ad\u53ea\u5728 0 \u6838\u4e0a\u6709\u7edf\u8ba1\u8ba1\u6570"),"\uff0c\u8868\u660e\u5176\u4e2d\u65ad\u5904\u7406\u7a0b\u5e8f\u53ea\u5728 0 \u6838\u4e0a\u6267\u884c\uff0c\u5f53 dpdk \u7a0b\u5e8f\u4e5f\u4f7f\u7528 0 \u6838\u8fdb\u884c\u6536\u53d1\u5305\u7684\u65f6\u5019\uff0c\u8fd9\u4e9b\u4e2d\u65ad\u5904\u7406\u7a0b\u5e8f\u5c31\u4f1a\u4e0e dpdk \u7a0b\u5e8f\u5171\u4eab cpu \u6838\uff0c\u4ece\u800c\u5bfc\u81f4 dpdk \u7a0b\u5e8f\u6027\u80fd\u4e0b\u964d\u3002"),(0,a.kt)("p",null,"\u5728\u5b9a\u4f4d\u8fd9\u4e2a\u95ee\u9898\u4e2d\uff0c\u6709\u5bf9 irq smp_affinity \u7684\u8bbe\u5b9a\u8fc7\u7a0b\uff0c\u901a\u8fc7\u8bbe\u5b9a\u591a\u4e2a\u4e2d\u65ad\u7684 irq smp_affinity \u8ba9\u5176\u5728 0 \u6838\u4e0e 1 \u6838\u4e4b\u540e\u7684\u6838\u4e0a\u8fd0\u884c\uff0c\u91cd\u65b0\u6d4b\u8bd5\u540e\u6709\u660e\u663e\u7684\u6539\u5584\u4f46\u662f\u8fd8\u662f\u5dee\u4e00\u70b9\uff0c\u7ee7\u7eed\u5b9a\u4f4d\u53d1\u73b0 0 \u6838\u4e0a\u6709\u5f88\u591a\u7684 soft irq \u7a0b\u5e8f\u5728\u8fd0\u884c\u3002"),(0,a.kt)("p",null,"\u5728\u672c\u6587\u4e2d\u6211\u5c06\u63a2\u8ba8\u4e00\u4e0b irq smp_affinity \u7684\u77e5\u8bc6\uff0c\u540c\u65f6\u5f15\u51fa soft irq \u7684\u5185\u5bb9\u3002"),(0,a.kt)("h2",{id:"\u5185\u6838\u6587\u6863\u4e2d\u4e0e-irq-smp_affinity-\u76f8\u5173\u7684\u4fe1\u606f"},"\u5185\u6838\u6587\u6863\u4e2d\u4e0e irq smp_affinity \u76f8\u5173\u7684\u4fe1\u606f"),(0,a.kt)("p",null,"\u4e00\u624b\u8d44\u6599\u6e90\u81ea\u5185\u6838 Documentation \u76ee\u5f55\u4e2d\uff0c\u6458\u5f55\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-manual"},"================\nSMP IRQ affinity\n================\n/proc/irq/IRQ#/smp_affinity and /proc/irq/IRQ#/smp_affinity_list specify\nwhich target CPUs are permitted for a given IRQ source.  It's a bitmask\n(smp_affinity) or cpu list (smp_affinity_list) of allowed CPUs.  It's not\nallowed to turn off all CPUs, and if an IRQ controller does not support\nIRQ affinity then the value will not change from the default of all cpus.\n\n/proc/irq/default_smp_affinity specifies default affinity mask that applies\nto all non-active IRQs. Once IRQ is allocated/activated its affinity bitmask\nwill be set to the default mask. It can then be changed as described above.\nDefault mask is 0xffffffff.\n\nHere is an example of limiting that same irq (44) to cpus 1024 to 1031::\n\n        [root@moon 44]# echo 1024-1031 > smp_affinity_list\n        [root@moon 44]# cat smp_affinity_list\n        1024-1031\n\nNote that to do this with a bitmask would require 32 bitmasks of zero\nto follow the pertinent one.\n")),(0,a.kt)("p",null,"smp_affinity \u8bbe\u5b9a\u4e86\u5355\u4e2a\u4e2d\u65ad\u88ab\u5141\u8bb8\u6267\u884c\u7684 cpu \u63a9\u7801\uff0c\u5185\u6838\u4f1a\u4ee5\u4e2d\u65ad\u53f7\u4e3a\u6807\u8bc6\u7b26\u5728 /proc/irq/ \u4e3a\u6bcf\u4e00\u4e2a\u4e2d\u65ad\u521b\u5efa\u4e00\u4e2a\u5b50\u76ee\u5f55\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u8bfb\u5199 /proc/irq/IRQ \u5b50\u76ee\u5f55\u4e2d\u7684\u6587\u4ef6\u6765\u63a7\u5236\u6bcf\u4e00\u4e2a\u4e2d\u65ad\u5141\u8bb8\u88ab\u6267\u884c\u7684 cpu \u5217\u8868\u3002"),(0,a.kt)("h2",{id:"\u4e00\u4e2a\u793a\u4f8b"},"\u4e00\u4e2a\u793a\u4f8b"),(0,a.kt)("p",null,"\u8fd9\u91cc\u6211\u4ee5 iwlwifi \u65e0\u7ebf\u7f51\u5361\u8bbe\u5907\u7684\u4e2d\u65ad\u6765\u6f14\u793a\u5982\u4f55\u67e5\u770b\u5e76\u4fee\u6539 irq smp_affinity\uff0c\u8fbe\u5230\u8ba9\u8bbe\u5b9a\u7684\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u5728\u6307\u5b9a\u7684 cpu \u6838\u4e0a\u6267\u884c\u7684\u76ee\u7684\u3002"),(0,a.kt)("p",null,"\u9996\u5148\u901a\u8fc7\u8bbf\u95ee /proc/interrupts \u786e\u8ba4 iwlwifi \u7684\u4e2d\u65ad\u8ba1\u6570\u5728\u589e\u52a0\uff0c\u64cd\u4f5c\u8bb0\u5f55\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"[longyu@debian-10:20:20:25] 14 $ grep '141:' /proc/interrupts \n 141:     486315          0          0     596832          0          0          0          0  IR-PCI-MSI 333824-edge      iwlwifi: default queue\n[longyu@debian-10:20:21:07] 14 $ grep '141:' /proc/interrupts \n 141:     486405          0          0     596832          0          0          0          0  IR-PCI-MSI 333824-edge      iwlwifi: default queue\n[longyu@debian-10:20:21:08] 14 $ grep '141:' /proc/interrupts \n 141:     486703          0          0     596832          0          0          0          0  IR-PCI-MSI 333824-edge      iwlwifi: default queue\n")),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u64cd\u4f5c\u67e5\u4e86\u4e09\u6b21 141 \u53f7\u4e2d\u65ad\u7684\u7edf\u8ba1\u8ba1\u6570\uff0c\u8f93\u51fa\u4fe1\u606f\u8868\u660e\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u5728 0 \u6838\u4e0a\u4e0e 3 \u6838\u4e0a\u6267\u884c\uff0c141 \u53f7\u4e2d\u65ad\u7684 smp_affinity \u5185\u5bb9\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"[longyu@debian-10:20:27:01] 14 $ cat /proc/irq/141/smp_affinity\nff\n")),(0,a.kt)("p",null,"\u4ece\u4e0a\u9762\u7684\u5185\u5bb9\u53ef\u4ee5\u786e\u5b9a\uff0c",(0,a.kt)("strong",{parentName:"p"},"141 \u53f7\u4e2d\u65ad\u7684\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u88ab\u5141\u8bb8\u5728\u524d 8 \u4e2a\u6838\u4e0a\u8fd0\u884c\uff0c\u4f46\u662f\u4e2d\u65ad\u7edf\u8ba1\u8ba1\u6570\u7684\u53d8\u5316\u60c5\u51b5\u8868\u660e\uff0c\u5b83\u53ea\u5728 0 \u6838\u4e0e 3 \u6838\u4e0a\u6267\u884c\u3002")),(0,a.kt)("p",null,"\u4e0b\u9762\u6211\u901a\u8fc7\u5411 /proc/irq/141/smp_affinity \u4e2d\u5199\u5165\u503c\u6765\u4fee\u6539\u4e2d\u65ad\u7684 cpu \u4eb2\u548c\u6027\uff0c",(0,a.kt)("strong",{parentName:"p"},"\u6307\u5b9a\u53ea\u5141\u8bb8 141 \u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u5728 4 \u6838\u4e0a\u8fd0\u884c\u3002")),(0,a.kt)("p",null,"\u64cd\u4f5c\u8bb0\u5f55\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"[longyu@debian-10:20:29:44] 14 $ su -c ' echo '10' > /proc/irq/141/smp_affinity'\n\u5bc6\u7801\uff1a\n[longyu@debian-10:20:29:56] 14 $ cat /proc/irq/141/smp_affinity\n10\n")),(0,a.kt)("p",null,"\u5199\u5165 proc \u4e0b\u7684\u6587\u4ef6\u9700\u8981\u6709 root \u6743\u9650\uff0c",(0,a.kt)("strong",{parentName:"p"},"smp_affinity \u662f\u4ee5\u5341\u516d\u8fdb\u5236\u7684\u5f62\u5f0f\u4f20\u9012\u6570\u636e\u7684\uff0c\u6bcf\u4e00\u4f4d\u8868\u793a\u4e00\u4e2a cpu \u6838\uff0c10 \u8868\u793a\u53ea\u5141\u8bb8\u5728 4 \u6838\u4e0a\u6267\u884c"),"\u3002"),(0,a.kt)("p",null,"\u7b2c\u4e8c\u884c\u547d\u4ee4\u67e5\u8be2\u5230\u7684\u7ed3\u679c\u8868\u660e\u5199\u5165 10 \u5230 141 \u4e2d\u65ad\u7684 smp_affinity \u6587\u4ef6\u6210\u529f\uff0c\u7ee7\u7eed\u67e5\u770b /proc/interrupts \u6765\u786e\u5b9a\u662f\u5426\u771f\u6b63\u751f\u6548\u3002"),(0,a.kt)("p",null,"\u64cd\u4f5c\u8bb0\u5f55\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"[longyu@debian-10:20:30:02] 14 $ grep '141:' /proc/interrupts \n 141:     520162          0          0     596832       1465          0          0          0  IR-PCI-MSI 333824-edge      iwlwifi: default queue\n[longyu@debian-10:20:30:28] 14 $ grep '141:' /proc/interrupts \n 141:     520162          0          0     596832       1639          0          0          0  IR-PCI-MSI 333824-edge      iwlwifi: default queue\n[longyu@debian-10:20:30:31] 14 $ grep '141:' /proc/interrupts \n 141:     520162          0          0     596832       1805          0          0          0  IR-PCI-MSI 333824-edge      iwlwifi: default queue\n")),(0,a.kt)("p",null,"\u53ef\u4ee5\u770b\u5230 0 \u6838\u4e0e 3 \u6838\u4e0a\u7684\u4e2d\u65ad\u8ba1\u6570\u4e0d\u518d\u589e\u52a0\uff0c4 \u6838\u4e0a\u7684\u4e2d\u65ad\u8ba1\u6570\u5728\u589e\u52a0\u8868\u660e",(0,a.kt)("strong",{parentName:"p"},"\u8bbe\u5b9a\u751f\u6548"),"\u3002"),(0,a.kt)("h2",{id:"\u9ed8\u8ba4-irq_mask-\u4e0b\u7684\u4e2d\u65ad\u6267\u884c\u60c5\u51b5"},"\u9ed8\u8ba4 irq_mask \u4e0b\u7684\u4e2d\u65ad\u6267\u884c\u60c5\u51b5"),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u793a\u4f8b\u4e2d\u9009\u62e9 iwlwifi \u7684\u4e2d\u65ad\u662f\u6709\u610f\u4e3a\u4e4b\u7684\uff0c\u5728\u4fee\u6539\u5176\u4e2d\u65ad\u4eb2\u548c\u6027\u524d\uff0c\u67e5\u770b smp_affinity \u786e\u8ba4\u4f7f\u7528\u7684\u662f\u9ed8\u8ba4\u7684 irq_mask\uff0c\u503c\u4e3a\u5168 F\uff0c\u8868\u793a\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u53ef\u4ee5\u5728\u6bcf\u4e00\u4e2a\u6838\u4e0a\u8fd0\u884c\uff0c\u7406\u60f3\u60c5\u51b5\u662f",(0,a.kt)("strong",{parentName:"p"},"\u6bcf\u4e2a\u6838\u4e0a\u90fd\u6709\u7edf\u8ba1\u6570\u636e\u4e14\u8d1f\u8f7d\u5747\u8861"),"\uff0c\u4f46\u662f\u5b9e\u9645\u6267\u884c\u60c5\u51b5\u5374\u662f\u53ea\u5728 0 \u6838\u4e0e 3 \u6838\u4e0a\u8fd0\u884c\u3002"),(0,a.kt)("p",null,"\u4e2d\u65ad\u7a0b\u5e8f\u672c\u8eab\u6267\u884c\u7684\u4ee3\u7801\u5c11\u7684\u53ef\u601c\uff0c\u53ea\u6709\u5f53\u4e2d\u65ad\u9891\u7e41\u5230\u6765\u7684\u65f6\u5019\u5176\u5f71\u54cd\u624d\u80fd\u8868\u73b0\u51fa\u6765\uff0c\u4f46\u662f\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u4e2d\u4f1a\u89e6\u53d1 soft irq\uff0csoft irq \u505a\u4e86\u5f88\u591a\u5de5\u4f5c\u4e14\u6ca1\u6709 irq_smp \u6765\u8bbe\u5b9a\uff0c\u7f51\u4e0a\u641c\u7d22\u6709\u8bf4\u5b83\u4f1a\u5728\u88ab\u89e6\u53d1\u7684\u6838\u4e0a\u6267\u884c\uff0c\u7167\u8fd9\u6837\u6765\u8bf4\u90a3 ",(0,a.kt)("strong",{parentName:"p"},"soft irq \u4e5f\u4f1a\u968f\u7740 irq_smp \u7684\u6539\u53d8\u800c\u8054\u52a8\u6539\u53d8\uff0c\u4f46\u5b9e\u9645\u6d4b\u8bd5\u53d1\u73b0\u5e76\u6ca1\u6709\u8fd9\u79cd\u6548\u679c"),"\u3002"),(0,a.kt)("h2",{id:"soft-irq-\u670d\u52a1\u7a0b\u5e8f\u6267\u884c\u7684-cpu"},"soft irq \u670d\u52a1\u7a0b\u5e8f\u6267\u884c\u7684 cpu"),(0,a.kt)("p",null,"\u524d\u8a00\u4e2d\u6211\u6709\u63cf\u8ff0\u8fc7\uff0c\u5728\u5b9a\u4f4d dpdk \u7a0b\u5e8f\u7ed1\u5b9a\u5230 0 \u6838\u4e0e 1 \u6838\u4e0a\u6027\u80fd\u660e\u663e\u4e0b\u964d\u95ee\u9898\u65f6\uff0c\u901a\u8fc7\u8bbe\u5b9a smp_irq\uff0c\u6027\u80fd\u6709\u6240\u63d0\u9ad8\uff0c\u4f46\u662f\u8fd8\u662f\u6bd4\u4f7f\u7528\u540e\u9762\u7684\u6838\u4f4e\u4e00\u4e9b\uff0c",(0,a.kt)("strong",{parentName:"p"},"perf \u67e5\u770b\u53d1\u73b0 0 \u6838\u4e0a\u6709\u8f83\u591a\u7684 softirq \u8d1f\u8f7d"),"\uff0c\u8fd9\u4e9b softirq \u5c06\u4f1a\u4e0e\u6d4b\u8bd5\u7a0b\u5e8f\u4e00\u8d77\u5171\u4eab 0 \u6838\uff0c\u4e5f\u4f1a\u9020\u6210 dpdk \u7a0b\u5e8f\u6027\u80fd\u4e0b\u964d\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u90a3\u4e48 softirq \u5728\u54ea\u4e2a cpu \u4e0a\u6267\u884c\u5462\uff0c\u5b83\u6709\u4e0e irq smp_affinity \u7c7b\u4f3c\u7684\u8bbe\u5b9a\u63a5\u53e3\u5417\uff1f")),(0,a.kt)("p",null,"\u7f51\u4e0a\u641c\u7d22\u4e86\u4e00\u4e0b\u83b7\u53d6\u5230\u4e86\u4e0b\u9762\u7684\u4fe1\u606f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"softirq \u9009\u62e9\u6267\u884c cpu \u7684\u539f\u5219\u662f\u5728\u54ea\u4e2a cpu \u89e6\u53d1\u5c31\u5728\u54ea\u4e2a cpu \u4e0a\u6267\u884c\n")),(0,a.kt)("p",null,"softirq \u4f1a\u5728\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u4e2d\u89e6\u53d1\uff0c\u800c ",(0,a.kt)("strong",{parentName:"p"},"smp_affinity")," \u63a9\u7801\u51b3\u5b9a\u4e86\u4e2d\u65ad\u670d\u52a1\u7a0b\u5e8f\u7684\u6267\u884c\u7684 cpu \u6838\uff0c\u5982\u679c\u4e0a\u9762\u7684\u63cf\u8ff0\u6210\u7acb\uff0c\u90a3\u4e48",(0,a.kt)("strong",{parentName:"p"},"\u53ea\u8981\u4fee\u6539\u4e86\u67d0\u4e2a\u4e2d\u65ad\u7684 smp_affinity\uff0c\u6b64\u4e2d\u65ad\u89e6\u53d1\u7684 softirq \u7684\u6267\u884c cpu \u4e5f\u5e94\u8be5\u968f\u4e4b\u53d8\u5316"),"\uff0c\u800c",(0,a.kt)("strong",{parentName:"p"},"\u5b9e\u9645\u60c5\u51b5\u662f\u5b83\u6ca1\u6709\u53d8\u5316"),"\uff0c\u8fd9\u91cc\u5c31\u5b58\u5728\u95ee\u9898\u3002"),(0,a.kt)("p",null,"\u4e00\u6bb5\u65f6\u5019\u540e\u6211\u91cd\u65b0\u60f3\u4e86\u60f3\u8fd9\u4e2a\u95ee\u9898\uff0c\u6709\u4e0b\u9762\u4e24\u4e2a\u65b9\u9762\u7684\u6000\u7591\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u7f51\u4e0a\u7684\u8bf4\u6cd5\u4e0d\u53ef\u4fe1"),(0,a.kt)("p",{parentName:"li"},"\u6211\u53ea\u7b80\u5355\u770b\u8fc7 softirq \u7684\u4ee3\u7801\uff0c\u5bf9\u5177\u4f53\u7684\u539f\u7406\u5e76\u4e0d\u6e05\u695a\uff0c\u7f51\u4e0a\u7684\u8bf4\u6cd5\u5b58\u7591\uff01")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u6211\u4eec\u7684\u89c2\u6d4b\u65b9\u6cd5\u5b58\u5728\u95ee\u9898"),(0,a.kt)("p",{parentName:"li"},"\u89c2\u6d4b\u5230 softirq \u5728\u67d0\u4e2a\u6838\u4e0a\u6267\u884c\uff0c\u4f46\u662f\u5177\u4f53\u6267\u884c\u7684 softirq \u662f\u54ea\u4e2a\u4e2d\u65ad\u7684 softirq \u5e76\u6ca1\u6709\u6df1\u7a76"))),(0,a.kt)("p",null,"softirq \u7684\u5de5\u4f5c\u8fc7\u7a0b\u6709\u65f6\u95f4\u4e86\u8981\u7814\u7a76\u7814\u7a76\uff01\u6269\u5c55\u4e86\u8fd9\u4e2a\u77e5\u8bc6\uff0c\u6216\u8bb8\u8fd9\u91cc\u7684\u95ee\u9898\u4fbf\u6709\u4e86\u7b54\u6848\uff01"))}m.isMDXComponent=!0}}]);