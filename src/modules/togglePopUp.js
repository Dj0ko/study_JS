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
    window.addEventListener('resize', () => {
        console.log('innerWidth: ', innerWidth);
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
    });
    // if (innerWidth >= 768) {
    //     // реализуем открытие popup окна c помощью анимации
    //     popUpBtn.forEach((elem) => {
    //         elem.addEventListener('click', () => {
    //             openPopUp = requestAnimationFrame(popUpAnimateOpen);
    //         });
    //     });

    //     // реализуем закрытие popup окна на крестик или если кликнули мимо окна
    //     popup.addEventListener('click', (event) => {
    //         let target = event.target;

    //         if (target.classList.contains('popup-close')) {
    //             closePopUp = requestAnimationFrame(popUpAnimateClose);
    //         } else {
    //             target = target.closest('.popup-content');

    //             if (!target) {
    //                 closePopUp = requestAnimationFrame(popUpAnimateClose);
    //             }
    //         }

    //     });
    // } else {
    //     // Открытие popUp окна если ширина экрана меньше 768
    //     popUpBtn.forEach((elem) => {
    //         elem.addEventListener('click', () => {
    //             popup.style.display = 'block';
    //         });
    //     });

    //     // Закрытие popUp окна если ширина экрана меньше 768
    //     popup.addEventListener('click', (event) => {
    //         let target = event.target;

    //         if (target.classList.contains('popup-close')) {
    //             popup.style.display = 'none';
    //         } else {
    //             target = target.closest('.popup-content');

    //             if (!target) {
    //                 popup.style.display = 'none';
    //             }
    //         }

    //     });
    // }
};

export default togglePopUp;