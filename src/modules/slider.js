'use strict';

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

export default slider;
