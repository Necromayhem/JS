// 1) Реализуйте функцию, которая вычисляет разницу между двумя списками. Функция должна удалить все вхождения элементов из первого списка ( a), которые присутствуют во втором списке ( b). Порядок элементов в первом списке должен быть сохранен в результате.
// https://www.codewars.com/kata/523f5d21c841566fde000009/train/javascript

// Примеры
// Если a = [1, 2]и b = [1], то результат должен быть [2].

// Если a = [1, 2, 2, 2, 3]и b = [2], то результат должен быть [1, 3].

const a = [1, 2, 2, 2, 3]
const b = [2]

function search_diff(a, b) {
	return a.filter(elem => !b.includes(elem))
}

console.log(search_diff(a, b))

// 2) Напишите функцию, которая принимает массив из 10 целых чисел (от 0 до 9) и возвращает строку этих чисел в виде номера телефона.
// https://www.codewars.com/kata/525f50e3b73515a6db000b83/train/javascript

// Пример
// createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"

// Для выполнения этого задания необходимо вернуть правильный формат.

// Не забудьте пробел после закрывающих скобок!

function createPhoneNumber(arr) {
	if (arr.length !== 10) return
	const part1 = arr.slice(0, 3).join('')
	const part2 = arr.slice(3, 6).join('')
	const part3 = arr.slice(6).join('')
	return `(${part1}) ${part2}-${part3}`
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))
