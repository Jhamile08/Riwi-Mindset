import { enfermedades } from "./enfermedades.js";
const datos = JSON.parse(localStorage.getItem("gente"));

/* inyectar foto y card */
function inyect() {
  const user = document.querySelector("#data-user");

  const coderUser = document.createElement("div");
  coderUser.innerHTML = `
    <img src="${datos.foto}" alt="" id="foto";></img> <br>
    <p id="nombre">${datos.nombre}</p> <br>
    <p id="nombre">  edad: ${datos.edad}</p>
    `;
  user.appendChild(coderUser);
}

/* Inyeccion del PDF */

document.addEventListener("DOMContentLoaded", () => {
  // Escuchamos el click del botón
  const $boton = document.querySelector("#btnCrearPdf");
  $boton.addEventListener("click", () => {
    const $elementoParaConvertir = document.querySelector("#PDF"); // <-- Aquí puedes elegir cualquier elemento del DOM
    var text = document.getElementById("PDF");
    // Ajusta el tamaño del textarea al contenido
    text.style.height = text.scrollHeight + "px";

    html2pdf()
      .set({
        margin: 0.5,
        filename: `${datos.nombre}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 3, // A mayor escala, mejores gráficos, pero más peso
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a3",
          orientation: "portrait", // landscape o portrait
        },
      })

      .from($elementoParaConvertir)
      .save()
      .catch((err) => console.log(err));
  });
});

/* inyeccion buscador en el pdf */

document.addEventListener("DOMContentLoaded", () => {
  inyect(datos);
  injectionBuscador(enfermedades);

  const motivo = document.querySelectorAll(".codigo");

  motivo.forEach((coder) => {
    coder.addEventListener("click", (e) => {
      e.preventDefault();
      let consulta = document.querySelector("#consulta");

      consulta.value = e.target.text;
    });
  });
});

function injectionBuscador(codigos) {
  let mostrar = document.querySelector("#cont-enfermedades");

  codigos.forEach((enfermedades) => {
    const { nombre, codigo, especifico } = enfermedades;
    /* destructuring */
    const aEnfermedad = document.createElement("p");
    aEnfermedad.innerHTML = `
        <div class="dms">
        <a width: 30%; href="" class="codigo"> > ${codigo} - ${nombre} (${especifico})  </a> <hr>
        </div>
        
        `;
    mostrar.appendChild(aEnfermedad);
  });
}

/* buscador de enfermedades (usa ccs) */

// evento input para guardar el nombre a buscar

const patologia = document.querySelector("#patologia");

patologia.addEventListener("input", (e) => {
  let patologia = e.target.value;
  console.log(patologia);
  nombre(patologia);
});

// funcion para buscar enfermedades (se usa CSS)

function nombre(patologia) {
  const name = document.querySelectorAll(".codigo");
  console.log(name);
  name.forEach((e) => {
    if (
      e.textContent.toLocaleLowerCase().includes(patologia.toLocaleLowerCase())
    ) {
      console.log("coincide");
      e.parentElement.classList.remove("busqueda");
    } else {
      console.log("no coincide");
      e.parentNode.classList.add("busqueda");
    }
  });
}
