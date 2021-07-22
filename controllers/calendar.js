
exports.index = (req, res) => {
    res.render('dashboard/calendar', {
      title: 'Calendar',
      user: req.user,
    });
  };