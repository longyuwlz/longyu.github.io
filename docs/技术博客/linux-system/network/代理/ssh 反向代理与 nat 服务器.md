# ssh 反向代理与 nat 服务器
## 为什么要进行反向代理
本地服务器没有公网 ip，可以连接外网，却**无法通过外网直接访问服务器**。通过反向代理来从外网**穿透**到内网中。

既然我的本地服务器可以通过 ssh 连接到外网服务器中，那么外网服务器也应该能够通过 ssh 连接到我的本地服务器中。浏览网页就是一个很好的例子——我发送访问我请求到服务器端，服务器端返回数据给浏览器来显示就是穿透内网的实例，这当然也涉及到了隧道的问题。

## 需要执行什么
ssh 到一台外网服务器并建立隧道。在连接到的那台外网服务器上通过端口转发来穿透内网，连接到内网中的本地服务器上。

具体的操作可以访问如下网页：

[使用 ssh 进行内网穿透](http://arondight.me/2016/02/17/%E4%BD%BF%E7%94%A8SSH%E5%8F%8D%E5%90%91%E9%9A%A7%E9%81%93%E8%BF%9B%E8%A1%8C%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F/)

## 测试情况
使用 ssh 建立连接后超时后连接会自动断开，可以使用 autossh 来做。autossh 会在超时断开后自动重连，但是如果发生了错误 autossh 便不会自动重连。

## nat 服务器
在真实环境中，我们从运营商那分配到的 ip 只是局域网的 ip，一般运营商会提供多个 NAT 服务器，这个 NAT 服务器来完成地址转换的过程。

NAT 建立了一种机制，让不同网络区域能够使用相同的 ip 地址集合。创建 NAT 的主要动机在于应对有限的可用 ip 地址资源情况。

当我们的主机访问互联网中的某个网站时，为了实现私有地址主机与互联网公有 ip 主机之间的通信，NAT 服务器会对**发送与接收**两个方向上的包进行修改。

对于外发的包来说，NAT 主要改写的内容为**源地址及传输层　checksum**，同时建立局域网内连接的唯一映射，当接收到到互联网服务器返回的包时，需要继续对包进行修改，修改**目的 ip 与传输层 checksum**，然后转发到相应的局域网主机中。

对于本地局域网外发的包，NAT 会将包的源地址修改为某个 NAT 路由的互联网端接口的公有 ip 地址，这样任何从 NAT 之内的私有地址主机发到互联网中的包将会以一个 NAT 路由的全局路由 ip 地址的形式出现在互联网中。



