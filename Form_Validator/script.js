const form = document.getElementById('form')
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirmpassword');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function emailHandler(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email.value).toLowerCase())) {
        showSuccess(email)
    }
    else {
        showError(email, "Email is required")
    }
}

function validate(input) {

    input.forEach(function (item) {
        if (item.value.trim() === '') {
            showError(item, ` ${uppercaseHandler(item)}  is required`);
        }
        else {
            showSuccess(item);
        }
    })
}

const uppercaseHandler = (input) => {
    return input.id.trim().charAt(0).toUpperCase() + input.id.slice(1);
}

function lengthHandler(input, min, max) {
    if (input.value.length < min) {
        showError(input, ` ${uppercaseHandler(input)} must be at least ${min} characters `);
    }
    else if (input.value.length > max) {
        showError(input, ` ${uppercaseHandler(input)} must be less than ${max} characters `);
    }
    else {
        showSuccess(input)
    }
}




function passwordCheckHandler(password, password2) {
    if (password.value !== password2.value) {
        showError(password2, "Confirm password do not match")
    }
    if (password2.value === '') {
        showError(password2, "Confirm password do not match")
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(form);
    validate([userName, email, password, password2]);
    lengthHandler(userName, 3, 15);
    lengthHandler(password, 6, 25);
    emailHandler(email);
    passwordCheckHandler(password, password2);
});