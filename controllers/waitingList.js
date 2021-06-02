const WaitingListCustomerModel = require('../models/WaitingListCustomer');

/**
 * GET /waiting-list
 * Customer Waiting List Table.
 */
exports.getWaitingList = (req, res) => {
  WaitingListCustomerModel.find({}, (err, allWaitingListCustomers) => {
    if (!err) {
      console.log(`All Waiting Customers: ${allWaitingListCustomers}`);
      if (allWaitingListCustomers.length < 1) {
        this.initWaitingList(req, res);
      }
      res.render('dashboard/waiting-list/waiting-list', {
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
 * GET /waiting-list/add
 * GET Add Customer to Waiting List Form.
 */
exports.addCustomerToWaitingList = (req, res) => {
  res.render('dashboard/waiting-list/add', {
    title: 'Add Customer to Waiting List',
  });
};

/**
 * POST /waiting-list/add
 * Add new Customer to Waiting List.
 */
exports.saveNewCustomer = (req, res) => {
  const newWaitingCustomer = new WaitingListCustomerModel({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    company: req.body.company,
    callOrText: req.body.callOrText,
  });

  newWaitingCustomer.save((err) => {
    if (err) { console.log('error'); } // TODO - do real error checking
    req.flash('success', { msg: `new customer: ${newWaitingCustomer.name}, created.` });
    res.redirect('../waiting-list/waiting-list');
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
