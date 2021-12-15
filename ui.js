export const logInForm = document.querySelector(".login-container");
export const signUpForm = document.querySelector(".register-container");
export const homePage = document.querySelector(".homepage");

export const showLogInForm = () => {
    logInForm.style.display = "block";
    signUpForm.style.display = "none";
    homePage.style.display = "none";
}

export const showSignUpForm = () => {
    logInForm.style.display = "none";
    signUpForm.style.display = "block";
    homePage.style.display = "none";
}

export const showHomePage = () => {
    logInForm.style.display = "none";
    signUpForm.style.display = "none";
    homePage.style.display = "block";
}
