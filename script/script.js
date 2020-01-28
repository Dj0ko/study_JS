'use strict';
let str = '               Привет, как дела? У меня всё хорошо, надеюсь и у вас тоже всё здорово!'           ;
let num = 123;
let arr = [];

const a = function(data) {
    if (typeof data !== 'string') {
        return 'Введён не строчный тип данных';
    } else {
        return data.trim().substr(0, 30) + '...';
    }
};

console.log(a(str));
console.log(a(num));
console.log(a(arr));



