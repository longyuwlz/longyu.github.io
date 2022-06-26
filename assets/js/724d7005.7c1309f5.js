"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[8049],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,p=function(e,t){if(null==e)return{};var n,r,p={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(p[n]=e[n]);return p}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(p[n]=e[n])}return p}var u=r.createContext({}),i=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=i(e.components);return r.createElement(u.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,p=e.mdxType,l=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),s=i(n),d=p,m=s["".concat(u,".").concat(d)]||s[d]||f[d]||l;return n?r.createElement(m,o(o({ref:t},c),{},{components:n})):r.createElement(m,o({ref:t},c))}));function d(e,t){var n=arguments,p=t&&t.mdxType;if("string"==typeof e||p){var l=n.length,o=new Array(l);o[0]=s;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:p,o[1]=a;for(var i=2;i<l;i++)o[i]=n[i];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},2350:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return a},metadata:function(){return i},toc:function(){return f}});var r=n(7462),p=n(3366),l=(n(7294),n(3905)),o=["components"],a={},u="tcpdump\u4e0e bpf \u6307\u4ee4\u96c6",i={unversionedId:"\u6280\u672f\u535a\u5ba2/linux-system/ebpf/tcpdump\u4e0e bpf \u6307\u4ee4\u96c6",id:"\u6280\u672f\u535a\u5ba2/linux-system/ebpf/tcpdump\u4e0e bpf \u6307\u4ee4\u96c6",title:"tcpdump\u4e0e bpf \u6307\u4ee4\u96c6",description:"\u524d\u8a00",source:"@site/docs/\u6280\u672f\u535a\u5ba2/linux-system/ebpf/tcpdump\u4e0e bpf \u6307\u4ee4\u96c6.md",sourceDirName:"\u6280\u672f\u535a\u5ba2/linux-system/ebpf",slug:"/\u6280\u672f\u535a\u5ba2/linux-system/ebpf/tcpdump\u4e0e bpf \u6307\u4ee4\u96c6",permalink:"/longyu.github.io/\u6280\u672f\u535a\u5ba2/linux-system/ebpf/tcpdump\u4e0e bpf \u6307\u4ee4\u96c6",draft:!1,editUrl:"https://github.com/longyuwlz/longyu.github.io/docs/\u6280\u672f\u535a\u5ba2/linux-system/ebpf/tcpdump\u4e0e bpf \u6307\u4ee4\u96c6.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"strace \u8ddf\u8e2a\u591a\u7ebf\u7a0b\u7a0b\u5e8f\u4e0d\u80fd\u6253\u5370\u7cfb\u7edf\u8c03\u7528\u7684\u95ee\u9898",permalink:"/longyu.github.io/\u6280\u672f\u535a\u5ba2/linux-system/debug/strace/strace \u8ddf\u8e2a\u591a\u7ebf\u7a0b\u7a0b\u5e8f\u4e0d\u80fd\u6253\u5370\u7cfb\u7edf\u8c03\u7528\u7684\u95ee\u9898"},next:{title:"\u4f7f\u7528 ar \u547d\u4ee4\u5408\u5e76\u591a\u4e2a\u9759\u6001\u5e93",permalink:"/longyu.github.io/\u6280\u672f\u535a\u5ba2/linux-system/gcc/ar/\u4f7f\u7528 ar \u547d\u4ee4\u5408\u5e76\u591a\u4e2a\u9759\u6001\u5e93"}},c={},f=[{value:"\u524d\u8a00",id:"\u524d\u8a00",level:2},{value:"bpf overview",id:"bpf-overview",level:2},{value:"bpf \u865a\u62df\u673a\u5668\u7684\u57fa\u7840\u5143\u7d20",id:"bpf-\u865a\u62df\u673a\u5668\u7684\u57fa\u7840\u5143\u7d20",level:2},{value:"bpf \u865a\u62df\u673a\u5668\u5bc4\u5b58\u5668",id:"bpf-\u865a\u62df\u673a\u5668\u5bc4\u5b58\u5668",level:3},{value:"bpf \u865a\u62df\u673a\u5668\u6307\u4ee4\u96c6",id:"bpf-\u865a\u62df\u673a\u5668\u6307\u4ee4\u96c6",level:3},{value:"\u4e00\u4e2a tcpdump \u8fc7\u6ee4\u529f\u80fd\u7684\u5b9e\u4f8b",id:"\u4e00\u4e2a-tcpdump-\u8fc7\u6ee4\u529f\u80fd\u7684\u5b9e\u4f8b",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2},{value:"\u53c2\u8003\u6587\u6863",id:"\u53c2\u8003\u6587\u6863",level:2}],s={toc:f};function d(e){var t=e.components,n=(0,p.Z)(e,o);return(0,l.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"tcpdump\u4e0e-bpf-\u6307\u4ee4\u96c6"},"tcpdump\u4e0e bpf \u6307\u4ee4\u96c6"),(0,l.kt)("h2",{id:"\u524d\u8a00"},"\u524d\u8a00"),(0,l.kt)("p",null,"tcpdump \u8fd9\u4e2a\u5de5\u5177\u7ecf\u5e38\u4f7f\u7528\uff0c\u5374\u5bf9\u5176\u80cc\u540e\u7684\u539f\u7406\u4e00\u76f4\u6ca1\u6709\u592a\u6df1\u5165\u7684\u7814\u7a76\u3002\u5728\u5b66\u4e60 ebpf \u5728\u7f51\u7edc\u4e0a\u7684\u5e94\u7528\u65f6\uff0c\u5bf9 tcpdump \u80cc\u540e\u7684\u4e00\u4e9b\u539f\u7406\u6709\u4e86\u66f4\u8fdb\u4e00\u6b65\u7684\u8ba4\u8bc6\uff0c\u5728\u672c\u7bc7\u535a\u5ba2\u4e2d\u8bb0\u5f55\u4e00\u4e0b\u3002"),(0,l.kt)("h2",{id:"bpf-overview"},"bpf overview"),(0,l.kt)("p",null,"\u5728\u4e00\u5934\u683d\u8fdb bpf \u5185\u90e8\u4e4b\u524d\uff0c\u7528\u4e0b\u9762\u8fd9\u4e2a\u56fe\u6765\u5efa\u7acb\u5bf9 bpf \u7684\u8ba4\u8bc6\uff1a\n",(0,l.kt)("img",{parentName:"p",src:"https://img-blog.csdnimg.cn/20210109162250709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xvbmd5dV93bHo=,size_16,color_FFFFFF,t_70",alt:"\u5728\u8fd9\u91cc\u63d2\u5165\u56fe\u7247\u63cf\u8ff0"})),(0,l.kt)("h2",{id:"bpf-\u865a\u62df\u673a\u5668\u7684\u57fa\u7840\u5143\u7d20"},"bpf \u865a\u62df\u673a\u5668\u7684\u57fa\u7840\u5143\u7d20"),(0,l.kt)("p",null,"tcpdump \u4f9d\u9644\u6807\u51c6\u7684 bpf \u673a\u5668\u6765\u8fd0\u884c\uff0ctcpdump \u7684\u8fc7\u6ee4\u89c4\u5219\u4f1a\u88ab\u8f6c\u5316\u4e3a\u4e00\u6bb5 bpf \u6307\u4ee4\u5e76\u88ab\u52a0\u8f7d\u5230\u5185\u6838\u4e2d\u7684 bpf \u865a\u62df\u673a\u5668\u4e0a\u6267\u884c\uff0c\u8fd9\u4e00\u5207\u90fd\u662f tcpdump \u81ea\u52a8\u5b8c\u6210\u7684\uff0c\u5e76\u4e0d\u4e3a\u7528\u6237\u53ef\u89c1\u3002"),(0,l.kt)("p",null,"\u4ece\u5185\u6838\u6e90\u4ee3\u7801 Documentation/networking/filter.txt \u6587\u4ef6\u4e2d\u6458\u5f55\u4e0b\u9762\u8fd9\u4e9b bpf \u865a\u62df\u673a\u5668\u7684\u57fa\u7840\u5143\u7d20\u4ecb\u7ecd\u5185\u5bb9\u3002"),(0,l.kt)("h3",{id:"bpf-\u865a\u62df\u673a\u5668\u5bc4\u5b58\u5668"},"bpf \u865a\u62df\u673a\u5668\u5bc4\u5b58\u5668"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-manual"},'  Element          Description\n\n  A                32 bit wide accumulator\n  X                32 bit wide X register\n  M[]              16 x 32 bit wide misc registers aka "scratch memory\n                   store", addressable from 0 to 15\n')),(0,l.kt)("p",null,"\u5e38\u7528\u7684\u5bc4\u5b58\u5668\u662f A \u7d2f\u52a0\u5bc4\u5b58\u5668\uff0cX \u5bc4\u5b58\u5668\uff0c\u8fd9\u4e24\u4e2a\u5bc4\u5b58\u5668\u90fd\u662f 32 \u4f4d\u5bbd\u5ea6\u3002"),(0,l.kt)("h3",{id:"bpf-\u865a\u62df\u673a\u5668\u6307\u4ee4\u96c6"},"bpf \u865a\u62df\u673a\u5668\u6307\u4ee4\u96c6"),(0,l.kt)("p",null,"bpf \u865a\u62df\u673a\u6307\u4ee4\u683c\u5f0f\u89c4\u5219\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-manual"},"  op:16, jt:8, jf:8, k:32\n")),(0,l.kt)("p",null,"op \u8868\u793a 16-bit \u64cd\u4f5c\u7801\uff0c\u552f\u4e00\u6807\u8bc6\u5177\u4f53\u7684\u6307\u4ee4\uff0cjt \u4e0e jf \u8868\u793a 8 \u4f4d\u5bbd\u5ea6\u7684\u8df3\u8f6c\u76ee\u6807\uff0c8 \u4f4d\u9650\u5236\u4e86\u8df3\u8f6c\u8303\u56f4\u4e3a 256 \u5b57\u8282\u3002k \u662f\u4e00\u4e2a\u5de5\u5177\u6df7\u6742\u7684\u53c2\u6570\uff0c\u53ef\u4ee5\u88ab\u6bcf\u4e00\u4e2a\u6307\u4ee4\u6309\u7167\u4e0d\u540c\u7684\u89c4\u5219\u89e3\u91ca\u3002"),(0,l.kt)("p",null,"\u6307\u4ee4\u96c6\u5305\u62ec load\u3001store\u3001branch\u3001alu\u3001miscellaneous \u548c return \u7b49\u6307\u4ee4\uff0c\u652f\u6301\u7684\u6307\u4ee4\u529f\u80fd\u5217\u8868\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-manual"},"  Instruction      Addressing mode      Description\n\n  ld               1, 2, 3, 4, 12       Load word into A\n  ldi              4                    Load word into A\n  ldh              1, 2                 Load half-word into A\n  ldb              1, 2                 Load byte into A\n  ldx              3, 4, 5, 12          Load word into X\n  ldxi             4                    Load word into X\n  ldxb             5                    Load byte into X\n\n  st               3                    Store A into M[]\n  stx              3                    Store X into M[]\n\n  jmp              6                    Jump to label\n  ja               6                    Jump to label\n  jeq              7, 8, 9, 10          Jump on A == <x>\n  jneq             9, 10                Jump on A != <x>\n  jne              9, 10                Jump on A != <x>\n  jlt              9, 10                Jump on A <  <x>\n  jle              9, 10                Jump on A <= <x>\n  jgt              7, 8, 9, 10          Jump on A >  <x>\n  jge              7, 8, 9, 10          Jump on A >= <x>\n  jset             7, 8, 9, 10          Jump on A &  <x>\n\n  add              0, 4                 A + <x>\n  sub              0, 4                 A - <x>\n  mul              0, 4                 A * <x>\n  div              0, 4                 A / <x>\n  mod              0, 4                 A % <x>\n  neg                                   !A\n  and              0, 4                 A & <x>\n  or               0, 4                 A | <x>\n  xor              0, 4                 A ^ <x>\n  lsh              0, 4                 A << <x>\n  rsh              0, 4                 A >> <x>\n\n  tax                                   Copy A into X\n  txa                                   Copy X into A\n\n  ret              4, 11                Return\n")),(0,l.kt)("p",null,"\u4e2d\u95f4\u4e00\u5217\u7528\u9017\u53f7\u9694\u5f00\u7684\u6570\u5b57\u4ee3\u8868\u4e0d\u540c\u6307\u4ee4\u652f\u6301\u7684\u5bfb\u5740\u7c7b\u578b\uff0c\u603b\u5171\u6709 13 \u79cd\uff0c\u6bcf\u4e00\u79cd\u7684\u63cf\u8ff0\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-manual"},"  Addressing mode  Syntax               Description\n\n   0               x/%x                 Register X\n   1               [k]                  BHW at byte offset k in the packet\n   2               [x + k]              BHW at the offset X + k in the packet\n   3               M[k]                 Word at offset k in M[]\n   4               #k                   Literal value stored in k\n   5               4*([k]&0xf)         Lower nibble * 4 at byte offset k in the packet\n   6               L                    Jump label L\n   7               #k,Lt,Lf             Jump to Lt if true, otherwise jump to Lf\n   8               x/%x,Lt,Lf           Jump to Lt if true, otherwise jump to Lf\n   9               #k,Lt                Jump to Lt if predicate is true\n  10               x/%x,Lt              Jump to Lt if predicate is true\n  11               a/%a                 Accumulator A\n  12               extension            BPF extension\n")),(0,l.kt)("p",null,"\u6709\u4e86\u4e0a\u9762\u8fd9\u4e9b\u57fa\u7840\u4fe1\u606f\uff0c\u4e0b\u9762\u6211\u7528\u4e00\u4e2a\u5b9e\u4f8b\u5177\u4f53\u5c06\u8fd9\u4e9b\u5185\u5bb9\u4e32\u8054\u8d77\u6765\u3002"),(0,l.kt)("h2",{id:"\u4e00\u4e2a-tcpdump-\u8fc7\u6ee4\u529f\u80fd\u7684\u5b9e\u4f8b"},"\u4e00\u4e2a tcpdump \u8fc7\u6ee4\u529f\u80fd\u7684\u5b9e\u4f8b"),(0,l.kt)("p",null,"tcpdump \u7a0b\u5e8f\u652f\u6301\u4f7f\u7528 -d \u53c2\u6570\u6765 dump \u51fa\u8fc7\u6ee4\u89c4\u5219\u8f6c\u5316\u540e\u7684 bpf \u6307\u4ee4\uff0c\u4e0b\u9762\u662f\u4e00\u4e2a\u5177\u4f53\u7684\u793a\u4f8b\uff0c\u8fd9\u4e00\u793a\u4f8b\u7528\u6765\u8fc7\u6ee4\u7aef\u53e3\u53f7\u4e3a 8080 \u7684 tcp ipv4 \u62a5\u6587\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"$ sudo tcpdump -d 'ip and tcp port 8080'\n(000) ldh      [12]\n(001) jeq      #0x800           jt 2    jf 12\n(002) ldb      [23]\n(003) jeq      #0x6             jt 4    jf 12\n(004) ldh      [20]\n(005) jset     #0x1fff          jt 12   jf 6\n(006) ldxb     4*([14]&0xf)\n(007) ldh      [x + 14]\n(008) jeq      #0x1f90          jt 11   jf 9\n(009) ldh      [x + 16]\n(010) jeq      #0x1f90          jt 11   jf 12\n(011) ret      #262144\n(012) ret      #0\n")),(0,l.kt)("p",null,"\u8fd9\u4e2a\u4f8b\u5b50\u9009\u81ea\u300alinux \u5185\u6838\u89c2\u6d4b\u6280\u672f ebpf\u300b\u7b2c\u516d\u7ae0\uff0c\u5b83\u662f\u4e2a\u975e\u5e38\u7ecf\u5178\u7684\u4f8b\u5b50\uff0c\u5728 tcpdump \u7ecf\u5178\u8bba\u6587\u4e2d\u4e5f\u80fd\u591f\u770b\u5230\u3002"),(0,l.kt)("p",null,"\u4e0a\u8ff0\u6307\u4ee4\u4e2d\uff0c\u52a0\u8f7d\u6307\u4ee4\u5730\u5740\u504f\u79fb\u91cf\u662f\u4ece\u62a5\u6587\u7684 ether \u5934\u5f00\u59cb\u7b97\u7684\uff0c\u6709\u4e86\u8fd9\u4e2a\u8ba4\u8bc6\u518d\u52a0\u4e0a\u5bf9\u4ee5\u592a\u7f51\u5934\u90e8\u3001IP \u5934\u90e8\u3001TCP \u5934\u90e8\u5b57\u6bb5\u7684\u8ba4\u8bc6\uff0c\u4e0d\u96be\u7406\u89e3\u4e0a\u9762\u8fd9\u4e9b\u6307\u4ee4\u3002"),(0,l.kt)("p",null,"\u6211\u91cd\u70b9\u8bb2\u4e00\u4e0b\u4e0b\u9762\u8fd9\u51e0\u884c\u6307\u4ee4\u7684\u542b\u4e49\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-manual"},"(004) ldh      [20]\n(005) jset     #0x1fff          jt 12   jf 6\n(006) ldxb     4*([14]&0xf)\n(007) ldh      [x + 14]\n")),(0,l.kt)("p",null,"\u504f\u79fb\u4e3a 4 \u5904\u7684\u6307\u4ee4\u4ece\u62a5\u6587\u8d77\u59cb\u504f\u79fb\u4e3a 20 \u5b57\u8282\u5904\u52a0\u8f7d\u4e00\u4e2a\u534a\u5b57\uff0816-bit\uff09\u5230 A \u5bc4\u5b58\u5668\u4e2d\uff0c\u8fd9\u4e2a\u5185\u5bb9\u8868\u793a\u7684\u503c\u4e3a  IP \u62a5\u6587\u4e2d 3 bits \u7684 Flags \u4e0e 13 bits \u7684 Fragment Offset \u7684\u503c\u3002"),(0,l.kt)("p",null,"\u504f\u79fb\u4e3a 5 \u5904\u7684\u6307\u4ee4\u5c06 A \u5bc4\u5b58\u5668\u503c\u7684\u4f4e 13 \u4f4d\u4e0e 0x1fff \u8fdb\u884c\u4e0e\u8fd0\u7b97\u5e76\u6839\u636e\u7ed3\u679c\u8fdb\u884c\u8df3\u8f6c\uff0c\u5b9e\u73b0\u5f53 ",(0,l.kt)("strong",{parentName:"p"},"Fragment Offset \u4e3a 0 \u7684\u65f6\u5019\u624d\u7ee7\u7eed\u5224\u65ad\u7aef\u53e3\u53f7"),"\uff0c",(0,l.kt)("strong",{parentName:"p"},"\u975e 0 \u5219\u76f4\u63a5\u8df3\u5230 12 \u884c"),"\u3002"),(0,l.kt)("p",null,"\u504f\u79fb\u4e3a 6 \u5904\u7684\u6307\u4ee4\u6bd4\u8f83\u96be\u61c2\uff0c\u5b83\u7684\u529f\u80fd\u662f\u52a0\u8f7d\u5b9e\u9645\u7684 ip \u5934\u957f\u5ea6\uff0c","[14]"," & 0xf \u5bf9\u5e94\u7684\u662f ip \u62a5\u6587\u4e2d IHL \u7684\u5185\u5bb9\u3002",(0,l.kt)("strong",{parentName:"p"},"\u7531\u4e8e IHL \u5355\u4f4d\u4e3a 4 \u5b57\u8282"),"\uff0c",(0,l.kt)("strong",{parentName:"p"},"\u56e0\u6b64\u5bf9 IHL \u7684\u503c\u4e58\u4e86 4"),"\uff0c\u5c31\u5c06",(0,l.kt)("strong",{parentName:"p"},"\u771f\u5b9e\u7684 ip \u5934\u957f\u5ea6\u5b57\u8282\u6570"),"\u4fdd\u5b58\u5230\u4e86 X \u5bc4\u5b58\u5668\u4e2d\u3002"),(0,l.kt)("p",null,"\u504f\u79fb\u4e3a 7 \u5904\u7684\u6307\u4ee4\u4ee5 X \u5bc4\u5b58\u5668\u4e2d ip \u62a5\u6587\u7684\u957f\u5ea6\u4e3a\u57fa\u7840\uff0c\u52a0\u4e0a 14 ( ether header \u957f\u5ea6\uff09\u5f97\u5230 TCP \u6e90\u7aef\u53e3\u7684\u504f\u79fb\u91cf\uff0c\u5e76\u8bfb\u53d6\u5176\u503c\u5230 A \u5bc4\u5b58\u5668\u4e2d\u3002"),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"tcpdump \u5de5\u5177\u5728\u5b9a\u4f4d\u7f51\u7edc\u95ee\u9898\u4e2d\u7ecf\u5e38\u7528\u5230\uff0c\u53ef\u662f\u6211\u4ee5\u524d\u5e76\u4e0d\u6e05\u695a\u5176\u80cc\u540e\u7684\u4e00\u4e9b\u7ec6\u8282\u3002\u672c\u7bc7\u6587\u7ae0\u4e2d\u501f tcpdump \u63cf\u8ff0\u4e86 bpf \u6307\u4ee4\u96c6\u5e76\u6839\u636e\u4e00\u4e2a\u7ecf\u5178\u7684\u8fc7\u6ee4\u4f8b\u5b50\u5c06\u8fd9\u4e9b\u6307\u4ee4\u4e32\u8054\u4e86\u8d77\u6765\u3002"),(0,l.kt)("p",null,"\u4f7f\u7528\u865a\u62df\u673a\u5668\u7684\u5f62\u5f0f\u89e3\u51b3\u5305\u8fc7\u6ee4\u95ee\u9898\u662f tcpdump \u7684\u4e00\u5927\u4eae\u70b9\uff0c\u4f9d\u8d56 bpf \u865a\u62df\u673atcpdump \u5b9e\u73b0\u4e86\u4e00\u5957\u66f4\u9ad8\u6548\u7684\u4ece\u5185\u6838\u6355\u83b7\u62a5\u6587\u5230\u7528\u6237\u6001\u7684\u67b6\u6784\u3002"),(0,l.kt)("p",null,"bpf \u662f ebpf \u7684\u57fa\u7840\uff0c\u76f8\u8f83 ebpf \u865a\u62df\u673a\u800c\u8a00\u5b83\u66f4\u7b80\u5355\uff0c\u5374\u4e0e ebpf \u7684\u539f\u7406\u6709\u5171\u540c\u4e4b\u5904\uff0c\u5728\u8fdb\u519b ebpf \u5185\u90e8\u539f\u7406\u524d\uff0c\u4e0d\u59a8\u5148\u7814\u7a76\u7814\u7a76 bpf\u3002"),(0,l.kt)("h2",{id:"\u53c2\u8003\u6587\u6863"},"\u53c2\u8003\u6587\u6863"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.tcpdump.org/papers/bpf-usenix93.pdf"},"The BSD Packet Filter: A New Architecture for User-level Packet Capture")))}d.isMDXComponent=!0}}]);