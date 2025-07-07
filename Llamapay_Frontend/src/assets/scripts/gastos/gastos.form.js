// Obtener elementos del DOM
const formContainer_i = document.getElementById('form-div');
const categoryInput = document.getElementById('expense-category');
const amountInput = document.getElementById('expense-amount');
const expenseInput = document.getElementById("expense-date");
const invalidData = document.getElementById("invalid-data");

function displayForm() {
    formContainer_i.style.left='0';
}

function emptyForm() {
    categoryInput.value='';
    amountInput.value='';
    expenseInput.value='';
}

function contractFrom() {
    emptyForm();

    formContainer_i.style.left = '-100%';
}

function obtenerNumeroMes(nombreMes) {
    const meses = {
        'Enero': 0,
        'Febrero': 1,
        'Marzo': 2,
        'Abril': 3,
        'Mayo': 4,
        'Junio': 5,
        'Julio': 6,
        'Agosto': 7,
        'Septiembre': 8,
        'Octubre': 9,
        'Noviembre': 10,
        'Diciembre': 11
    };
;

    return meses[nombreMes] || -1;
}
  


document.addEventListener("DOMContentLoaded", function() {
    // Obtener fecha actual
    const currentDate = new Date();

    // Establecer límite máximo en el input de fecha
    expenseInput.max = getCurrentDateString();

    // Agregar evento al input de fecha
    expenseInput.addEventListener("change", function(event) {
      const selectedDate = new Date(event.target.value);
      selectedDate.setDate(selectedDate.getDate()+1);

      let calendarDate = document.getElementById('title-month').textContent;
      let calendarMonthString = calendarDate.split(',')[0];
      console.log(calendarMonthString);

      let calendarMonth = obtenerNumeroMes(calendarMonthString);
      let calendarYear = parseInt(calendarDate.split(', ')[1]);

      // Validar que la fecha no sea mayor a la fecha actual y esté dentro del mes actual
      if (selectedDate > currentDate || selectedDate.getMonth() !== calendarMonth || selectedDate.getFullYear() !== calendarYear) {
        invalidData.style.display='block';
        expenseInput.value = "";
      }
      else {
        invalidData.style.display='none';
      }
    });

    // Obtener la fecha actual en formato YYYY-MM-DD
    function getCurrentDateString() {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
  });