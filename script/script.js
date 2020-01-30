'use strict';
//функция для получения случайного числа в заданном интервале
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Создаем функцию , которая при ошибочном вводе будет уменьшать количество попыток
function changeAttempts(n) {
    n--;
    if (n > 0) {
        return n;
    } else {
        // если попытки закончились - предлагаем сыграть еще раз
        let message = confirm('Попытки закончились, хотите сыграть еще?');
        if (message) {
            startGame();
        } else {
            alert('До скорых встреч!');
        }
    }
}

//функция для угадывания числа
function startGame() {
    let randomValue = getRandom(1, 100); //Задаем случайное число в диапозоне от 1 до 100
    let attempts = 1; //задаём начальное количество попыток


    function askQuestion() {
        // debugger;
        const setValue = +prompt('Угадай число от 1 до 100!');
        attempts = changeAttempts(attempts);
        // Сравниваем введённое значение с загаданным 
        if (setValue > randomValue) {
            // changeAttempts(attempts);
            alert('Загаданное число меньше, осталось попыток: ' + attempts);
            askQuestion();
        } else if (setValue < randomValue && setValue > 0) {
            alert('Загаданное число больше, осталось попыток: ' + attempts);
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
                attempts = 10;
                askQuestion();
            } else {
                alert('До скорых встреч');
            }
        }
    }
    return askQuestion();
}

startGame();