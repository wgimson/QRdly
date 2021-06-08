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
 * ADD /waiting-list/add
 * ADD Add Customer to Waiting List Form.
 */
exports.getCreateOrEditUserForm = (req, res) => {
  const customerId = req.query.id;

  if (customerId) {
    WaitingListCustomerModel.findById(customerId, (err, waitingListCustomer) => {
      if (!err) {
        console.log(`Waiting Customer: ${waitingListCustomer}`);
        if (!waitingListCustomer) {
          console.log('no custoemr');
        }

        res.render('dashboard/waiting-list/add', {
          title: 'Add Customer to Waiting List',
          customer: waitingListCustomer
        });
      } else {
        console.log('error');
        throw err;
      }
      return waitingListCustomer;
    });
  } else {
    console.log('no customerId');
    res.render('dashboard/waiting-list/add', {
      title: 'Add Customer to Waiting List',
    });
  }
};

exports.getWaitingListCustomerById = (req, res, id) => {
  WaitingListCustomerModel.findById(id, (err, waitingListCustomer) => {
    if (!err) {
      console.log(`Waiting Customer: ${waitingListCustomer}`);
      if (!waitingListCustomer) {
        console.log('no custoemr');
      }
    } else {
      console.log('error');
      throw err;
    }
    return waitingListCustomer;
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

/**
 * POST /waiting-list/add
 * Add new Customer to Waiting List.
 */
exports.updateCustomer = (req, res) => {
  if (req.body.id) {
    const query = { _id: req.body.id };

    req.updateWaitingListCustomer = {};
    req.updateWaitingListCustomer.name = req.body.name;
    req.updateWaitingListCustomer.phoneNumber = req.body.phoneNumber;
    req.updateWaitingListCustomer.company = req.body.companys;
    req.updateWaitingListCustomer.callOrText = req.body.callOrText;

    WaitingListCustomerModel.findOneAndUpdate(query,
      req.updateWaitingListCustomer,
      { upsert: true }, (err, customer) => {
        if (!err) {
          console.log(customer);
          res.redirect('../waiting-list/waiting-list');
        } else {
          return res.send(500, { error: err });
        }
      });
  } else {
    console.log('no customerId');
  }
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
