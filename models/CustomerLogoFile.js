const mongoose = require('mongoose');

const customerLogoFileSchema = new mongoose.Schema({
  userId: String,
  fileName: String,
}, { timestamps: true });

const CustomerLogoFile = mongoose.model('CustomerLogoFile', customerLogoFileSchema);

module.exports = CustomerLogoFile;
