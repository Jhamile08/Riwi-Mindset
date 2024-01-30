const datos = JSON.parse(localStorage.getItem("gente"))


export function inyect(){

    /* inyectar foto y card */
    const user = document.querySelector('#data-user');

    const coderUser = document.createElement('div')
    coderUser.innerHTML= `
        <img src="${datos.foto}" alt="" id="foto";></img>
        <p id="nombre">${datos.nombre}</p>
        <p id="nombre">  <b> edad: </b> ${datos.edad}</p>
        
    `;
    user.appendChild(coderUser);


}

inyect(datos)



console.log(datos.fecha.length);

for (var i=0 ; i < datos.fecha.length; i++){
    
    const historial = document.querySelector("#registro")
    
    const regsitro = document.createElement('div')
    regsitro.innerHTML = `
    <div class="registroEspecifico">
    <p class="fechaEntrevista">
    <b> fecha: </b> ${datos.fecha[i]}
    </p>
    <p class="registroInfo">
        ${datos.recomendaciones[i]}
    </p>
    <button>Editar</button>
    <button>Ver más</button>
    `
    historial.appendChild(regsitro)

    console.log("nada");
}