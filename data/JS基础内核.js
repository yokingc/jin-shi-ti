(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🧠',
  name: 'JS基础内核',
  moduleLabel: '🧠 模块二 · JS 基础内核',
  cards: [
    {
      title: 'JS 基础内核复习表',
      tags: [
        { text: '总览', color: 'teal' },
        { text: '复习表', color: 'kw' },
        { text: '高频', color: 'blue' }
      ],
      opening: `
        <table style="width:100%; border-collapse:collapse; overflow:hidden; border-radius:10px; border:1px solid #dbe3ee; background:#fff; font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9; color:#0f172a;">
              <th style="width:26%; padding:12px 14px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">主题</th>
              <th style="padding:12px 14px; border-bottom:1px solid #dbe3ee; text-align:left; font-weight:700;">核心一句话</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">执行上下文</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">代码运行时的环境，包含变量、作用域、<code>this</code>、词法环境</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">作用域</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">决定变量在哪儿能被访问</td>
            </tr>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#0f766e;">变量提升</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;"><code>var</code> 提升并初始化为 <code>undefined</code>，<code>let/const</code> 提升但在 TDZ，函数声明整体提升</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;"><code>this</code></td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">看调用方式，不看定义位置；箭头函数没有自己的 <code>this</code></td>
            </tr>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#be185d;">闭包</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">函数和它记住的外层变量的组合</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;">原型链</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">实例通过 <code>__proto__</code> 找到构造函数的 <code>prototype</code>，再一路向上找</td>
            </tr>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;"><code>new</code></td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">创建空对象，挂原型，绑定 <code>this</code>，执行构造函数，按返回值决定结果</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#6d28d9;"><code>instanceof</code></td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">看对象原型链上能不能找到右侧构造函数的 <code>prototype</code></td>
            </tr>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#2563eb;">事件循环</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">先同步，再清空微任务，再执行下一个宏任务</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#2563eb;">Promise</td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">状态机，<code>pending -&gt; fulfilled/rejected</code>，状态一旦确定不可逆</td>
            </tr>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#2563eb;"><code>then</code></td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">返回新 Promise，便于链式调用、错误传递、结果接力</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#2563eb;"><code>catch</code></td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">处理 rejected 状态，也可以把链条重新变回成功态</td>
            </tr>
            <tr>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7; font-weight:700; color:#2563eb;"><code>finally</code></td>
              <td style="padding:11px 14px; border-bottom:1px solid #edf2f7;">只做收尾，默认不改结果</td>
            </tr>
            <tr style="background:#fbfdff;">
              <td style="padding:11px 14px; font-weight:700; color:#2563eb;"><code>async/await</code></td>
              <td style="padding:11px 14px;">Promise 的语法糖，<code>await</code> 后面的代码会进微任务</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top:12px; color:#475569;">复习时先按这张表把主线串起来，再进入后面的单题和综合题。核心目标不是背名词，而是能解释“机制、边界和易错场景”。</p>
      `,
      followupLabel: '复习自检',
      followup: [
        { text: '请用 30 秒复述：执行上下文、作用域、变量提升分别解决什么问题？' },
        { text: '请用一句话区分：<code>this</code>、闭包、原型链各自看什么？' },
        { text: '请用一句话说明：事件循环、Promise、async/await 为什么经常一起考？' }
      ],
      bonus: `总口诀：this 看调用，闭包看保留，原型看链路，new 看创建，instanceof 看原型链，事件循环先同步后微任务再宏任务，Promise 是状态机，async/await 是 Promise 语法糖。`
    },
    {
      title: 'var / let / const 提升有什么区别？',
      tags: [
        { text: '变量提升', color: 'kw' },
        { text: 'TDZ', color: 'blue' },
        { text: '函数声明', color: 'kw' }
      ],
      opening: `<code>var</code> 在执行上下文创建阶段被声明并初始化为 <code>undefined</code>，所以声明前访问不报错，只是 <code>undefined</code>。<code>let/const</code> 也会提升（声明阶段存在），但不初始化，声明前处于暂时性死区（TDZ），访问直接报 <code>ReferenceError</code>。函数声明整体提升，声明前可以直接调用；函数表达式不整体提升，只提升变量名。`,
      followupLabel: '追问点',
      followup: [
        { text: '<code>let/const</code> 到底有没有提升？（有，只是不初始化，TDZ 就是证明）' },
        { text: '函数声明和函数表达式提升的区别？（声明整体提升，表达式只提升变量名）' },
        { text: '同名 var 和函数声明同时存在，谁优先？（函数声明优先，但赋值后 var 会覆盖）' }
      ],
      bonus: `说出"let/const 也提升，只是不初始化"能体现你理解 TDZ 的本质，而不是背结论。`
    },
    {
      title: 'this 指向怎么判断？（含易错场景）',
      tags: [
        { text: 'this', color: 'pink' },
        { text: '隐式丢失', color: 'kw' },
        { text: '箭头函数', color: 'kw' },
        { text: '四种绑定', color: 'blue' }
      ],
      opening: `<code>this</code> 不看函数写在哪，只看函数怎么被调用。四种规则：默认绑定（独立调用，非严格模式指向全局，严格模式 <code>undefined</code>）、隐式绑定（<code>obj.fn()</code> 指向 obj）、显式绑定（call/apply/bind 手动指定）、new 绑定（指向新实例）。箭头函数没有自己的 <code>this</code>，继承外层词法作用域的 <code>this</code>，不受调用方式影响。`,
      followupLabel: '最易错场景',
      followup: [
        { text: '<code>const bar = obj.foo; bar()</code> 为什么 this 丢了？（赋值后脱离 obj，变成默认绑定）' },
        { text: 'setTimeout 回调里 this 为什么变了？（回调独立调用，默认绑定）' },
        { text: '箭头函数为什么不能用 call/bind 改变 this？（词法绑定，不是动态绑定）' },
        { text: 'new 绑定优先级高于 bind 吗？（是的，new 会忽略 bind 的 this）' }
      ],
      bonus: `优先级：new > 显式 > 隐式 > 默认。说出这个顺序能让面试官觉得你系统理解，而不是逐条背规则。`
    },
    {
      title: '闭包是什么？为什么第二次调用打印 2？',
      tags: [
        { text: '闭包', color: 'teal' },
        { text: '词法环境', color: 'kw' },
        { text: '私有变量', color: 'kw' },
        { text: '内存', color: 'kw' }
      ],
      opening: `闭包是函数和它记住的外层词法环境的组合。<code>inner</code> 引用了外层 <code>count</code>，并被返回到外部持续使用，所以 <code>count</code> 所在的词法环境不会随 <code>outer</code> 执行结束销毁。多次调用 <code>fn</code> 共享同一个 <code>count</code>，所以第一次打印 1，第二次打印 2。<br/><br/><strong>闭包不等于内存泄漏</strong>——它只是延长了外层变量的生命周期，这通常是设计如此。只有当闭包被长期持有且捕获了不再需要的大对象时，才可能造成真正的内存问题。`,
      followupLabel: '常见用途',
      followup: [
        { text: '私有变量：<code>createCounter()</code> 返回的函数独占 count，外部无法直接访问' },
        { text: '函数工厂：<code>makeAdder(5)</code> 返回一个记住 x=5 的加法函数' },
        { text: '模块封装：IIFE 返回对象，内部状态对外不可见' },
        { text: '为什么说"闭包保活"不是"内存泄漏"？（保活是设计意图，泄漏是意外引用）' }
      ],
      bonus: `判断是否闭包：看外层作用域有没有被返回出去、被外部长期引用，而不是看"变量有没有被用"。`
    },
    {
      title: '原型链：__proto__ / prototype / Object.prototype 分别指向谁？',
      tags: [
        { text: '原型链', color: 'purple' },
        { text: '__proto__', color: 'kw' },
        { text: 'prototype', color: 'kw' },
        { text: '易错点', color: 'blue' }
      ],
      opening: `<code>function Foo() {}; const a = new Foo()</code> 时：<code>a.__proto__ === Foo.prototype</code>，<code>Foo.prototype.__proto__ === Object.prototype</code>，<code>Object.prototype.__proto__ === null</code>。<br/><br/>最常见的易错点：<code>Foo.prototype.__proto__</code> 指向的是 <code>Object.prototype</code>，不是 <code>Object</code>。<code>Object</code> 是构造函数，<code>Object.prototype</code> 才是原型对象。`,
      followupLabel: '追问点',
      followup: [
        { text: '<code>Foo.prototype.__proto__</code> 指向 <code>Object</code> 还是 <code>Object.prototype</code>？（Object.prototype，这是高频易错）' },
        { text: '<code>instanceof</code> 的本质？（沿左侧原型链向上找，看能否找到右侧的 prototype）' },
        { text: '<code>instanceof</code> 为什么不适合跨 iframe？（不同全局环境的 Array.prototype 不是同一个对象）' }
      ],
      bonus: `记成一条链：实例 → 构造函数.prototype → Object.prototype → null。`
    },
    {
      title: 'new 执行时内部发生了什么？返回值规则是什么？',
      tags: [
        { text: 'new', color: 'kw' },
        { text: '返回值规则', color: 'blue' },
        { text: '原型链接', color: 'kw' }
      ],
      opening: `new 的四步：① 创建空对象；② 让空对象的 <code>__proto__</code> 指向构造函数的 <code>prototype</code>；③ 把构造函数的 <code>this</code> 绑定到新对象并执行；④ 若构造函数显式返回对象，则用它；否则返回新创建的实例。<br/><br/><strong>返回值规则是高频易错点：</strong>返回基本类型（数字、字符串等）会被忽略，仍返回实例；返回对象则会替换掉实例。`,
      followupLabel: '追问点',
      followup: [
        { text: '构造函数 return 1 会怎样？（基本类型被忽略，返回实例）' },
        { text: '构造函数 return {} 会怎样？（对象替换实例，new 的结果是这个 {}）' },
        { text: 'new 绑定和 bind 绑定哪个优先级高？（new 更高，会忽略 bind 的 this）' }
      ],
      bonus: `返回值规则一句话：返回对象就用它，返回基本类型就忽略。`
    },
    {
      title: '事件循环：同步 + Promise + setTimeout 输出顺序',
      tags: [
        { text: '事件循环', color: 'blue' },
        { text: '微任务', color: 'kw' },
        { text: '宏任务', color: 'kw' },
        { text: '综合题', color: 'red' }
      ],
      opening: `规则：先跑同步代码 → 清空微任务队列（微任务里新产生的微任务追加到队尾，同一轮清完）→ 执行下一个宏任务，循环。<br/><br/>微任务：<code>Promise.then</code>、<code>await</code> 后半段、<code>queueMicrotask</code>。宏任务：<code>setTimeout</code>、<code>setInterval</code>、I/O。<br/><br/>下面这道综合题是你的高频易错题：<pre><code class="language-javascript">console.log(1)
Promise.resolve().then(() => {
  console.log(2)
  Promise.resolve().then(() => console.log(3))
})
Promise.resolve().then(() => console.log(4))
console.log(5)</code></pre>输出：<code>1 5 2 4 3</code>。2 和 4 按入队顺序执行，2 里面新产生的 3 追加到队尾，所以最后。`,
      followupLabel: '易错变体',
      followup: [
        { text: '微任务里套 setTimeout，setTimeout 什么时候执行？（进宏任务队列，当前轮微任务清完后才轮到它）' },
        { text: 'async/await 版：<code>await Promise.resolve()</code> 后面的代码和外部 <code>Promise.then</code> 谁先执行？（谁先入队谁先执行，await 后半段后入队）' },
        { text: '微任务里新产生的微任务是"插队"还是"追加到队尾"？（追加到队尾）' }
      ],
      bonus: `做这类题的方法：先标出所有同步代码，再按入队顺序列出微任务，最后列宏任务。不要凭感觉。`
    },
    {
      title: 'async/await 与 Promise.then 的微任务入队顺序',
      tags: [
        { text: 'async/await', color: 'blue' },
        { text: '微任务顺序', color: 'kw' },
        { text: '易错题', color: 'red' }
      ],
      opening: `这是你最容易出错的一类题。核心规则：<code>await</code> 后半段和 <code>Promise.then</code> 都是微任务，谁先入队谁先执行。<br/><br/><pre><code class="language-javascript">async function foo() {
  console.log(1)
  await Promise.resolve()
  console.log(2)
}
Promise.resolve().then(() => console.log(3))
foo()
console.log(4)</code></pre>输出：<code>1 4 3 2</code>。<code>foo()</code> 同步打印 1，遇到 await 暂停；外部 <code>Promise.then</code> 先入队（打印 3）；await 后半段后入队（打印 2）。`,
      followupLabel: '追问点',
      followup: [
        { text: '<code>await 2</code>（普通值）和 <code>await Promise.resolve()</code> 行为一样吗？（一样，都会把后半段放进微任务）' },
        { text: '<code>async function foo(){ return 1 }</code> 返回什么？（Promise，值为 1）' },
        { text: '<code>async</code> 函数里 throw 会怎样？（返回 rejected Promise，可被 .catch 或 try/catch 捕获）' }
      ],
      bonus: `记住：<code>await</code> 不阻塞线程，只是暂停当前 async 函数，把后半段放进微任务队列。`
    },
    {
      title: 'Promise 链式调用：then / catch / finally 传播规则',
      tags: [
        { text: 'Promise链', color: 'teal' },
        { text: 'catch', color: 'kw' },
        { text: 'finally', color: 'kw' },
        { text: '状态传递', color: 'blue' }
      ],
      opening: `<code>then</code> 返回新 Promise：回调返回普通值 → 新 Promise fulfilled；回调返回 Promise → 等待并接管；回调抛错 → 新 Promise rejected。<code>catch</code> 捕获错误后如果正常返回，链条恢复成成功态。<code>finally</code> 负责收尾，默认不改变前面的结果，除非它自己抛错或返回 rejected Promise。<br/><br/>状态一旦从 pending 变成 fulfilled/rejected，就不可逆——<code>resolve(1); reject(2); resolve(3)</code> 只有第一个 resolve 生效。`,
      followupLabel: '高频易错',
      followup: [
        { text: '<code>resolve(1); reject(2)</code> 最终是什么状态？（fulfilled，状态不可逆）' },
        { text: '<code>catch</code> 里 return 2，后面的 then 能拿到 2 吗？（能，catch 正常返回后链条恢复成功态）' },
        { text: '<code>finally</code> 里 return 100 会改变结果吗？（不会，finally 不传值；但如果 return rejected Promise 会改变）' },
        { text: '<code>Promise.any</code> 全部失败时抛什么错？（AggregateError，errors 数组包含所有失败原因）' }
      ],
      bonus: `<code>Promise.all</code> 全成才成；<code>race</code> 谁先 settled 用谁；<code>allSettled</code> 等全部完成不短路；<code>any</code> 有一个成功就成功。`
    },
    {
      title: 'return await vs return Promise 有什么区别？',
      tags: [
        { text: 'return await', color: 'kw' },
        { text: 'try/catch', color: 'blue' },
        { text: '错误捕获', color: 'kw' }
      ],
      opening: `在 async 函数里，<code>return Promise</code> 是直接把 Promise 交出去，当前函数内部的 <code>try/catch</code> 通常接不住它后续的拒绝；<code>return await Promise</code> 会先等待 Promise 完成，再把结果返回，所以当前函数内部的 <code>try/catch</code> 能捕获到错误。<br/><br/>两者最终值通常一样，差别只在错误处理上。`,
      followupLabel: '追问点',
      followup: [
        { text: '什么场景下必须用 <code>return await</code>？（需要在当前函数内部 try/catch 捕获 async 错误时）' },
        { text: '<code>try { return Promise.reject("x") } catch(e) {}</code> 能捕获吗？（通常不能，Promise 被直接交出去了）' },
        { text: '<code>try { return await Promise.reject("x") } catch(e) {}</code> 能捕获吗？（能，await 会等待并把拒绝转成异常）' }
      ],
      bonus: `eslint 有 <code>no-return-await</code> 规则，但在 try/catch 里用 return await 是合理的例外。`
    },
    {
      title: '综合串题：this + 闭包 + 原型链一起考',
      tags: [
        { text: '综合题', color: 'red' },
        { text: 'this', color: 'kw' },
        { text: '闭包', color: 'kw' },
        { text: '原型链', color: 'purple' }
      ],
      opening: `这类题把多个知识点揉在一起，是面试高频。做题方法：先确定 this（看调用方式），再确定变量查找（看作用域链），最后确定属性查找（看原型链）。<br/><br/><pre><code class="language-javascript">function Foo() {
  this.name = 'foo'
  this.getName = () => this.name  // 箭头函数
}
Foo.prototype.getProtoName = function() {
  return this.name
}
const a = new Foo()
const b = { name: 'bar' }
console.log(a.getName.call(b))       // 'foo'（箭头函数 this 不变）
console.log(a.getProtoName.call(b))  // 'bar'（普通函数 this 被 call 改变）</code></pre>`,
      followupLabel: '解题要点',
      followup: [
        { text: '箭头函数的 this 在定义时就确定了，call/bind 无法改变它' },
        { text: '普通函数的 this 由调用方式决定，call 可以改变' },
        { text: '原型链上的方法和实例自身的方法，this 指向规则相同——看调用方式' }
      ],
      bonus: `遇到综合题先问自己：这个函数是箭头函数还是普通函数？是谁在调用它？`
    },
    // ── 以下为补充卡片 ──
    {
      title: '[补充] Proxy / Reflect — 元编程与响应式原理',
      tags: [
        { text: 'Proxy', color: 'purple' },
        { text: 'Reflect', color: 'kw' },
        { text: '元编程', color: 'kw' },
        { text: '响应式', color: 'kw' }
      ],
      opening: `Proxy 是 ES6 的元编程能力，允许拦截并自定义对象的基本操作（读取、赋值、删除、函数调用等）。<code>new Proxy(target, handler)</code>，handler 里定义各种 trap。最常用的三个 trap：<code>get</code>（拦截属性读取）、<code>set</code>（拦截属性赋值）、<code>deleteProperty</code>（拦截 delete）。Reflect 是与 Proxy trap 一一对应的静态方法集合，在 trap 内部用 <code>Reflect.get/set</code> 执行默认行为，保证语义正确。`,
      followupLabel: '追问点',
      followup: [
        { text: 'Proxy 和 Object.defineProperty 的核心区别？（defineProperty 只能劫持已有属性，无法感知新增/删除属性，也无法代理数组下标赋值；Proxy 代理整个对象，天然支持新增属性、数组变更、Map/Set 等）' },
        { text: 'Vue2 为什么要用 $set？（Object.defineProperty 无法检测新增属性，必须手动触发响应式；Vue3 用 Proxy 后不再需要 $set）' },
        { text: 'set trap 里为什么要用 Reflect.set 而不是直接 target[key] = value？（直接赋值可能触发原型链上的 setter，语义不一致；Reflect.set 保证和默认行为完全一致，且返回 boolean 表示是否成功）' },
        { text: 'Proxy 能代理原始值吗？（不能，Proxy 只能代理对象；Vue3 的 ref 对原始值的处理是包一层 { value: xxx } 对象再用 Proxy 代理）' },
        { text: 'Proxy 的性能比 Object.defineProperty 差吗？（Proxy 有一定开销，但现代引擎已大幅优化；Vue3 整体性能反而比 Vue2 好，因为 Proxy 避免了递归遍历所有属性做 defineProperty 的初始化开销）' }
      ],
      bonus: `说出"Proxy 是对象级别的代理，Object.defineProperty 是属性级别的劫持——这个粒度差异决定了 Proxy 能做到 defineProperty 做不到的事"，体现你理解两者的本质区别。即使主力是 React，这道题考的是 JS 语言能力，不是 Vue 知识。`
    }
  ]
});
