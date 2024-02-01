import { preguntasIngles  } from "../../General/Data/bdQuestions.js";

document.addEventListener("DOMContentLoaded", () => {
  selectorCard()
  let preguntaActual = 0; // pregunta actual

  let  testButton = document.querySelector("#testButton")

  testButton.addEventListener('click', reconocerclik)
  function reconocerclik(){
    window.location.href="/Students/TestStudents/indexTestsEstudents.html"; 
   
  }
  
// info sobre el test en el modal
  let contentInfo = document.querySelector(".contentInfoTest")
  let containerInfo = document.querySelector(".modal-body")
// funcion para saber que card se escogio
  function selectorCard() {
    let containerCards = document.querySelector(".container-cards")
    containerCards.addEventListener('click', loadDetails);
}
function loadDetails(e) {
  let titleModal = ""
  let totalQuestions = 22;
  let valueCards = document.querySelector(".cards")
  console.log(valueCards)
  if(valueCards == ingles){
    titleModal = "test ingles"
    return titleModal
  }

  containerInfo.innerHTML= `
  <p>${titleModal}</p>
  <p>${totalQuestions}</p>
  `;
  containerInfo.appendChild(contentInfo)
}
  

// llamar a la funcion de agregar preguntas

  injectionPreguntaHtml(preguntas[preguntaActual]);
  

  const btnSiguiente = document.querySelector(".btn-siguiente");
  const inputs = document.querySelector(".content-test input")

  // hay que saber que selecciono para la siguiente pregunta
  inputs.addEventListener('click', () => {
    
    console.log(inputs.value)} )

  btnSiguiente.addEventListener("click", () => {
    preguntaActual++;
    console.log(inputs.value)
    if (preguntaActual < preguntas.length) {
      // en caso de que no haya seleccionado lance error
      if (inputs.value == null) {
        alert("vacio")
      }else{

        injectionPreguntaHtml(preguntas[preguntaActual]);
      }
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

