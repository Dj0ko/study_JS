'use strict';
//функция для получения случайного числа в заданном интервале
const getRandom = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

//функция для угадывания числа
function getNumber() {
let n = getRandom(1, 100);
let num = 0;
const askQuestion = function () {
    const num = +prompt('Угадай число от 1 до 100.');
    if (num > n) {
        alert('Загаданное число меньше');
        askQuestion();
    } else if (num < n && num > 0) {
        alert('Загаданное число больше');
        askQuestion();
    } else if (isNaN(num)) {
        alert('Введи число');
        askQuestion();
    } else if (num === 0) {
        alert('Game Over');
    } else if (num === n) {
        let b = confirm('Победа! Хотите сыграть снова?');
        if (b) {
            n = getRandom(1, 100);
            askQuestion();
        } else {
            alert('До скорых встреч');
        }
    }
};
return askQuestion();
}

const b = getNumber();