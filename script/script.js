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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 12,
    statusIncome: 0,
    asking: function () {
        //узнаем месячный доход
        appData.budget = start();
        
        //узнаем о дополнительном заработке
        if (confirm('Eсть ли у вас дополнительный заработок?')) {
            
            let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
            /*Введём проверку чтоб вводимое значение было типом строка, строчка была не пустой
            и не была введена "подсказка"*/
            while (isNumber(itemIncome) || itemIncome.trim() === '' || itemIncome === 'Введите текст') {
                itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Введите текст');
            }
            appData.income[itemIncome] = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            //Введем проверку чтоб вводимое значение было типом число
            while (!isNumber(appData.income[itemIncome])) {
                appData.income[itemIncome] = prompt('Сколько в месяц зарабатываете на этом?', 'Введите число');
            }
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
            let itemExpenses = prompt('Введите обязательную статью расходов?');
            /*Введём проверку чтоб вводимое значение было типом строка, строчка была не пустой
            и не была введена "подсказка"*/
            while (isNumber(itemExpenses) || itemExpenses.trim() === ''|| itemExpenses === 'Введите текст') {
                itemExpenses = prompt('Введите обязательную статью расходов?', 'Введите текст');
            }
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
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', 'Введите число');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какой годовой процент?', 'Введите число');
            }
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();

console.log(appData.addExpenses);
for (let item in appData.addExpenses) {
    item[0].toUpperCase() + item.slice(1);
}

console.log(appData.addExpenses.join(', '));

