(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🧱',
  name: '微前端',
  moduleLabel: '🧱 模块 · 微前端',
  cards: [
    {
      title: '[补充] 微前端方案对比 — qiankun / Module Federation / iframe',
      tags: [
        { text: '微前端', color: 'blue' },
        { text: 'qiankun', color: 'kw' },
        { text: 'Module Federation', color: 'kw' },
        { text: 'iframe', color: 'kw' }
      ],
      opening: `微前端是把一个大型前端应用拆分成多个独立子应用，各自独立开发、部署、运行，主应用负责调度。三种主流方案：① <strong>iframe</strong>：天然隔离，但通信复杂、体验差（弹窗/路由无法突破 iframe 边界）、性能差；② <strong>qiankun</strong>（基于 single-spa）：JS 沙箱 + 样式隔离 + 生命周期管理，子应用无需改造框架，接入成本低，是阿里系最常用方案；③ <strong>Module Federation</strong>（Webpack 5）：模块级共享，子应用可以暴露/消费任意模块，适合需要深度共享组件库的场景，但依赖 Webpack 5。`,
      followupLabel: '追问点',
      followup: [
        { text: '微前端解决了什么问题？（巨石应用拆分、团队独立发布、技术栈无关、增量升级旧系统）' },
        { text: 'qiankun 和 single-spa 的关系？（single-spa 只提供生命周期调度框架，不处理隔离；qiankun 在其上封装了 JS 沙箱、样式隔离、HTML Entry 加载方式，开箱即用）' },
        { text: 'Module Federation 和 qiankun 怎么选？（需要跨应用共享组件/状态且都用 Webpack 5 → MF；需要接入已有子应用、技术栈无关、需要完整隔离 → qiankun）' },
        { text: '微前端的主要挑战是什么？（JS 隔离、CSS 隔离、应用间通信、公共依赖共享、路由冲突、性能开销）' },
        { text: '子应用之间如何通信？（① 主应用下发 props；② 全局状态（qiankun 的 initGlobalState）；③ 自定义事件（CustomEvent）；④ URL 参数；⑤ 共享 store）' }
      ],
      bonus: `说出"微前端不是银弹，小团队/单一技术栈的项目引入微前端会增加复杂度而不是降低"，体现你有架构判断力。补一句"阿里内部大量使用 qiankun，面试时能说出 HTML Entry 的加载原理（fetch HTML → 解析 script/style → 执行）会加分"。`
    },
    {
      title: '[补充] 微前端沙箱隔离与样式隔离原理',
      tags: [
        { text: '微前端', color: 'blue' },
        { text: 'JS沙箱', color: 'kw' },
        { text: '样式隔离', color: 'kw' },
        { text: 'Proxy', color: 'kw' }
      ],
      opening: `JS 隔离的核心问题：子应用的全局变量（window.xxx）不能污染主应用和其他子应用。qiankun 提供两种沙箱：① <strong>SnapshotSandbox</strong>（快照沙箱）：子应用激活时记录 window 快照，卸载时还原，不支持多实例并行；② <strong>ProxySandbox</strong>（代理沙箱）：用 Proxy 代理 window，子应用的读写操作都在 fakeWindow 上，不影响真实 window，支持多实例并行，是现代 qiankun 的默认方案。样式隔离：① Shadow DOM（完全隔离，但第三方组件库弹窗挂载到 body 会样式丢失）；② scoped CSS（给子应用 CSS 加前缀选择器，qiankun 的 strictStyleIsolation: false 模式）。`,
      followupLabel: '追问点',
      followup: [
        { text: 'ProxySandbox 的核心原理？（创建一个空对象 fakeWindow，用 Proxy 拦截 get/set：set 写入 fakeWindow，get 先查 fakeWindow 再查真实 window；子应用卸载时直接丢弃 fakeWindow）' },
        { text: '为什么 Shadow DOM 隔离会导致弹窗样式丢失？（第三方组件库（如 antd）的弹窗默认挂载到 document.body，在 Shadow DOM 外部，拿不到 Shadow DOM 内的样式）' },
        { text: 'qiankun 的 CSS 沙箱如何处理动态插入的 style？（劫持 document.createElement/appendChild，把子应用动态插入的 style 标签记录下来，卸载时一并移除）' },
        { text: '子应用卸载后定时器/事件监听没清理怎么办？（qiankun 会在沙箱里 patch window.setTimeout/addEventListener，记录所有注册，卸载时自动清理）' },
        { text: '多个子应用同时运行时 ProxySandbox 如何保证隔离？（每个子应用有独立的 fakeWindow 实例，互不干扰；快照沙箱因为操作真实 window 所以不支持并行）' }
      ],
      bonus: `说出"ProxySandbox 的本质是给每个子应用一个'虚假的 window'，读写都在这个假 window 上，真实 window 不受影响"，体现你理解实现原理。补一句"JS 沙箱解决不了 DOM 污染问题（子应用直接操作 document.body），这是微前端的固有局限"。`
    }
  ]
});
