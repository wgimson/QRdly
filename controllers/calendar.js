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
  var meetings = await Meeting.find({contact: name});
  res.render('ui/frontEndCalendar', {
    title: 'Front End Calendar',
    businessName: name,
    date: date,
    meetings: meetings,
  });
};