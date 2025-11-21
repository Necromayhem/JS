// Eval


// Задача LearnJS
/* Создайте калькулятор, который запрашивает ввод какого-нибудь арифметического выражения и возвращает результат его вычисления.

В этой задаче нет необходимости проверять полученное выражение на корректность, просто вычислить и вернуть результат. */
let result = prompt("Введите выражение:", '');
alert(eval(result));


// Задачи Deepseek

/* Задача 1: Калькулятор выражений
Напиши функцию calculate(expression), которая принимает строку с простым математическим выражением (например, "2 + 2 * 2") и возвращает результат его вычисления. Используй eval. */

function calculate(expression) {
    return eval(expression);
}
console.log(calculate("2 + 2 * 2")); // Должно быть 6
console.log(calculate("(10 - 4) / 2")); // Должно быть 3


/* Задача 2: Динамическое присваивание
Создай функцию dynamicAssign(varName, value), которая принимает имя переменной и значение, создаёт глобальную переменную с этим именем и присваивает ей значение. Используй eval для присваивания. */

function dynamicAssign(varName, value) {
  window.eval(`${varName} = ${value}`)
}
dynamicAssign("myVar", 42);
console.log(myVar); // Должно вывести 42


/* Задача 3: Динамический вызов функции
Напиши функцию callFunction(funcName, ...args), которая вызывает функцию с именем funcName и передаёт ей аргументы args. Функция должна искать funcName в глобальной области видимости. */

function sayHello(name) {
  return `Hello, ${name}!`;
}

function callFunction(funcName, ...args) {
  
    return eval(funcName)(...args)
}
console.log(callFunction("sayHello", "Alex")); // Должно быть "Hello, Alex!"

