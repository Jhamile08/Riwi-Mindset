import {
  preguntasIngles,
  preguntasLogicas,
  preguntasMentales,
  ingles,
  logicas,
  mentales,
  resultados
} from "../../General/Data/bdQuestions.js";

document.addEventListener("DOMContentLoaded", () => {

  // selector del boton del modal
  let testButton = document.querySelector("#testButton");
  let containerQuestions = document.querySelector('.container')
  let containerCards = document.querySelector('.container-cards')
  let containerTitle = document.querySelector('.title-test')
  
// funcion para abrir la pagina del test
  testButton.addEventListener("click", reconocerclik);
  function reconocerclik() {
    containerCards.style.display = "none"
    containerQuestions.style.display = 'flex'
    containerTitle.style.display = "none"
    console.log(containerCards);
  }

 
}); 

 // selectores
 let contentInfo = document.querySelector(".contentInfoTest");
 let containerInfo = document.querySelector(".modal-body");
 // selectores de las cards
 let inglesCard = document.querySelector("#ingles");
 let logicasCard = document.querySelector("#logicas");
 let mentalesCard = document.querySelector("#mentales");
 let modalTitle = document.querySelector(".modal-title")
 //selectores para validacion de preguntas
 const btnSiguiente = document.querySelector(".btn-siguiente");
 const inputs = document.querySelector(".content-test input")

 // addEventListener para saber cual card se escogio

 inglesCard.addEventListener('click', ()=>{
  modalTitle.textContent = `${ingles.nombre}`
   contentInfo.innerHTML = `
        <p>${ingles.duracion}</p>
        <p>${ingles.preguntas}</p>
  `;
   containerInfo.appendChild(contentInfo);
     // llamar a la funcion de agregar preguntas
     injectionPreguntaHtml(preguntasIngles[preguntaActual]);
   
 });

 logicasCard.addEventListener('click', ()=>{
  modalTitle.textContent = `${logicas.nombre}`
  contentInfo.innerHTML = `
       <p>${logicas.duracion}</p>
       <p>${logicas.preguntas}</p>
 `;
  containerInfo.appendChild(contentInfo);
  injectionPreguntaHtml(preguntasLogicas[preguntaActual]);
});

mentalesCard.addEventListener('click', ()=>{
  modalTitle.textContent = `${mentales.nombre}`
  contentInfo.innerHTML = `
       <p>${mentales.duracion}</p>
       <p>${mentales.preguntas}</p>
 `;
  containerInfo.appendChild(contentInfo);
  injectionPreguntaHtml(preguntasMentales[preguntaActual]);
});

//valida que el usuario haya respondido
let preguntaActual = 0; // pregunta actual

  btnSiguiente.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".content-test input:checked");
  
    if (inputs.length === 0) {
      alert("Por favor, selecciona una respuesta antes de continuar.");
      return; // input vacio, lazar error
    }
    // Acceder a la respuesta seleccionada para guardar el valor
    const respuestaSeleccionada = inputs[0].value
    console.log(respuestaSeleccionada)
    if (respuestaSeleccionada) {
      resultados.buenas++;
    } else {
      resultados.malas++;
    }
    console.log(resultados);
    
    

  
    preguntaActual++;
  
    if (preguntaActual < preguntasIngles.length) {
      injectionPreguntaHtml(preguntasIngles[preguntaActual]);
    } else {
      console.log("¡Fin del cuestionario!");
    }
  
  });



function injectionPreguntaHtml(pregunta) {
  let inyeccionPreguntas = document.querySelector(".containerHome");
  inyeccionPreguntas.innerHTML = "";

  const coderHtml = document.createElement("div");
  coderHtml.classList.add("content-test");

  coderHtml.innerHTML = `
    <p class="pregunta-test">${pregunta.contenido}</p>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[0].correcta}">${pregunta.respuestas[0].contenido}, Correcta: ${pregunta.respuestas[0].correcta}</label><br>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[1].correcta}">${pregunta.respuestas[1].contenido}, Correcta: ${pregunta.respuestas[1].correcta}</label><br>
    <label><input type="radio" name="r${pregunta.id}" value="${pregunta.respuestas[2].correcta}">${pregunta.respuestas[2].contenido}, Correcta: ${pregunta.respuestas[2].correcta}</label>
  `;

  inyeccionPreguntas.appendChild(coderHtml);
}
