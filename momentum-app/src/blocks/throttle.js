function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // shows nothing

setTimeout(() => f1000(3), 1100); // shows 3

setTimeout(() => f1000(4), 1200); // shows nothing
setTimeout(() => f1000(5), 2410); // shows 5

function throttle(func, delay) {
  let busy = false;
  let dofunc = function (args) {
    if (busy === false) {
      busy = true;
      func(args);
      setTimeout(() => {
        busy = false;
      }, delay);
    }
  };
  return dofunc;
}
