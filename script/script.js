'use strict';

const money = +prompt('Ваш месячный доход?'); // узнаем месячный доход и записываем в переменную money
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
/* спрашиваем о 
расходах и заносим в переменную addExpenses */
const deposit = confirm('Есть ли у вас депозит в банке?'); // узнаем о наличии депозита в банке и получаем true или false
const mission = 1000000;

// Создаём функцию для определия типа данных
const showTypeOf = function (data) {
    console.log(typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//Переведем строку расходов в массив
const arrExpenses = addExpenses.toLowerCase().split(',');

for (let i = 0; i < arrExpenses.length; i++) {
    arrExpenses[i] = arrExpenses[i].trim();
}

//Выведем возможные расходы
console.log('Возможные расходы: ', arrExpenses);

// Создадим функцию для создания массива с указанием Статьи расходов и её стоимости, где k - количество статей
const recordExpenses = function (k) {
    let obj = {};

    for (let i = 1; i <= k; i++) {
        let expenses = prompt('Введите обязательную статью расходов?');
        obj[expenses] = prompt('Во сколько это обойдется??');
    }
    return obj;
};

// получим значения "ключей" у объекта, в котором хранятся значения расходов
const expenses = Object.values(recordExpenses(2)); 

// Создадим функцию, которая суммирует всех обязательных расходов
const getExpensesMonth = function (array) {
    let result = 0;

    for (let i = 0; i < array.length; i++) {
        result += +array[i];
    }
    return result;
};

console.log('Сумма всех обязательных расходов: ', getExpensesMonth(expenses));

// Объявляем функцию, которая возвращает все накопления за месяц(доходы - расходы)
const getAccumulatedMonth = function(income, costs) {
    return income - costs;
};

// Объявляем переменную и присваиваем ей результат функции
const accumulatedMonth  = getAccumulatedMonth(money, getExpensesMonth(expenses));

//Объявляем функцию, подсчитывающая количество месяцев за который достигнем результат
const getTargetMonth = function() {
    if (accumulatedMonth === 0 || accumulatedMonth < 0) {
        return 'цель не будет достигнута пока не увеличите бюджет!';
    } else {
        return Math.ceil(mission / accumulatedMonth);
    }
};

//Выведем срок достижения цели
console.log('Срок достижения цели(в месяцаx): ' + getTargetMonth());

// Пересчитаем бюджет на день
const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

//Записываем конструкцию условий для определения уровня дохода по шкале GloAcademy =)
const getStatusIncome = function () {
    if (budgetDay > 1200) {
        return 'У вас высокий уровень дохода';
    } else if ((budgetDay >= 600) && (budgetDay <= 1200)) {
        return 'У вас средний уровень дохода';
    } else if ((budgetDay > 0) && (budgetDay < 600)) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};

console.log(getStatusIncome());