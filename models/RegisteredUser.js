const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
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
  isAdmin: { type: Boolean, default: false },

}, { timestamps: true });

/**
 * Password hash middleware.
 */
registeredUserSchema.pre('save', function save(next) {
  const registeredUserSchema = this;
  if (!registeredUserSchema.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(registeredUserSchema.password, salt, (err, hash) => {
      if (err) { return next(err); }
      registeredUserSchema.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
registeredUserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const RegisteredUser = mongoose.model('RegisteredUser', registeredUserSchema);

module.exports = RegisteredUser;
