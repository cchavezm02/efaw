// Validacion de user name
function checkUserName() {
    const miInput = document.getElementById('usuario-input');
    const valor = miInput.value;
  
    const regex = /^[a-zA-Z0-9]{5,}$/;
  
    if (regex.test(valor)) return true;
    return false;
}
function validarUserName() {
    if (checkUserName()) {
        document.getElementById('invalid-username').style.display = 'none'
    } else {
        document.getElementById('invalid-username').style.display = 'block'
    }
}

// Validacion de contraseña
function checkPassword() {
    const contrasenaInput = document.getElementById('password-input');
    const contrasena = contrasenaInput.value;
  
    // Expresión regular para validar la contraseña
    const regexContrasena = /^(?=.*[A-Za-zÀ-ÿΑ-ωЀ-ӿ])(?=.*\d)(?=.*[~!@#$%^&*_\-+='|\\(){}[\]:;"'<>,.?\/])[A-Za-zÀ-ÿΑ-ωЀ-ӿ\d~!@#$%^&*_\-+='|\\(){}[\]:;"'<>,.?\/]{8,}$/;
  
    if (regexContrasena.test(contrasena)) return true;
    return false;
}
function validarContrasena() {
    if (checkPassword()) {
        document.getElementById('invalid-password').style.display = 'none'
    } else {
        document.getElementById('invalid-password').style.display = 'block'
    }
}

function isSuccessfulSignIn() {
    let checked =checkUserName() && checkPassword();
    
    return checked
}

const btnLogin = document.getElementById('btn-login');
btnLogin.addEventListener('click', function() {

    if (isSuccessfulSignIn()) {
        window.location.href='./savings/objectives.html';
    }
    else {
        validarUserName();
        validarContrasena();
    }
})