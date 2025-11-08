/* 1. Остановите gninnipS Мой sdroW! (решил легко)
https://www.codewars.com/kata/5264d2b162488dc400000001/train/javascript
Напишите функцию, которая принимает строку из одного или нескольких слов и возвращает ту же строку, но все слова, содержащие пять или более букв, перевёрнуты (как в названии этого ката). Передаваемые строки будут состоять только из букв и пробелов. Пробелы будут учитываться только при наличии нескольких слов.

Примеры:

"Hey fellow warriors"  --> "Hey wollef sroirraw" 
"This is a test        --> "This is a test" 
"This is another test" --> "This is rehtona test" */

function spinWords(string) {
  return string
    .split(" ")
    .map((elem) =>
      elem.length >= 5 ? elem.split("").reverse().join("") : elem
    )
    .join(" ");
}

console.log(spinWords("Hey fellow warriors")); // Hey wollef sroirraw

/* 2. Создать номер телефона (решил легко)
https://www.codewars.com/kata/525f50e3b73515a6db000b83/train/javascript
Напишите функцию, которая принимает массив из 10 целых чисел (от 0 до 9) и возвращает строку этих чисел в виде номера телефона.

Пример
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
Для выполнения этого задания возвращенный формат должен быть правильным.

Не забудьте пробел после закрывающихся скобок! */

function createPhoneNumber(numbers) {
  let format = "(xxx) xxx-xxxx";
  for (let i = 0; i < numbers.length; i++) {
    format = format.replace("x", numbers[i]);
  }

  return format;
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])); // (123) 456-7890

/* 3. Массив.diff (решил легко)
https://www.codewars.com/kata/523f5d21c841566fde000009/train/javascript
Реализуйте функцию, вычисляющую разницу между двумя списками. Функция должна удалять все вхождения элементов из первого списка ( a), присутствующие во втором списке ( b). Порядок элементов в первом списке должен сохраняться в результате.

Примеры
Если a = [1, 2]и b = [1], то результат должен быть [2].

Если a = [1, 2, 2, 2, 3]и b = [2], то результат должен быть [1, 3]. */

function arrayDiff(a, b) {
  return a.filter((elem) => !b.includes(elem));
}

console.log(arrayDiff([1, 2], [1]));

/* 4. Найдите нечетное целое число (легко)
https://www.codewars.com/kata/54da5a58ea159efa38000836/train/javascript
Дан массив целых чисел, найдите то, которое встречается нечетное количество раз.

Всегда будет только одно целое число, которое встречается нечетное количество раз.

Примеры
[7]должен вернуть 7, так как встречается 1 раз (что нечетно).
[0]должен вернуть 0, так как встречается 1 раз (что нечетно).
[1,1,2]должен вернуть 2, так как встречается 1 раз (что нечетно).
[0,1,0,1,0]должен вернуть 0, так как встречается 3 раза (что нечетно).
[1,2,2,3,3,3,4,3,3,3,2,2,1]должен вернуть 4, так как встречается 1 раз (что нечетно). */

function findOdd(A) {
  let obj = Array.from(new Set(A)).reduce((acc, elem) => {
    acc[elem] = 0;
    return acc;
  }, {});

  for (let i = 0; i <= A.length - 1; i++) {
    obj[A[i]] += 1;
  }

  let oddVal = Object.entries(obj).filter((elem) => elem[1] % 2 !== 0);

  return Number(oddVal[0][0]);
}

console.log(findOdd([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]));
console.log(findOdd([1, 1, 2]));
console.log(findOdd([7]));

/* 5. Сумма цифр / Цифровой корень (решил легко)
https://www.codewars.com/kata/541c8630095125aba6000c00/train/javascript
Цифровой корень — это рекурсивная сумма всех цифр числа.

Дано n, вычислите сумму цифр числа n.Если полученное значение содержит более одной цифры, продолжайте сокращать, пока не получится однозначное число.Входные данные будут неотрицательным целым числом.

16  -->  1 + 6 = 7
   942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2 */

function digitalRoot(n) {
  while (n.toString().split("").length > 1) {
    n = n
      .toString()
      .split("")
      .reduce((acc, num) => acc + Number(num), 0);
  }
  return n;
}

console.log(digitalRoot(493193));

/* 6. Заменить на алфавитную позицию (решил средне)
https://www.codewars.com/kata/546f922b54af40e1e90001da/train/javascript
В этом ката вам необходимо, имея заданную строку, заменить каждую букву ее позицией в алфавите.

Если в тексте есть что-то, что не является буквой, проигнорируйте это и не возвращайте.

"a" = 1, "b" = 2, и т.д.

Input = "The sunset sets at twelve o' clock."
Output = "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" */

function alphabetPosition(text) {
  const alphabet = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };

  let result = [];

  for (let char of text.toLowerCase()) {
    if (alphabet[char]) {
      result.push(alphabet[char]);
    }
  }

  return result.join(" ");
}

console.log(alphabetPosition("The sunset sets at twelve o' clock."));

/* 7. Дублирующий кодер (решил средне)
https://www.codewars.com/kata/54b42f9314d9229fd6000d9c/train/javascript
Цель этого упражнения — преобразовать строку в новую строку, где каждый символ в новой строке "("встречается только один раз в исходной строке или ")"встречается несколько раз. При определении дубликата символа не учитывайте регистр.

Примеры
"din"      =>  "((("
"recede"   =>  "()()()"
"Success"  =>  ")())())"
"(( @"     =>  "))(("  */

