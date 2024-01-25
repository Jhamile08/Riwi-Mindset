const search = document.getElementById("search");
const students = document.getElementById("students");

search.addEventListener("keyup", () => {
  const filter = search.value.toUpperCase();
  const li = students.getElementsByTagName("a");

  for (let i = 0; i < li.length; i++) {
    if (li[i].textContent.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});

/* Calendario */

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "es",
    initialView: "dayGridMonth",
    initialDate: moment().format('YYYY-MM-DD'), // Utiliza moment() para obtener la fecha actual
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: [],
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
  });
  

  calendar.render();

  const eventForm = document.getElementById("eventForm");
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTimeSelect = document.getElementById("eventTime");

    // Obtener el valor seleccionado del select
    const selectedTime = eventTimeSelect.value;

    // Verificar si el horario está disponible
    if (!isTimeSlotOccupied(calendar, `${eventDate}T${selectedTime}`)) {
      const newEvent = {
        title: eventName,
        start: moment(`${eventDate}T${selectedTime}`).format(),
        end: moment(`${eventDate}T${selectedTime}`).add(1, 'hour').format(),
      };

      calendar.addEvent(newEvent);
      eventForm.reset();
    } else {
      alert("¡Este horario ya está reservado! Por favor, elige otro.");
    }
  });


  function isTimeSlotOccupied(calendar, startTime) {
    // Obtener todos los eventos en el calendario
    const allEvents = calendar.getEvents();

    // Convertir startTime a objeto Moment
    const startMoment = moment(startTime);

    // Calcular el horario de finalización (1 hora después)
    const endMoment = startMoment.clone().add(1, 'hour');

    // Verificar si hay algún evento que coincide exactamente con el nuevo horario
    const exactMatch = allEvents.some(event => {
      const eventStartMoment = moment(event.start);
      const eventEndMoment = moment(event.end);
      return (
        eventStartMoment.isSame(startMoment, 'minute') &&
        eventEndMoment.isSame(endMoment, 'minute')
      );
    });

    // Verificar si hay algún evento que se superpone con el nuevo horario
    const overlapping = allEvents.some(event => {
      const eventStartMoment = moment(event.start);
      const eventEndMoment = moment(event.end);
      return (
        (eventStartMoment.isBefore(endMoment) && eventEndMoment.isAfter(startMoment)) ||
        (eventStartMoment.isSame(startMoment) && eventEndMoment.isSame(endMoment))
      );
    });

    return exactMatch || overlapping;
  }




  /* Ajustar tamaño a la pantalla del calendario view Header y Body */
  const calendarHeader = document.querySelector(".fc-col-header");
  calendarHeader.style.width = "100%";

  const calendarBody = document.querySelector(".fc-scrollgrid-sync-table");
  calendarBody.style.width = "100%";
});