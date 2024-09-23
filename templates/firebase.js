// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
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
