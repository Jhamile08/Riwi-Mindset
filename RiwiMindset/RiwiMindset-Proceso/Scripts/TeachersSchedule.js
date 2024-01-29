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




/* ------------CALENDAR----------------- */

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  /* inicializacion del calendario con dos argumentos "CalendarEl que es el contenedor y segundo un objeto de opciones para la config del calendario" */
  var calendar = new FullCalendar.Calendar(calendarEl, {
    /* idioma del calendario espanol */
    locale: "es",
    /* vista inicial en mes */
    initialView: "dayGridMonth",
    /* la fecha inicial del calendario sera la fecha actual segun la libreria moment */
    initialDate: moment().format('YYYY-MM-DD'),
    /* posicion de botones en el header del calendario */
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    /* Asignar nombre en espanol a los botones del calendar */
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    /* inyectar a events del calendar la extraccion del json-server */
    events: fetchEventsFromServer,
    eventClick: function (info) {
      // Mostrar confirmación antes de eliminar el evento
      if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
        // Eliminar el evento del servidor
        deleteEventFromServer(info.event.id);
      }
    }
  });


  /* renderizar el calendario en el html segun las configuraciones */
  calendar.render();



  /* Se selecciona el form */
  const eventForm = document.getElementById("eventForm");
  /* un evento que escucha el envio del formulario  */
  eventForm.addEventListener("submit", async function (e) {
    /* Previene el comportamiento predeterminado del formulario, que es recargar la página cuando se envía. */
    e.preventDefault();
    /* Obtener valores de los inputs del formulario */
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;
    /* Formatea la hora para que coincida con el formato esperado en el calendar (añadiendo ":00" al final) */
    const formattedTime = `${eventTime}:00`;

    // Verificar si el horario está disponible - empezamos con un bloque try-catch para manejar posibles errores durante la ejecución del código
    try {
      // verificamos si el horario seleccionado no esta ocupado segun la funcion isTimeSlotOccupied
      if (!await isTimeSlotOccupied(calendar, `${eventDate}T${formattedTime}`)) {
        // creamos el evento con propiedades especificas del calendar
          const newEvent = {
          title: eventName,
          start: moment(`${eventDate}T${formattedTime}`).format(),
          end: moment(`${eventDate}T${formattedTime}`).add(1, 'hour').format(),
          reason: 'Ansiedad',
          date: eventDate,
          time: eventTime
        };
        // Enviar el nuevo evento al servidor usando fetch con una solicitud POST al servidor JSON.
        const response = await fetch('http://localhost:4002/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
        });
        // Verifica si la respuesta del servidor indica que la solicitud fue exitosa (estado 200-299). Si es así, recarga los eventos en FullCalendar y limpia el formulario. De lo contrario, muestra un mensaje de error.
        if (response.ok) {
          // Recargar los eventos en FullCalendar después de agregar el nuevo evento
          calendar.refetchEvents();
          // Limpiar el formulario
          eventForm.reset();
          // Captura cualquier error que pueda ocurrir durante la ejecución del bloque try y muestra un mensaje de error.
        } else {
          console.error('Error al agregar evento:', response.status);
          alert('Hubo un error al agregar el evento. Por favor, intenta de nuevo.');
        }
      } else {
        alert("¡Este horario ya está reservado! Por favor, elige otro.");
      }
    } catch (error) {
      console.error('Error al agregar evento:', error);
      alert('Hubo un error al agregar el evento. Por favor, intenta de nuevo.');
    }
  });






  // iniciamos la funcion con dos parámetros: calendar (la instancia del calendario FullCalendar) y startTime (el momento de inicio del intervalo de tiempo que se va a verificar).
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
    // Devuelve true si hay una coincidencia exacta o superposición, indicando que el intervalo de tiempo está ocupado. Devuelve false si no hay coincidencias y el intervalo de tiempo está disponible.
    return exactMatch || overlapping;
  };





  // funcion para obtener events de la base de datos data.json que esta guardada en el json-server
  async function fetchEventsFromServer(info, successCallback, failureCallback) {
    try {
      // Realizar una solicitud (fetch) a la URL del servidor que contiene los eventos
      const response = await fetch('http://localhost:4002/events');
      // Verificar si la solicitud fue exitosa (código de estado 200)
      if (response.ok) {
        // Si la respuesta fue exitosa, convierte el cuerpo de la respuesta a formato JSON
        const events = await response.json();
        // Llama a la función de retorno de éxito (successCallback) y pasa los eventos
        successCallback(events);
      } else {
        // Si la respuesta no es exitosa, imprime un mensaje de error en la consola
        console.error('Error al obtener eventos desde el servidor:', response.status);
        // Llama a la función de retorno de fallo (failureCallback) con un mensaje de error
        failureCallback('Hubo un error al obtener los eventos desde el servidor.');
      }
    } catch (error) {
      // Capturar cualquier error que pueda ocurrir durante el proceso y mostrarlo en la consola
      console.error('Error al obtener eventos desde el servidor:', error);
      failureCallback('Hubo un error al obtener los eventos desde el servidor.');
    }
  };
  




  // funcion que se encarga de eliminar un evento del servidor
  async function deleteEventFromServer(eventId) {
    try {
      // Realizar una solicitud (fetch) al servidor para eliminar el evento específico
      const response = await fetch(`http://localhost:4002/events/${eventId}`, {
        method: 'DELETE',
      });
      // Verifica si la solicitud fue exitosa (código de estado 200)
      if (response.ok) {
        // Si la respuesta es exitosa, recarga los eventos en FullCalendar después de eliminar el evento
        calendar.refetchEvents();
      } else {
        // Si la respuesta no es exitosa, imprime un mensaje de error en la consola
        console.error('Error al eliminar evento:', response.status);
        // Mostrar una alerta al usuario sobre el error al eliminar el evento
        alert('Hubo un error al eliminar el evento. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      // Captura cualquier error que pueda ocurrir durante el proceso y mostrarlo en la consola y al usuario
      console.error('Error al eliminar evento:', error);
      alert('Hubo un error al eliminar el evento. Por favor, intenta de nuevo.');
    }
  };
  





  /* Ajustar tamaño a la pantalla del calendario view Header y Body */
  const calendarHeader = document.querySelector(".fc-col-header");
  calendarHeader.style.width = "100%";

  const calendarBody = document.querySelector(".fc-scrollgrid-sync-table");
  calendarBody.style.width = "100%";
});