'use strict';
const calculate = document.getElementById('start'),//получаем кнопку "Рассчитать"
      plusIncome = document.getElementsByTagName('button')[0],//получаем первый "+"
      plusExpenses = document.getElementsByTagName('button')[1],//получаем второй "+"
      checkBoxDeposit = document.querySelector('#deposit-check'),// получаем кнопку чекбокса "Депозит"
      fieldAddIncome = document.querySelectorAll('.additional_income-item'),//получаем поля ввода "Возможный доход"
      budgetMonthValue = document.querySelectorAll('.result-total')[0],//получаем поле вывода "Доход за месяц"
      budgetDayValue = document.querySelectorAll('.result-total')[1],//получаем поле вывода "Дневной бюджет"
      expensesMonthValue = document.querySelectorAll('.result-total')[2],//получаем поле вывода "Расход за месяц"
      additionalIncomeValue = document.querySelectorAll('.result-total')[3],//получаем поле вывода "Возможные доходы"
      additionalExpensesValue = document.querySelectorAll('.result-total')[4],//получаем поле вывода "Возможные расходы"
      incomePeriodValue = document.querySelectorAll('.result-total')[5],//получаем поле вывода "Накопления за период"
      targetMonthValue = document.querySelectorAll('.result-total')[6],/*получаем поле вывода "Срок достижения цели
      в месяцах"*/
      salaryAmount = document.querySelector('.salary-amount'),//получаем поле ввода "Месячный доход"
      incomeTitle = document.querySelector('.income-title'),//получаем поле наименования "Дополнительный доход"
      incomeAmount = document.querySelector('.income-amount'),//получаем поле суммы "Дополнительный доход"
      expensesTitle = document.querySelector('.expenses-title'),//получаем поле наименования "Обязательные расходы"
      expensesAmount = document.querySelector('.expenses-amount'),//получаем поле суммы "Обязательные расходы"
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),/*получаем поле ввода 
      "Возможны расходы"*/
      targetAmount = document.querySelector('.target-amount'),//получаем поле ввода "Цель"
      periodSelect = document.querySelector('.period-select');//получаем диапазон "Период расчета"



// /*создаем функцию, для проверки что введено число, где 
// parseFloat - приведение к числу с плавающей запятой
// isFinite - проверка для определения является ли число конечным */
// const isNumber = function (n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };

// //Создаем функцию для ввода месячного дохода
// function start() {
//     let money;
//     do {
//         money = prompt('Ваш месячный доход?');
//     } while (!isNumber(money));
//     return money;
// }

// //Создадим объект с исходными переменными
// const appData = {
//     budget: 0,
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 1000000,
//     period: 12,
//     statusIncome: 0,
//     asking: function () {
//         //узнаем месячный доход
//         appData.budget = start();

//         //узнаем о дополнительном заработке
//         if (confirm('Eсть ли у вас дополнительный заработок?')) {
//             let itemIncome;
//             do {
//                 itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Введите текст');
//                 //Если отмена то переходим к вопросу о возможных расходах
//                 if (!itemIncome) {
//                     break;
//                 }
//             } while (isNumber(itemIncome) || itemIncome.trim() === '' || itemIncome === 'Введите текст');

//             if (itemIncome) {
//                 do {
//                     appData.income[itemIncome] = prompt('Сколько в месяц зарабатываете на этом?', 'Введите число');
//                     //Если отмена то переходим к вопросу о возможных расходах
//                     if (!appData.income[itemIncome]) {
//                         appData.income = {};
//                         break;
//                     }
//                 } while (!isNumber(appData.income[itemIncome]));
//             }
//         }
//         //спрашиваем о возможных расходах
//         let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//         if (addExpenses) {
//             appData.addExpenses = addExpenses.toLowerCase().split(',');
//             for (let i = 0; i < appData.addExpenses.length; i++) {
//                 appData.addExpenses[i] = appData.addExpenses[i].trim();
//             }
//         } else {
//             addExpenses = '';
//         }
//         // узнаем о наличии депозита в банке и получаем true или false
//         appData.deposit = confirm('Есть ли у вас депозит в банке?');
//         //спрашиваем об обязательных расходах 
//         for (let i = 1; i <= 2; i++) {
//             let itemExpenses = prompt('Введите обязательную статью расходов?');
//             /*Введём проверку чтоб вводимое значение было типом строка, строчка была не пустой
//             и не была введена "подсказка"*/
//             while (isNumber(itemExpenses) || itemExpenses === null || itemExpenses.trim() === '' || itemExpenses === 'Введите текст') {
//                 itemExpenses = prompt('Введите обязательную статью расходов?', 'Введите текст');
//             }
//             //Введем проверку чтоб вводимое значение было типом данных число
//             while (!isNumber(appData.expenses[itemExpenses])) {
//                 appData.expenses[itemExpenses] = prompt('Во сколько это обойдется??', "Введите число");
//             }
//         }
//     },
//     getExpensesMonth: function () { //метод, вычисляющий сумму всех обязательных расходов
//         for (let key in appData.expenses) {
//             appData.expensesMonth += +appData.expenses[key];
//         }
//     },
//     getBudget: function () { //Метод, вычисляющий месячный и дневной бюджеты
//         appData.budgetMonth = appData.budget - appData.expensesMonth;
//         appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//     },
//     getTargetMonth: function () { //Метод , считающий количество месяцев до достижения цели
//         if (appData.budgetMonth < 0) {
//             return 'Цель не будет достигнута';
//         } else {
//             return Math.ceil(appData.mission / appData.budgetMonth);
//         }
//     },
//     getStatusIncome: function () { //Метод , определяющий уровень дохода
//         if (appData.budgetDay > 1200) {
//             return 'У вас высокий уровень дохода';
//         } else if ((appData.budgetDay >= 600) && (appData.budgetDay <= 1200)) {
//             return 'У вас средний уровень дохода';
//         } else if ((appData.budgetDay >= 0) && (appData.budgetDay < 600)) {
//             return 'К сожалению у вас уровень дохода ниже среднего';
//         } else {
//             return 'Что то пошло не так';
//         }
//     },
//     getInfoDeposit: function () {
//         if (appData.deposit) {
//             do {
//                 appData.percentDeposit = prompt('Какой годовой процент?', 'Введите число');
//                 if (!appData.percentDeposit) {
//                     appData.percentDeposit = 0;
//                     break;
//                 }
//             } while (!isNumber(appData.percentDeposit));

//             if (appData.percentDeposit) {
//                 do {
//                     appData.moneyDeposit = prompt('Какая сумма заложена?', 'Введите число');
//                     if (!appData.moneyDeposit) {
//                         appData.percentDeposit = 0;
//                         appData.moneyDeposit = 0;
//                         break;
//                     }
//                 } while (!isNumber(appData.moneyDeposit));
//             }
//         }
//     },
//     calcSavedMoney: function () {
//         return appData.budgetMonth * appData.period;
//     }
// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getInfoDeposit();

// console.log('Расходы за месяц: ' + appData.expensesMonth);
// console.log('За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth());
// console.log('Уровень дохода: ' + appData.getStatusIncome());

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//     console.log('Свойство: ' + key + ', значение свойства: ' + appData[key]);
// }

// for (let i = 0; i < appData.addExpenses.length; i++) {
//     if (appData.addExpenses[i]) {
//         appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);
//     } else {
//         appData.addExpenses = [];
//     }
// }
// console.log(appData.addExpenses.join(', '));