function duplicateEncode(word) {
    let result = [];
    let lowWord =  word.toLowerCase();
    
  let obj = Array.from(new Set(lowWord.split(""))).reduce((acc, elem) => {
    acc[elem] = 0;
    return acc;
  }, {});

  for (let i = 0; i <= lowWord.length - 1; i++) {
    obj[lowWord[i]] += 1;
  }

    for (let i = 0; i <= lowWord.length - 1; i++){
        if (obj[lowWord[i]] > 1){
            result.push(')')
        } else {
            result.push('(')
        }
    }  
    
    
  return result.join('')
}

console.log(duplicateEncode("recede"));

/* 8. Простое расширение строки (не решил)

"3(ab)"     expands to "ababab"    -- because "ab" repeats 3 times
"2(a3(b))"  expands to "abbbabbb"  -- "a3(b)" expands to "abbb" and that repeats twice

Если задана строка, вернуть расширение этой строки.

Правила:

Гарантируется, что входящие данные будут правильно сформированными и сбалансированными.
Множители — это однозначные числа в диапазоне от 1 до 9, и их указывать необязательно.
За каждым множителем сразу следует группа в скобках.
После того, как группа полностью развернута, за последней закрывающей скобкой ничего не отображается.
Единственными отображаемыми символами являются строчные буквы и цифры. */

// https://www.codewars.com/kata/5a793fdbfd8c06d07f0000d5/train/javascript

function solve(str){
    let stack = [];
    let currentStr = '';
    let currentNum = 0;

    for (let char of str) {
        if (!isNaN(char)) {
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '(') {
            stack.push([currentStr, currentNum]);
            currentStr = '';
            currentNum = 0;
        } else if (char === ')') {
            let [prevStr, num] = stack.pop();
            currentStr = prevStr + currentStr.repeat(num);
        } else {
            currentStr += char;
        }
    }

    return currentStr;
}

console.log(solve("a3(abc)"));

/* 9. Повернуть массив (сложно, с дипсиком, разбирался с %  при минусе)

Создайте метод с именем «rotate», который возвращает заданный массив с элементами, находящимися внутри повернутых nпробелов массива.

Если n больше 0, массив сдвигается вправо. Если n меньше 0, массив сдвигается влево. Если n равно 0, массив возвращается без изменений.

Пример:

with array [1, 2, 3, 4, 5]

n = 1      =>    [5, 1, 2, 3, 4]
n = 2      =>    [4, 5, 1, 2, 3]
n = 3      =>    [3, 4, 5, 1, 2]
n = 4      =>    [2, 3, 4, 5, 1]
n = 5      =>    [1, 2, 3, 4, 5]
n = 0      =>    [1, 2, 3, 4, 5]
n = -1     =>    [2, 3, 4, 5, 1]
n = -2     =>    [3, 4, 5, 1, 2]
n = -3     =>    [4, 5, 1, 2, 3]
n = -4     =>    [5, 1, 2, 3, 4]
n = -5     =>    [1, 2, 3, 4, 5] 

Вращение не должно ограничиваться индексами, доступными в массиве. Это означает, что если мы превысим индексы массива, вращение продолжится.

Пример:

with array [1, 2, 3, 4, 5]

n = 7        =>    [4, 5, 1, 2, 3]
n = 11       =>    [5, 1, 2, 3, 4]
n = 12478    =>    [3, 4, 5, 1, 2] */

function rotate(data, n) {
    if (n === 0) return data;
    
    const len = data.length;
    const result = [];

    for (let i = 0; i < len; i++){
        const newIndex = (i - n) % len;
        const indexed = newIndex >= 0 ? newIndex : len + newIndex;
        result.push(data[indexed]);
    }

    return result;
}

console.log(rotate([1, 2, 3, 4, 5], 1)); // [5, 1, 2, 3, 4]
console.log(rotate([1, 2, 3, 4, 5], 12478)); // [3, 4, 5, 1, 2]

/* 10. Кому это нравится? (решил легко)
https://www.codewars.com/kata/5266876b8f4bf2da9b000362/train/javascript
Описание:
Вы, вероятно, знакомы с системой «лайков» на Facebook и других страницах. Люди могут ставить отметки «Нравится» публикациям в блогах, фотографиям и другим материалам. Мы хотим создать текст, который будет отображаться рядом с таким материалом.

Реализуйте функцию, которая принимает массив имён людей, которым понравился товар. Функция должна возвращать отображаемый текст, как показано в примерах:

[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
Примечание: для 4 и более имен число "and 2 others"просто увеличивается. */

function likes(names) {
    if (names.length === 0) return "no one likes this";
    if (names.length === 1) return `${names[0]} likes this`;
    if (names.length === 2) return `${names[0]} and ${names[1]} like this`;
    if (names.length === 3) return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    if (names.length >= 4) return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`;

}

console.log(likes([]));
console.log(likes(["Peter"]));
console.log(likes(["Jacob", "Alex"]));
console.log(likes(["Max", "John", "Mark"]));
console.log(likes(["Alex", "Jacob", "Mark", "Max"]));
