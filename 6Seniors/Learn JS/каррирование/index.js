// Каррирование

function sum(a, b, c) {
  return a + b + c;
}

function multi(a, b, c) {
  return a * b * c;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
      }
      
      return curried.bind(this, ...args);
  };
}

let curriedSum = curry(sum);
let curriedMulti = curry(sum);

console.log(curriedSum(2)(1)(2));
