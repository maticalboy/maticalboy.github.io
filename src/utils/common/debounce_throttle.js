export const debounce = function(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      
      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
// 定时器版
export const throttle = function (func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
// 时间戳版
// function throttle(fn, delay) {
//     var previous = 0;
//     // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
//     return function() {
//         var _this = this;
//         var args = arguments;
//         var now = new Date();
//         if(now - previous > delay) {
//             fn.apply(_this, args);
//             previous = now;
//         }
//     }
// }