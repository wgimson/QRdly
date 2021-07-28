const BusinessCard = require('../models/BusinessCard');

/**
 * GET /dashboard
 * Admin users Dashboard
 */
exports.getDashboard = (req, res) => {
  BusinessCard.find({}, (err, allBusinessCards) => {
    if (!err) {
      console.log('UserId:');
      const firstBusinessCard = allBusinessCards[0];
      res.render('dashboard/dashboard/dashboard', {
        title: 'Admin Dashboard',
        user: req.user,
        businessCard: firstBusinessCard
      });
    } else {
      console.log('error');
      throw err;
    }
  });
};
