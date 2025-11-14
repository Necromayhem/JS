// Задачи LearnJS

/* 1. Ошибка при чтении несуществующего свойства
Обычно при чтении несуществующего свойства из объекта возвращается undefined.

Создайте прокси, который генерирует ошибку при попытке прочитать несуществующее свойство.

Это может помочь обнаружить программные ошибки пораньше.

Напишите функцию wrap(target), которая берёт объект target и возвращает прокси, добавляющий в него этот аспект функциональности. */

let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        throw new ReferenceError('Свойство не обнаружено!')
      }
      }
  });
}

user = wrap(user);

console.log(user.name); // John
// console.log(user.age); // ошибка


/* 2. Получение элемента массива с отрицательной позиции
В некоторых языках программирования возможно получать элементы массива, используя отрицательные индексы, отсчитываемые с конца.

Вот так:

let array = [1, 2, 3];

array[-1]; // 3, последний элемент
array[-2]; // 2, предпоследний элемент
array[-3]; // 1, за два элемента до последнего
Другими словами, array[-N] – это то же, что и array[array.length - N].

Создайте прокси, который реализовывал бы такое поведение.
*/

let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop) {
    if (prop in target) {
      return target[prop]
    } else if (Number(prop) < 0) {
      return target[target.length + Number(prop)]
    }
  }
});

console.log(array[-1]); // 3
console.log(array[-2]); // 2