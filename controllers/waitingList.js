const WaitingListCustomerModel = require('../models/WaitingListCustomer');

/**
 * GET /waitingListCustomers
 * Dashboard page.
 */
exports.getWaitingList = (req, res) => {
  WaitingListCustomerModel.find({}, (err, allWaitingListCustomers) => {
    if (!err) {
      console.log(`All Waiting Customers: ${allWaitingListCustomers}`);
      if (allWaitingListCustomers.length < 1) {
        this.initWaitingList(req, res);
      }
      res.render('dashboard/waiting-list', {
        title: 'Virtual Customer Waiting List',
        waitingListCustomers: allWaitingListCustomers
      });
    } else {
      console.log('error');
      throw err;
    }
  });
};

/**
 * POST /waitingListCustomers
 * Dashboard page.
 */
exports.addCustomerToWaitingList = (req, res) => {
  res.render('dashboard/waiting-list/add', {
    title: 'Add Customer to Waiting List',
  });
};

exports.saveNewCustomer = (req, res) => {
  const newWaitingCustomer = new WaitingListCustomerModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    company: req.body.company,
    callOrText: req.body.callOrText,
  });

  newWaitingCustomer.save((err) => {
    if (err) { console.log('error'); } //return next(err); }
    req.flash('success', { msg: `new customer: ${newWaitingCustomer.name}, created.` });
    this.getWaitingList(req, res);
  });
};

exports.initWaitingList = () => {
  const firstWaitingCustomer = new WaitingListCustomerModel({
    name: 'Billy',
    phoneNumber: '678-678-6868',
    company: 'QRdly',
    callOrText: true,
  });

  firstWaitingCustomer.save((err) => {
    if (!err) {
      console.log(`All Waiting Customers: ${firstWaitingCustomer}`);
    } else {
      console.log('error');
      throw err;
    }
  });
};
