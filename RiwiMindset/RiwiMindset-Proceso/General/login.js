import {URL_STUDENTS, URL_PSYCHOLOGISTS, URL_ADMIN} from './apiConnection/URLS.js';
// Selectors
const container = document.getElementById('container')
const inicioProfesor = document.getElementById('inicioProfesor');
const inicioEstudiante = document.getElementById('inicioEstudiante');

/* Select Students */
let buttonLoginStudent = document.querySelector('#buttonLoginStudents');
const cedulaStudent = document.querySelector("#cedulaEstudiante");
const passwordStudent = document.querySelector("#passwordEstudiante");

/* Select Psycologist */
let buttonLoginPyschologist = document.querySelector('#buttonLoginPyschologist');
const cedulaProfesor = document.querySelector("#cedulaProfesor");
const passwordProfesor = document.querySelector("#passwordProfesor");

//Script animation Login
inicioProfesor.addEventListener('click',()=>{
    container.classList.add('active');
});
inicioEstudiante.addEventListener('click',()=>{
    container.classList.remove('active');
});


/* ----------- LOGIN STUDENTS -------- */
buttonLoginStudent.addEventListener('click', (e)=>{
    e.preventDefault()
    validateFormLoginStudents()
})
async function validateFormLoginStudents(){
    const response = await fetch(`${URL_STUDENTS}?cedula=${cedulaStudent.value}`);
    const data = await response.json();

    if (!data){
        console.error("Cedula no registrado");
        alert('Cedula no registrado');
        return;
    }

    if(data[0].contrasena != passwordStudent.value){
        console.error("Contrasena incorrecta");
        alert('Contrasena incorrecta')
        return;
    }

    localStorage.setItem("student",JSON.stringify(data[0].id));
    window.location.href = "../Students/HomeStudents/indexHomeEstudents.html"
}

/* ----------- LOGIN Psicologas -------- */
buttonLoginPyschologist.addEventListener('click', (e)=>{
    e.preventDefault();
    validateFormLoginPsycologist();
    validateFormLoginAdmin()
})

async function validateFormLoginPsycologist(){
    const response = await fetch(`${URL_PSYCHOLOGISTS}?cedula=${cedulaProfesor.value}`);
    const data = await response.json();

    if (!data){
        console.error("Cedula no registrado");
        alert('Cedula no registrado');
        return;
    }

    if(data[0].contrasena != passwordProfesor.value){
        console.error("Contrasena incorrecta");
        alert('Contrasena incorrecta')
        return;
    }

    localStorage.setItem("teacher",JSON.stringify(data[0].id));
    window.location.href = "../Teachers/HomeTeachers/indexTeachersHome.html"
};

/* LOGIN ADMIN */
async function validateFormLoginAdmin(){
    const response = await fetch(`${URL_ADMIN}?cedula=${cedulaProfesor.value}`);
    const data = await response.json();


    if (!data){
        console.error("Cedula no registrado");
        alert('Cedula no registrado');
        return;
    }

    if(data[0].contrasena != passwordProfesor.value){
        console.error("Contrasena incorrecta");
        alert('Contrasena incorrecta')
        return;
    }

    localStorage.setItem("admin",JSON.stringify(data[0].id));
    window.location.href = "./administrador/index.html"
};