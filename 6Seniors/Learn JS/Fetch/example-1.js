/* Fetch

let promise = fetch(url, [options]);

Без options - это просто GET-запрос, скачивающий содержимое по адресу url */

let api = "https://jsonplaceholder.typicode.com/posts";
let result;

fetch(api)
    .then(response => result = response.text())
    .then(result => console.log(result))
    .catch(err => console.error(err))


// Заголовки ответа хранятся в похожем на Map объекте response.headers

fetch(api)
    .then(res => {
        alert(res.headers.get('Content-Type')); // application/json; charset=utf-8
        return res;
    })
    .then(res => {
        for (let [key, value] of res.headers) {
            console.log(`${key} = ${value}`);
        }
    })
/* cache - control = max - age=43200
content - type = application / json; charset = utf - 8
expires = -1
pragma = no-cache */


// POST-запросы

let user = {
    name: 'John',
    surname: 'Smith',
}

fetch('/article/fetch/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}).then(data => console.log('Response data:', data))
.catch(error => console.error('Network error:', error));


// Задача 1

let GitHubUsers = ['iliakan', 'remy', 'no.such.users'];
let api = 'https://api.github.com/users/'

async function getUsers(names) {
    if (names.length == 0) return [];
    
    let requests = names.map(name =>
        fetch(api + name)
            .then(response => response.ok ? response.json() : null)
            .catch(error => null)
    );

    return Promise.allSettled(requests)
}

getUsers(GitHubUsers).then(data => {
    console.log(data)
    data.forEach(data => console.log(data.value));
})