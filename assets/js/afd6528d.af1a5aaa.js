"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[2695],{3905:function(e,n,i){i.d(n,{Zo:function(){return p},kt:function(){return b}});var r=i(7294);function t(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function d(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,r)}return i}function o(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?d(Object(i),!0).forEach((function(n){t(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function s(e,n){if(null==e)return{};var i,r,t=function(e,n){if(null==e)return{};var i,r,t={},d=Object.keys(e);for(r=0;r<d.length;r++)i=d[r],n.indexOf(i)>=0||(t[i]=e[i]);return t}(e,n);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);for(r=0;r<d.length;r++)i=d[r],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(t[i]=e[i])}return t}var a=r.createContext({}),l=function(e){var n=r.useContext(a),i=n;return e&&(i="function"==typeof e?e(n):o(o({},n),e)),i},p=function(e){var n=l(e.components);return r.createElement(a.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var i=e.components,t=e.mdxType,d=e.originalType,a=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=l(i),b=t,_=c["".concat(a,".").concat(b)]||c[b]||u[b]||d;return i?r.createElement(_,o(o({ref:n},p),{},{components:i})):r.createElement(_,o({ref:n},p))}));function b(e,n){var i=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var d=i.length,o=new Array(d);o[0]=c;var s={};for(var a in n)hasOwnProperty.call(n,a)&&(s[a]=n[a]);s.originalType=e,s.mdxType="string"==typeof e?e:t,o[1]=s;for(var l=2;l<d;l++)o[l]=i[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,i)}c.displayName="MDXCreateElement"},3928:function(e,n,i){i.r(n),i.d(n,{assets:function(){return p},contentTitle:function(){return a},default:function(){return b},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return u}});var r=i(7462),t=i(3366),d=(i(7294),i(3905)),o=["components"],s={},a=void 0,l={permalink:"/longyu.github.io/blog/dpdk/\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8\u53ca\u5176\u4f7f\u7528\u7684 bind\u3001unbind\u3001new_id \u7b49 sys \u6587\u4ef6",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8\u53ca\u5176\u4f7f\u7528\u7684 bind\u3001unbind\u3001new_id \u7b49 sys \u6587\u4ef6.md",source:"@site/blog/dpdk/\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8\u53ca\u5176\u4f7f\u7528\u7684 bind\u3001unbind\u3001new_id \u7b49 sys \u6587\u4ef6.md",title:"dpdk/\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8\u53ca\u5176\u4f7f\u7528\u7684 bind\u3001unbind\u3001new_id \u7b49 sys \u6587\u4ef6",description:"\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:11.33,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk/\u6740\u6389\u6570\u901a\u5f15\u64ce\u5bfc\u81f4\u865a\u62df\u673a\u91cd\u542f\u95ee\u9898\u5b9a\u4f4d",permalink:"/longyu.github.io/blog/dpdk/\u6740\u6389\u6570\u901a\u5f15\u64ce\u5bfc\u81f4\u865a\u62df\u673a\u91cd\u542f\u95ee\u9898\u5b9a\u4f4d"},nextItem:{title:"dpdk/\u8bd5\u73a9 dpdk ebfp \u529f\u80fd",permalink:"/longyu.github.io/blog/dpdk/\u8bd5\u73a9 dpdk ebfp \u529f\u80fd"}},p={authorsImageUrls:[]},u=[{value:"\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8",id:"\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8",level:2},{value:"\u7ed1\u5b9a\u7f51\u5361\u63a5\u53e3\u9a71\u52a8\u7684\u5177\u4f53\u8fc7\u7a0b",id:"\u7ed1\u5b9a\u7f51\u5361\u63a5\u53e3\u9a71\u52a8\u7684\u5177\u4f53\u8fc7\u7a0b",level:2},{value:"1. /sys/bus/pci/drivers/.../bind",id:"1-sysbuspcidriversbind",level:4},{value:"2. /sys/bus/pci/drivers/.../unbind",id:"2-sysbuspcidriversunbind",level:4},{value:"3. /sys/bus/pci/drivers/.../new_id",id:"3-sysbuspcidriversnew_id",level:4},{value:"4. /sys/bus/pci/drivers/.../remove_id",id:"4-sysbuspcidriversremove_id",level:4},{value:"dpdk \u7ed1\u5b9a\u3001\u89e3\u7ed1\u7f51\u5361\u63a5\u53e3\u65f6\u7684\u4e00\u4e9b\u95ee\u9898",id:"dpdk-\u7ed1\u5b9a\u89e3\u7ed1\u7f51\u5361\u63a5\u53e3\u65f6\u7684\u4e00\u4e9b\u95ee\u9898",level:2},{value:"\u5148\u5199\u5165\u6570\u636e\u5230 new_id \u6dfb\u52a0\u8bbe\u5907 id \u7136\u540e\u8fdb\u884c\u7ed1\u5b9a",id:"\u5148\u5199\u5165\u6570\u636e\u5230-new_id-\u6dfb\u52a0\u8bbe\u5907-id-\u7136\u540e\u8fdb\u884c\u7ed1\u5b9a",level:3},{value:"\u7ed1\u5b9a\u5931\u8d25\u7684\u60c5\u51b5",id:"\u7ed1\u5b9a\u5931\u8d25\u7684\u60c5\u51b5",level:2},{value:"\u5199\u5165 new_id \u8bbe\u5907 id \u89e6\u53d1\u603b\u7ebf\u5339\u914d\u9a71\u52a8\u81ea\u52a8 probe \u95ee\u9898",id:"\u5199\u5165-new_id-\u8bbe\u5907-id-\u89e6\u53d1\u603b\u7ebf\u5339\u914d\u9a71\u52a8\u81ea\u52a8-probe-\u95ee\u9898",level:2}],c={toc:u};function b(e){var n=e.components,i=(0,t.Z)(e,o);return(0,d.kt)("wrapper",(0,r.Z)({},c,i,{components:n,mdxType:"MDXLayout"}),(0,d.kt)("h2",{id:"\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8"},"\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u9a71\u52a8"),(0,d.kt)("p",null,"\u5728\u6211\u7684\u865a\u62df\u673a\u4e2d\uff0c\u6709\u5982\u4e0b\u7f51\u7edc\u63a5\u53e3\uff1a"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@virt-debian10:~$ lspci | grep 'Eth'\n01:00.0 Ethernet controller: Red Hat, Inc Virtio network device (rev 01)\n04:00.0 Ethernet controller: Intel Corporation 82574L Gigabit Network Connection\n08:00.0 Ethernet controller: Intel Corporation 82574L Gigabit Network Connection\n09:00.0 Ethernet controller: Intel Corporation 82574L Gigabit Network Connection\n")),(0,d.kt)("p",null,"\u8fd9\u91cc\u7b2c\u4e00\u4e2a\u7f51\u7edc\u63a5\u53e3\u4e3a virtio\uff0c\u540e\u4e09\u4e2a\u90fd\u662f e1000e \u865a\u62df\u7f51\u5361 82574L\u3002"),(0,d.kt)("p",null,"\u5728dpdk \u7684\u4f7f\u7528\u8fc7\u7a0b\u4e2d\u6211\u4eec\u5e38\u5e38\u9700\u8981\u5c06\u7f51\u5361\u7ed1\u5b9a\u5230\u4e0d\u540c\u7684\u9a71\u52a8\u4e0a\uff0c\u8fd9\u4e00\u822c\u662f\u901a\u8fc7 dpdk_nic_bind.py \u811a\u672c\u6765\u5b8c\u6210\u7684\uff0c\u8fd9\u4e2a\u811a\u672c\u5177\u4f53\u7684\u7528\u6cd5\u6211\u4e0d\u5728\u8fd9\u91cc\u8d58\u8ff0\uff0c\u611f\u5174\u8da3\u7684\u8bfb\u8005\u53ef\u4ee5\u7814\u7a76\u7814\u7a76\u3002"),(0,d.kt)("p",null,"\u6ce8\u610f\u8fd9\u91cc\u7684 01:00.0\u300104:00.0\u300108:00.0\u300109:00.0 \u8868\u793a\u7684\u662f\u7f51\u7edc\u63a5\u53e3\u5bf9\u5e94\u7684 pci \u53f7\uff0c",(0,d.kt)("strong",{parentName:"p"},"\u8fd9\u4e9b pci \u53f7\u552f\u4e00\u8868\u793a\u4e00\u4e2a\u63a5\u53e3\uff0c\u5728\u7ed1\u5b9a\u9a71\u52a8\u4e0e\u89e3\u7ed1\u9a71\u52a8\u65f6\u4f1a\u4f7f\u7528\u5230\u3002")),(0,d.kt)("h2",{id:"\u7ed1\u5b9a\u7f51\u5361\u63a5\u53e3\u9a71\u52a8\u7684\u5177\u4f53\u8fc7\u7a0b"},"\u7ed1\u5b9a\u7f51\u5361\u63a5\u53e3\u9a71\u52a8\u7684\u5177\u4f53\u8fc7\u7a0b"),(0,d.kt)("p",null,"\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u4e3b\u8981\u4e0e bind \u4e0e new_id \u4e24\u4e2a\u7279\u6b8a\u7684\u6587\u4ef6\u6709\u5173\u3002\u5728\u6211\u7684\u7cfb\u7edf\u4e0a\uff0c\u6211\u641c\u7d22 /sys \u4e0b\u7684\u540d\u4e3a bind \u7684\u6587\u4ef6\uff0c\u641c\u7d22\u5230\u4e86\u4e0d\u540c\u9a71\u52a8\u7684 bind \u6587\u4ef6\uff0c\u622a\u53d6\u90e8\u5206\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@virt-debian10:~$ sudo find /sys -name 'bind'\n/sys/devices/virtual/vtconsole/vtcon0/bind\n/sys/devices/virtual/vtconsole/vtcon1/bind\n/sys/bus/serio/drivers/serio_raw/bind\n/sys/bus/serio/drivers/atkbd/bind\n/sys/bus/pci/drivers/shpchp/bind\n/sys/bus/pci/drivers/agpgart-sis/bind\n/sys/bus/pci/drivers/e1000e/bind\n")),(0,d.kt)("p",null,"\u8fd9\u91cc\u6211\u4ee5 e1000e \u9a71\u52a8\u4e3a\u4f8b\uff0c\u770b\u770b /sys/bus/pci/dirvers \u76ee\u5f55\u4e0b\u6709\u90a3\u4e9b\u4e1c\u4e1c\u3002"),(0,d.kt)("p",null,"\u6267\u884c ls \u547d\u4ee4\u67e5\u770b /sys/bus/pci/drivers \u76ee\u5f55\u7684\u5185\u5bb9\uff0c\u8f93\u51fa\u5982\u4e0b\uff1a"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-bash"},"longyu@virt-debian10:~$ ls /sys/bus/pci/drivers/e1000e\n0000:04:00.0  0000:08:00.0  0000:09:00.0  bind  module  new_id  remove_id  uevent  unbind\n")),(0,d.kt)("p",null,"\u8fd9\u91cc\u7684 0000:04:00.0\u30010000:08:00.0\u30010000:09:00.0 \u8868\u793a\u7ed1\u5b9a\u5230 e1000e \u9a71\u52a8\u4e0a\u7684 pci \u63a5\u53e3\u7684 pci \u53f7\u3002"),(0,d.kt)("p",null,"bind \u4e0e new_id \u662f\u7ed1\u5b9a\u9a71\u52a8\u8fc7\u7a0b\u4e2d\u4f1a\u4f7f\u7528\u5230\u7684\u6587\u4ef6\uff0cunbind \u662f\u89e3\u7ed1\u9a71\u52a8\u8fc7\u7a0b\u4e2d\u4f1a\u4f7f\u7528\u5230\u7684\u6587\u4ef6\u3002",(0,d.kt)("strong",{parentName:"p"},"\u5177\u4f53\u7684\u7ed1\u5b9a\u4e0e\u89e3\u7ed1\u7684\u8fc7\u7a0b\u5c31\u662f\u5411\u8fd9\u51e0\u4e2a\u6587\u4ef6\u4e2d\u5199\u5165\u89c4\u5b9a\u683c\u5f0f\u7684\u6570\u636e\u5b8c\u6210\u7684\u3002")),(0,d.kt)("p",null,"linux kernel \u6e90\u7801\u76ee\u5f55\u4e2d\u7684 ABI/testing/sysfs-bus-pci \u5bf9\u8fd9\u51e0\u4e2a\u6587\u4ef6\u7684\u63cf\u8ff0\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,d.kt)("h4",{id:"1-sysbuspcidriversbind"},"1. /sys/bus/pci/drivers/.../bind"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre"},"        Writing a device location to this file will cause\n        the driver to attempt to bind to the device found at\n        this location.  This is useful for overriding default\n        bindings.  The format for the location is: DDDD:BB:DD.F.\n        That is Domain:Bus:Device.Function and is the same as\n        found in /sys/bus/pci/devices/.  For example:\n        # echo 0000:00:19.0 > /sys/bus/pci/drivers/foo/bind\n        (Note: kernels before 2.6.28 may require echo -n).\n")),(0,d.kt)("p",null,"\u8fd9\u91cc\u5199\u5165\u7684 0000:00:19.0 \u5c31\u662f\u4e0a\u9762\u6211\u4eec\u63d0\u5230\u8fc7\u7684 pci \u53f7\u3002",(0,d.kt)("strong",{parentName:"p"},"\u5bf9 bind \u6587\u4ef6\u5199\u5165\u6bcf\u4e00\u4e2a\u63a5\u53e3\u7684 pci \u53f7\u610f\u5473\u7740\u6211\u4eec\u53ef\u4ee5\u5c06\u4e00\u4e2a\u7f51\u5361\u4e0a\u7684\u4e0d\u540c\u53e3\u7ed1\u5b9a\u5230\u4e0d\u540c\u7684\u9a71\u52a8\u4e0a\u3002")),(0,d.kt)("h4",{id:"2-sysbuspcidriversunbind"},"2. /sys/bus/pci/drivers/.../unbind"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre"},"        Writing a device location to this file will cause the\n        driver to attempt to unbind from the device found at\n        this location.  This may be useful when overriding default\n        bindings.  The format for the location is: DDDD:BB:DD.F.\n        That is Domain:Bus:Device.Function and is the same as\n        found in /sys/bus/pci/devices/. For example:\n        # echo 0000:00:19.0 > /sys/bus/pci/drivers/foo/unbind\n        (Note: kernels before 2.6.28 may require echo -n).\n")),(0,d.kt)("p",null,"\u8fd9\u91cc\u5411 unbind \u6587\u4ef6\u5199\u5165\u63a5\u53e3\u7684 pci \u53f7\u5c31\u4f1a\u89e3\u9664\u5f53\u524d\u7ed1\u5b9a\u7684\u9a71\u52a8\u3002\u4e00\u4e2a\u63a5\u53e3\u53ef\u4ee5\u4e0d\u7ed1\u5b9a\u5230\u4efb\u4f55\u9a71\u52a8\u4e0a\u9762\uff0c\u4e0d\u8fc7\u6211\u4eec\u5e38\u5e38\u4e0d\u4f1a\u8fd9\u6837\u53bb\u505a\u3002"),(0,d.kt)("h4",{id:"3-sysbuspcidriversnew_id"},"3. /sys/bus/pci/drivers/.../new_id"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre"},'        Writing a device ID to this file will attempt to\n        dynamically add a new device ID to a PCI device driver.\n        This may allow the driver to support more hardware than\n        was included in the driver\'s static device ID support\n        table at compile time.  The format for the device ID is:\n        VVVV DDDD SVVV SDDD CCCC MMMM PPPP.  That is Vendor ID,\n        Device ID, Subsystem Vendor ID, Subsystem Device ID,\n        Class, Class Mask, and Private Driver Data.  The Vendor ID\n        and Device ID fields are required, the rest are optional.\n        Upon successfully adding an ID, the driver will probe\n        for the device and attempt to bind to it.  For example:\n        # echo "8086 10f5" > /sys/bus/pci/drivers/foo/new_id\n')),(0,d.kt)("p",null,"\u5411 new_id \u4e2d\u5199\u5165\u8bbe\u5907 id\uff0c\u5c06\u4f1a\u52a8\u6001\u7684\u5728 pci \u8bbe\u5907\u9a71\u52a8\u4e2d\u6dfb\u52a0\u4e00\u4e2a\u65b0\u7684\u8bbe\u5907 id\u3002\u8fd9\u79cd\u529f\u80fd\u5141\u8bb8\u9a71\u52a8\u6dfb\u52a0\u66f4\u591a\u7684\u786c\u4ef6\u800c\u975e\u4ec5\u6709\u5728\u7f16\u8bd1\u65f6\u5305\u542b\u5230\u9a71\u52a8\u4e2d\u7684\u9759\u6001\u652f\u6301\u8bbe\u5907 ID \u5217\u8868\u4e2d\u7684\u786c\u4ef6\u3002"),(0,d.kt)("p",null,(0,d.kt)("strong",{parentName:"p"},"\u5199\u5165\u8fd9\u4e2a\u6587\u4ef6\u7684\u683c\u5f0f\u4e2d\uff0cVendor Id \u4e0e Device Id \u5b57\u6bb5\u662f\u5fc5\u987b\u7684\uff0c\u5176\u5b83\u7684\u5b57\u6bb5\u53ef\u4ee5\u4e0d\u6307\u5b9a\u3002")),(0,d.kt)("p",null,"\u6210\u529f\u6dfb\u52a0\u4e00\u4e2a\u8bbe\u5907 ID \u65f6\uff0c\u9a71\u52a8\u4f1a\u5c1d\u8bd5 probe \u7cfb\u7edf\u4e2d\u5339\u914d\u5230\u7684\u8bbe\u5907\u5e76\u5c1d\u8bd5\u7ed1\u5b9a\u5230\u5b83\u4e4b\u4e0a\u3002"),(0,d.kt)("h4",{id:"4-sysbuspcidriversremove_id"},"4. /sys/bus/pci/drivers/.../remove_id"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre"},'        Writing a device ID to this file will remove an ID\n        that was dynamically added via the new_id sysfs entry.\n        The format for the device ID is:\n        VVVV DDDD SVVV SDDD CCCC MMMM.  That is Vendor ID, Device\n        ID, Subsystem Vendor ID, Subsystem Device ID, Class,\n        and Class Mask.  The Vendor ID and Device ID fields are\n        required, the rest are optional.  After successfully\n        removing an ID, the driver will no longer support the\n        device.  This is useful to ensure auto probing won\'t\n        match the driver to the device.  For example:\n        # echo "8086 10f5" > /sys/bus/pci/drivers/foo/remove_id\n')),(0,d.kt)("p",null,"remove_id \u4e2d\u5199\u5165\u7684\u683c\u5f0f\u4e0e new_id \u7684\u5199\u5165\u683c\u5f0f\u76f8\u540c\u3002\u5199\u5165 remove_id \u53ef\u4ee5\u7528\u6765\u786e\u4fdd\u5185\u6838\u4e0d\u4f1a\u81ea\u52a8 probe \u5339\u914d\u5230\u8fd9\u4e2a\u9a71\u52a8\u7684\u8bbe\u5907\u3002"),(0,d.kt)("h2",{id:"dpdk-\u7ed1\u5b9a\u89e3\u7ed1\u7f51\u5361\u63a5\u53e3\u65f6\u7684\u4e00\u4e9b\u95ee\u9898"},"dpdk \u7ed1\u5b9a\u3001\u89e3\u7ed1\u7f51\u5361\u63a5\u53e3\u65f6\u7684\u4e00\u4e9b\u95ee\u9898"),(0,d.kt)("p",null,"dpdk \u4e2d\u6700\u5e38\u4f7f\u7528\u7684\u9a71\u52a8\u662f igb_uio\uff0c\u6211\u4eec\u7ecf\u5e38\u9700\u8981\u5c06\u7f51\u5361\u63a5\u53e3\u7ed1\u5b9a\u5230 igb_uio \u4e0a\u3002\u6211\u4eec\u5fc5\u987b\u4e86\u89e3\u7684\u662f igb_uio \u9a71\u52a8\u5e76\u6ca1\u6709\u6dfb\u52a0\u4efb\u4f55\u7684\u9759\u6001\u8bbe\u5907 id \u5217\u8868\uff0c\u8fd9\u8868\u660e\u521d\u59cb\u72b6\u6001\u5b83\u662f\u4e0d\u652f\u6301\u4efb\u4f55\u8bbe\u5907\u7684\u3002"),(0,d.kt)("p",null,"igb_uio \u9a71\u52a8\u4e0e pci \u9a71\u52a8\u7c7b\u4f3c\uff0c\u5728\u5176\u6e90\u7801\u4e2d\u53ef\u4ee5\u627e\u5230\u5982\u4e0b pci_driver \u7ed3\u6784\u4f53\u3002"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-c"},'608 static struct pci_driver igbuio_pci_driver = {\n609     .name = "igb_uio",\n610     .id_table = NULL,\n611     .probe = igbuio_pci_probe,\n612     .remove = igbuio_pci_remove,\n613 };\n')),(0,d.kt)("p",null,"\u8fd9\u91cc id_table \u8bbe\u7f6e\u4e3a NULL \u8868\u793a\u9a71\u52a8\u4e2d\u6ca1\u6709\u9759\u6001\u6dfb\u52a0\u4efb\u4f55\u652f\u6301\u7684\u8bbe\u5907 id \u5217\u8868\uff0c\u8fd9\u610f\u5473\u7740\u52a0\u8f7d\u4e86 igb_uio \u9a71\u52a8\u540e\u6211\u4eec\u4e0d\u80fd\u76f4\u63a5\u5199\u5165 bind \u6587\u4ef6\u7ed1\u5b9a\u9a71\u52a8\u3002"),(0,d.kt)("p",null,"\u4e3a\u4e86\u66f4\u6e05\u695a\u7684\u8bf4\u660e\u8fd9\u4e2a id_table\uff0c\u6211\u662f\u7528 e1000e \u9a71\u52a8\u4e2d\u7684\u76f8\u5173\u6570\u636e\u7ed3\u6784\u8fdb\u884c\u5bf9\u6bd4\u3002"),(0,d.kt)("p",null,"\u4e0b\u9762\u662f e1000e \u9a71\u52a8\u4e2d netdev.c \u4e2d\u5b9a\u4e49\u7684 pci_driver \u7ed3\u6784\u4f53\u7684\u5185\u5bb9\uff1a"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-c"},"7556 /* PCI Device API Driver */\n7557 static struct pci_driver e1000_driver = {\n7558     .name     = e1000e_driver_name,\n7559     .id_table = e1000_pci_tbl,\n7560     .probe    = e1000_probe,\n7561     .remove   = e1000_remove,\n7562     .driver   = {\n7563         .pm = &e1000_pm_ops,\n7564     },\n7565     .shutdown = e1000_shutdown,\n7566     .err_handler = &e1000_err_handler\n7567 };\n")),(0,d.kt)("p",null,"\u8fd9\u91cc\u7684 id_table \u4e0e igb_uio \u4e0d\u540c\uff0c\u5b83\u6307\u5411\u4e86 e1000_pci_tbl \u8fd9\u4e2a\u6570\u7ec4\u3002e1000_pci_tbl \u6570\u7ec4\u7684\u90e8\u5206\u5185\u5bb9\u622a\u53d6\u5982\u4e0b\uff1a"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-c"},"static const struct pci_device_id e1000_pci_tbl[] = {\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82571EB_COPPER), board_82571 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82571EB_FIBER), board_82571 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82571EB_QUAD_COPPER), board_82571 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82571EB_QUAD_COPPER_LP),\n      board_82571 },\n    ........\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82572EI), board_82572 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82572EI_COPPER), board_82572 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82572EI_FIBER), board_82572 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82572EI_SERDES), board_82572 },\n\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82573E), board_82573 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82573E_IAMT), board_82573 },\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82573L), board_82573 },\n\n    { PCI_VDEVICE(INTEL, E1000_DEV_ID_82574L), board_82574 },\n")),(0,d.kt)("p",null,"\u6211\u4eec\u770b\u5230\u5728 e1000_pci_tbl \u4e2d\u6709\u5f88\u591a\u578b\u53f7\u7684\u7f51\u5361\u8bbe\u5907\u300282574L \u4e5f\u662f\u5176\u4e2d\u7684\u4e00\u6b3e\u300282574L \u7f51\u5361\u5bf9\u5e94\u7684 Vendor Id \u4e0e Device Id \u5728\u4e0a\u8ff0\u5217\u8868\u4e2d\uff0c\u5728\u9a71\u52a8\u521d\u59cb\u5316\u7684\u65f6\u5019\u6dfb\u52a0\u5230\u4e86\u7cfb\u7edf\u4e2d\uff0c\u8fd9\u6837\u6211\u4eec\u5c31\u53ef\u4ee5\u7ed1\u5b9a 82574L \u7f51\u5361\u5230 e1000e \u9a71\u52a8\u4e0a\u3002"),(0,d.kt)("h3",{id:"\u5148\u5199\u5165\u6570\u636e\u5230-new_id-\u6dfb\u52a0\u8bbe\u5907-id-\u7136\u540e\u8fdb\u884c\u7ed1\u5b9a"},"\u5148\u5199\u5165\u6570\u636e\u5230 new_id \u6dfb\u52a0\u8bbe\u5907 id \u7136\u540e\u8fdb\u884c\u7ed1\u5b9a"),(0,d.kt)("p",null,"\u4e3a\u4e86\u6210\u529f\u7ed1\u5b9a\u63a5\u53e3\u5230 igb_uio \u4e0a\uff0c\u6211\u4eec\u9996\u5148\u9700\u8981\u5728 igb_uio \u4e2d\u6dfb\u52a0\u652f\u6301\u7684\u8bbe\u5907\uff0c\u8fd9\u4e2a\u53ef\u4ee5\u901a\u8fc7\u5199\u5165\u6570\u636e\u5230 new_id \u6dfb\u52a0\u8bbe\u5907 id \u540e\u5199\u5165 bind \u6587\u4ef6\u6765\u5b8c\u6210\u3002",(0,d.kt)("strong",{parentName:"p"},"\u6ce8\u610f\u540c\u4e00\u4e2a\u8bbe\u5907 id \u53ef\u4ee5\u5199\u5165\u591a\u6b21\u5230 new_id \u4e2d\uff0c\u8981\u79fb\u9664\u4e5f\u9700\u8981\u5199\u5165\u76f8\u540c\u7684\u6b21\u6570\u5230 remove_id \u4e2d\u3002\u6ce8\u610f\u5199\u5165\u5230 remove_id \u5e76\u4e0d\u4f1a\u89e3\u9664\u7ed1\u5b9a\u3002")),(0,d.kt)("p",null,"dpdk-17.04 \u4e2d dpdk-devbind.py \u811a\u672c\u4e2d\u76f8\u5173\u7684\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-bash"},'    if driver in dpdk_drivers:\n        filename = "/sys/bus/pci/drivers/%s/new_id" % driver\n        try:\n            f = open(filename, "w")\n        except:\n            print("Error: bind failed for %s - Cannot open %s"\n                  % (dev_id, filename))\n            return\n        try:\n            f.write("%04x %04x" % (dev["Vendor"], dev["Device"]))\n            f.close()\n        except:\n            print("Error: bind failed for %s - Cannot write new PCI ID to "\n                  "driver %s" % (dev_id, driver))\n            return\n\n    # do the bind by writing to /sys\n    filename = "/sys/bus/pci/drivers/%s/bind" % driver\n    try:\n        f = open(filename, "a")\n    except:\n        print("Error: bind failed for %s - Cannot open %s"\n              % (dev_id, filename))\n        if saved_driver is not None:  # restore any previous driver\n            bind_one(dev_id, saved_driver, force)\n        return\n    try:\n        f.write(dev_id)\n        f.close()\n\n')),(0,d.kt)("p",null,"\u4e0a\u8ff0\u4ee3\u7801\u9996\u5148\u5199\u5165 new_id \u4e2d\u6dfb\u52a0\u8bbe\u5907 id \u5230 dpdk drivers\uff08\u4f8b\u5982 igb_uio\uff09\u4e2d\uff0c\u7136\u540e\u5199\u5165 bind \u6587\u4ef6\u3002"),(0,d.kt)("p",null,"\u8fd9\u6837\u786e\u4fdd\u4e86\u9996\u5148\u6709\u6ce8\u518c\u7684\u8bbe\u5907 id\uff0c\u6709\u4e86\u8fd9\u4e2a\u8bbe\u5907 id \u603b\u7ebf\u624d\u80fd\u591f match \u5230\u9a71\u52a8\u6267\u884c probe \u64cd\u4f5c\u3002\u6ca1\u6709\u6ce8\u518c\u7684\u8bbe\u5907 id\uff0cpci \u603b\u7ebf\u4e0d\u4f1a\u5339\u914d\u5230\u6307\u5b9a\u7684\u9a71\u52a8\uff0c\u4e5f\u65e0\u6cd5\u5c06\u8bbe\u5907\u7ed1\u5b9a\u5230\u76f8\u5e94\u7684\u9a71\u52a8\u4e0a\u3002"),(0,d.kt)("p",null,'echo "Vendor id device id" > new_id \u7684\u65f6\u5019\u4f1a scan\uff0c\u7528 new_id \u4e2d\u7684\u8bbe\u5907 id \u5339\u914d\u7cfb\u7edf\u4e2d\u7684\u63a5\u53e3\uff0c\u5c06\u672a\u7ed1\u5b9a\u5230\u4efb\u4f55\u9a71\u52a8\u4e0a\u7684\u63a5\u53e3\u7ed1\u5b9a\u5230\u5bf9\u5e94\u7684\u9a71\u52a8\u4e0a\u3002'),(0,d.kt)("p",null,(0,d.kt)("strong",{parentName:"p"},"new_id \u7684\u5199\u5165\u7684\u53c2\u6570\u4e2d\u6ca1\u6709 pci \u53f7\uff0c\u56e0\u6b64\u4e0d\u80fd\u6307\u5b9a\u53ea\u7ed1\u5b9a\u76f8\u540c\u578b\u53f7\u7f51\u5361\u7684\u5355\u4e2a\u53e3\u5230\u9a71\u52a8\u4e2d\u3002\u9664\u975e\u5176\u5b83\u53e3\u5df2\u7ecf\u7ed1\u5b9a\u5230\u4e86\u5176\u5b83\u9a71\u52a8\uff0c\u4e0d\u7136\u8fd9\u4e9b\u53e3\u90fd\u4f1a\u88ab\u7ed1\u5b9a\u3002")),(0,d.kt)("h2",{id:"\u7ed1\u5b9a\u5931\u8d25\u7684\u60c5\u51b5"},"\u7ed1\u5b9a\u5931\u8d25\u7684\u60c5\u51b5"),(0,d.kt)("ol",null,(0,d.kt)("li",{parentName:"ol"},"new_id \u6ca1\u6709\u6dfb\u52a0\uff0c\u4e0d\u4f1a match \u5230\u6307\u5b9a\u7684\u9a71\u52a8"),(0,d.kt)("li",{parentName:"ol"},"probe \u8fc7\u7a0b\u5f02\u5e38\uff0c\u7ed1\u5b9a\u5931\u8d25\n\u8fd9\u79cd\u60c5\u51b5\u53ef\u4ee5\u901a\u8fc7\u67e5\u770b dmesg \u4fe1\u606f\u6765\u5206\u6790\u5b9a\u4f4d\u3002")),(0,d.kt)("h2",{id:"\u5199\u5165-new_id-\u8bbe\u5907-id-\u89e6\u53d1\u603b\u7ebf\u5339\u914d\u9a71\u52a8\u81ea\u52a8-probe-\u95ee\u9898"},"\u5199\u5165 new_id \u8bbe\u5907 id \u89e6\u53d1\u603b\u7ebf\u5339\u914d\u9a71\u52a8\u81ea\u52a8 probe \u95ee\u9898"),(0,d.kt)("p",null,"\u4e0a\u6587\u4e2d\u63d0\u5230\u8fc7\u5f53\u5199\u5165\u8bbe\u5907 id \u5230 new_id \u6587\u4ef6\u4e2d\u4f1a\u51fa\u89e6\u53d1\u603b\u7ebf\u5339\u914d\u7cfb\u7edf\u4e2d\u7684\u63a5\u53e3\uff0c\u5c5e\u4e8e\u5199\u5165\u7684\u8bbe\u5907 id \u7684\u8bbe\u5907\u5e76\u4e14\u6ca1\u6709\u7ed1\u5b9a\u5230\u4efb\u4f55\u9a71\u52a8\u4e0a\u7684\u63a5\u53e3\u5c06\u4f1a\u5168\u90e8\u4f1a\u88ab\u7ed1\u5b9a\u5230 new_id \u6240\u5c5e\u7684\u9a71\u52a8\u3002"),(0,d.kt)("p",null,"\u4f8b\u5982\u7cfb\u7edf\u4e2d\u6709\u4e24\u4e2a 82574L \u7f51\u5361\u63a5\u53e3\uff0c\u90fd\u6ca1\u6709\u7ed1\u5b9a\u9a71\u52a8\uff0c\u8fd9\u65f6\u6211\u4eec\u5199\u5165 82574L \u7684\u8bbe\u5907 id \u5230 igb_uio \u9a71\u52a8\u5bf9\u5e94\u7684 new_id \u6587\u4ef6\u4e2d\uff0c\u4f1a\u5bfc\u81f4\u8fd9\u4e24\u4e2a\u53e3\u90fd\u7ed1\u5b9a\u5230 igb_uio \u4e0a\u3002"),(0,d.kt)("p",null,"\u5982\u679c\u8fd9\u79cd\u884c\u4e3a\u5bf9\u529f\u80fd\u6709\u6240\u5f71\u54cd\uff0c\u90a3\u4e48\u4f60\u53ef\u4ee5\u9009\u62e9\u5728\u7ed1\u5b9a\u5230 igb_uio \u4e4b\u524d\u5148\u5c06\u63a5\u53e3\u7ed1\u5b9a\u5230\u5176\u5b83\u9a71\u52a8\u4e0a\uff08\u4e00\u822c\u662f\u5b98\u65b9\u9a71\u52a8\uff09\uff0c\u8fd9\u6837\u5728\u5199\u5165 new_id \u6587\u4ef6\u65f6\uff0c\u5df2\u7ecf\u7ed1\u5b9a\u5230\u5176\u5b83\u9a71\u52a8\u7684\u63a5\u53e3\u5c31\u4f1a\u88ab skip\u3002"))}b.isMDXComponent=!0}}]);