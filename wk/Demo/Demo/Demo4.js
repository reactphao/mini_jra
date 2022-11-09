// 防抖函数
function debounce(fn, delay) {
  let time;
  let context = this;
  return function (arg) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.apply(context, ...arg);
    }, delay);
  };

  //节流
  function throttle(fn, delay) {
    let lastTime;
    let context = this;
    return function (arg) {
      let newTime = new Date().now;
      if (newTime - lastTime < delay) return;
      setTimeout(() => {
        fn.apply(context, ...arg);
      }, delay);
      lastTime = newTime;
    };
  }
}

// sleep 函数

// 傻瓜版本 setTimeout

function sleep(fn, delay) {
  setTimeout(() => {
    fn();
  }, delay);
}

sleep(fn, 1000);

// 利用promise padding 状态下实现

function sleep1(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

sleep1(1000).then(fn());

//解析URL
function getSearchUrl(params) {
  if (!params || typeof params !== "string") return;
  let urlParmas = params.split("?");
  let urlChild = urlParmas.split("&");
  let obj = {};
  urlChild.forEach((item) => {
    let wordSum = item.split("=");
    obj[wordSum[0]] = wordSum[1];
  });
  return obj;
}

// useState 原理

function _useState() {
  let index = 0;
  let initValueBox = [];
  function useState(initValue) {
    let currentIndex = index;
    initValueBox[currentIndex] = initValueBox[currentIndex] || initValue;
    const setState = (newValue) => {
      initValueBox[currentIndex] = newValue;
      render();
    };
    index++;
    return [initValueBox[currentIndex], setState];
  }
}

// useEffect 原理手写

function _useEffect() {
  let index = 0;
  let lastDepsBox = [];
  let lastCallBackFn = [];
  return function useEffect(fn, deps) {
    const lastDeps = lastDepsBox[index];
    const flag =
      !lastDeps || !deps || deps.some((dep, index) => dep !== lastDeps[index]);
    if (flag) {
      lastDepsBox[index] = deps;
      lastCallBackFn[index] && lastCallBackFn[index]();
      lastCallBackFn[index] = fn();
    }
    index++;
  };
}

/*
*。 排序。
   数据 //。华东 华南 华北 华西 1 2 3
*/

function citySort(params) {
  const regionWeight = new Map([
    ["东", 1],
    ["南", 2],
    ["西", 3],
    ["北", 4],
  ]);

  return params.sotr((item1, item2) => {
    const item1Weight = regionWeight.get(item1[1]);
    const item2Weight = regionWeight.get(item2[1]);
    const item1Num = Number(item1.slice(2));
    const item2Num = Number(item2.slice(2));
    return item1Weight - item2Weight || item1Num - item2Num;
  });
}

// 冒泡排序
function bubblSort(arr) {
  // O(n^2)
  let len = arr.length;
  for (let i = 0; i++; i < len) {
    for (let j = 1; j++; j < len - i) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function sort(arr) {
  let temp;
  let flag = 1;
  let len = arr.length;
  for (let i = 0; i <= len - 1 && flag === 1; i++) {
    flga = 0;
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        flag = 1;
      }
    }
  }
  return arr;
}

// 扁平化
// 普通对象扁平化
function flat(item, preKey = "", res = {}) {
  Object.entries(item).forEach(([key, val]) => {
    if (val && typeof val === "object") {
      flat(val, preKey + key + ".", res);
    } else {
      res[preKey + key] = val;
    }
  });
  return res;
}

// 测试
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(flat(source));

// 数组扁平化
const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 0]]]]];

function flatArr(arr) {
  return arr.reduce((t, v) => {
    return t.concat((Array.isArray(v) && flatArr(v)) || v);
  }, []);
}
// 复杂对象扁平化
const input = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
};

/**
 * {
 *  a: 1,
 * b[0]:1,
 * b[1]: 2,
 * b[2].c:true
 * b[3]: 3
 * }
 */
function depsFlat(obj = {}, keys = "", res = {}) {
  if (!obj) return;
  // [key, value]
  Object.entries(obj).forEarch(([key, value]) => {
    if (Array.isArray(value)) {
      let temp = (Array.isArray(obj) && `${keys}[${key}]`) || `${keys}${key}`;
      depsFlat(value, temp, res);
    } else if (typeof value === "object") {
      let temp = (Array.isArray(obj) && `${keys}[${key}].`) || `${keys}${key}.`;
      depsFlat(value, temp, res);
    } else {
      let temp = (Array.isArray(obj) && `${keys}[${key}]`) || `${keys}${key}`;
      res[temp] = value;
    }
    return res;
  });
}

// 深拷贝

function deepClone(target) {
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  if (typeof target !== "object") return target;
  const cloneTarget = new target.constructor();
  for (const key in target) {
    cloneTarget[key] = deepClone(target[key]);
  }
  return cloneTarget;
}

// 如何 判断传入的函数是否 是异步的
const hasAsync = (fn) => {
  return fn.constructor.name === "asyncFunction";
};

//  观察者模式

class Observer {
  constructor(name) {
    this.name = name;
  }
  upData({ type, info }) {
    if (type) {
      this.goto(info);
    }
  }
  goto(info) {
    console.log(`执行${info}`);
  }
}

class Subject {
  constructor() {
    this.observerList = [];
  }
  addObserver(item) {
    this.observerList.push(item);
  }

  nofiy(data) {
    this.observerList.forEach((item) => item.upData(data));
  }
}
const subject = new Subject();
const stu1 = new Observer("1");
const stu2 = new Observer("2");
subject.addObserver(stu1);
subject.addObserver(stu2);

// 发布订阅模式
class PubSub {
  constructor() {
    this.events = {};
  }
  subscribe(type, fn) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(fn);
  }
  publish(type, ...arg) {
    if (this.events[type]) {
      this.events[type].forEach((fn) => fn(...arg));
    }
  }
  unsubscribe(type, fn) {
    if (this.events[type]) {
      let fnIndex = this.events[type].findIndex((e) => e === fn);
      fnIndex != -1 && this.events[type].splice(cbIndex, 1);
    }
    if (this.events[type].length === 0) {
      delete this.events[type];
    }
  }
  unsubscribeAll(type) {
    this.events[type] && delete this.events[type];
  }
}

// 楼梯阶乘 0 1 2 3 4 5 6

// 斐波拉契数列 || 兔子数列  1、1、2、3、5、8、13、21、34 基本都是求第几位是什么

// 接口最大并发数

// 重复请求次数

// promise 的封装
