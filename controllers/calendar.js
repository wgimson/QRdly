const Meeting = require('../models/Meeting');

exports.getAdminCalendar = (req, res) => {
    res.render('dashboard/adminCalendar', {
      title: 'Admin Calendar',
      user: req.user,
    });
  };
exports.getFrontEndCalendar  =  async (req, res) => {
  //give id 
  const name = req.params.id;
  const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let sortedMeetings = await Meeting.find( { businessName: { $eq: name } } ).sort( { date: 1} )
  var lastMeeting = await Meeting.find( { businessName: { $eq: name } } ).limit(1).sort( { $natural:-1 } ).exec()
  res.render('ui/frontEndCalendar', {
    title: 'Front End Calendar',
    businessName: name,
    date: date,
    meetings: sortedMeetings,
    lastMeeting: lastMeeting[0]
  });
};