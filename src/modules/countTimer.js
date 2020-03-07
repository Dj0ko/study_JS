function countTimer() {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    //установим дедлайн, который всегда больше текущего времени на 10 минут
    let deadline = new Date(new Date().setMinutes(new Date().getMinutes() + 10));

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
};

export default countTimer;