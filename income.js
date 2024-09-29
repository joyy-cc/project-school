// income.js

document.addEventListener('DOMContentLoaded', function () {
    const incomeForm = document.getElementById('income-form');
    const addIncomeButton = document.getElementById('addIncomeButton');
    const closeIncomeOverlay = document.getElementById('closeIncomeOverlay');
    const incomeOverlay = document.getElementById('income-overlay');
    const incomeAmountDisplay = document.getElementById('incomeAmount');
    const transactionList = document.querySelector('.transaction-list');

    // Load initial income from local storage
    const initialIncome = parseFloat(localStorage.getItem('incomeAmount')) || 0;
    incomeAmountDisplay.textContent = `Kshs ${initialIncome.toFixed(2)}`;

    // Load transaction history from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        // Check if the transaction is income
        if (transaction.type === 'income') {
            addIncomeToHistory(transaction.name, transaction.amount, transaction.date);
        }
    });

    // Function to update income in local storage and on the page
function updateIncome(amount) {
    console.log("Current Income before update:", localStorage.getItem('incomeAmount'));
    const currentIncome = parseFloat(localStorage.getItem('incomeAmount')) || 0;
    const updatedIncome = currentIncome + amount;

    // Save the updated income back to local storage
    localStorage.setItem('incomeAmount', updatedIncome);
    incomeAmountDisplay.textContent = `Kshs ${updatedIncome.toFixed(2)}`;

    console.log("Updated Income after addition:", updatedIncome);
    // Update the balance when income is added
    updateBalance(amount, false); // Call updateBalance with isExpense set to false
}


    // Function to add the income to transaction history
    function addIncomeToHistory(name, amount, date) {
        const newTransaction = document.createElement('li');
        newTransaction.classList.add('transaction-item');

        newTransaction.innerHTML = `
            <span class="transaction-number">${transactionList.children.length + 1}.</span>
            <div class="transaction-details">
                <span class="transaction-name">${name}</span>
                <span class="transaction-date">${date}</span>
            </div>
            <span class="transaction-amount" style="color: green;">+ Kshs ${amount.toFixed(2)}</span>
        `;

        transactionList.appendChild(newTransaction);
    }

    // Event listener for the form submission
    incomeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const incomeNameInput = document.getElementById('incomeName');
        const incomeAmountInput = document.getElementById('incomeAmount');
        const incomeAmount = parseFloat(incomeAmountInput.value);
        const incomeDateInput = document.getElementById('incomeDate');
        const incomeDate = incomeDateInput.value;

        // Validate the income amount
        if (!incomeAmountInput.value.trim() || isNaN(incomeAmount) || incomeAmount <= 0) {
            alert("Please enter a valid income amount.");
            return;
        }

        // Update income
        updateIncome(incomeAmount);

        // Add the new income to the transaction history and local storage
        addIncomeToHistory(incomeNameInput.value, incomeAmount, new Date(incomeDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));

        // Save the transaction to local storage
        transactions.push({ name: incomeNameInput.value, amount: incomeAmount, date: incomeDate, type: 'income' });
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Clear the form and hide the overlay
        incomeForm.reset();
        incomeOverlay.style.display = 'none';
    });

    // Event listener to show the income overlay
    addIncomeButton.addEventListener('click', function () {
        incomeOverlay.style.display = 'block';
    });

    // Event listener to close the income overlay
    closeIncomeOverlay.addEventListener('click', function () {
        incomeOverlay.style.display = 'none';
    });
});
