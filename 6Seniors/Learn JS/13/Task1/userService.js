const users = [
    {
        id: 1,
        name: 'Alex',
        email: 'alex2517@gmail.com'
    },
     {
        id: 2,
        name: 'Max',
        email: 'max777@bk.list'
    },
     {
        id: 3,
        name: 'Oleg',
        email: 'oleg161@mail.ru'
    },
]

const storedUsers = localStorage.getItem('users');
if (storedUsers) {
    users.length = 0; 
    users.push(...JSON.parse(storedUsers)); 
}

function getAllUsers(){
    return users;
}

function getAllUsersFromStorage(){
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

function addUsers(user){
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    
    const newUser = {
        id: maxId + 1,
        ...user 
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return `Новый пользователь ${newUser.name} добавлен с ID ${newUser.id}`;
}

function findUser(id){
    return users.find(user => user.id == id);
}

function getUsersFromStorage(){
    const storedData = localStorage.getItem('users');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return [];
}

export {getAllUsers, addUsers, findUser, getAllUsersFromStorage, getUsersFromStorage};