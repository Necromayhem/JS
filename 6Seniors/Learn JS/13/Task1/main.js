import { addUsers, findUser, getAllUsersFromStorage, getAllUsers } from "./userService.js";

function createNewUser() {
    const name = prompt('Введите имя', '');
    const email = prompt('Введите почту', '');
    
    if (name && email) {
        const user = {
            name: name,
            email: email
        };
        
        const result = addUsers(user);
        console.log(result);
        console.log('Все пользователи:', getAllUsersFromStorage());
    } else {
        alert('Имя или почта не могут быть пустыми!');
    }
}

const btn = document.getElementById("add");
btn.addEventListener('click', createNewUser);

console.log(getAllUsers());
