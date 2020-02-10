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
	//получаем поле суммы "Обязательные расходы"
	expensesItems = document.querySelectorAll('.expenses-items'),
	//получаем поле ввода "Возможные расходы"
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	//получаем поле ввода "Цель"
	targetAmount = document.querySelector('.target-amount'),
	//получаем диапазон "Период расчета"
	periodSelect = document.querySelector('.period-select'),
	//получаем поля дополнительных расходов
	incomeItem = document.querySelectorAll('.income-items'),
	//получаем кнопку "Сбросить"
	resetButton = document.getElementById('cancel'),
	//получаем доступ ко всем полям страницы
	allElements = document.querySelector('.calc'),
	//получаем доступ к значению элемент "Период расчета"
	periodAmount = document.querySelector('.period-amount');


/*Выводим полученные значения в консоль
console.log('calculate: ', calculate);
console.log('plusIncome: ', plusIncome);
console.log('plusExpenses: ', plusExpenses);
console.log('checkBoxDeposit: ', checkBoxDeposit);
console.log('fieldAddIncome: ', fieldAddIncome);
console.log('budgetMonthValue: ', budgetMonthValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);
console.log('salaryAmount: ', salaryAmount);
console.log('incomeTitle: ', incomeTitle);
console.log('incomeAmount: ', incomeAmount);
console.log('expensesAmount: ', expensesAmount);
console.log('additionalExpensesItem: ', additionalExpensesItem);
console.log('targetAmount: ', targetAmount);
console.log('periodSelect: ', periodSelect);*/


/*создаем функцию, для проверки что введено число, где 
parseFloat - приведение к числу с плавающей запятой
isFinite - проверка для определения является ли число конечным */
const isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

function disableCalculate() {
	if (isNumber(salaryAmount.value) && salaryAmount.value > 0) {
		calculate.removeAttribute('disabled');
	}

	if (!isNumber(salaryAmount.value)) {
		calculate.setAttribute('disabled', 'disabled');
		salaryAmount.placeholder = "Введите число";
	}
}

//Функция для блокировки полей заполнения
function disableInputs() {
	//Получаем поля с левой стороны
	const data = document.querySelector('.data');
	//Получаем все поля ввода с вводом текста
	const inputs = data.querySelectorAll('input[type=text]');
	//Блокируем каждое поле
	inputs.forEach(function (item) {
		item.setAttribute('disabled', 'disabled');
	});
	//Скрываем кнопку "Рассчитать"
	calculate.style.display = 'none';
	//Показываем кнопку "Сбросить"
	resetButton.style.display = 'block';
}

//Функция сброса значений
function reset() {
	calculate.style.display = 'block';
	resetButton.style.display = 'none';
	document.querySelectorAll('input').forEach(function (item) {
		item.removeAttribute('disabled');
		item.value = '';
	});
	for (let i = 1; i < incomeItems.length; i++) {
		incomeItems[i].remove();
	}
	for (let i = 1; i < expensesItems.length; i++) {
		expensesItems[i].remove();
	}
	periodSelect.value = '1';
	periodAmount.textContent = '1';
	disableCalculate();
}

salaryAmount.addEventListener('click', function() {
	let inputs = document.querySelectorAll('input');
	inputs.forEach(function (item) {
		item.value = item.defaultValue;
	});
});

