document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const addExpenseButton = document.getElementById('addExpenseButton');
    const closeExpenseOverlay = document.getElementById('closeExpenseOverlay');
    const expenseOverlay = document.getElementById('expense-overlay');
    const expensesAmountDisplay = document.getElementById('expensesAmount');

    // Function to update expenses in local storage and on the page
    function updateExpenses(amount) {
        const currentExpenses = parseFloat(localStorage.getItem('expensesAmount')) || 0;
        const updatedExpenses = currentExpenses + amount;
        localStorage.setItem('expensesAmount', updatedExpenses);
        expensesAmountDisplay.textContent = `Kshs ${updatedExpenses.toFixed(2)}`;
    }

    // Function to add the expense to transaction history
    function addExpenseToHistory(name, amount) {
        const transactionList = document.querySelector('.transaction-list');
        const newTransaction = document.createElement('li');
        newTransaction.classList.add('transaction-item');

        const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        newTransaction.innerHTML = `
            <span class="transaction-number">${transactionList.children.length + 1}.</span>
            <div class="transaction-details">
                <span class="transaction-name">${name}</span>
                <span class="transaction-date">${currentDate}</span>
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

        // Validate the expense amount
        if (!expenseAmountInput.value.trim() || isNaN(expenseAmount) || expenseAmount <= 0) {
            alert("Please enter a valid expense amount.");
            return;
        }

        // Update expenses and balance
        updateExpenses(expenseAmount);
        updateBalance(expenseAmount); // Ensure this function is called to update the balance

        // Add the new expense to the transaction history
        addExpenseToHistory(expenseNameInput.value, expenseAmount);

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

    // Initialize expenses amount on page load
    const initialExpenses = parseFloat(localStorage.getItem('expensesAmount')) || 0;
    expensesAmountDisplay.textContent = `Kshs ${initialExpenses.toFixed(2)}`;
});
