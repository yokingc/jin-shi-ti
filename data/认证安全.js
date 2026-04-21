(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🔐',
  name: '认证安全',
  moduleLabel: '🔐 模块三 · 认证安全',
  cards: [
    {
      title: 'Session 和 JWT 的区别？各自适合什么场景？',
      tags: [
        { text: '安全', color: 'red' },
        { text: 'Session', color: 'kw' },
        { text: 'JWT', color: 'kw' },
        { text: '无状态', color: 'kw' }
      ],
      opening: `Session 是有状态认证：服务器存储 session 表，客户端只持有 sessionId（通过 Cookie 自动携带），服务器查表识别用户。JWT 是无状态认证：服务器不存储状态，通过验证 token 的签名和 payload（含 userId、exp 等）识别用户，适合前后端分离和分布式架构。`,
      followupLabel: '追问点',
      followup: [
        { text: 'JWT 为什么常放 localStorage 而不是 Cookie？（Cookie 自动发送有 CSRF 风险；localStorage 需手动加 Authorization header，CSRF 风险低）' },
        { text: 'localStorage 存 JWT 有什么风险？（XSS 可直接读取 localStorage，偷走 token）' },
        { text: 'JWT 退出登录如何让 token 失效？（JWT 无状态难以主动失效：① 依赖过期时间 ② token 黑名单 ③ token version ④ access+refresh token 机制）' },
        { text: 'refresh token 被窃取怎么办？（Refresh Token Rotation：每次刷新旧 token 立即失效，重复使用触发强制登出）' },
        { text: '大厂常见方案？（access token 存内存，refresh token 存 HttpOnly Cookie，JS 读不到 refresh token）' }
      ],
      bonus: `说出"安全性更好的方案往往是 JWT + HttpOnly Cookie，而不是 JWT + localStorage"——因为 HttpOnly Cookie JS 读不到，防 XSS；再配合 SameSite 或 CSRF Token 防 CSRF。这个"反转"答案会让面试官觉得你真的思考过安全权衡。`
    },
    {
      title: 'XSS 和 CSRF 的原理与防御方式？',
      tags: [
        { text: '安全', color: 'red' },
        { text: 'XSS', color: 'kw' },
        { text: 'CSRF', color: 'kw' },
        { text: 'HttpOnly', color: 'kw' },
        { text: 'SameSite', color: 'kw' }
      ],
      opening: `XSS（跨站脚本）：攻击者向页面注入恶意脚本，在用户浏览器中执行，可窃取 Cookie/token、操作 DOM、发起请求。防御：输入转义、CSP-内容安全策略、HttpOnly Cookie。CSRF（跨站请求伪造）：攻击者诱导用户访问恶意页面，借助浏览器自动携带 Cookie 向目标站点发起请求，执行转账等副作用操作（通常读不到响应）。防御：SameSite Cookie、CSRF Token、验证 Origin/Referer。`,
      followupLabel: '追问点',
      followup: [
        { text: 'XSS和CSRF通俗翻译？（XSS：恶意脚本进了你的网站页面内部执行；CSRF：是恶意站点借你的浏览器和 Cookie，冒充你向别的网站发请求。）' },
        { text: 'XSS 分哪几类？（存储型：注入持久化到数据库；反射型：注入在 URL 参数中，服务端回显；DOM 型：前端 JS 直接操作 DOM 时注入）' },
        { text: 'HttpOnly 能防 XSS 吗？（能防止 JS 读取 Cookie，但不能防止 XSS 本身发生）' },
        { text: 'CSRF 为什么通常只能做副作用操作而不能读数据？（同源策略限制 JS 读取跨域响应）' },
        { text: 'SameSite=Lax 能完全防 CSRF 吗？（能防大多数场景，但顶层 GET 导航仍会带 Cookie，需配合 CSRF Token）' },
        { text: 'CSP 是什么？（Content Security Policy，通过响应头限制页面可加载的资源来源，减少 XSS 攻击面）' }
      ],
      bonus: `说出"XSS 和 CSRF 的防御是互相制约的：Cookie 放 HttpOnly 防 XSS，但 Cookie 自动发送又带来 CSRF 风险；JWT 放 localStorage 防 CSRF，但又暴露给 XSS"——体现你理解安全设计的权衡，而不只是背防御手段。`
    },
    // ── 以下为补充卡片 ──
    {
      title: '[补充] OAuth2 授权码流程与点击劫持防御',
      tags: [
        { text: '安全', color: 'red' },
        { text: 'OAuth2', color: 'kw' },
        { text: 'OIDC', color: 'kw' },
        { text: '点击劫持', color: 'kw' }
      ],
      opening: `OAuth2 授权码流程（最安全的 OAuth2 模式）：① 用户点击"第三方登录" → ② 跳转授权服务器，用户登录并授权 → ③ 授权服务器回调业务服务器，携带 code → ④ 业务服务器用 code 换 access_token（服务端对服务端，不经过浏览器）→ ⑤ 用 access_token 获取用户信息。code 只能用一次且有效期短，access_token 不经过浏览器，安全性高。OIDC（OpenID Connect）是在 OAuth2 上加了身份层，额外返回 id_token（JWT 格式，含用户身份信息），解决"OAuth2 只授权不认证"的问题。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么授权码模式比隐式模式（Implicit）更安全？（隐式模式直接把 access_token 放在 URL fragment 返回给浏览器，容易被日志/Referer 泄露；授权码模式 token 在服务端交换，不经过浏览器）' },
        { text: 'PKCE 是什么？（Proof Key for Code Exchange，为公开客户端（SPA/移动端）设计的授权码增强，防止 code 被截获后冒用）' },
        { text: 'OAuth2 的 state 参数有什么用？（防 CSRF：客户端生成随机 state 放 session，回调时验证 state 一致性，防止攻击者伪造回调）' },
        { text: '点击劫持（Clickjacking）原理？（攻击者用透明 iframe 覆盖在诱导按钮上，用户以为点的是正常按钮，实际点的是 iframe 里的目标页面操作）' },
        { text: '点击劫持如何防御？（① X-Frame-Options: DENY/SAMEORIGIN 禁止页面被 iframe 嵌入；② CSP frame-ancestors 指令（更现代）；③ JS 检测 top !== self 并跳出 frame）' }
      ],
      bonus: `说出"OAuth2 解决的是授权问题（我能访问你的资源吗），OIDC 解决的是认证问题（你是谁）——两者经常一起用但概念不同"，体现你理解协议设计意图。补一句"现代 SPA 接入第三方登录推荐授权码 + PKCE，不要用隐式模式"。`
    }
  ]
});
