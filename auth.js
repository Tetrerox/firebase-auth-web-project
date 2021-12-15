import {
    showLogInForm,
    showSignUpForm,
    showHomePage
} from "./ui.js";
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
let registerLinkButton = document.querySelector(".register-link");
let loginLinkButton = document.querySelector(".login-link");

signUpButton.addEventListener("click", () => register());
logInButton.addEventListener("click", () => logIn());
logOutButton.addEventListener("click", () => logOut());

registerLinkButton.addEventListener("click", showSignUpForm);
loginLinkButton.addEventListener("click", showLogInForm);

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
        document.getElementById("register-email").value = "";
        document.getElementById("register-password").value = "";
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
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
        document.getElementById("login-email").value = "";
        document.getElementById("login-password").value = "";
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Incorrect Email and/or Password entered " + errorMessage);
    }
}

async function logOut() {
    await signOut(auth);
}

onAuthStateChanged(auth, user => {
    if (user) {
        showHomePage();
    } else {
        showLogInForm();
    }
});
