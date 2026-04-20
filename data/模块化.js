(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🧩',
  name: '模块化',
  moduleLabel: '🧩 模块一 · 模块化',
  cards: [
    {
      title: 'CommonJS 和 ESM 的核心区别是什么？',
      tags: [
        { text: 'ESM', color: 'blue' },
        { text: '静态分析', color: 'kw' },
        { text: '运行时加载', color: 'kw' },
        { text: 'Tree Shaking', color: 'kw' }
      ],
      opening: `ESM 的设计目标是可静态分析、工具链友好，<code>import/export</code> 在编译期就能确定依赖图，天然支持 Tree Shaking 和 code-splitting。CJS 是运行时机制，<code>require()</code> 可出现在任意分支，导出形态动态，工具链难以做激进优化。一句话总结："ESM 天然满足静态可分析的模块边界，CJS 因运行时动态性难以满足。"`,
      followupLabel: '追问点',
      followup: [
        { text: '为什么 ESM 更适合 Tree Shaking？（静态结构 → 编译期可追踪导出/引用关系）' },
        { text: 'CJS 的模块缓存机制？（首次 require 执行并缓存，后续直接读缓存 → 单例/全局状态共享的根因）' },
        { text: 'ESM 的 live binding 是什么？（导入的是绑定引用，不是值拷贝；导出方更新对导入方可见）' },
        { text: '循环依赖时两者有何不同？（CJS 半初始化导出对象；ESM live binding + TDZ，更可预测）' },
        { text: '<code>export let foo</code> 和 <code>export function foo</code> 循环依赖时哪个更稳？（函数声明更早可用，let/const 有 TDZ 风险）' }
      ],
      bonus: `补一句"即使业务全 ESM，依赖链里的 CJS 包仍会让 tree-shaking 失效"，体现工程排查视角。排查 tree-shaking 失效的顺序：① 检查 <code>sideEffects</code> 配置 → ② 检查顶层副作用代码 → ③ 检查依赖是否走了 CJS build。`
    },
    {
      title: 'Tree Shaking 在哪些情况下会失效？',
      tags: [
        { text: 'ESM', color: 'blue' },
        { text: 'sideEffects', color: 'kw' },
        { text: '副作用', color: 'kw' },
        { text: 'dead code', color: 'kw' }
      ],
      opening: `Tree Shaking 是基于 ES Module 静态分析的死代码消除机制，移除"已导出但未被使用"的代码。它能生效的前提：ESM 静态结构 + 代码无副作用。本质是"能证明无用且无副作用才敢删"。`,
      followupLabel: '失效场景',
      followup: [
        { text: '模块被标记有副作用（<code>package.json</code> 的 <code>sideEffects</code> 缺失或为 true）' },
        { text: '模块顶层有副作用代码（修改全局、原型链、注册事件、立即执行埋点等）' },
        { text: '使用 CommonJS（require/module.exports）而非 ESM' },
        { text: '动态引用或 <code>import * as xxx</code>（静态分析失效）' },
        { text: 'Babel 把 ESM 提前编译成 CommonJS' },
        { text: '动态 <code>import()</code> 跨 chunk 依赖，优化更保守' }
      ],
      bonus: `CSS 文件引入（<code>import './index.css'</code>）本身就是副作用，通常会被保留。说出这个细节会让面试官觉得你真的用过，而不是背八股。工程上要摇得干净：ESM + 明确副作用边界（sideEffects）+ 避免公共模块写顶层副作用。`
    },
    {
      title: 'ESM/CJS 混用（interop）有哪些坑？',
      tags: [
        { text: 'ESM', color: 'blue' },
        { text: 'interop', color: 'kw' },
        { text: 'default export', color: 'kw' },
        { text: 'SSR', color: 'kw' }
      ],
      opening: `ESM 有 <code>default export</code> 语义，CJS 只有 <code>module.exports</code>。工具链为了兼容会把 <code>module.exports</code> 映射成 <code>default</code>，但不同运行时/bundler 配置下映射规则不一致，导致 <code>import x from 'cjs-lib'</code> 有时能用，有时需要写 <code>x.default</code>。`,
      followupLabel: '追问点',
      followup: [
        { text: "<code>import x from 'cjs'</code> 为什么有时拿到 <code>{ default: ... }</code>？（工具链 interop 映射不一致）" },
        { text: "<code>import * as ns from 'cjs'</code> 为什么更稳？（拿到命名空间对象，工具更容易做兼容包装）" },
        { text: '业务全 ESM 为什么 tree-shaking 仍可能失败？（依赖链 CJS / 副作用 / sideEffects 配置）' },
        { text: 'Node 原生 ESM 和 bundler 的 interop 规则有何不同？（Node 更严格，不做自动 default 映射）' }
      ],
      bonus: `"我们不写 CJS ≠ 不需要懂 CJS"——高级工程师要能定位 tree-shaking 失效、依赖包体积、SSR 报错、构建插件兼容问题。面试收口话术："业务代码统一 ESM，但依赖链和构建生态仍可能包含 CJS，所以我会关注 interop 规则、tree-shaking 边界，以及 SSR/Node ESM 的兼容策略。"`
    }
  ]
});
