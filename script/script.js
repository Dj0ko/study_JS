'use strict';

let money = prompt('Ваш месячный доход?'); // узнаем месячный доход и записываем в переменную money
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
/* спрашиваем о 
расходах и заносим в переменную addExpenses */
let deposit = confirm('Есть ли у вас депозит в банке?'); // узнаем о наличии депозита в банке и получаем true или false
let mission = 1000000;
let period = 12;
let budgetDay = money / 30;

const showTypeOf = function (data) {
    console.log(typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
//Переведем строку расходов в массив
let arrExpenses = addExpenses.toLowerCase().split(',');

for (let i = 0; i < arrExpenses.length; i++) {
    arrExpenses[i] = arrExpenses[i].trim();
}

console.log(arrExpenses);
console.log('budgetDay: ', budgetDay);

console.log('money: ', money);
console.log('addExpenses: ', addExpenses);
console.log('deposit: ', deposit);

// Создадим функцию для создания массива с указанием Статьи расходов и её стоимости, где k - количество статей
const recordExpenses = function (k) {
    let obj = {};

    for (let i = 1; i <= k; i++) {
        let expenses = prompt('Введите обязательную статью расходов?');
        let amount = prompt('Во сколько это обойдется??');
        obj[expenses] = amount;
    }
    console.log(obj);
    return obj;
};

let expenseItems = recordExpenses(2); // записываем объект со значениями расходов в переменную expenses
let expenses = Object.values(expenseItems); // получим значения "ключей" у объекта

// Создадим функцию, которая суммирует всех обязательных расходов
const getExpensesMonth = function (array) {
    let result = 0;

    for (let i = 0; i < array.length; i++) {
        result += +array[i];
    }
    return result;

};

// Объявляем функцию, которая возвращает все накопления за месяц(доходы - расходы)
const getAccumulatedMonth = function(income, costs) {
    return income - costs;
};

// Объявляем переменную и присваиваем ей результат функции
let accumulatedMonth  = getAccumulatedMonth(money, getExpensesMonth(expenses));

//Объявляем функцию, подсчитывающая количество месяцев за который достигнем результат
const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
};

console.log(getTargetMonth());

// Пересчитаем бюджет на день
budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

//Записываем конструкцию условий для определения уровня дохода по шкале GloAcademy =)
let getStatusIncome = function () {
    switch (!!budgetDay) {
        case (budgetDay > 1200):
            console.log('У вас высокий уровень дохода');
            break;
        case ((budgetDay >= 600) && (budgetDay <= 1200)):
            console.log('У вас средний уровень дохода');
            break;
        case ((budgetDay > 0) && (budgetDay < 600)):
            console.log('К сожалению у вас уровень дохода ниже среднего');
            break;
        case (budgetDay <= 0):
            console.log('Что то пошло не так');
            break;
    }
};

getStatusIncome();