const BusinessCard = require('../models/BusinessCard');

/**
 * ADD /waiting-list/add
 * confirm is valid phone number
 */
exports.isPhoneNumber = (req, res, next) => {
  if (req.user) {
    BusinessCard.findOne({ userId: req.user.id }, (err, card) => {
      if (err) { return next(err); }
      res.render('dashboard/business-card/create-business-card-form', {
        title: 'Customize Your Business Card',
        businessCard: card
      });
    });
  }
};
