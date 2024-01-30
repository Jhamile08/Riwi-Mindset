import { estudiantes } from "./bd.js"

// inyeccion de los estudiantes 

estudiantes.forEach((estudiantes)=>{
    console.log(estudiantes);
})

let arreglo = [];
injectionCoderHtml(estudiantes);



function injectionCoderHtml(coders){
    let inyeccionCoders = document.querySelector("#container-users");
    
    coders.forEach((estudiantes)=>{
        const {id,foto, nombre,edad,recomendaciones,observaciones,fecha} = estudiantes
        /* destructuring */
        const coderHtml = document.createElement("p");
        coderHtml.innerHTML= `
        <div class="estudents">
            <p id="nombre">${nombre}</p>
            <a href="/Html/IndexTeachersUsers-register.html" type="submit" id ="${id}" class= "actualizar">Actualizar</a>
            <a>Entrevista</a>
            <img src="${foto}" alt="" id="foto"></img>
        </div>

        `;
        inyeccionCoders.appendChild(coderHtml);
        const data = {
            id,
            foto,
            nombre,
            edad,
            recomendaciones,
            observaciones,
            fecha}

            arreglo.push(data);

        // Capturar con el queryselector

    })
    
    console.log(arreglo);
    
    const actualizar = document.querySelectorAll('.actualizar');
    
    actualizar.forEach((persona)=>{
        persona.addEventListener('click',(e)=>{
            localStorage.setItem("gente",JSON.stringify(arreglo[Number(e.target.getAttribute("id")) - 1]))  

        }) 
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


