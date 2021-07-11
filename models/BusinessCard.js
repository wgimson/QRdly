const mongoose = require('mongoose');

const businessCardSchema = new mongoose.Schema({
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

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;
