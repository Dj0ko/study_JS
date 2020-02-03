'use strict';
/*создаем функцию, для проверки что введено число, где 
parseFloat - приведение к числу с плавающей запятой
isFinite - проверка для определения является ли число конечным */
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Создаем функцию для ввода месячного дохода
let money,
    start = function () {
      do {
        money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));
    };

start();

//Создадим объект с исходными переменными
let appData = {
  budget: start(),
  income: {}, //дополнительные доходы
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  peroid: 12,
  asking: function() {
    //спрашиваем о расходах и заносим в переменную addExpenses
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = fixStrings(addExpenses);
    appData.deposit = confirm('Есть ли у вас депозит в банке?'); /* узнаем о наличии депозита в банке
    и получаем true или false*/
  }
};

//Переведем строку расходов в массив
// const arrExpenses = addExpenses.toLowerCase().split(',');

// for (let i = 0; i < arrExpenses.length; i++) {
//   arrExpenses[i] = arrExpenses[i].trim();
// }

// //Выведем возможные расходы
// console.log('Возможные расходы: ', arrExpenses);

// Создадим функцию для приведения в нижний регист и разбития строк в массив, с удалением лишних пробелов
function fixStrings(array) {
  const arr = array.toLowerCase().split(',');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }

  return arr;
}

// Создадим функцию для создания массива с указанием Статьи расходов и её стоимости, где k - количество статей
const recordExpenses = function (k) {
  let obj = {};

  for (let i = 1; i <= k; i++) {
    let expenses = prompt('Введите обязательную статью расходов?');
    //Введем проверку чтоб вводимое значение было типом данных число
    while (!isNumber(obj[expenses])) {
      obj[expenses] = prompt('Во сколько это обойдется??', "Введите число");
    }
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
const getAccumulatedMonth = function (income, costs) {
  return income - costs;
};

// Объявляем переменную и присваиваем ей результат функции
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(expenses));

//Объявляем функцию, подсчитывающая количество месяцев за который достигнем результат
const getTargetMonth = function () {
  if (accumulatedMonth < 0) {
    return 'Цель не будет достигнута';
  } else {
    return Math.ceil(appData.mission / accumulatedMonth);
  }
};

//Выведем срок достижения цели
console.log('Срок достижения цели(в месяцаx): ' + getTargetMonth());

// Пересчитаем бюджет на день
const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

//Записываем конструкцию условий для определения уровня дохода по шкале GloAcademy =)
const getStatusIncome = function (data) {
  if (data > 1200) {
    return 'У вас высокий уровень дохода';
  } else if ((data >= 600) && (data <= 1200)) {
    return 'У вас средний уровень дохода';
  } else if ((data >= 0) && (data < 600)) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так';
  }
};

console.log(getStatusIncome(budgetDay));