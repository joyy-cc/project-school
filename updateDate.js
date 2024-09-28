// Function to update the current date
function updateCurrentDate() {
    const dateElement = document.querySelector('.date');
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateElement.textContent = currentDate; // Update the date display
}

// Call the function to update the date on page load
updateCurrentDate();
