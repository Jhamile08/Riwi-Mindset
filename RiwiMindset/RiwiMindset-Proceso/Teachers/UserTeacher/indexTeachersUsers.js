import { estudiantes } from "/General/Data/bd.js";

// inyeccion de los estudiantes

estudiantes.forEach((estudiantes) => {
  console.log(estudiantes);
});

let arreglo = [];
injectionCoderHtml(estudiantes);

function injectionCoderHtml(coders) {
  let inyeccionCoders = document.querySelector("#container-users");

  coders.forEach((estudiantes) => {
    const { id, clan, foto, nombre, edad, recomendaciones, observaciones, fecha } =
      estudiantes;
    /* destructuring */
    const coderHtml = document.createElement("p");
    /* la clase nombre no se muestra, es solo para el buscador */
    coderHtml.innerHTML = `
        <div class="estudents actualizar">
            <p id="">${nombre} </p>
            <p class="borrar" id="nombre">${nombre} ${clan}</p> 
            <p id="">${clan} </p>
            <a href="/Teachers/UserTeacher/Registrer/IndexTeachersUsers-register.html" type="submit" id ="${id}" class= "actualizar">ver perfil</a>
            <img src="${foto}" alt="" id="foto"></img>
        </div>

        `;
    inyeccionCoders.appendChild(coderHtml);
    const data = {
      clan,
      id,
      foto,
      nombre,
      edad,
      recomendaciones,
      observaciones,
      fecha,
    };

    arreglo.push(data);

    // Capturar con el queryselector
  });

  console.log(arreglo);

  const actualizar = document.querySelectorAll(".actualizar");

  actualizar.forEach((persona) => {
    persona.addEventListener("click", (e) => {
      localStorage.setItem(
        "gente",
        JSON.stringify(arreglo[Number(e.target.getAttribute("id")) - 1])
      );
    });
  });

  // evento input para guardar el nombre a buscar

  document.addEventListener("input", (e) => {
    let apellido = e.target.value;
    console.log(apellido);
    nombre(apellido);
  });

  // funcion para buscar coders y clan (se usa CSS)

  function nombre(apellido) {
    const name = document.querySelectorAll("#nombre");
    console.log(name);
    name.forEach((e) => {
      
        console.log("nad");
        console.log(e.textContent);
        if (e.textContent.toLocaleLowerCase().includes(apellido.toLocaleLowerCase())) {
          console.log("coincide");
          e.parentElement.classList.remove("buscador");
        }
        else {
          console.log("no coincide");
          e.parentNode.classList.add("buscador");
        }
    });
  }}



