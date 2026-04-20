(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '✍️',
  name: '手写题',
  moduleLabel: '✍️ 模块七 · 手写代码题',
  cards: [
    {
      title: '手写 Promise.all',
      tags: [
        { text: 'Promise', color: 'kw' },
        { text: '并发', color: 'blue' },
        { text: '计数器', color: 'kw' },
        { text: '按序返回', color: 'kw' }
      ],
      opening: `返回一个新 Promise，遍历输入项用 <code>Promise.resolve</code> 统一包装（兼容普通值）；每个成功结果按原索引写入结果数组，用计数器统计完成数；全部完成时 resolve 结果数组；任意一个失败立即 reject。注意：reject 后底层 Promise 仍会继续执行，只是不再关心结果。<br/><br/><strong>加分：</strong>说出"即使整体 reject，底层 Promise 仍在执行，只是结果被忽略"体现你理解 Promise 的不可取消性。补一句"原生 Promise.all 支持任意可迭代对象，不只是数组"。`,
      code: `function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'))
    }
    if (promises.length === 0) return resolve([])

    const result = []
    let count = 0

    promises.forEach((item, index) => {
      Promise.resolve(item).then((value) => {
        result[index] = value   // 按原索引存，保证顺序
        count++
        if (count === promises.length) resolve(result)
      }).catch(err => reject(err))
    })
  })
}`,
      pitfall: [
        `用 <code>count++</code> 而不是 <code>result.length</code> 判断完成，因为数组赋值是按索引跳跃的，length 不可靠`,
        `Promise 内部再调用 <code>Promise.reject()</code> 外层不会捕获，必须直接调用外层的 <code>reject</code>`,
        `<code>resolve/reject</code> 后要加 <code>return</code>，防止后续代码继续执行`,
        `空数组要单独处理，否则计数器永远不会触发 resolve，Promise 一直 pending`
      ]
    },
    {
      title: '手写防抖（debounce）',
      tags: [
        { text: '防抖', color: 'kw' },
        { text: '定时器', color: 'kw' },
        { text: '闭包', color: 'kw' },
        { text: '立即执行版', color: 'teal' }
      ],
      opening: `防抖的核心是：事件触发后等待 delay 毫秒，期间若再次触发则重置计时器，只有等到"安静"了 delay 毫秒才真正执行。用闭包保存 timer，每次调用先清除旧定时器再设新的。常见场景：搜索框输入、表单校验、窗口 resize。<br/><br/><strong>加分：</strong>说出"返回的函数必须是普通函数而非箭头函数，否则 this 会被词法绑定到外层作用域"。补一句"lodash 的 debounce 还支持 leading/trailing 选项，可以同时控制首次和末次是否触发"。`,
      code: `// 基础版
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 立即执行版（第一次立即触发，之后冷却）
function debounceImmediate(fn, delay) {
  let timer = null
  return function (...args) {
    const callNow = !timer   // timer 为空说明是冷却后的第一次
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null           // 冷却结束，重置
    }, delay)
    if (callNow) fn.apply(this, args)
  }
}`,
      pitfall: [
        `忘记用 <code>fn.apply(this, args)</code>，直接 <code>fn()</code> 会丢失 this 上下文和参数`,
        `用箭头函数返回时 this 会绑定到外层，导致 this 指向错误——返回的函数必须是普通函数`,
        `立即执行版中 <code>timer = null</code> 要在 setTimeout 回调里重置，不能在外面`,
        `防抖 vs 节流混淆：防抖是"最后一次生效"，节流是"固定频率生效"`
      ]
    }
    ,{
      title: '手写限并发调度器 promiseLimit',
      tags: [
        { text: 'Promise', color: 'kw' },
        { text: '并发控制', color: 'blue' },
        { text: '队列', color: 'kw' },
        { text: '调度器', color: 'teal' }
      ],
      opening: `核心思路：维护一个"运行中"计数器和一个等待队列。每次 add 时，若当前运行数 < limit 则立即执行；否则把任务推入队列。每个任务完成后，从队列取出下一个继续执行。<br/><br/><strong>加分：</strong>说出"这是一个典型的生产者-消费者模型，队列起到缓冲作用"。补一句"实际项目中可用 p-limit 库，原理完全一致"。`,
      code: `class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.running = 0
    this.queue = []
  }

  add(task) {
    return new Promise((resolve, reject) => {
      const run = () => {
        this.running++
        task().then(resolve, reject).finally(() => {
          this.running--
          if (this.queue.length > 0) {
            this.queue.shift()()
          }
        })
      }
      if (this.running < this.limit) {
        run()
      } else {
        this.queue.push(run)
      }
    })
  }
}

// 使用示例
const scheduler = new Scheduler(2)
const addTask = (time, val) =>
  scheduler.add(() => new Promise(r => setTimeout(() => { r(val) }, time)))`,
      pitfall: [
        `忘记在任务完成后 <code>this.running--</code>，导致并发槽永远不释放`,
        `<code>queue.shift()()</code> 要在 <code>running--</code> 之后调用，否则并发数会超限`,
        `task 本身是返回 Promise 的函数，不是 Promise——调用时要加 <code>()</code>`,
        `用 <code>finally</code> 而非 <code>then</code> 处理完成逻辑，保证 reject 时也能释放槽位`
      ]
    }
    ,{
      title: '手写 call / apply / bind',
      tags: [
        { text: 'this', color: 'kw' },
        { text: '原型链', color: 'blue' },
        { text: 'Function.prototype', color: 'kw' }
      ],
      opening: `三者都是改变 this 指向。call/apply 立即执行，区别只是参数形式（逐个 vs 数组）；bind 返回新函数，不立即执行。实现思路：把函数挂到目标对象上作为方法调用，借助对象方法调用时 this 指向对象的特性，调用完再删除。<br/><br/><strong>加分：</strong>说出"用 Symbol 作为临时属性名，避免覆盖对象已有属性"。补一句"bind 返回的函数作为构造函数时，绑定的 this 会被忽略，new 优先级更高"。`,
      code: `Function.prototype.myCall = function(ctx, ...args) {
  ctx = ctx == null ? globalThis : Object(ctx)
  const fn = Symbol('fn')
  ctx[fn] = this
  const result = ctx[fn](...args)
  delete ctx[fn]
  return result
}

Function.prototype.myApply = function(ctx, args = []) {
  ctx = ctx == null ? globalThis : Object(ctx)
  const fn = Symbol('fn')
  ctx[fn] = this
  const result = ctx[fn](...args)
  delete ctx[fn]
  return result
}

Function.prototype.myBind = function(ctx, ...outerArgs) {
  const self = this
  return function(...innerArgs) {
    // new 调用时 this 是实例，忽略绑定的 ctx
    if (this instanceof self) {
      return new self(...outerArgs, ...innerArgs)
    }
    return self.myCall(ctx, ...outerArgs, ...innerArgs)
  }
}`,
      pitfall: [
        `ctx 为 null/undefined 时要指向全局对象（严格模式下保持 null，非严格模式指向 globalThis）`,
        `用 <code>Symbol</code> 作临时 key，避免覆盖对象已有同名属性`,
        `bind 返回的函数被 new 调用时，绑定的 this 失效，需要用 <code>this instanceof self</code> 判断`,
        `apply 的第二个参数可以不传，要给默认值 <code>[]</code> 防止展开报错`
      ]
    }
    ,{
      title: '手写 new / instanceof / Object.create',
      tags: [
        { text: 'new', color: 'kw' },
        { text: 'instanceof', color: 'kw' },
        { text: '原型链', color: 'blue' },
        { text: 'Object.create', color: 'teal' }
      ],
      opening: `new 的四步：创建空对象 → 原型链接 → 执行构造函数（绑定 this）→ 若构造函数返回对象则用它，否则返回新对象。instanceof 沿原型链向上查找，看 constructor.prototype 是否出现在链上。Object.create 创建以指定对象为原型的新对象。<br/><br/><strong>加分：</strong>说出"构造函数返回基本类型时被忽略，返回对象时会替换掉 new 创建的实例"。`,
      code: `// 手写 new
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype)
  const result = Constructor.apply(obj, args)
  return result instanceof Object ? result : obj
}

// 手写 instanceof
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  while (proto !== null) {
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// 手写 Object.create
function myCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}`,
      pitfall: [
        `new 最后要判断构造函数返回值：返回对象则用它，返回基本类型则用 obj`,
        `instanceof 要用 <code>Object.getPrototypeOf</code> 而非 <code>.__proto__</code>（后者非标准）`,
        `instanceof 对基本类型无效：<code>1 instanceof Number</code> 为 false`,
        `Object.create(null) 创建无原型对象，常用于纯字典场景，不能用 hasOwnProperty`
      ]
    }
    ,{
      title: '手写节流 throttle（含完美版）',
      tags: [
        { text: '节流', color: 'kw' },
        { text: '定时器', color: 'kw' },
        { text: '时间戳', color: 'blue' },
        { text: '完美版', color: 'teal' }
      ],
      opening: `节流保证函数在固定时间间隔内最多执行一次。时间戳版：首次立即触发，停止后不再触发尾部；定时器版：首次延迟触发，停止后会触发最后一次。完美版结合两者：首次立即触发，停止后也触发最后一次。<br/><br/><strong>加分：</strong>说出"时间戳版和定时器版各有缺陷，完美版用两者结合解决首尾都触发的需求"。`,
      code: `// 时间戳版（首次立即，停止后不触发）
function throttleTimestamp(fn, wait) {
  let last = 0
  return function(...args) {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn.apply(this, args)
    }
  }
}

// 定时器版（首次延迟，停止后触发一次）
function throttleTimer(fn, wait) {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 完美版（首次立即 + 停止后触发尾部）
function throttle(fn, wait) {
  let last = 0, timer = null
  return function(...args) {
    const now = Date.now()
    const remaining = wait - (now - last)
    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null }
      last = now
      fn.apply(this, args)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = Date.now()
        timer = null
        fn.apply(this, args)
      }, remaining)
    }
  }
}`,
      pitfall: [
        `时间戳版停止触发后不会执行最后一次，定时器版首次触发有延迟——各有取舍`,
        `完美版中 remaining 是剩余等待时间，不是固定 wait，保证尾部触发时机准确`,
        `防抖 vs 节流：防抖是"最后一次生效"，节流是"固定频率生效"，场景不同`,
        `scroll/mousemove 用节流；input 搜索用防抖——面试必问区别`
      ]
    }
    ,{
      title: '手写数组扁平化 flatten',
      tags: [
        { text: 'flatten', color: 'kw' },
        { text: '递归', color: 'blue' },
        { text: '迭代', color: 'kw' },
        { text: '深度控制', color: 'teal' }
      ],
      opening: `扁平化就是把嵌套数组"拍平"。递归版最直观；reduce 版更函数式；迭代版（栈）避免递归栈溢出；原生 flat(Infinity) 最简洁。面试要求手写时优先写递归+深度控制版。<br/><br/><strong>加分：</strong>说出"递归在超深嵌套时有栈溢出风险，迭代版用显式栈模拟，更安全"。`,
      code: `// 递归版（支持深度控制）
function flatten(arr, depth = Infinity) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flatten(item, depth - 1))
    } else {
      acc.push(item)
    }
    return acc
  }, [])
}

// 迭代版（栈，避免递归溢出）
function flattenIterative(arr) {
  const stack = [...arr]
  const result = []
  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      stack.push(...item)   // 展开后重新入栈
    } else {
      result.unshift(item)  // 保持顺序
    }
  }
  return result
}

// 原生一行
// arr.flat(Infinity)`,
      pitfall: [
        `迭代版用 <code>stack.pop()</code> + <code>result.unshift</code> 保持顺序，或改用 <code>shift</code> + <code>push</code>`,
        `递归版 depth 要逐层递减，不能直接传原始 depth`,
        `<code>Array.isArray</code> 比 <code>instanceof Array</code> 更可靠（跨 iframe 场景）`,
        `原生 <code>flat</code> 不修改原数组，返回新数组——手写版也应如此`
      ]
    }
    ,{
      title: '手写数组去重 unique',
      tags: [
        { text: '去重', color: 'kw' },
        { text: 'Set', color: 'blue' },
        { text: 'Map', color: 'kw' },
        { text: '对象去重', color: 'teal' }
      ],
      opening: `基础去重用 Set 一行搞定。面试考点在于：能否处理对象去重（需指定 key）、NaN 去重（Set 能正确处理）、以及各方案的时间复杂度对比。<br/><br/><strong>加分：</strong>说出"Set 内部用 SameValueZero 算法，NaN === NaN 为 true，所以 Set 能正确去重 NaN；而 indexOf 用 ===，无法去重 NaN"。`,
      code: `// 基础版：Set
const unique = arr => [...new Set(arr)]

// 兼容版：filter + indexOf
function uniqueFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}

// 对象数组按 key 去重
function uniqueByKey(arr, key) {
  const seen = new Map()
  return arr.filter(item => {
    const k = item[key]
    if (seen.has(k)) return false
    seen.set(k, true)
    return true
  })
}

// NaN 去重验证
// [...new Set([NaN, NaN, 1, 1])]  => [NaN, 1]  ✅
// [NaN, NaN].filter((v,i,a) => a.indexOf(v)===i)  => [NaN, NaN]  ❌`,
      pitfall: [
        `<code>indexOf</code> 用 <code>===</code> 比较，无法去重 NaN；Set 用 SameValueZero，可以去重 NaN`,
        `对象去重不能直接用 Set（引用不同即不同），需按业务 key 用 Map 去重`,
        `<code>[...new Set(arr)]</code> 不改变原数组，返回新数组`,
        `去重后顺序：Set 和 filter 版都保留首次出现的顺序`
      ]
    }
    ,{
      title: '手写发布订阅 EventEmitter',
      tags: [
        { text: '发布订阅', color: 'kw' },
        { text: 'EventEmitter', color: 'blue' },
        { text: 'once', color: 'kw' },
        { text: '设计模式', color: 'teal' }
      ],
      opening: `发布订阅模式：事件中心（EventEmitter）维护事件名到回调列表的映射。on 注册，emit 触发，off 移除，once 只触发一次。与观察者模式的区别：发布订阅有中间的事件中心解耦，观察者是直接依赖。<br/><br/><strong>加分：</strong>说出"once 的实现是包一层 wrapper，触发后先 off 掉 wrapper 再调用原回调，注意 off 时要移除 wrapper 而非原函数"。`,
      code: `class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(listener)
    return this
  }

  off(event, listener) {
    if (!this.events[event]) return this
    this.events[event] = this.events[event].filter(fn => fn !== listener && fn._origin !== listener)
    return this
  }

  emit(event, ...args) {
    if (!this.events[event]) return false
    this.events[event].forEach(fn => fn(...args))
    return true
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(event, wrapper)
    }
    wrapper._origin = listener   // 让 off(原函数) 也能移除
    this.on(event, wrapper)
    return this
  }
}`,
      pitfall: [
        `once 注册的是 wrapper，off 时传原函数无法匹配——需在 wrapper 上挂 <code>_origin</code> 属性`,
        `emit 时要先复制一份监听器列表，防止回调内部 off 导致遍历错乱`,
        `off 不传 listener 时可以清空整个事件的所有监听器（看业务需求）`,
        `发布订阅 vs 观察者：前者有事件中心解耦，后者 Subject 直接持有 Observer 引用`
      ]
    }
    ,{
      title: '手写观察者模式',
      tags: [
        { text: '观察者', color: 'kw' },
        { text: 'Subject', color: 'blue' },
        { text: 'Observer', color: 'kw' },
        { text: '设计模式', color: 'teal' }
      ],
      opening: `观察者模式：Subject（被观察者）维护 Observer 列表，状态变化时主动通知所有观察者。与发布订阅的核心区别：观察者模式中 Subject 直接持有 Observer 引用，是紧耦合；发布订阅通过事件中心解耦，是松耦合。<br/><br/><strong>加分：</strong>说出"Vue 2 的响应式系统就是观察者模式：Dep 是 Subject，Watcher 是 Observer，数据变化时 Dep.notify() 通知所有 Watcher 更新"。`,
      code: `class Observer {
  constructor(name) {
    this.name = name
  }
  update(state) {
    console.log(\`\${this.name} 收到通知：\${state}\`)
  }
}

class Subject {
  constructor() {
    this.observers = []
    this.state = null
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(ob => ob !== observer)
  }

  setState(state) {
    this.state = state
    this.notify()
  }

  notify() {
    this.observers.forEach(ob => ob.update(this.state))
  }
}

// 使用
const subject = new Subject()
const ob1 = new Observer('观察者A')
const ob2 = new Observer('观察者B')
subject.subscribe(ob1)
subject.subscribe(ob2)
subject.setState('状态更新了')`,
      pitfall: [
        `观察者模式是 Subject 主动推送，发布订阅是订阅者被动接收——推拉模型不同`,
        `notify 时遍历的是快照还是实时列表？回调内 unsubscribe 可能导致遍历跳过`,
        `Vue 2 中 Dep = Subject，Watcher = Observer，这是面试高频关联点`,
        `观察者模式耦合度高（Subject 知道 Observer），发布订阅完全解耦`
      ]
    }
    ,{
      title: '手写数组转树 / 树转数组',
      tags: [
        { text: '树结构', color: 'kw' },
        { text: 'Map', color: 'blue' },
        { text: 'BFS', color: 'kw' },
        { text: '递归', color: 'teal' }
      ],
      opening: `数组转树：用 Map 存 id→节点，一次遍历建立父子关系，O(n) 时间。树转数组：BFS/DFS 遍历，把每个节点的 children 展开成扁平列表。核心是 Map 的妙用，避免 O(n²) 的嵌套查找。<br/><br/><strong>加分：</strong>说出"两次遍历版（先建 Map，再建关系）比递归查找版性能好，从 O(n²) 降到 O(n)"。`,
      code: `// 数组转树 O(n)
function arrayToTree(arr) {
  const map = {}
  const roots = []

  arr.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })

  arr.forEach(item => {
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(map[item.id])
    } else {
      if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id])
      }
    }
  })

  return roots
}

// 树转数组（BFS）
function treeToArray(tree) {
  const result = []
  const queue = [...tree]
  while (queue.length) {
    const node = queue.shift()
    const { children = [], ...rest } = node
    result.push(rest)
    queue.push(...children)
  }
  return result
}`,
      pitfall: [
        `先建 Map 再建关系，不要在一次遍历里既建 Map 又建关系（顺序依赖问题）`,
        `parentId 为 null 或 undefined 都可能是根节点，要兼容两种情况`,
        `树转数组时要把 children 从节点中剔除，否则结果里还有嵌套`,
        `BFS 用队列（shift），DFS 用栈（pop）——shift 是 O(n)，大数据量可用双端队列优化`
      ]
    }
    ,{
      title: '手写 LRU 缓存',
      tags: [
        { text: 'LRU', color: 'kw' },
        { text: 'Map', color: 'blue' },
        { text: '双向链表', color: 'kw' },
        { text: 'O(1)', color: 'teal' }
      ],
      opening: `LRU（最近最少使用）缓存：容量满时淘汰最久未使用的项。JS 中 Map 天然保持插入顺序，可以用它模拟双向链表：get/put 时把访问的 key 删掉再重新插入（移到末尾），淘汰时删除 Map 的第一个 key（最久未用）。<br/><br/><strong>加分：</strong>说出"Map 的迭代顺序是插入顺序，<code>map.keys().next().value</code> 拿到最老的 key，这是 O(1) 淘汰的关键"。`,
      code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()
  }

  get(key) {
    if (!this.map.has(key)) return -1
    const val = this.map.get(key)
    // 移到末尾（最近使用）
    this.map.delete(key)
    this.map.set(key, val)
    return val
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    } else if (this.map.size >= this.capacity) {
      // 删除最久未使用（Map 第一个 key）
      this.map.delete(this.map.keys().next().value)
    }
    this.map.set(key, value)
  }
}`,
      pitfall: [
        `get 时也要"移到末尾"，不只是 put——访问即更新使用时间`,
        `<code>map.keys().next().value</code> 拿到最老 key，这依赖 Map 的插入顺序特性`,
        `put 时若 key 已存在，要先 delete 再 set，否则顺序不会更新`,
        `容量判断用 <code>map.size >= capacity</code>，在插入新 key 之前淘汰`
      ]
    }
    ,{
      title: '综合手写：模板字符串 / retry / 请求缓存 / 洋葱模型',
      tags: [
        { text: '模板字符串', color: 'kw' },
        { text: 'retry', color: 'blue' },
        { text: '请求缓存', color: 'kw' },
        { text: '洋葱模型', color: 'teal' }
      ],
      opening: `四道综合题各考一个核心点：模板字符串考正则替换；retry 考递归+Promise；请求缓存考 Map 存 Promise（防并发重复请求）；洋葱模型考 compose/中间件链。<br/><br/><strong>加分：</strong>洋葱模型说出"Koa 的 compose 就是这个实现，next() 调用下一个中间件，await next() 后的代码在内层中间件全部执行完后才运行"。`,
      code: `// 1. 模板字符串解析
