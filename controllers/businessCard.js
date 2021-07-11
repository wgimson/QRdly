// const BusinessCard = require('../models/BusinessCard');

/**
 * ADD /waiting-list/add
 * ADD Add Customer to Waiting List Form.
 */
exports.getNewBusinessCardForm = (req, res) => {
  res.render('dashboard/business-card/create-business-card-form', {
    title: 'Customize Your Business Card',
  });
};