// Создадим объект с исходными переменными
let appData = {
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
	//Заполняем форму
	start: function () {
		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();

		this.showResult();
	},
	//Метод, для заполнения введённых значений.
	showResult: function () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
	},
	//Метод для добавления дополнительных полей "Обязательные расходы", ограничиваем тремя полями
	addExpensesBlock: function () {
		const cloneexpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneexpensesItem, plusExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');


		if (expensesItems.length === 3) {
			plusExpenses.style.display = 'none';
		}
	},
	//Метод для добавления дополнительных полей "Дополнительный доход", ограничиваем тремя полями
	addIncomeBlock: function () {
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			plusIncome.style.display = 'none';
		}
	},
	//Метод для передачи значений "Обязательные расходы"
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;

			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = cashExpenses;
			}
		}, this);
	},
	//Метод для передачи значений "Дополнительный доход"
	getIncome: function () {
		incomeItems.forEach(function (item) {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;

			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		}, this);
		//Цикл для подсчёта суммы допольнительного дохода
		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	},
	//Метод для заполнения поля "Возможные расходы"
	getAddExpenses: function () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, this);
	},
	//Метод для заполнения поля "Возможные доходы"
	getAddIncome: function () {
		fieldAddIncome.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		}, this);
	},
	//метод, вычисляющий сумму всех обязательных расходов
	getExpensesMonth: function () {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	},
	//Метод, вычисляющий месячный и дневной бюджеты
	getBudget: function () {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},
	//Метод, считающий количество месяцев до достижения цели
	getTargetMonth: function () {
		if (this.budgetMonth < 0) {
			return 'Цель не будет достигнута';
		} else {
			return Math.ceil(targetAmount.value / this.budgetMonth);
		}
	},
	//Метод, определяющий уровень дохода
	getStatusIncome: function () {
		if (this.budgetDay > 1200) {
			return 'У вас высокий уровень дохода';
		} else if ((this.budgetDay >= 600) && (this.budgetDay <= 1200)) {
			return 'У вас средний уровень дохода';
		} else if ((this.budgetDay >= 0) && (this.budgetDay < 600)) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else {
			return 'Что то пошло не так';
		}
	},
	//Метод, для указания процентов по вкладу и его сумме.
	getInfoDeposit: function () {
		this.deposit = confirm('Есть ли у вас депозит в банке?');
		if (this.deposit) {
			do {
				this.percentDeposit = prompt('Какой годовой процент?', 'Введите число');
				if (!this.percentDeposit) {
					this.percentDeposit = 0;
					break;
				}
			} while (!isNumber(this.percentDeposit));

			if (this.percentDeposit) {
				do {
					this.moneyDeposit = prompt('Какая сумма заложена?', 'Введите число');
					if (!this.moneyDeposit) {
						this.percentDeposit = 0;
						this.moneyDeposit = 0;
						break;
					}
				} while (!isNumber(this.moneyDeposit));
			}
		}
	},
	//Метод для подсчёта накоплений
	calcPeriod: function () {
		return this.budgetMonth * this.setPeriod();
	},
	//Метод для вывода расчётного периода
	setPeriod: function () {
		periodAmount.textContent = periodSelect.value;
		return periodAmount.textContent;
	}
};

//Обработчик событий для запуска программы по кнопке "Рассчитать"
//связываем функцию Start с объектом appData
// calculate.addEventListener('click', appData.start.bind(appData));
calculate.addEventListener('click', appData.start.bind(appData));
//Обработчик события для добавления дополнительных полей "Обязательные расходы" по нажатию на кнопку плюс
plusExpenses.addEventListener('click', appData.addExpensesBlock);
//Обработчик события для добавления дополнительных полей "Дополнительный доход" по нажатию на кнопку плюс
plusIncome.addEventListener('click', appData.addIncomeBlock);
//Обработчик события для динамического изменения значения "Период расчета" 
periodSelect.addEventListener('input', appData.setPeriod);
//Запрещаем нажатие кнопки Рассчитать при вводе не числа
salaryAmount.addEventListener('input', disableCalculate);
//Блокируем поля для заполнения с левой стороны
calculate.addEventListener('click', disableInputs);
//Сбрасываем до первоначальных значений
resetButton.addEventListener('click', reset);
//Создаём динамическое изменение в поле "Накопления за период"
periodSelect.addEventListener('input', (function () {
	incomePeriodValue.value = this.calcPeriod();
}).bind(appData));



/*console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth());
console.log('Уровень дохода: ' + appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
      console.log('Свойство: ' + key + ', значение свойства: ' + appData[key]);
}
for (let i = 0; i < appData.addExpenses.length; i++) {
      if (appData.addExpenses[i]) {
            appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);
      } else {
            appData.addExpenses = [];
      }
}
console.log(appData.addExpenses.join(', '));*/