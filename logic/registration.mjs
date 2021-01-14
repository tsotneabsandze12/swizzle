let form = document.getElementById("form");
form.addEventListener('submit',validateFields)

function validateFields(e) {
    let uNameSpan = document.getElementById('usernameErr');
    let mailSpan = document.getElementById('emailErr');
    let passwdSpan = document.getElementById('passwordErr');
    let confirmPasswdSpan = document.getElementById('confirmPasswordErr');


    let uName = document.getElementById('userName').value;
    let mail = document.getElementById('email').value;
    let passwd = document.getElementById('password').value;
    let confirmPasswd = document.getElementById('confirmPassword').value;

    if (uName.length <= 4){
        uNameSpan.textContent = 'minimum length of 5 is required';
        e.preventDefault();
    }
    if (!validateEmail(mail))
    {
        mailSpan.textContent='invalid format';
        e.preventDefault();
    }
    if (passwd.length <= 5){
        passwdSpan.textContent = 'minimum length of 5 is required';
        e.preventDefault();
    }
    if (confirmPasswd !== passwd){
        confirmPasswdSpan.textContent = 'passwords dont match';
        e.preventDefault();

    }
    let credentials = {uName,mail,passwd};
    fetch('#', {
        method: 'POST',
        data: credentials
    }).then();
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}