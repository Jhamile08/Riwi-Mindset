
const datos = JSON.parse(localStorage.getItem("gente"));

let tabla = document.querySelector('.slide tbody')

tabla.innerHTML += `
    <tr>
    <td>1</td>
    <td>Logieeeeeeeeeeeeca</td>
    <td>10%</td>
    </tr>
`


/* inyectar foto y card */

function inyect() {
    const user = document.querySelector("#dataUser");

    const coderUser = document.createElement("div");
    coderUser.innerHTML = `<div class= perfil >
        <img src="${datos.foto}" alt="" id="foto";></img> <br>
        <p id="nombre">${datos.nombre}</p> <br>
        <p id="nombre">  edad: ${datos.edad}</p>
    </div>
            
        `;
    user.appendChild(coderUser);
}

document.addEventListener("DOMContentLoaded",()=>{
    inyect(datos);
})
