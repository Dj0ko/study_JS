'use strict';

const changeImage = () => {
    // получаем все изображения
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach((elem) => {
        // получаем ссылку на изображения по умолчанию
        let currentImage = elem.src;

        // обработчик события: при наведении меняем изображение
        elem.addEventListener('mouseenter', (event) => {
            event.target.src = event.target.dataset.img;
        });
        // обработчик события: если убираем курсор, то возвращаем изображение по умолчанию
        elem.addEventListener('mouseleave', (event) => {
            event.target.src = currentImage;
        });
    });

};

export default changeImage;
