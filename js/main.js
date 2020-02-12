document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const body = document.querySelector('body');

    function DomElement(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    DomElement.prototype.createElement = function () {
        if (this.selector[0] === '.') {
            const div = document.createElement('div');
            div.classList.add('block');
            div.textContent = 'Вы добавили div!';
            body.insertBefore(div, body.childNodes[0]);
            div.style.cssText = `
                 height: ${this.height + 'px'};
                 width: ${this.width + 'px'};
                 background-color: ${this.bg};
                 font-size: ${this.fontSize + 'px'};`;
        } else if (this.selector[0] === '#') {
            const par = document.createElement('p');
            par.setAttribute('id', 'best');
            par.textContent = 'Вы добавили p!';
            body.insertBefore(par, body.childNodes[0]);
            par.style.cssText = `
            height: ${this.height + 'px'};
            width: ${this.width + 'px'};
            background-color: ${this.bg};
            font-size: ${this.fontSize + 'px'};`;
        }
    };

    let newDiv = new DomElement('.asd', '40', '200', 'green', '20');
    let newPar = new DomElement('#asd', '30', '400', 'red', '28');

    newDiv.createElement();
    newPar.createElement();
});