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
            ${student.recomendaciones[i]}
            <br>
            ${student.fecha[i]}
            `;

    const parrafoObservaciones = document.querySelector('.pObservaciones');
    parrafoObservaciones.innerHTML = `
            ${student.observaciones[i]}
            <br>
            ${student.fecha[i]}
            `;

    document.querySelector('#editarRecomendaciones').addEventListener('click', async () => {
        await editar(i);
    });

    document.querySelector('#editarObservaciones').addEventListener('click', async () => {
        await editar(i);
    });
};


async function editar(i) {
    const student = await getStudent(selectedStudentId);

    const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
    parrafoRecomendaciones.innerHTML = `
            <textarea style="width: 100%" id="textAreaRecomendaciones">${student.recomendaciones[i]}</textarea>
            <br>
            <p>fecha: ${student.fecha[i]}</p>
            <br>
            `;

    const parrafoObservaciones = document.querySelector('.pObservaciones');
    parrafoObservaciones.innerHTML = `
            <textarea style="width: 100%" id="textAreaObservaciones">${student.observaciones[i]}</textarea>
            <br>
            <p> fecha: ${student.fecha[i]}</p>
            <br>
            `;
};



/* // Escuchar el evento de clic en el botón de guardar observaciones
document.querySelector('#editarObservaciones').addEventListener('click', async () => {
    await edicionObs();
    // Aquí puedes agregar más acciones después de guardar las observaciones
    console.log('Observaciones guardadas correctamente');
});

// Escuchar el evento de clic en el botón de guardar recomendaciones
document.querySelector('#editarRecomendaciones').addEventListener('click', async () => {
    await edicionReco();
    // Aquí puedes agregar más acciones después de guardar las recomendaciones
    console.log('Recomendaciones guardadas correctamente');
});

async function edicionObs() {
    const student = await getStudent(selectedStudentId);
    const editObs = document.querySelector('#textAreaObservaciones');
    student.observaciones = editObs.value;
};

async function edicionReco() {
    const student = await getStudent(selectedStudentId);
    const editReco = document.querySelector('#textAreaRecomendaciones');
    student.recomendaciones = editReco.value;
}; */




// Llamada a las funciones
(async () => {
    await inyect();
    await inyectHistoria();
})();