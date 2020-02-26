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
        //получаем доступ к кнопке "Меню"
        const btnMenu = document.querySelector('.menu'),
            //получаем доступ к блоку меню
            menu = document.querySelector('menu');

        //Функция для октрытия/закрытия меню через переключение класса
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }
        //Вешаем обработчик события на кнопку "Меню" для открытия и закрытия меню
        btnMenu.addEventListener('click', handlerMenu);
        //при помощи делигирования закрываем меню если кликнули на крестик или пункт меню
        menu.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('close-btn')) {
                handlerMenu();
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

    // слайдер

    const slider = () => {
        // получаем элементы со страницы
        const slide = document.querySelectorAll('.portfolio-item'),
            dotsList = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        //функция добавления точек
        const addDots = () => {
            slide.forEach((index) => {
                const li = document.createElement('li');
                li.classList.add('dot');
                dotsList.appendChild(li);
                //первому элементу добавляем класс dot-active
                if (index === 0) {
                    li.classList.add('dot-active');
                }
            });
        };
        addDots();
        // получаем все точки
        const dot = document.querySelectorAll('.dot');
        

        //задаём номер слайда
        let currentSlide = 0,
            interval;
        // функция переключения на предыдущий слайд
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        // функция переключения на следующий слайд
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        // функция для автопереключения слайдов
        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        // функция старта запуска слайдов
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        // функция остановки показа слайдов
        const stopSlide = () => {
            clearInterval(interval);
        };
        // обработчик события для переключения слайдов по кнопкам или точкам
        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('#arrow-right, #arrow-left, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        // обработчик события для наведения на кнопки или точки
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        // обработчик события после вывода курсора с кнопкок или точек
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    };

    slider();
});