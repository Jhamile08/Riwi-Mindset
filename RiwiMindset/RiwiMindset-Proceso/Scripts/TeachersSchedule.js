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
    initialDate: new Date(),
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: fetchEvents, // Utiliza una función para cargar eventos
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
  });

  calendar.render();

  const eventForm = document.getElementById("eventForm");
  eventForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;

    const formattedTime = `${eventTime}:00`;

    // Verificar si el horario está disponible
    try {
      if (!await isTimeSlotOccupied(calendar, `${eventDate}T${formattedTime}`)) {
        const newEvent = {
          title: eventName,
          start: moment(`${eventDate}T${formattedTime}`).format(),
          end: moment(`${eventDate}T${formattedTime}`).add(1, 'hour').format(),
        };

        // Cargar el archivo JSON existente
        const data = await fetchEvents();

        // Agregar el nuevo evento al array de eventos
        data.events.push(newEvent);

        // Guardar el JSON actualizado en el archivo
        await saveEvents(data);

        // Recargar los eventos en FullCalendar
        calendar.refetchEvents();

        // Limpiar el formulario
        eventForm.reset();
      } else {
        alert("¡Este horario ya está reservado! Por favor, elige otro.");
      }
    } catch (error) {
      console.error('Error al agregar evento:', error);
      alert('Hubo un error al agregar el evento. Por favor, intenta de nuevo.');
    }
  });


  async function isTimeSlotOccupied(calendar, startTime) {
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

  async function fetchEvents() {
    // Cargar el archivo JSON existente
    const response = await fetch('Scripts/data.json');
    if (!response.ok) {
      throw new Error(`Error al cargar eventos. Estado: ${response.status}`);
    }
    return await response.json();
  }

  async function saveEvents(data) {
    // Convertir el objeto actualizado a JSON
    const updatedDataJSON = JSON.stringify(data);

    // Guardar el JSON actualizado en el archivo
    const blob = new Blob([updatedDataJSON], { type: 'application/json' });
    return saveAs(blob, 'Scripts/data.json');
  }

  /* Ajustar tamaño a la pantalla del calendario view Header y Body */
  const calendarHeader = document.querySelector(".fc-col-header");
  calendarHeader.style.width = "100%";

  const calendarBody = document.querySelector(".fc-scrollgrid-sync-table");
  calendarBody.style.width = "100%";
});
