// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIYhFTjwrznGg0RksDm7vfGK4uouLdkF4",
    authDomain: "personal-budget-tracker-b95c1.firebaseapp.com",
    projectId: "personal-budget-tracker-b95c1",
    storageBucket: "personal-budget-tracker-b95c1.appspot.com",
    messagingSenderId: "1085711794162",
    appId: "1:1085711794162:web:0c7ff99888cb2336e5f56b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

// Handle user registration
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const errorMessageDiv = document.getElementById('error-message');

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            errorMessageDiv.textContent = '';  // Clear any previous error message
            // Registration successful
            window.location.href = '../index.html';  // Redirect after success
        })
        .catch((error) => {
            errorMessageDiv.textContent = error.message;  // Display error message
        });
});

// Handle user login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMessageDiv = document.getElementById('error-message');

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            errorMessageDiv.textContent = '';  // Clear any previous error message
            // Login successful
            window.location.href = '../index.html';  // Redirect after success
        })
        .catch((error) => {
            errorMessageDiv.textContent = error.message;  // Display error message
        });
});
