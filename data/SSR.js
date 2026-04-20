(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🖥️',
  name: 'SSR',
  moduleLabel: '🖥️ 模块 · SSR / 同构',
  cards: [
    {
      title: '[补充] SSR vs CSR vs SSG — 渲染模式对比与选型',
      tags: [
        { text: 'SSR', color: 'teal' },
        { text: 'CSR', color: 'kw' },
        { text: 'SSG', color: 'kw' },
        { text: 'Next.js', color: 'blue' }
      ],
      opening: `CSR（客户端渲染）：服务器返回空 HTML + JS bundle，浏览器执行 JS 后渲染页面。首屏慢、SEO 差，但交互体验好，适合后台管理系统。SSR（服务端渲染）：服务器每次请求时执行 React/Vue，返回完整 HTML，首屏快、SEO 友好，但服务器压力大、TTFB 受接口影响。SSG（静态生成）：构建时预渲染成静态 HTML，CDN 直出，性能最好，适合内容不频繁变化的页面（文档、博客、落地页）。ISR（增量静态再生）是 SSG 的进化，允许按需或定时重新生成部分页面。`,
      followupLabel: '追问点',
      followup: [
        { text: 'SSR 的 TTFB 为什么可能比 CSR 慢？（服务端需要等待数据接口返回才能渲染 HTML，接口慢则 TTFB 慢；CSR 先返回空 HTML，数据请求在客户端并行）' },
        { text: 'Next.js 中 getServerSideProps 和 getStaticProps 的区别？（getServerSideProps 每次请求执行，SSR；getStaticProps 构建时执行，SSG；getStaticProps + revalidate 是 ISR）' },
        { text: 'SSR 如何处理只能在浏览器运行的代码？（判断 typeof window !== "undefined"，或用 dynamic import + ssr: false 禁用服务端渲染该组件）' },
        { text: '什么是流式 SSR？（React 18 的 renderToPipeableStream，服务端边渲染边流式传输 HTML，配合 Suspense 让页面更快出现首屏内容）' },
        { text: 'SEO 为什么需要 SSR/SSG？（搜索引擎爬虫不一定执行 JS，CSR 的空 HTML 可能导致内容无法被索引）' }
      ],
      bonus: `说出"选型核心是：内容更新频率 × 个性化程度 × SEO 需求——静态内容用 SSG，个性化强用 SSR，纯后台用 CSR"，体现你有选型判断力而不只是背定义。补一句"Next.js App Router 支持 React Server Components，可以在组件级别混用服务端/客户端渲染，是更细粒度的方案"。`
    },
    {
      title: '[补充] Hydration 原理与常见问题',
      tags: [
        { text: 'SSR', color: 'teal' },
        { text: 'Hydration', color: 'kw' },
        { text: '同构', color: 'kw' },
        { text: 'React 18', color: 'pink' }
      ],
      opening: `Hydration（注水）是 SSR 的关键步骤：服务端返回静态 HTML 后，客户端 JS 加载完毕，React 在已有 DOM 上"接管"——绑定事件、建立 Fiber 树、让页面变得可交互。Hydration 不重新创建 DOM，而是复用服务端生成的 DOM 节点，所以比纯 CSR 的首屏更快。React 18 引入选择性 Hydration（Selective Hydration），配合 Suspense 可以优先 hydrate 用户正在交互的部分。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Hydration mismatch 是什么？（服务端渲染的 HTML 和客户端 React 渲染结果不一致，React 会警告并重新渲染，导致闪烁；常见原因：随机数/时间戳、浏览器特有 API、条件渲染依赖 window）' },
        { text: '如何避免 Hydration mismatch？（把依赖浏览器环境的渲染推迟到 useEffect 里执行；或用 suppressHydrationWarning 处理已知不一致）' },
        { text: '选择性 Hydration 解决了什么问题？（传统 SSR 必须等整个页面 JS 加载完才能开始 hydrate；选择性 Hydration 让各 Suspense 边界独立 hydrate，用户交互的区域优先）' },
        { text: 'React Server Components 和 SSR 的区别？（SSR 在服务端渲染成 HTML 字符串，仍需 hydration；RSC 在服务端渲染成特殊的序列化格式，客户端直接消费，零 JS bundle，不需要 hydration）' },
        { text: 'Next.js 的 "use client" 和 "use server" 指令是什么？（App Router 中默认组件是 Server Component；"use client" 标记该组件及其子树在客户端渲染；"use server" 标记 Server Action）' }
      ],
      bonus: `说出"Hydration 的本质是让静态 HTML 变成可交互的 React 应用，代价是需要加载并执行客户端 JS；RSC 是在探索'能不能让部分组件完全不需要 hydration'"，体现你理解技术演进方向。`
    }
  ]
});
