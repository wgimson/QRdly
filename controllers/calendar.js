const Meeting = require('../models/Meeting');
const BusinessCard = require('../models/BusinessCard');

exports.getAdminCalendar = async (req, res) => {
  
  var company = "";
  await BusinessCard.findOne( { userId: req.user.id }, (err, card) => {
    if(card){
      company = card.companyName
    }
  })
  const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let sortedMeetings = await Meeting.find( { adminId: { $eq: req.user.id } } ).sort( { date: 1} )
  res.render('dashboard/adminCalendar', {
    title: 'Admin Calendar',
    user: req.user,
    businessName: company,
    date: date,
    meetings: sortedMeetings,
  });
};
exports.getFrontEndCalendar  =  async (req, res) => {
  //give id 
  var company = "";
  await BusinessCard.findOne( { userId: req.params.id }, (err, card) => {
    if(card){
      company = card.companyName
    }
  })
  const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let sortedMeetings = await Meeting.find( { adminId: { $eq: req.params.id } } ).sort( { date: 1} )
  res.render('ui/frontEndCalendar', {
    title: 'Front End Calendar',
    businessName: company,
    date: date,
    meetings: sortedMeetings,
  });
};