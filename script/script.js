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

// Получаем простые числа от 1 до 100
for (let i = 1; i <= 100; i++) {
    var num = 0;

    for (let j = 1; j <= i; j++) {
        if ((i % j) !== 0) {
            continue;
        } else {
            num +=1 ;
        } 
    }

    if (num === 2) {
        console.log('Простоe число: ' + i + '. Делители этого числа: 1 и ' + i);
    }
}