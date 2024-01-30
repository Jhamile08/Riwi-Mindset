import { deleteEventFromServer } from "./TeachersSchedule.js";

document.getElementById("input").addEventListener("change", () => {
  if (document.body.className.indexOf("dark") === -1) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

const navbar = document.querySelector(".navbar");

document.getElementById("input").addEventListener("change", () => {
  if (navbar.className.indexOf("dark") === -1) {
    navbar.classList.add("dark");
  } else {
    navbar.classList.remove("dark");
  }
});

/* Inyectar citas de la base de datos json */



getDataJsonArray();


function getDataJsonArray() {
  fetch("http://localhost:4002/events")
    .then((responseJsonArray) => {
      return responseJsonArray.json();
    })
    .then((dataJsonArray) => {
      // Ordena el array de eventos por fecha y hora
      dataJsonArray.sort((a, b) => {
        const dateA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm");
        const dateB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm");
        return dateA - dateB;
      });

      // Muestra los eventos ordenados
      dataJsonArray.forEach((element) => {
        showHTMLArray(element);
      });
    });
};

function showHTMLArray({ id, title, reason, date, time }) {
  const contain = document.querySelector(".cards-home");
  const eventHTML = document.createElement("div");
  eventHTML.classList.add("card-home");
  eventHTML.dataset.eventId = id;
  // Obtener el día de la semana a partir de la fecha
  moment.locale('es');
  const dayOfWeek = moment(date, "YYYY-MM-DD").format("dddd");
  eventHTML.innerHTML = `
        <div class="card-home-text">
          <h3>${dayOfWeek}</h3>
          <h3>${date}</h3>
          <h4>${time}</h4>
          <p>${title}</p>
          <p><b>Motivo: </b>${reason}</p>
        </div>
        <div class="buttons">
          <button class="reschedule">Reagendar</button>
          <button class="delete-appointment">Eliminar cita</button>
        </div>
    `;

  contain.appendChild(eventHTML);

  const deleteButton = eventHTML.querySelector('.delete-appointment');
  deleteButton.addEventListener('click', () => {
    const eventId = eventHTML.dataset.eventId;
    deleteAppointment(eventId);
  });

};



function deleteAppointment(eventId) {
  // Confirmar antes de eliminar
  if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
    // Eliminar el evento del servidor
    deleteEventFromServer(eventId);
  }
};


