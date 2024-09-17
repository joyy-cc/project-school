// Get elements
const incomeInput = document.getElementById('income');
const expenseInput = document.getElementById('expense');
const savingsInput = document.getElementById('savings');
const dateInput = document.getElementById('transaction-date');
const totalIncomeDisplay = document.getElementById('total-income');
const totalExpensesDisplay = document.getElementById('total-expenses');
const totalSavingsDisplay = document.getElementById('total-savings');
const balanceDisplay = document.getElementById('balance');
const transactionsList = document.getElementById('transactions');

let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;
let totalSavings = 0;

// Add Income
document.getElementById('add-income').addEventListener('click', () => {
  const income = parseFloat(incomeInput.value);
  const date = dateInput.value;
  if (!isNaN(income) && income > 0 && date) {
    transactions.push({ type: 'Income', amount: income, date: date });
    totalIncome += income;
    updateBudget();
    renderTransactions();
  }
  incomeInput.value = '';
});

// Add Expense
document.getElementById('add-expense').addEventListener('click', () => {
  const expense = parseFloat(expenseInput.value);
  const date = dateInput.value;
  if (!isNaN(expense) && expense > 0 && date) {
    transactions.push({ type: 'Expense', amount: expense, date: date });
    totalExpenses += expense;
    updateBudget();
    renderTransactions();
  }
  expenseInput.value = '';
});

// Add Savings
document.getElementById('add-savings').addEventListener('click', () => {
  const savings = parseFloat(savingsInput.value);
  const date = dateInput.value;
  if (!isNaN(savings) && savings > 0 && date) {
    transactions.push({ type: 'Savings', amount: savings, date: date });
    totalSavings += savings;
    updateBudget();
    renderTransactions();
  }
  savingsInput.value = '';
});

// Update Budget Display
function updateBudget() {
  totalIncomeDisplay.textContent = totalIncome.toFixed(2);
  totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
  totalSavingsDisplay.textContent = totalSavings.toFixed(2);
  const balance = totalIncome - totalExpenses - totalSavings;
  balanceDisplay.textContent = balance.toFixed(2);
}

// Render Transactions
function renderTransactions() {
  transactionsList.innerHTML = '';
  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.textContent = `${transaction.type}: $${transaction.amount.toFixed(2)} (${transaction.date})`;
    transactionsList.appendChild(listItem);
  });
}
