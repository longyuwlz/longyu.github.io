"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[8542],{3905:function(e,t,p){p.d(t,{Zo:function(){return i},kt:function(){return m}});var r=p(7294);function n(e,t,p){return t in e?Object.defineProperty(e,t,{value:p,enumerable:!0,configurable:!0,writable:!0}):e[t]=p,e}function a(e,t){var p=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),p.push.apply(p,r)}return p}function d(e){for(var t=1;t<arguments.length;t++){var p=null!=arguments[t]?arguments[t]:{};t%2?a(Object(p),!0).forEach((function(t){n(e,t,p[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(p)):a(Object(p)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(p,t))}))}return e}function o(e,t){if(null==e)return{};var p,r,n=function(e,t){if(null==e)return{};var p,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)p=a[r],t.indexOf(p)>=0||(n[p]=e[p]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)p=a[r],t.indexOf(p)>=0||Object.prototype.propertyIsEnumerable.call(e,p)&&(n[p]=e[p])}return n}var u=r.createContext({}),l=function(e){var t=r.useContext(u),p=t;return e&&(p="function"==typeof e?e(t):d(d({},t),e)),p},i=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var p=e.components,n=e.mdxType,a=e.originalType,u=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),c=l(p),m=n,s=c["".concat(u,".").concat(m)]||c[m]||k[m]||a;return p?r.createElement(s,d(d({ref:t},i),{},{components:p})):r.createElement(s,d({ref:t},i))}));function m(e,t){var p=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=p.length,d=new Array(a);d[0]=c;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:n,d[1]=o;for(var l=2;l<a;l++)d[l]=p[l];return r.createElement.apply(null,d)}return r.createElement.apply(null,p)}c.displayName="MDXCreateElement"},326:function(e,t,p){p.r(t),p.d(t,{assets:function(){return i},contentTitle:function(){return u},default:function(){return m},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return k}});var r=p(7462),n=p(3366),a=(p(7294),p(3905)),d=["components"],o={},u=void 0,l={permalink:"/longyu.github.io/blog/dpdk/dpdk-pdump\u5de5\u5177\u7f16\u8bd1\u8fd0\u884c",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/dpdk-pdump\u5de5\u5177\u7f16\u8bd1\u8fd0\u884c.md",source:"@site/blog/dpdk/dpdk-pdump\u5de5\u5177\u7f16\u8bd1\u8fd0\u884c.md",title:"dpdk/dpdk-pdump\u5de5\u5177\u7f16\u8bd1\u8fd0\u884c",description:"dpdk-pdump \u662f\u4ec0\u4e48",date:"2022-06-19T07:40:00.000Z",formattedDate:"2022\u5e746\u670819\u65e5",tags:[],readingTime:4.565,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk/dpdk-kni\u4e0eethtool\u8bd5\u73a9\u95ee\u9898\u8bb0\u5f55",permalink:"/longyu.github.io/blog/dpdk/dpdk-kni\u4e0eethtool\u8bd5\u73a9\u95ee\u9898\u8bb0\u5f55"},nextItem:{title:"dpdk/dpdk-pdump\u7f16\u8bd1\u8fd0\u884c",permalink:"/longyu.github.io/blog/dpdk/dpdk-pdump\u7f16\u8bd1\u8fd0\u884c"}},i={authorsImageUrls:[]},k=[{value:"dpdk-pdump \u662f\u4ec0\u4e48",id:"dpdk-pdump-\u662f\u4ec0\u4e48",level:2},{value:"\u7f16\u8bd1 dpdk-pdump",id:"\u7f16\u8bd1-dpdk-pdump",level:2},{value:"\u4f7f\u7528 dpdk-pdump",id:"\u4f7f\u7528-dpdk-pdump",level:2},{value:"no driver for pcap \u7684\u95ee\u9898",id:"no-driver-for-pcap-\u7684\u95ee\u9898",level:2},{value:"\u65e0\u6cd5\u4e0e primary server \u7aef\u901a\u4fe1\u7684\u95ee\u9898",id:"\u65e0\u6cd5\u4e0e-primary-server-\u7aef\u901a\u4fe1\u7684\u95ee\u9898",level:2},{value:"\u67e5\u770b dump \u51fa\u7684\u6570\u636e\u5305\u6587\u4ef6",id:"\u67e5\u770b-dump-\u51fa\u7684\u6570\u636e\u5305\u6587\u4ef6",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],c={toc:k};function m(e){var t=e.components,p=(0,n.Z)(e,d);return(0,a.kt)("wrapper",(0,r.Z)({},c,p,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"dpdk-pdump-\u662f\u4ec0\u4e48"},"dpdk-pdump \u662f\u4ec0\u4e48"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump \u662f dpdk \u63d0\u4f9b\u7684\u4e00\u4e2a\u5de5\u5177\u3002\u5b83\u53ef\u4ee5\u53ef\u4ee5\u4f5c\u4e3a secondary \u7a0b\u5e8f\u8fd0\u884c\uff0c\u80fd\u591f\u6355\u83b7 dpdk \u7684\u7aef\u53e3\u7684\u6570\u636e\u5305\u3002")),(0,a.kt)("h2",{id:"\u7f16\u8bd1-dpdk-pdump"},"\u7f16\u8bd1 dpdk-pdump"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump")," \u5de5\u5177\u7684\u6e90\u7801\u4f4d\u4e8e dpdk \u6e90\u7801\u6839\u76ee\u5f55\u4e0b\u7684 ",(0,a.kt)("strong",{parentName:"p"},"./app/pdump")," \u76ee\u5f55\u4e2d\uff0c\u4e0d\u9700\u8981\u50cf examples \u4e2d\u7684 demo \u4e00\u6837\u5355\u72ec\u7f16\u8bd1\uff0c\u5b83\u4f1a\u5728\u7f16\u8bd1 dpdk \u7684\u540c\u65f6\u4e5f\u88ab\u7f16\u8bd1\uff0c\u6211\u4eec\u53ef\u4ee5\u5728\u7f16\u8bd1\u751f\u6210\u7684 app \u76ee\u5f55\u4e2d\u627e\u5230\u8fd9\u4e2a\u7a0b\u5e8f\u3002"),(0,a.kt)("p",null,"\u5728\u6211\u7684\u865a\u62df\u673a\u4e2d\uff0c\u7f16\u8bd1 dpdk \u540e\uff0c\u5b83\u7684\u4f4d\u7f6e\u5982\u4e0b\uff1a"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"/home/longyu/dpdk-stable-17.05.2/x86_64-native-linuxapp-gcc/app/dpdk-pdump")),(0,a.kt)("h2",{id:"\u4f7f\u7528-dpdk-pdump"},"\u4f7f\u7528 dpdk-pdump"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump \u7684\u7528\u6cd5\u5982\u4e0b\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"usage: ./dpdk-pdump [EAL options] -- --pdump '(port=<port id> | device_id=<pci id or vdev name>),(queue=<queue_id>),(rx-dev=<iface or pcap file> | tx-dev=<iface or pcap file>,[ring-size=<ring size>default:16384],[mbuf-size=<mbuf data size>default:2176],[total-num-mbufs=<number of mbufs>default:65535]' [--server-socket-path=<server socket dir>default:/var/run/.dpdk/ (or) ~/.dpdk/] [--client-socket-path=<client socket dir>default:/var/run/.dpdk/ (or) ~/.dpdk/]```\n\n**dpdk-pdump** \u9700\u8981\u4f9d\u8d56\u4e00\u4e2a **dpdk primary** \u8fdb\u7a0b\uff0c\u6211\u5c31\u4ee5 **l2fwd** \u547d\u4ee4\u4f5c\u4e3a **dpdk primary** \u8fdb\u7a0b\u3002\n\n\u6709\u4e86 **dpdk primary** \u8fdb\u7a0b\u4e4b\u540e\uff0c\u6839\u636e\u6211\u7684\u73af\u5883\uff0c\u6211\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\u884c\u542f\u52a8 dpdk-pdump\n```bash\n    sudo ./dpdk-pdump -n 4 -- --pdump 'port=0,queue=*,rx-dev=./rx-pcap'\n")),(0,a.kt)("h2",{id:"no-driver-for-pcap-\u7684\u95ee\u9898"},"no driver for pcap \u7684\u95ee\u9898"),(0,a.kt)("p",null,"\u6211\u7b2c\u4e00\u6b21\u6267\u884c\u4e0a\u9762\u7684\u547d\u4ee4\u65f6\u7a0b\u5e8f\u5f02\u5e38\u7ec8\u6b62\uff0c\u9519\u8bef\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"EAL: no driver found for eth_pcap_rx_0\nEAL: Driver, cannot attach the device")),(0,a.kt)("p",null,"\u901a\u8fc7\u641c\u7d22\uff0c\u6211\u53d1\u73b0\u4e0a\u9762\u7684\u9519\u8bef\u662f\u56e0\u4e3a\u5728\u7f16\u8bd1 dpdk \u65f6\u6ca1\u6709\u542f\u7528 PCAP \u76f8\u5173\u7684\u529f\u80fd\u6240\u81f4\uff0c\u53c2\u8003\u94fe\u63a5\u5982\u4e0b\uff1a"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/44357995/dpdk-pdump-no-driver-found-for-net-pcap-rx-0"},"dpdk-pdump-no-driver-found-for-net-pcap")),(0,a.kt)("p",null,"\u6839\u636e\u7f51\u9875\u4e2d\u7684\u56de\u7b54\u6211\u5bf9 ",(0,a.kt)("strong",{parentName:"p"},".config")," \u6587\u4ef6\u505a\u4e86\u5982\u4e0b\u4fee\u6539\u4ee5\u4f7f\u80fd ",(0,a.kt)("strong",{parentName:"p"},"PCAP")," \u7684\u76f8\u5173\u529f\u80fd\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@longyu-pc:~/dpdk-stable-17.05.2/x86_64-native-linuxapp-gcc$ grep 'PCAP' .config\n# Compile software PMD backed by PCAP files\nCONFIG_RTE_LIBRTE_PMD_PCAP=y\nCONFIG_RTE_PORT_PCAP=y\n")),(0,a.kt)("p",null,"\u8fd9\u4e4b\u540e\u91cd\u65b0\u7f16\u8bd1\u540e\u7ee7\u7eed\u6d4b\u8bd5\uff0c\u8fd9\u4e2a\u95ee\u9898\u5f97\u5230\u4e86\u89e3\u51b3\uff0c\u53ef\u53c8\u9047\u5230\u4e86\u4e00\u4e2a\u65b0\u7684\u95ee\u9898\u3002"),(0,a.kt)("h2",{id:"\u65e0\u6cd5\u4e0e-primary-server-\u7aef\u901a\u4fe1\u7684\u95ee\u9898"},"\u65e0\u6cd5\u4e0e primary server \u7aef\u901a\u4fe1\u7684\u95ee\u9898"),(0,a.kt)("p",null,"\u89e3\u51b3\u4e86 ",(0,a.kt)("strong",{parentName:"p"},"pcap driver")," \u7684\u95ee\u9898\u540e\uff0c\u6211\u91cd\u65b0\u6267\u884c ",(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump")," \u65f6\u65b0\u7684\u62a5\u9519\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"PDUMP: failed to send to server:No such file or directory,\npdump_create_client_socket:702 PDUMP: client request for pdump\nenable/disable failed PDUMP: failed to send to server:No such file or\ndirectory, pdump_create_client_socket:702 PDUMP: client request for\npdump enable/disable failed")),(0,a.kt)("p",null,"\u901a\u8fc7\u9605\u8bfb\u5b98\u65b9\u7f51\u9875\u4e2d\u7684\u8bf4\u660e\uff0c\u6211\u53d1\u73b0\u4e86\u95ee\u9898\u6240\u5728\u3002\u5b98\u65b9\u7684\u8bf4\u660e\u4e2d\u63d0\u5230 ",(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump")," \u5de5\u5177\u53ea\u80fd\u4e0e\u521d\u59cb\u5316\u4e86 ",(0,a.kt)("strong",{parentName:"p"},"packet capture framework")," \u7684\u4e3b\u7a0b\u5e8f\u901a\u4fe1\uff0c\u800c ",(0,a.kt)("strong",{parentName:"p"},"packet capture framework")," \u7684\u521d\u59cb\u5316\u9700\u8981\u4fee\u6539\u7a0b\u5e8f\u7684\u6e90\u7801\u3002"),(0,a.kt)("p",null,"\u5728 dpdk \u63d0\u4f9b\u7684\u5de5\u5177\u4e2d\uff0c",(0,a.kt)("strong",{parentName:"p"},"testpmd")," \u5de5\u5177\u7684\u6e90\u7801\u4e2d\u6dfb\u52a0\u4e86 ",(0,a.kt)("strong",{parentName:"p"},"packet capture framework")," \u7684\u521d\u59cb\u5316\u4ee3\u7801\uff0c\u6211\u67e5\u770b\u76f8\u5173\u4ee3\u7801\uff0c\u627e\u5230\u4e86\u5982\u4e0b\u6e90\u7801\u884c\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},'    diag = rte_eal_init(argc, argv);\n        if (diag < 0)\n            rte_panic("Cannot init EAL\\n");\n    \n    #ifdef RTE_LIBRTE_PDUMP\n        /* initialize packet capture framework */\n        rte_pdump_init(NULL);\n    #endif\n')),(0,a.kt)("p",null,"\u4e0a\u9762\u7684\u4ee3\u7801\u4f1a\u5728 ",(0,a.kt)("strong",{parentName:"p"},"RTE_LIBRTE_PDUMP")," \u5b8f\u5b9a\u4e49\u65f6\u6267\u884c ",(0,a.kt)("strong",{parentName:"p"},"rte_pdump_init")," \u51fd\u6570\u6765\u8fdb\u884c\u5fc5\u8981\u7684\u521d\u59cb\u5316\uff0c",(0,a.kt)("strong",{parentName:"p"},"RTE_LIBRTE_PDUMP")," \u529f\u80fd\u5728 ",(0,a.kt)("strong",{parentName:"p"},".config")," \u4e2d\u8fdb\u884c\u914d\u7f6e\uff0c\u9ed8\u8ba4\u4e3a\u5f00\u542f\u3002"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},".config")," \u4e2d\u4e0e ",(0,a.kt)("strong",{parentName:"p"},"RTE_LIBRTE_PDUMP")," \u529f\u80fd\u76f8\u5173\u7684\u914d\u7f6e\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"    # Compile architecture we compile for. pdump library\n    CONFIG_RTE_LIBRTE_PDUMP=y\n")),(0,a.kt)("p",null,"\u5f53\u4f7f\u7528\u80fd\u4e86\u8fd9\u4e2a\u53c2\u6570\u540e\uff0c\u7f16\u8bd1\u76ee\u5f55\u4e0b\u7684\u5934\u6587\u4ef6 ",(0,a.kt)("strong",{parentName:"p"},"rte_config.h")," \u4e2d\u4f1a\u5b9a\u4e49 ",(0,a.kt)("strong",{parentName:"p"},"RTE_LIBRTE_PDUMP")," \u5b8f\uff0c\u76f8\u5173\u7684\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-c"},"    #undef RTE_LIBRTE_PDUMP\n    #define RTE_LIBRTE_PDUMP 1\n")),(0,a.kt)("p",null,"\u6211\u6309\u7167\u4e0a\u9762\u7684\u63cf\u8ff0\u4fee\u6539\u4e86 dpdk-pdump \u7a0b\u5e8f\u7684\u6e90\u7801\u540e\uff0c\u7ec8\u4e8e\u80fd\u591f\u6b63\u5e38\u6267\u884c\u4e86\uff01"),(0,a.kt)("h2",{id:"\u67e5\u770b-dump-\u51fa\u7684\u6570\u636e\u5305\u6587\u4ef6"},"\u67e5\u770b dump \u51fa\u7684\u6570\u636e\u5305\u6587\u4ef6"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump")," \u4e2d\u5df2\u7ecf\u5bf9 dump \u51fa\u7684\u539f\u59cb\u6570\u636e\u5305\u8fdb\u884c\u4e86\u8f6c\u5316\uff0c\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528 ",(0,a.kt)("strong",{parentName:"p"},"tcpdump")," \u7684 ",(0,a.kt)("strong",{parentName:"p"},"-r")," \u9009\u9879\u6765\u67e5\u770b\u751f\u6210\u7684\u6587\u4ef6\u3002"),(0,a.kt)("p",null," \u6211\u6307\u5b9a ",(0,a.kt)("strong",{parentName:"p"},"dpdk-pdump dump")," \u7aef\u53e3\u63a5\u6536\u5230\u7684\u5305\uff0c\u6307\u5b9a\u5b58\u50a8\u6587\u4ef6\u4e3a ",(0,a.kt)("strong",{parentName:"p"},"./rx-pcap"),"\u3002\u6211\u53ea\u9700\u8981\u6267\u884c\u4e0b\u9762\u7684\u547d\u4ee4\u5c31\u53ef\u4ee5\u770b\u5230\u63a5\u6536\u5230\u7684\u6570\u636e\u5305\u7684\u8be6\u7ec6\u4fe1\u606f\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"    sudo tcpdump -r ./rx-pcap\n")),(0,a.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk \u63d0\u4f9b\u7684\u7a0b\u5e8f\u5728\u4f7f\u7528\u65f6\u53ef\u80fd\u4f1a\u9047\u5230\u4e00\u4e9b\u95ee\u9898\uff0c\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\u7684\u4e00\u822c\u6b65\u9aa4\u5982\u4e0b\uff1a")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u67e5\u770b\u4f9d\u8d56\u7684\u529f\u80fd\u662f\u5426\u5f00\u542f\uff08\u4fee\u6539 .config \u6587\u4ef6\uff09"),(0,a.kt)("li",{parentName:"ol"},"\u4fee\u6539\u5fc5\u8981\u7684\u6e90\u4ee3\u7801\u4ee5\u6267\u884c\u5fc5\u8981\u7684\u521d\u59cb\u5316\u5de5\u4f5c"),(0,a.kt)("li",{parentName:"ol"},"\u91cd\u65b0\u7f16\u8bd1\u540e\u518d\u6b21\u6267\u884c")))}m.isMDXComponent=!0}}]);