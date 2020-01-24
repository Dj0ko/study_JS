let money = 90000; 
let income = 'фриланс'; 
let addExpenses = 'Квартплата, кредит, еда'; 
let deposit = true; 
let mission = 500000; 
let period = 12;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);