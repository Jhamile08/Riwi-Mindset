



const datos = JSON.parse(localStorage.getItem("gente"))




function inyect(){

    /* inyectar foto y card */
    const user = document.querySelector('#data-user');

    const coderUser = document.createElement('div')
    coderUser.innerHTML= `
        <img src="${datos.foto}" alt="" id="foto";></img>
        <p id="nombre">${datos.nombre}</p>
        <p id="nombre">  edad: ${datos.edad}</p>
        
    `;
    user.appendChild(coderUser);

    /* inyectar fecha */

    const agenda = document.querySelector('.fechaEntrevista');
    agenda.textContent = datos.fecha[0]


    /* inyectar observaciones */

    const recomendaciones = document.querySelector('.registroInfo');
    recomendaciones.textContent = datos.recomendaciones[0]
}

inyect(datos)