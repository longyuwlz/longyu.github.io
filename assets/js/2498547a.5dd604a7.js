"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[5182],{3905:function(e,t,n){n.d(t,{Zo:function(){return a},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),d=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},a=function(e){var t=d(e.components);return r.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,a=p(e,["components","mdxType","originalType","parentName"]),f=d(n),m=o,g=f["".concat(i,".").concat(m)]||f[m]||c[m]||l;return n?r.createElement(g,u(u({ref:t},a),{},{components:n})):r.createElement(g,u({ref:t},a))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,u=new Array(l);u[0]=f;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,u[1]=p;for(var d=2;d<l;d++)u[d]=n[d];return r.createElement.apply(null,u)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4319:function(e,t,n){n.r(t),n.d(t,{assets:function(){return a},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return p},metadata:function(){return d},toc:function(){return c}});var r=n(7462),o=n(3366),l=(n(7294),n(3905)),u=["components"],p={},i="dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5",d={permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b.md",source:"@site/blog/dpdk/dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b.md",title:"dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5",description:"\u63a5\u53e3\u4e0d\u6536\u5305\u95ee\u9898\u6392\u67e5",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:4.24,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"\u63a5\u53e3 up\u3001down \u5931\u8d25\u95ee\u9898\u6392\u67e5",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u63a5\u53e3 down\u3001up \u95ee\u9898\u5b9a\u4f4d\u7684\u4e00\u822c\u6d41\u7a0b"},nextItem:{title:"dpdk/dpdk \u7a0b\u5e8f\u7ed1\u4e0d\u540c\u7684\u6838\u6027\u80fd\u6709\u660e\u663e\u5dee\u5f02\u95ee\u9898\u5206\u6790",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u7ed1\u4e0d\u540c\u7684\u6838\u6027\u80fd\u6709\u660e\u663e\u5dee\u5f02\u95ee\u9898\u5206\u6790"}},a={authorsImageUrls:[]},c=[{value:"\u63a5\u53e3\u4e0d\u6536\u5305\u95ee\u9898\u6392\u67e5",id:"\u63a5\u53e3\u4e0d\u6536\u5305\u95ee\u9898\u6392\u67e5",level:2},{value:"\u63a5\u53e3\u4e0d\u53d1\u5305\u95ee\u9898\u6392\u67e5",id:"\u63a5\u53e3\u4e0d\u53d1\u5305\u95ee\u9898\u6392\u67e5",level:2}],f={toc:c};function m(e){var t=e.components,n=(0,o.Z)(e,u);return(0,l.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u63a5\u53e3\u4e0d\u6536\u5305\u95ee\u9898\u6392\u67e5"},"\u63a5\u53e3\u4e0d\u6536\u5305\u95ee\u9898\u6392\u67e5"),(0,l.kt)("p",null,"1.\u786e\u8ba4\u7f51\u5361\u7c7b\u578b\u4e0e\u5f02\u5e38\u63a5\u53e3"),(0,l.kt)("p",null,"2.\u6536\u96c6 ethtool -i x/x\u3001ifconfig x/x\u3001ethtool x/x\u3001ethtool -d x/x\u3001ethtool -S x/x \u4fe1\u606f"),(0,l.kt)("p",null,"3.\u786e\u8ba4\u63a5\u53e3\u8fde\u7ebf\u662f\u5426\u6b63\u5e38\uff0c\u63a5\u53e3\u662f\u5426 up\uff0c\u63a5\u53e3\u5904\u4e8e down \u72b6\u6001\u4e0d\u80fd\u8bf4\u660e\u6536\u5305\u5b58\u5728\u5f02\u5e38"),(0,l.kt)("p",null,"4.\u786e\u8ba4\u5bf9\u7aef\u662f\u5426\u5728\u53d1\u6d41\uff0c\u5bf9\u7aef\u6ca1\u6709\u53d1\u6d41\u5219\u4e0d\u80fd\u8bf4\u660e\u5b58\u5728\u5f02\u5e38"),(0,l.kt)("p",null,"5.dmesg \u4fe1\u606f\u4e2d\u662f\u5426\u6709\u4e0b\u9762\u7c7b\u4f3c\u7684\u4fe1\u606f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-dmesg"},"    dmar: DMAR:[DMA Read] Request device [01:00.0] fault addr 37ae5000 DMAR:[fault reason 02] Present bit in context entry is clear \n")),(0,l.kt)("p",null,"   device pci \u53f7\u662f dpdk \u7a0b\u5e8f\u4f7f\u7528\u7684\u7f51\u5361\u63a5\u53e3\u7684 pci \u53f7\uff0c\u7b26\u5408\u8fd9\u4e2a\u95ee\u9898\u7684\u7279\u5f81\u662f",(0,l.kt)("strong",{parentName:"p"},"\u4ece\u4e00\u5f00\u59cb\u5c31\u4e0d\u80fd\u6536\u5305\uff0c\u800c\u4e14\u662f\u5fc5\u73b0\u7684"),"\uff0c\u6709\u8fd9\u4e2a\u524d\u63d0\u5219\u4fee\u6539 grug.cfg \u6587\u4ef6\uff0c\u5185\u6838 cmdline \u4e2d\u6dfb\u52a0 intel_iommu=off \u914d\u7f6e\u540e\u91cd\u8bd5\u3002"),(0,l.kt)("p",null,"6.\u5224\u65ad ethtool -d dump \u7684\u5bc4\u5b58\u5668\u4fe1\u606f\u4e2d\u662f\u5426\u6709\u5f02\u5e38\u5982\u63a7\u5236\u5bc4\u5b58\u5668\u5168 F\uff0c\u6709\u5f02\u5e38\u5219\u5224\u5b9a\u4e3a\u786c\u4ef6\u95ee\u9898\uff0c\u53ef\u7ed1\u5b9a\u5b98\u65b9\u9a71\u52a8\u8fdb\u4e00\u6b65\u6392\u67e5"),(0,l.kt)("p",null,"7.\u5224\u65ad\u63a5\u53e3\u7684\u6df7\u6dc6\u6a21\u5f0f\u662f\u5426\u5f00\u542f\uff0c\u5f53\u63a5\u53e3 up \u90e8\u5206\u5931\u8d25\u65f6\uff0c\u6df7\u6dc6\u6a21\u5f0f\u4e0d\u4f1a\u88ab\u5f00\u542f\uff0c\u8fd9\u65f6\u7f51\u5361\u4f1a\u4e22\u6389\u6ca1\u6709\u53d1\u7ed9\u81ea\u5df1\u7684\u62a5\u6587"),(0,l.kt)("p",null,"8.\u4f7f\u7528 dpdk_proc_info \u5224\u65ad\u63a5\u53e3\u7684 RX-nombuf \u5b57\u6bb5\u662f\u5426\u4e00\u76f4\u589e\u52a0\uff0c\u5f53\u5b58\u5728 mbuf \u6cc4\u9732\u65f6\uff0c\u7533\u8bf7 mbuf \u5931\u8d25\u5219\u65e0\u6cd5\u6536\u5305"),(0,l.kt)("p",null,"9.\u591a\u6b21\u6267\u884c ethtool -d dump \u5bc4\u5b58\u5668\uff0c\u67e5\u770b\u7f51\u5361 TAIL \u4e0e HEAD \u6307\u9488\u7684\u53d8\u5316\u60c5\u51b5\uff0c\u5f53 HEAD \u503c > TAIL \u503c\u65f6\uff0c\u961f\u5217 hung \u4f4f\uff0c\u65e0\u6cd5\u6536\u5305"),(0,l.kt)("p",null,"10.\u4f7f\u7528 gdb dump \u6536\u5305\u961f\u5217\u4fe1\u606f\u3001\u63a5\u6536\u63cf\u8ff0\u7b26\u4fe1\u606f\u67e5\u627e\u5f02\u5e38\u70b9"),(0,l.kt)("p",null,"11.hung \u4f4f\u7684\u95ee\u9898\u9700\u8981\u6ce8\u610f\u95ee\u9898\u51fa\u73b0\u7684\u73af\u5883\uff0c\u662f\u6253\u4e86\u4e00\u6bb5\u65f6\u95f4\u7684\u6d41\u540e\u51fa\u73b0\u7684\uff0c\u8fd8\u662f\u6740 dpdk \u7a0b\u5e8f\u51fa\u73b0\u7684"),(0,l.kt)("p",null,"12.\u786e\u8ba4\u662f\u6740 dpdk \u7a0b\u5e8f\u51fa\u73b0\u7684\u5219\u68c0\u67e5\u7a0b\u5e8f\u53c2\u6570\uff0c\u6253\u4e86\u4e00\u6bb5\u65f6\u95f4\u7684\u6d41\u540e\u5219\u91cd\u70b9\u6392\u67e5\u662f\u5426\u5f02\u5e38\u6d41\u91cf\u5bfc\u81f4\u961f\u5217 hung \u4f4f"),(0,l.kt)("h2",{id:"\u63a5\u53e3\u4e0d\u53d1\u5305\u95ee\u9898\u6392\u67e5"},"\u63a5\u53e3\u4e0d\u53d1\u5305\u95ee\u9898\u6392\u67e5"),(0,l.kt)("p",null,"1.\u786e\u8ba4\u7f51\u5361\u7c7b\u578b\u4e0e\u5f02\u5e38\u63a5\u53e3"),(0,l.kt)("p",null,"2.\u6536\u96c6 ethtool -i x/x\u3001ifconfig x/x\u3001ethtool x/x\u3001ethtool -d x/x\u3001ethtool -S x/x \u4fe1\u606f"),(0,l.kt)("p",null,"3.\u786e\u8ba4\u63a5\u53e3\u8fde\u7ebf\u662f\u5426\u6b63\u5e38\uff0c\u63a5\u53e3\u662f\u5426 up\uff0c\u63a5\u53e3\u5904\u4e8e down \u72b6\u6001\u4e0d\u80fd\u53d1\u5305\u662f\u6b63\u5e38\u60c5\u51b5"),(0,l.kt)("p",null,"4.\u786e\u8ba4\u63a5\u53e3\u6709\u6d41\u91cf\u8f6c\u51fa\uff0ctx_drop \u7b49\u5b57\u6bb5\u5728\u589e\u52a0"),(0,l.kt)("p",null,"5.dmesg \u4fe1\u606f\u4e2d\u662f\u5426\u6709\u4e0b\u9762\u7c7b\u4f3c\u7684\u4fe1\u606f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-dmesg"},"    dmar: DMAR:[DMA Read] Request device [01:00.0] fault addr 37ae5000 DMAR:[fault reason 02] Present bit in context entry is clear \n")),(0,l.kt)("p",null," device pci \u53f7\u662f dpdk \u7a0b\u5e8f\u4f7f\u7528\u7684\u7f51\u5361\u63a5\u53e3\u7684 pci \u53f7\uff0c\u7b26\u5408\u8fd9\u4e2a\u95ee\u9898\u7684\u7279\u5f81\u662f\u4ece\u4e00\u5f00\u59cb\u5c31\u4e0d\u80fd\u6536\u5305\uff0c\u800c\u4e14\u662f\u5fc5\u73b0\u7684\uff0c\u6709\u8fd9\u4e2a\u524d\u63d0\u5219\u4fee\u6539 grug.conf \u6587\u4ef6\uff0c\u5185\u6838 cmdline \u4e2d\u6dfb\u52a0 intel_iommu=off \u914d\u7f6e\u540e\u91cd\u8bd5\u3002"),(0,l.kt)("p",null,"6.\u5224\u65ad ethtool -d dump \u7684\u5bc4\u5b58\u5668\u4fe1\u606f\u4e2d\u662f\u5426\u6709\u5f02\u5e38\u5982\u63a7\u5236\u5bc4\u5b58\u5668\u5168 F\uff0c\u6709\u5f02\u5e38\u5219\u5224\u5b9a\u4e3a\u786c\u4ef6\u95ee\u9898\uff0c\u53ef\u7ed1\u5b9a\u5b98\u65b9\u9a71\u52a8\u8fdb\u4e00\u6b65\u6392\u67e5"),(0,l.kt)("p",null,"9.\u591a\u6b21\u6267\u884c ethtool -d dump \u5bc4\u5b58\u5668\uff0c\u67e5\u770b\u7f51\u5361 tx TAIL \u4e0e HEAD \u6307\u9488\u7684\u53d8\u5316\u60c5\u51b5\uff0c\u5f53 HEAD \u503c > TAIL \u503c\u65f6\uff0c\u961f\u5217 hung \u4f4f\uff0c\u65e0\u6cd5\u53d1\u5305"),(0,l.kt)("p",null,"10.\u4f7f\u7528 gdb dump \u53d1\u5305\u961f\u5217\u4fe1\u606f\u3001\u53d1\u9001\u63cf\u8ff0\u7b26\u4fe1\u606f\u67e5\u627e\u5f02\u5e38\u70b9"),(0,l.kt)("p",null,"11.hung \u4f4f\u7684\u95ee\u9898\u9700\u8981\u6ce8\u610f\u95ee\u9898\u51fa\u73b0\u7684\u73af\u5883\uff0c\u662f\u6253\u4e86\u4e00\u6bb5\u65f6\u95f4\u7684\u6d41\u540e\u51fa\u73b0\u7684\uff0c\u8fd8\u662f\u6740 dpdk \u7a0b\u5e8f\u51fa\u73b0\u7684"),(0,l.kt)("p",null,"12.\u786e\u8ba4\u662f\u6740 dpdk \u7a0b\u5e8f\u51fa\u73b0\u7684\u5219\u68c0\u67e5\u7a0b\u5e8f\u53c2\u6570\uff0c\u6253\u4e86\u4e00\u6bb5\u65f6\u95f4\u7684\u6d41\u540e\u5219\u91cd\u70b9\u6392\u67e5\u662f\u5426\u5f02\u5e38\u6d41\u91cf\u5bfc\u81f4\u961f\u5217 hung \u4f4f"))}m.isMDXComponent=!0}}]);