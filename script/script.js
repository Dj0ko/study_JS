'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

//Получаем элемент с id week
const blockWeek = document.getElementById('week');
//Определем порядковый номер дня недели , 0 соответствует воскресенью
const currentDay = (new Date()).getDay();
console.log('currentDay: ', currentDay);

//Перебираем элементы массива
for (let i = 0; i < week.length ; i++){
  if (i === (currentDay - 1)) {
    blockWeek.innerHTML += '<p><b>' + week[i] + '</b></p>';
  } else if (i < 5) {
    blockWeek.innerHTML += '<p>' + week[i] + '</p>';
  } else {
    blockWeek.innerHTML += '<p><i>' + week[i] + '</i></p>';
  }
}













