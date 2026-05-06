// new 1.新对象 2.指向原型对象 3.绑定this 4.处理返回
function myNew(Fn, ...arg) {
  const obj = {};
  boj.__proto__ = Fn.protoType;
  // 等价于Object.setPrototypeOf(obj, Constructor.prototype) 还有getPrototypeOf
  const result = Fn.apply(this, arg);
  return result instanceof Object ? result : obj;
}

// instanceOf 沿着左侧原型链向上找，找到了右侧的原型对象，则为true
function myInstanceOf(left, right) {
  const proto = left.__proto__;
  while (proto) {
    if (proto === right.prototype) return true;
    proto = proto.__proto__;
  }
  return false;
}
