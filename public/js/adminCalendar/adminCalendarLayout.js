/* eslint-env jquery, browser */
(() => {
  function getRandomColor() {
    const colorNum = Math.floor(Math.random() * 6);
    switch (colorNum) {
      case 0:
        return '#27AE60';
      case 1:
        return '#8E44AD';
      case 2:
        return '#16AO85';
      case 3:
        return '#E74C3C';
      case 4:
        return '#7F8C8D';
      case 5:
        return '#3498DB';
      default:
        return '#3498DB';
    }
  }
  function getFormattedMeetings() {
    // get all meetings for this company
    let meetings = [];
    if (document.getElementById('meetings')) {
      meetings = document.getElementById('meetings').value;
    }
    const meetingArray = JSON.parse(meetings);
    const parsedMeetingArray = [];
    // const meetingMax = 2;
    // const hourArray = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'];
    // const apptCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // const previousDate = null;
    // const lastDate = null;
    // const firstDate = null;

    meetingArray.forEach((meeting) => {
      parsedMeetingArray.push({
        title: `meeting with ${meeting.name}`,
        color: getRandomColor(),
        start: `${meeting.date}T${meeting.time}`,
        meetingId: meeting._id,
        contactInfo: meeting.contact
      });
    });
    return parsedMeetingArray;
  }
  function createMonthlyCal(parsedMeetingArray) {
    const calendarEl = document.getElementById('adminCalendar');
    const adminCalendar = new FullCalendar.Calendar(calendarEl, {
      eventClick(info) {
        const eventClicked = info.event;
        const cInfo = info.event._def.extendedProps.contactInfo;
        const mid = info.event._def.extendedProps.meetingId;
        $('#popup-dialog').text(`${info.event.title} at ${info.event.start}. Contact info - ${cInfo}`);
        $('#popup-dialog').dialog({
          modal: true,
          dialogClass: 'no-close',
          buttons: {
            OK() {
              $(this).dialog('close');
              $('#popup-dialog').text('');
            },
            Delete() {
              const thisPointer = $(this);
              axios.post('/meeting/delete',
                {
                  mid
                },
                {
                  withCredentials: true
                })
                .then(() => {
                  // alert( "meeting deleted" )
                  eventClicked.remove();
                  thisPointer.dialog('close');
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        });

        popupModal.dialog('open');
      },
      eventChange(info) {
        const rawDate = info.event.start;
        const mTemp = String(rawDate.getMonth() + 1);
        const month = mTemp.length > 1 ? mTemp : mTemp.padStart(2, '0');
        const year = rawDate.getFullYear();
        const day = String(rawDate.getDate()).length > 1 ? rawDate.getDate() : String(rawDate.getDate()).padStart(2, '0');
        const hour = String(rawDate.getHours()).length > 1 ? rawDate.getHours() : String(rawDate.getHours()).padStart(2, '0');
        const minutes = String(rawDate.getMinutes()).length > 1 ? rawDate.getMinutes() : String(rawDate.getMinutes()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}T${hour}:${minutes}`;

        axios.post('/meeting/update',
          {
            start: formattedDate,
            mid: info.event._def.extendedProps.meetingId
          },
          {
            withCredentials: true
          })
          .then(() => {
            alert('meeting time changed');
          })
          .catch((error) => {
            console.log(error);
          });
      },
      events:
                parsedMeetingArray,
      editable: true,
      selectable: false,
      initialView: 'timeGridWeek',
      slotMinTime: '08:00:00',
      slotMaxTime: '17:00:00',
      expandRows: true,
      headerToolbar: {
        left: 'addEventButton',
        right: 'dayGridMonth,timeGridWeek,prev,next'
      },
      customButtons: {
        addEventButton: {
          text: 'add meeting',
          click() {
            $('#apptDialog').dialog('open');
          }
        }
      },
      // - dateClick: function(info) {
      // -     console.log('date clicked: ', info);
      // -     alert('clicked: ', info);
      // -     this.changeView('listDay');
      // - }
    });
    return adminCalendar;
  }
  function createApptDialog(parsedMeetingArray, adminCalendar) {
    // front end calendar
    $('#apptDialog').dialog({
      dialogClass: 'no-close',
      buttons: [
        {
          text: 'Make appointment',
          click() {
            let slotIsFull = false;
            const start = `${$('#apptDate').val()}T${$('#apptTime').val()}`;
            const startHour = start.split('T')[1].split(':')[0];
            const startDate = start.split('T')[0];

            parsedMeetingArray.forEach((meeting) => {
              const tempDate = meeting.start.split('T')[0];
              const tempStart = meeting.start.split('T')[1].split(':')[0];
              if (startHour === tempStart && startDate === tempDate) {
                slotIsFull = true;
              }
            });
            if ($('#apptDialogForm').valid()) {
              if (!slotIsFull) {
                axios.post('/meeting/create',
                  {
                    name: $('#name').val(),
                    date: $('#apptDate').val(),
                    time: $('#apptTime').val(),
                    contact: $('#contact-input').val(),
                    businessName: $('#business').val()
                  },
                  {
                    withCredentials: true
                  })
                  .then(() => {
                    const title = `Meeting w / ${$('#name').val()} at ${$('#apptTime').val()} on ${$('#apptDate').val()}`;
                    const start = `${$('#apptDate').val()}T${$('#apptTime').val()}`;
                    adminCalendar.addEvent({
                      title,
                      start,
                      color: getRandomColor()
                    });
                    $('#apptDialog').dialog('close');
                    clearForm();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                $('#errorMessage').dialog({
                  dialogClass: 'no-close',
                  body: 'Slots full!',
                  title: '/****** Time slot is full ******/',
                  minWidth: 350,
                  modal: true,
                  buttons: {
                    OK() {
                      $(this).dialog('close');
                    }

                  },
                });
                $('#apptTime').val('');
              }
            }
          }
        },
        {
          text: 'Cancel',
          click() {
            $(this).dialog('close');
            clearForm();
          }
        }
      ],
      resizeable: true,
      autoOpen: false,
      minWidth: 350,
      minHeight: 300,
      show: { effect: 'blind', duration: 100 }
    });
  }
  function clearForm() {
    $('#name').val('');
    $('#apptDate').val('');
    $('#apptTime').val('');
    $('#contact-input').val('');
  }
  document.addEventListener('DOMContentLoaded', () => {
    const csrf = $('meta[name="csrf-token"]').attr('content');
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
    $('#apptTime').on('change', function () {
      const time = $(this).val();
      const minutes = parseInt(time.split(':')[1]);
      if (minutes % 30 !== 0) {
        alert('meeting time must be on the hour or 1/2 hour. ex: 9:00 or 9:30');
        $(this).val('');
      }
    });
    $('#apptDialogForm').validate({
      rules: {
        name: 'required',
        apptDate: 'required',
        apptTime: 'required',
        contact: 'required',
      },
      messages: {
        name: '*required field missing',
        apptDate: '*required field missing',
        apptTime: '*please select a time between 8am and 5pm',
        contact: '*required field missing',
      }
    });

    const parsedMeetingArray = getFormattedMeetings();
    const adminCalendar = createMonthlyCal(parsedMeetingArray);
    createApptDialog(parsedMeetingArray, adminCalendar);

    if (adminCalendar) {
      adminCalendar.render();
    }
  });
})();
