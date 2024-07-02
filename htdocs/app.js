const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

//sign in form validation

/*const form=document.getElementById('signin');
const username=document.getElementById('username_signin');
const password=document.getElementById('password_signin');

form.addEventListener('submit',e=>{
    e.preventDefault();
    validateInputsSignin();
});

const setError=(element,message)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');
    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess=element=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');
    errorDisplay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputsSignin=()=>{
    const usernameValue=username.value.trim();
    const passwordValue=password.value.trim();

    if(usernameValue===''){
        setError(username,'Username is required!');
    }else{
        setSuccess(username);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required!');
    } else if (passwordValue.length < 6 ) {
        setError(password, 'Password must be atleast 6 characters!')
    } else {
        setSuccess(password);
    }
};

//sign up form validation

const form2=document.getElementById('signup');
const username2=document.getElementById('username_signup');
const email=document.getElementById('email_signup');
const password2=document.getElementById('password_signup');
const confirm_password=document.getElementById('confirm_password_signup');

form2.addEventListener('submit',e=>{
    e.preventDefault();
    validateInputsSignup();
});


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputsSignup=()=>{
    const username2Value=username2.value.trim();
    const emailValue = email.value.trim();
    const password2Value=password2.value.trim();
    const confirm_passwordValue = confirm_password.value.trim();

    if(username2Value===''){
        setError(username2,'Username is required!');
    }else{
        setSuccess(username2);
    }

    if(password2Value === '') {
        setError(password2, 'Password is required!');
    } else if (password2Value.length < 6 ) {
        setError(password2, 'Password must be atleast 6 characters!')
    } else {
        setSuccess(password2);
    }

    if(emailValue === '') {
        setError(email, 'Email is required!');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address!');
    } else {
        setSuccess(email);
    }

    if(confirm_passwordValue === '') {
        setError(confirm_password, 'Please confirm your password!');
    } else if (confirm_passwordValue !== password2Value) {
        setError(confirm_password, "Passwords doesn't match!");
    } else {
        setSuccess(confirm_password);
    }
};*/