const WaitingListCustomer = require('../models/WaitingListCustomer');

/**
 * GET /waiting-list
 * Customer Waiting List Table.
 */
exports.getWaitingList = (req, res) => {
  WaitingListCustomer.find({ userId: req.user.id }, (err, allWaitingListCustomers) => {
    if (!err) {
      console.log(`All Waiting Customers: ${allWaitingListCustomers}`);
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
    WaitingListCustomer.findOne({ userId: req.user.id, _id: customerId },
      (err, waitingListCustomer) => {
        if (!err) {
          console.log(`Waiting Customer: ${waitingListCustomer}`);
          if (!waitingListCustomer) {
            console.log('no customer');
          }

          res.render('dashboard/waiting-list/addOrEdit', {
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
    res.render('dashboard/waiting-list/addOrEdit', {
      title: 'Add Customer to Waiting List',
    });
  }
};

exports.getWaitingListCustomerById = (req, res, id) => {
  WaitingListCustomer.findOne({ userId: req.user.id, customerId: id },
    (err, waitingListCustomer) => {
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
  const newWaitingCustomer = new WaitingListCustomer({
    userId: req.user.id,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    company: req.body.company,
    callOrText: req.body.callOrText,
    notes: req.body.notes,
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
    const query = { _id: req.body.id, userId: req.user.id };

    req.updateWaitingListCustomer = {};
    req.updateWaitingListCustomer.name = req.body.name;
    req.updateWaitingListCustomer.phoneNumber = req.body.phoneNumber;
    req.updateWaitingListCustomer.company = req.body.company;
    req.updateWaitingListCustomer.callOrText = req.body.callOrText;
    req.updateWaitingListCustomer.notes = req.body.notes;

    WaitingListCustomer.findOneAndUpdate(query,
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
