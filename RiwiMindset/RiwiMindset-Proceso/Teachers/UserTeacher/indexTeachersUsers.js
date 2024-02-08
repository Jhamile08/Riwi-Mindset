//Generamos una url base
const urlBase = "http://localhost:4002/";
// Seleccionamos el contenedor principal donde vamos a inyectars los coders
let inyeccionCoders = document.querySelector("#container-users");
//Funcion que obtiene los datos desde el archivo json
async function getStudent() {
  const response = await fetch(`${urlBase}students`);
  const data = response.json();
  return data;
};

let studentsInjected = [];

async function renderStudents() {
  const students = await getStudent();
  inyeccionCoders.innerHTML = '';
  students.forEach(student => {
    inyeccionCoders.innerHTML += `
        <div class="estudents actualizar">
            <p id="">${student.nombre} </p>
            <p class="borrar" id="nombre">${student.nombre} ${student.clan}</p> 
            <p id="">${student.clan} </p>
            <a href="/Teachers/UserTeacher/Registrer/IndexTeachersUsers-register.html" type="submit" id ="${student.id}" class= "actualizar">ver perfil</a>
            <img src="${student.foto}" alt="" id="foto"></img>
        </div>
        `
  });

  students.forEach((student) => {

    const {
      id,
      clan,
      foto,
      nombre,
      edad,
      recomendaciones,
      observaciones,
      fecha,
    } = student;

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

    studentsInjected.push(data);


  });

  studentLocalStorage();

};

document.addEventListener("input", (e) => {
  let apellido = e.target.value;
  nombre(apellido);
});

function nombre(apellido) {
  const name = document.querySelectorAll("#nombre");
  console.log(name);
  name.forEach((e) => {
    if (
      e.textContent.toLocaleLowerCase().includes(apellido.toLocaleLowerCase())
    ) {
      e.parentElement.classList.remove("buscador");
    } else {
      e.parentNode.classList.add("buscador");
    }
  });
};

function studentLocalStorage() {

  const actualizar = document.querySelectorAll(".actualizar");

  actualizar.forEach((student) => {
    student.addEventListener("click", (e) => {
      localStorage.setItem(
        "gente",
        JSON.stringify(studentsInjected[Number(e.target.getAttribute("id")) - 1])
      );
    });
  });

};

renderStudents();



