function myPromiseAll(promises) {
  // promise手写类都是先返回一个新的Promise
  return new Promise((resolve, reject) => {
    // 先处理边界
    if (!Array.isArray(promises)) {
      return reject(new TypeError("type error"));
    }
    // 开始处理promises
    if (promises.length === 0) return resolve([]);

    // count记录 res存储
    let count = 0;
    const res = [];
    // 注意索引，必须按顺序
    promises.forEach((item, index) => {
      // 兼容普通值
      Promise.resolve(item)
        .then((value) => {
          res[index] = value;
          count++;
          if (count === promises.length) return resolve(res);
        })
        .catch((err) => reject(err));
    });
  });
}

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("type error"));
    }
    if (promises.length === 0) return;

    promises.forEach((item) => {
      Promise.resolve(item)
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  });
}
