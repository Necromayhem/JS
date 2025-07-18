"use strict";
// Генераторы
// задача из учебника
function* pseudoRandom(seed) {
    let value = seed;
    while (true) {
        value = (value * 16807) % 2147483647;
        yield value;
    }
}
let generator = pseudoRandom(1);
console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073
// задачи DeepSeek
// 1. Функция-генератор
// Задача: Напишите функцию-генератор range(start, end), которая генерирует числа от start до end (включительно).
// Пример использования:
// javascript
// for (let num of range(1, 5)) {
//   console.log(num); // 1, 2, 3, 4, 5
// }
function* range(start, end) {
    if (start === end)
        return;
    if (end > start) {
        for (let value = start; value <= end; value++) {
            yield value;
        }
    }
    if (start > end) {
        for (let value = start; value >= end; value--) {
            yield value;
        }
    }
}
let gen = range(10, 1);
console.log(gen.next().value); // 10
console.log(gen.next().value); // 9
console.log(gen.next().value); // 8
console.log(gen.next().value); // 7
console.log(gen.next().value); // 6
// for (let num of range(1, 5)) {
// 	console.log(num) // 1, 2, 3, 4, 5
// }
// 2. Перебор генераторов
// Задача: Создайте генератор alphabet(), который по очереди выдаёт буквы английского алфавита (от 'a' до 'z'). Используйте for...of для перебора и вывода букв.
// Пример:
// javascript
// for (let char of alphabet()) {
//   console.log(char); // 'a', 'b', ..., 'z'
// }
function* alphabet(start, end) {
    for (let i = start; i <= end; i++)
        yield i;
}
let str = '';
for (let char of alphabet(97, 122)) {
    str += String.fromCharCode(char);
}
console.log(str); // abcdefghijklmnopqrstuvwxyz
// 3. Использование генераторов для перебираемых объектов
// Задача: Создайте объект iterableObject, который можно перебирать с помощью for...of. Внутри используйте генератор, чтобы объект возвращал числа 10, 20, 30.
// Пример:
// javascript
// const iterableObject = {
//   *[Symbol.iterator]() {
//     // ваш код
//   }
// };
// for (let num of iterableObject) {
//   console.log(num); // 10, 20, 30
// }
const iterableObject = {
    *[Symbol.iterator]() {
        yield* [10, 20, 30];
    },
};
for (let num of iterableObject) {
    console.log(num); // 10, 20, 30
}
// 4. yield — дорога в обе стороны
// Задача: Создайте генератор askQuestion(), который:
// yield вопрос (например, "Как тебя зовут?").
// Принимает ответ через generator.next(answer) и выводит его.
// Повторяет для нескольких вопросов.
// Пример:
// javascript
// const generator = askQuestion();
// let question = generator.next().value; // "Как тебя зовут?"
// let answer = generator.next("Алексей").value; // "Привет, Алексей!"
function* askQuestion() {
    let question_1 = yield 'Как тебя зовут?';
    console.log(` привет, ${question_1}`); // " привет, Федя"
    let question_2 = yield 'Как дела?';
    console.log(`раз ${question_2}, то ок`); // "раз Нормально, то ок"
}
let gener = askQuestion();
let question = gener.next().value; // "Как тебя зовут?"
let answer = gener.next('Федя').value; // "Как дела?"
let final = gener.next('Нормально').value;
// 5. generator.throw
// Задача: Напишите генератор countdown(n), который генерирует числа от n до 1. Если в генератор передаётся ошибка через generator.throw(), он должен немедленно завершиться с сообщением "Аварийная остановка!".
// Пример:
// javascript
// const gen = countdown(5);
// console.log(gen.next().value); // 5
// console.log(gen.next().value); // 4
// gen.throw(new Error("Стоп!")); // Аварийная остановка!
function* countdown(n) {
    try {
        if (n <= 1)
            return;
        for (let i = n; i >= 1; i--)
            yield i;
    }
    catch (err) {
        return `Генератор завершил работу с ошибкой ${err}`;
    }
    return 'Генератор завершил работу без ошибок';
}
const count = countdown(7);
console.log(count.next().value); // 7
console.log(count.next().value); // 6
console.log(count.next().value); // 5
console.log(count.throw('Упс')); // {value: 'Генератор завершил работу с ошибкой Упс', done: true}
// Асинхронные генераторы
async function* generateSequence(start, end) {
    let page = start;
    while (page <= end) {
        yield await fetch(`https://jsonplaceholder.typicode.com/posts/${page}`);
        page += 1;
    }
}
async function run(start, end) {
    const gg = generateSequence(start, end);
    for await (const response of gg) {
        const post = await response.json();
        console.log(post);
    }
}
run(1, 5);
