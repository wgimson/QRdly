
exports.index = (req, res) => {
    res.render('dashboard/calendar', {
      title: 'Cal',
      user: req.user,
    });
  };