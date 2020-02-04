'use strict';
/*создаем функцию, для проверки что введено число, где 
parseFloat - приведение к числу с плавающей запятой
isFinite - проверка для определения является ли число конечным */
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//Создаем функцию для ввода месячного дохода
function start() {
    let money;
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
    return money;
}
// debugger;
//Создадим объект с исходными переменными
const appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 12,
    statusIncome: 0,
    asking: function () {
        //узнаем месячный доход
        appData.budget = start();
        //узнаем о дополнительном заработке
        if (true) {
            let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
            appData.income[itemIncome] = prompt('Сколько в месяц зарабатываете на этом?', 10000);
        }
        //спрашиваем о возможных расходах
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        if (addExpenses) {
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            for (let i = 0; i < appData.addExpenses.length; i++) {
                appData.addExpenses[i] = appData.addExpenses[i].trim();
            }
        } else {
            addExpenses = '';
        }
        // узнаем о наличии депозита в банке и получаем true или false
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        //спрашиваем об обязательных расходах 
        for (let i = 1; i <= 2; i++) {
            const itemExpenses = prompt('Введите обязательную статью расходов?');
            //Введем проверку чтоб вводимое значение было типом данных число
            while (!isNumber(appData.expenses[itemExpenses])) {
                appData.expenses[itemExpenses] = prompt('Во сколько это обойдется??', "Введите число");
            }
        }
    },
    getExpensesMonth: function () { //метод, вычисляющий сумму всех обязательных расходов
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () { //Метод, вычисляющий месячный и дневной бюджеты
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () { //Метод , считающий количество месяцев до достижения цели
        if (appData.budgetMonth < 0) {
            return 'Цель не будет достигнута';
        } else {
            return Math.ceil(appData.mission / appData.budgetMonth);
        }
    },
    getStatusIncome: function () { //Метод , определяющий уровень дохода
        if (appData.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if ((appData.budgetDay >= 600) && (appData.budgetDay <= 1200)) {
            return 'У вас средний уровень дохода';
        } else if ((appData.budgetDay >= 0) && (appData.budgetDay < 600)) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth());
console.log('Уровень дохода: ' + appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log('Свойство: ' + key + ', значение свойства: ' + appData[key]);
}