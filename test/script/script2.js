window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //получаем доступ к тегу p
    const text = document.getElementById('text');

    // функция для склонения числительных
    const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ?
        2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

    //получаем данные из объекта Date
    const dayOfWeek = new Date().getDay(),
        hour = new Date().getHours(),
        dateNow = new Date().getTime(),
        dateNewYear = new Date('2021 january 01').getTime();

    //Получаем приветствие с текущим временем суток
    let currentTimesOfDay;
    if (hour >= 0 && hour < 6) {
        currentTimesOfDay = 'Доброй ночи';
    } else if (hour >= 6 && hour < 12) {
        currentTimesOfDay = 'Доброе утро';
    } else if (hour >= 12 && hour < 18) {
        currentTimesOfDay = 'Добрый день';
    } else {
        currentTimesOfDay = 'Добрый вечер';
    }

    // Задаём массив дней недели
    const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    //Определем текущий день недели
    const currentDay = week[dayOfWeek - 1];

    //Определяем количество дней до нового года
    let daysRemaining = Math.floor((dateNewYear - dateNow) / 1000 / 60 / 60 / 24);

    //вывод сообщения
    text.innerHTML = `${currentTimesOfDay} <br>
                        Сегодня: ${currentDay} <br>
                        Текущее время: ${new Date().toLocaleTimeString('en')} <br>
                        До нового года осталось ${declOfNum(daysRemaining, ['день', 'дня', 'дней'])}`;

});