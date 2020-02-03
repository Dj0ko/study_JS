'use strict';
/*создаем функцию, для проверки что введено число, где 
parseFloat - приведение к числу с плавающей запятой
isFinite - проверка для определения является ли число конечным */
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Создаем функцию для ввода месячного дохода
let money;
function start() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
}

start();

//Создадим объект с исходными переменными
let appData = {
  budget: +money,
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
  asking: function() {
    //спрашиваем о расходах и заносим в переменную addExpenses
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = fixStrings(addExpenses);
    appData.deposit = confirm('Есть ли у вас депозит в банке?'); /* узнаем о наличии депозита в банке
    и получаем true или false*/
    appData.expenses = recordExpenses(2);
  }
};

appData.asking();

// Создадим функцию для приведения в нижний регист и разбития строк в массив, с удалением лишних пробелов
function fixStrings(array) {
  const arr = array.toLowerCase().split(',');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }

  return arr;
}

// Создадим функцию для создания массива с указанием Статьи расходов и её стоимости, где k - количество статей
function recordExpenses(k) {
  let obj = {};

  for (let i = 1; i <= k; i++) {
    let expenses = prompt('Введите обязательную статью расходов?');
    //Введем проверку чтоб вводимое значение было типом данных число
    while (!isNumber(obj[expenses])) {
      obj[expenses] = prompt('Во сколько это обойдется??', "Введите число");
    }
  }
  return obj;
}

// Создадим функцию, которая суммирует все обязательные расходы
function getExpensesMonth(obj) {
  let result = 0;

  for (let key in obj) {
    result += +obj[key];
  }
  return result;
}

// Делаем функцию методом объекта appData
appData.expensesMonth = getExpensesMonth(appData.expenses);

// Объявляем функцию, которая возвращает все накопления за месяц(доходы - расходы)
function getBudget(income, costs) {
  return income - costs;
}

//Делаем функцию методом объекта appData
appData.budgetMonth = getBudget(appData.budget, appData.expensesMonth);

//Объявляем функцию, подсчитывающая количество месяцев за который достигнем результат
function getTargetMonth() {
  if (appData.budgetMonth < 0) {
    return 'Цель не будет достигнута';
  } else {
    return Math.ceil(appData.mission / appData.budgetMonth);
  }
}

//Делаем функцию методом объекта appData
appData.period = getTargetMonth();

// Пересчитаем бюджет на день
appData.budgetDay = Math.floor(appData.budgetMonth / 30);

//Записываем конструкцию условий для определения уровня дохода по шкале GloAcademy =)
function getStatusIncome(data) {
  if (data > 1200) {
    return 'У вас высокий уровень дохода';
  } else if ((data >= 600) && (data <= 1200)) {
    return 'У вас средний уровень дохода';
  } else if ((data >= 0) && (data < 600)) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так';
  }
}

//Делаем функцию методом объекта appData
appData.statusIncome = getStatusIncome(appData.budgetDay);

console.log(appData.expenses);
console.log(appData.period);
console.log(appData.statusIncome);

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' ' + appData[key]);
}