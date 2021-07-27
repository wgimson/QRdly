
exports.getAdminCalendar = (req, res) => {
    res.render('dashboard/adminCalendar', {
      title: 'Admin Calendar',
      user: req.user,
    });
  };

exports.getFrontEndCalendar = (req, res, next) => {
  const name = req.params.id;
  res.render('ui/front-end-calendar/' + name, {
    title: 'Front End Calendar',
    businessName: name,
  });
};