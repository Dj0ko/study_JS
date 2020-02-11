document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //получаем элементы
    const form = document.querySelector('.todo-control');
    const headerInput = document.querySelector('.header-input');
    const todoList = document.getElementById('todo');
    const completedList = document.getElementById('completed');
    // создаем объект
    let data = {
        todo: [],
        completed: []
    };
    // проверяем localStorage на наличие данных, если есть то записываем в объект Data
    if (localStorage.getItem('localData')) {
        data = JSON.parse(localStorage.getItem('localData'));
    }
    // Функция, которая рендерит объект data, если он не пустой
    function renderItemsForUpdate() {
        if (!data.todo.length && !data.completed.length) {
            return;
        } else {
            for (let i = 0; i < data.todo.length; i++) {
                renderItem(data.todo[i]);
            }
            for (let i = 0; i < data.completed.length; i++) {
                renderItem(data.completed[i], true);
            }
        }
    }
    // функция для добавления данных в localStorage
    function dataUpdateToLocals() {
        localStorage.setItem('localData', JSON.stringify(data));
        console.log(localStorage.getItem('localData'));
    }
    // функция, добавляющая элемент на страницу
    function addItem(text) {
        renderItem(text);
        headerInput.value = '';
        data.todo.push(text);

        dataUpdateToLocals();
    }
    // функция, удаляющая элемент 
    function itemRemove(elem) {
        const item = elem.parentNode.parentNode;
        const itemParent = item.parentNode;
        const id = itemParent.id;
        const text = item.textContent;

        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(text), 1);
        } else {
            data.completed.splice(data.todo.indexOf(text), 1);
        }

        itemParent.removeChild(item);

        dataUpdateToLocals();
    }
    // функция, которая переносит элемент в список выполненных дел
    function itemComplete(elem) {
        const item = elem.parentNode.parentNode;
        const itemParent = item.parentNode;
        const id = itemParent.id;
        const text = item.textContent;

        let target;

        if (id === 'todo') {
            target = completedList;
        } else {
            target = todoList;
        }

        if (id === 'todo') {
            data.todo.splice(data.todo.indexOf(text), 1);
            data.completed.push(text);
        } else {
            data.completed.splice(data.todo.indexOf(text), 1);
            data.todo.push(text);
        }

        itemParent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);

        dataUpdateToLocals();
    }
    // функция, которая рендерит один элемент
    function renderItem(text, completed = false) {
        const item = document.createElement('li');
        const todoButtons = document.createElement('div');
        const btnRemove = document.createElement('button');
        const btnComplete = document.createElement('button');

        let list;
        if(completed) {
            list = completedList;
        } else {
            list = todoList;
        }


        item.classList.add('todo-item');
        todoButtons.classList.add('todo-buttons');
        btnRemove.classList.add('todo-remove');
        btnComplete.classList.add('todo-complete');

        item.textContent = text;

        todoButtons.appendChild(btnRemove);
        todoButtons.appendChild(btnComplete);
        item.appendChild(todoButtons);

        btnRemove.addEventListener('click', function (event) {
            itemRemove(event.target);
        });

        btnComplete.addEventListener('click', function (event) {
            itemComplete(event.target);
        });

        list.insertBefore(item, list.childNodes[0]);

    }
    //обработчик события срабатывает, если в поле вводе что-то заполнено
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (headerInput.value !== '') {
            addItem(headerInput.value.trim());
        }
    });

    renderItemsForUpdate();
});