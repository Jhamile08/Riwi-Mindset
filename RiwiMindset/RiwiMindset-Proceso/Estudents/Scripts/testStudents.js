import { preguntas } from "/Teachers/Scripts/bd.js";

document.addEventListener("DOMContentLoaded", () => {
  let preguntaActual = 0; // pregunta actual
  injectionPreguntaHtml(preguntas[preguntaActual]);

  const btnSiguiente = document.getElementById("btn-siguiente");
  btnSiguiente.addEventListener("click", () => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
      injectionPreguntaHtml(preguntas[preguntaActual]);
    } else {
      // inyectar funcion para cuando termine el formulario
      console.log("¡Fin del cuestionario!");
    }
  });
});

function injectionPreguntaHtml(pregunta) {
  let inyeccionPreguntas = document.querySelector("#container-test");
  inyeccionPreguntas.innerHTML = ""; 

  const coderHtml = document.createElement("div");
  coderHtml.classList.add("content-test");

  coderHtml.innerHTML = `
    <p class="pregunta-test">${pregunta.contenido}</p>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[0].id}">${pregunta.respuestas[0].contenido}, Correcta: ${pregunta.respuestas[0].correcta}</label><br>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[1].id}">${pregunta.respuestas[1].contenido}, Correcta: ${pregunta.respuestas[1].correcta}</label><br>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[2].id}">${pregunta.respuestas[2].contenido}, Correcta: ${pregunta.respuestas[2].correcta}</label>
  `;
 
  inyeccionPreguntas.appendChild(coderHtml);
}

