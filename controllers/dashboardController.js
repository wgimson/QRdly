const BusinessCard = require('../models/BusinessCard');

/**
 * GET /dashboard
 * Admin users Dashboard
 */
exports.getDashboard = (req, res) => {
  BusinessCard.findOne({ userId: req.user.id }, (err, card) => {
    if (!err) {
      res.render('dashboard/dashboard/dashboard', {
        title: 'Admin Dashboard',
        user: req.user,
        businessCard: card
      });
    } else {
      console.log('error');
      throw err;
    }
  });
};
