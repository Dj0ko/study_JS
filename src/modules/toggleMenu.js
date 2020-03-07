'use strict';

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

export default toggleMenu;