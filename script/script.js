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