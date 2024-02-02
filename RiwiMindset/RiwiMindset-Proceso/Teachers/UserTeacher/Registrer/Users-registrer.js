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
    <button id="btnfuera btn btn1" class="btnVerMas" onclick="mostrarVerMas(${[i]})" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ver más</button>

    <button id="btnfuera btn btn1" class="btnEditar" onclick="mostrarEditar(${[i]})" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Editar</button>
    `
    historial.appendChild(regsitro);
    
    function mostrarVerMas(i){
        /* const parrafo = document.getElementById('textarea');
        parrafo.innerText = datos.observaciones[i];
        document.getElementById("textarea").style.display = "block"; */

        /* FUNCION QUE DETECTA Y MUESTRA LAS O/R SEGÚN EL ESTUDIANTE */
        const btn1 = document.querySelector('.btn1');
        btn1.innerText = "Ver Recomendaciones";

        const btn2 = document.querySelector('.btn2');
        btn2.innerText = "Ver Observaciones";

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
        
        /* document.getElementById("exampleModalToggle1").style.display = "block";
        document.getElementById("exampleModalToggle2").style.display = "none";
        
        mostrarRecomendaciones(i) */
        
        
        
    }

    function mostrarEditar(i){

        const btn1 = document.querySelector('.btn1');
        btn1.innerText = "Ver Recomendaciones";

        const btn2 = document.querySelector('.btn2');
        btn2.innerText = "Ver Observaciones";

        const btn3 = document.querySelector('.btn3');
        btn3.innerText = "Guardar edición";

        const btn4 = document.querySelector('.btn4');
        btn4.innerText = "Guardar edición";

        
        const parrafoObservaciones = document.querySelector('.pObservaciones');
        parrafoObservaciones.innerHTML= `
        <textarea style="width: 100%" id="textAreaObservaciones" oninput="${guardarObservaciones()}">${datos.observaciones[i]}</textarea>
        `
        const parrafoRecomendaciones = document.querySelector('.pRecomendaciones');
        parrafoRecomendaciones.innerHTML= `
        <textarea style="width: 100%" id="textAreaRecomendaciones" oninput="${guardarRecomendaciones()}">${datos.recomendaciones[i]}</textarea>
        `

        function guardarObservaciones(){
            const textAreaObservaciones = document.querySelector('#textAreaObservaciones');
            
            datos.observaciones[i].replace(`${datos.observaciones[i]}`,`${textAreaObservaciones}`)
            console.log(datos.observaciones[i]);
        }

        function guardarRecomendaciones(){
            const textAreaRecomendaciones = document.querySelector('#textAreaRecomendaciones');
            
            datos.recomendaciones[i].replace(`${datos.observaciones[i]}`,`${textAreaRecomendaciones}`)
            console.log(datos.recomendaciones[i]);
        }

                
    }
    /* function mostrarRecomendaciones(i){
        document.getElementById("exampleModalToggle2").style.display = "block";
        document.getElementById("exampleModalToggle1").style.display = "none";
    } */
}