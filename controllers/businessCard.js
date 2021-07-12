const BusinessCard = require('../models/BusinessCard');

/**
 * ADD /waiting-list/add
 * ADD Add Customer to Waiting List Form.
 */
exports.getNewBusinessCardForm = (req, res) => {
  res.render('dashboard/business-card/create-business-card-form', {
    title: 'Customize Your Business Card',
  });
};

/**
 * POST /dashboard/business-card/create
 * Create Business Card
 */
exports.createBusinessCard = (req, res) => {
  const newBusinessCard = new BusinessCard({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    companyName: req.body.companyName,
    streetAddress: req.body.streetAddress,
    streetAddress2: req.body.streetAddress2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phoneNumber: req.body.phoneNumber,
    openingMinimum: req.body.openingMin,
    shippingFrom: req.body.shippingFrom,
    promos: req.body.promos,
    contactInfo: req.body.contactInfo,
    buyerRequirements: req.body.buyerReqs,
  });

  newBusinessCard.save((err) => {
    if (err) { console.log('error'); } // TODO - do real error checking
    req.flash('success', { msg: `new business card: ${newBusinessCard.firstName}, created.` });
    res.redirect('../..');
  });
};
