(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🔧',
  name: '工程化',
  moduleLabel: '🔧 模块四 · 前端工程化',
  cards: [
    {
      title: 'Webpack 打包核心流程是什么？',
      tags: [
        { text: 'Webpack', color: 'blue' },
        { text: 'entry', color: 'kw' },
        { text: '依赖图', color: 'kw' },
        { text: 'chunk', color: 'kw' },
        { text: 'bundle', color: 'kw' }
      ],
      opening: `Webpack 打包流程：读取配置初始化参数 → 从 entry 启动编译 → 递归分析模块依赖并通过 Loader 转换源码 → 根据依赖关系组装 Chunk → 输出为最终静态资源文件。Plugin 贯穿整个生命周期，在各钩子阶段扩展构建能力。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Module / Chunk / Bundle 三者区别？（源文件 → 依赖关系组装的代码块 → 最终输出文件）' },
        { text: '依赖图怎么形成的？（识别 import/require，递归处理子依赖，记录模块间关系）' },
        { text: 'Loader 和 Plugin 的区别？（Loader 是"翻译官"，作用于单个模块转换；Plugin 基于 Tapable 钩子，作用于整个构建生命周期）' },
        { text: 'Loader 和 Plugin 执行时机不同？（Loader 在模块解析时执行；Plugin 在构建生命周期各钩子执行）' }
      ],
      bonus: `主动提到 Loader 在模块解析时执行，Plugin 在整个构建生命周期的不同钩子执行，说明你理解两者的执行时机差异，而不只是背定义。Plugin 基于 Tapable 钩子机制这个词说出来会加分。`
    },
    {
      title: 'Vite 为什么比 Webpack 开发时更快？',
      tags: [
        { text: 'Vite', color: 'blue' },
        { text: '原生ESM', color: 'kw' },
        { text: 'esbuild', color: 'kw' },
        { text: '冷启动', color: 'kw' },
        { text: 'HMR', color: 'kw' }
      ],
      opening: `Webpack 开发时先从 entry 分析依赖图再整体打包；Vite 开发时利用浏览器原生 ESM 按需加载，不需要先整体打包，冷启动更快。第三方依赖用 esbuild 预构建（CJS 转 ESM、合并请求），业务代码按需编译，热更新只更新变更模块。生产环境再交给 Rollup 构建。核心对比："Webpack 先构建再运行，Vite 先启动再按需加载"。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Vite 完全不打包吗？（开发不打包，生产走 Rollup）' },
        { text: '为什么还要预构建依赖？（CJS 转 ESM + 合并请求减少浏览器请求开销）' },
        { text: 'HMR 为什么快？（只让浏览器重新请求变更模块，不重建整张依赖图）' },
        { text: 'Vite 一定比 Webpack 快吗？（小中型项目开发阶段是；复杂工程 Webpack 生态和可控性更强）' }
      ],
      bonus: `说出"Webpack 先构建再运行，Vite 先启动再按需加载"这个核心对比，再补 esbuild 预构建，会显得你理解底层而不是只背结论。`
    },
    {
      title: 'HMR 热更新原理是什么？',
      tags: [
        { text: 'Webpack', color: 'blue' },
        { text: 'Vite', color: 'blue' },
        { text: 'WebSocket', color: 'kw' },
        { text: 'HMR边界', color: 'kw' },
        { text: '模块替换', color: 'kw' }
      ],
      opening: `HMR（Hot Module Replacement）：代码变更后，开发服务器监听到文件变化，通过 WebSocket 通知浏览器有模块更新，浏览器拉取变更后的模块，运行时根据 HMR 边界决定是局部替换模块，还是退化为整页刷新。整个过程不刷新整个页面，尽量保留应用当前状态。`,
      followupLabel: '追问点',
      followup: [
        { text: 'HMR 和整页刷新的区别？（局部替换保留状态 vs 整页刷新状态全丢）' },
        { text: '什么是 HMR 边界？（模块链路上能"接住"更新的位置；找不到边界就退化为整页刷新）' },
        { text: '为什么用 WebSocket？（服务端主动推送，比轮询高效）' },
        { text: 'HMR 和 React Fast Refresh 的关系？（Fast Refresh 建立在 HMR 之上，是 React 生态对组件热更新的增强）' },
        { text: 'Webpack 和 Vite 的 HMR 有何不同？（Vite 基于原生 ESM，路径更直接；Webpack 需重新构建变更 chunk）' }
      ],
      bonus: `说出"HMR 边界"这个词，并解释"找不到可接受边界就退化为整页刷新"，会显得你理解机制而不只是知道结果。冷启动 = 第一次把开发环境跑起来到页面可访问的过程，不是"执行 yarn dev 这个动作本身"。`
    },
    {
      title: '包体积很大，你会怎么优化？',
      tags: [
        { text: '工程化', color: 'blue' },
        { text: '代码分割', color: 'kw' },
        { text: '懒加载', color: 'kw' },
        { text: '依赖瘦身', color: 'kw' },
        { text: 'CDN', color: 'kw' }
      ],
      opening: `我不会上来就盲目优化，而是先用 Webpack Bundle Analyzer 等工具定位体积来源，确认是首屏业务代码、公共模块、第三方依赖还是静态资源的问题。然后针对性处理：代码分割 + 路由懒加载减少首屏体积；第三方依赖按需引入或替换轻量方案；确保 Tree Shaking 生效；公共模块用 splitChunks 抽离；图片压缩 + CDN + 缓存策略降低线上加载成本。`,
      followupLabel: '追问点',
      followup: [
        { text: '包总大小重要，还是首屏加载重要？（优先关注首屏体积和关键资源数量）' },
        { text: '路由懒加载的本质？（把首屏代码拆成独立 chunk，访问路由时再动态加载）' },
        { text: '为什么明明拆包了首屏还是慢？（接口慢、图片大、主线程阻塞、第三方脚本）' },
        { text: 'gzip 和 brotli 的区别？（brotli 压缩率更高，但需服务端支持）' },
        { text: '构建产物体积和网络传输体积是一回事吗？（不是，线上用户感知的是压缩后的传输成本）' }
      ],
      bonus: `说"先分析再优化"是最大加分项，体现排查思路。再补一句"构建产物体积和网络传输体积不是一回事，线上用户感知的是压缩后的传输成本"，会显得你有实战经验。`
    },
    // ── 以下为补充卡片 ──
    {
      title: '[补充] Babel 编译三阶段与 source map 原理',
      tags: [
        { text: '工程化', color: 'blue' },
        { text: 'Babel', color: 'kw' },
        { text: 'AST', color: 'kw' },
        { text: 'source map', color: 'kw' }
      ],
      opening: `Babel 编译分三阶段：① Parse——源码 → AST（词法分析 + 语法分析）；② Transform——遍历 AST，插件对节点做增删改（polyfill 注入、语法降级都在这里）；③ Generate——AST → 目标代码 + source map。source map 是一份 JSON 映射文件，记录构建产物每个位置对应源码的文件/行/列，让浏览器 DevTools 能把报错定位回原始代码。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Babel 插件和 preset 的区别？（插件是单个转换规则；preset 是插件集合，如 @babel/preset-env 按目标浏览器自动选插件）' },
        { text: '@babel/preset-env 和 @babel/polyfill 的关系？（preset-env 负责语法转换，polyfill 负责 API 补全；现代做法是 useBuiltIns: "usage" 按需注入 polyfill）' },
        { text: 'source map 的 devtool 选项怎么选？（开发用 eval-cheap-module-source-map，速度快；生产用 hidden-source-map，不暴露给用户但可上传到错误监控平台）' },
        { text: 'source map 为什么不能直接暴露在生产环境？（包含完整源码，竞争对手可直接读取业务逻辑）' },
        { text: 'Babel 和 TypeScript 编译器的区别？（Babel 只做语法转换，不做类型检查，速度更快；tsc 做完整类型检查但较慢；工程上常用 Babel 编译 + tsc --noEmit 做类型检查）' }
      ],
      bonus: `说出"Babel 的核心是 AST 变换，所有插件本质上都是'访问者模式'——遍历 AST 节点，匹配到目标节点就做转换"，体现你理解底层机制。补一句"这也是 codemods（大规模代码迁移工具）的原理"。`
    },
    {
      title: '[补充] monorepo 方案对比与 pnpm workspace 原理',
      tags: [
        { text: '工程化', color: 'blue' },
        { text: 'monorepo', color: 'kw' },
        { text: 'pnpm', color: 'kw' },
        { text: '幽灵依赖', color: 'kw' }
      ],
      opening: `monorepo 是把多个包/应用放在同一个仓库管理，共享工具链、方便跨包调试和原子提交。主流方案：pnpm workspace（轻量，依赖管理最优）、Turborepo（构建缓存和任务编排）、Nx（大型企业级，功能最全）。pnpm 的核心优势：所有依赖存储在全局 content-addressable store，项目里用硬链接引用，彻底解决 npm/yarn 的幽灵依赖和磁盘浪费问题。`,
      followupLabel: '追问点',
      followup: [
        { text: '什么是幽灵依赖？（npm/yarn 把所有依赖平铺到 node_modules，导致可以 require 到没有在 package.json 声明的包；pnpm 用嵌套 + 符号链接结构避免这个问题）' },
        { text: 'pnpm 为什么比 npm/yarn 安装更快？（全局 store + 硬链接，相同版本的包只下载一次，后续直接链接）' },
        { text: 'monorepo 中如何共享 TypeScript 配置？（根目录 tsconfig.base.json，各包 extends 它，再覆盖自己的 paths/outDir）' },
        { text: 'Turborepo 解决了什么问题？（任务编排 + 构建缓存：只重新构建有变更的包，未变更的包直接用缓存，大幅提升 CI 速度）' },
        { text: 'monorepo 和 multirepo 怎么选？（多包强依赖、需要原子提交、共享工具链 → monorepo；团队完全独立、发布节奏不同、安全隔离要求高 → multirepo）' }
      ],
      bonus: `说出"pnpm 的 node_modules 结构是：.pnpm 目录存真实依赖，顶层只有符号链接，这样既保证了隔离性又避免了幽灵依赖"，体现你理解实现原理。补一句"阿里内部大量使用 monorepo，面试时提到 pnpm + Turborepo 的组合会加分"。`
    }
  ]
});
