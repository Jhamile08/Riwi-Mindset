import { estudiantes } from "./bd.js"

// inyeccion de los estudiantes 

injectionCoderHtml(estudiantes);


function injectionCoderHtml(coders){
    let inyeccionCoders = document.querySelector("#container-users");
    coders.forEach((estudiantes)=>{
        /* destructuring */
    const {foto, nombre} = estudiantes
        const coderHtml = document.createElement("p");
        coderHtml.innerHTML= `
        <div class="estudents" class="" >
            <p id="nombre">${nombre}</p>
            <a class= "actualizar" href="">Actualizar</a>
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


// evento para guardar datos en el local storage 


const actualizar = document.querySelectorAll('.actualizar');



actualizar.forEach(elemento =>{
    let name = ""
    elemento.addEventListener('click',()=>{
        const {nombre} = estudiantes 
        name = `${nombre.value}`
        console.log(name);
        captura(name)
    })
})



function captura(datos){
    localStorage.setItem('coder',JSON.stringify(datos));
};  