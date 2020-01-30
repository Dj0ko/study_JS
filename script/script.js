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
var arr1 = [];

for (var i = 2; i < 100; i++) {
  arr1[i] = i;
}

var p = 2;

do {
  for (i = 2 * p; i < 100; i += p) {
    arr1[i] = false;
  }

  for (i = p + 1; i < 100; i++) {
    if (arr1[i]) {
        break;
    } else {
        continue;
    }
  }
  p = i;
} while (p * p < 100); 

let newarr1 = [];
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i]) {
        newarr1.push(arr1[i]);
        console.log('Простоe число: ' + arr1[i] + '. Делители этого числа: 1 и ' + arr1[i]);
    }
}
