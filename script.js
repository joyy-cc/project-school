// script.js

// Elements
const balanceAmount = document.getElementById('balance-amount');
const expensesAmount = document.getElementById('expensesAmount');
const incomeAmount = document.getElementById('incomeAmount'); // For displaying income
const totalSavingsAmount = document.getElementById('totalSavingsAmount');
const transactionList = document.getElementById('transactionList');
const goalsContainer = document.getElementById('goalsContainer');
const dateDisplay = document.querySelector('.date');

// Initial state
let balance = 0;
let expenses = 0;
let income = 0;
let totalSavings = 0;
let transactions = [];
let goals = [];

// Update Date
const updateDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);
};

// Add Event Listeners for Overlays
document.getElementById('addExpenseButton').onclick = () => toggleOverlay('expense-overlay');
document.getElementById('addIncomeButton').onclick = () => toggleOverlay('income-overlay');
document.getElementById('addSavingsButton').onclick = () => toggleOverlay('savings-overlay');
document.getElementById('addGoalButton').onclick = () => toggleOverlay('goal-overlay');

document.getElementById('closeExpenseOverlay').onclick = () => toggleOverlay('expense-overlay');
document.getElementById('closeIncomeOverlay').onclick = () => toggleOverlay('income-overlay');
document.getElementById('closeSavingsOverlay').onclick = () => toggleOverlay('savings-overlay');
document.getElementById('closeGoalOverlay').onclick = () => toggleOverlay('goal-overlay');

// Toggle Overlay
function toggleOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

// Form Submissions
document.getElementById('expense-form').onsubmit = (e) => {
    e.preventDefault();
    const expenseName = e.target.expenseName.value;
    const expenseAmount = parseFloat(e.target.expenseAmount.value);
    const expenseDate = e.target.expenseDate.value;
    const expenseCategory = e.target.expenseCategory.value;

    console.log("Submitting expense:", { expenseName, expenseAmount, expenseDate, expenseCategory });

    addTransaction('Expense', expenseName, expenseAmount, expenseDate, expenseCategory);
    updateBalance(-expenseAmount); // Subtract expense from balance
    toggleOverlay('expense-overlay');
    e.target.reset();
};

document.getElementById('income-form').onsubmit = (e) => {
    e.preventDefault();
    const incomeName = e.target.incomeName.value;
    const incomeAmountValue = e.target.incomeAmount.value; // Get raw input value
    const incomeAmount = parseFloat(incomeAmountValue); // Parse it to float

    console.log("Submitting income:", { incomeName, incomeAmount });

    // Validate the income amount
    if (isNaN(incomeAmount) || incomeAmount <= 0) {
        alert("Please enter a valid income amount.");
        return; // Stop further execution
    }

    const incomeDate = e.target.incomeDate.value;

    addTransaction('Income', incomeName, incomeAmount, incomeDate);
    updateBalance(incomeAmount); // Add income to balance
    toggleOverlay('income-overlay');
    e.target.reset();
};

document.getElementById('savings-form').onsubmit = (e) => {
    e.preventDefault();
    const savingsAmount = parseFloat(e.target.savingsAmount.value);
    const savingsDate = e.target.savingsDate.value;

    console.log("Submitting savings:", { savingsAmount, savingsDate });

    totalSavings += savingsAmount;
    totalSavingsAmount.innerText = `Kshs ${totalSavings.toFixed(2)}`;
    
    addTransaction('Savings', 'Savings Contribution', savingsAmount, savingsDate);
    updateBalance(-savingsAmount); // Deduct savings from balance
    toggleOverlay('savings-overlay');
    e.target.reset();
};

document.getElementById('goal-form').onsubmit = (e) => {
    e.preventDefault();
    const goalName = e.target.goalName.value;
    const goalTarget = parseFloat(e.target.goalTarget.value);
    const goalDate = e.target.goalDate.value;

    console.log("Submitting goal:", { goalName, goalTarget, goalDate });

    goals.push({ name: goalName, target: goalTarget, date: goalDate });
    renderGoals();
    toggleOverlay('goal-overlay');
    e.target.reset();
};

// Update Balance
function updateBalance(amount) {
    balance += amount;
    console.log("Updated balance:", balance);
    balanceAmount.innerText = `Kshs ${balance.toFixed(2)}`;
}

// Add Transaction
function addTransaction(type, name, amount, date, category) {
    transactions.push({ type, name, amount, date, category });
    
    if (type === 'Expense') {
        expenses += amount;
        expensesAmount.innerText = `Kshs ${expenses.toFixed(2)}`;
        console.log("Added expense:", { name, amount });
    } else if (type === 'Income') {
        income += amount;
        incomeAmount.innerText = `Kshs ${income.toFixed(2)}`; // Update income display
        console.log("Added income:", { name, amount });
    }

    updateTransactionList();
}

// Update Transaction List with styles
function updateTransactionList() {
    transactionList.innerHTML = transactions.map(transaction => `
        <li class="transaction-item">
            <span class="transaction-date">${transaction.date}</span>
            <span class="transaction-type">${transaction.type}</span>
            <span class="transaction-name">${transaction.name}</span>
            <span class="transaction-amount">Kshs ${transaction.amount.toFixed(2)}</span>
            ${transaction.category ? `<span class="transaction-category">(Category: ${transaction.category})</span>` : ''}
        </li>
    `).join('');
    console.log("Transactions updated:", transactions);
}

// Render Goals with styles
function renderGoals() {
    goalsContainer.innerHTML = goals.map(goal => `
        <div class="goal-card">
            <h4 class="goal-name">${goal.name}</h4>
            <p class="goal-target">Target: Kshs ${goal.target.toFixed(2)} by ${goal.date}</p>
        </div>
    `).join('');
}


// Initialize
updateDate();
