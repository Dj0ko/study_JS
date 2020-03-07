'use strict';

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
    // реализуем открытие popup окна c помощью анимации если ширина окна больше 768
    popUpBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (innerWidth >= 768) {
                openPopUp = requestAnimationFrame(popUpAnimateOpen);
            } else {
                popupContent.style.top = 10 + '%';
                popup.style.display = 'block';
            }
        });
    });

    // реализуем закрытие popup окна на крестик или если кликнули мимо окна
    popup.addEventListener('click', (event) => {
        if (innerWidth >= 768) {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                closePopUp = requestAnimationFrame(popUpAnimateClose);
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    closePopUp = requestAnimationFrame(popUpAnimateClose);
                }
            }
        } else {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                }
            }
        }
    });
};

export default togglePopUp;