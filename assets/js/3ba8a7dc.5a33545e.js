"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[803],{3905:function(e,n,t){t.d(n,{Zo:function(){return i},kt:function(){return c}});var l=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,l,o=function(e,n){if(null==e)return{};var t,l,o={},a=Object.keys(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var d=l.createContext({}),u=function(e){var n=l.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},i=function(e){var n=u(e.components);return l.createElement(d.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},m=l.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,d=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),m=u(t),c=o,g=m["".concat(d,".").concat(c)]||m[c]||s[c]||a;return t?l.createElement(g,r(r({ref:n},i),{},{components:t})):l.createElement(g,r({ref:n},i))}));function c(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,r=new Array(a);r[0]=m;var p={};for(var d in n)hasOwnProperty.call(n,d)&&(p[d]=n[d]);p.originalType=e,p.mdxType="string"==typeof e?e:o,r[1]=p;for(var u=2;u<a;u++)r[u]=t[u];return l.createElement.apply(null,r)}return l.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9980:function(e,n,t){t.r(n),t.d(n,{assets:function(){return i},contentTitle:function(){return d},default:function(){return c},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return s}});var l=t(7462),o=t(3366),a=(t(7294),t(3905)),r=["components"],p={},d=void 0,u={permalink:"/longyu.github.io/blog/dpdk/\u7f16\u8bd1dpdk-19.10\u65f6\u9047\u5230\u7684\u95ee\u9898",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/\u7f16\u8bd1dpdk-19.10\u65f6\u9047\u5230\u7684\u95ee\u9898.md",source:"@site/blog/dpdk/\u7f16\u8bd1dpdk-19.10\u65f6\u9047\u5230\u7684\u95ee\u9898.md",title:"dpdk/\u7f16\u8bd1dpdk-19.10\u65f6\u9047\u5230\u7684\u95ee\u9898",description:"\u672a\u5b89\u88c5 numa \u5e93\u7684\u95ee\u9898",date:"2022-06-20T23:48:14.000Z",formattedDate:"2022\u5e746\u670820\u65e5",tags:[],readingTime:7.6,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk/dpdk \u95ee\u9898\u6392\u67e5\u7684\u7b2c\u4e00\u5173\uff1a\u57fa\u7840\u73af\u5883\u7684\u6392\u67e5",permalink:"/longyu.github.io/blog/dpdk/dpdk \u95ee\u9898\u6392\u67e5\u7684\u7b2c\u4e00\u5173\uff1a\u57fa\u7840\u73af\u5883\u7684\u6392\u67e5"},nextItem:{title:"dpdk/dpdk-kni\u4e0eethtool\u8bd5\u73a9\u95ee\u9898\u8bb0\u5f55",permalink:"/longyu.github.io/blog/dpdk/dpdk-kni\u4e0eethtool\u8bd5\u73a9\u95ee\u9898\u8bb0\u5f55"}},i={authorsImageUrls:[]},s=[{value:"\u672a\u5b89\u88c5 numa \u5e93\u7684\u95ee\u9898",id:"\u672a\u5b89\u88c5-numa-\u5e93\u7684\u95ee\u9898",level:2},{value:"\u52a0\u8f7d\u7f16\u8bd1\u51fa\u7684\u5185\u6838\u6a21\u5757",id:"\u52a0\u8f7d\u7f16\u8bd1\u51fa\u7684\u5185\u6838\u6a21\u5757",level:2},{value:"\u7f16\u8bd1 examples \u76ee\u5f55\u4e0b\u7684 demo",id:"\u7f16\u8bd1-examples-\u76ee\u5f55\u4e0b\u7684-demo",level:2},{value:"\u7ed1\u5b9a\u7f51\u7edc\u7aef\u53e3\u5230\u5185\u6838\u6a21\u5757\u7684\u95ee\u9898",id:"\u7ed1\u5b9a\u7f51\u7edc\u7aef\u53e3\u5230\u5185\u6838\u6a21\u5757\u7684\u95ee\u9898",level:2},{value:"\u6267\u884c testpmd \u6d4b\u8bd5\u7a0b\u5e8f",id:"\u6267\u884c-testpmd-\u6d4b\u8bd5\u7a0b\u5e8f",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],m={toc:s};function c(e){var n=e.components,t=(0,o.Z)(e,r);return(0,a.kt)("wrapper",(0,l.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u672a\u5b89\u88c5-numa-\u5e93\u7684\u95ee\u9898"},"\u672a\u5b89\u88c5 numa \u5e93\u7684\u95ee\u9898"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-make"},"/home/longyu/dpdk-19.08/lib/librte_eal/linux/eal/eal_memory.c:32:10: fatal error: numa.h: No such file or directory\n #include <numa.h>\n")),(0,a.kt)("p",null,"\u5b98\u65b9\u7f51\u9875\u4e2d\u7684\u76f8\u5173\u8bf4\u660e\u5185\u5bb9\u5982\u4e0b\uff1a"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Library for handling NUMA (Non Uniform Memory Access).\nnumactl-devel in Red Hat/Fedora;\nlibnuma-dev in Debian/Ubuntu;")),(0,a.kt)("p",null,"\u6211\u662f\u5728 Debian \u7cfb\u7edf\u4e2d\u7f16\u8bd1\uff0c\u9700\u8981\u5b89\u88c5 libnuma-dev \u5e93\uff0c\u5b89\u88c5\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08$ sudo apt-get install libnuma-dev\n")),(0,a.kt)("h2",{id:"\u52a0\u8f7d\u7f16\u8bd1\u51fa\u7684\u5185\u6838\u6a21\u5757"},"\u52a0\u8f7d\u7f16\u8bd1\u51fa\u7684\u5185\u6838\u6a21\u5757"),(0,a.kt)("p",null,"\u52a0\u8f7d igb_uio \u4e4b\u524d\u9700\u8981\u5148\u52a0\u8f7d uio \u5185\u6838\u6a21\u5757\u3002uio \u6a21\u5757\u4e00\u822c\u90fd\u5df2\u7ecf\u5b89\u88c5\u5230\u4e86\u7cfb\u7edf\u4e2d\u7684 /usr/lib/modules/$(uname -r)/ \u76ee\u5f55\u4e2d\uff0c\u53ea\u662f\u4e00\u822c\u6ca1\u6709\u88ab\u4f7f\u7528\uff0c\u8fd9\u91cc\u53ef\u4ee5\u901a\u8fc7 modprobe uio \u76f4\u63a5\u52a0\u8f7d\u6b64\u5185\u6838\u6a21\u5757\u3002"),(0,a.kt)("h2",{id:"\u7f16\u8bd1-examples-\u76ee\u5f55\u4e0b\u7684-demo"},"\u7f16\u8bd1 examples \u76ee\u5f55\u4e0b\u7684 demo"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u68c0\u67e5 RTE_SDK \u4e0e RTE_TARGET \u73af\u5883\u53d8\u91cf\u662f\u5426\u8bbe\u5b9a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ echo -e  $RTE_SDK "\\n" $RTE_TARGET\n/home/longyu/dpdk-19.08 \n x86_64-native-linuxapp-gcc\n')),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u6ce8\u610f\u8fd9\u91cc\u7684 RTE_SDK \u4e3a dpdk \u6e90\u7801\u7684\u6839\u76ee\u5f55\uff0cRTE_RARGET \u4e3a\u7f16\u8bd1\u7684\u76ee\u6807\u8bbe\u5907\u5168\u540d\u3002"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u7f16\u8bd1 examples \u76ee\u5f55\u4e0b\u7684 helloworld demo"),(0,a.kt)("p",{parentName:"li"},"\u8fdb\u5165\u5230 helloworld \u5b50\u76ee\u5f55\u4e2d\uff0c\u6267\u884c make \u547d\u4ee4\uff0c\u8f93\u51fa\u62a5\u9519\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ make \n/bin/sh: 1: pkg-config: not found\n/home/longyu/dpdk-19.08/mk/internal/rte.extvars.mk:29: *** Cannot find .config in /home/longyu/dpdk-19.08/x86_64-native-linuxapp-gcc.  Stop.\nlongyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ echo $RTE_SDK\n/home/longyu/dpdk-19.08\n")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u89e3\u51b3 pkg-config not found \u7684\u95ee\u9898")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"# \u67e5\u770b\u6587\u4ef6\u662f\u5426\u5b58\u5728\nlongyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ sudo updatedb\nlongyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ locate 'pkg-config'\n/etc/dpkg/dpkg.cfg.d/pkg-config-hook-config\n/var/cache/apt/archives/pkg-config_0.29-6_amd64.deb\n/var/lib/dpkg/info/pkg-config.list\n\n# \u6587\u4ef6\u4e0d\u5b58\u5728\u5219\u5b89\u88c5\nlongyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ sudo apt-get install pkg-config\n\n# \u5b58\u5728\u5219\u68c0\u67e5\u73af\u5883\u53d8\u91cf\u914d\u7f6e\n")),(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u89e3\u51b3\u627e\u4e0d\u5230 .config \u6587\u4ef6\u7684\u95ee\u9898")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ make\n/home/longyu/dpdk-19.08/mk/internal/rte.extvars.mk:29: *** Cannot find .config in /home/longyu/dpdk-19.08/x86_64-native-linuxapp-gcc.  Stop.\n")),(0,a.kt)("p",{parentName:"li"},"\u5982\u679c\u7f16\u8bd1\u65f6\u6709\u4e0a\u9762\u7684\u9519\u8bef\uff0c\u90a3\u4e48\u4f60\u9700\u8981\u68c0\u67e5\u7f16\u8bd1\u51fa\u7684\u76ee\u6807\u4e0e RTE_TARGET \u53d8\u91cf\u8bbe\u5b9a\u7684\u662f\u5426\u4e00\u81f4\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u7f16\u8bd1\u6210\u529f\u7684\u8f93\u51fa"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ make\n  CC main.o\n  LD helloworld\n  INSTALL-APP helloworld\n  INSTALL-MAP helloworld.map\nlongyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ ls ./build/helloworld\n./build/helloworld\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u6267\u884c helloworld \u65f6\u7a0b\u5e8f panic "),(0,a.kt)("p",{parentName:"li"},"\u6211\u5728\u6267\u884c helloworld \u7a0b\u5e8f\u65f6\u9047\u5230\u4e86\u5982\u4e0b\u9519\u8bef\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ sudo ./build/helloworld\nEAL: Detected 2 lcore(s)\nEAL: Detected 1 NUMA nodes\nEAL: Multi-process socket /var/run/dpdk/rte/mp_socket\nEAL: Selected IOVA mode 'PA'\nEAL: No free hugepages reported in hugepages-2048kB\nEAL: No available hugepages reported in hugepages-2048kB\nEAL: No available hugepages reported in hugepages-1048576kB\nEAL: FATAL: Cannot get hugepage information.\nEAL: Cannot get hugepage information.\nPANIC in main():\nCannot init EAL\n5: [./build/helloworld(_start+0x2a) [0x55d9e3802e3a]]\n4: [/lib/x86_64-linux-gnu/libc.so.6(__libc_start_main+0xeb) [0x7fa75466d09b]]\n3: [./build/helloworld(+0xa9e0c) [0x55d9e364ee0c]]\n2: [./build/helloworld(__rte_panic+0xba) [0x55d9e365f480]]\n1: [./build/helloworld(rte_dump_stack+0x1b) [0x55d9e38dfa7b]]\nAborted\n")),(0,a.kt)("p",{parentName:"li"},"\u4ece\u4e0a\u9762\u7684\u8f93\u51fa\u4e2d\u6211\u53d1\u73b0\u662f hugepage \u76f8\u5173\u7684\u95ee\u9898\uff0c\u6d4f\u89c8\u5b98\u65b9\u7f51\u9875\u6587\u6863\uff0c\u6211\u6267\u884c\u4e86\u4e0b\u9762\u7684\u64cd\u4f5c\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ sudo su -c 'echo 128 > /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages'\n")),(0,a.kt)("p",{parentName:"li"},"\u8fd9\u4e4b\u540e\u6211\u91cd\u65b0\u6267\u884c helloworld \u7a0b\u5e8f\uff0c\u5f97\u5230\u7684\u8f93\u51fa\u5982\u4e0b\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ sudo ./build/helloworld\nEAL: Detected 2 lcore(s)\nEAL: Detected 1 NUMA nodes\nEAL: Multi-process socket /var/run/dpdk/rte/mp_socket\nEAL: Selected IOVA mode 'PA'\nEAL: No available hugepages reported in hugepages-1048576kB\nEAL: Probing VFIO support...\nEAL: WARNING: cpu flags constant_tsc=yes nonstop_tsc=no -> using unreliable clock cycles !\nEAL: PCI device 0000:00:03.0 on NUMA socket -1\nEAL:   Invalid NUMA socket, default to 0\nEAL:   probe driver: 8086:100e net_e1000_em\nhello from core 1\nhello from core 0\nlongyu@longyu-pc:~/dpdk-19.08/examples/helloworld$ \n")),(0,a.kt)("p",{parentName:"li"},"\u5c3d\u7ba1\u6267\u884c\u4e86\u4e0a\u9762\u7684\u64cd\u4f5c\u4e4b\u540e\uff0chelloworld \u80fd\u591f\u6b63\u5e38\u6267\u884c\uff0c\u4f46\u662f\u5bf9\u4e8e\u4e0a\u8ff0\u64cd\u4f5c\u80cc\u540e\u6d89\u53ca\u7684\u4e1c\u897f\u6211\u5374\u6ca1\u6709\u8fdb\u4e00\u6b65\u7684\u8ba4\u8bc6\uff0c\u8fd9\u6709\u5f85\u6211\u5bf9 dpdk \u7684\u8fdb\u4e00\u6b65\u7814\u7a76\u3002 \t"))),(0,a.kt)("h2",{id:"\u7ed1\u5b9a\u7f51\u7edc\u7aef\u53e3\u5230\u5185\u6838\u6a21\u5757\u7684\u95ee\u9898"},"\u7ed1\u5b9a\u7f51\u7edc\u7aef\u53e3\u5230\u5185\u6838\u6a21\u5757\u7684\u95ee\u9898"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"lspci not found \u7684\u95ee\u9898"),(0,a.kt)("p",{parentName:"li"},"\u7ed1\u5b9a\u7f51\u7edc\u7aef\u53e3\u5230\u5185\u6838\u6a21\u5757\u65f6\u6709\u5982\u4e0b\u62a5\u9519\u4fe1\u606f\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08$ sudo ./usertools/dpdk-devbind.py --bind=igb_uio ens33\n'lspci' not found - please install 'pciutils'\n")),(0,a.kt)("p",{parentName:"li"},"\u6839\u636e\u63d0\u793a\u4fe1\u606f\u6267\u884c\u5982\u4e0b\u547d\u4ee4\uff0c\u5b89\u88c5 pciutils\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08$ sudo apt-get install pciutils\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u63a5\u53e3\u6b63\u5728\u4f7f\u7528\u5bfc\u81f4\u7ed1\u5b9a\u7aef\u53e3\u5931\u8d25\u7684\u95ee\u9898"),(0,a.kt)("p",{parentName:"li"},"\u89e3\u51b3\u4e86 lspci \u547d\u4ee4\u627e\u4e0d\u5230\u7684\u95ee\u9898\u4e4b\u540e\u6211\u91cd\u65b0\u6267\u884c\u7ed1\u5b9a\u7aef\u53e3\u7684\u547d\u4ee4\uff0c\u6709\u5982\u4e0b\u8f93\u51fa\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08$ sudo ./usertools/dpdk-devbind.py --bind=igb_uio ens3\nWarning: routing table indicates that interface 0000:00:03.0 is active. Not modifying\n")),(0,a.kt)("p",{parentName:"li"},"\u4ece\u4e0a\u9762\u7684\u8f93\u51fa\u4e2d\uff0c\u6211\u786e\u5b9a\u7ed1\u5b9a\u7aef\u53e3\u5931\u8d25\u4e86\uff0c\u6211\u671b\u6587\u751f\u4e49\u7684\u6293\u4f4f\u4e86 routing table \u8fd9\u4e2a\u540d\u8bcd\uff0c\u89c9\u5f97\u5e94\u8be5\u6e05\u9664\u8def\u7531\u8868\u7684\u5185\u5bb9\uff0c\u5728\u7f51\u4e0a\u641c\u4e86\u4e00\u4e0b\u6ca1\u6709\u53d1\u73b0\u8be5\u5982\u4f55\u53bb\u505a\u3002\u8fd9\u4e4b\u540e\u6211\u60f3\u8d77\u4e86 TCP/IP \u534f\u8bae\u6808\u4e2d\u5bf9\u5173\u95ed\u7f51\u7edc\u8bbe\u5907\u7684\u63cf\u8ff0\uff0c\u8bb0\u5f97\u5728\u5173\u95ed\u7f51\u7edc\u8bbe\u5907\u7684\u65f6\u5019\u4f1a\u6e05\u7a7a\u8def\u7531\u8868\u3002\u57fa\u4e8e\u8fd9\u6837\u7684\u8ba4\u8bc6\uff0c\u6211\u6267\u884c\u4e86\u5982\u4e0b\u547d\u4ee4 down \u6389\u5f85\u4f7f\u7528\u7684\u7f51\u7edc\u8bbe\u5907\uff1a"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08$ sudo ifconfig ens3 down\n")),(0,a.kt)("p",{parentName:"li"}," \u6267\u884c\u4e86\u8fd9\u4e00\u6b65\u540e\u6211\u53d1\u73b0 ssh \u8fde\u63a5\u5f02\u5e38\u4e86\uff0c\u8fd9\u624d\u8ba9\u6211\u610f\u8bc6\u5230\u6211\u5c31\u662f\u901a\u8fc7\u8fd9\u4e2a\u7f51\u5361\u8bbe\u5907\u8fde\u63a5\u5230\u865a\u62df\u673a\u4e2d\u7684\uff0c\u5173\u95ed\u4e86\u8bbe\u5907\u4e4b\u540e\u7f51\u7edc\u65ad\u5f00\uff0cssh \u5c31\u5931\u6548\u4e86\u3002"),(0,a.kt)("p",{parentName:"li"},"\u8fd9\u4e2a\u95ee\u9898\u7684\u89e3\u51b3\u65b9\u6cd5\u5982\u4e0b\uff1a"),(0,a.kt)("blockquote",{parentName:"li"},(0,a.kt)("p",{parentName:"blockquote"},"\u5728\u865a\u62df\u673a\u4e2d\u6dfb\u52a0\u4e24\u5757\u7f51\u5361\uff0c\u4e00\u5757\u7528\u4e8e\u6b63\u5e38\u7684\u8fde\u63a5\uff0c\u4e00\u5757\u7528\u4e8e\u6d4b\u8bd5\u3002")))),(0,a.kt)("h2",{id:"\u6267\u884c-testpmd-\u6d4b\u8bd5\u7a0b\u5e8f"},"\u6267\u884c testpmd \u6d4b\u8bd5\u7a0b\u5e8f"),(0,a.kt)("p",null,"\u6307\u5b9a\u5982\u4e0b\u53c2\u6570\uff0c\u6267\u884c testpmd \u547d\u4ee4\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"longyu@longyu-pc:~/dpdk-19.08/x86_64-native-linux-gcc/app$ sudo ./testpmd -l 0-1 -n 1 -- -i --portmask=0x1 --nb-cores=1\n")),(0,a.kt)("p",null,"\u4ee5\u4e0a\u53c2\u6570\u9700\u8981\u6839\u636e\u6267\u884c\u7684\u73af\u5883\u8fdb\u884c\u4fee\u6539\uff01"),(0,a.kt)("p",null,"\u67e5\u770b\u7aef\u53e3\u4fe1\u606f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"testpmd> show port info 0\n\n********************* Infos for port 0  *********************\nMAC address: 52:54:00:CE:BA:AD\nDevice name: 0000:00:03.0\nDriver name: net_e1000_em\nConnect to socket: 0\nmemory allocation on the socket: 0\nLink status: up\nLink speed: 1000 Mbps\nLink duplex: full-duplex\nMTU: 1500\nPromiscuous mode: enabled\nAllmulticast mode: disabled\nMaximum number of MAC addresses: 15\nMaximum number of MAC addresses of hash filtering: 0\nVLAN offload: \n  strip off \n  filter off \n  qinq(extend) off \nNo RSS offload flow type is supported.\nMinimum size of RX buffer: 256\nMaximum configurable length of RX packet: 16128\nCurrent number of RX queues: 1\nMax possible RX queues: 1\nMax possible number of RXDs per queue: 4096\nMin possible number of RXDs per queue: 32\nRXDs number alignment: 8\nCurrent number of TX queues: 1\nMax possible TX queues: 1\nMax possible number of TXDs per queue: 4096\nMin possible number of TXDs per queue: 32\nTXDs number alignment: 8\nMax segment number per packet: 255\nMax segment number per MTU/TSO: 255\n")),(0,a.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u7f16\u8bd1 latest dpdk \u7684\u8fc7\u7a0b\u4e2d\u4f1a\u9047\u5230\u5f88\u591a\u7684\u95ee\u9898\uff0c\u4e00\u4e9b\u95ee\u9898\u662f\u56e0\u4e3a\u7f3a\u5c11\u5fc5\u8981\u7684\u5e93\u4e0e\u5de5\u5177\u6240\u81f4\uff0c\u4e00\u4e9b\u95ee\u9898\u662f\u5bf9\u67d0\u4e9b\u529f\u80fd\u7684\u5de5\u4f5c\u539f\u7406\u4e0d\u6e05\u695a\u6240\u81f4\uff0c\u6700\u7ec8\u8fd9\u4e9b\u95ee\u9898\u5f97\u5230\u4e86\u89e3\u51b3\u3002\u5728\u89e3\u51b3\u95ee\u9898\u7684\u8fc7\u7a0b\u4e2d\u4e5f\u4f53\u73b0\u51fa\u4e86\u6211\u5bf9 linux \u4e2d\u7684\u4e00\u4e9b\u57fa\u7840\u77e5\u8bc6\u6709\u4e86\u964c\u751f\u611f\uff0c\u9700\u8981\u53ca\u65f6\u7684\u590d\u4e60\u590d\u4e60\u3002")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u4e0b\u9762\u662f\u6211\u5bf9 dpdk \u7684\u4e00\u4e9b\u8ba4\u8bc6\uff1a")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk \u4f9d\u8d56 uio \u5185\u6838\u6a21\u5757\u6765\u5c06\u7f51\u7edc\u8bbe\u5907\u6620\u5c04\u5230\u7528\u6237\u7a7a\u95f4\uff0c\u901a\u8fc7\u91cd\u65b0\u7ed1\u5b9a\u7f51\u7edc\u8bbe\u5907\u9a71\u52a8\u5230 pmd \u6765\u6784\u5efa\u4ece\u7528\u6237\u7a7a\u95f4\u64cd\u4f5c\u7f51\u7edc\u8bbe\u5907\u7684\u6865\u6881\u3002\u8fd9\u91cc\u7684 pmd \u5168\u79f0\u4e3a polling mode driver\uff0c\u5b83\u6765\u6e90\u4e8e\u9a71\u52a8\u8bbe\u8ba1\u6a21\u578b\u4e2d\u7684\u8f6e\u8be2\u6a21\u578b\u3002")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"dpdk \u4f7f\u7528 pmd \u6765\u62e6\u622a\u7f51\u7edc\u8bbe\u5907\u7684\u786c\u4ef6\u4e2d\u65ad\uff0c\u8fd9\u662f\u8f6e\u8be2\u5f0f\u6570\u636e\u5904\u7406\u7684\u57fa\u7840\uff0c\u4e5f\u662f dpdk \u6240\u8981\u89e3\u51b3\u7684\u4e00\u5927\u96be\u9898\u3002")))}c.isMDXComponent=!0}}]);