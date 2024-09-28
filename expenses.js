document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const addExpenseButton = document.getElementById('addExpenseButton');
    const closeExpenseOverlay = document.getElementById('closeExpenseOverlay');
    const expenseOverlay = document.getElementById('expense-overlay');
    const expensesAmountDisplay = document.getElementById('expensesAmount');
    const transactionList = document.querySelector('.transaction-list');

    // Load initial expenses from local storage
    const initialExpenses = parseFloat(localStorage.getItem('expensesAmount')) || 0;
    expensesAmountDisplay.textContent = `Kshs ${initialExpenses.toFixed(2)}`;

    // Load transaction history from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        addExpenseToHistory(transaction.name, transaction.amount, transaction.date);
    });

    // Function to update expenses in local storage and on the page
    function updateExpenses(amount) {
        const currentExpenses = parseFloat(localStorage.getItem('expensesAmount')) || 0;
        const updatedExpenses = currentExpenses + amount;
        localStorage.setItem('expensesAmount', updatedExpenses);
        expensesAmountDisplay.textContent = `Kshs ${updatedExpenses.toFixed(2)}`;
    }

    // Function to add the expense to transaction history
    function addExpenseToHistory(name, amount, date) {
        const newTransaction = document.createElement('li');
        newTransaction.classList.add('transaction-item');

        newTransaction.innerHTML = `
            <span class="transaction-number">${transactionList.children.length + 1}.</span>
            <div class="transaction-details">
                <span class="transaction-name">${name}</span>
                <span class="transaction-date">${date}</span>
            </div>
            <span class="transaction-amount">- Kshs ${amount.toFixed(2)}</span>
        `;

        transactionList.appendChild(newTransaction);
    }

    // Event listener for the form submission
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const expenseNameInput = document.getElementById('expenseName');
        const expenseAmountInput = document.getElementById('expenseAmount');
        const expenseAmount = parseFloat(expenseAmountInput.value);
        const expenseDateInput = document.getElementById('expenseDate');
        const expenseDate = expenseDateInput.value;

        // Validate the expense amount
        if (!expenseAmountInput.value.trim() || isNaN(expenseAmount) || expenseAmount <= 0) {
            alert("Please enter a valid expense amount.");
            return;
        }

        // Update expenses and balance
        updateExpenses(expenseAmount);
        updateBalance(expenseAmount); // Ensure this function is called to update the balance

        // Add the new expense to the transaction history and local storage
        addExpenseToHistory(expenseNameInput.value, expenseAmount, new Date(expenseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));

        // Save the transaction to local storage
        transactions.push({ name: expenseNameInput.value, amount: expenseAmount, date: expenseDate });
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Clear the form and hide the overlay
        expenseForm.reset();
        expenseOverlay.style.display = 'none';
    });

    // Event listener to show the expense overlay
    addExpenseButton.addEventListener('click', function () {
        expenseOverlay.style.display = 'block';
    });

    // Event listener to close the expense overlay
    closeExpenseOverlay.addEventListener('click', function () {
        expenseOverlay.style.display = 'none';
    });
});
