// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const mongoose = require('mongoose');

const waitingListCustomerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  company: String,
  callOrText: Boolean,
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

const WaitingListCustomerModel = mongoose.model('WaitingListCustomerModel', waitingListCustomerSchema);

module.exports = WaitingListCustomerModel;
