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

    
}

inyect(datos);

console.log(datos.fecha.length);

function inyectHistoria(){
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
    <button id="btnfuera btn" class="btnVerMas" onclick="mostrarVerMas(${[i]})" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ver más</button>
    `
    /* CAMBIO DE CLASE TN 2 */
    /* EL BOTON 2  */
    historial.appendChild(regsitro);
}

for (var i=0 ; i < datos.fecha.length; i++){
    
    inyectHistoria()
    
/* MODAL VER MAS */
    function mostrarVerMas(i){


        const btn1 = document.querySelector('.btn1');
        btn1.innerText = "VER RECOMENDACIONES"; /* BOTONES DENTRO DEL MODAL */

        const btn3 = document.querySelector('.btn3');
        btn3.innerText = "BOTON 3";

        const btn2 = document.querySelector('.btn2');
        btn2.innerText = "VER OBSERVACIONES";

        const btn4 = document.querySelector('.btn4');
        btn4.innerText = "BOTON 4";

        /* evento click para las funciones de editar */

        const parrafoObservaciones = document.querySelector('.pObservaciones');
        parrafoObservaciones.innerHTML= `
        ${datos.observaciones[i]}
        <br>
        ${datos.fecha[i]}
        `
        const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
        parrafoRecomendaciones.innerHTML= `
        ${datos.recomendaciones[i]}
        <br>
        ${datos.fecha[i]}
        `        
        btn3.addEventListener('click', mostrarEditar(i));
        btn4.addEventListener('click', mostrarEditar(i));
        
    }

    function mostrarEditar(i){

        console.log("funcion editar ");
        const parrafoObservaciones = document.querySelector('.pObservaciones');
        parrafoObservaciones.innerHTML= `
        <textarea style="width: 100%" id="textAreaObservaciones" oninput='${edicionObs()}'>${datos.observaciones[i]}</textarea>
        <br>
        <p> fecha: ${datos.fecha[i]}</p>
        <br>
        `
        const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
        parrafoRecomendaciones.innerHTML= `
        <textarea style="width: 100%" id="textAreaRecomendaciones" oninput='${edicionReco()}'>${datos.recomendaciones[i]}</textarea>
        <br>
        <p>fecha: ${datos.fecha[i]}</p>
        <br>
        `
    }
}

function edicionObs (){
    const btn3 = document.querySelector('.btn3');
    btn3.addEventListener('click', ()=>{
        console.log("nada");

        const editObs = document.querySelector('#textAreaObservaciones')

        console.log(editObs.textContent);

        datos.observaciones[i] = editObs.textContent

        console.log(datos.observaciones[i]);
    });    
}

function edicionReco (){
    const btn4 = document.querySelector('.btn4');
    btn4.addEventListener('click', ()=>{
        console.log("nada");

        const editReco = document.querySelector('#textAreaRecomendaciones')

        console.log("no",editReco.textContent);

        datos.recomendaciones[i] = editReco.textContent

        console.log(datos.recomendaciones[i]);
    });    
}