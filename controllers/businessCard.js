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
    const newBusinessCard = {
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
    };

    const query = { userId: newBusinessCard.userId };
    BusinessCard.findOneAndUpdate(query, newBusinessCard, { upsert: true }, (err, card) => {
      if (err) return res.send(500, { error: err });
      req.flash('success', { msg: `new business card: ${card.firstName}, created.` });
      res.redirect('../..');
    });
  } else {
    res.redirect('/logout');
  }
};
