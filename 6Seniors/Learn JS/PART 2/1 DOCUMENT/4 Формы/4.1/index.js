document.body.style.backgroundColor = 'aqua' // фон
// работа с body
let body = document.body
body.style.display = 'flex'
body.style.justifyContent = 'center'
body.style.alignItems = 'center'
body.style.minHeight = '100vh'
body.style.margin = 0

let form = document.querySelector('#prompt-form-container')
form.style.display = 'none'

let btn = document.createElement('button')
document.body.append(btn)
btn.textContent = 'Кликните, чтобы увидеть форму'
btn.style.display = 'block'
btn.style.height = '40px'
btn.style.width = '250px'
btn.style.cursor = 'pointer'
// hover кнопке показа
btn.addEventListener('mouseenter', function () {
	this.style.backgroundColor = 'red'
	btn.textContent = 'ЖМИ!!!'
	this.style.transform = 'scale(1.5)'
})
btn.addEventListener('mouseleave', function () {
	this.style.backgroundColor = 'white'
	btn.textContent = 'Кликните, чтобы увидеть форму'
	this.style.transform = 'scale(1)'
})
btn.addEventListener('mousedown', function () {
	this.style.backgroundColor = 'yellow'
})

btn.addEventListener('click', showPrompt)

let input = document.querySelector('#prompt-form-container input[name="text"]')
let formElement = document.querySelector('#prompt-form-container form')

function showPrompt() {
	btn.style.display = 'none' // скрываю кнопку показа
	form.style.display = 'inline-block' // показываю модалку
	input.focus() // вешаю фокус на инпут
	// обработчик при открытии формы, чтобы отслеживать tab
	document.addEventListener('keydown', handleTabKey)
}

function handleTabKey(event) {
	if (event.key === 'Tab' || event.keyCode === 9) {
		event.preventDefault()
	}
}

formElement.addEventListener('submit', function (event) {
	event.preventDefault()
	input.focus()
	if (input.value == '') {
		alert('Поле ввода пустое 🤷')
		return
	}
	alert(`Вы ввели: ${input.value}`)
	input.value = '' // очищаю поле ввода
	form.style.display = 'none'
	btn.style.display = 'block'
	document.removeEventListener('keydown', handleTabKey)
})

formElement.addEventListener('click', function (event) {
	if (event.target.name == 'cancel') {
		document.removeEventListener('keydown', handleTabKey)
		alert('Вы отменили ввод 👻')
		form.style.display = 'none'
		btn.style.display = 'block'
		input.value = ''
	}
})
