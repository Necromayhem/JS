// Proxy и Reflect

let person = {
    name: 'Alex',
    age: 28
};

let proxy = new Proxy(person, {
    get(target, prop){
        if(prop in target){
            return target[prop]
        } else {
            return 'Такого свойства нет!'
        }
    },

    set(target, prop, val){
        if(val.length < 5 && val !== 'number'){
            console.log('должно быть 5 или больше символов');
            return false
        } else {
            target[prop] = val
            return true
        }
    },

    delete(target, prop){
        if(prop in target){
            `Свойство ${prop} удалено`
            return true
        } else {
            'Свойство не удалено'
            return false
        }
    }
})


let data = {
    name: 'Alex',
    city: 'Msk',
    job: false,
    age: 28,
    _password: 'qwerty'
}

data = new Proxy(data, {
    get(target, prop){
        if(prop.startsWith('_')){
            throw new TypeError('Отказано в доступе!')
        } else {
            return target[prop]
        }
    },

    deleteProperty(target, prop){
        if(prop.startsWith('_')){
            throw new TypeError('Отказано в доступе!')
        } else {
           delete target[prop]
           return true
        }
    }
})

console.log(data.name); // Alex
console.log(data._password); // TypeError: Отказано в доступе!
console.log(delete data.name); // true
console.log(delete data._password); // TypeError: Отказано в доступе!


// Задачи 

let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
      get(target, prop){
        if(prop in target){
            return target[prop]
        } else {
            return new Error('Ошибка: такого свойства не существует')
            
        }
      }
  });
}

user = wrap(user);

console.log(user.name); // John
console.log(user.age); // Ошибка: такого свойства не существует




