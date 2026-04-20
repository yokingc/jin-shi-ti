(window.TABS_DATA = window.TABS_DATA || []).push({
  icon: '🔷',
  name: 'TypeScript',
  moduleLabel: '🔷 模块 · TypeScript',
  cards: [
    {
      title: '[补充] 类型收窄与类型守卫',
      tags: [
        { text: 'TypeScript', color: 'blue' },
        { text: '类型收窄', color: 'kw' },
        { text: '类型守卫', color: 'kw' },
        { text: 'is', color: 'kw' }
      ],
      opening: `类型收窄（Type Narrowing）是 TypeScript 在控制流分析中自动缩小变量类型范围的能力。常见收窄方式：<code>typeof</code>（区分基本类型）、<code>instanceof</code>（区分类实例）、<code>in</code>（检查属性存在）、相等判断（<code>=== null</code>）、真值判断（排除 falsy）。类型守卫（Type Guard）是返回类型为 <code>param is Type</code> 的函数，让 TypeScript 在 if 分支里自动收窄类型。`,
      followupLabel: '追问点',
      followup: [
        { text: 'typeof 能区分哪些类型？（string/number/boolean/symbol/bigint/function/undefined/object——注意 typeof null === "object" 是历史遗留 bug）' },
        { text: 'in 收窄的典型场景？（联合类型中各成员有不同的 key，用 "key" in obj 区分：<code>if ("fly" in animal)</code>）' },
        { text: '自定义类型守卫怎么写？（<code>function isFish(pet: Fish | Bird): pet is Fish { return (pet as Fish).swim !== undefined }</code>）' },
        { text: 'never 类型在穷举检查中的作用？（switch 的 default 分支赋值给 never，如果联合类型新增成员但忘记处理，TypeScript 会报错）' },
        { text: 'as 断言和类型守卫的区别？（as 是强制告诉编译器类型，跳过检查，不安全；类型守卫是运行时检查 + 编译期收窄，安全）' }
      ],
      bonus: `说出"类型收窄的本质是 TypeScript 的控制流分析——它会追踪每个分支里变量的可能类型，自动缩小范围"，体现你理解 TS 的类型系统设计。补一句"能用类型守卫就不用 as，as 是逃生舱，用多了等于放弃了类型安全"。`
    },
    {
      title: '[补充] 泛型约束与实战用法',
      tags: [
        { text: 'TypeScript', color: 'blue' },
        { text: '泛型', color: 'kw' },
        { text: 'extends', color: 'kw' },
        { text: 'keyof', color: 'kw' }
      ],
      opening: `泛型让函数/类/接口支持多种类型而不丢失类型信息。<code>function identity&lt;T&gt;(arg: T): T</code> 比 <code>any</code> 更安全，因为返回值类型和入参类型保持一致。泛型约束用 <code>extends</code> 限制 T 的范围：<code>&lt;T extends object&gt;</code> 表示 T 必须是对象类型。<code>keyof T</code> 取对象类型的所有 key 组成联合类型，配合泛型可以实现类型安全的属性访问。`,
      followupLabel: '追问点',
      followup: [
        { text: '<code>function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K]</code> 这个签名说明了什么？（K 必须是 T 的 key，返回值类型是对应 value 的类型，完全类型安全的属性访问）' },
        { text: '泛型默认值怎么写？（<code>&lt;T = string&gt;</code>，不传类型参数时默认用 string）' },
        { text: '条件类型是什么？（<code>T extends U ? X : Y</code>，根据 T 是否满足 U 返回不同类型，常用于工具类型实现）' },
        { text: 'infer 关键字的作用？（在条件类型中推断类型变量：<code>type ReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : never</code>）' },
        { text: '泛型和 any 的本质区别？（any 放弃类型检查；泛型保留类型关系，调用时 TypeScript 自动推断具体类型，类型安全）' }
      ],
      bonus: `说出"泛型的核心价值是'延迟确定类型'——定义时不知道具体类型，使用时自动推断，既灵活又安全"，体现你理解设计意图。常用内置工具类型：<code>Partial&lt;T&gt;</code>、<code>Required&lt;T&gt;</code>、<code>Pick&lt;T, K&gt;</code>、<code>Omit&lt;T, K&gt;</code>、<code>ReturnType&lt;T&gt;</code>——能说出实现原理更好。`
    },
    {
      title: '[补充] unknown / any / never 与联合/交叉类型',
      tags: [
        { text: 'TypeScript', color: 'blue' },
        { text: 'unknown', color: 'kw' },
        { text: 'never', color: 'kw' },
        { text: '联合类型', color: 'kw' },
        { text: '交叉类型', color: 'kw' }
      ],
      opening: `<code>any</code>：关闭类型检查，可赋值给任何类型，也可接受任何类型，是类型系统的逃生舱。<code>unknown</code>：类型安全的 any，可接受任何类型赋值，但使用前必须收窄（typeof/instanceof/类型守卫），不能直接操作。<code>never</code>：不可能存在的类型，是所有类型的子类型，常用于穷举检查和表示"永远不会返回"的函数（抛异常/死循环）。联合类型 <code>A | B</code>：值是 A 或 B 之一。交叉类型 <code>A & B</code>：值同时满足 A 和 B，常用于合并对象类型。`,
      followupLabel: '追问点',
      followup: [
        { text: 'unknown 和 any 的使用场景区别？（外部输入/反序列化数据用 unknown，强制调用方做类型检查；any 用于迁移旧代码或确实无法确定类型的极少数场景）' },
        { text: 'never 在联合类型中的行为？（never 是联合类型的"零元素"：<code>string | never === string</code>，never 会被自动消除）' },
        { text: '联合类型和交叉类型对基本类型的行为？（<code>string & number</code> 是 never，因为没有值能同时是 string 和 number）' },
        { text: '可辨识联合（Discriminated Union）是什么？（联合类型的每个成员有相同的字面量类型字段作为"标签"，如 <code>type Shape = { kind: "circle"; r: number } | { kind: "rect"; w: number }</code>，用 kind 收窄）' },
        { text: 'void 和 never 的区别？（void 表示函数没有返回值（实际返回 undefined）；never 表示函数永远不会正常返回（抛异常或死循环））' }
      ],
      bonus: `说出"unknown 是 any 的类型安全替代品——收到不确定的数据时用 unknown 而不是 any，强制自己在使用前做类型检查"，体现你有工程意识。补一句"never 的穷举检查是 TypeScript 最实用的技巧之一，新增联合类型成员时编译器会自动提醒你处理所有分支"。`
    }
  ]
});
