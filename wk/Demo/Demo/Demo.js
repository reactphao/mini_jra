// 防抖

function debounce(fn, delay = 200) {
  let time;
  return function (arg) {
    let context = this;
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.apply(context, ...arg);
    }, delay);
  };
}

// 节流函数
function throttle(fn, delay) {
  let lastTime = 0;
  return function (arg) {
    let context = this;
    let nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      fn.apply(context, arg);
      lastTime = nowTime;
    }
  };
}

// 手写useState

let index = 0;
let initValueBox = [];
function useState(initValue) {
  let currentIndex = index;
  let currentValue = initValueBox[currentIndex] || initValue;
  function setState(newValue) {
    initValueBox[currentIndex] = newValue;
  }
  index++;
  return [initValueBox[currentIndex], setState];
}

// 手写useEffect

let index1 = 0;
let lastDepsBoxs = [];
let lastCallBackFn = [];

function useEffect(fn, deps) {
  let lastDeps = lastDepsBoxs[index];
  let flag =
    !lastDeps || !deps || deps.some((dep, index) => dep !== lastDeps[index]);
  if (flag) {
    lastDepsBoxs[index] = deps;
    lastCallBackFn[index] && lastCallBackFn[index]();
    lastCallBackFn[index] = fn();
  }
  index1++;
}

// 手写冒泡排序 O(n^2)
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - i; i++) {
    for (let j = 1; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

// 手写冒泡2

function Sort(arr) {
  let temp;
  let flag = true;
  let len = arr.length;
  for (let i = 0; i < len && flag; i++) {
    flag = false;
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        flag = true;
      }
    }
  }
  return arr;
}

// 手写URL取对象
function getUrlParmas(url) {
  let urlObj = {};
  let parmas = url.split("?");
  let paramsChild = parmas.split("&");
  paramsChild.forEach((item) => {
    let typeArr = item.split("=");
    urlObj[typeArr[0]] = typeArr[1];
  });
  return urlObj;
}

// 手写sleep 函数

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// 多维数组 取交集 或者 去重

function flat(obj, keys = "", res = {}) {
  Object.entries(obj).forEach(({ key, value }) => {
    if (typeof value === "object") {
      return flat(value, keys + key + ".", res);
    }
    return (res[keys + key] = value);
  });
}