function render(template, data) {
  return template.replace(/\\{\\{\\s*(\\w+)\\s*\\}\\}/g, (_, key) => {
    return data[key] !== undefined ? data[key] : ''
  })
}
// render('Hello {{name}}!', { name: 'World' }) => 'Hello World!'

// 2. retry（失败重试 n 次）
function retry(fn, times) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      fn().then(resolve).catch(err => {
        if (times-- > 0) attempt()
        else reject(err)
      })
    }
    attempt()
  })
}

// 3. 请求缓存（防并发重复请求）
const cache = new Map()
function fetchWithCache(url) {
  if (cache.has(url)) return cache.get(url)
  const promise = fetch(url).finally(() => cache.delete(url))
  cache.set(url, promise)
  return promise
}

// 4. 洋葱模型 compose
function compose(middlewares) {
  return function(ctx) {
    let index = -1
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      const fn = middlewares[i]
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
}`,
      pitfall: [
        `模板字符串正则要用 <code>g</code> 标志替换所有匹配，不加 g 只替换第一个`,
        `retry 中 <code>times--</code> 是先用后减，若想重试 n 次要注意初始值`,
        `请求缓存存的是 Promise 而非结果，这样并发请求共享同一个 Promise，不会重复发请求`,
        `洋葱模型中 next 只能调用一次，多次调用要抛错；不调用则后续中间件不执行`
      ]
    }
  ]
});
