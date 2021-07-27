
exports.getAdminCalendar = (req, res) => {
    res.render('dashboard/adminCalendar', {
      title: 'Admin Calendar',
      user: req.user,
    });
  };

exports.getFrontEndCalendar = (req, res) => {
  res.render('dashboard/frontEndCalendar', {
    title: 'Front End Calendar',
    user: req.user,
  });
};