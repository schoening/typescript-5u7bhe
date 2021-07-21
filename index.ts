(() => {
"use strict";

type Foo = { bar: string };

type FooReadonly = Readonly<Foo>;

const arr : ReadonlyArray<Foo> = [];
console.clear();

const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

// console.log(arr);

// arr[0] = { bar: "baz" };

// console.log(arr);

const foo = deepFreeze({ bar: "bar" });

const immutable = obj => console.log('immutable') ||
  new Proxy(obj, {
    get(target, prop) {
      return typeof target[prop] === 'object'
        ? immutable(target[prop])
        : target[prop];
    },
    set() {
      throw new Error('Immutable!');
    },
  });




const test = { bar: "<3", foo };
const immutableTest = immutable(test);
console.log('!');
console.log(test);
console.log(test.bar);
let i = 0;
const tick = () => {
  console.log(immutableTest.bar);
  test.bar = `${i++}`;
  setTimeout(tick, 1000);
}
tick();
// immutableTest.bar = "!";

})();