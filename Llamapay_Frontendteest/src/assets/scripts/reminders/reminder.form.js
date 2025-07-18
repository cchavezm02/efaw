const formContainer = document.getElementById('form-div');
const inputNombre = document.getElementById('nombre-input');
const inputAmount = document.getElementById('amount-input');
const inputDate = document.getElementById('date-input');
const inputPlace = document.getElementById('place-input');
const inputDetails = document.getElementById('details-input');
const invalidData = document.getElementById('invalid-data');
const invalidDate = document.getElementById('invalid-date');

function displayForm() {
    formContainer.style.left = '0'
}

function emptyForm() {
    inputNombre.value='';
    inputAmount.value='';
    inputDate.value='';
    inputPlace.value='';
    inputDetails.value='';

    
}

function contractFrom() {
    emptyForm();

    formContainer.style.left = '-100%'
}

function verifyDate() {
    let dateReminder = inputDate.value;

    let fechaSeleccionada = new Date(dateReminder);
    let fechaActual=new Date();

    if (fechaSeleccionada>fechaActual) return true;
    return false;
}

function verifyData() {
    let nombreReminder = inputNombre.value;
    let amountReminder = inputAmount.value;
    let dateReminder = inputDate.value;

    if (nombreReminder==='') return false;
    if (amountReminder==='') return false;
    if (dateReminder==='') return false;

    return true;
}


function acceptButton() {
    invalidData.style.display='none';
    invalidDate.style.display='none';

    let nombreReminder = inputNombre.value;
    let amountReminder = inputAmount.value;
    let dateReminder = inputDate.value;
    let placeReminder = inputPlace.value;
    let detailsReminder = inputDetails.value;

    if (verifyData() && verifyDate()) {
        
        contractFrom();
    
        addData(nombreReminder, amountReminder, dateReminder, placeReminder, detailsReminder);
        addReminder();
        return;
    }
    if (!verifyData()) {
        invalidData.style.display='block';
    }
    if (!verifyDate()) {
        invalidDate.style.display='block';
    }

}