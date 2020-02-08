'use strict';
let calculate = document.getElementById('start'), //получаем кнопку "Рассчитать"
	//Получаем коллекцию кнопок
	pluses = document.getElementsByTagName('button'),
	//получаем первый "+"
	plusIncome = pluses[0],
	//получаем второй "+"
	plusExpenses = pluses[1],
	// получаем кнопку чекбокса "Депозит"
	checkBoxDeposit = document.querySelector('#deposit-check'),
	//получаем поля ввода "Возможный доход"
	fieldAddIncome = document.querySelectorAll('.additional_income-item'),
	//Получаем коллекцию полей вывода
	fieldsOutput = document.querySelectorAll('.result-total'),
	//получаем поле вывода "Доход за месяц"
	budgetMonthValue = fieldsOutput[0],
	//получаем поле вывода "Дневной бюджет"
	budgetDayValue = fieldsOutput[1],
	//получаем поле вывода "Расход за месяц"
	expensesMonthValue = fieldsOutput[2],
	//получаем поле вывода "Возможные доходы"
	additionalIncomeValue = fieldsOutput[3],
	//получаем поле вывода "Возможные расходы"
	additionalExpensesValue = fieldsOutput[4],
	//получаем поле вывода "Накопления за период"
	incomePeriodValue = fieldsOutput[5],
	//получаем поле вывода "Срок достижения цели в месяцах"
	targetMonthValue = fieldsOutput[6],
	//получаем поле ввода "Месячный доход"
	salaryAmount = document.querySelector('.salary-amount'),
	//получаем поля "Дополнительный доход"
	incomeItems = document.querySelectorAll('.income-items'),
	// //получаем поле наименования "Дополнительный доход"
	// incomeTitle = document.querySelector('.income-title'),
	//получаем поле суммы "Обязательные расходы"
	expensesItems = document.querySelectorAll('.expenses-items'),
	//получаем поле ввода "Возможные расходы"
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	//получаем поле ввода "Цель"
	targetAmount = document.querySelector('.target-amount'),
	//получаем диапазон "Период расчета"
	periodSelect = document.querySelector('.period-select'),
	//получаем поля дополнительных расходов
	incomeItem = document.querySelectorAll('.income-items');
	console.log('incomeItems: ', incomeItems);
// Выводим полученные значения в консоль
// console.log('calculate: ', calculate);
// console.log('plusIncome: ', plusIncome);
// console.log('plusExpenses: ', plusExpenses);
// console.log('checkBoxDeposit: ', checkBoxDeposit);
// console.log('fieldAddIncome: ', fieldAddIncome);
// console.log('budgetMonthValue: ', budgetMonthValue);
// console.log('budgetDayValue: ', budgetDayValue);
// console.log('expensesMonthValue: ', expensesMonthValue);
// console.log('additionalIncomeValue: ', additionalIncomeValue);
// console.log('additionalExpensesValue: ', additionalExpensesValue);
// console.log('incomePeriodValue: ', incomePeriodValue);
// console.log('targetMonthValue: ', targetMonthValue);
// console.log('salaryAmount: ', salaryAmount);
// console.log('incomeTitle: ', incomeTitle);
// console.log('incomeAmount: ', incomeAmount);
// console.log('expensesAmount: ', expensesAmount);
// console.log('additionalExpensesItem: ', additionalExpensesItem);
// console.log('targetAmount: ', targetAmount);
// console.log('periodSelect: ', periodSelect);


/*создаем функцию, для проверки что введено число, где 
parseFloat - приведение к числу с плавающей запятой
isFinite - проверка для определения является ли число конечным */
const isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

