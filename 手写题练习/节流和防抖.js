function myDebounce(fn, delay) {
  // 核心是等待delay才允许触发，触发后重置delay
  // 进阶：第一次调用，引入callNow，和timer取反，重置时设置空转的回调函数来冷却
  let timer = null;

  return function (...arg) {
    //重置timer
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}

function call(num) {
  console.log(num);
}

const timer1 = myDebounce(call, 1000);

// 节流保证一段时间内只触发一次，就写时间戳版 延迟版本是停止了之后才触发
function myThrottleTimer(fn, wait) {
  let last = 0;
  return function (...arg) {
    const now = new Date();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, arg);
    }
  };
}
