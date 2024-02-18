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

import { get } from "./../../General/apiConnection/apiConnection.js";
import { URL_STUDENTS } from "./../../General/apiConnection/URLS.js";

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

// inyectar preguntas desde la bd
async function injectionPreguntaHtml(pregunta, resultado) {
    const data = await get(URL_STUDENTS)
    console.log(pregunta, resultado)
    console.log(pregunta.begginer[0].respuestas[0].contenido)
    if (data.resultado.level == "begginer") {
        let inyeccionPreguntas = document.querySelector(".containerHome");
        inyeccionPreguntas.innerHTML = "";
        
        const coderHtml = document.createElement("div");
        coderHtml.classList.add("content-test");
        
        // Recorremos todas las preguntas
        pregunta.begginer.forEach((pregunta, index) => {
            const preguntaHtml = document.createElement("p");
            preguntaHtml.classList.add("pregunta-test");
            preguntaHtml.textContent = pregunta.contenido;
            
            coderHtml.appendChild(preguntaHtml);
            
            // Recorremos todas las respuestas de cada pregunta
            pregunta.respuestas.forEach(respuesta => {
                const respuestaHtml = document.createElement("label");
                respuestaHtml.innerHTML = `<input type="radio">${respuesta.contenido}`;
                coderHtml.appendChild(respuestaHtml);
            });
        });
        
        inyeccionPreguntas.appendChild(coderHtml);
    }

  }
  
  function recomendacionTest() {
    if(resultadosIngles.buenas >  resultadosIngles.malas){
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

