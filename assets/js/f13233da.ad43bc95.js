"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[4413],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=u(n),f=o,k=m["".concat(i,".").concat(f)]||m[f]||d[f]||l;return n?r.createElement(k,a(a({ref:t},c),{},{components:n})):r.createElement(k,a({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,a=new Array(l);a[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var u=2;u<l;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9398:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return i},default:function(){return f},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return d}});var r=n(7462),o=n(3366),l=(n(7294),n(3905)),a=["components"],p={},i="\u63a5\u53e3 up\u3001down \u5931\u8d25\u95ee\u9898\u6392\u67e5",u={permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u63a5\u53e3 down\u3001up \u95ee\u9898\u5b9a\u4f4d\u7684\u4e00\u822c\u6d41\u7a0b",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u63a5\u53e3 down\u3001up \u95ee\u9898\u5b9a\u4f4d\u7684\u4e00\u822c\u6d41\u7a0b.md",source:"@site/blog/dpdk/dpdk \u7a0b\u5e8f\u63a5\u53e3 down\u3001up \u95ee\u9898\u5b9a\u4f4d\u7684\u4e00\u822c\u6d41\u7a0b.md",title:"\u63a5\u53e3 up\u3001down \u5931\u8d25\u95ee\u9898\u6392\u67e5",description:"\u63a5\u53e3 up \u5931\u8d25\u95ee\u9898",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:2.64,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk/dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6027\u80fd\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b"},nextItem:{title:"dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5",permalink:"/longyu.github.io/blog/dpdk/dpdk \u7a0b\u5e8f\u6536\u53d1\u5305\u95ee\u9898\u6392\u67e5\u7684\u4e00\u822c\u6d41\u7a0b"}},c={authorsImageUrls:[]},d=[{value:"\u63a5\u53e3 up \u5931\u8d25\u95ee\u9898",id:"\u63a5\u53e3-up-\u5931\u8d25\u95ee\u9898",level:2}],m={toc:d};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,l.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u63a5\u53e3-up-\u5931\u8d25\u95ee\u9898"},"\u63a5\u53e3 up \u5931\u8d25\u95ee\u9898"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u6392\u67e5\u786c\u4ef6\u63a5\u7ebf\u60c5\u51b5"),(0,l.kt)("li",{parentName:"ol"},"\u786e\u8ba4\u7f51\u5361\u662f\u5426 bypass \u5361\uff0c\u68c0\u67e5 bypass \u72b6\u6001"),(0,l.kt)("li",{parentName:"ol"},"\u6536\u96c6 ifconfig x/x\u3001ethtool x/x\u3001ethtool -i x/x\u3001ethtool -S x/x\u3001ethtool -d x/x \u4fe1\u606f"),(0,l.kt)("li",{parentName:"ol"},"\u67e5\u770b dmesg \u4fe1\u606f\u662f\u5426\u6709\u5f02\u5e38"),(0,l.kt)("li",{parentName:"ol"},"\u5224\u65ad\u63a5\u53e3\u5bf9\u5e94\u5173\u7cfb\u662f\u5426\u4e00\u81f4"),(0,l.kt)("li",{parentName:"ol"},"\u89c2\u5bdf\u63a5\u53e3\u706f\u72b6\u6001"),(0,l.kt)("li",{parentName:"ol"},"\u5224\u65ad\u662f\u5426\u8f6f\u4ef6\u95ee\u9898\uff1ambuf \u6cc4\u9732\u5bfc\u81f4\u95ee\u9898"),(0,l.kt)("li",{parentName:"ol"},"\u8f6f\u4ef6\u6392\u67e5\u65e0\u6548\u540e\u67e5\u770b\u5149\u6a21\u5757\u578b\u53f7\uff0c\u5224\u65ad\u5149\u6a21\u5757\u578b\u53f7\u662f\u5426\u517c\u5bb9"),(0,l.kt)("li",{parentName:"ol"},"\u5224\u65ad\u5149\u6a21\u5757\u578b\u53f7\u6ca1\u6709\u95ee\u9898\u540e\uff0c\u5c06\u63a5\u53e3\u7ed1\u5b9a\u5230\u5b98\u65b9\u9a71\u52a8\u8fdb\u884c\u6d4b\u8bd5"),(0,l.kt)("li",{parentName:"ol"},"\u5b98\u65b9\u9a71\u52a8\u4e0d\u80fd\u6b63\u5e38\u5de5\u4f5c\u5219\u5224\u5b9a\u4e3a\u786c\u4ef6\u95ee\u9898\uff0c\u5b98\u65b9\u9a71\u52a8\u80fd\u591f\u6b63\u5e38\u5219\u5224\u65ad\u4e3a\u9a71\u52a8\u95ee\u9898")),(0,l.kt)("p",null,"\u5907\u6ce8\u4fe1\u606f\uff1a\u5f53\u63a5\u53e3\u5df2\u7ecf\u5904\u4e8e up \u72b6\u6001\u65f6\uff0c\u8981\u6210\u529f up\uff0c\u5fc5\u987b\u5148\u6267\u884c down \u64cd\u4f5c\u3002"),(0,l.kt)("h1",{id:"\u63a5\u53e3-down-\u5931\u8d25\u95ee\u9898"},"\u63a5\u53e3 down \u5931\u8d25\u95ee\u9898"),(0,l.kt)("p",null,"\u63a5\u53e3 down \u95ee\u9898\u4e00\u822c\u8868\u73b0\u4e3a\u6267\u884c\u4e86 down \u63a5\u53e3\u540e\u7f51\u5361 link \u706f\u8fd8\u662f\u4eae\u7684\u3001down \u4e86\u63a5\u53e3\u540e\uff0c\u83b7\u53d6\u5230\u7684\u63a5\u53e3\u94fe\u8def\u72b6\u6001\u8fd8\u662f up \u7684\u3002"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u786e\u5b9a\u7f51\u5361\u578b\u53f7\u4e0e\u5bf9\u7aef\u8bbe\u5907\u53ca\u63a5\u53e3\u4e0e\u5bf9\u7aef\u706f\u7684\u5f53\u524d\u72b6\u6001"),(0,l.kt)("li",{parentName:"ol"},"\u6536\u96c6 ifconfig x/x\u3001ethtool x/x\u3001ethtool -i x/x\u3001ethtool -S x/x\u3001ethtool -d x/x \u4fe1\u606f"),(0,l.kt)("li",{parentName:"ol"},"\u67e5\u770b dmesg \u4fe1\u606f\u662f\u5426\u6709\u5f02\u5e38"),(0,l.kt)("li",{parentName:"ol"},"\u67e5\u770b dpdk \u7a0b\u5e8f\u63a5\u53e3\u65e5\u5fd7\u4fe1\u606f\u662f\u5426\u6709\u5f02\u5e38"),(0,l.kt)("li",{parentName:"ol"},"\u67e5\u770b\u63a5\u53e3\u5bf9\u5e94\u5173\u7cfb\u662f\u5426\u4e00\u81f4"),(0,l.kt)("li",{parentName:"ol"},"\u4e0a\u8ff0\u64cd\u4f5c\u6ca1\u6709\u5f02\u5e38\u540e\uff0c\u91cd\u65b0\u6267\u884c up\u3001down \u590d\u73b0\u95ee\u9898\uff0c\u786c\u4ef6\u95ee\u9898\u4e00\u822c\u80fd\u591f\u5fc5\u73b0"),(0,l.kt)("li",{parentName:"ol"},"\u95ee\u9898\u5fc5\u73b0\u540e\uff0c\u67e5\u770b dpdk \u7a0b\u5e8f\u662f\u5426\u4f7f\u80fd lsc \u4e2d\u65ad\uff0c\u4f7f\u80fd\u5219\u5173\u95ed\u91cd\u8bd5\uff0c\u672a\u4f7f\u80fd\u7ee7\u7eed\u4e0b\u4e00\u6b65"),(0,l.kt)("li",{parentName:"ol"},"\u6709\u6761\u4ef6\u5219\u4f7f\u7528 dpdk_proc_info \u7a0b\u5e8f\u6536\u96c6\u5149\u6a21\u5757\u578b\u53f7\u4fe1\u606f\uff0c\u5224\u65ad\u662f\u5426\u662f\u517c\u5bb9\u7684\u5149\u6a21\u5757\uff0c\u65e0\u6761\u4ef6\u5219\u6267\u884c\u7b2c 8 \u6b65"),(0,l.kt)("li",{parentName:"ol"},"\u5c06 down \u4e0d\u6389\u7684\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u5230\u5b98\u65b9\u9a71\u52a8\u6d4b\u8bd5\uff0c\u5224\u65ad\u662f\u5426\u6709\u76f8\u540c\u95ee\u9898"),(0,l.kt)("li",{parentName:"ol"},"\u5b98\u65b9\u9a71\u52a8\u4e5f\u6709\u76f8\u540c\u95ee\u9898\u65f6\uff0c\u6392\u9664\u5355\u4e2a\u7f51\u5361\u7684\u5f71\u54cd\uff0c\u5b98\u65b9\u9a71\u52a8\u6ca1\u6709\u95ee\u9898\u65f6\uff0c\u5bf9\u6bd4\u9a71\u52a8\u4ee3\u7801"),(0,l.kt)("li",{parentName:"ol"},"\u5728\u591a\u5f20\u5361\u4e0a\u7ed1\u5b9a\u5b98\u65b9\u9a71\u52a8\u80fd\u591f\u590d\u73b0\u95ee\u9898\u540e\uff0c\u534f\u540c\u5382\u5546\u5904\u7406")))}f.isMDXComponent=!0}}]);