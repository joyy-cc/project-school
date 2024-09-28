// Function to update the date dynamically
function updateDate() {
  const dateElement = document.querySelector('.date');
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Get the current date and format it
  const today = new Date().toLocaleDateString('en-US', options);

  // Insert the formatted date into the div
  dateElement.textContent = today;
}

// Call the function when the page loads
window.onload = updateDate;
