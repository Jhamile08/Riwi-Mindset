import { URL_STUDENTS, URL_PSYCHOLOGISTS } from '../apiConnection/URLS.js';
import { post } from '../apiConnection/apiConnection.js';

/* img */
let profilePicEstudents = document.getElementById('profilePictureEstudents');
let inputFileEstudents = document.getElementById('inputFileEstudents');
let profilePicturePsychologists = document.getElementById('profilePicturepsychologists');
let inputFileTeachers = document.getElementById('inputFilePsychologists');

let newStudent = {}; // Objeto para almacenar los datos del nuevo estudiante

inputFileEstudents.onchange = function () {
  const file = inputFileEstudents.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    profilePicEstudents.src = reader.result; // Asigna la imagen al elemento img
    newStudent.foto = reader.result; // Asigna la URL base64 al objeto newStudent
  };
};

inputFileTeachers.onchange = function () {
  const file = inputFileTeachers.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    profilePicturePsychologists.src = reader.result; // Asigna la imagen al elemento img
    newStudent.foto = reader.result; // Asigna la URL base64 al objeto newStudent
  };
};

/* -------STUDENTS------- */
/* Select */
const formStudents = document.querySelector('#formStudents');
const nameStudent = document.querySelector('#nameStudent');
const lastNameStudent = document.querySelector('#lastNameStudent');
const cedulaStudent = document.querySelector("#idStudent")
const emailStudent = document.querySelector('#emailStudent');
const celStudent = document.querySelector('#celStudent');
const passwordStudent = document.querySelector('#passwordStudent');
const confirmPasswordStudent = document.querySelector('#confirmPasswordStudent');
const bornDateStudent = document.querySelector('#bornDateStudent');
const clan = document.querySelector('#clan');


/* Events */
formStudents.addEventListener('submit', event => {
  event.preventDefault();
  registerStudent();
});

async function registerStudent() {
  const response = await fetch(URL_STUDENTS);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === cedulaStudent.value) {
      alert('Cedula ya se encuentra registrada');
      return;
    }

    if (data[i].email === emailStudent.value) {
      alert('Email ya se encuentra registrado');
      return;
    }
  }

  if (
    passwordStudent.value !== confirmPasswordStudent.value ||
    confirmPasswordStudent.value !== passwordStudent.value
  ) {
    alert('Ambas contrasenas deben ser iguales');
    return;
  }

  const edad = calcularEdad(bornDateStudent.value);

  newStudent = {
    id: cedulaStudent.value,
    nombre: `${nameStudent.value} ${lastNameStudent.value}`,
    email: emailStudent.value,
    phone: celStudent.value,
    password: passwordStudent.value,
    clan: clan.value,
    edad: edad,
    foto: [newStudent.foto], // Asigna la URL base64 del objeto newStudent
    fecha: [],
    recomendaciones: [],
    observaciones: [],
    puntaje: {
      ingles: {
        begginer: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        middle: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        advance: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
      },
      logicas: {
        begginer: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        middle: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        advance: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
      },
      mentales: {
        begginer: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        middle: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
        advance: {
          intentos: [],
          fecha: [],
          puntaje: [],
        },
      },
    },
  };

  post(URL_STUDENTS, newStudent);
  alert('Registrado exitosamente');
}




/* ---------PSYCHOLOGISTS--------- */
/* Select */
const formPsychologists = document.querySelector('#formPsychologists');
const namePsychologists = document.querySelector('#namePsychologists');
const lastNamePsychologists = document.querySelector('#lastNamePsychologists');
const emailPsychologists = document.querySelector('#emailPsychologists');
const cedulaPsychologist = document.querySelector('#idPsychologist');
const passwordPsychologists = document.querySelector('#passwordPsychologists');
const confirmPasswordPsychologists = document.querySelector('#confirmPasswordPsychologists');

/* Events */
formPsychologists.addEventListener('submit', event => {
  event.preventDefault();

  registerPsychologists();
});

/* Funcion que verifica que todos los datos sean correctos y no se encuentren en la base de datos actual */
async function registerPsychologists() {
  const response = await fetch(URL_PSYCHOLOGISTS);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === cedulaPsychologist.value) {
      alert('Cedula ya se encuentra registrada');
      return;
    }

    if (data[i].email === emailPsychologists.value) {
      alert('Email ya se encuentra registrado');
      return;
    }

  }

  if (
    passwordPsychologists.value !== confirmPasswordPsychologists.value ||
    confirmPasswordPsychologists.value !== passwordPsychologists.value
  ) {
    alert('Ambas contrasenas deben ser iguales');
    return;
  }

  const newPsychologue = {
    id: cedulaPsychologist.value,
    nombre: `${namePsychologists.value} ${lastNamePsychologists.value}`,
    email: emailPsychologists.value,
    password: passwordPsychologists.value,
    foto: profilePicturePsychologists.value,
  };

  /* Si todos los datos son correctos, se agrega el objeto al json */
  post(URL_PSYCHOLOGISTS, newPsychologue);
  alert('Registrado exitosamente');
}




/* FUNCIONES */

function calcularEdad(fechaNacimiento) {
  const fechaNac = new Date(fechaNacimiento);
  const fechaActual = new Date();

  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
  const mesActual = fechaActual.getMonth();
  const mesNacimiento = fechaNac.getMonth();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNac.getDate())) {
    edad--;
  }

  return edad;
}
