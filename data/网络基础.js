(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🌐',
  name: '网络基础',
  moduleLabel: '🌐 模块二 · 网络基础',
  cards: [
    {
      title: '强缓存和协商缓存的区别？生产环境如何配置？',
      tags: [
        { text: 'HTTP', color: 'teal' },
        { text: 'Cache-Control', color: 'kw' },
        { text: 'ETag', color: 'kw' },
        { text: '304', color: 'kw' }
      ],
      opening: `强缓存命中后不发请求，直接用本地缓存（200 from cache），由 <code>Cache-Control: max-age</code> 控制。协商缓存在强缓存过期后发请求，携带 <code>If-None-Match</code> 或 <code>If-Modified-Since</code> 让服务器判断资源是否变更，未变则返回 304。生产环境经典策略：HTML 设 <code>no-cache</code>，静态资源加 hash 后设 <code>max-age=31536000</code>——"入口可更新 + 资源可长期缓存"。`,
      followupLabel: '追问点',
      followup: [
        { text: 'no-cache 和 no-store 的区别？（no-cache 可缓存但必须协商验证；no-store 禁止任何缓存）' },
        { text: 'ETag 和 Last-Modified 哪个更准确？（ETag 基于内容 hash，精度更高；Last-Modified 精度到秒且文件时间变内容未变也会失效）' },
        { text: '为什么 HTML 不做强缓存？（HTML 是入口，缓存后用户拿不到新 hash 的 JS/CSS，永远看到旧版本）' },
        { text: 'ETag 在高并发下有什么性能问题？（服务器需要读文件计算 hash，增加 CPU/IO 开销；Last-Modified 只比较时间字符串，成本更低）' },
        { text: '为什么改了代码线上没生效？（排查：强缓存 max-age 未过期 → CDN 缓存 → 资源是否加了 hash）' }
      ],
      bonus: `补一句"CDN 层也需要配合 <code>Vary: Origin</code> 避免缓存污染"，会显得你有线上运维经验。强缓存解决减少请求次数，协商缓存解决减少传输体积，两者目标不同。`
    },
    {
      title: '从输入 URL 到页面展示，发生了什么？',
      tags: [
        { text: 'HTTP', color: 'teal' },
        { text: 'DNS', color: 'kw' },
        { text: 'TCP', color: 'kw' },
        { text: '渲染流水线', color: 'kw' }
      ],
      opening: `① URL 解析（scheme/host/port/path/query/hash，hash 不发给服务器）→ ② DNS 解析（浏览器缓存 → OS → 递归解析器 → 根/权威 DNS）→ ③ TCP 三次握手（HTTP/3 走 QUIC/UDP）→ ④ TLS 握手（HTTPS，TLS1.3 减少往返）→ ⑤ HTTP 请求/响应（HTTP/2 多路复用，缓存在此生效）→ ⑥ 渲染流水线（HTML→DOM，CSS→CSSOM，合并 Render Tree → Layout → Paint → Composite）。`,
      followupLabel: '追问点',
      followup: [
        { text: 'HTTP/2 解决了什么问题？（应用层队头阻塞；但 TCP 层丢包仍会阻塞，这是 HTTP/3 的动机）' },
        { text: 'HTTP/3 为什么特殊？（HTTP/3 不走 TCP，而是走 QUIC over UDP，优化了“传输层连接 + 安全握手”，减少队头阻塞）' },
        { text: 'TCP 和 TLS 的作用？（TCP三次握手建立连接；TLS就是HTTP的安全方案，校验身份、协商加密算法和密钥，一般身份+密钥非对称，后续业务数据对称）' },
        { text: 'CSS 为什么会阻塞渲染？（需要 CSSOM 才能生成 Render Tree，无法确定元素最终样式）' },
        { text: 'JS 为什么会阻塞 HTML 解析？（JS 可能 document.write 或修改 DOM，浏览器必须保证 DOM 构建确定性）' },
        { text: 'defer 和 async 的区别？（async 下载完立即执行会阻塞解析；defer 等 HTML 解析完按顺序执行，在 DOMContentLoaded 前）' },
        { text: 'preload scanner 是什么？（解析器暂停时，预加载扫描器仍向前扫 HTML 提前下载资源）' }
      ],
      bonus: `说出"是否能独立成层（composited layer）会影响滚动/动画性能，常见由 transform/opacity/position:fixed 触发"，体现你理解渲染底层。补一句"CSS 阻塞渲染但不阻塞 HTML 解析"，这个细节很多人会答错。`
    },
    {
      title: '什么是同源策略？CORS 是如何工作的？',
      tags: [
        { text: 'HTTP', color: 'teal' },
        { text: '同源策略', color: 'kw' },
        { text: 'CORS', color: 'kw' },
        { text: '预检请求', color: 'kw' }
      ],
      opening: `同源策略（SOP）是浏览器核心安全机制，限制一个来源的脚本读取另一个来源的响应，防止用户登录态下数据被恶意网站窃取。浏览器允许跨域请求发送，但默认禁止 JS 读取跨域响应。CORS 是服务端通过响应头显式授权的机制。简单请求（GET/HEAD/POST + 安全头 + 三种 Content-Type）直接发；非简单请求先发 OPTIONS 预检，服务端确认后再发真实请求。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么 &lt;img&gt;/&lt;script&gt; 可以跨域，fetch 默认不行？（资源型标签不暴露响应内容给 JS；fetch 可读取响应，必须受 SOP 保护）' },
        { text: '什么情况触发预检？（非简单方法、自定义请求头、Content-Type 为 application/json 等）' },
        { text: '为什么 POST JSON 几乎都会触发预检？（application/json 不属于简单请求的三种 Content-Type）' },
        { text: '如何减少预检开销？（<code>Access-Control-Max-Age</code> 缓存预检结果；网关层 OPTIONS 快速返回 204）' },
        { text: '为什么很多公司用 Nginx 反代而不是直接 CORS？（同源可省去预检、cookie 跨域配置、统一网关安全策略）' }
      ],
      bonus: `跨域是浏览器行为，不是服务器行为——服务器之间调用没有跨域概念。说出"浏览器判断跨域用的是当前页面的 origin（协议+域名+端口），不包含路径和参数"，这是很多人模糊的点。`
    },
    {
      title: 'Cookie 的结构和各属性的作用是什么？',
      tags: [
        { text: 'HTTP', color: 'teal' },
        { text: 'Cookie', color: 'kw' },
        { text: 'SameSite', color: 'kw' },
        { text: 'HttpOnly', color: 'kw' }
      ],
      opening: `Cookie 是服务器通过 <code>Set-Cookie</code> 下发的键值数据，浏览器在匹配域名的请求中自动携带，用于维持 HTTP 无状态协议下的用户身份。核心属性：<code>Domain</code>（发送范围）、<code>Path</code>（路径限制）、<code>Max-Age/Expires</code>（生命周期）、<code>Secure</code>（仅 HTTPS）、<code>HttpOnly</code>（禁止 JS 读取，防 XSS）、<code>SameSite</code>（跨站发送控制，防 CSRF）。`,
      followupLabel: '追问点',
      followup: [
        { text: 'SameSite 三个值的区别？（Strict 仅同站；Lax 允许顶层 GET 导航；None+Secure 允许跨站）' },
        { text: 'HTTP 请求一定会带 Cookie 吗？（不一定：Domain/Path 不匹配、SameSite 限制、Secure 要求 HTTPS、跨域未开启 credentials 都不会带）' },
        { text: 'Cookie vs LocalStorage？（Cookie 4KB 自动发送有过期控制；LocalStorage 5MB 不自动发送需手动管理）' },
        { text: '为什么设置了 <code>Access-Control-Allow-Origin: *</code> 带 Cookie 还是失败？（带凭证时 Allow-Origin 不能是 *，必须具体域名如https://app.example.com + Allow-Credentials: true）:' },
        { text: '跨站带 Cookie 完整需要什么？（1.Cookie 要设 SameSite=None; Secure 2.前端请求要 credentials: "include" 3.后端 CORS 要返回明确的 Access-Control-Allow-Origin 和 Access-Control-Allow-Credentials: true，非简单请求还要放行预检；4.另外浏览器第三方 Cookie 策略也不能拦。）' }
      ],
      bonus: `说出"第一次访问时服务器并不识别用户，只有登录成功后服务器通过 Set-Cookie 下发 sessionId，后续请求自动携带，服务器查 session 表识别用户"，体现你理解 Cookie 的完整工作流而不只是背属性。`
    },
    // ── 以下为补充卡片 ──
    {
      title: '[补充] WebSocket — 原理、握手与适用场景',
      tags: [
        { text: 'HTTP', color: 'teal' },
        { text: 'WebSocket', color: 'kw' },
        { text: '全双工', color: 'kw' },
        { text: 'SSE', color: 'kw' }
      ],
      opening: `WebSocket 是基于 TCP 的全双工通信协议，一次握手后连接持久，服务端可主动推送数据，无需客户端轮询。握手过程：客户端发送 HTTP Upgrade 请求（含 <code>Upgrade: websocket</code> 和 <code>Sec-WebSocket-Key</code>），服务端返回 101 Switching Protocols，之后连接升级为 WebSocket 协议，不再是 HTTP。`,
      followupLabel: '追问点',
      followup: [
        { text: 'WebSocket 和 HTTP 长轮询的区别？（长轮询：客户端发请求，服务端挂起直到有数据才响应，然后客户端再发下一个请求，有延迟且消耗连接；WebSocket：一次握手，双向实时推送，无额外开销）' },
        { text: 'WebSocket 和 SSE（Server-Sent Events）怎么选？（SSE 是单向推送（服务端→客户端），基于 HTTP，自动重连，适合消息通知、日志流；WebSocket 双向，适合聊天、协同编辑、游戏）' },
        { text: 'WebSocket 如何保持连接？（心跳机制：客户端定时发 ping，服务端回 pong；超时未收到 pong 则重连）' },
        { text: 'WebSocket 有跨域限制吗？（握手阶段是 HTTP，受同源策略影响；但服务端可通过验证 Origin 头决定是否接受连接，不像 CORS 那样由浏览器强制拦截）' },
        { text: 'WebSocket 在 Nginx 反代时需要注意什么？（需配置 proxy_http_version 1.1 + Upgrade/Connection 头转发，否则 Nginx 默认 HTTP/1.0 不支持 Upgrade）' }
      ],
      bonus: `说出"WebSocket 握手复用了 HTTP，但握手完成后就和 HTTP 没关系了，是独立的帧协议"，体现你理解协议层次。补一句"选型口诀：需要服务端主动推送用 SSE 或 WebSocket；需要双向实时通信用 WebSocket；只需推送且要简单用 SSE"。`
    },
    {
      title: '[补充] 大文件上传 — 分片上传与断点续传',
      tags: [
        { text: 'HTTP', color: 'teal' },
        { text: '分片上传', color: 'kw' },
        { text: '断点续传', color: 'kw' },
        { text: 'Range', color: 'kw' }
      ],
      opening: `大文件直接上传的问题：超时、失败重传成本高、服务端内存压力大。解决方案：分片上传 + 断点续传。核心流程：① 前端用 <code>File.slice()</code> 把文件切成固定大小的 chunk；② 计算文件 hash（通常用 spark-md5 对内容 hash，而不是用文件名）；③ 向服务端查询已上传的 chunk 列表（断点续传的关键）；④ 并发上传未上传的 chunk；⑤ 所有 chunk 上传完毕后发合并请求，服务端按顺序拼接。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么用内容 hash 而不是文件名？（文件名可以改，内容 hash 唯一标识文件内容，也是实现秒传的基础——hash 已存在则直接返回 URL）' },
        { text: '计算大文件 hash 会卡主线程怎么办？（用 Web Worker 在后台计算，不阻塞 UI；或用增量 hash（spark-md5 的 append 模式）边读边算）' },
        { text: '并发上传 chunk 如何控制并发数？（用并发控制函数，如 p-limit，限制同时上传的 chunk 数量，避免占满带宽或触发服务端限流）' },
        { text: 'HTTP Range 请求是什么？（请求头 Range: bytes=0-1023 表示只请求资源的某个字节范围，服务端返回 206 Partial Content；用于视频拖拽播放、断点下载）' },
        { text: 'chunk 上传失败如何处理？（单个 chunk 失败重试，记录失败 chunk 索引，重试时只上传失败的部分）' }
      ],
      bonus: `说出"秒传的本质是：上传前先发文件 hash 给服务端，服务端查库发现已有相同 hash 的文件，直接返回 URL，不需要真正上传"，体现你理解业务实现而不只是背 API。补一句"分片大小通常选 5MB~10MB，太小请求数多，太大失败重传成本高"。`
    }
  ]
});
