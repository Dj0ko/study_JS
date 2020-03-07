'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Функция таймера
countTimer('25 february 2020');
//меню
toggleMenu();
// popup
togglePopUp();
//табы
tabs();
// слайдер
slider();
//Функция замены изображения по наведению на него мышкой
changeImage();
//Реализация калькулятора
calc(100);
//send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');