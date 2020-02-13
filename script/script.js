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

// const AppData = function () {
class AppData {
	constructor() {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.statusIncome = 0;
	}
	//Метод, делающий заглавными первые буквы слова
	capitalization(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]) {
				arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1);
			} else {
				arr = [];
			}
		}
	}
	/*создаем функцию, для проверки что введено число, где 
	parseFloat - приведение к числу с плавающей запятой
	isFinite - проверка для определения является ли число конечным */
	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	//Заполняем форму
	start() {
		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();

		this.showResult();
	}
	//Метод, для заполнения введённых значений
	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
	}
	//Метод для добавления дополнительных полей "Обязательные расходы", ограничиваем тремя полями
	addExpensesBlock() {
		const cloneexpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneexpensesItem, plusExpenses);
		expensesItems = document.querySelectorAll('.expenses-items');


		if (expensesItems.length === 3) {
			plusExpenses.style.display = 'none';
		}
	}
	//Метод для добавления дополнительных полей "Дополнительный доход", ограничиваем тремя полями
	addIncomeBlock() {
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			plusIncome.style.display = 'none';
		}
	}
	//Метод для передачи значений "Обязательные расходы"
	getExpenses() {
		expensesItems.forEach((item) => {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;

			if (itemExpenses !== '' && !this.isNumber(itemExpenses) && cashExpenses !== '' && this.isNumber(cashExpenses)) {
				this.expenses[itemExpenses] = cashExpenses;
			}
		});
	}
	//Метод для передачи значений "Дополнительный доход"
	getIncome() {
		incomeItems.forEach((item) => {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;

			if (itemIncome !== '' && !this.isNumber(itemIncome) && cashIncome !== '' && this.isNumber(cashIncome)) {
				this.income[itemIncome] = cashIncome;
			}
		});
		//Цикл для подсчёта суммы допольнительного дохода
		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	//Метод для заполнения поля "Возможные расходы"
	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
		this.capitalization(this.addExpenses);
	}
	//Метод для заполнения поля "Возможные доходы"
	getAddIncome() {
		fieldAddIncome.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
		this.capitalization(this.addIncome);
	}
	//метод, вычисляющий сумму всех обязательных расходов
	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}
	//Метод, вычисляющий месячный и дневной бюджеты
	getBudget() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}
	//Метод, считающий количество месяцев до достижения цели
	getTargetMonth() {
		if (this.budgetMonth < 0) {
			return 'Цель не будет достигнута';
		} else {
			return Math.ceil(targetAmount.value / this.budgetMonth);
		}
	}
	//Метод, определяющий уровень дохода
	getStatusIncome() {
		if (this.budgetDay > 1200) {
			return 'У вас высокий уровень дохода';
		} else if ((this.budgetDay >= 600) && (this.budgetDay <= 1200)) {
			return 'У вас средний уровень дохода';
		} else if ((this.budgetDay >= 0) && (this.budgetDay < 600)) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else {
			return 'Что то пошло не так';
		}
	}
	//Метод, для указания процентов по вкладу и его сумме.
	getInfoDeposit() {
		this.deposit = confirm('Есть ли у вас депозит в банке?');
		if (this.deposit) {
			do {
				this.percentDeposit = prompt('Какой годовой процент?', 'Введите число');
				if (!this.percentDeposit) {
					this.percentDeposit = 0;
					break;
				}
			} while (!this.isNumber(this.percentDeposit));

			if (this.percentDeposit) {
				do {
					this.moneyDeposit = prompt('Какая сумма заложена?', 'Введите число');
					if (!this.moneyDeposit) {
						this.percentDeposit = 0;
						this.moneyDeposit = 0;
						break;
					}
				} while (!this.isNumber(this.moneyDeposit));
			}
		}
	}
	//Метод для подсчёта накоплений
	calcPeriod() {
		return this.budgetMonth * this.setPeriod();
	}
	//Метод для вывода расчётного периода
	setPeriod() {
		periodAmount.textContent = periodSelect.value;
		return periodAmount.textContent;
	}
	// Функция разблокировки кнопки "Рассчитать"
	disableCalculate() {
		if (this.isNumber(salaryAmount.value) && salaryAmount.value > 0) {
			calculate.removeAttribute('disabled');
		}

		if (!this.isNumber(salaryAmount.value)) {
			calculate.setAttribute('disabled', 'disabled');
			salaryAmount.placeholder = "Введите число";
		}
	}
	//Метод сброса полей
	reset() {
		//Показываем кнопку "Рассчитать"
		calculate.style.display = 'block';
		//Скрываем кнопку "Сбросить"
		resetButton.style.display = 'none';
		// снимаем блокировку с полей
		document.querySelectorAll('input').forEach((item) => {
			item.removeAttribute('disabled');
			item.value = '';
		});
		// снимаем блокировку с плюсов
		document.querySelectorAll('.btn_plus').forEach((item) => {
			item.removeAttribute('disabled');
		});
		// удаляем дополнительные поля заполнения "Дополнительный доход" и "Обязательные расходы"
		for (let i = 1; i < incomeItems.length; i++) {
			incomeItems[i].remove();
		}
		for (let i = 1; i < expensesItems.length; i++) {
			expensesItems[i].remove();
		}
		//устанавливаем начальные значения range
		periodSelect.value = '1';
		periodAmount.textContent = '1';
		//запускаем проверку на вводимое число в поле "Месячный доход"
		this.disableCalculate();
		//обнуляем значения 
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.statusIncome = 0;
	}
	//Функция для блокировки полей заполнения
	disableInputs() {
		//Получаем поля с левой стороны
		const data = document.querySelector('.data');
		//Получаем все поля ввода с вводом текста
		const inputs = data.querySelectorAll('input[type=text]');
		//Блокируем каждое поле
		inputs.forEach((item) => {
			item.setAttribute('disabled', 'disabled');
		});
		//Блокируем плюсы
		document.querySelectorAll('.btn_plus').forEach((item) => {
			item.setAttribute('disabled', 'disabled');
		});
		//Скрываем кнопку "Рассчитать"
		calculate.style.display = 'none';
		//Показываем кнопку "Сбросить"
		resetButton.style.display = 'block';
	}
	eventsListeners() {
		//Обработчик событий для запуска программы по кнопке "Рассчитать"
		//связываем функцию Start с объектом appData
		calculate.addEventListener('click', this.start.bind(this));
		//Обработчик события для добавления дополнительных полей "Обязательные расходы" по нажатию на кнопку плюс
		plusExpenses.addEventListener('click', this.addExpensesBlock);
		//Обработчик события для добавления дополнительных полей "Дополнительный доход" по нажатию на кнопку плюс
		plusIncome.addEventListener('click', this.addIncomeBlock);
		//Обработчик события для динамического изменения значения "Период расчета" 
		periodSelect.addEventListener('input', this.setPeriod);
		//Запрещаем нажатие кнопки Рассчитать при вводе не числа
		salaryAmount.addEventListener('input', this.disableCalculate.bind(this));
		//Блокируем поля для заполнения с левой стороны
		calculate.addEventListener('click', this.disableInputs);
		//Сбрасываем до первоначальных значений
		resetButton.addEventListener('click', this.reset.bind(this));
		//Создаём динамическое изменение в поле "Накопления за период"
		periodSelect.addEventListener('input', (() => {
			incomePeriodValue.value = this.calcPeriod();
		}));
	}
}

const appData = new AppData();
appData.eventsListeners();
console.log(appData);