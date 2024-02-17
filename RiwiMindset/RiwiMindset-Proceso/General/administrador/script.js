import {URL_STUDENTS, URL_PSYCHOLOGISTS} from '../apiConnection/URLS.js';
import {post} from '../apiConnection/apiConnection.js';

/* img */
let profilePicEstudents = document.getElementById ('profilePictureEstudents');
let inputFileEstudents = document.getElementById ('inputFileEstudents');
let profilePicturePsychologists = document.getElementById ('profilePicturepsychologists');
let inputFileTeachers = document.getElementById ('inputFilePsychologists');



inputFileEstudents.onchange = function () {
  profilePicEstudents.src = URL.createObjectURL (inputFileEstudents.files[0]);
};

inputFileTeachers.onchange = function () {
  profilePicturePsychologists.src = URL.createObjectURL (inputFileTeachers.files[0]);
};

/* add to data base */

/* -------STUDENTS------- */
/* Select */
const formStudents = document.querySelector ('#formStudents');
const profilePictureEstudents = document.querySelector ('#profilePictureEstudents');
const nameStudent = document.querySelector ('#nameStudent');
const lastNameStudent = document.querySelector ('#lastNameStudent');
const emailStudent = document.querySelector ('#emailStudent');
const passwordStudent = document.querySelector ('#passwordStudent');
const confirmPasswordStudent = document.querySelector ('#confirmPasswordStudent');
const bornDateStudent = document.querySelector ('#bornDateStudent');
const clan = document.querySelector ('#clan');

/* Events */
formStudents.addEventListener ('submit', event => {
  event.preventDefault ();

  registerStudent ();
});

/* Funcion que verifica que todos los datos sean correctos y no se encuentren en la base de datos actual */
async function registerStudent () {
  const response = await fetch (URL_STUDENTS);
  const data = await response.json ();

  for (let i = 0; i < data.length; i++) {
    if (data[i].email === emailStudent.value) {
      alert ('Email ya se encuentra registrado');
      return;
    }
    /*       if (data[i].cedula === cedulaStudent.value) {
        alert ('Cedula ya se encuentra registrada');
        return;
      }  */
  }

  if (
    passwordStudent.value !== confirmPasswordStudent.value ||
    confirmPasswordStudent.value !== passwordStudent.value
  ) {
    alert ('Ambas contrasenas deben ser iguales');
    return;
  }

  const newStudent = {
    clan: clan.value,
    edad: bornDateStudent.value,
    nombre: `${nameStudent.value} ${lastNameStudent.value}`,
    foto: profilePictureEstudents.value,
    cedula: passwordStudent.value,
    email: emailStudent.value,
    admin: false,
    fecha: [],
    recomendaciones: [],
    observaciones: [],
    contrasena: confirmPasswordStudent.value,
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

  /* Si todos los datos son correctos, se agrega el objeto al json */
  post (URL_STUDENTS, newStudent);
  alert ('Registrado exitosamente');
}




/* ---------PSYCHOLOGISTS--------- */
/* Select */
const formPsychologists = document.querySelector ('#formPsychologists');
const namePsychologists = document.querySelector ('#namePsychologists');
const lastNamePsychologists = document.querySelector ('#lastNamePsychologists');
const emailPsychologists = document.querySelector ('#emailPsychologists');
const passwordPsychologists = document.querySelector ('#passwordPsychologists');
const confirmPasswordPsychologists = document.querySelector ('#confirmPasswordPsychologists');
const bornDatePsychologists = document.querySelector ('#bornDatePsychologists');

/* Events */
formPsychologists.addEventListener ('submit', event => {
  event.preventDefault ();

  registerPsychologists ();
});

/* Funcion que verifica que todos los datos sean correctos y no se encuentren en la base de datos actual */
async function registerPsychologists () {
  const response = await fetch (URL_PSYCHOLOGISTS);
  const data = await response.json ();

  for (let i = 0; i < data.length; i++) {
    if (data[i].email === emailPsychologists.value) {
      alert ('Email ya se encuentra registrado');
      return;
    }
    /*       if (data[i].cedula === cedulaStudent.value) {
        alert ('Cedula ya se encuentra registrada');
        return;
      }  */
  }

  if (
    passwordPsychologists.value !== confirmPasswordPsychologists.value ||
    confirmPasswordPsychologists.value !== passwordPsychologists.value
  ) {
    alert ('Ambas contrasenas deben ser iguales');
    return;
  }

  const newPsychologue = {
    edad: bornDatePsychologists.value,
    nombre: `${namePsychologists.value} ${lastNamePsychologists.value}`,
    foto: profilePicturePsychologists.value,
    cedula: passwordPsychologists.value,
    email: emailPsychologists.value,
    contrasena: confirmPasswordPsychologists.value,
    admin: false
  };

  /* Si todos los datos son correctos, se agrega el objeto al json */
  post (URL_PSYCHOLOGISTS, newPsychologue);
  alert ('Registrado exitosamente');
}