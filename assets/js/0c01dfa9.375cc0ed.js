"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[9326],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=u(n),m=o,s=f["".concat(p,".").concat(m)]||f[m]||d[m]||i;return n?r.createElement(s,a(a({ref:t},c),{},{components:n})):r.createElement(s,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6509:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={},p=void 0,u={permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b.md",source:"@site/blog/dpdk/dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b.md",title:"dpdk/dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b",description:"dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:1.955,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk \u7528\u6237\u6001\u9a71\u52a8\u6846\u67b6\u53ca\u5176\u90e8\u5206\u6f14\u8fdb\u8fc7\u7a0b",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7528\u6237\u6001\u9a71\u52a8\u6846\u67b6\u53ca\u5176\u6f14\u8fdb\u8fc7\u7a0b\u5206\u6790"},nextItem:{title:"\u63a5\u53e3 up\u3001down \u5931\u8d25\u95ee\u9898\u6392\u67e5",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u63a5\u53e3 down\u3001up \u95ee\u9898\u5b9a\u4f4d\u7684\u4e00\u822c\u6d41\u7a0b"}},c={authorsImageUrls:[]},d=[{value:"dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5",id:"dpdk-\u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5",level:2}],f={toc:d};function m(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"dpdk-\u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5"},"dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u786e\u5b9a\u7f51\u5361\u7c7b\u578b\u4e0e\u6027\u80fd\u8981\u6c42\uff0c\u4e0e\u786c\u4ef6\u7ec4\u6c9f\u901a\u786e\u8ba4\u7f51\u5361\u6027\u80fd\u57fa\u7ebf\u6570\u636e\uff0c\u57fa\u7ebf\u6570\u636e\u7b26\u5408\u8981\u6c42\u5219\u6267\u884c\u4e0b\u9762\u7684\u6b65\u9aa4"),(0,i.kt)("li",{parentName:"ol"},"\u4f7f\u7528 perf \u786e\u5b9a\u5f53\u524d\u4f7f\u7528\u7684\u6536\u53d1\u5305\u51fd\u6570\uff0c\u672a\u4f7f\u7528\u5411\u91cf\u6536\u53d1\u5305\u51fd\u6570\uff0c\u5f00\u542f\u5411\u91cf\u6536\u53d1\u5305\u51fd\u6570\u540e\u95ee\u9898\u5f97\u5230\u89e3\u51b3\u5219\u7ec8\u6b62"),(0,i.kt)("li",{parentName:"ol"},"\u786e\u5b9a\u5f53\u524d\u6536\u53d1\u5305\u7ebf\u7a0b\u7ed1\u6838\u60c5\u51b5\uff0c\u4fee\u6539 grub \u914d\u7f6e\uff0c\u6dfb\u52a0 isolcpus\u3001nohz_full\u3001rcu_nocbs \u914d\u7f6e\uff0c\u9694\u79bb\u6536\u53d1\u5305\u7ebf\u7a0b\u7ed1\u5b9a\u6838\u540e\u91cd\u65b0\u6d4b\u8bd5\uff0c\u8fbe\u5230\u8981\u6c42\u5219\u7ec8\u6b62"),(0,i.kt)("li",{parentName:"ol"},"\u4fee\u6539 irq \u4eb2\u548c\u6027\u540e\u91cd\u65b0\u6d4b\u8bd5\uff0c\u8fbe\u5230\u8981\u6c42\u5219\u7ec8\u6b62"),(0,i.kt)("li",{parentName:"ol"},"\u91cd\u590d 3 \u4e0e 4 \u8fc7\u7a0b\uff0c\u7ed1\u5b9a\u4e0d\u540c\u7684\u6838\uff0c\u91c7\u96c6\u7ed1\u5b9a\u5230\u5947\u6570\u6838\uff0c\u5076\u6570\u6838\uff0c\u76f8\u90bb\u6838\u4e0a\u6027\u80fd\u6570\u636e\uff0c\u83b7\u53d6\u6536\u53d1\u5305\u7edf\u8ba1\uff0c\u67e5\u770b imissed \u5b57\u6bb5\u4e0e nombuf \u5b57\u6bb5"),(0,i.kt)("li",{parentName:"ol"},"\u89c2\u6d4b\u7b2c 5 \u6b65\u6536\u96c6\u5230\u7684\u4fe1\u606f\uff0c\u5224\u65ad\u662f\u5426\u5728\u7ed1\u5b9a\u67d0\u4e2a\u6838\u65f6\u6027\u80fd\u8f83\u4f18\uff0c\u8bbe\u5b9a\u6700\u4f18\u7684\u7ed1\u6838\u60c5\u51b5"),(0,i.kt)("li",{parentName:"ol"},"\u5c06\u7f51\u5361\u66f4\u6362\u5230\u4e0d\u540c\u7684\u69fd\u4f4d\uff0c\u91c7\u96c6\u6027\u80fd\u6570\u636e\uff0c\u9a8c\u8bc1\u662f\u5426\u5b58\u5728\u6027\u80fd\u5dee\u5f02"),(0,i.kt)("li",{parentName:"ol"},"\u6740\u6389\u65e0\u5173\u8fdb\u7a0b\uff0c\u6392\u67e5\u662f\u5426\u5176\u5b83\u8fdb\u7a0b\u5f71\u54cd\uff0c\u65e0\u5f71\u54cd\u5219\u7ee7\u7eed\u5411\u4e0b\u6392\u67e5"),(0,i.kt)("li",{parentName:"ol"},"\u6267\u884c\u4e0a\u8ff0\u6b65\u9aa4\u4ecd\u65e7\u8fbe\u4e0d\u5230\u8981\u6c42\u65f6\uff0c\u5f00\u542f\u591a\u961f\u5217\uff0c\u95ee\u9898\u5f97\u5230\u89e3\u51b3\u5219\u7ec8\u6b62"),(0,i.kt)("li",{parentName:"ol"},"\u6267\u884c\u4e0a\u8ff0\u6b65\u9aa4\u65e0\u6548\u540e\uff0c\u89c2\u6d4b\u6d4b\u8bd5\u6570\u636e\u4e2d imissed \u8f83\u9ad8\u5219\u8c03\u5927 rx\u3001tx \u63cf\u8ff0\u7b26\u6570\u91cf\uff0c\u8fbe\u5230\u8981\u6c42\u5219\u7ec8\u6b62"),(0,i.kt)("li",{parentName:"ol"},"\u7b2c 8 \u6b65\u65e0\u6548\u540e\uff0c\u6267\u884c perf\u3001vtune \u91c7\u96c6\u6027\u80fd\u70ed\u70b9\uff0c\u4ece\u8f6f\u4ef6\u4fa7\u4f18\u5316")))}m.isMDXComponent=!0}}]);