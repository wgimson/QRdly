const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
  calendarUrl: String,
  isAdmin: { type: Boolean, default: false },

  companyName: String,
  primaryContactName: String,
  streetAddress: String,
  city: String,
  zip: Number,
  state: String,
  shippingStreetAddress: String,
  shippingCity: String,
  shippingState: String,
  shippingZip: Number,
  companyPhone: String,
  companyWebsite: String,
  companyInfo: String,
  numberOfShowrooms: Number,
  ein: String,

  snapchat: String,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  twitch: String,
  quickbooks: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
