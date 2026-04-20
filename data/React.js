(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '⚛️',
  name: 'React',
  moduleLabel: '⚛️ 模块五 · React 原理',
  cards: [
    {
      title: 'React 组件通信有哪些方式？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'props', color: 'kw' },
        { text: 'Context', color: 'kw' },
        { text: 'Redux', color: 'kw' }
      ],
      opening: `父传子用 props；子传父通过父组件传回调函数；兄弟组件通过状态提升到公共父组件；跨层级用 Context；复杂全局状态用 Redux/Zustand 等状态管理方案；父组件可通过 ref 获取子组件暴露的方法（函数组件需配合 forwardRef + useImperativeHandle）；路由参数用于页面间传参。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Context 能完全替代 Redux 吗？（Context 适合共享相对稳定的公共数据；Redux 适合复杂状态流转、可预测更新、中大型应用）' },
        { text: '兄弟组件为什么不直接通信？（React 数据流单向，兄弟组件需通过公共父组件中转）' },
        { text: '函数组件里 ref 如何暴露方法？（forwardRef 转发 ref + useImperativeHandle 控制暴露内容）' },
        { text: '状态提升是什么？（把多个组件共享的状态移到最近公共父组件管理，再通过 props 分发）' },
        { text: '单向数据流是 React 独有的吗？是强制的吗？（不是独有，Vue 也是单向；React 中是强制的，子组件不能直接修改父组件 state，只能通过回调通知父组件修改）', extra: true }
      ],
      bonus: `说"通过 ref 获取子组件实例"在函数组件里不准确——函数组件没有传统意义上的实例，应说"获取子组件暴露的方法或 DOM 引用"。路由参数放最后作为补充项，不是 React 核心组件通信方式。`
    },
    {
      title: 'setState / useState 是同步还是异步的？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'setState', color: 'kw' },
        { text: '批量更新', color: 'kw' },
        { text: 'React 18', color: 'kw' }
      ],
      opening: `React 18 之前：在 React 合成事件和生命周期中是"异步"（批量更新），在原生事件和 setTimeout 中是同步的。React 18 之后：引入自动批处理（Automatic Batching），所有场景下的多次 setState 都会被批量合并，统一延迟到下一次渲染，减少不必要的重渲染。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么 React 要批量更新？（减少频繁渲染，提升性能）' },
        { text: 'React 18 之前在 setTimeout 里 setState 为什么是同步的？（脱离了 React 的调度上下文，无法批量）' },
        { text: '如何在批量更新后立即拿到最新 state？（使用函数式更新 <code>setState(prev => ...)</code> 或 useEffect 监听）' },
        { text: 'React 18 如何强制不批量？（使用 <code>flushSync</code> 包裹）' }
      ],
      bonus: `说出"React 18 的自动批处理让所有场景都批量更新，包括 setTimeout、Promise、原生事件"，体现你了解版本演进。补一句"render 应当是个纯函数，相同的 props/state 应该产出相同的 UI"，显得你理解 React 设计哲学。`
    },
    {
      title: 'React Fiber 是什么？为什么需要它？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'Fiber', color: 'kw' },
        { text: '可中断渲染', color: 'kw' },
        { text: '调度', color: 'kw' }
      ],
      opening: `React 15 的栈协调器基于递归同步更新，一旦开始不可中断，节点多时会长时间占用主线程，导致页面卡顿。React 16 引入 Fiber 架构，将渲染过程拆分为小的工作单元，每完成一个单元检查是否有剩余时间，有则继续，没有则让出控制权。这使得渲染可中断、可恢复，可优先处理紧急任务（如用户输入），实现更流畅的交互体验。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Fiber 是什么数据结构？（链表结构，每个 Fiber 节点对应一个组件，包含 child/sibling/return 指针）' },
        { text: 'Fiber 的两个阶段是什么？（Reconciliation 阶段可中断：构建 Fiber 树、diff；Commit 阶段不可中断：同步提交 DOM 变更）' },
        { text: '为什么 Commit 阶段不可中断？（DOM 操作必须原子性完成，否则用户会看到不一致的 UI）' },
        { text: 'Fiber 和 Concurrent Mode 的关系？（Fiber 是基础架构，Concurrent Mode 是基于 Fiber 实现的并发特性）' }
      ],
      bonus: `说出"Fiber 让 React 从同步不可中断变成异步可中断，核心是把递归改成了可暂停的循环迭代"，体现你理解架构演进的动机。补一句"这也是 useTransition、Suspense 等并发特性的基础"。`
    },
    {
      title: 'React diff 算法的核心策略是什么？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'diff', color: 'kw' },
        { text: 'key', color: 'kw' },
        { text: '虚拟DOM', color: 'kw' }
      ],
      opening: `完整树 diff 是 O(n³) 复杂度，React 基于三个假设降低到 O(n)：① 分层比较，跨层级节点直接销毁重建；② 同类型节点才比较，不同类型直接替换；③ 列表通过 key 快速识别节点复用。核心思想是"降低复杂度，基于 Web 应用较少跨层级移动的实际情况做合理取舍"。`,
      followupLabel: '追问点',
      followup: [
        { text: 'key 的作用是什么？（帮助 React 识别哪些元素改变了、新增了、删除了，避免不必要的重建）' },
        { text: '为什么不能用 index 作为 key？（列表顺序变化时 index 不稳定，会导致错误的节点复用和状态错乱）' },
        { text: '虚拟 DOM 的意义是什么？（不是为了更快，而是为了跨平台和声明式编程；批量 DOM 操作减少重排）' },
        { text: 'React 为什么不直接操作真实 DOM？（状态驱动视图的设计哲学，让开发者专注状态维护而非 DOM 操作）' },
        { text: 'JSX 和传统模板语法的区别是什么？（传统模板如 Handlebars/Vue template 是在 HTML 里嵌入逻辑；JSX 是在 JS 里写 HTML，本质是语法糖，最终编译成 React.createElement() 调用，可以用完整的 JS 表达能力，更灵活但也要求开发者有更强的 JS 基础）', extra: true }
      ],
      bonus: `说出"虚拟 DOM 不是为了更快，而是为了让 React 能跨平台（React Native）和实现声明式编程"，这个角度很多人没想到。补一句"diff 的本质是用 O(n) 的启发式算法换取足够好的实际性能"。`
    },
    {
      title: 'Hooks 为什么不能放在条件语句里？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'Hooks', color: 'kw' },
        { text: '链表', color: 'kw' },
        { text: '调用顺序', color: 'kw' }
      ],
      opening: `React 用链表按顺序存储每次渲染的 Hook 状态，每次渲染时按调用顺序依次取出对应状态。如果 Hook 放在条件语句里，某次渲染条件不满足时该 Hook 被跳过，后续所有 Hook 的顺序都会错位，导致状态对应错误，产生 bug。`,
      followupLabel: '追问点',
      followup: [
        { text: 'useEffect 的依赖数组为空 [] 和不传有什么区别？（[] 只在挂载/卸载时执行；不传每次渲染都执行）' },
        { text: 'useCallback 和 useMemo 的区别？（useCallback 缓存函数引用；useMemo 缓存计算结果值）' },
        { text: 'useRef 的本质是什么？（一个"逃生口"，在不触发渲染的前提下保存值，或直接访问 DOM/子组件方法）' },
        { text: '自定义 Hook 和普通函数的区别？（自定义 Hook 内部可以调用其他 Hook，普通函数不行）' }
      ],
      bonus: `说出"React 用链表按调用顺序存储 Hook 状态，顺序是 Hook 能正确工作的唯一依据"，体现你理解实现原理而不只是记住规则。补一句"这也是为什么 React 官方 lint 规则会强制检查 Hook 调用位置"。`
    },
    {
      title: 'Redux 的工作流程是什么？和 Context 有何区别？',
      tags: [
        { text: 'Redux', color: 'purple' },
        { text: '单向数据流', color: 'kw' },
        { text: 'reducer', color: 'kw' },
        { text: '中间件', color: 'kw' }
      ],
      opening: `Redux 是可预测的单向数据流状态管理容器。工作流：视图层 dispatch(action) → reducer 接收当前 state 和 action，返回新 state（不可修改原 state）→ store 更新 state → 通知所有监听器 → 监听器调用 getState 获取最新 state → 触发 UI 重渲染。中间件（如 redux-thunk）在 dispatch 和 reducer 之间拦截，处理异步逻辑。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么 reducer 不能修改原 state？（Redux 通过引用比较判断 state 是否变化，修改原对象会导致检测不到变化）' },
        { text: 'combineReducers 是什么？（Redux 提供的工具函数，将多个子 reducer 合并成一个根 reducer，按 key 分发）' },
        { text: 'Redux 和 react-redux 的区别？（Redux 是纯 JS 状态管理库，与框架无关；react-redux 是 Redux 的 React 绑定层，提供 Provider/useSelector/useDispatch）' },
        { text: 'Redux Toolkit 解决了什么问题？（简化 Redux 样板代码，内置 immer 允许"直接修改" state，内置 createSlice/createAsyncThunk）' },
        { text: 'Context 和 Redux 如何选择？（Context 适合低频更新的共享数据；Redux 适合复杂状态、频繁更新、需要调试追踪的场景）' }
      ],
      bonus: `说出"Redux 的可预测性来自于：相同的 state + 相同的 action → 永远得到相同的新 state（纯函数 reducer）"，体现你理解设计哲学。补一句"dispatch 更新后通知所有监听器不会太重，因为 react-redux 的 useSelector 内部做了浅比较，只有订阅的 state 片段变化才触发重渲染"。`
    },
    {
      title: 'React 合成事件是什么？前端路由 hash 和 history 的区别？',
      tags: [
        { text: 'React', color: 'pink' },
        { text: '合成事件', color: 'kw' },
        { text: '事件委托', color: 'kw' },
        { text: '前端路由', color: 'kw' }
      ],
      opening: `合成事件：React 模拟原生 DOM 事件的跨浏览器包装器，按 W3C 规范统一接口，抹平浏览器差异。React 将事件监听绑定在根节点（React 17+ 是 root，之前是 document），通过事件委托 + 冒泡机制统一处理，极大减少内存消耗。前端路由本质：浏览器监听 URL 变化，通过前端 API 切换组件，路由跳转本身不经过服务端。hash 模式监听 hashchange，URL 带 #，兼容性好；history 模式用 pushState/replaceState，URL 更美观，但需服务端配合（所有路径返回 index.html）。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么 React 用事件委托？（减少内存消耗，避免每个组件都绑定原生事件监听器）' },
        { text: '合成事件和原生事件的执行顺序？（原生事件先执行，合成事件后执行；合成事件在冒泡阶段处理）' },
        { text: 'history 模式为什么需要服务端配合？（直接访问子路径时服务端找不到对应文件，需要返回 index.html 让前端路由接管）' },
        { text: 'hash 为什么不发给服务器？（# 后面的内容是浏览器端的锚点，HTTP 请求不包含 hash 部分）' },
        { text: '事件池（event pooling）是否有必要提？（React 17 之前合成事件对象会被复用，异步访问事件属性需要 e.persist()；React 17 已移除事件池，现代项目不需要特别提，但如果面试官问到可以说"React 17 之前有事件池机制，现已废弃"）', extra: true }
      ],
      bonus: `说出"前端路由的本质是：浏览器监听 URL 变化 → 前端 API 切换组件，路由跳转本身不经过服务端"，体现你理解 SPA 的核心机制。React 17 把事件委托从 document 改到 root 节点，是为了支持多个 React 应用共存，说出这个细节很加分。`
    },
    // ── 以下为补充卡片 ──
    {
      title: '[补充] useEffect 的依赖陷阱与清理函数',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'useEffect', color: 'kw' },
        { text: '依赖数组', color: 'kw' },
        { text: '清理函数', color: 'kw' }
      ],
      opening: `useEffect 的依赖数组决定"什么时候重新执行"，清理函数决定"上一次副作用如何收尾"。常见陷阱：① 依赖缺失——函数或对象每次渲染都是新引用，导致无限循环；② 过度依赖——把不需要的值放进去，导致不必要的重执行；③ 清理时机——清理函数在下一次 effect 执行前 + 组件卸载时运行，不是在当次 effect 结束后立即运行。`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么函数写在 useEffect 外面会导致依赖警告？（每次渲染产生新函数引用，effect 依赖它就会无限触发；解法：用 useCallback 稳定引用，或把函数移到 effect 内部）' },
        { text: '清理函数的执行时机？（① 组件卸载时；② 下一次 effect 执行前——先清理上一次，再执行新的）' },
        { text: '如何只在挂载时执行一次但又用到最新值？（用 useRef 保存最新值，effect 依赖数组传 []，内部读 ref.current）' },
        { text: 'useEffect 和 useLayoutEffect 的区别？（useEffect 在浏览器绘制后异步执行；useLayoutEffect 在 DOM 变更后、绘制前同步执行，适合需要读取布局的场景，但会阻塞绘制）' },
        { text: 'React 18 StrictMode 下 effect 为什么执行两次？（开发模式下故意挂载→卸载→再挂载，检测清理函数是否正确，生产环境不会）' }
      ],
      bonus: `说出"依赖数组的本质是告诉 React 什么时候需要重新同步这个副作用，而不是'我想监听什么变化'"，体现你理解 effect 的设计哲学。补一句"如果你发现自己在和依赖数组'斗争'，通常说明副作用的边界划分有问题"。`
    },
    {
      title: '[补充] Suspense 与 startTransition — React 18 并发特性',
      tags: [
        { text: 'React 18', color: 'pink' },
        { text: 'Suspense', color: 'kw' },
        { text: 'startTransition', color: 'kw' },
        { text: '并发渲染', color: 'kw' }
      ],
      opening: `React 18 并发特性的核心是"可中断渲染"。<code>startTransition</code> 把状态更新标记为"非紧急"，让 React 优先处理用户输入等紧急更新，非紧急更新可被中断和延迟。<code>Suspense</code> 让组件在等待异步数据时声明式地展示 fallback，配合 <code>React.lazy</code> 做代码分割，或配合支持 Suspense 的数据库（如 React Query、Next.js）做数据加载。`,
      followupLabel: '追问点',
      followup: [
        { text: 'startTransition 和 setTimeout 有什么区别？（setTimeout 只是延迟执行，仍会阻塞主线程；startTransition 让 React 调度器感知优先级，可以在渲染过程中被更高优先级任务中断）' },
        { text: 'useTransition 和 startTransition 的区别？（useTransition 是 Hook，返回 [isPending, startTransition]，可以用 isPending 展示 loading 状态；startTransition 是独立函数，没有 pending 状态）' },
        { text: 'Suspense 的 fallback 什么时候显示？（子树中有组件 throw Promise 时，最近的 Suspense 边界捕获并展示 fallback，Promise resolve 后恢复渲染）' },
        { text: 'Suspense 能用于数据请求吗？（React 18 本身不内置数据请求的 Suspense 支持，需要框架层（Next.js App Router）或库（React Query）配合实现）' },
        { text: 'React 18 的并发渲染会导致副作用执行多次吗？（可能，这也是 StrictMode 下 effect 执行两次的原因——提前暴露不幂等的副作用）' }
      ],
      bonus: `说出"startTransition 不是防抖，防抖是'延迟执行'，startTransition 是'降低优先级，可被中断'"，这个对比很加分。补一句"并发特性的前提是 Fiber 架构，React 16 就埋下了这个基础，React 18 才开放给用户使用"。`
    },
    {
      title: '[补充] 受控组件 vs 非受控组件',
      tags: [
        { text: 'React', color: 'pink' },
        { text: '受控组件', color: 'kw' },
        { text: '非受控组件', color: 'kw' },
        { text: 'ref', color: 'kw' }
      ],
      opening: `受控组件：表单值由 React state 驱动，每次输入触发 onChange → setState → 重渲染，React 是"单一数据源"。非受控组件：表单值由 DOM 自己维护，通过 ref 在需要时读取，React 不介入中间过程。受控组件更符合 React 数据流哲学，便于校验、联动、格式化；非受控组件代码更简洁，适合简单场景或集成第三方 DOM 库。`,
      followupLabel: '追问点',
      followup: [
        { text: '什么场景适合非受控组件？（文件上传 input[type=file]、集成非 React 的 DOM 库、不需要实时校验的简单表单）' },
        { text: 'defaultValue 和 value 的区别？（value 是受控，defaultValue 是非受控的初始值，只在挂载时生效，之后 React 不再管它）' },
        { text: '受控组件为什么输入中文会有问题？（拼音输入法 compositionstart 期间 onChange 会触发，导致拼音字母被写入 state；需监听 compositionstart/end 处理）' },
        { text: 'React Hook Form 为什么性能更好？（默认非受控，只在提交或校验时读取值，避免每次输入都触发全量重渲染）' }
      ],
      bonus: `说出"受控 vs 非受控的本质是'谁是数据源'——React state 还是 DOM"，体现你理解设计哲学而不只是背用法。大型表单推荐 React Hook Form（非受控）而不是全量受控，性能差距在字段多时非常明显。`
    },
    {
      title: '[补充] React.memo 失效的典型场景',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'memo', color: 'kw' },
        { text: '浅比较', color: 'kw' },
        { text: '引用稳定性', color: 'kw' }
      ],
      opening: `<code>React.memo</code> 对 props 做浅比较，props 引用未变则跳过渲染。失效的根本原因几乎都是"父组件每次渲染都产生了新引用"。`,
      followupLabel: '失效场景',
      followup: [
        { text: '传入内联对象：<code>&lt;Child style={{ color: "red" }} /&gt;</code>——每次渲染产生新对象引用，memo 必然失效；解法：提到组件外或用 useMemo' },
        { text: '传入内联函数：<code>&lt;Child onClick={() => doSth()} /&gt;</code>——每次渲染产生新函数引用；解法：useCallback 稳定引用' },
        { text: '传入内联数组：<code>&lt;Child items={[a, b]} /&gt;</code>——同上，每次新数组；解法：useMemo' },
        { text: 'Context 变化：子组件消费了 Context，Context 值变化时 memo 无法阻止重渲染（memo 只比较 props，不管 Context）' },
        { text: '自定义比较函数写错：memo 第二个参数 areEqual 返回 true 表示"相等不渲染"，和 shouldComponentUpdate 语义相反，容易写反' }
      ],
      bonus: `说出"memo 失效 90% 的原因是引用不稳定，排查时先看父组件有没有在 render 里创建新对象/函数/数组传给子组件"，体现实战排查思路。补一句"过度使用 memo + useCallback + useMemo 本身也有成本，先用 Profiler 定位热点再优化"。`
    },
    {
      title: '[补充] Error Boundary — 错误边界原理与生产降级',
      tags: [
        { text: 'React', color: 'pink' },
        { text: 'Error Boundary', color: 'kw' },
        { text: '错误捕获', color: 'kw' },
        { text: '降级UI', color: 'kw' }
      ],
      opening: `Error Boundary 是能捕获子树渲染期间 JS 错误并展示降级 UI 的类组件，需实现 <code>static getDerivedStateFromError()</code>（更新 state 触发降级渲染）或 <code>componentDidCatch()</code>（记录错误日志）。Error Boundary 只能是类组件，目前没有 Hook 等价物。捕获范围：子组件树的渲染、生命周期、构造函数中的错误。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Error Boundary 不能捕获哪些错误？（① 事件处理器内的错误——不在渲染期间，用普通 try/catch；② 异步代码（setTimeout/Promise）；③ 服务端渲染；④ Error Boundary 自身的错误）' },
        { text: 'getDerivedStateFromError 和 componentDidCatch 分别做什么？（getDerivedStateFromError 在渲染阶段调用，返回新 state 触发降级 UI；componentDidCatch 在提交阶段调用，适合上报错误日志，不能在这里更新 state）' },
        { text: '为什么 Error Boundary 只能是类组件？（需要生命周期方法，目前 React 没有提供等价的 Hook，官方说未来可能支持）' },
        { text: '生产环境如何结合错误监控？（在 componentDidCatch 里调用 Sentry.captureException 或自研上报，记录 error 和 errorInfo.componentStack）' },
        { text: 'React 18 中未被 Error Boundary 捕获的错误会怎样？（React 18 默认会把未捕获的渲染错误抛给 window.onerror，整个应用卸载；生产环境必须部署 Error Boundary 防止白屏）' }
      ],
      bonus: `说出"Error Boundary 的粒度很重要——粒度太粗（整个应用一个）会导致局部错误白屏整个页面；粒度太细（每个组件一个）维护成本高；实践上按功能模块划分，保证核心功能不被边缘错误拖垮"，体现你有工程实践经验。`
    }
  ]
});
