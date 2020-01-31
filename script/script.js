'use strict';

const arr = ['123', '234', '345', '456', '23234', '45747', '7567'];
console.log('arr: ', arr);

// Переберем массив и запишем в новый массив строки, которые начинаются с 2 или 4.
let newarr = [];
for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith(2) || arr[i].startsWith(4)) {
        newarr.push(arr[i]);
    }
}

console.log(newarr);

// // Получаем простые числа от 1 до 100
const count = 100; //задаём количество чисел

//создаем массив и заполняем его значениями
let arr1 = [];

for (let i = 2; i <= count; i++) {
  arr1[i] = i;
}

let divider = 2; // задаём начальное значение делителя
const maxDivader = Math.sqrt(count); //получаем максимально возвожный делитель
// перебираем возможные делители от 2 до sqrt(n)
do {
  let i = 0;
  //всем числам , которые делятся на делитель даём значение false
  for (i = 2 * divider; i <= count; i += divider) {
    arr1[i] = false;
  }
  //берём следующее число , если оно оказывается без флага false , то принимаем его за делитель
  for (i = divider + 1; i <= maxDivader; i++) {
    if (arr1[i]) {
        break;
    } else {
        continue;
    }
  }
  divider = i;
} while (divider < maxDivader); /*проверка, что делитель не может быть больше 
максимально возможного делителя*/

//выводим все простые числа
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i]) {
        console.log('Простоe число: ' + arr1[i] + '. Делители этого числа: 1 и ' + arr1[i]);
    }
}
