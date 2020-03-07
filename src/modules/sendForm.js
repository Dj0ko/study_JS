const sendForm = (id) => {
    //создаем сообщения
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

    //получаем форму
    const form = document.getElementById(id);
    // создаём элемент, который будем добавлять на страницу
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem;
                                   color: white;`;

    //функция запроса на сервер
    const postData = (body) => {
        // fetch
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    form.addEventListener('submit', (event) => {
        //отменяем стандартное поведение, для отмены перезагрузки страницы
        event.preventDefault();
        // добавляем элемент
        form.appendChild(statusMessage);
        //добавляем сообщение о начале загрузки
        statusMessage.textContent = loadMessage;
        // создаем объект FormData, считывающий все данные с формы и имеющий аттрибут name
        const formData = new FormData(form);
        //записываем данные в объект
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                statusMessage.textContent = successMessage;
                form.reset();
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            });
    });

    // Валидация данных
        //получаем все инпуты формы
        const inputs = form.querySelectorAll('input');
        //перебираем их
        inputs.forEach(elem => {
            elem.addEventListener('input', () => {
                //если инпут с type='text', то запрещаем ввод любых символов кроме Кириллицы и пробелов
                if (elem.type === 'text') {
                    elem.value = elem.value.replace(/[^а-яА-Я ]/, '');
                }
                //если инпут с type='tel', то разрешаем ввод только цифр и знака "+"
                if (elem.type === 'tel') {
                    elem.value = elem.value.replace(/[^\+\d]/, '');
                }
            });
        });
};

export default sendForm;
