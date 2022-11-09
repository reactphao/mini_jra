/*
 *  useEffect  原理解析
 *
 */

let index = 0;
let lastDepsBox = [];
let lastCallBackFn = [];

function useEffect(fn, deps) {
  const lastDeps = lastDepsBox[index];
  const flag =
    !lastDeps || !deps || deps.some((dep, index) => dep !== lastDeps[index]);
  if (flag) {
    lastDepsBox[index] = deps;
    lastCallBackFn[index] && lastCallBackFn[index]();
    lastCallBackFn[index] = fn();
  }
  index++;
}
