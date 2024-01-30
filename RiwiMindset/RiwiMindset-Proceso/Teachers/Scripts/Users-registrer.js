



const datos = JSON.parse(localStorage.getItem("gente"))
console.log(datos);



function inyect(){

    /* inyectar foto y card */
    const user = document.querySelector('#data-user');

    const coderUser = document.createElement('div')
    coderUser.innerHTML= `
        <img src="${datos[5]}" alt="" id="foto";></img>
        <p id="nombre">${datos[0]}</p>
        <p id="nombre">  edad: ${datos[1]}</p>
        
    `;
    user.appendChild(coderUser);

    /* inyectar fecha */

    const agenda = document.querySelector('.fechaEntrevista');
    agenda.textContent = datos[2]


    /* inyectar observaciones */

    const recomendaciones = document.querySelector('.registroInfo');
    recomendaciones.textContent = datos[4]
}

inyect(datos)