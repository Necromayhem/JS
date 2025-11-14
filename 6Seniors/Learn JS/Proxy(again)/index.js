// Proxy и Reflect
/* 
Объект Proxy "оборачивается" вокруг другого объекта и может перехватывать(и, при желании, самостоятельно обрабатывать) разные действия с ним, например чтение / запись свойств и другие.

Синтаксис:
let proxy = new Proxy(target, handler); 

target - объект, для которого нужно сделать прокси, может быть чем угодно, включая функции.
handler - конфигурация прокси: объект с "ловушками"(traps): методами, которые перехватывают разные операции, например, ловушка get - для чтения свойства из target, ловушка set - для записи свойства в target и так далее. */


// Пример прокси без ловушек

let target = {};
let proxy = new Proxy(target, {}); // Пустой handler!

proxy.test = 5; // записываем в прокси
console.log(target.test); // 5

for (let key in proxy) console.log(key); // test

/* Так как ловушек нет, то все операции на proxy применяются к оригинальному объекту target.

Proxy - это особый, "экзотический" объект, у него нет собственных свойств.С пустым handler он просто перенаправляет все операции на target. */

//=========================================================================

/* Значение по умолчанию с ловушкой get

Чаще всего используются ловушки на чтение / запись свойств.
Чтобы перехватить операцию чтения, handler должен иметь метод get(target, property, receiver).

Он срабатывает при попытке прочитать свойство объекта, с аргументами:

target - это оригинальный объект, который передавался первым аргументом в конструктор new Proxy.
property - имя свойства.
receiver - если свойство объекта является геттером, то receiver - это объект, который будет использован как this при его вызове. Обычно это сам объект прокси(или наследующий от него объект). */

/* Например, сделаем числовой массив, так чтобы при чтении из него несуществующего элемента возвращался 0 (обычно возвращается undefined) */

{
    let numbers = [0, 1, 2];

    numbers = new Proxy(numbers, {
        get(target, prop) {
            if (prop in target) {
                return target[prop]
            } else {
                return 0;
            }
        }
    })

    console.log(numbers[1]); // 1
    console.log(numbers[2]); // 2
    console.log(numbers[5]); // 0 - свойства не существует
}

// Пример с объектом

{
    let obj = {
        name: 'Alex',
        age: 28,
        city: 'Krasnodar'
    }

    obj = new Proxy(obj, {
        get(target, prop) {
            if (prop in target) {
                return `Свойство есть: ${target[prop]}`
            } else {
                return `Свойства ${prop} нет в объекте ${JSON.stringify(target)}!`
            }
        }
    })

    console.log(obj.name); // Свойство есть: Alex
    console.log(obj.isAdmin); // Свойства isAdmin нет в объекте {"name":"Alex","age":28,"city":"Krasnodar"}!
}


{
    let dictionary = {
        'Hello': 'Hola',
        'Bye': 'Adiós'
    }

    dictionary = new Proxy(dictionary, {
        get(target, phrase) {
            if (phrase in target) {
                return target[phrase]
            } else {
                return phrase;
            }
        }
    })

    console.log(dictionary['Hello']); // Hola 
    console.log(dictionary['Welcome']); // Welcome (нет перевода)


}

// =========================================================================

/* 
Валидация с ловушкой set

Допустим, мы хотим сделать массив исключительно для чисел. Если в него добавляются значения иного типа, то это должно приводить е ошибке.

Ловушка set срабатывает, когда происходит запись свойства.

set(target, property, value, receiver):

target - это оригинальный объект, который передавался первым аргументом в конструктор ne Proxy
property - имя свойства
value - значение свойства
receiver - аналогично ловушке get, этот аргумент имеет значение, только если свойство - сеттер

ловушка set должна вернуть true, если запись прошла успешно, и false в противном случае (будет сгенерирована ошибка TypeError).
*/

{
    let numbers = [0, 1, 2];

    numbers = new Proxy(numbers, {
        set(target, prop, val) {
            if (typeof val === 'number') {
                target[prop] = val;
                console.log('Значение является числом, запись прошла успешно!');
                return true;
            } else {
                console.log('Значение не является числом, запись отклонена!');
                return false;
            }
        }
    })

    numbers.push(10); // Значение является числом, запись прошла успешно!
    console.log(numbers); // Proxy(Array) {0: 0, 1: 1, 2: 2, 3: 10}
    // numbers.push('10'); // Значение не является числом, запись отклонена!
}

// =========================================================================


