exports.getAdminCalendar = (req, res) => {
    res.render('dashboard/adminCalendar', {
      title: 'Admin Calendar',
      user: req.user,
    });
  };

exports.getFrontEndCalendar = (req, res) => {
  const name = req.params.id;
  res.render('ui/frontEndCalendar', {
    title: 'Front End Calendar',
    businessName: name,
  });
};