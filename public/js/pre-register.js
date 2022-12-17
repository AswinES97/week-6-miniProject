function validateEmail() {
    const email = document.getElementById("email").value
    const emailError = document.getElementById("email-error")
    if (email.length == 0) {
        emailError.innerHTML = 'X'
        return false
    }
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        emailError.innerHTML = 'X'
        return false
    }
    emailError.innerHTML = ''
    return true
}

function validatePassword() {
    const password = document.getElementById('password').value
    const passwordError = document.getElementById('password-error')
    if (password.length == 0) {
        passwordError.innerHTML = 'X'
        return false
    }
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
        passwordError.innerHTML = 'X'
        return false
    }
    passwordError.innerHTML = ''
    return true
}

function confirmPassword() {
    const confirmPassword = document.getElementById('confirm-password').value
    const password = document.getElementById('password').value
    const confirmPasswordError = document.getElementById('confirm-password-error')
    if (confirmPassword.length == 0) {
        confirmPasswordError.innerHTML = "X"
        return false
    }
    if (password != confirmPassword){
        confirmPasswordError.innerHTML = 'X'
        return false
    }
    confirmPasswordError.innerHTML = ''
    return true
}


function submitForm() {
    const submitError = document.getElementById('submit-error')
    if (!validateEmail() || !validatePassword() || !confirmPassword()) {
        submitError.style.display = "block"
        submitError.innerHTML = "X"
        setTimeout(function () {
            submitError.style.display = "none"
        }, 3000)
        return false
    }
}