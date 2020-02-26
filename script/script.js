window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Функция таймера
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


        // Функция, возвращающая часы, минуты и секунды
        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        //Функция для добавления 0 перед значениями состоящими из одной цифры
        function addZero(data) {
            if (String(data).length === 1) {
                return '0' + data;
            } else {
                return data;
            }
        }

        // Функция обновления таймера
        function updateClock() {
            const timer = getTimeRemaining();

            if (timer.timeRemaining > 0) {
                timerHours.textContent = addZero(timer.hours);
                timerMinutes.textContent = addZero(timer.minutes);
                timerSeconds.textContent = addZero(timer.seconds);
            } else {
                clearInterval(updateTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        const updateTimer = setInterval(updateClock, 0);
    }

    countTimer('25 february 2020');

    //меню
    const toggleMenu = () => {
        //получаем доступ к блоку меню и к body
        const body = document.querySelector('body'),
            menu = document.querySelector('menu');

        //Функция для октрытия/закрытия меню через переключение класса
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }
        //Вешаем обработчик события для открытия и закрытия меню
        body.addEventListener('click', (event) => {
            let target = event.target;
            console.log('target: ', target);

            if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.classList.contains('close-btn') || !target.closest('menu')) {
                menu.classList.remove('active-menu');
            } else {
                target = target.closest('li');

                if (target) {
                    handlerMenu();
                }
            }
        });
    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        // получаем доступ к popUp окну
        const popup = document.querySelector('.popup'),
            //получаем доступ к содержимому popUp окна
            popupContent = document.querySelector('.popup-content'),
            // получаем доступ к кнопкам
            popUpBtn = document.querySelectorAll('.popup-btn');
        let count = -100,
            openPopUp,
            closePopUp;

        //Анимация открытия popUp
        const popUpAnimateOpen = () => {
            openPopUp = requestAnimationFrame(popUpAnimateOpen);
            popup.style.display = 'block';
            if (count < 100) {
                count += 15;
                popupContent.style.top = count + 'px';
            } else {
                cancelAnimationFrame(openPopUp);
            }
        };

        //Анимация закрытия popUp
        const popUpAnimateClose = () => {
            closePopUp = requestAnimationFrame(popUpAnimateClose);
            setTimeout(() => {
                popup.style.display = 'none';
            }, 800);
            if (count > -400) {
                count -= 10;
                popupContent.style.top = count + 'px';
            } else {
                cancelAnimationFrame(closePopUp);
            }
        }
        if (innerWidth >= 768) {
            // реализуем открытие popup окна c помощью анимации
            popUpBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    openPopUp = requestAnimationFrame(popUpAnimateOpen);
                });
            });

            // реализуем закрытие popup окна на крестик или если кликнули мимо окна
            popup.addEventListener('click', (event) => {
                let target = event.target;

                if (target.classList.contains('popup-close')) {
                    closePopUp = requestAnimationFrame(popUpAnimateClose);
                } else {
                    target = target.closest('.popup-content');

                    if (!target) {
                        closePopUp = requestAnimationFrame(popUpAnimateClose);
                    }
                }

            });
        } else {
            // Открытие popUp окна если ширина экрана меньше 768
            popUpBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                });
            });

            // Закрытие popUp окна если ширина экрана меньше 768
            popup.addEventListener('click', (event) => {
                let target = event.target;

                if (target.classList.contains('popup-close')) {
                    popup.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');

                    if (!target) {
                        popup.style.display = 'none';
                    }
                }

            });
        }
    };

    togglePopUp();

    //табы
    const tabs = () => {
        //получаем необходимые элементы
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        //функция для показа/скрытие выбранных табов
        const toogleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toogleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});