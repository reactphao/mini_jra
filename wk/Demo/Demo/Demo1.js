/*
 *   手写原理实现 useState
 *   利用闭包的特性
 *   不能在if else 或者循环里面注册  会破坏hook的查找链表
 *
 * */

let index = 0;
let initValueBox = [];

function useState(initValue) {
  index++;
  let currentIndex = index;
  initValueBox[currentIndex] = initValueBox[currentIndex] || initValue;
  const setValue = (changeValue) => {
    initValueBox[currentIndex] = changeValue;
    render();
  };
  return [initValueBox[currentIndex], setValue];
}
