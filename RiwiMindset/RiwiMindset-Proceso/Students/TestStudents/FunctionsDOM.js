// selectors
let contentInfo = document.querySelector(".contentInfoTest");
let containerInfo = document.querySelector(".modal-body");
// cards selectors
let inglesCard = document.querySelector("#ingles");
let logicasCard = document.querySelector("#logicas");
let mentalesCard = document.querySelector("#mentales");
let modalTitle = document.querySelector(".modal-title")
//selectores para validacion de preguntas
const btnSiguiente = document.querySelector(".btn-siguiente");
const inputs = document.querySelector(".content-test input")

import { get, post } from "./../../General/apiConnection/apiConnection.js";
import { URL_STUDENTS, URL_TEST  } from "./../../General/apiConnection/URLS.js";

// renderizar info del modal sobre el test
let preguntaActual = 0; // pregunta actual
export async function renderModal(cardId){
    const data = await get(URL_TEST)
 data.forEach(e => {
        if (e.ingles.nombre === cardId) {
            modalTitle.textContent = `${e.ingles.nombre}`
            contentInfo.innerHTML = `
                 <p>Duracion aprox: ${e.ingles.duracion}</p>
                 <p>Cantidad de preguntas: ${e.ingles.preguntas}</p>
            `;
            containerInfo.appendChild(contentInfo);
              // llamar a la funcion de agregar preguntas
               injectionPreguntaHtml(e.preguntasIngles, e.resultadosIngles);
        }else if(e.mentales.nombre === cardId){
            modalTitle.textContent = `${e.mentales.nombre}`
            contentInfo.innerHTML = `
                 <p>Duracion aprox: ${e.mentales.duracion}</p>
                 <p>Cantidad de preguntas: ${e.mentales.preguntas}</p>
            `;
            containerInfo.appendChild(contentInfo);
              // llamar a la funcion de agregar preguntas
               injectionPreguntaHtml(e.preguntasMentales, e.resultadosMentales); 
        }else{
            modalTitle.textContent = `${e.logicas.nombre}`
            contentInfo.innerHTML = `
                 <p>Duracion aprox: ${e.logicas.duracion}</p>
                 <p>Cantidad de preguntas: ${e.logicas.preguntas}</p>
            `;
            containerInfo.appendChild(contentInfo);
              // llamar a la funcion de agregar preguntas
              injectionPreguntaHtml(e.preguntasLogicas, e.resultadosLogicas); 
        }
    });
}
// Función para inyectar preguntas en el HTML según el nivel del estudiante
async function injectionPreguntaHtml(preguntas, resultado) {
  const data = await get(URL_STUDENTS);
  const studentActual = JSON.parse(localStorage.getItem("student"));

  // Recorrer cada estudiante para encontrar el que inició sesión y verificar su nivel
  data.forEach(student => {
      if (studentActual == student.id && student.levelActual === "begginer") {
          preguntaDependeNivel(preguntas.begginer, resultado, student);
      }
  });
}

// Función para inyectar preguntas según el nivel
function preguntaDependeNivel(preguntas, resultado, student) {
  let indicePreguntaActual = 0; // Variable para llevar el seguimiento del índice de la pregunta actual
  console.log(preguntas);
  // Función interna para procesar la respuesta seleccionada
  async function procesarRespuestaSeleccionada(respuestaSeleccionada, resultado, student) {
      if (respuestaSeleccionada == "true") {
          resultado.buenas++;
      } else if (respuestaSeleccionada == "false"){
          resultado.malas++;
      }
      console.table(resultado);
      console.log(student.puntaje);
      
      if (resultado.nombre == "ingles" && student.levelActual == "begginer") {
        console.log(student.puntaje.ingles.begginer); 
        let fechaActual = new Date();
        // Crear un nuevo objeto con los datos actualizados
        let actualizado = {
            // nuevo intento
            intentos: [...student.puntaje.ingles.begginer.intentos, 1],
            //nueva fecha
            fecha: [...student.puntaje.ingles.begginer.fecha, fechaActual],
            // nuevo resultado
            puntaje: [...student.puntaje.ingles.begginer.puntaje, resultado]
        };
        // Actualizar los resultados en la base de datos
        const response = await post(`${URL_STUDENTS}/${student.id}`, actualizado);
        console.log(response); 
    }
    console.log(student);
  }

  const inyeccionPreguntas = document.querySelector(".containerHome");

  // Función interna para mostrar la próxima pregunta
  function mostrarSiguientePregunta() {
      inyeccionPreguntas.innerHTML = ""; // Limpiar el contenedor antes de inyectar la siguiente pregunta

      const coderHtml = document.createElement("div");
      coderHtml.classList.add("content-test");

      const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
      const preguntaHtml = document.createElement("p");
      preguntaHtml.classList.add("pregunta-test");
      preguntaHtml.textContent = pregunta.contenido;
      coderHtml.appendChild(preguntaHtml);

      pregunta.respuestas.forEach(respuesta => {
          const respuestaHtml = document.createElement("label");
          respuestaHtml.innerHTML = `<input type="radio" value="${respuesta.correcta}" name="respuesta">${respuesta.contenido}`;
          coderHtml.appendChild(respuestaHtml);
      });

      inyeccionPreguntas.appendChild(coderHtml);
  }

  // Mostrar la primera pregunta
  mostrarSiguientePregunta();

  // Agregar un event listener al botón "Siguiente"
  btnSiguiente.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".content-test input:checked");

      if (inputs.length === 0) {
          alert("Por favor, selecciona una respuesta antes de continuar.");
          return;
      }

      // Obtener la respuesta seleccionada
      const respuestaSeleccionada = inputs[0].value;

      // Procesar la respuesta seleccionada
      procesarRespuestaSeleccionada(respuestaSeleccionada, resultado, student);

      // Incrementar el índice para pasar a la siguiente pregunta
      indicePreguntaActual++;

      if (indicePreguntaActual < preguntas.length) {
          // Si hay más preguntas, mostrar la siguiente pregunta
          mostrarSiguientePregunta();
      } else {
          console.log("¡Fin del cuestionario!");
          recomendacionTest(resultado);
      }
  });
}

  function recomendacionTest(resultado) {
    if(resultado.buenas >  resultado.malas){
      alert("muchasbuenas")
    }
  }
  

// valida que el usuario haya respondido

export function validateQuestion() {
    btnSiguiente.addEventListener("click", () => {
      
    const inputs = document.querySelectorAll(".content-test input:checked");
  
    if (inputs.length === 0) {
      alert("Por favor, selecciona una respuesta antes de continuar.");
      return; // input vacio, lazar error
    }
    // Acceder a la respuesta seleccionada para guardar el valor
    const respuestaSeleccionada = inputs[0].value

    if (respuestaSeleccionada == "true") {
      resultadosIngles.buenas++;
    } else{
      resultadosIngles.malas++;
    }
    console.log(resultadosIngles);
    console.log(typeof resultadosIngles.buenas);

    preguntaActual++;
  
    if (preguntaActual < preguntasIngles.length) {
      injectionPreguntaHtml(preguntasIngles[preguntaActual]);
    } else {
      console.log("¡Fin del cuestionario!");
      //funcion para recomendarle contenido
      recomendacionTest()
    }
    let suma = resultadosIngles.buenas + resultadosIngles.malas
    let porcentajOperacion = suma / resultadosIngles.buenas 
    console.log(suma)
});
}

