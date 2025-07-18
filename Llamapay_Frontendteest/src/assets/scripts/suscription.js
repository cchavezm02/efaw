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


//Validación del número de teléfono
function formatPhoneNumber() {
  const inputTelefono = document.getElementById("telefono-input");
  let telefono = inputTelefono.value;

  // Eliminar los guiones existentes para formatear el número nuevamente
  telefono = telefono.replace(/-/g, "");

  // Limitar el número de dígitos a nueve
  telefono = telefono.substr(0, 9);

  // Insertar guiones después de cada tres dígitos
  const regexGuiones = /(\d{3})(?=\d)/g;
  telefono = telefono.replace(regexGuiones, "$1-");

  // Actualizar el valor del campo de entrada con el número formateado
  inputTelefono.value = telefono;
}

function validarTelefono() {
  const inputTelefono = document.getElementById("telefono-input");
  const telefono = inputTelefono.value;

  // Expresión regular para validar el número de teléfono
  const regexTelefono = /^9\d{2}-\d{3}-\d{3}$/;

  if (regexTelefono.test(telefono)) {
    document.getElementById("invalid-phone").style.display = "none";
  } else {
    document.getElementById("invalid-phone").style.display = "block";
  }
}


//Validación del número de tarjeta
function formatCardNumber() {
    const inputTarjeta = document.getElementById("tarjeta-input");
    let tarjeta = inputTarjeta.value;
  
    // Eliminar los guiones existentes para formatear el número nuevamente
    tarjeta = tarjeta.replace(/-/g, "");
  
    // Limitar el número de dígitos a dieciséis
    tarjeta = tarjeta.substr(0, 16);
  
    // Insertar guiones después de cada cuatro dígitos en los primeros dieciséis números
    tarjeta = tarjeta.replace(/(\d{4})(?=\d)/g, "$1-");
  
    // Actualizar el valor del campo de entrada con el número formateado
    inputTarjeta.value = tarjeta;
  }
  
  function validarTarjeta() {
    const inputTarjeta = document.getElementById("tarjeta-input");
    const tarjeta = inputTarjeta.value;
  
    // Expresión regular para validar el número de tarjeta
    const regexTarjeta = /^(\d{4}-){3}\d{4}$/;
  
    if (regexTarjeta.test(tarjeta)) {
      document.getElementById("invalid-card").style.display = "none";
    } else {
      document.getElementById("invalid-card").style.display = "block";
    }
  }
  
  // Asignar el evento "input" al campo de entrada para formatear automáticamente el número
  document.getElementById("tarjeta-input").addEventListener("input", formatCardNumber);
  

  //Validación de la fecha
  function formatFecha() {
    const inputFecha = document.getElementById("fecha-input");
    let fecha = inputFecha.value;
  
    // Eliminar las barras existentes para formatear la fecha nuevamente
    fecha = fecha.replace(/\//g, "");
  
    // Limitar el número de dígitos a cuatro
    fecha = fecha.substr(0, 4);
  
    // Insertar una barra después de los dos primeros dígitos
    fecha = fecha.replace(/(\d{2})(?=\d)/g, "$1/");
  
    // Actualizar el valor del campo de entrada con la fecha formateada
    inputFecha.value = fecha;
  }
  
  function validarFecha() {
    const inputFecha = document.getElementById("fecha-input");
    const fecha = inputFecha.value;
  
    // Obtener el mes y el año de la fecha
    const [mes, anio] = fecha.split("/");
  
    // Obtener el año actual
    const currentYear = new Date().getFullYear() % 100;
  
    // Expresión regular para validar la fecha en el formato MM/AA, con mes entre 01 y 12 y año entre 23 y 99
    const regexFecha = /^(0[1-9]|1[0-2])\/(2[3-9]|[3-9]\d)$/;
  
    if (regexFecha.test(fecha)) {
      const year = parseInt(anio);
      if (year >= 23 && year <= 99 && mes >= 1 && mes <= 12) {
        document.getElementById("invalid-date").style.display = "none";
        return;
      }
    }
    
    document.getElementById("invalid-date").style.display = "block";
  }
  
  // Asignar el evento "input" al campo de entrada para formatear automáticamente la fecha
  document.getElementById("fecha-input").addEventListener("input", formatFecha);
  
  
  //Validación del CVV
  function validarCVV() {
    const inputCVV = document.getElementById("cvv-input");
    const cvv = inputCVV.value;
  
    // Expresión regular para validar el CVV de tres dígitos
    const regexCVV = /^\d{3}$/;
  
    if (regexCVV.test(cvv)) {
      document.getElementById("invalid-cvv").style.display = "none";
    } else {
      document.getElementById("invalid-cvv").style.display = "block";
    }
  }
  
  // Asignar el evento "input" al campo de entrada para validar el CVV
  document.getElementById("cvv-input").addEventListener("input", validarCVV);


