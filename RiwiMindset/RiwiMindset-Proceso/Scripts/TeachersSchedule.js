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
    initialDate: "2023-11-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: [],
  });

  calendar.render();

  /* ajustar tamaño a la pantalla del calendario view Header y Body */
  const calendarHeader = document.querySelector(".fc-col-header");
  calendarHeader.style.width = "100%";

  const calendarBody = document.querySelector(".fc-scrollgrid-sync-table");
  calendarBody.style.width = "100%";
});
