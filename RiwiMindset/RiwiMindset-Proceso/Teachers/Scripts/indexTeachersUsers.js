import { estudiantes } from "./bd.js"

// inyeccion de los estudiantes 

estudiantes.forEach((estudiantes)=>{
    console.log(estudiantes);
})

injectionCoderHtml(estudiantes);


function injectionCoderHtml(coders){
    let inyeccionCoders = document.querySelector("#container-users");
    coders.forEach((estudiantes)=>{
        /* destructuring */
    const {foto, nombre,edad,recomendaciones,observaciones,fecha} = estudiantes
        const coderHtml = document.createElement("p");
        coderHtml.innerHTML= `
        <div class="estudents">
            <p id="nombre">${nombre}</p>
            <a href="/Html/IndexTeachersUsers-register.html" type="submit" class= "actualizar">Actualizar</a>
            <a>Entrevista</a>
            <img src="${foto}" alt="" id="foto"></img>
        </div>

        <div class="none">
            <p id="edad">${edad}</p>
            <p id="recomendaciones">${recomendaciones}</p>
            <p id="observaciones">${observaciones}</p>
            <p id="fecha">${fecha}</p>
            <img src="${foto}" alt="" id="fotos">${foto}</img>
        </div>
        `;
        inyeccionCoders.appendChild(coderHtml);

    })


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
};

/* Captura de datos y envio al local storage */

const actualizar = document.querySelector('.actualizar')

actualizar.addEventListener('click',()=>{
    console.log("captura");
    captura();
}) 


function captura(){
        
    const nombre = document.querySelector('#nombre').textContent;
    const edad = document.querySelector('#edad').textContent;    
    const fecha = document.querySelector('#fecha').textContent;
    const recomendaciones = document.querySelector('#recomendaciones').textContent;
    const observaciones = document.querySelector('#observaciones').textContent;
    const foto = document.getElementById('foto')

    let registro = [nombre,edad,fecha,recomendaciones,observaciones,foto.src]
    localStorage.setItem("gente",JSON.stringify(registro))  

};
