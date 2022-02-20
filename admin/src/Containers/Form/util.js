export const debounce = (func, ms = 1000) => {
  // export const debounce = (func, ms = 100, lastRunVal = 1000) => {
  // let oldDate = +new Date();
  // let lastRunTimer;
  // let lastArgs = [];

  // return function(...args) {
  //   const newDate = +new Date();
  //   if (newDate - oldDate > ms) {
  //     clearTimeout(lastRunTimer);
  //     oldDate = newDate;
  //     func(...args);
  //   } else {
  //     lastArgs = args;
  //     lastRunTimer = setTimeout(() => {
  //       func(...lastArgs);
  //     }, lastRunVal);
  //   }
  // };
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      func(...args);
    }, ms);
  };
};
