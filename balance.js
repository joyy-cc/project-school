// Select the balance amount display element
const balanceAmountElement = document.getElementById('balance-amount');

// Initial balance value (should come from your data source)
let balance = 1250.00; // Example starting balance

// Function to update the displayed balance
function updateBalance(amount) {
    balance -= amount; // Deduct the expense amount
    balanceAmountElement.textContent = `Kshs ${balance.toFixed(2)}`; // Update the display
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
