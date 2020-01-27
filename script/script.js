'use strict';

let money = prompt('Ваш месячный доход?'); // узнаем месячный доход и записываем в переменную money
let income = 'фриланс'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); /* спрашиваем о 
расходах и заносим в переменную addExpenses */
let deposit = confirm('Есть ли у вас депозит в банке?'); // узнаем о наличии депозита в банке и получаем true или false
let mission = 1000000; 
let period = 12;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
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

// Создадим функцию, которая суммирует все расходы
const doAddition = function (array) {
    let result = 0;

    for (let i = 0; i < array.length; i++) {
        result += +array[i];
    }
    return result;

};

let totalExpenses = doAddition(expenses); //создадим переменную для записи всех расходов

// Вычисляем бюджет на месяц = месячный доход - обязательные траты
let budgetMonth = money - totalExpenses;
console.log('Бюджет на месяц: ', budgetMonth);

//Вычисляем количество месяцев для достижения цели
let months = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за ' + months + ' месяцев');

// Пересчитаем бюджет на день
budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

//Записываем конструкцию условий для определения уровня дохода по шкале GloAcademy =)
switch (!!budgetDay) {
    case (budgetDay > 1200):
        console.log('У вас высокий уровень дохода1');
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