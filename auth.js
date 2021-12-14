import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAun7aW3lxstceqCzTaHUFGnPt6jt-hocE",
    authDomain: "fir-auth-bba8a.firebaseapp.com",
    projectId: "fir-auth-bba8a",
    storageBucket: "fir-auth-bba8a.appspot.com",
    messagingSenderId: "152597764120",
    appId: "1:152597764120:web:80ae5a134068e146f08b6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let signUpButton = document.getElementById("register-button");
let logInButton = document.getElementById("login-button");
let logOutButton = document.getElementById("logout-button");

if (signUpButton != null) {
    signUpButton.addEventListener("click", () => register());
}

if (logInButton != null) {
    logInButton.addEventListener("click", () => logIn());
}

if (logOutButton != null) {
    logOutButton.addEventListener("click", () => logOut());
}

async function register() {
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    let emailValidator = /^[^@]+@\w+(\.\w+)+\w$/;

    if (emailValidator.test(email) == false || password.length < 6) {
        alert("Email or Password does not adhere to the correct format");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        return;
    }
}

async function logIn() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let emailValidator = /^[^@]+@\w+(\.\w+)+\w$/;

    if (emailValidator.test(email) == false || password.length < 6) {
        alert("Email or Password does not adhere to the correct format");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Incorrect Email and/or Password entered " + errorMessage);
        return;
    }
}

async function logOut() {
    await signOut(auth);
}

onAuthStateChanged(auth, user => {
    if (user) {
        window.location.replace("index.html");
    } else {
        window.location.replace("login.html");
    }
});
