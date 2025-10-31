let api = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100'

async function getPhotos(api) {
    const response = await fetch(api);
    const reader = response.body.getReader();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        console.log(`Получено ${value.length} байт`);
    }
}

getPhotos(api)



