const addReminderButton = document.getElementById('btn-new')
const remindersList = document.getElementById('list-reminders')

var title='';
var amount='';
var date='';
var place='';
var details='';

function addData(dTitle, dAmount, dDate, dPlace, dDetails) {
    title=dTitle;
    amount=dAmount;
    date=dDate;
    place=dPlace;
    details=dDetails;

}

function deleteReminder(deleteDivId) {

    let deleteDiv = document.getElementById(deleteDivId);
    const reminderTitle = deleteDiv.parentElement.parentElement.firstElementChild.innerText

    if (confirm(`¿Seguro que desea eliminar el recordatorio "${reminderTitle}"?`)){
        const reminderCard = deleteDiv.parentElement.parentElement.parentElement.parentElement;
        const reminderList = deleteDiv.parentElement.parentElement.parentElement.parentElement.parentElement;
        reminderList.removeChild(reminderCard);
    }
        
}

function createTitleAndOptions() {
    let currentReminderContainers = document.getElementsByClassName('reminder-container').length
    let titleReminder = document.createElement('h3');
    titleReminder.className = 'title-reminder';
    titleReminder.innerText = 'Recordatorio: '+title;

    let circleDiv = document.createElement('div');
    circleDiv.className='circle';

    let deleteDiv = document.createElement('div');
    deleteDiv.id = `remin-${currentReminderContainers+1}`
    deleteDiv.addEventListener("click", () => deleteReminder(`remin-${currentReminderContainers+1}`));
    let deleteIcon = document.createElement('img');
    deleteIcon.className = 'icon-option';
    deleteIcon.src = './assets/images/trashcan.png';
    deleteDiv.appendChild(deleteIcon);

    let editDiv = document.createElement('div');
    let editIcon = document.createElement('img');
    editIcon.className = 'icon-option';
    editIcon.src = './assets/images/pencil.png';
    editDiv.appendChild(editIcon);

    let optionsSection = document.createElement('div');
    optionsSection.className='options-section';

    optionsSection.appendChild(circleDiv)
    optionsSection.appendChild(deleteDiv)
    optionsSection.appendChild(editDiv)

    let titleAndOptions = document.createElement('div');
    titleAndOptions.className = 'title-and-options'

    titleAndOptions.appendChild(titleReminder);
    titleAndOptions.appendChild(optionsSection)

    return titleAndOptions;
}

function createParagraphDescriptions() {
    let paragraphsArray = [];

    let paragraphAmount = document.createElement('p');
    paragraphAmount.className='description';
    paragraphAmount.id='amount';
    paragraphAmount.innerText='Monto: '+amount;

    let paragraphDate = document.createElement('p');
    paragraphDate.className='description';
    paragraphDate.id='limit-date';
    paragraphDate.innerText='Fecha limite: '+date;

    
    let paragraphPlace = document.createElement('p');
    paragraphPlace.className='description';
    paragraphPlace.id='recommended-place';
    paragraphPlace.innerText='Lugar recomendado: '+place; 

    let paragraphDetails = document.createElement('p');
    paragraphPlace.className='description';
    paragraphDetails.id='details';
    paragraphDetails.innerText='Descripción: '+details;

    paragraphsArray.push(paragraphAmount)
    paragraphsArray.push(paragraphDate)
    if (place!=='') paragraphsArray.push(paragraphPlace)
    if (details!=='') paragraphsArray.push(paragraphDetails)

    return paragraphsArray;
}

function createReminderDescription() {
    let reminderDescription = document.createElement('div');

    let paragraphDescription = document.createElement('p');
    paragraphDescription.className='description';

    let paragraphs = createParagraphDescriptions();

    for (let i=0; i<paragraphs.length; i++) {
        reminderDescription.appendChild(paragraphs[i])
    }

    return reminderDescription;
}

function createReminder() {
    let currentReminderContainers = document.getElementsByClassName('reminder-container').length

    let reminderContainer = document.createElement('div');
    reminderContainer.className = 'reminder-container'
    reminderContainer.id = `reminder-numer-${currentReminderContainers+1}`

    reminderContainer.appendChild(createTitleAndOptions());
    reminderContainer.appendChild(createReminderDescription());

    return reminderContainer;
}

function addReminder() {
    let liElement = document.createElement('li')
    liElement.className='reminders-element-list'
    
    liElement.appendChild(createReminder())
    
    remindersList.appendChild(liElement);
}

