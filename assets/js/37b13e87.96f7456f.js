"use strict";(self.webpackChunklongyu_website=self.webpackChunklongyu_website||[]).push([[1687],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return s}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),_=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=_(e.components);return r.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),c=_(t),s=i,f=c["".concat(l,".").concat(s)]||c[s]||d[s]||o;return t?r.createElement(f,a(a({ref:n},p),{},{components:t})):r.createElement(f,a({ref:n},p))}));function s(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=c;var u={};for(var l in n)hasOwnProperty.call(n,l)&&(u[l]=n[l]);u.originalType=e,u.mdxType="string"==typeof e?e:i,a[1]=u;for(var _=2;_<o;_++)a[_]=t[_];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5325:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return l},default:function(){return s},frontMatter:function(){return u},metadata:function(){return _},toc:function(){return d}});var r=t(7462),i=t(3366),o=(t(7294),t(3905)),a=["components"],u={},l=void 0,_={permalink:"/longyu.github.io/blog/dpdk/\u4ee5 ixgbe pmd \u9a71\u52a8\u4e3a\u4f8b\u7814\u7a76 dpdk pmd \u9a71\u52a8\u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad\u7684\u8fc7\u7a0b",editUrl:"https://github.com/longyuwlz/longyu.github.io/blog/dpdk/\u4ee5 ixgbe pmd \u9a71\u52a8\u4e3a\u4f8b\u7814\u7a76 dpdk pmd \u9a71\u52a8\u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad\u7684\u8fc7\u7a0b.md",source:"@site/blog/dpdk/\u4ee5 ixgbe pmd \u9a71\u52a8\u4e3a\u4f8b\u7814\u7a76 dpdk pmd \u9a71\u52a8\u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad\u7684\u8fc7\u7a0b.md",title:"dpdk/\u4ee5 ixgbe pmd \u9a71\u52a8\u4e3a\u4f8b\u7814\u7a76 dpdk pmd \u9a71\u52a8\u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad\u7684\u8fc7\u7a0b",description:"dpdk pmd \u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad",date:"2022-06-21T00:32:49.000Z",formattedDate:"2022\u5e746\u670821\u65e5",tags:[],readingTime:8.06,truncated:!1,authors:[],frontMatter:{},prevItem:{title:"dpdk \u4e2d mbuf \u7684\u7ed3\u6784",permalink:"/longyu.github.io/blog/dpdk/\u4e0d\u61c2 dpdk mbuf \u7ed3\u6784\uff1f\u6b64\u7bc7\u6587\u7ae0\u5e26\u4f60\u8d85\u795e"},nextItem:{title:"dpdk mempool_ops",permalink:"/longyu.github.io/blog/dpdk/\u4ee5 rte_mempool_ops_table \u4e3a\u4f8b\u63cf\u8ff0 dpdk \u7a0b\u5e8f\u5e93\u94fe\u63a5\u987a\u5e8f\u5bf9\u7a0b\u5e8f\u6267\u884c\u7684\u5f71\u54cd"}},p={authorsImageUrls:[]},d=[{value:"dpdk pmd \u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad",id:"dpdk-pmd-\u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad",level:2},{value:"\u6807\u51c6 UIO \u8bbe\u5907\u63a7\u5236\u4e2d\u65ad",id:"\u6807\u51c6-uio-\u8bbe\u5907\u63a7\u5236\u4e2d\u65ad",level:2},{value:"\u5199\u5165 uio \u8bbe\u5907\u6587\u4ef6\u4ee3\u8868\u600e\u6837\u7684\u884c\u4e3a\uff1f",id:"\u5199\u5165-uio-\u8bbe\u5907\u6587\u4ef6\u4ee3\u8868\u600e\u6837\u7684\u884c\u4e3a",level:2},{value:"uio_write \u51fd\u6570",id:"uio_write-\u51fd\u6570",level:2},{value:"uio_info \u7ed3\u6784\u4f53\u53ca\u5176\u5b9e\u4f8b\u5316\u8fc7\u7a0b",id:"uio_info-\u7ed3\u6784\u4f53\u53ca\u5176\u5b9e\u4f8b\u5316\u8fc7\u7a0b",level:2},{value:"igb_uio.c \u4e2d\u7684\u76f8\u5173\u4ee3\u7801",id:"igb_uioc-\u4e2d\u7684\u76f8\u5173\u4ee3\u7801",level:2},{value:"write \u5199\u5165 uio \u8bbe\u5907\u6587\u4ef6\u7684\u5b8c\u6574\u8fc7\u7a0b",id:"write-\u5199\u5165-uio-\u8bbe\u5907\u6587\u4ef6\u7684\u5b8c\u6574\u8fc7\u7a0b",level:2},{value:"\u5b8c\u6574\u7684\u8fc7\u7a0b\u8349\u56fe",id:"\u5b8c\u6574\u7684\u8fc7\u7a0b\u8349\u56fe",level:2},{value:"\u8bbe\u5b9a\u7f51\u5361\u4e2d\u65ad\u5bc4\u5b58\u5668",id:"\u8bbe\u5b9a\u7f51\u5361\u4e2d\u65ad\u5bc4\u5b58\u5668",level:2}],c={toc:d};function s(e){var n=e.components,t=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"dpdk-pmd-\u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad"},"dpdk pmd \u4e2d\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\u5e76\u4f7f\u80fd\u4e2d\u65ad"),(0,o.kt)("p",null,"eth_ixgbe_dev_init \u662f ixgbe \u7f51\u5361\u7684\u521d\u59cb\u5316\u51fd\u6570\uff0c\u5728\u8fd9\u4e2a\u51fd\u6570\u7684\u6700\u540e\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u5e76\u4f7f\u80fd\u4e2d\u65ad\u3002"),(0,o.kt)("p",null,"\u5728\u914d\u7f6e\u4e86\u6536\u53d1\u961f\u5217\u7b49\u7b49\u6b65\u9aa4\u540e\uff0c\u6ce8\u518c\u4e2d\u65ad\u56de\u8c03\u51fd\u6570\uff0c\u8c03\u7528\u5982\u4e0b\u4ee3\u7801\u6ce8\u518c\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"    rte_intr_callback_register(&pci_dev->intr_handle,\n                   ixgbe_dev_interrupt_handler,\n                   (void *)eth_dev);\n")),(0,o.kt)("p",null,"\u4f7f\u80fd uio\u3001vfio \u4e2d\u65ad\u3001\u4e8b\u4ef6\u63cf\u8ff0\u7b26\u6620\u5c04\u901a\u8fc7\u5982\u4e0b\u4ee3\u7801\u6765\u5b8c\u6210\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"    /* enable uio/vfio intr/eventfd mapping */\n    rte_intr_enable(&pci_dev->intr_handle);\n")),(0,o.kt)("p",null,"rte_intr_enable \u51fd\u6570\u4f1a\u6839\u636e\u4e0d\u540c\u7684\u4e2d\u65ad\u5904\u7406\u7c7b\u578b\u5206\u53d1\u5230\u4e0d\u540c\u7684\u51fd\u6570\u4e0a\uff0c\u5728 rte_intr_handle_type \u4e2d\u5b9a\u4e49\u4e0d\u540c\u7684\u4e2d\u65ad\u7684\u7c7b\u578b\uff0c\u5b9a\u4e49\u5185\u5bb9\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"enum rte_intr_handle_type {\n    RTE_INTR_HANDLE_UNKNOWN = 0,\n    RTE_INTR_HANDLE_UIO,          /**< uio device handle */\n    RTE_INTR_HANDLE_UIO_INTX,     /**< uio generic handle */\n    RTE_INTR_HANDLE_VFIO_LEGACY,  /**< vfio device handle (legacy) */\n    RTE_INTR_HANDLE_VFIO_MSI,     /**< vfio device handle (MSI) */\n    RTE_INTR_HANDLE_VFIO_MSIX,    /**< vfio device handle (MSIX) */\n    RTE_INTR_HANDLE_ALARM,    /**< alarm handle */\n    RTE_INTR_HANDLE_EXT, /**< external handler */\n    RTE_INTR_HANDLE_MAX\n};\n")),(0,o.kt)("p",null,"ret_intr_enable \u51fd\u6570\u7684\u4ee3\u7801\u5982\u4e0b\u6240\u793a\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},'int\nrte_intr_enable(struct rte_intr_handle *intr_handle)\n{\n    if (!intr_handle || intr_handle->fd < 0 || intr_handle->uio_cfg_fd < 0)\n        return -1;\n\n    switch (intr_handle->type){\n    /* write to the uio fd to enable the interrupt */\n    case RTE_INTR_HANDLE_UIO:\n        if (uio_intr_enable(intr_handle))\n            return -1;\n        break;\n    case RTE_INTR_HANDLE_UIO_INTX:\n        if (uio_intx_intr_enable(intr_handle))\n            return -1;\n        break;\n    /* not used at this moment */\n    case RTE_INTR_HANDLE_ALARM:\n        return -1;\n#ifdef VFIO_PRESENT\n    case RTE_INTR_HANDLE_VFIO_MSIX:\n        if (vfio_enable_msix(intr_handle))\n            return -1;\n        break;\n    case RTE_INTR_HANDLE_VFIO_MSI:\n        if (vfio_enable_msi(intr_handle))\n            return -1;\n        break;\n    case RTE_INTR_HANDLE_VFIO_LEGACY:\n        if (vfio_enable_intx(intr_handle))\n            return -1;\n        break;\n#endif\n    /* unknown handle type */\n    default:\n        RTE_LOG(ERR, EAL,\n            "Unknown handle type of fd %d\\n",\n                    intr_handle->fd);\n        return -1;\n    }\n\n    return 0;\n}\n')),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u5b83\u6839\u636e intr_handle->type \u8fd9\u4e2a\u4e2d\u65ad\u63a7\u5236\u7c7b\u578b\u5206\u53d1\u5230\u4e0d\u540c\u7684\u5b50\u51fd\u6570\u4e0a\uff0c\u8fd9\u91cc\u6211\u7740\u91cd\u7814\u7a76\u4e0b\u6807\u51c6\u7684 UIO \u8bbe\u5907\u63a7\u5236\u4e2d\u65ad\u7684\u65b9\u5f0f\u3002"),(0,o.kt)("h2",{id:"\u6807\u51c6-uio-\u8bbe\u5907\u63a7\u5236\u4e2d\u65ad"},"\u6807\u51c6 UIO \u8bbe\u5907\u63a7\u5236\u4e2d\u65ad"),(0,o.kt)("p",null,"\u5bf9\u4e8e\u6807\u51c6\u7684 uio \u8bbe\u5907\uff0c\u901a\u8fc7",(0,o.kt)("strong",{parentName:"p"},"\u5411\u8bbe\u5907\u6587\u4ef6\u4e2d\u5199\u5165 1")," \u6765",(0,o.kt)("strong",{parentName:"p"},"\u4f7f\u80fd"),"\u4e2d\u65ad\uff0c\u4e0e\u4e4b\u7c7b\u4f3c",(0,o.kt)("strong",{parentName:"p"},"\u5173\u95ed\u4e2d\u65ad"),"\u7684\u8fc7\u7a0b\u662f",(0,o.kt)("strong",{parentName:"p"},"\u5411\u8bbe\u5907\u6587\u4ef6\u4e2d\u5199\u5165 0"),"\u3002"),(0,o.kt)("p",null,"uio_intr_enable \u51fd\u6570\u7684\u4ee3\u7801\u6458\u5f55\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},'static int\nuio_intr_enable(struct rte_intr_handle *intr_handle)\n{\n    const int value = 1;\n\n    if (write(intr_handle->fd, &value, sizeof(value)) < 0) {\n        RTE_LOG(ERR, EAL,\n            "Error enabling interrupts for fd %d (%s)\\n",\n            intr_handle->fd, strerror(errno));\n        return -1;\n    }\n    return 0;\n}\n')),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c\u8fd9\u4e2a\u51fd\u6570\u901a\u8fc7\u5199 1 \u5230 uio \u8bbe\u5907\u6587\u4ef6\u4e2d\u6765\u5b8c\u6210\u4f7f\u80fd\u4e2d\u65ad\u7684\u8fc7\u7a0b\u3002"),(0,o.kt)("h2",{id:"\u5199\u5165-uio-\u8bbe\u5907\u6587\u4ef6\u4ee3\u8868\u600e\u6837\u7684\u884c\u4e3a"},"\u5199\u5165 uio \u8bbe\u5907\u6587\u4ef6\u4ee3\u8868\u600e\u6837\u7684\u884c\u4e3a\uff1f"),(0,o.kt)("p",null,"uio \u53ef\u4ee5\u770b\u505a\u662f\u4e00\u79cd",(0,o.kt)("strong",{parentName:"p"},"\u5b57\u7b26\u8bbe\u5907\u9a71\u52a8"),"\uff0c\u5728\u6b64\u9a71\u52a8\u4e2d\u6ce8\u518c\u4e86",(0,o.kt)("strong",{parentName:"p"},"\u5355\u72ec\u7684 file_operations \u51fd\u6570\u8868"),"\uff0c\u53ef\u4ee5\u770b\u505a\u662f\u4e00\u79cd",(0,o.kt)("strong",{parentName:"p"},"\u72ec\u7acb"),"\u7684\u8bbe\u5907\u7c7b\u578b\u3002"),(0,o.kt)("p",null,"file_operations \u51fd\u6570\u5185\u5bb9\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"static const struct file_operations uio_fops = {\n    .owner      = THIS_MODULE,\n    .open       = uio_open,\n    .release    = uio_release,\n    .read       = uio_read,\n    .write      = uio_write,\n    .mmap       = uio_mmap,\n    .poll       = uio_poll,\n    .fasync     = uio_fasync,\n    .llseek     = noop_llseek,\n};\n")),(0,o.kt)("p",null,"\u8be5\u51fd\u6811\u8868\u5728 uio_major_init \u4e2d\u521d\u59cb\u5316 cdev \u7ed3\u6784\u4f53\u65f6\u4f7f\u7528\uff0c\u76f8\u5173\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},'    cdev->owner = THIS_MODULE;\n    cdev->ops = &uio_fops;\n    kobject_set_name(&cdev->kobj, "%s", name);\n\n    result = cdev_add(cdev, uio_dev, UIO_MAX_DEVICES);\n')),(0,o.kt)("h2",{id:"uio_write-\u51fd\u6570"},"uio_write \u51fd\u6570"),(0,o.kt)("p",null,"uio_write \u662f\u5199\u5165 uio \u8bbe\u5907\u6587\u4ef6\u65f6\u5185\u6838\u4e2d\u6700\u7ec8\u8c03\u7528\u5230\u7684\u5199\u5165\u51fd\u6570\uff0c\u5176\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"static ssize_t uio_write(struct file *filep, const char __user *buf,\n            size_t count, loff_t *ppos)\n{   \n    struct uio_listener *listener = filep->private_data;\n    struct uio_device *idev = listener->dev;\n    ssize_t retval;\n    s32 irq_on;\n\n    if (count != sizeof(s32))\n        return -EINVAL;\n\n    if (copy_from_user(&irq_on, buf, count))\n        return -EFAULT;\n\n    mutex_lock(&idev->info_lock);\n    if (!idev->info) {\n        retval = -EINVAL;\n        goto out;\n    }\n\n    if (!idev->info || !idev->info->irq) {\n        retval = -EIO;\n        goto out;\n    }\n\n    if (!idev->info->irqcontrol) {\n        retval = -ENOSYS;\n        goto out;\n    }\n\n    retval = idev->info->irqcontrol(idev->info, irq_on);\n\nout:\n    mutex_unlock(&idev->info_lock);\n    return retval ? retval : sizeof(s32);\n}\n")),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u5b83",(0,o.kt)("strong",{parentName:"p"},"\u4ece\u7528\u6237\u6001\u83b7\u53d6"),"\u5230 ",(0,o.kt)("strong",{parentName:"p"},"irq_on")," \u8fd9\u4e2a\u53d8\u91cf\u7684\u503c\uff0c\u4e3a 1 \u5bf9\u5e94\u8981\u4f7f\u80fd\u4e2d\u65ad\uff0c\u4e3a 0 \u5219\u8868\u793a\u5173\u95ed\u4e2d\u65ad\uff0c\u5728\u83b7\u53d6\u4e86\u8fd9\u4e2a\u53c2\u6570\u540e\uff0c\u5b83\u9996\u5148",(0,o.kt)("strong",{parentName:"p"},"\u5360\u7528\u4e92\u65a5\u9501"),"\uff0c\u7136\u540e\u8c03\u7528 ",(0,o.kt)("strong",{parentName:"p"},"info")," \u7ed3\u6784\u4f53\u4e2d\u5b9e\u4f8b\u5316\u7684 ",(0,o.kt)("strong",{parentName:"p"},"irqcontrol \u5b50\u51fd\u6570"),"\u6765\u5b8c\u6210\u5de5\u4f5c\u3002"),(0,o.kt)("h2",{id:"uio_info-\u7ed3\u6784\u4f53\u53ca\u5176\u5b9e\u4f8b\u5316\u8fc7\u7a0b"},"uio_info \u7ed3\u6784\u4f53\u53ca\u5176\u5b9e\u4f8b\u5316\u8fc7\u7a0b"),(0,o.kt)("p",null,"uio_write \u51fd\u6570\u4e2d\u7684 idev \u53d8\u91cf\u662f\u4e00\u4e2a",(0,o.kt)("strong",{parentName:"p"},"\u6307\u5411 struct uio_device \u7684\u6307\u9488"),"\uff0c",(0,o.kt)("strong",{parentName:"p"},"struct uio_device")," \u4e2d\u53c8\u5305\u542b \u4e00\u4e2a",(0,o.kt)("strong",{parentName:"p"},"\u6307\u5411 struct uio_info \u7684\u6307\u9488"),"\uff0c",(0,o.kt)("strong",{parentName:"p"},"struct uio_info")," \u7ed3\u6784\u4f53\u5185\u5bb9\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"struct uio_info {\n    struct uio_device   *uio_dev;\n    const char      *name;\n    const char      *version;\n    struct uio_mem      mem[MAX_UIO_MAPS];\n    struct uio_port     port[MAX_UIO_PORT_REGIONS];\n    long            irq;\n    unsigned long       irq_flags;\n    void            *priv;\n    irqreturn_t (*handler)(int irq, struct uio_info *dev_info);\n    int (*mmap)(struct uio_info *info, struct vm_area_struct *vma);\n    int (*open)(struct uio_info *info, struct inode *inode);\n    int (*release)(struct uio_info *info, struct inode *inode);\n    int (*irqcontrol)(struct uio_info *info, s32 irq_on);\n};\n")),(0,o.kt)("p",null,"\u6bcf\u4e00\u4e2a uio \u8bbe\u5907\u90fd\u4f1a",(0,o.kt)("strong",{parentName:"p"},"\u5b9e\u4f8b\u5316"),"\u4e00\u4e2a ",(0,o.kt)("strong",{parentName:"p"},"uio_info \u7ed3\u6784\u4f53"),"\uff0cuio \u9a71\u52a8\u81ea\u8eab",(0,o.kt)("strong",{parentName:"p"},"\u4e0d\u4f1a"),"\u5b9e\u4f8b\u5316 uio_info \u7ed3\u6784\u4f53\uff0c\u5b83\u53ea",(0,o.kt)("strong",{parentName:"p"},"\u63d0\u4f9b\u4e00\u4e2a\u6846\u67b6"),"\uff0c\u53ef\u4ee5\u5728\u5176\u5b83\u6a21\u5757\u4e2d\u8c03\u7528 ",(0,o.kt)("strong",{parentName:"p"},"uio_register_device")," \u6765\u5b9e\u4f8b\u5316 uio_info \u7ed3\u6784\u4f53\uff0c\u5728 dpdk \u4e2d\uff0c\u5e38\u89c1\u65b9\u5f0f\u662f",(0,o.kt)("strong",{parentName:"p"},"\u5728\u9a71\u52a8\u7ed1\u5b9a igb_uio \u7684\u65f6\u5019\u8c03\u7528 uio_register_device \u8fdb\u884c\u5b9e\u4f8b\u5316\u3002")),(0,o.kt)("h2",{id:"igb_uioc-\u4e2d\u7684\u76f8\u5173\u4ee3\u7801"},"igb_uio.c \u4e2d\u7684\u76f8\u5173\u4ee3\u7801"),(0,o.kt)("p",null,"\u53ef\u4ee5\u5728 igb_uio.c \u7684 probe \u51fd\u6570 ",(0,o.kt)("strong",{parentName:"p"},"igbuio_pci_probe")," \u4e2d\u627e\u5230\u5b9e\u4f8b\u5316\u7684\u76f8\u5173\u4ee3\u7801\uff0c\u6458\u5f55\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},'    /* fill uio infos */\n    udev->info.name = "igb_uio";\n    udev->info.version = "0.1";\n    udev->info.handler = igbuio_pci_irqhandler;\n    udev->info.irqcontrol = igbuio_pci_irqcontrol;\n#ifdef CONFIG_XEN_DOM0\n    /* check if the driver run on Xen Dom0 */\n    if (xen_initial_domain())\n        udev->info.mmap = igbuio_dom0_pci_mmap;\n#endif\n    udev->info.priv = udev;\n    udev->pdev = dev;\n    \n...........................................................\n\n    /* register uio driver */\n    err = uio_register_device(&dev->dev, &udev->info);\n    if (err != 0)\n        goto fail_remove_group;\n')),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u8fd9\u91cc\u5bf9 udev->info \u4e2d\u7684\u5b57\u6bb5\u8fdb\u884c\u4e86",(0,o.kt)("strong",{parentName:"p"},"\u586b\u5145"),"\uff0c\u540c\u65f6",(0,o.kt)("strong",{parentName:"p"},"\u8bbe\u7f6e"),"\u4e86 ",(0,o.kt)("strong",{parentName:"p"},"handler")," \u4e0e ",(0,o.kt)("strong",{parentName:"p"},"irqcontrol \u56de\u8c03\u51fd\u6570\u7b49\u5b57\u6bb5\u7684\u503c"),"\uff0c\u6700\u540e\u901a\u8fc7 ",(0,o.kt)("strong",{parentName:"p"},"uio_register_device")," ",(0,o.kt)("strong",{parentName:"p"},"\u5b9e\u4f8b\u5316"),"\u4e00\u4e2a uio \u8bbe\u5907\u3002"),(0,o.kt)("h2",{id:"write-\u5199\u5165-uio-\u8bbe\u5907\u6587\u4ef6\u7684\u5b8c\u6574\u8fc7\u7a0b"},"write \u5199\u5165 uio \u8bbe\u5907\u6587\u4ef6\u7684\u5b8c\u6574\u8fc7\u7a0b"),(0,o.kt)("p",null,"\u4e0a\u6587\u4e2d\u6211\u5df2\u7ecf\u63d0\u5230\u8fc7\u4f7f\u7528 write \u7cfb\u7edf\u8c03\u7528\u5199\u5165 uio \u8bbe\u5907\u6587\u4ef6\u6700\u7ec8\u5c06\u4f1a\u8c03\u7528\u5230"),(0,o.kt)("p",null,"info \u7ed3\u6784\u4f53\u4e2d\u5b9e\u4f8b\u5316\u7684 irqcontrol \u5b50\u51fd\u6570\u6765\u5b8c\u6210\u5de5\u4f5c\uff0c\u8fd9\u91cc igb_uio \u5c31\u5b8c\u6210\u4e86\u8fd9\u6837\u7684\u8fc7\u7a0b\u3002"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4e5f\u5c31\u662f\u8bf4\u5728\u7ed1\u5b9a\u7f51\u5361\u5230 igb_uio \u65f6\uff0c\u5199\u5165\u63a5\u53e3\u5bf9\u5e94\u7684 uio \u8bbe\u5907\u6587\u4ef6\u65f6\u5c06\u4f1a\u8c03\u7528 igb_uio \u4e2d\u5b9e\u4f8b\u5316\u7684 info->irqcontrol \u51fd\u6570\u6765\u63a7\u5236\u4e2d\u65ad\u72b6\u6001\u3002")),(0,o.kt)("p",null,"\u8fd9\u91cc\u63d0\u5230\u7684 irqcontrol \u7684\u5b9e\u4f8b\u5316\u51fd\u6570\uff0c\u5728 igb_uio \u4e2d\u5bf9\u5e94\u7684\u5c31\u662f igbuio_pci_irqcontrol \u51fd\u6570\u3002\u5176\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"static int\nigbuio_pci_irqcontrol(struct uio_info *info, s32 irq_state)\n{\n    struct rte_uio_pci_dev *udev = info->priv;\n    struct pci_dev *pdev = udev->pdev;\n\n    pci_cfg_access_lock(pdev);\n    if (udev->mode == RTE_INTR_MODE_LEGACY)\n        pci_intx(pdev, !!irq_state);\n\n    else if (udev->mode == RTE_INTR_MODE_MSIX) {\n        struct msi_desc *desc;\n\n#if (LINUX_VERSION_CODE < KERNEL_VERSION(4, 3, 0))\n        list_for_each_entry(desc, &pdev->msi_list, list)\n            igbuio_msix_mask_irq(desc, irq_state);\n#else\n        list_for_each_entry(desc, &pdev->dev.msi_list, list)\n            igbuio_msix_mask_irq(desc, irq_state);\n#endif\n    }\n    pci_cfg_access_unlock(pdev);\n\n    return 0;\n}\n")),(0,o.kt)("p",null,"\u8fd9\u91cc\u9700\u8981\u8bbf\u95ee pci \u914d\u7f6e\u7a7a\u95f4\uff0c\u6839\u636e\u4e0d\u540c\u7684\u4e2d\u65ad\u7c7b\u578b\u6765\u63a7\u5236\u4e2d\u65ad\u72b6\u6001\uff0c\u8fd9\u5c31\u5b8c\u6210\u4e86\u6240\u6709\u7684\u8fc7\u7a0b\u3002"),(0,o.kt)("h2",{id:"\u5b8c\u6574\u7684\u8fc7\u7a0b\u8349\u56fe"},"\u5b8c\u6574\u7684\u8fc7\u7a0b\u8349\u56fe"),(0,o.kt)("p",null,"write uio -> uio_write -> idev->info->irqcontrol -> igbuio_pci_irqcontrol"),(0,o.kt)("h2",{id:"\u8bbe\u5b9a\u7f51\u5361\u4e2d\u65ad\u5bc4\u5b58\u5668"},"\u8bbe\u5b9a\u7f51\u5361\u4e2d\u65ad\u5bc4\u5b58\u5668"),(0,o.kt)("p",null,"\u5b8c\u6210\u4e86\u4e0a\u9762\u63cf\u8ff0\u7684\u4f7f\u80fd uio\u3001vfio \u4e2d\u65ad\u3001\u4e8b\u4ef6\u63cf\u8ff0\u7b26\u6620\u5c04\u7684\u8fc7\u7a0b\u540e\uff0c\u7f51\u5361\u521d\u59cb\u5316\u51fd\u6570\u4f1a\u8bbe\u5b9a\u7f51\u5361\u81ea\u8eab\u7684\u786c\u4ef6\u4e2d\u65ad\u5bc4\u5b58\u5668\u6765\u4f7f\u80fd\u786c\u4ef6\u4e2d\u65ad\u3002"),(0,o.kt)("p",null,"\u5bf9\u5e94 ixgbe \u9a71\u52a8\u4e2d\u4f7f\u80fd\u7f51\u5361\u786c\u4ef6\u4e2d\u65ad\u7684\u51fd\u6570\u8c03\u7528\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"    /* enable support intr */\n    ixgbe_enable_intr(eth_dev);\n")),(0,o.kt)("p",null,"ixgbe_enable_intr \u51fd\u6570\u901a\u8fc7\u5199\u5165 EIMS \u6765\u4f7f\u80fd\u9700\u8981\u7684\u4e2d\u65ad\u6e90\uff0c\u5176\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"static inline void\nixgbe_enable_intr(struct rte_eth_dev *dev)\n{\n    struct ixgbe_interrupt *intr =\n        IXGBE_DEV_PRIVATE_TO_INTR(dev->data->dev_private);\n    struct ixgbe_hw *hw =\n        IXGBE_DEV_PRIVATE_TO_HW(dev->data->dev_private);\n\n    IXGBE_WRITE_REG(hw, IXGBE_EIMS, intr->mask);\n    IXGBE_WRITE_FLUSH(hw);\n}\n")),(0,o.kt)("p",null,"\u4ece 82599 \u7684\u624b\u518c\u4e2d\u627e\u5230\u4e86\u5982\u4e0b\u5185\u5bb9\uff1a"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Software enables the required interrupt causes by setting the EIMS register.")),(0,o.kt)("p",null,"\u4e0e\u8fd9\u91cc\u8bbe\u5b9a EIMS \u5bc4\u5b58\u5668\u7684\u884c\u4e3a\u4e00\u81f4\uff0c\u81f3\u6b64\u5c31\u5b8c\u6210\u4e86\u6240\u6709\u7684\u521d\u59cb\u5316\u8fc7\u7a0b\u3002"))}s.isMDXComponent=!0}}]);