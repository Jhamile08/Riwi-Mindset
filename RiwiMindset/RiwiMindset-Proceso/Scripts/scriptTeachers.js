document.getElementById('input').addEventListener('change',()=>{
    if(document.body.className.indexOf('dark')===-1){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark')
    }
})

const navbar = document.querySelector('.navbar')

document.getElementById('input').addEventListener('change',()=>{
    if(navbar.className.indexOf('dark')===-1){
        navbar.classList.add('dark');
    }else{
        navbar.classList.remove('dark')
    }
})




/* Inyectar citas de la base de datos json */

getDataJsonArray();

function getDataJsonArray() {
    fetch('http://localhost:4002/events')
        .then(responseJsonArray => {
            return responseJsonArray.json();
        })
        .then(dataJsonArray => {
            console.log(dataJsonArray);
            dataJsonArray.forEach(element => {
                showHTMLArray(element);

            });

        });
};

function showHTMLArray({title, start,reason, eventDate}) {
    const contain = document.querySelector('.cards-home');
    const eventHTML = document.createElement('div');
    eventHTML.classList.add("card-home");
    eventHTML.innerHTML =
        `
        <div class="card-home-text">
          <h3>${eventDate}</h3>
          <h4>${start}</h4>
          <p>${title}</p>
          <p><b>Motivo: </b>${reason}</p>

        </div>
        <div class="buttons">
          <button class="reschedule">Reagendar</button>
          <button class="delete-appointment">Eliminar cita</button>
        </div>

    `;
    
    contain.appendChild(eventHTML);
};