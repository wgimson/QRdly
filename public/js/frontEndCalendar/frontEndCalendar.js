/* eslint-env jquery, browser */
(() => {
  function clearForm() {
    $('#name').val('');
    $('#apptDate').val('');
    $('#apptTime').val('');
    $('#contact-input').val('');
  }
  function getParsedFreeTimeslotArray(dateStr, cal) {
    const blockedTimeArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const freeTimeEventArray = [];
    const events = cal.getEvents();
    events.forEach((ev) => {
      const startDate = ev.start.toISOString().split('T')[0];
      if ((startDate === dateStr) && (ev.title.trim() === '/*** FULL ***/')) {
        const startTimeHours = ev.start.getHours();
        const startTimeMinutes = ev.start.getMinutes();
        const index = startTimeHours - 8;
        blockedTimeArray[index]++;
        if (startTimeMinutes !== 0) {
          blockedTimeArray[(index + 1)]++;
        }
      }
    });
    blockedTimeArray.forEach((val, index) => {
      if (val < 1) {
        if (index < 2) {
          freeTimeEventArray.push({
            title: 'OPEN',
            color: '#e7e9eb',
            start: `${dateStr}T0${index + 8}:00`
          });
        } else {
          freeTimeEventArray.push({
            title: 'OPEN',
            color: '#e7e9eb',
            start: `${dateStr}T${index + 8}:00`
          });
        }
      }
    });
    return freeTimeEventArray;
  }
  function getAllMeetings() {
    // get all meetings for this company
    let meetings = [];
    if (document.getElementById('meetings')) {
      meetings = document.getElementById('meetings').value;
    }
    const meetingArray = JSON.parse(meetings);
    const parsedMeetingArray = [];
    const meetingMax = 5;
    const hourArray = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'];
    let apptCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let previousDate = null;
    let lastDate = null;
    let firstDate = null;

    if (meetingArray.length) {
      previousDate = meetingArray[0].date;
      firstDate = meetingArray[0].date;
      lastDate = meetingArray[meetingArray.length - 1].date;
    }

    if (firstDate !== null && firstDate !== lastDate) {
      meetingArray.forEach((meeting, index) => {
        if (previousDate === meeting.date) {
          hourArray.forEach((hour, i) => {
            const meetingTime = meeting.time.split(':')[0];
            if (meetingTime === hour) {
              apptCounter[i]++;
            }
          });
        }
        if (previousDate !== meeting.date || index === meetingArray.length - 1) {
          apptCounter.forEach((meetingsBooked, i) => {
            if (meetingsBooked >= meetingMax) {
              const t = `${hourArray[i]}:00`;
              parsedMeetingArray.push({
                title: '/*** FULL ***/ ',
                color: '#b7b7b7',
                start: `${previousDate}T${t}`
              });
            }
          });
          apptCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

          hourArray.forEach((hour, i) => {
            const meetingTime = meeting.time.split(':')[0];
            if (meetingTime === hour) {
              apptCounter[i]++;
            }
          });
          previousDate = meeting.date;
        }
      });
    }

    if (firstDate !== null && firstDate === lastDate) {
      meetingArray.forEach((meeting, index) => {
        hourArray.forEach((hour, i) => {
          const meetingTime = meeting.time.split(':')[0];
          if (meetingTime === hour) {
            apptCounter[i]++;
          }
        });

        if (index === meetingArray.length - 1) {
          apptCounter.forEach((meetingsBooked, i) => {
            if (meetingsBooked >= meetingMax) {
              const t = `${hourArray[i]}:00`;
              parsedMeetingArray.push({
                title: '/*** FULL ***/ ',
                color: '#b7b7b7',
                start: `${lastDate}T${t}`
              });
            }
          });
        }
      });
    }
    return parsedMeetingArray;
  }
  function incrementDateString(dateStr) {
    const parts = dateStr.split('-');
    const dt = new Date(parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setDate(dt.getDate() + 1);
    parts[0] = `${dt.getFullYear()}`;
    parts[1] = `${dt.getMonth() + 1}`;
    if (parts[1].length < 2) {
      parts[1] = `0${parts[1]}`;
    }
    parts[2] = `${dt.getDate()}`;
    if (parts[2].length < 2) {
      parts[2] = `0${parts[2]}`;
    }
    return parts.join('-');
  }
  function decrementDateString(dateStr) {
    const parts = dateStr.split('-');
    const dt = new Date(parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setDate(dt.getDate() - 1);
    parts[0] = `${dt.getFullYear()}`;
    parts[1] = `${dt.getMonth() + 1}`;
    if (parts[1].length < 2) {
      parts[1] = `0${parts[1]}`;
    }
    parts[2] = `${dt.getDate()}`;
    if (parts[2].length < 2) {
      parts[2] = `0${parts[2]}`;
    }
    return parts.join('-');
  }
  function setListView(frontEndCalendar, dateStr) {
    const newEvents = getParsedFreeTimeslotArray(dateStr, frontEndCalendar);
    newEvents.forEach((newEvent) => {
      frontEndCalendar.addEvent(newEvent);
    });
    frontEndCalendar.changeView('listDay', dateStr);
  }
  function configApptDialog(parsedMeetingArray, frontEndCalendar) {
    $('#apptTime').on('change', function () {
      const time = $(this).val();
      const minutes = parseInt(time.split(':')[1], 10);
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
        apptTime: '*required field missing',
        contact: '*required field missing',
      }
    });

    $('#apptDialog').dialog({
      dialogClass: 'no-close',
      buttons: [
        {
          text: 'Make appointment',
          click() {
            const csrf = $('meta[name="csrf-token"]').attr('content');
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
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
                    businessName: $('#business').val(),
                    adminId: $('#admin-id').val(),
                  },
                  {
                    withCredentials: true
                  })
                  .then((response) => {
                    const title = `Meeting w / ${$('#business').val()} at ${$('#apptTime').val()} on ${$('#apptDate').val()}`;
                    const start = `${$('#apptDate').val()}T${$('#apptTime').val()}`;
                    frontEndCalendar.addEvent({
                      title,
                      start,
                      color: '#93c47ed'
                    });
                    $('#apptDialog').dialog('close');
                    frontEndCalendar.changeView('listDay', startDate);
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
  function setup() {
    const parsedMeetingArray = getAllMeetings();
    const calendarEl = document.getElementById('frontEndCalendar');
    const frontEndCalendar = createFrontEndCalendar(parsedMeetingArray, calendarEl);
    configApptDialog(parsedMeetingArray, frontEndCalendar);
    if (frontEndCalendar) {
      frontEndCalendar.render();
    }
  }
  function createFrontEndCalendar(parsedMeetingArray, calendarEl) {
    let curDate;
    const frontEndCalendar = new FullCalendar.Calendar(calendarEl, {
      eventClick(info) {
        if (info.event.title.trim() === '/*** FULL ***/') {
          return;
        }

        $('#apptDialog input#apptDate').val(info.event.start.toISOString().split('T')[0]);
        const formattedHours = (info.event.start.getHours()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        const formattedMinutes = (info.event.start.getMinutes()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        $('#apptDialog input#apptTime').val(`${formattedHours}:${formattedMinutes}`);
        $('#apptDialog').dialog('open');
      },
      events:
            parsedMeetingArray,
      editable: false,
      initialView: 'dayGridMonth',
      slotMinTime: '07:00:00',
      slotMaxTime: '17:00:00',
      expandRows: true,
      headerToolbar: {
        center: 'dayGridMonth,dayGridWeek,prev,next',
        right: ''
      },
      dateClick: (info) => {
        curDate = info;
        setListView(frontEndCalendar, info.dateStr);
        const headerOptions = frontEndCalendar.getOption('headerToolbar');
        headerOptions.center = 'prevDayButton, nextDayButton';
        headerOptions.right = 'monthGridButton';
        frontEndCalendar.setOption('headerToolbar', headerOptions);
      },
      customButtons: {
        prevDayButton: {
          text: '<',
          click() {
            curDate.dateStr = decrementDateString(curDate.dateStr);
            frontEndCalendar.prev();
            setListView(frontEndCalendar, curDate.dateStr);
          }
        },
        nextDayButton: {
          text: '>',
          click() {
            curDate.dateStr = incrementDateString(curDate.dateStr);
            frontEndCalendar.next();
            setListView(frontEndCalendar, curDate.dateStr);
          }
        },
        monthGridButton: {
          text: 'Month',
          click() {
            setup();
          }
        }
      },

    });
    return frontEndCalendar;
  }
  document.addEventListener('DOMContentLoaded', () => {
    setup();
  });
})();
