const mongoose = require('mongoose');

const waitingListCustomerSchema = new mongoose.Schema({
  userId: String,
  name: String,
  phoneNumber: String,
  company: String,
  callOrText: Boolean,
  notes: String,
}, { timestamps: true });

/**
 * Helper method for validating user's password.
 */
//  waitingListCustomerSchema.methods.comparePassword =
// function comparePassword(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };

const WaitingListCustomer = mongoose.model('WaitingListCustomer', waitingListCustomerSchema);

module.exports = WaitingListCustomer;
