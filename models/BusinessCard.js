const mongoose = require('mongoose');

const businessCardSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  companyName: String,
  streetAddress: String,
  streetAddress2: String,
  city: String,
  state: String,
  zipCode: String,
  phone: String,
  openingMin: String,
  shippingFrom: String,
  promos: String,
  contactInfo: String,
  companyContactInfo: String,
  buyerReqs: String,
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
