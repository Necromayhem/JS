let btn = document.querySelector('#button')

btn.addEventListener('click', event => {
	const currentSize =
		parseInt(window.getComputedStyle(event.target).fontSize) || 16
	event.target.style.fontSize = `${currentSize + 2}px`
	console.log(event.target.style.fontSize)
})
