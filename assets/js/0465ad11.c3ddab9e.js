"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[7530],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return k}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),d=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=d(n),k=r,m=c["".concat(i,".").concat(k)]||c[k]||u[k]||o;return n?a.createElement(m,p(p({ref:t},s),{},{components:n})):a.createElement(m,p({ref:t},s))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,p=new Array(o);p[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,p[1]=l;for(var d=2;d<o;d++)p[d]=n[d];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4451:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return k},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return u}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),p=["components"],l={},i=void 0,d={permalink:"/longyu.github.io/blog/dpdk/dpdk-16.04 eal \u521d\u59cb\u5316 log \u4fe1\u606f\u89e3\u6790",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/dpdk-16.04 eal \u521d\u59cb\u5316 log \u4fe1\u606f\u89e3\u6790.md",source:"@site/blog/dpdk/dpdk-16.04 eal \u521d\u59cb\u5316 log \u4fe1\u606f\u89e3\u6790.md",title:"dpdk/dpdk-16.04 eal \u521d\u59cb\u5316 log \u4fe1\u606f\u89e3\u6790",description:"\u524d\u8a00",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:15.88,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk \u591a\u7ebf\u7a0b\u6d41\u6c34\u7ebf",permalink:"/longyu.github.io/blog/dpdk/dpdk-16.04 eal lcore \u591a\u7ebf\u7a0b\u673a\u5236\u5206\u6790"},nextItem:{title:"dpdk/dpdk-16.04 igb crc length \u7edf\u8ba1\u95ee\u9898",permalink:"/longyu.github.io/blog/dpdk/dpdk-16.04 igb crc length \u7edf\u8ba1\u95ee\u9898"}},s={authorsImageUrls:[]},u=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"\u8bbe\u5907\u73af\u5883\u4fe1\u606f",id:"\u8bbe\u5907\u73af\u5883\u4fe1\u606f",level:2},{value:"1. cpu \u6838\u4e0e numa \u4fe1\u606f",id:"1-cpu-\u6838\u4e0e-numa-\u4fe1\u606f",level:3},{value:"2. hugepage \u4fe1\u606f",id:"2-hugepage-\u4fe1\u606f",level:3},{value:"3. \u63a5\u53e3\u7ed1\u5b9a\u4fe1\u606f",id:"3-\u63a5\u53e3\u7ed1\u5b9a\u4fe1\u606f",level:3},{value:"4. dpdk \u7248\u672c\u4e0e\u6d4b\u8bd5\u7a0b\u5e8f",id:"4-dpdk-\u7248\u672c\u4e0e\u6d4b\u8bd5\u7a0b\u5e8f",level:3},{value:"l2fwd \u6267\u884c\u8f93\u51fa\u4fe1\u606f",id:"l2fwd-\u6267\u884c\u8f93\u51fa\u4fe1\u606f",level:2},{value:"1. cpu \u6838\u4e0e numa \u7684\u5173\u7cfb",id:"1-cpu-\u6838\u4e0e-numa-\u7684\u5173\u7cfb",level:3},{value:"2. \u6620\u5c04\u7684 hugepage \u79cd\u7c7b\u4e0e\u5927\u5c0f",id:"2-\u6620\u5c04\u7684-hugepage-\u79cd\u7c7b\u4e0e\u5927\u5c0f",level:3},{value:"3. vfio \u76f8\u5173\u529f\u80fd\u521d\u59cb\u5316",id:"3-vfio-\u76f8\u5173\u529f\u80fd\u521d\u59cb\u5316",level:3},{value:"3. \u4f7f\u7528 hugepage \u521d\u59cb\u5316\u7684 heap \u5185\u5b58\u4fe1\u606f",id:"3-\u4f7f\u7528-hugepage-\u521d\u59cb\u5316\u7684-heap-\u5185\u5b58\u4fe1\u606f",level:3},{value:"4. \u8bc6\u522b\u5230\u7684\u9891\u7387\u4fe1\u606f",id:"4-\u8bc6\u522b\u5230\u7684\u9891\u7387\u4fe1\u606f",level:3},{value:"5. master \u7ebf\u7a0b\u6240\u5728 cpu \u6838",id:"5-master-\u7ebf\u7a0b\u6240\u5728-cpu-\u6838",level:3},{value:"6. \u975e master \u7ebf\u7a0b\u7684 cpuset \u4fe1\u606f",id:"6-\u975e-master-\u7ebf\u7a0b\u7684-cpuset-\u4fe1\u606f",level:3},{value:"7. \u8bc6\u522b\u5230\u4e86\u54ea\u4e9b\u7f51\u5361\u63a5\u53e3\u7c7b\u578b",id:"7-\u8bc6\u522b\u5230\u4e86\u54ea\u4e9b\u7f51\u5361\u63a5\u53e3\u7c7b\u578b",level:3},{value:"1. \u672a\u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684 pci \u8bbe\u5907",id:"1-\u672a\u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684-pci-\u8bbe\u5907",level:3},{value:"2. \u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684 pci \u8bbe\u5907",id:"2-\u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684-pci-\u8bbe\u5907",level:3},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}],c={toc:u};function k(e){var t=e.components,n=(0,r.Z)(e,p);return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,o.kt)("p",null,"\u6700\u8fd1\u4e00\u5e74\u5de6\u53f3\u6211\u89e3\u51b3\u4e86\u5f88\u591a dpdk \u7a0b\u5e8f\u76f8\u5173\u7684\u95ee\u9898\uff0c\u8fd9\u4e9b\u95ee\u9898\u4e2d\u6709\u4e00\u4e9b\u95ee\u9898\u80fd\u591f\u4ece\u7a0b\u5e8f\u8fd0\u884c\u7684\u8f93\u51fa\u4fe1\u606f\u4e2d\u627e\u5230\u539f\u56e0\uff0c\u53ef\u7531\u4e8e\u5bf9\u8fd9\u90e8\u5206\u4fe1\u606f\u7684\u91cd\u89c6\u7a0b\u5ea6\u4e0d\u591f\uff0c\u4e1c\u7ed5\u897f\u7ed5\u624d\u80fd\u627e\u51fa\u771f\u6b63\u7684\u95ee\u9898\uff0c\u5176\u6548\u7387\u65e0\u7591\u3010\u975e\u5e38\u4f4e\u4e0b\u3011\u3002"),(0,o.kt)("p",null,"\u540c\u65f6\u4e5f\u9047\u5230\u8fc7\u4ea7\u54c1\u7684\u540c\u4e8b\u54a8\u8be2 dpdk \u7a0b\u5e8f\u8f93\u51fa\u4fe1\u606f\u7684\u95ee\u9898\uff0c\u4e00\u4e9b\u95ee\u9898\u81ea\u5df1\u4e5f\u65e0\u6cd5\u89e3\u91ca\uff0c\u573a\u9762\u4e00\u5ea6\u3010\u5341\u5206\u5c34\u5c2c\u3011\u3002"),(0,o.kt)("p",null,"\u9274\u4e8e\u4ee5\u4e0a\u4e24\u70b9\u5185\u5bb9\uff0c\u6211\u5728\u672c\u7bc7\u6587\u7ae0\u4e2d\u57fa\u4e8e dpdk-16.04 l2fwd \u63cf\u8ff0\u4e0b dpdk \u7a0b\u5e8f\u8f93\u51fa\u4fe1\u606f\u7684\u4e0d\u540c\u542b\u4e49\uff0c\u4f5c\u4e3a\u8bb0\u5f55\u7684\u540c\u65f6\u4e5f\u5e0c\u671b\u80fd\u4e3a\u5b9a\u4f4d\u95ee\u9898\u63d0\u4f9b\u3010\u53c2\u8003\u3011\u3002"),(0,o.kt)("h2",{id:"\u8bbe\u5907\u73af\u5883\u4fe1\u606f"},"\u8bbe\u5907\u73af\u5883\u4fe1\u606f"),(0,o.kt)("p",null,"\u6211\u4f7f\u7528\u672c\u5730\u7684\u865a\u62df\u673a\u6d4b\u8bd5\uff0c\u4e0b\u9762\u662f\u4e00\u4e9b\u76f8\u5173\u7684\u73af\u5883\u4fe1\u606f\uff1a"),(0,o.kt)("h3",{id:"1-cpu-\u6838\u4e0e-numa-\u4fe1\u606f"},"1. cpu \u6838\u4e0e numa \u4fe1\u606f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@virt-debian10:~/$ lscpu\nArchitecture:        x86_64\nCPU op-mode(s):      32-bit, 64-bit\nByte Order:          Little Endian\nAddress sizes:       40 bits physical, 48 bits virtual\nCPU(s):              4\nOn-line CPU(s) list: 0-3\nThread(s) per core:  4\nCore(s) per socket:  1\nSocket(s):           1\nNUMA node(s):        1\nVendor ID:           GenuineIntel\nCPU family:          6\nModel:               94\nModel name:          Intel Core Processor (Skylake, IBRS)\nStepping:            3\nCPU MHz:             1800.000\nBogoMIPS:            3600.00\nVirtualization:      VT-x\nHypervisor vendor:   KVM\nVirtualization type: full\nL1d cache:           32K\nL1i cache:           32K\nL2 cache:            4096K\nL3 cache:            16384K\nNUMA node0 CPU(s):   0-3\nFlags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault invpcid_single pti ssbd ibrs ibpb tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid mpx rdseed adx smap clflushopt xsaveopt xsavec xgetbv1 xsaves arat umip\n")),(0,o.kt)("p",null,"\u6211\u4f7f\u7528\u7684\u865a\u673a\u4e3a\u5355\u6838 4 \u7ebf\u7a0b\uff0c\u6709 1 \u4e2a numa \u8282\u70b9\uff0ccpu \u9891\u7387\u4e3a 1.8G\u3002"),(0,o.kt)("h3",{id:"2-hugepage-\u4fe1\u606f"},"2. hugepage \u4fe1\u606f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@virt-debian10:~$ grep -i 'huge' /proc/meminfo \nAnonHugePages:      2048 kB\nShmemHugePages:        0 kB\nHugePages_Total:     512\nHugePages_Free:      512\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:       2048 kB\nHugetlb:         1048576 kB\n")),(0,o.kt)("p",null,"\u865a\u673a\u8bbe\u5b9a\u4e86 512 \u4e2a 2M \u5927\u5c0f\u7684 hugepage \u5e76\u6302\u8f7d hugetlbfs\u3002"),(0,o.kt)("h3",{id:"3-\u63a5\u53e3\u7ed1\u5b9a\u4fe1\u606f"},"3. \u63a5\u53e3\u7ed1\u5b9a\u4fe1\u606f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@virt-debian10:~$ dpdk-devbind.py -s \n\nNetwork devices using DPDK-compatible driver\n============================================\n0000:04:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=e1000e\n0000:08:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=e1000e\n0000:09:00.0 '82574L Gigabit Network Connection' drv=igb_uio unused=e1000e\n\nNetwork devices using kernel driver\n===================================\n0000:01:00.0 'Virtio network device' if=enp1s0 drv=virtio-pci unused=virtio_pci,igb_uio *Active*\n\nOther network devices\n=====================\n<none>\n")),(0,o.kt)("p",null,"\u7ba1\u7406\u53e3\u4f7f\u7528 virtio \u7f51\u5361\uff0c\u5176\u5b83\u4e09\u4e2a\u4e1a\u52a1\u53e3\u4f7f\u7528 e1000e \u7f51\u5361\u5e76\u7ed1\u5b9a\u5230 igb_uio \u9a71\u52a8\u4e2d\u3002"),(0,o.kt)("h3",{id:"4-dpdk-\u7248\u672c\u4e0e\u6d4b\u8bd5\u7a0b\u5e8f"},"4. dpdk \u7248\u672c\u4e0e\u6d4b\u8bd5\u7a0b\u5e8f"),(0,o.kt)("p",null,"dpdk \u7248\u672c\uff1adpdk-16.04\ndpdk \u6d4b\u8bd5\u7a0b\u5e8f\uff1adpdk \u793a\u4f8b\u7a0b\u5e8f\u2014\u2014l2fwd"),(0,o.kt)("h2",{id:"l2fwd-\u6267\u884c\u8f93\u51fa\u4fe1\u606f"},"l2fwd \u6267\u884c\u8f93\u51fa\u4fe1\u606f"),(0,o.kt)("p",null,"\u6267\u884c\u547d\u4ee4\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"    sudo ./l2fwd -- -p0x1\n")),(0,o.kt)("p",null,"l2fwd \u7a0b\u5e8f\u6267\u884c\u7684\u8f93\u51fa\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: Detected lcore 0 as core 0 on socket 0\nEAL: Detected lcore 1 as core 0 on socket 0\nEAL: Detected lcore 2 as core 0 on socket 0\nEAL: Detected lcore 3 as core 0 on socket 0\nEAL: Support maximum 128 logical core(s) by configuration.\nEAL: Detected 4 lcore(s)\nEAL: No free hugepages reported in hugepages-1048576kB\nEAL: Probing VFIO support...\nEAL: Module /sys/module/vfio_pci not found! error 2 (No such file or directory)\nEAL: VFIO modules not loaded, skipping VFIO support...\nEAL: Setting up child physically contiguous memory...\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400005000000 (size = 0x200000)\nEAL: Ask a virtual area of 0x9000000 bytes\nEAL: Virtual area found at 0x400005200000 (size = 0x9000000)\nEAL: Ask a virtual area of 0xc00000 bytes\nEAL: Virtual area found at 0x40000e200000 (size = 0xc00000)\nEAL: Ask a virtual area of 0x20c00000 bytes\nEAL: Virtual area found at 0x40000ee00000 (size = 0x20c00000)\nEAL: Ask a virtual area of 0x14800000 bytes\nEAL: Virtual area found at 0x40002fa00000 (size = 0x14800000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044200000 (size = 0x200000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044400000 (size = 0x200000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044600000 (size = 0x200000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044800000 (size = 0x200000)\nEAL: Ask a virtual area of 0x400000 bytes\nEAL: Virtual area found at 0x400044a00000 (size = 0x400000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044e00000 (size = 0x200000)\nEAL: Requesting 512 pages of size 2MB from socket 0\nEAL: TSC frequency is ~1800013 KHz\nEAL: WARNING: cpu flags constant_tsc=yes nonstop_tsc=no -> using unreliable clock cycles !\nEAL: Master lcore 0 is ready (tid=794d43c0;cpuset=[0])\nEAL: lcore 1 is ready (tid=78cd1700;cpuset=[1])\nEAL: lcore 2 is ready (tid=784d0700;cpuset=[2])\nEAL: lcore 3 is ready (tid=77ccf700;cpuset=[3])\nEAL: PCI device 0000:01:00.0 on NUMA socket -1\nEAL:   probe driver: 1af4:1041 rte_virtio_pmd\nEAL:   Not managed by a supported kernel driver, skipped\nEAL: PCI device 0000:04:00.0 on NUMA socket -1\nEAL:   probe driver: 8086:10d3 rte_em_pmd\nEAL:   PCI memory mapped at 0x400045000000\nEAL:   PCI memory mapped at 0x400045020000\nEAL:   PCI memory mapped at 0x400045040000\nPMD: eth_em_dev_init(): port_id 0 vendorID=0x8086 deviceID=0x10d3\nEAL: PCI device 0000:08:00.0 on NUMA socket -1\nEAL:   probe driver: 8086:10d3 rte_em_pmd\nEAL:   PCI memory mapped at 0x400045044000\nEAL:   PCI memory mapped at 0x400045064000\nEAL:   PCI memory mapped at 0x400045084000\nPMD: eth_em_dev_init(): port_id 1 vendorID=0x8086 deviceID=0x10d3\nEAL: PCI device 0000:09:00.0 on NUMA socket -1\nEAL:   probe driver: 8086:10d3 rte_em_pmd\nEAL:   PCI memory mapped at 0x400045088000\nEAL:   PCI memory mapped at 0x4000450a8000\nEAL:   PCI memory mapped at 0x4000450c8000\nPMD: eth_em_dev_init(): port_id 2 vendorID=0x8086 deviceID=0x10d3\n--------------(nil)\n")),(0,o.kt)("p",null,"\u6709\u4e86\u5b8c\u6574\u7684\u8f93\u51fa\u4fe1\u606f\u540e\uff0c\u4e0b\u9762\u6839\u636e\u4e0d\u540c\u7684\u529f\u80fd\u62c6\u5206\u8fdb\u884c\u63cf\u8ff0\u3002"),(0,o.kt)("h3",{id:"1-cpu-\u6838\u4e0e-numa-\u7684\u5173\u7cfb"},"1. cpu \u6838\u4e0e numa \u7684\u5173\u7cfb"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: Detected lcore 0 as core 0 on socket 0\nEAL: Detected lcore 1 as core 0 on socket 0\nEAL: Detected lcore 2 as core 0 on socket 0\nEAL: Detected lcore 3 as core 0 on socket 0\nEAL: Support maximum 128 logical core(s) by configuration.\nEAL: Detected 4 lcore(s)\n")),(0,o.kt)("p",null,"\u6d4b\u8bd5\u73af\u5883\u4e3a 4 \u6838\u5355 numa \u7ed3\u6784\uff0cnuma \u5728\u4e0a\u8ff0\u8f93\u51fa\u4e2d\u5bf9\u5e94\u7684\u4fe1\u606f\u4e3a ",(0,o.kt)("strong",{parentName:"p"},"socket 0"),"\uff0c0 \u8868\u793a\u7b2c\u4e00\u4e2a numa \u8282\u70b9\u3002"),(0,o.kt)("p",null,"\u5728\u8fd9\u4e2a\u73af\u5883\u4e2d\uff0cl2fwd \u68c0\u6d4b\u5230\u56db\u4e2a\u903b\u8f91\u6838\uff0c\u8fd9\u56db\u4e2a\u6838\u90fd\u4f4d\u4e8e\u4e00\u4e2a cpu \u4e0a\u3002"),(0,o.kt)("h3",{id:"2-\u6620\u5c04\u7684-hugepage-\u79cd\u7c7b\u4e0e\u5927\u5c0f"},"2. \u6620\u5c04\u7684 hugepage \u79cd\u7c7b\u4e0e\u5927\u5c0f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"EAL: No free hugepages reported in hugepages-1048576kB\n...........\nEAL: Requesting 512 pages of size 2MB from socket 0\n")),(0,o.kt)("p",null,"dpdk \u652f\u6301\u591a\u79cd\u4e0d\u540c\u5927\u5c0f\u7684 hugepage size\uff0c\u5e38\u89c1\u7684\u6709 2M\u3001512M\u30011G \u7b49\u7c7b\u578b\uff0c\u5177\u4f53\u652f\u6301\u54ea\u79cd hugepage size \u4e0e\u5185\u6838\u914d\u7f6e\u6709\u5173\u3002"),(0,o.kt)("p",null,"\u4e0a\u8ff0\u8f93\u51fa\u7684\u7b2c\u4e00\u884c\u8868\u660e\uff0c\u5f53\u524d\u7cfb\u7edf\u4e2d\u672a\u521b\u5efa 1G \u7684 hugepage \u5927\u9875\uff0c\u7b2c\u4e8c\u884c\u8f93\u51fa\u8868\u660e hugepage \u4ece numa 0 \u4e2d\u6620\u5c04\u4e86 512 \u4e2a 2M \u7684\u5927\u9875\uff0c\u5171\u8ba1 1G \u7a7a\u95f4\u3002"),(0,o.kt)("p",null,"\u6211\u5728 ",(0,o.kt)("a",{parentName:"p",href:"https://blog.csdn.net/Longyu_wlz/article/details/113561592?spm=1001.2014.3001.5501"},"Failed to mmap 2 MB hugepages \u4e0e max_map_count limit")," \u4e2d\u63cf\u8ff0\u4e86\u5927\u9875\u6570\u91cf\u8fc7\u591a\u5bfc\u81f4\u6620\u5c04\u5931\u8d25\u7684\u4e00\u4e2a\u95ee\u9898\u3002dpdk-16.04 \u4f1a\u5728\u7a0b\u5e8f\u521d\u59cb\u5316\u7684\u65f6\u5019\u6620\u5c04\u6240\u6709\u7684\u5927\u9875\uff0c\u5373\u4fbf\u5b58\u5728 -m \u53c2\u6570\u9650\u5b9a\uff0c\u4ecd\u65e7\u4f1a\u5148\u6620\u5c04\u6240\u6709\u7684\u5927\u9875\u3002"),(0,o.kt)("h3",{id:"3-vfio-\u76f8\u5173\u529f\u80fd\u521d\u59cb\u5316"},"3. vfio \u76f8\u5173\u529f\u80fd\u521d\u59cb\u5316"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: Probing VFIO support...\nEAL: Module /sys/module/vfio_pci not found! error 2 (No such file or directory)\nEAL: VFIO modules not loaded, skipping VFIO support...\n")),(0,o.kt)("p",null,"dpdk-16.04 \u652f\u6301 vfio \u65b9\u5f0f\u6620\u5c04\u7f51\u5361\u5230\u7528\u6237\u6001\u4e2d\uff0cdpdk \u901a\u8fc7 vfio_pci \u5185\u6838\u6a21\u5757\u662f\u5426\u52a0\u8f7d\u6765\u5224\u65ad\u662f\u5426\u4f7f\u80fd VFIO \u6a21\u5757\u3002"),(0,o.kt)("p",null,"\u5f53 vfio_pci \u6a21\u5757\u52a0\u8f7d\u540e\uff0c\u91cd\u65b0\u6267\u884c dpdk \u7a0b\u5e8f\u8f93\u51fa\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"EAL: Probing VFIO support...\nEAL:   IOMMU type 1 (Type 1) is supported\nEAL:   IOMMU type 8 (No-IOMMU) is not supported\nEAL: VFIO support initialized\n")),(0,o.kt)("p",null,"\u8fd9\u4e9b\u4fe1\u606f\u8868\u660e dpdk \u5185\u90e8 vfio \u6a21\u5757\u6210\u529f\u521d\u59cb\u5316\u3002"),(0,o.kt)("h3",{id:"3-\u4f7f\u7528-hugepage-\u521d\u59cb\u5316\u7684-heap-\u5185\u5b58\u4fe1\u606f"},"3. \u4f7f\u7528 hugepage \u521d\u59cb\u5316\u7684 heap \u5185\u5b58\u4fe1\u606f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: Setting up child physically contiguous memory...\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400005000000 (size = 0x200000)\nEAL: Ask a virtual area of 0x9000000 bytes\nEAL: Virtual area found at 0x400005200000 (size = 0x9000000)\nEAL: Ask a virtual area of 0xc00000 bytes\nEAL: Virtual area found at 0x40000e200000 (size = 0xc00000)\nEAL: Ask a virtual area of 0x20c00000 bytes\nEAL: Virtual area found at 0x40000ee00000 (size = 0x20c00000)\nEAL: Ask a virtual area of 0x14800000 bytes\nEAL: Virtual area found at 0x40002fa00000 (size = 0x14800000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044200000 (size = 0x200000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044400000 (size = 0x200000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044600000 (size = 0x200000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044800000 (size = 0x200000)\nEAL: Ask a virtual area of 0x400000 bytes\nEAL: Virtual area found at 0x400044a00000 (size = 0x400000)\nEAL: Ask a virtual area of 0x200000 bytes\nEAL: Virtual area found at 0x400044e00000 (size = 0x200000)\nEAL: Requesting 512 pages of size 2MB from socket 0\n")),(0,o.kt)("p",null,"dpdk \u5185\u90e8\u7684 heap \u4f7f\u7528 hugepage \u5185\u5b58\u6765\u5206\u914d\u7a7a\u95f4\uff0c\u4e0a\u8ff0\u8f93\u51fa\u63cf\u8ff0\u4e86\u521d\u59cb\u5316 heap \u7684\u8fc7\u7a0b\u3002Ask a virtual area of xxx bytes \u8868\u660e\u4e86\u7533\u8bf7\u865a\u62df\u5185\u5b58\u7a7a\u95f4\u7684\u5927\u5c0f\uff0c\u7533\u8bf7\u7684\u5185\u5b58\u603b\u5927\u5c0f\u4e3a 1G\u3002"),(0,o.kt)("p",null,"\u4e0a\u8ff0\u8f93\u51fa\u4e2d Ask a virtual area of xxx \u8f93\u51fa\u591a\u6b21\uff0c\u8fd9\u8868\u660e\u5185\u6838\u5206\u914d\u7684 hugepage \u5185\u5b58\u76f8\u5bf9\u5206\u6563\u3002"),(0,o.kt)("p",null,"\u4e0a\u8ff0\u8f93\u51fa\u4e2d\u521d\u59cb\u5316\u7684\u6700\u5927\u5185\u5b58\u533a\u57df\u4e3a 549453824 \u5b57\u8282\uff08524M\uff09\uff0c\u8fd9\u51b3\u5b9a\u4e86\u7a0b\u5e8f\u80fd\u591f\u7533\u8bf7\u7684\u5355\u4e2a\u5185\u5b58\u7684\u4e0a\u9650\uff0c\u5f53 dpdk \u7a0b\u5e8f\u62a5\u9519\u4fe1\u606f\u8868\u660e\u4e0e\u7533\u8bf7\u5185\u5b58\u7a7a\u95f4\u6709\u5173\u65f6\uff0c\u4e0d\u59a8\u6bd4\u5bf9\u4e0b\u7533\u8bf7\u7a7a\u95f4\u7684\u5927\u5c0f\u4e0e\u8fd9\u91cc\u63d0\u5230\u7684\u5355\u4e2a\u5185\u5b58\u7684\u4e0a\u9650\u3002"),(0,o.kt)("p",null,"\u4e00\u822c\u6765\u8bf4\u5728\u7cfb\u7edf\u8fd0\u884c\u540e\u901a\u8fc7\u5199\u5165 /sys \u76ee\u5f55\u4e2d\u7684\u6587\u4ef6\u6765\u5206\u914d\u5927\u9875\u5219\u5bb9\u6613\u51fa\u73b0\u5927\u9875\u4e0d\u8fde\u7eed\u5206\u5e03\u7684\u60c5\u51b5\uff0c\u8fd9\u65f6\u5373\u4fbf\u589e\u52a0\u5927\u9875\u7684\u6570\u76ee\u4e5f\u53ef\u80fd\u56e0\u4e3a\u5185\u5b58\u7a7a\u95f4\u7684\u5206\u6563\u800c\u9047\u5230\u76f8\u540c\u7684\u95ee\u9898\uff0c\u4e00\u822c\u5c06\u9884\u7559\u7684\u5927\u9875\u6570\u76ee\u5199\u5165\u5230\u5185\u6838\u5f15\u5bfc\u53c2\u6570\u4e2d\uff0c\u5728\u5185\u6838\u521d\u59cb\u5316\u8fc7\u7a0b\u4e2d\u5c31\u9884\u7559\u597d\u5927\u9875\u5185\u5b58\uff0c\u907f\u514d\u56e0\u540e\u671f\u5185\u5b58\u7684\u4f7f\u7528\u800c\u4ea7\u751f\u4e0d\u540c\u5927\u5c0f\u7684\u79bb\u6563\u7a7a\u95f4\u3002"),(0,o.kt)("h3",{id:"4-\u8bc6\u522b\u5230\u7684\u9891\u7387\u4fe1\u606f"},"4. \u8bc6\u522b\u5230\u7684\u9891\u7387\u4fe1\u606f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: TSC frequency is ~1800013 KHz\nEAL: WARNING: cpu flags constant_tsc=yes nonstop_tsc=no -> using unreliable clock cycles !\n")),(0,o.kt)("p",null,"\u7b2c\u4e00\u884c\u8f93\u51fa\u8868\u660e dpdk \u63a2\u6d4b\u5230 cpu \u9891\u7387\u5728 1.8G \u5de6\u53f3\uff0c\u4e0e\u4e0a\u6587\u63cf\u8ff0\u8fc7\u7684\u865a\u62df\u673a\u914d\u7f6e\u63a5\u8fd1\u3002\u8fd9\u91cc\u7684\u9891\u7387\u7528\u4e8e dpdk \u5185\u90e8\u5ef6\u65f6\u8ba1\u7b97\uff0cdpdk \u5185\u90e8\u9700\u8981\u7ef4\u62a4\u5185\u90e8\u5b9a\u65f6\u5668\u65f6\u95f4\uff0c\u540c\u65f6\u7f51\u5361\u786c\u4ef6\u521d\u59cb\u5316\u4e2d\u4e5f\u9700\u8981\u6309\u7167\u65f6\u5e8f\u8981\u6c42\u800c\u5ef6\u65f6\uff0c\u4e14\u5bf9\u7cbe\u5ea6\u6709\u4e00\u5b9a\u7684\u8981\u6c42\u3002"),(0,o.kt)("p",null,"\u7b2c\u4e8c\u884c\u7684\u4fe1\u606f\u8868\u660e\u7cfb\u7edf\u4f7f\u7528\u4e86\u4e0d\u53ef\u9760\u7684\u65f6\u949f\u5468\u671f\uff0c\u8fd9\u4e2a\u8f93\u51fa\u901a\u8fc7\u83b7\u53d6 /proc/cpuinfo \u4e2d\u7684 cpu flags \u53c2\u6570\u786e\u5b9a\u3002\u5176\u4e2d\u63d0\u5230\u7684\u4e24\u4e2a\u4e0e\u65f6\u949f\u76f8\u5173\u7684\u540d\u8bcd\u89e3\u91ca\u5982\u4e0b\uff1a"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"constant_tsc: TSC ticks at a constant rate\nnonstop_tsc: TSC does not stop in C states")),(0,o.kt)("p",null,"constant_tsc \u8868\u660e\u65f6\u949f\u5468\u671f\u6309\u7167\u56fa\u5b9a\u7684\u9891\u7387\u89e6\u53d1\uff0cnonstop_tsc \u8868\u660e\u65f6\u949f\u4e0d\u4f1a\u5728\u3000ACPI \u5207\u6362\u4e3a C \u72b6\u6001\u7684\u65f6\u5019\u505c\u6b62\u3002"),(0,o.kt)("p",null,"\u5728\u6211\u6d4b\u8bd5\u7528\u7684\u865a\u62df\u673a\u4e2d\uff0c\u652f\u6301 constant_tsc \u800c\u4e0d\u652f\u6301 nonstop_tsc\uff0c\u6545\u800c\u8f93\u51fa\u4f7f\u7528\u4e0d\u53ef\u9760\u65f6\u949f\u6e90\u7684\u4fe1\u606f\u3002"),(0,o.kt)("h3",{id:"5-master-\u7ebf\u7a0b\u6240\u5728-cpu-\u6838"},"5. master \u7ebf\u7a0b\u6240\u5728 cpu \u6838"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: Master lcore 0 is ready (tid=794d43c0;cpuset=[0])\n")),(0,o.kt)("p",null,"\u6b64\u884c\u8f93\u51fa\u8868\u660e dpdk \u4f7f\u7528 lcorea 0 \u4f5c\u4e3a master \u7ebf\u7a0b\uff0ccpuset \u8868\u660e master \u7ebf\u7a0b\u88ab\u7ed1\u5b9a\u5230 0 \u6838\u4e0a\u3002"),(0,o.kt)("h3",{id:"6-\u975e-master-\u7ebf\u7a0b\u7684-cpuset-\u4fe1\u606f"},"6. \u975e master \u7ebf\u7a0b\u7684 cpuset \u4fe1\u606f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: lcore 1 is ready (tid=78cd1700;cpuset=[1])\nEAL: lcore 2 is ready (tid=784d0700;cpuset=[2])\nEAL: lcore 3 is ready (tid=77ccf700;cpuset=[3])\n")),(0,o.kt)("p",null,"\u4e0a\u8ff0\u8f93\u51fa\u8868\u660e\u521b\u5efa\u4e86\u4e09\u4e2a\u975e master \u7ebf\u7a0b\uff0c\u8fd9\u4e9b\u7ebf\u7a0b\u5206\u522b\u88ab\u7ed1\u5b9a\u5230 1\u30012\u30013 \u6838\u4e0a\u3002"),(0,o.kt)("h3",{id:"7-\u8bc6\u522b\u5230\u4e86\u54ea\u4e9b\u7f51\u5361\u63a5\u53e3\u7c7b\u578b"},"7. \u8bc6\u522b\u5230\u4e86\u54ea\u4e9b\u7f51\u5361\u63a5\u53e3\u7c7b\u578b"),(0,o.kt)("p",null,"dpdk \u5728\u521d\u59cb\u5316\u8fc7\u7a0b\u4e2d\u4f1a\u626b\u63cf pci \u8bbe\u5907\u5e76 probe\uff0c\u53ef\u4ee5\u5206\u4e3a\u5982\u4e0b\u4e24\u4e2a\u7c7b\u522b\u7684\u4fe1\u606f\uff1a"),(0,o.kt)("h3",{id:"1-\u672a\u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684-pci-\u8bbe\u5907"},"1. \u672a\u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684 pci \u8bbe\u5907"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: PCI device 0000:01:00.0 on NUMA socket -1\nEAL:   probe driver: 1af4:1041 rte_virtio_pmd\nEAL:   Not managed by a supported kernel driver, skipped\n")),(0,o.kt)("p",null,"dpdk \u4f1a\u626b\u63cf\u6240\u6709\u7684 pci \u8bbe\u5907\uff0c\u5efa\u7acb pci \u8bbe\u5907\u94fe\u8868\uff0c\u5e76\u5c1d\u8bd5 probe \u8bbe\u5907\u3002\u7b2c\u4e00\u884c\u8f93\u51fa\u4e2d 0000:01:00.0 \u8868\u793a\u4e00\u4e2a pci \u8bbe\u5907\uff0cNUMA socket \u503c\u4e3a -1 \u8868\u660e\u6ca1\u6709\u83b7\u53d6\u5230\u8bbe\u5907\u6240\u5728\u7684 numa \u8282\u70b9\u4fe1\u606f\u3002"),(0,o.kt)("p",null,"\u7b2c\u4e8c\u884c\u8f93\u51fa\u8868\u660e dpdk \u5c1d\u8bd5 probe \u8bbe\u5907\uff0c1af4:1041 \u662f\u8bbe\u5907\u7684 vendor id \u4e0e device id\uff0crte_virtio_pmd \u8868\u793a dpdk \u5339\u914d\u5230\u7684\u8bbe\u5907\u9a71\u52a8\u540d\u79f0\uff0c\u8fd9\u662f\u4e00\u4e2a virtio \u7f51\u5361\u63a5\u53e3\u3002"),(0,o.kt)("p",null,"\u7b2c\u4e09\u884c\u8f93\u51fa\u4fe1\u606f\u8868\u660e\u6b64\u63a5\u53e3\u672a\u7ed1\u5b9a\u5230 dpdk \u652f\u6301\u7684\u7528\u6237\u6001\u9a71\u52a8\u4e2d\uff0cprobe \u8fc7\u7a0b\u88ab\u8df3\u8fc7\uff0cdpdk \u5c06\u4e0d\u4f1a\u4f7f\u7528\u8be5\u63a5\u53e3\u3002"),(0,o.kt)("h3",{id:"2-\u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684-pci-\u8bbe\u5907"},"2. \u7ed1\u5b9a\u5230\u7528\u6237\u6001\u9a71\u52a8\u7684 pci \u8bbe\u5907"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"EAL: PCI device 0000:04:00.0 on NUMA socket -1\nEAL:   probe driver: 8086:10d3 rte_em_pmd\nEAL:   PCI memory mapped at 0x400045000000\nEAL:   PCI memory mapped at 0x400045020000\nEAL:   PCI memory mapped at 0x400045040000\nPMD: eth_em_dev_init(): port_id 0 vendorID=0x8086 deviceID=0x10d3\n")),(0,o.kt)("p",null,"\u524d\u4e24\u884c\u7684\u4fe1\u606f\u4e0a\u6587\u5df2\u7ecf\u89e3\u91ca\u8fc7\uff0c\u8fd9\u4e2a\u63a5\u53e3\u662f e1000e \u7f51\u5361\uff0c\u652f\u6301\u7684\u9a71\u52a8\u4e3a rte_em_pmd \u9a71\u52a8\uff0c\u7b2c 3~5 \u884c\u8f93\u51fa pci \u5185\u5b58\u6620\u5c04\u5730\u5740\uff0c\u8fd9\u4e9b\u5730\u5740\u7528\u4e8e\u540e\u7eed\u7f51\u5361\u7684\u521d\u59cb\u5316\u5de5\u4f5c\u3002"),(0,o.kt)("p",null,"\u6700\u540e\u4e00\u884c\u4fe1\u606f\u4e2d PMD: \u8868\u660e\u4fe1\u606f\u8f93\u51fa\u6a21\u5757\u4f4d\u4e8e PMD \u9a71\u52a8\u4e2d\uff0ceth_em_dev_init \u662f\u6b64\u9a71\u52a8\u7684\u521d\u59cb\u5316\u51fd\u6570\u3002port_id \u662f dpdk \u5185\u90e8\u5bf9 probe \u63a5\u53e3\u7684\u6807\u8bc6\uff0c\u6b64\u63a5\u53e3\u7684 id \u4e3a 0\uff0c\u6700\u540e\u8f93\u51fa\u7684 vendorID \u4e0e deviceID \u4e0e\u7b2c\u4e8c\u884c\u7684\u8f93\u51fa\u76f8\u540c\u3002"),(0,o.kt)("p",null,"dpdk \u7a0b\u5e8f\u521d\u59cb\u5316\u8fc7\u7a0b\u4e2d\u4f1a\u5bf9\u626b\u63cf\u5230\u7684 pci \u53f7\u4ece\u5c0f\u5230\u5927\u8fdb\u884c\u6392\u5e8f\uff0cport_id \u4f9d\u6b21\u9012\u589e\u3002"),(0,o.kt)("p",null,"\u8fd9\u4e9b\u8f93\u51fa\u4fe1\u606f\u8868\u660e\u4e86 dpdk \u7a0b\u5e8f\u8bc6\u522b\u5e76 probe \u4e86\u54ea\u4e9b\u63a5\u53e3\uff0c\u5f53\u4f60\u6dfb\u52a0\u65b0\u7f51\u5361\u65f6\uff0c\u521d\u59cb\u5316\u4fe1\u606f\u770b\u4e0d\u5230\u5bf9\u5e94\u7684\u63a5\u53e3\u8f93\u51fa\u4fe1\u606f\uff0c\u53ef\u4ee5\u4ece\u5982\u4e0b\u4e24\u4e2a\u65b9\u9762\u8fdb\u884c\u6392\u67e5\uff1a"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"dpdk \u662f\u5426\u652f\u6301\u65b0\u7f51\u5361\uff08\u67e5\u770b lib/librte_eal/common/include/rte_pci_dev_ids.h\uff09"),(0,o.kt)("li",{parentName:"ol"},"dpdk \u7a0b\u5e8f\u662f\u5426\u94fe\u63a5\u65b0\u7f51\u5361\u7684 pmd \u9a71\u52a8\u5e93")),(0,o.kt)("p",null,"dpdk \u4f7f\u7528 gcc \u7684 constructor \u6765\u6ce8\u518c\u4e0d\u540c\u7684 pmd \u9a71\u52a8\uff0c\u4f7f\u7528\u9759\u6001\u5e93\u65f6\u6ca1\u6709\u94fe\u63a5\u76f8\u5173\u7684\u5e93\u5219\u4e0d\u4f1a\u652f\u6301\u76f8\u5e94\u7684\u7f51\u5361\u3002\u66f4\u8be6\u7ec6\u7684\u4fe1\u606f\u8bf7\u8bbf\u95ee ",(0,o.kt)("a",{parentName:"p",href:"https://blog.csdn.net/Longyu_wlz/article/details/113725959?spm=1001.2014.3001.5501"},"gcc constructor \u5c5e\u6027\u4fee\u9970\u7684\u6784\u9020\u51fd\u6570\u672a\u88ab\u94fe\u63a5\u95ee\u9898"),"\u3002"),(0,o.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,o.kt)("p",null,"\u7a0b\u5e8f\u8fd0\u884c\u65f6\u5e38\u5e38\u4f1a\u6709\u4e00\u4e9b",(0,o.kt)("strong",{parentName:"p"},"\u8f93\u51fa\u4fe1\u606f"),"\uff0c\u8fd9\u4e9b\u8f93\u51fa\u4fe1\u606f\u5374\u5e38\u5e38\u88ab\u5ffd\u7565\u3002\u8fd9\u4e9b\u4fe1\u606f\u5e76\u4e0d\u662f\u591a\u4f59\u7684\u5185\u5bb9\uff0c\u5176\u4e2d\u53ef\u80fd\u9690\u85cf\u7740\u95ee\u9898\u7684\u86db\u4e1d\u9a6c\u8ff9\u3002"),(0,o.kt)("p",null,"\u7ecf\u5e38\u51fa\u73b0\u7684\u573a\u666f\u662f\uff0c\u8981\u5b9a\u4f4d\u67d0\u95ee\u9898\u65f6\uff0c\u627e\u4e0d\u5230\u7a0b\u5e8f\u7684\u8f93\u51fa\u4fe1\u606f\uff0c\u6216\u8005\u627e\u5230\u4e86\u8f93\u51fa\u4fe1\u606f\uff0c\u5374\u4e0d\u61c2\u8f93\u51fa\u4fe1\u606f\u7684\u542b\u4e49\uff0c\u9051\u8bba\u4ece\u4e2d\u627e\u5230\u7591\u70b9\u3002"),(0,o.kt)("p",null,"\u56de\u8fc7\u5934\u60f3\u60f3\uff0c\u5176\u5b9e\u8f93\u51fa\u4fe1\u606f\u4e00\u76f4\u90fd\u5728\u90a3\u91cc\uff0c\u6b63\u5982\u95ee\u9898\u4e00\u76f4\u90fd\u5728\u90a3\u91cc\u4e00\u6837\uff0c\u4f60\u80fd\u5426\u53d1\u73b0\u5b83\u5e76\u5e26\u6709\u597d\u5947\u5fc3\u53bb\u7814\u7a76\u5b83\u5374\u56e0\u4eba\u800c\u5f02\u4e86\uff01"))}k.isMDXComponent=!0}}]);