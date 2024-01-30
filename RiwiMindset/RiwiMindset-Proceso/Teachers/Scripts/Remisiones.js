

/* inyeccion foto y nombre */
const datos = JSON.parse(localStorage.getItem("gente"))

function inyect(){
    
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

/* manejo del formulario pdf */

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector('#PDF'); // <-- Aquí puedes elegir cualquier elemento del DOM
        var text = document.getElementById('PDF');
        // Ajusta el tamaño del textarea al contenido
        text.style.height = text.scrollHeight + "px";
        
        html2pdf()
            .set({
                margin: 1,
                filename: 'documento.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait' // landscape o portrait

                }
            })

            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
            

    });
});