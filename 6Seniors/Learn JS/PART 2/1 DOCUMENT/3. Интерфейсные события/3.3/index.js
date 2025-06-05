// === Drag'n'Drop с событиями мыши ===

// Базовый алгоритм Drag’n’Drop выглядит так:

// 1. При mousedown – готовим элемент к перемещению, если необходимо (например, создаём его копию).
// 2. Затем при mousemove передвигаем элемент на новые координаты путём смены left/top и position:absolute.
// 3. При mouseup – остановить перенос элемента и произвести все действия, связанные с окончанием Drag’n’Drop.

const item = document.createElement('div')
item.style.height = '50px'
item.style.width = '50px'
item.style.backgroundColor = 'black'
document.body.append(item)
document.body.style.height = '100vh'

item.addEventListener('mousedown', function (event) {
	item.style.position = 'absolute'
	item.style.zIndex = 1000

	item.ondragstart = function () {
		return false
	}

	moveAt(event.pageX, event.pageY)

	function moveAt(pageX, pageY) {
		item.style.left = pageX - item.offsetWidth / 2 + 'px'
		item.style.top = pageY - item.offsetHeight / 2 + 'px'
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY)
	}

	document.addEventListener('mousemove', onMouseMove)

	item.onmouseup = function () {
		document.removeEventListener('mousemove', onMouseMove)
		item.onmouseup = null
	}
})
