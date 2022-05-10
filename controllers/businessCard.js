const BusinessCard = require('../models/BusinessCard');
const CustomerLogoFile = require('../models/CustomerLogoFile');

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
      showroomLocation: req.body.showroomLocation,
      phone: req.body.phone,
      openingMin: req.body.openingMin,
      shippingFrom: req.body.shippingFrom,
      promos: req.body.promos,
      companyContactInfo: req.body.companyContactInfo,
      contactInfo: req.body.contactInfo,
      buyerReqs: req.body.buyerReqs,
    };

    const query = { userId: newBusinessCard.userId };
    BusinessCard.findOneAndUpdate(query,
      newBusinessCard,
      { upsert: true, returnOriginal: false }, (err, card) => {
        if (err) return res.send(500, { error: err });
        req.flash('success', { msg: `new business card: ${card.firstName}, created.` });
        res.redirect('../dashboard');
      });
  } else {
    res.redirect('/logout');
  }
};

exports.saveCustomerLogo = async (req, res, next) => {
  if (req.user) {
    const newCustomerLogoFile = {
      userId: req.session.passport.user,
      fileName: req.file.filename,
    };
    const query = { userId: newCustomerLogoFile.userId };
    await CustomerLogoFile.findOneAndUpdate(query, newCustomerLogoFile, { upsert: true }, (err) => {
      if (err) return res.send(500, { error: err });
      return res;
    });
  } else {
    res.redirect('/logout');
  }
};

exports.getCustomerLogo = async (req, res, next) => {
  if (req.user) {
    const userId = res.session.user;
    const query = { userId };
    await CustomerLogoFile.findOnee(query, (customerLogoFile, err) => {
      if (err) return res.send(500, { error: err });
      res.body.customerLogoFile = customerLogoFile;
      return res;
    });
  } else {
    res.redirect('/logout');
  }
};

exports.getFrontEndCard = async (req, res, next) => {
  const businessCard = await BusinessCard.findOne({ userId: req.params.id });
  const logoFile = await CustomerLogoFile.findOne({ userId: req.params.id });
  res.render('ui/frontEndCard', {
    title: 'Admin Dashboard',
    businessCard,
    customerLogoFile: logoFile,
    id: req.params.id
  });
};
