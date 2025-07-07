// Declaracion de variables
let validGen = false;

// Cambio de selección de los botones del género
const botones = document.querySelectorAll('.btn-gen');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    // Remover la clase 'boton-activo' de todos los botones
    botones.forEach(b => b.classList.remove('btn-gen-activated'));
    
    // Agregar la clase btn-gen
    botones.forEach(b => b.classList.add('btn-gen'));
    
    // Agregar la clase 'boton-activo' al botón clicado
    boton.className = 'btn-gen-activated'

    validGen=true;
});
});

// Validación de datos
// Validación de boton
function validarBoton() {
    if(validGen){
        document.getElementById('invalid-button').style.display= 'none'
    }
    else{
        document.getElementById('invalid-button').style.display= 'block'
    }
}
// Validación del nombre
function checkName() {
    const inputTexto = document.getElementById("nombre-input");
    const texto = inputTexto.value;

    // Expresión regular para permitir solo letras y espacios
    const regexLetrasEspacios = /^[a-zA-Z\s]{3,}$/;

    if (regexLetrasEspacios.test(texto)) return true;
    return false;
}
function validarNombre() {
    if (checkName()) {
        document.getElementById('invalid-name').style.display = 'none'
    } else {
        document.getElementById('invalid-name').style.display = 'block'
    }
}

// Validacion de apellido
function checkLastName() {
    const inputTexto = document.getElementById("apellidos-input");
    const texto = inputTexto.value;

    // Expresión regular para permitir solo letras y espacios
    const regexLetrasEspacios = /^[a-zA-Z\s]{3,}$/;

    if (regexLetrasEspacios.test(texto)) return true;
    return false;
}
function validarApellido() {
    if (checkLastName()) {
        document.getElementById('invalid-lastname').style.display = 'none'
    } else {
        document.getElementById('invalid-lastname').style.display = 'block'
    }
}

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

// Validacion de email
function checkEmail() {
    const correoInput = document.getElementById('email-input');
    const correo = correoInput.value;
  
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (regexCorreo.test(correo)) return true;
    return false;
}
function validarEmail() {
    if (checkEmail()) {
        document.getElementById('invalid-email').style.display = 'none'
    } else {
        document.getElementById('invalid-email').style.display = 'block'
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

function isSuccessfulSignUp() {
    let checked = checkName() && checkLastName() && checkUserName() && checkPassword() && checkEmail() && validGen;
    
    return checked
}

const btnRegister = document.getElementById('btn-register');
var miElemento = document.getElementById('confirmacion');

btnRegister.addEventListener('click', function() {

    if (isSuccessfulSignUp()) {
        miElemento.style.display = "block";
        setTimeout(function() {
            window.location.href='./savings/objectives.html'; 
          }, 1500); 
    }
    else {
        validarNombre();
        validarApellido();
        validarUserName();
        validarEmail();
        validarContrasena();
        setInterval(validarBoton, 50);
    }
})


