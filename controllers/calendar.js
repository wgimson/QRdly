const Meeting = require('../models/Meeting');
const BusinessCard = require('../models/BusinessCard');

function getLongDate() {
  const day = new Date();
  const days = ['Sun', 'Mon', 'Tues', 'Wedn', 'Thurs', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${days[day.getDay()]} ${months[day.getMonth()]} ${day.getDay()}, ${day.getFullYear()}`;
}
// function getTimeFrame() {
//   selectedTime = `${formattedHours}:${formattedMinutes}`;
//   // Check correct time format and split into components
//   time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

//   if (time.length > 1) { // If time format correct
//     time = time.slice(1); // Remove full string match value
//     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
//     time[0] = +time[0] % 12 || 12; // Adjust hours
//   }
//   return time.join(''); // return adjusted time or original string
// }
exports.getAdminCalendar = async (req, res) => {
  let company = '';
  await BusinessCard.findOne({ userId: req.user.id }, (err, card) => {
    if (card) {
      company = card.companyName;
    }
  });
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  const sortedMeetings = await Meeting.find({ adminId: { $eq: req.user.id } }).sort({ date: 1 });
  res.render('dashboard/adminCalendar', {
    title: 'Admin Calendar',
    user: req.user,
    businessName: company,
    date,
    meetings: sortedMeetings,
  });
};
exports.getFrontEndCalendar = async (req, res) => {
  // give id
  let company = '';
  let city = '';
  let state = '';
  await BusinessCard.findOne({ userId: req.params.id }, (err, card) => {
    if (card) {
      company = card.companyName;
      city = card.city;
      state = card.state;
    }
  });
  console.log('hello');
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  const sortedMeetings = await Meeting.find({ adminId: { $eq: req.params.id } }).sort({ date: 1 });
  const longDate = getLongDate();
  const location = `${city}, ${state}`;
  res.render('ui/frontEndCalendar', {
    title: 'Front End Calendar',
    businessName: company,
    date,
    meetings: sortedMeetings,
    adminId: req.params.id,
    location,
    longDate
  });
};
