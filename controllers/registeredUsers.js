const RegisteredUser = require('../models/RegisteredUser');

/**
 * GET /registeredUser
 * Registered Users List Table.
 */
exports.getRegisteredUsers = (req, res) => {
  RegisteredUser.find({ }, (err, allRegisteredUsers) => {
    if (!err) {
      console.log(`All Waiting Customers: ${allRegisteredUsers}`);
      res.render('admin/registeredUsers', {
        title: 'Registered Users Waiting List',
        allRegisteredUsers
      });
    } else {
      console.log('error');
      throw err;
    }
  });
};
