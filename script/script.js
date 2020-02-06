'use strict';

const books = document.querySelector('.books'), //получаем доступ к элементу, в котором хранятся все книги
      //получаем коллекцию книг
      collect = books.querySelectorAll('.book'),
      //получаем доступ к элементу body 
      body = document.querySelector('body'),
      //получаем доступ к заголовку 3 книги
      title = collect[4].querySelector('h2'),
      //получаем дочерние элементы body
      bodyChildren = body.children;
//ставим первую книгу перед второй
books.insertBefore(collect[1], collect[0]); 
//Ставим 6 книгу в конец списка
books.appendChild(collect[2]);
//ставим третью книгу перед четвертой
books.insertBefore(collect[4], collect[3]); 
//в body изменяем аттрибут style именяем картинку фона
body.setAttribute('style', 'background-image: url(image/you-dont-know-js.jpg)');
//меняем текст заголовка
title.textContent = 'Книга 3. this и Прототипы Объектов'; 
//удаляем рекламу
body.removeChild(bodyChildren[2]);
//получаем доступ к коллекции глав
const ul = document.querySelectorAll('ul');
//получаем доступ к главам второй книги
let chapters = ul[1].querySelectorAll('li');
//Приводит в соответствие порядок глав
ul[1].insertBefore(chapters[6], chapters[4]);
ul[1].insertBefore(chapters[8], chapters[4]);
ul[1].insertBefore(chapters[2], chapters[10]);

//получаем доступ к главам пятой книги
chapters = ul[4].querySelectorAll('li');
//Приводит в соответствие порядок глав
ul[4].insertBefore(chapters[9], chapters[3]);
ul[4].insertBefore(chapters[8], chapters[10]);
ul[4].insertBefore(chapters[5], chapters[8]);
ul[4].insertBefore(chapters[2], chapters[6]);

//создаём элемент
const newItem = document.createElement('li');
//вставляем элемент в 6 книгу
ul[5].appendChild(newItem);
//Заполняем текстовое содержимое
newItem.textContent = 'Глава 8: За пределами ES6';
//получаем доступ к главам шестой книги
chapters = ul[5].querySelectorAll('li');
//Ставим элемент в соответствие с порядком глав
ul[5].insertBefore(chapters[10], chapters[9]);






