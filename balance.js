// Select the balance amount display element
const balanceAmountElement = document.getElementById('balance-amount');

// Load initial balance value from local storage or set to the default if not available
let balance = parseFloat(localStorage.getItem('balance')) || 1250.00; // Example starting balance

// Function to update the displayed balance
function updateBalance(amount, isExpense = true) {
    // Update balance based on whether it's an expense or income
    if (isExpense) {
        balance -= amount; // Deduct the expense amount
    } else {
        balance += amount; // Add the income amount
    }

    balanceAmountElement.textContent = `Kshs ${balance.toFixed(2)}`; // Update the display
    localStorage.setItem('balance', balance); // Save updated balance to local storage
}

// Open the expense overlay
document.getElementById('addExpenseButton').addEventListener('click', function() {
    document.getElementById('expense-overlay').style.display = 'flex';
});

// Close the expense overlay
document.getElementById('closeExpenseOverlay').addEventListener('click', function() {
    document.getElementById('expense-overlay').style.display = 'none';
});

// Initialize the balance display on page load
balanceAmountElement.textContent = `Kshs ${balance.toFixed(2)}`;
