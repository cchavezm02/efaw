import Formulario from "./objectives.form.js";

const btnAbrirPopUP = document.querySelector("#btn-new");
const btnCerrarPopUP = document.querySelector("#btn-close");

const modal =  document.querySelector("#modal");

const elem = document.querySelector("#Objetivos")

btnAbrirPopUP.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrarPopUP.addEventListener("click", ()=> {
    modal.close();
});

const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", event=>{
    event.preventDefault();
    const target = event.target;

    const agregar = new Formulario(target.nombreFormulario.value, target.montoFormulario.value, target.fechaFormulario.value, target.descripcionFormulario.value);
    mostrar(agregar);
    formulario.reset(); // resetea el formulario
    modal.close();
});

let IdContador = 0;

function mostrar(obj) {
    IdContador++;

    Objetivos.innerHTML += `
    <div class="card-Objetivos" id="${IdContador}">
        <img src="../assets/images/x-lg.svg" alt="Eliminar">
        <h3>${obj.getNombre()}</h3>
        <p>El Monto a Ahorrar es: S/.${obj.getMonto()}</p>
        <p>La Fecha Límite es: ${obj.getFecha()}</p>
        <p>${obj.getDescripcion()}</p>
    </div>
    `
};

const acceptDeleteButton = document.getElementById('btn-accept');
const cancelDeleteButton = document.getElementById('btn-cancel');
const containerDelete = document.getElementById('container-delete');

cancelDeleteButton.addEventListener('click', () => {containerDelete.style.top='-100%';});


// acceptDeleteButton.addEventListener("click", eliminar(event.target.parentNode.id));
// cancelDeleteButton.addEventListener('click', function() {containerDelete.style.top='-100%';})

Objetivos.addEventListener("click", (event)=>{
    if(event.srcElement.nodeName == "IMG"){
        const containerDelete = document.getElementById('container-delete');
        containerDelete.style.top='0';
        
        acceptDeleteButton.addEventListener('click', function() {
            eliminar(event.target.parentNode.id);
            containerDelete.style.top='-100%';
        })
    };
});

//eliminar(event.target.parentNode.id);

let eliminar = (id) => {
    let ObjEliminar = document.getElementById(id);
    Objetivos.removeChild(ObjEliminar);
}
