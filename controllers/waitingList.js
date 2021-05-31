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
      // res.redirect('/account');
    } else {
      console.log('error');
      throw err;
    }
  });
};
