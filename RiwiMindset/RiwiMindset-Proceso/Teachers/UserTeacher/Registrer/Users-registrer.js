// Generamos una url base
const urlBase = "http://localhost:4002/";
// Obtener el ID del estudiante del localStorage
const selectedStudentId = localStorage.getItem("selectedStudentId");

async function getStudent(studentId) {
    const response = await fetch(`${urlBase}students/${studentId}`);
    const data = await response.json();
    return data;
};

//Inyeccion del perfil del menu
async function inyect() {
    const student = await getStudent(selectedStudentId);
    // Inyectar foto y card 
    const user = document.querySelector('#data-user');
    const coderUser = document.createElement('div');

    coderUser.innerHTML = `
        <img src="${student.foto}" alt="" id="foto"></img>
        <p id="nombre">${student.nombre}</p>
        <p id="nombre">  edad: ${student.edad}</p>
    `;

    user.appendChild(coderUser);
};

async function inyectHistoria() {
    const student = await getStudent(selectedStudentId);
    const historial = document.querySelector("#registro");

    // Iterar sobre el array de fechas (puede ser cualquier otro array)
    for (let i = 0; i < student.fecha.length; i++) {
        const register = document.createElement('div');
        register.classList.add("registroEspecifico");
        register.innerHTML = `
            <p class="fechaEntrevista">
                <b> fecha: </b> ${student.fecha[i]}
            </p>
            <p class="registroInfo">
                ${student.recomendaciones[i]}
            </p>
            <button id="btnfuera btn" class="btnVerMas" onclick="mostrarVerMas(${i})" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ver más</button>
        `;
        historial.appendChild(register);
    }
};



// MODAL VER MAS
async function mostrarVerMas(i) {
    const student = await getStudent(selectedStudentId);

    const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
    parrafoRecomendaciones.innerHTML = `
            <p>${student.recomendaciones[i]}</p>
            <hr>
            <p>${student.fecha[i]}</p>
            `;

    const parrafoObservaciones = document.querySelector('.pObservaciones');
    parrafoObservaciones.innerHTML = `
            <p>${student.observaciones[i]}</p>
            <hr>
            <p>${student.fecha[i]}</p>
            `;



    document.querySelector('#editarRecomendaciones').addEventListener('click', editar(i));

    // Configurar el evento de clic del botón de edición
    document.querySelector('#editarObservaciones').addEventListener('click', editar(i));
};


async function editar(i) {
    const student = await getStudent(selectedStudentId);

    const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
        parrafoRecomendaciones.innerHTML= `
            <textarea style="width: 100%" id="textAreaRecomendaciones" oninput='${edicionReco()}'>${student.recomendaciones[i]}</textarea>
            <br>
            <p>fecha: ${student.fecha[i]}</p>
            <br>
        `;

        const parrafoObservaciones = document.querySelector('.pObservaciones');
        parrafoObservaciones.innerHTML= `
            <textarea style="width: 100%" id="textAreaObservaciones" oninput='${edicionObs()}'>${student.observaciones[i]}</textarea>
            <br>
            <p> fecha: ${student.fecha[i]}</p>
            <br>
        `;
};


async function edicionObs (){
    const student = await getStudent(selectedStudentId);

    const editarObservaciones = document.querySelector('#editarObservaciones');
    editarObservaciones.addEventListener('click', ()=>{
        console.log("nada");

        const editObs = document.querySelector('#textAreaObservaciones')

        console.log(editObs.textContent);

        student.observaciones = editObs.textContent

        console.log(student.observaciones);
    });    
}

async function edicionReco (){
    const student = await getStudent(selectedStudentId);

    const editarRecomendaciones = document.querySelector('#editarRecomendaciones');
    editarRecomendaciones.addEventListener('click', ()=>{
        console.log("nada");

        const editReco = document.querySelector('#textAreaRecomendaciones')

        console.log("no",editReco.textContent);

        student.recomendaciones = editReco.textContent

        console.log(student.recomendaciones);
    });    
}


// Llamada a las funciones
(async () => {
    await inyect();
    await inyectHistoria();
})();