/* 
Перебор при помощи ownKeys и getOwnPropertyDescriptor

Object.keys, цикл for..in и большинство других методов, которые работают со списком свойств объекта, используют внутренний метод [[OwnPropertyKeys]](перехватываемый ловушкой ownKeys) для их плоучения.

Такие методы различаются в деталях:

Object.getOwnPropertyNames(obj) возвращает не-символьные ключи.
Object.getOwnPropertySymbols(obj) возвращает символьные ключи.
Object.keys/values(obj) возвращает не-символьные ключи/значения с флагом enumerable.
for..in перебирает не-символьные ключи с флагом enumerable, а также ключи прототипов.
*/

// Используем ловушку ownKeys, чтобы цикл for..in по объекту, ровно как и Object.keys и Object.values пропускали свойства, начинающиеся с подчёркивания _:

let user = {
    name: "Вася",
    age: 30,
    _password: "***"
};

user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
})

for (let key in user) console.log(key); // name age 
console.log(Object.keys(user)); // ['name', 'age']
console.log(Object.values(user)); // ['Вася', 30]


// А если попытаться возвратить ключ, которого в объекте на самом деле нет, то Object.keys его не выдаст:

{
    let user = {};

    user = new Proxy(user, {
        ownKeys(target) {
            return ['a', 'b', 'c'];
        }
    })

    console.log(Object.keys(user)); // [] пусто
}

/* 
Object.keys возвращает только свойства с флагом enumerable. Для того, чтобы определить, есть ли этот флаг, он для каждого свойства вызывает внутренний метод [[GetOwnProperty]], который получает его дескриптор. А в данном случае свойство отсутствует, его дескриптор пуст, флага enumerable нет, поэтому оно пропускается.

Чтобы Object.keys возвращал свойство, нужно либо чтобы свойство в объекте физически было, причём с флагом enumerable, либо перехватить вызовы [[GetOwnProperty]](это делает ловушка getOwnPropertyDescriptor), и там вернуть дескриптор с enumerable: true.
*/

// Пример

{
    let user = {};

    user = new Proxy(user, {
        ownKeys(target) { // вызывается один раз для получения списка свойств
            return ['a', 'b', 'c'];
        },

        getOwnPropertyDescriptor(target, prop) {
            // вызывается для каждого свойства
            if (prop === 'b') {
                return {
                enumerable: false,
                configurable: true,
            };
            }
            return {
                enumerable: true,
                configurable: true,
            };
        }
    })

    console.log(Object.keys(user)); // ['a', 'c']
}

// =========================================================================

/* 
Защищённые свойства с ловушкой deleteProperty и другими

Существует широко распространённое соглашение о том, что свойства и методы, название которых начинается с символа подчёркивания "_", следует считать внутренними. К ним не следует обращаться снаружи объекта.

Однако технически это всё равно возможно:
*/

{
    let user = {
        name: "Вася",
        _password: 'secret',
    };

    console.log(user._password); // secret
}

/* 
Можно применить прокси, чтобы защитить свойства, начинающиеся на _, от доступа извне.
Нужны следующие ловушки:

get - для того, чтобы сгенерировать ошибку при чтении такого свойства
set - для того, чтобы сгенерировать ошибку при записи
deleteProperty - для того, чтобы сгенерировать ошибку при удалении
ownKeys - для того, чтобы исключить такие свойства из for..in и методов типа Object.keys
*/

// Пример:

let person = {
    name: 'Alex',
    age: 28,
    _password: 'qwerty',
};

person = new Proxy(person, {
    get(target, prop) {
        if (prop in target) {
            return prop.startsWith('_') ? TypeError('Доступ запрещён') : target[prop]
        } 
    },

    set(target, prop, val) {
        if (prop.startsWith('_')) {
            console.log('Запись отклонена!');
            return false;
        } else {
            target[prop] = val;
            return true;
        }
    },

    ownKeys(target, prop) {
        return Object.keys(target).filter(key => !key.startsWith('_'))
    },

    deleteProperty(target, prop) {
        if (prop.startsWith('_')) {
            console.log('Удаление запрещено!');
            return false;
        } else {
            delete target[prop]
            return true;
        }
    }
})

console.log(person.name); // Alex
console.log(person._password); // TypeError: Доступ запрещён
console.log(person._password = 123); // Запись отклонена!
console.log(person); // {name: 'Alex', age: 28, _password: 'qwerty'} пароль не изменился!
for (let key in person) console.log(key); // name age
console.log(Object.keys(person)); // ['name', 'age']
console.log(Object.values(person)); // ['Alex', 28]
console.log(delete person._password); // Удаление запрещено!
console.log(person); // {name: 'Alex', age: 28, _password: 'qwerty'}

