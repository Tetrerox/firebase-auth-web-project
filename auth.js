import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
const database = getDatabase(app);

let signUpButton = document.getElementById("register-button");
let logInButton = document.getElementById("login-button");

signUpButton.addEventListener("click", () => register());
logInButton.addEventListener("click", () => logIn());

async function register() {
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    let emailValidator = /^[^@]+@\w+(\.\w+)+\w$/;

    if (emailValidator.test(email) == false || password.length < 6) {
        alert("Email or Password does not adhere to the correct format");
        return;
    }

    await createUserWithEmailAndPassword(auth, email, password);
    let user = auth.currentUser;

    let userData = {
        email: email
    };

    set(ref(database, 'users/' + user.uid), userData);
    window.location.replace("index.html");
}

function logIn() {

}