//Создадим объект с исходными переменными
const appData = {
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	statusIncome: 0,
	//Создаем функцию для ввода месячного дохода
	start: function () {
		//проверяем чтоб введёное значение было числом
		while (!isNumber(salaryAmount.value)) {
			alert('Ошибка, в поле "Месячный доход" должна быть вбита сумма!');
			return;
		}
		//записываем в объект введённое значение
		appData.budget = +salaryAmount.value;

		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();

		appData.showResult();
	},
	showResult: function () {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		incomePeriodValue.value = appData.calcPeriod();
	},
	addExpensesBlock: function () {
		let cloneexpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneexpensesItem, plusExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			plusExpenses.style.display = 'none';
		}
	},
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;

			if(itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});},
	getIncome: function () {
		incomeItems.forEach(function (item) {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;

			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = cashIncome;
			}
		});

		for (let key in appData.income) {
			appData.incomeMonth += +appData.income[key];
		}
	},
	getAddExpenses: function () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		});
	},
	getAddIncome: function () {
		fieldAddIncome.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);
			}
		});
	},
	asking: function () {
		// //узнаем о дополнительном заработке
		// if (confirm('Eсть ли у вас дополнительный заработок?')) {
		// 	let itemIncome;
		// 	do {
		// 		itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Введите текст');
		// 		//Если отмена то переходим к вопросу о возможных расходах
		// 		if (!itemIncome) {
		// 			break;
		// 		}
		// 	} while (isNumber(itemIncome) || itemIncome.trim() === '' || itemIncome === 'Введите текст');

		// 	if (itemIncome) {
		// 		do {
		// 			appData.income[itemIncome] = prompt('Сколько в месяц зарабатываете на этом?', 'Введите число');
		// 			//Если отмена то переходим к вопросу о возможных расходах
		// 			if (!appData.income[itemIncome]) {
		// 				appData.income = {};
		// 				break;
		// 			}
		// 		} while (!isNumber(appData.income[itemIncome]));
		// 	}
		// }
		//спрашиваем о возможных расходах
		// let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		// if (addExpenses) {
		// 	appData.addExpenses = addExpenses.toLowerCase().split(',');
		// 	for (let i = 0; i < appData.addExpenses.length; i++) {
		// 		appData.addExpenses[i] = appData.addExpenses[i].trim();
		// 	}
		// } else {
		// 	addExpenses = '';
		// }
		// узнаем о наличии депозита в банке и получаем true или false
		// appData.deposit = confirm('Есть ли у вас депозит в банке?');
		//спрашиваем об обязательных расходах 
		/*for (let i = 1; i <= 2; i++) {
			let itemExpenses = prompt('Введите обязательную статью расходов?');
			/*Введём проверку чтоб вводимое значение было типом строка, строчка была не пустой
			и не была введена "подсказка"*/
		/*
					while (isNumber(itemExpenses) || itemExpenses === null || itemExpenses.trim() === '' || itemExpenses === 'Введите текст') {
						itemExpenses = prompt('Введите обязательную статью расходов?', 'Введите текст');
					}
					//Введем проверку чтоб вводимое значение было типом данных число
					while (!isNumber(appData.expenses[itemExpenses])) {
						appData.expenses[itemExpenses] = prompt('Во сколько это обойдется??', "Введите число");
					}
				}*/
	},
	//метод, вычисляющий сумму всех обязательных расходов
	getExpensesMonth: function () {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
	},
	//Метод, вычисляющий месячный и дневной бюджеты
	getBudget: function () {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	//Метод, считающий количество месяцев до достижения цели
	getTargetMonth: function () {
		if (appData.budgetMonth < 0) {
			return 'Цель не будет достигнута';
		} else {
			return Math.ceil(targetAmount.value / appData.budgetMonth);
		}
	},
	//Метод, определяющий уровень дохода
	getStatusIncome: function () {
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
	//Метод, для указания процентов по вкладу и его сумме.
	getInfoDeposit: function () {
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		if (appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой годовой процент?', 'Введите число');
				if (!appData.percentDeposit) {
					appData.percentDeposit = 0;
					break;
				}
			} while (!isNumber(appData.percentDeposit));

			if (appData.percentDeposit) {
				do {
					appData.moneyDeposit = prompt('Какая сумма заложена?', 'Введите число');
					if (!appData.moneyDeposit) {
						appData.percentDeposit = 0;
						appData.moneyDeposit = 0;
						break;
					}
				} while (!isNumber(appData.moneyDeposit));
			}
		}
	},
	//Метод для подсчёта накоплений
	calcPeriod: function () {
		return appData.budgetMonth * periodSelect.value;
	}
};

calculate.addEventListener('click', appData.start);

plusExpenses.addEventListener('click', appData.addExpensesBlock);

// console.log('Расходы за месяц: ' + appData.expensesMonth);
// console.log('За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth());
// console.log('Уровень дохода: ' + appData.getStatusIncome());

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//       console.log('Свойство: ' + key + ', значение свойства: ' + appData[key]);
// }

// for (let i = 0; i < appData.addExpenses.length; i++) {
//       if (appData.addExpenses[i]) {
//             appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);
//       } else {
//             appData.addExpenses = [];
//       }
// }
// console.log(appData.addExpenses.join(', '));