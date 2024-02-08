
//Generamos una url base
const urlBase = "http://localhost:4002/";
// Seleccionamos el contenedor principal donde vamos a inyectars los coders
let inyeccionCoders = document.querySelector("#container-users");
//Funcion que obtiene los datos desde el archivo json
async function getStudent() {
    const response = await fetch(`${urlBase}students`);
    const data = response.json();
    return data;
};


async function inyect() {
    const students = await getStudent();
    /* inyectar foto y card */
    const user = document.querySelector('#data-user');
    const coderUser = document.createElement('div')
    
    students.forEach(student => {
        coderUser.innerHTML= `
            <img src="${student.foto}" alt="" id="foto";></img>
            <p id="nombre">${student.nombre}</p>
            <p id="nombre">  edad: ${student.edad}</p>
            
        `;
    })
    user.appendChild(coderUser);

    /* inyectar fecha */


}

inyect();



async function inyectHistoria() {
    const students = await getStudent();
    const historial = document.querySelector("#registro")
    
    const register = document.createElement('div')
    students.forEach(student => {
        register.innerHTML = `
        <div class="registroEspecifico">
        <p class="fechaEntrevista">
        <b> fecha: </b> ${student.fecha}
        </p>
        <p class="registroInfo">
            ${student.recomendaciones}
        </p>
        <button id="btnfuera btn" class="btnVerMas" onclick="mostrarVerMas()" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ver más</button>
        `
        
    })
    /* CAMBIO DE CLASE TN 2 */
    /* EL BOTON 2  */
    historial.appendChild(register);
}
improve()
async function improve() {
    const students = await getStudent();
    students.forEach(student => {

            inyectHistoria()

            /* MODAL VER MAS */
            async function mostrarVerMas(i) {
                const students = await getStudent();

                const btn1 = document.querySelector('.btn1');
                btn1.innerText = "VER RECOMENDACIONES"; /* BOTONES DENTRO DEL MODAL */

                const btn3 = document.querySelector('.btn3');
                btn3.innerText = "BOTON 3";

                const btn2 = document.querySelector('.btn2');
                btn2.innerText = "VER OBSERVACIONES";

                const btn4 = document.querySelector('.btn4');
                btn4.innerText = "BOTON 4";

                /* evento click para las funciones de editar */

                const parrafoObservaciones = document.querySelector('.pObservaciones');
                parrafoObservaciones.innerHTML = `
        ${student.observaciones}
        <br>
        ${student.fecha}
        `
                const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
                parrafoRecomendaciones.innerHTML = `
        ${student.recomendaciones}
        <br>
        ${student.fecha}
        `
                btn3.addEventListener('click', mostrarEditar(i));
                btn4.addEventListener('click', mostrarEditar(i));

            }

            function mostrarEditar(i) {

                console.log("funcion editar ");
                const parrafoObservaciones = document.querySelector('.pObservaciones');
                parrafoObservaciones.innerHTML = `
        <textarea style="width: 100%" id="textAreaObservaciones" oninput='${edicionObs()}'>${student.observaciones}</textarea>
        <br>
        <p> fecha: ${student.fecha}</p>
        <br>
        `
                const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
                parrafoRecomendaciones.innerHTML = `
        <textarea style="width: 100%" id="textAreaRecomendaciones" oninput='${edicionReco()}'>${student.recomendaciones}</textarea>
        <br>
        <p>fecha: ${student.fecha}</p>
        <br>
        `
            }
        
    });
   
}




function edicionObs (){
    const btn3 = document.querySelector('.btn3');
    btn3.addEventListener('click', ()=>{
        console.log("nada");

        const editObs = document.querySelector('#textAreaObservaciones')

        console.log(editObs.textContent);

        students.observaciones[i] = editObs.textContent

        console.log(students.observaciones[i]);
    });    
}

function edicionReco (){
    const btn4 = document.querySelector('.btn4');
    btn4.addEventListener('click', ()=>{
        console.log("nada");

        const editReco = document.querySelector('#textAreaRecomendaciones')

        console.log("no",editReco.textContent);

        students.recomendaciones[i] = editReco.textContent

        console.log(students.recomendaciones[i]);
    });    
}