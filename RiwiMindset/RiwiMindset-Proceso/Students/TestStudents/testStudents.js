import { preguntasIngles, ingles, preguntasLogicas, resultados } from "../../General/Data/bdQuestions.js";

document.addEventListener("DOMContentLoaded", () => {
  let preguntaActual = 0; // pregunta actual

  let testButton = document.querySelector("#testButton")

  // info sobre el test en el modal
  let contentInfo = document.querySelector(".contentInfoTest")
  let containerInfo = document.querySelector(".modal-body")
  let selectIngles = document.querySelector("#ingles")
  let selectMentales = document.querySelector("#mentales")
  let selectLogicas = document.querySelector("#logicas")
  // funcion para saber que card se escogio
  //  selectIngles.addEventListener('click', ()=>{
  //   contentInfo.innerHTML= `
  //   <p>${ingles.nombre}</p>
  //   <p>${ingles.duracion}</p>
  //   `;
  //   containerInfo.appendChild(contentInfo)
  //  })


  // llamar a la funcion de agregar preguntas

  injectionPreguntaHtml(preguntasIngles[preguntaActual]);


  const btnSiguiente = document.querySelector(".btn-siguiente");
  const inputs = document.querySelector(".content-test input")

  // hay que saber que selecciono para la siguiente pregunta
  inputs.addEventListener('click', () => {

    console.log(inputs.value)
  })

  btnSiguiente.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".content-test input:checked");

    if (inputs.length === 0) {
      alert("Por favor, selecciona una respuesta antes de continuar.");
      return; // input vacio, lazar error
    }
    // Acceder a la respuesta seleccionada para guardar el valor
    const respuestaSeleccionada = inputs[0].value
    if (respuestaSeleccionada) {
      resultados.buenas++;
    } else {
      resultados.malas++;
    }
    console.log(resultados.buenas)

    preguntaActual++;

    if (preguntaActual < preguntasIngles.length) {
      injectionPreguntaHtml(preguntasIngles[preguntaActual]);
    } else {
      console.log("¡Fin del cuestionario!");
    }

  });
});



function injectionPreguntaHtml(pregunta) {
  let inyeccionPreguntas = document.querySelector("#container-test");// container creado en el html
  inyeccionPreguntas.innerHTML = "";

  const coderHtml = document.createElement("div");
  coderHtml.classList.add("content-test");

  coderHtml.innerHTML = `
    <p class="pregunta-test">${pregunta.contenido}</p>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[0].correcta} ">${pregunta.respuestas[0].contenido}, Correcta: ${pregunta.respuestas[0].correcta}</label><br>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[1].correcta}">${pregunta.respuestas[1].contenido}, Correcta: ${pregunta.respuestas[1].correcta}</label><br>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[2].correcta}">${pregunta.respuestas[2].contenido}, Correcta: ${pregunta.respuestas[2].correcta}</label>
   
  `;

  inyeccionPreguntas.appendChild(coderHtml);

}

