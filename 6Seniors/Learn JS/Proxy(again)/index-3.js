// Задачи Deepseek

/*Задача 1: "Защищённый" объект пользователя
Создай Proxy для объекта пользователя user, который запрещает устанавливать значения в несуществующие свойства. При попытке установить несуществующее свойство должно выбрасываться исключение Error с сообщением "Попытка установить несуществующее свойство 'имя_свойства'". */

let user = {
  name: "Alice",
  age: 30,
};

user = new Proxy(user, {
  set(target, prop, val) {
    if (prop in target) {
      target[prop] = val;
      console.log("Свойство обновлено");
      return true;
    } else {
      throw new ReferenceError(
        `Попытка установить несуществующее свойство ${prop}`
      );
    }
  },
});

user.name = "Alex"; // Свойство обновлено
console.log(user); // {name: 'Alex', age: 30}
// user.isAdmin = false; // ReferenceError: Попытка установить несуществующее свойство isAdmin

/* Задача 2: Валидация данных формы
Создай Proxy для объекта formData, который представляет данные формы. Реализуй логику, где:

При установке значения email проверяется, что оно содержит символ @.

При установке значения age проверяется, что это число в диапазоне от 18 до 120.

При установке значения name проверяется, что его длина не менее 2 символов.
В случае ошибки выбрасывай исключение. */

let formData = {
  name: "",
  email: "",
  age: null,
};

formData = new Proxy(formData, {
  set(target, prop, val) {
    if (prop === "email" && !val.includes("@")) {
      throw new TypeError("Email не содержит @");
    }
    if ((prop === "age" && val < 18) || val > 120) {
      throw new TypeError("Age должен быть от 18 до 120");
    }
    if (prop === "name" && val.length < 2) {
      throw new TypeError("Name должен быть длиннее двух символов");
    } else {
      target[prop] = val;
      console.log("Свойство обновлено");
      return true;
    }
  },
});

formData.email = "@123";
// console.log(formData); // Свойство обновлено {name: '', email: '@123', age: null}
// formData.email = '123' // TypeError: Email не содержит @
// formData.age = 15 // TypeError: Age должен быть от 18 до 120
// formData.age = 255 // TypeError: Age должен быть от 18 до 120
formData.age = 28;
console.log(formData); // {name: '', email: '@123', age: 28}
// formData.name = 'Q' //  Name должен быть длиннее двух символов
formData.name = "Ivan";
console.log(formData); // {name: 'Ivan', email: '@123', age: 28}

/* Задача 3: Логгер изменений объекта
Создай Proxy для любого объекта, который будет логировать в консоль все операции:

Какой тип операции произошёл (get, set, deleteProperty etc.).

Какое свойство было затронуто.

Какое было значение (для set).

Как выглядел объект до изменения (для операций записи).

Пример вывода:
[SET] property 'age': 31 | Object: {name: 'Alice', age: 31} */

let some_obj = {
  name: "Alice",
  age: 20,
};

some_obj = new Proxy(some_obj, {
  get(target, prop) {
    if (prop in target) {
      console.log(
        `[GET] property ${prop}: ${target[prop]} | ${JSON.stringify(target)}`
      );
      return target[prop];
    } else {
      console.log(`Свойства не существует`);
    }
  },
  set(target, prop, val) {
    if (prop in target) {
      console.log(`[SET] property ${prop}: ${val} | ${JSON.stringify(target)}`);
      target[prop] = val;
      return true;
    } else {
      console.log(`[SET] property ${prop}: ${val} | ${JSON.stringify(target)}`);
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    if (prop in target) {
      console.log(
        `[DELETE] property ${prop}: ${target[prop]} | ${JSON.stringify(target)}`
      );
      delete target[prop];
      return true;
    } else {
      console.log(`Свойства не существует`);
      return false;
    }
  },
});

some_obj.name; // [GET] property name: Alice | {"name":"Alice","age":20}
// some_obj.isAdmin // Свойства не существует
some_obj.name = "Alex"; // [SET] property name: Alex | {"name":"Alice","age":20}
some_obj.isAdmin = true; // [SET] property isAdmin: true | {"name":"Alex","age":20}
delete some_obj.age; // [DELETE] property age: 20 | {"name":"Alex","age":20,"isAdmin":true}
console.log(some_obj); // {name: 'Alex', isAdmin: true}

/* Задача 4: Наблюдатель (Observer)
Реализуй функцию createObservable(target, callback), которая возвращает проксированный объект. При любом изменении этого объекта (установка свойства, удаление свойства) должна вызываться функция callback, которая получает на вход:

Тип изменения ('set' или 'delete').

Имя изменённого свойства.

Новое значение (для set).

Это основа для реактивных систем. */

function createObservable(target, callback) {
  return new Proxy(target, {
    set(target, prop, val) {
      if (prop in target) {
        target[prop] = val;
        callback(
          "[[SET]]",
          `изменение свойства ${prop},`,
          `новое значение ${val}`
        );
        return true;
      } else {
        target[prop] = val;
        callback("[[SET]]", `новое свойство ${prop},`, `значение: ${val}`);
        return true;
      }
    },
    deleteProperty(target, prop) {
      if (prop in target) {
        let oldVal = { ...target };
        delete target[prop];
        callback("[[DELETE]]", `удаление свойства ${prop}:`, `${oldVal[prop]}`);
        return true;
      } else {
        console.log("Свойства не существует");
        return false;
      }
    },
  });
}

let proxy1 = {};

proxy1 = createObservable(proxy1, (type, prop, val) => {
  console.log(type, prop, val);
});

proxy1.name = "Alex"; // [[SET]] новое свойство: name, значение: Alex
proxy1.name = "Max"; // [[SET]] изменение свойства: name, новое значение Max
delete proxy1.name; // [[DELETE]] удаление свойства: name: Max
delete proxy1.name; // Свойства не существует

/* Задача 5: "Ленивый" объект с вычисляемыми свойствами
Создай Proxy для объекта, который имитирует "ленивые" вычисления.

У объекта есть "виртуальное" свойство expensiveValue.

При первом обращении к expensiveValue (через get) запускается "тяжёлое" вычисление (например, цикл или имитация запроса с setTimeout), результат кешируется и возвращается.

При последующих обращениях возвращается закешированное значение.

Подсказка: Используй отдельный скрытый объект для кеша. */

let obj = {
  id: 2517,
  email: "qwerty@.com",
  country: "USA",
};

let cache = {
    expensiveValue: null,
    isCalculated: false,
}

function heavyCalculate() {
    let result = 0;
    for (let i = 0; i < 1e8; i++){
        result += Math.sqrt(i) + Math.sin(i);
    }
    return result;
}

obj = new Proxy(obj, {
    get(target, prop) {
        if (prop in target) {
            if (cache.isCalculated) {
                return cache.expensiveValue[prop]
            } else {
                console.log('Кеширование...');
                heavyCalculate();
                console.log('Данные обновлены');
                cache.isCalculated = true;
                cache.expensiveValue = target;
                return cache.expensiveValue[prop];
            }
        } else {
            throw new ReferenceError('Свойства не существует')
        }
    },
    set(target, prop, val) {
            target[prop] = val;
            cache.isCalculated = false;
            return true;
    }
})

obj.id = 12
console.log(obj.id); 
obj.id = 11
console.log(obj.id); 






