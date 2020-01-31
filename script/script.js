'use strict';
//функция для получения случайного числа в заданном интервале
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//функция для угадывания числа
function startGame() {
  let randomValue = getRandom(1, 100); //Задаем случайное число в диапозоне от 1 до 100
  let attempts = 10; //задаём начальное количество попыток


  function askQuestion() {
    //проверяем на количество оставшихся попыток
    if (attempts > 0) {
      attempts--;
      const setValue = +prompt('Угадай число от 1 до 100!');

      if (attempts !== 0) {
        // Сравниваем введённое значение с загаданным 
        if (setValue > randomValue) {
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
            startGame();
          } else {
            alert('До скорых встреч');
          }
        }
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
  }
  return askQuestion();
}

startGame();