
const datos = JSON.parse(localStorage.getItem("gente"))

function inyect(){

    /* inyectar foto y card */
    const user = document.querySelector('#data-user');

    const coderUser = document.createElement('div')
    coderUser.innerHTML= `<div class= perfil >
    <img src="${datos.foto}" alt="" id="foto";></img> <br>
    <p id="nombre">${datos.nombre}</p> <br>
    <p id="nombre">  edad: ${datos.edad}</p>
  </div>
        
    `;
    user.appendChild(coderUser);

    /* inyectar fecha */

    
}

inyect(datos);

