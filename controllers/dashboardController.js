/**
 * GET /dashboard
 * Admin users Dashboard
 */
exports.getDashboard = (req, res) => {
  res.render('dashboard/dashboard', {
    title: 'Admin Dashboard',
    user: req.user
  });
};
