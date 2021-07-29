const BusinessCard = require('../models/BusinessCard');

/**
 * ADD /waiting-list/add
 * ADD Add Customer to Waiting List Form.
 */
exports.getNewBusinessCardForm = (req, res, next) => {
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

/**
 * POST /dashboard/business-card/create
 * Create Business Card
 */
exports.createBusinessCard = (req, res) => {
  if (req.user) {
    const newBusinessCard = new BusinessCard({
      userId: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.companyName,
      streetAddress: req.body.streetAddress,
      streetAddress2: req.body.streetAddress2,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
      openingMin: req.body.openingMin,
      shippingFrom: req.body.shippingFrom,
      promos: req.body.promos,
      companyContactInfo: req.body.companyContactInfo,
      contactInfo: req.body.contactInfo,
      buyerReqs: req.body.buyerReqs,
    });

    newBusinessCard.save((err) => {
      if (err) { console.log('error'); } // TODO - do real error checking
      req.flash('success', { msg: `new business card: ${newBusinessCard.firstName}, created.` });
      res.redirect('../..');
    });
  }
};
