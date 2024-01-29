import { estudiantes } from "./bd.js"

// inyeccion de los estudiantes 

document.addEventListener("DOMContentLoaded", ()=>{
    injectionCoderHtml(estudiantes);
});

function injectionCoderHtml(coders){
    let inyeccionCoders = document.querySelector("#container-users");
    coders.forEach((estudiantes)=>{
        /* destructuring */
    const {foto, nombre} = estudiantes
        const coderHtml = document.createElement("p");
        coderHtml.innerHTML= `
        <div class="estudents" class="" >
            <p id="nombre">${nombre}</p>
            <a href="./IndexTeachersUsers-register.html">Actualizar</a>
            <a>Entrevista</a>
            <img src="${foto}" alt=""></img>
        </div>

        `;
        inyeccionCoders.appendChild(coderHtml);
    })
};

// evento input para guardar el nombre a buscar 

document.addEventListener('input',(e)=>{
    let apellido = e.target.value
    console.log(apellido);
    nombre(apellido);
})

// funcion para buscar coders (se usa CSS)

function nombre(apellido){
    const name = document.querySelectorAll("#nombre")
    console.log(name);
    name.forEach(e =>{
        if(e.textContent.toLocaleLowerCase().includes(apellido.toLocaleLowerCase())){
            console.log("coincide")
            e.parentElement.classList.remove('buscador')
        }else{
            console.log("no coincide");
            e.parentNode.classList.add('buscador')
        }
})}



