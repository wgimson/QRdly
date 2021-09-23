const BusinessCard = require('../models/BusinessCard');
const CustomerLogoFile = require('../models/CustomerLogoFile');

/**
 * GET /dashboard
 * Admin users Dashboard
 */
exports.getDashboard = async (req, res) => {
  const businessCard = await BusinessCard.findOne({ userId: req.user.id });
  const logoFile = await CustomerLogoFile.findOne({ userId: req.user.id });
  res.render('dashboard/dashboard', {
    title: 'Admin Dashboard',
    user: req.user,
    businessCard,
    customerLogoFile: logoFile
  });
};
