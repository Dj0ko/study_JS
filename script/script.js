'use strict';
let lang = prompt('Введите ru или en');

const daysInRussian = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const daysInEnglish = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Через конструкцию if
if (lang === 'ru') {
    console.log(daysInRussian);
} else if (lang === 'en') {
    console.log(daysInEnglish); 
}

// Через конструкцию switch-case
switch (lang) {
    case 'ru':
        console.log(daysInRussian);
        break;
    case 'en':
        console.log(daysInEnglish);
        break;
}

// Через объект
let days = {
    ru: daysInRussian,
    en: daysInEnglish
};
console.log(days[lang]);

let namePerson = prompt('Введите имя', 'Артем');

namePerson === 'Артем' ? console.log('директор') : 
namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');