// =========================================================================

/* 
В диапазоне с ловушкой has

Например, есть объект range, описывающий диапазон:

let range = {
    start: 1,
    end: 10
}

Мы хотели бы использовать оператор in, чтобы проверить, что некоторое число находится в указанном диапазоне. 
Ловушка has перехватывает вызовы in.

has(target, property)

target - это оригинальный объект, который передавался первым аргументом в конструктор new Proxy
property - имя свойства
*/

let range = {
    start: 1,
    end: 10
}

range = new Proxy(range, {
    has(target, prop) {
        return prop >= target.start && prop <= target.end
    }
})

console.log(5 in range); // true
console.log(50 in range); // false

// =========================================================================

/* 
Оборачиваем функции: apply

Мы можем оборачивать в прокси и функции.

Ловушка apply(target, thisArg, args) активируется при вызове прокси как функции:

target - оригинальный объект(функци тоже объект!)
thisArg - это контекст this
args - список аргументов
*/

// Без прокси

function delay(f, ms) {
    // возвращает обёртку, которая вызывает функцию f через таймаут
    return function () {
        setTimeout(() => {
            f.apply(this, arguments)
        }, ms)
    }
}

function sayHi(user) {
    console.log(`Привет, ${user}`);
}

console.log(sayHi.length); // 1

sayHi = delay(sayHi, 3e3);

console.log(sayHi.length); // 0 - потерян доступ к оригинальной функции


sayHi('aboba')

// Но в этом случае теряется доступ к свойствам оригинальной функции

// Пример с прокси:

{
    function delay(f, ms) {
        return new Proxy(f, {
            apply(target, thisArg, args) {
                setTimeout(() => {
                    target.apply(thisArg, args)
                }, ms)
            }
        })
    }

    function sayHi(user) {
        console.log(`Привет, ${user}`);
    }

    console.log(sayHi.length); // 1


    sayHi = delay(sayHi, 4e3)

    console.log(sayHi.length); // 1

    sayHi('Vasya')
}

// =========================================================================

/* 
    Reflect - встроенный объект, упрощающий создание прокси.

    Он нужен для упрощения перенаправления операций к целевому объекту в Proxy.

    Операция	            Вызов Reflect	                Внутренний метод
    obj[prop]	            Reflect.get(obj, prop)	            [[Get]]
    obj[prop] = value	    Reflect.set(obj, prop, value)	    [[Set]]
    delete obj[prop]	    Reflect.deleteProperty(obj, prop)	[[Delete]]
    new F(value)	        Reflect.construct(F, value)	       [[Construct]]
*/

let admin = {};

Reflect.set(admin, 'name', 'Alex');

console.log(admin.name); // Alex

{
    let user = {
        name: 'aboba'
    }

    user = new Proxy(user, {
        get(target, prop, receiver) {
            // alert(`GET ${prop}`)
            return Reflect.get(target, prop, receiver)
        }, 
        set(target, prop, val, receiver) {
            // alert(`SET ${prop}=${val}`)
            return Reflect.set(target, prop, val, receiver)
        }
    })

    let name = user.name; // prop
    user.name = 'Ivan'; // выводит "SET name=Ivan"
}


// Прокси для геттера

{
    let user = {
        _name: "Гость",
        get name() {
            return this._name;
        }
    }

    let userProxy = new Proxy(user, {
        get(target, prop, receiver) {
            return target[prop];
        }
    })

    // alert(userProxy.name) // Гость

    /* 
        Ловушка get здесь "прозрачная" - она возвращает свойство исходного объекта и больше ничего не делает.
    
        Можно усложнить пример.
        Если унаследовать от проксированного user объект admin, то мы увидим, что он ведёт себя некорректно.
    */


    let admin = {
        __proto__: userProxy,
        _name: "Админ"
    }

    // ожидается админ
    // alert(admin.name) // Гость

}

// Исправленная ситуация с использованием receiver

{
    let user = {
    _name: "Гость",
    get name() {
        return this._name;
    }
    };

    let userProxy = new Proxy(user, {
    get(target, prop, receiver) { // receiver = admin
            return Reflect.get(target, prop, receiver); // (*)
            // return Reflect.get(...arguments); или так
    }
    });


    let admin = {
    __proto__: userProxy,
    _name: "Админ"
    };

    // alert(admin.name); // Админ
}
