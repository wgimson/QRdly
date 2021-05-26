/* eslint-env jquery, browser */



$(document).ready(() => {
  window.addEventListener('load', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });
});
