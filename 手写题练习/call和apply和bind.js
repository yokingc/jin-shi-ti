Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx == null ? globalThis : Object(ctx); // 处理边界，为空指向全局
  const fn = Symbol("fn"); // 避免重名
  ctx[fn] = this; // 将this绑定在目标对象上
  const result = ctx[fn](...args); // 调用并获得结果
  delete ctx[fn]; // 删除临时的
  return result;
};

Function.prototype.myApply = function (ctx, args = []) {
  ctx = ctx == null ? globalThis : Object(ctx);
  const fn = Symbol("fn");
  ctx[fn] = this;
  const result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};

// function Person(name) {
//   this.name = name
// }

// const BoundPerson = Person.bind({ x: 1 })
// const p = new BoundPerson('Tom')
// 这里真正的 this 应该是新创建的实例 p，而不是 { x: 1 }。

// 先保存原函数，返回一个新函数；普通调用时把原函数的 this 绑到 ctx 上并拼接参数，new 调用时忽略 ctx，转而用原函数当构造函数执行。
Function.prototype.myBind = function (ctx, ...outerArgs) {
  const self = this;

  function boundFn(...innerArgs) {
    if (this instanceof boundFn) {
      return new self(...outerArgs, ...innerArgs);
    }
    return self.call(ctx, ...outerArgs, ...innerArgs);
  }

  boundFn.prototype = Object.create(self.prototype);
  return boundFn;
};
