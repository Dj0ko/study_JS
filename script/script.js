'use strict';
//функция для получения случайного числа в заданном интервале
const getRandom = function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

//функция для угадывания числа
function startGame() {
let randomValue = getRandom(1, 100); //Задаем случайное число в диапозоне от 1 до 100

function askQuestion() {
    const setValue = +prompt('Угадай число от 1 до 100.');
    // Сравниваем введённое значение с загаданным 
    if (setValue > randomValue) {
        alert('Загаданное число меньше');
        askQuestion();
    } else if (setValue < randomValue && setValue > 0) {
        alert('Загаданное число больше');
        askQuestion();
    } else if (isNaN(setValue)) { //проверяем чтоб введено было число
        alert('Введи число');
        askQuestion();
    } else if (setValue === 0) { //выводим сообщение об окончании игры, если нажали кнопку "Отмена"
        alert('Game Over');
    } else if (setValue === randomValue) {
        // Если угадали загаданное значение, то предлагаем сыграть еще или выйти из программы
        let victoriusMessage = confirm('Победа! Хотите сыграть снова?');
        if (victoriusMessage) {
            randomValue = getRandom(1, 100);
            askQuestion();
        } else {
            alert('До скорых встреч');
        }
    }
};
return askQuestion();
}

startGame();