import {URL_STUDENTS, URL_PSYCHOLOGISTS} from '../apiConnection/URLS.js';
import {post} from '../apiConnection/apiConnection.js';

/* img */
let profilePicEstudents = document.getElementById ('profilePictureEstudents');
let inputFileEstudents = document.getElementById ('inputFileEstudents');
let profilePicTeachers = document.getElementById ('profilePictureTeachers');
let inputFileTeachers = document.getElementById ('inputFileTeachers');

inputFileEstudents.onchange = function () {
  profilePicEstudents.src = URL.createObjectURL (inputFileEstudents.files[0]);
};

inputFileTeachers.onchange = function () {
  profilePicTeachers.src = URL.createObjectURL (inputFileTeachers.files[0]);
};

/* add to data base */

/* -------STUDENTS------- */
/* Select */
const formStudents = document.querySelector ('#formStudents');
const profilePictureEstudents = document.querySelector (
  '#profilePictureEstudents'
);
const nameStudent = document.querySelector ('#nameStudent');
const lastNameStudent = document.querySelector ('#lastNameStudent');
const emailStudent = document.querySelector ('#emailStudent');
const passwordStudent = document.querySelector ('#passwordStudent');
const confirmPasswordStudent = document.querySelector (
  '#confirmPasswordStudent'
);
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
    foto: profilePicEstudents.value,
    cedula: passwordStudent.value,
    email: emailStudent.value,
    admin: false,
    fecha: [20 / 30 / 2023, "drtdtr"],
    recomendaciones: ['primera reco', 'segunda reco'],
    observaciones: [
      'mmmmmm Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, debitis explicabo. Dolor porro sapiente repudiandae eligendi non nostrum ad aliquid, ratione dignissimos expedita eos reiciendis, inventore illum',
      'asdkaposdkaopsdkaopdssoapdk',
    ],
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

/* psychologists */
