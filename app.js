//Variables
let btnAdd = document.querySelector('#add-actividad');
let btnRemove = document.querySelector('#cerrar-add');
let btnConfirm = document.querySelector('#confirmar');
let btnRemoveAct = document.querySelector('#remove-actividad');

const pantallaInfo = document.querySelector('#get-info');
let input_act = document.querySelector('#input_act');
let input_col = document.querySelector('#input_col');
let instante = document.querySelector('#fecha-hora');

//Eventos
btnAdd.addEventListener('click', ()=>{
    pantallaInfo.style.display = 'flex';
    input_act.value = "";
});

btnRemove.addEventListener('click', ()=>{
    pantallaInfo.style.display = 'none';
})

btnConfirm.addEventListener('click', ()=>{
    let activityText = input_act.value;
    let fechaHora = instante.textContent;
    let color = input_col.value;
    CrearActividad(activityText, fechaHora, color);
    pantallaInfo.style.display = 'none';
})

//Funciones

function CrearActividad(activityText, fechaHora, color){
    
    if(activityText){
        let li = document.createElement('li');
        li.innerHTML = `<p>${activityText}</p> <p id="tiempo">${fechaHora}</p> <button id="remove-actividad">Eliminar</button>`;
        li.style.borderLeft = `5px solid ${color}`;
        document.getElementById('lista-actividades').appendChild(li);
        li.querySelector('#remove-actividad').addEventListener('click', () => {
            li.remove();
        });
        guardarTareas();
    }
}

function guardarTareas() {
    let tareas = [];
    document.querySelectorAll('#lista-actividades li').forEach(li => {
        let color = li.style.borderLeftColor;
        tareas.push({
            texto: li.querySelector('p').textContent,
            fechaHora: li.querySelector('p:nth-of-type(2)').textContent,
            color: color
        });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    tareas.forEach(tarea => CrearActividad(tarea.texto, tarea.fechaHora, tarea.color));
}

window.onload = cargarTareas;
