const Meeting = require('../models/Meeting');
const BusinessCard = require('../models/BusinessCard');

exports.getAdminCalendar = async (req, res) => {
  const myCard = await BusinessCard.findOne( { userId: req.user.id } ).exec()
  const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let sortedMeetings = await Meeting.find( { adminId: { $eq: req.user.id } } ).sort( { date: 1} )
  var lastMeeting = await Meeting.find( { adminId: { $eq: req.user.id } } ).limit(1).sort( { $natural:-1 } ).exec()
  res.render('dashboard/adminCalendar', {
    title: 'Admin Calendar',
    user: req.user,
    businessName: myCard.companyName,
    date: date,
    meetings: sortedMeetings,
    lastMeeting: lastMeeting[0]
  });
};
exports.getFrontEndCalendar  =  async (req, res) => {
  //give id 
  const myCard = await BusinessCard.findOne( { userId: req.params.id } ).exec()
  const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let sortedMeetings = await Meeting.find( { adminId: { $eq: myCard.userId } } ).sort( { date: 1} )
  var lastMeeting = await Meeting.find( { adminId: { $eq: myCard.userId } } ).limit(1).sort( { $natural:-1 } ).exec()
  res.render('ui/frontEndCalendar', {
    title: 'Front End Calendar',
    businessName: myCard.companyName,
    date: date,
    meetings: sortedMeetings,
    lastMeeting: lastMeeting[0]
  });
};