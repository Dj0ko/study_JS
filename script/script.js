let num = 266219;

//Поменяем тип данных на строку
let str = num.toString();

// Получим массив из цифр
const arr = str.split('');

// создадим функцию для вычисления произведения цифр
const doMultiplication = function(array) {
    let result = 1;

    for (let i = 0; i < array.length; i++) {
        result = result * array[i];
    }
    
    return result;
};

// Запустим функцию и получим ответ
let result = doMultiplication(arr);
console.log('result: ', result);

// возводим полученный результат в степень 3
result = result ** 3;
console.log('result: ', result);

// выводим на экран первые две цифры полученного числа
alert(result.toString().substring(0, 2));