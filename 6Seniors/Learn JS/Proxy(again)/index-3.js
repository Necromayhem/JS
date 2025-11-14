// Задачи Deepseek

/* Уровень 1: Основы и валидация
Задача 1: "Защищённый" объект пользователя
Создай Proxy для объекта пользователя user, который запрещает устанавливать значения в несуществующие свойства. При попытке установить несуществующее свойство должно выбрасываться исключение Error с сообщением "Попытка установить несуществующее свойство 'имя_свойства'". */

let user = {
  name: 'Alice',
  age: 30
};

user = new Proxy(user, {
    set(target, prop, val) {
        if (prop in target) {
            target[prop] = val;
            console.log('Свойство обновлено');
            return true;
        } else {
            throw new ReferenceError(`Попытка установить несуществующее свойство ${prop}`)
        }
    }
})

user.name = 'Alex'; // Свойство обновлено
console.log(user); // {name: 'Alex', age: 30}
// user.isAdmin = false; // ReferenceError: Попытка установить несуществующее свойство isAdmin

/* Задача 2: Валидация данных формы
Создай Proxy для объекта formData, который представляет данные формы. Реализуй логику, где:

При установке значения email проверяется, что оно содержит символ @.

При установке значения age проверяется, что это число в диапазоне от 18 до 120.

При установке значения name проверяется, что его длина не менее 2 символов.
В случае ошибки выбрасывай исключение. */

let formData = {
  name: '',
  email: '',
  age: null
};

formData = new Proxy(formData, {
    set(target, prop, val) {
        if (prop === 'email' && !val.includes('@')) {
            throw new TypeError('Email не содержит @')
        } if (prop === 'age' && val < 18 || val > 120) {
            throw new TypeError('Age должен быть от 18 до 120')
        }
        if (prop === 'name' && val.length < 2) {
            throw new TypeError('Name должен быть длиннее двух символов')
          }
            else {
            target[prop] = val;
            console.log('Свойство обновлено');
            return true;
        }
    }
})

formData.email = '@123'
// console.log(formData); // Свойство обновлено {name: '', email: '@123', age: null}
// formData.email = '123' // TypeError: Email не содержит @
// formData.age = 15 // TypeError: Age должен быть от 18 до 120
// formData.age = 255 // TypeError: Age должен быть от 18 до 120
formData.age = 28 
console.log(formData) // {name: '', email: '@123', age: 28}
// formData.name = 'Q' //  Name должен быть длиннее двух символов
formData.name = 'Ivan'
console.log(formData) // {name: 'Ivan', email: '@123', age: 28}






