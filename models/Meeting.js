const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  contact: String,
  businessName: String,
  shoppedHereBefore: String,
  email: String,
  adminId: String,
}, { timestamps: true });


const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;
