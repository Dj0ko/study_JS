document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	function myTimer() {
		// получаем доступ к первому выводу даты
		let today1 = document.getElementById('today1'),
			today2 = document.getElementById('today2');
		// функция для склонения числительных
		const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ?
			2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

		//получаем данные из объекта Date.
		let year = new Date().getFullYear(),
			month = new Date().getMonth(),
			dayOfWeek = new Date().getDay(),
			dayOfMonths = new Date().getDate(),
			hour = new Date().getHours(),
			minutes = new Date().getMinutes(),
			seconds = new Date().getSeconds();

		// Задаём массив дней недели
		const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
		// Задаём массив месяцев
		const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября',
			'Октября', 'Ноября', 'Декабря'
		];

		//Определем текущий день недели
		const currentDay = week[dayOfWeek - 1];
		//Определяем текущий месяц
		const currentMonth = months[month];
		//Выводим дату в формате задания 1а
		today1.innerHTML = `Сегодня ${currentDay}, ${dayOfMonths} ${currentMonth} ${year} года, 
${declOfNum(hour, ['час', 'часа', 'часов'])} 
${declOfNum(minutes, ['минута', 'минуты', 'минут'])}
${declOfNum(seconds, ['секунда', 'секунды', 'секунд'])}`;


		//Функция для добавления 0 перед значениями состоящими из одной цифры
		function addZero(data) {
			if (String(data).length === 1) {
				return '0' + data;
			} else {
				return data;
			}
		}

		today2.innerHTML = `${addZero(dayOfMonths)}.${addZero(month+1)}.${year} - 
${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;



	}

	//Реализация с помощью setInterval
	function go() {
		window.timerId = window.setInterval(myTimer, 1000);
	}
	go();
});