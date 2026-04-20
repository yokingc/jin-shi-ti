(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🚀',
  name: '性能优化',
  moduleLabel: '🚀 模块六 · 性能优化',
  cards: [
    {
      title: '首屏加载慢，你会怎么排查和优化？',
      tags: [
        { text: '性能', color: 'teal' },
        { text: 'LCP', color: 'kw' },
        { text: 'FCP', color: 'kw' },
        { text: '代码分割', color: 'kw' },
        { text: '懒加载', color: 'kw' }
      ],
      opening: `先定位再优化。用 Chrome DevTools 的 Performance 面板看 FP/FCP/LCP 及主线程长任务，结合 Network 面板看资源下载顺序、接口耗时、阻塞关系。定位后分类处理：资源加载问题（bundle 太大、图片过大、接口慢）→ 主线程执行问题（长任务、同步 JS 过多）→ 构建产物问题（依赖过重、Tree Shaking 未生效）。骨架屏是感知优化，不是根本性性能优化。`,
      followupLabel: '追问点',
      followup: [
        { text: 'LCP 和 FCP 的区别？（FCP 是首次内容绘制；LCP 是最大内容元素绘制，更贴近用户感知的"页面加载完成"）' },
        { text: '为什么明明做了拆包首屏还是慢？（接口慢、图片大、主线程阻塞、第三方脚本、关键 CSS 未处理）' },
        { text: '骨架屏能提升 LCP 吗？（不能，骨架屏是感知优化，LCP 等的是真实内容）' },
        { text: '首屏慢一定是前端问题吗？（不一定，首屏接口慢或服务端返回慢也是常见原因，要把接口耗时和静态资源耗时分开看）' },
        { text: '如何优化主线程阻塞？（拆分长任务、把非关键逻辑延后、必要时用 Web Worker 处理重计算）' }
      ],
      bonus: `说"先用工具定位，而不是直接拍脑袋优化"是最大加分项。补一句"首屏慢不一定只是前端静态资源问题，也可能是首屏接口慢"，显得你不只会答打包优化。`
    },
    {
      title: '浏览器渲染流水线与重排重绘的优化',
      tags: [
        { text: '性能', color: 'teal' },
        { text: '重排', color: 'kw' },
        { text: '重绘', color: 'kw' },
        { text: '合成层', color: 'kw' },
        { text: 'rAF', color: 'kw' }
      ],
      opening: `渲染流水线：DOM + CSSOM → Render Tree → Layout（重排）→ Paint（重绘）→ Composite（合成）。重排（reflow）代价最高，改变几何属性（宽高、位置）会触发；重绘（repaint）改变外观不影响布局；合成层操作（transform/opacity）只走 Composite，代价最低。优化核心：减少重排，尽量走合成层动画。`,
      followupLabel: '追问点',
      followup: [
        { text: '什么操作会触发重排？（改变宽高、位置、字体大小、读取 offsetWidth/getBoundingClientRect 等布局属性）' },
        { text: '强制同步布局（layout flush）是什么？（JS 读取布局属性时，浏览器被迫把前面的样式计算/布局补齐，造成同步阻塞）' },
        { text: '如何避免强制同步布局？（批量读、批量写，读写分离；避免在同一帧里"读-写-读"）' },
        { text: 'transform 动画为什么比 left/top 更流畅？（transform 走合成线程，不触发重排重绘，不占用主线程）' },
        { text: 'requestAnimationFrame 的作用？（在浏览器下一帧绘制前执行，保证动画与渲染同步，避免丢帧）' }
      ],
      bonus: `说出"是否能独立成层（composited layer）会影响滚动/动画性能，常见由 transform/opacity/will-change/position:fixed 触发"，体现你理解渲染底层。补一句"过度使用合成层会增加内存消耗，需要权衡"。`
    },
    {
      title: 'React 性能优化有哪些手段？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'memo', color: 'kw' },
        { text: 'useMemo', color: 'kw' },
        { text: 'useCallback', color: 'kw' },
        { text: '虚拟列表', color: 'kw' }
      ],
      opening: `React 性能优化核心是减少不必要的重渲染。主要手段：① React.memo 缓存组件，props 未变则跳过渲染；② useMemo 缓存计算结果；③ useCallback 缓存函数引用，避免子组件因函数引用变化重渲染；④ 代码分割 + 懒加载（React.lazy + Suspense）；⑤ 长列表用虚拟列表（react-window/react-virtual）；⑥ 避免在渲染函数里创建新对象/函数。`,
      followupLabel: '追问点',
      followup: [
        { text: 'React.memo 和 PureComponent 的区别？（memo 用于函数组件，PureComponent 用于类组件；都是浅比较 props）' },
        { text: 'useMemo 和 useCallback 什么时候用？（计算开销大或需要稳定引用时用；不要过度使用，缓存本身也有成本）' },
        { text: '为什么父组件重渲染子组件也会重渲染？（React 默认行为，父渲染时子组件函数也会重新执行）' },
        { text: '虚拟列表的原理？（只渲染可视区域内的列表项，滚动时动态替换，避免渲染大量 DOM 节点）' },
        { text: 'key 在性能优化中的作用？（帮助 diff 算法复用 DOM 节点，减少不必要的销毁重建）' }
      ],
      bonus: `说出"性能优化要先用 React DevTools Profiler 定位哪些组件渲染频繁，再针对性优化，而不是给所有组件都加 memo"，体现你有实战排查思路而不是背优化手段清单。`
    },
    // ── 以下为补充卡片 ──
    {
      title: '[补充] Resource Hints — preload / prefetch / preconnect / dns-prefetch',
      tags: [
        { text: '性能', color: 'teal' },
        { text: 'preload', color: 'kw' },
        { text: 'prefetch', color: 'kw' },
        { text: 'preconnect', color: 'kw' }
      ],
      opening: `Resource Hints 是通过 <code>&lt;link&gt;</code> 标签提前告知浏览器"即将需要某个资源"，让浏览器提前处理，减少关键路径延迟。四种指令优先级和时机不同：<code>dns-prefetch</code>（仅提前解析 DNS）→ <code>preconnect</code>（DNS + TCP + TLS 全部提前建立）→ <code>prefetch</code>（低优先级，空闲时预加载未来页面的资源）→ <code>preload</code>（高优先级，当前页面必须用到的资源，强制提前加载）。`,
      followupLabel: '追问点',
      followup: [
        { text: 'preload 和 prefetch 最核心的区别？（preload 是"当前页面马上要用"，高优先级，浏览器必须加载；prefetch 是"下一个页面可能用"，低优先级，浏览器空闲时加载，可能被忽略）' },
        { text: 'preload 的 as 属性有什么用？（告诉浏览器资源类型，影响优先级和 CSP 检查：<code>as="script"</code>/<code>"style"</code>/<code>"font"</code>/<code>"image"</code>；缺少 as 会导致资源被下载两次）' },
        { text: 'preconnect 和 dns-prefetch 怎么选？（对关键第三方域名用 preconnect，建立完整连接；对非关键域名用 dns-prefetch，只解析 DNS，开销更小；两者可以同时写作为降级）' },
        { text: '什么场景必须用 preload？（字体文件——浏览器默认等 CSSOM 构建完才下载字体，导致 FOIT/FOUT；preload 字体可以提前下载，消除字体闪烁）' },
        { text: 'preload 滥用有什么副作用？（抢占带宽，可能反而让真正的关键资源变慢；preload 的资源如果 3 秒内没被使用，Chrome 会发出警告）' }
      ],
      bonus: `说出"preload 解决的是'浏览器发现资源太晚'的问题——比如字体、关键 JS 被 CSS 阻塞发现，preload 让它们和 HTML 同时开始下载"，体现你理解浏览器资源加载时序。实战口诀：当前页关键资源用 preload，下一页资源用 prefetch，第三方域名用 preconnect。`
    }
  ]
});
