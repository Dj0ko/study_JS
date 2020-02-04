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
    //спрашиваем о возможных расходах
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = fixStrings(addExpenses);
    //узнаем о наличии депозита в банке и получаем true или false
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    //спрашиваем об обязательных расходах 
    appData.expenses = recordExpenses(2);
  }
};

appData.asking();

//Функцию getExpensesMonth делаем методом объекта addData
appData.expensesMonth = getExpensesMonth;
// Записываем полученное значение в объект
appData.expensesMonth = appData.expensesMonth(appData.expenses);

//Функцию getBudget делаем методом объекта addData
appData.budgetMonth = getBudget;
// Записываем полученные значение в объект
appData.budgetMonth();

//Функцию getTargetMonth делаем методом объекта addData
appData.period = getTargetMonth;
// Записываем полученные значение в объект
appData.period = appData.period();

//Функцию getStatusIncome делаем методом объекта addData
appData.statusIncome = getStatusIncome;
// Записываем полученные значение в объект
appData.statusIncome = appData.statusIncome(appData.budgetDay);

console.log(appData.expenses);
console.log(appData.period);
console.log(appData.statusIncome);

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log('Свойство: ' + key + ', значение свойства: ' + appData[key]);
}

/*----------------------------------------------------------------------------------------------------------------*/
// Функция для приведения в нижний регист и разбития строк в массив, с удалением лишних пробелов
function fixStrings(array) {
  const arr = array.toLowerCase().split(',');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }

  return arr;
}

// Функция для создания массива с указанием Статьи расходов и её стоимости, где k - количество статей
function recordExpenses(k) {
  let obj = {};

  for (let i = 1; i <= k; i++) {
    const expenses = prompt('Введите обязательную статью расходов?');
    //Введем проверку чтоб вводимое значение было типом данных число
    while (!isNumber(obj[expenses])) {
      obj[expenses] = prompt('Во сколько это обойдется??', "Введите число");
    }
  }
  return obj;
}

// Функция, суммирующая все обязательные расходы
function getExpensesMonth(obj) {
  let result = 0;

  for (let key in obj) {
    result += +obj[key];
  }
  return result;
}

//Функция, считающая месячный бюджет и дневной
function getBudget() {
  appData.budgetMonth = appData.budget - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth / 30);
}

//Функция, подсчитывающая количество месяцев за который достигнем результат
function getTargetMonth() {
  if (appData.budgetMonth < 0) {
    return 'Цель не будет достигнута';
  } else {
    return Math.ceil(appData.mission / appData.budgetMonth);
  }
}

//Функция для определения уровня дохода по шкале GloAcademy =)
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