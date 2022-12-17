function validateEmail() {
    const email = document.getElementById("email").value
    const emailError = document.getElementById("email-error")
    if(email.length == 0){
        emailError.innerHTML = 'X'
        return false
    }
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
        emailError.innerHTML = 'X'
        return false
    }
    emailError.innerHTML = ''
    return true
}

function submitForm(){
    const submitError = document.getElementById('submit-error')
    if(!validateEmail()){
        submitError.style.display = "block"
        submitError.innerHTML = "X"
        setTimeout(function (){
            submitError.style.display = "none"
        },3000)
        return false
    }
}