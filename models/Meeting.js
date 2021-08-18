const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  datetime: String,
  duration: String,
  contact: String,
  businessName: String,
}, { timestamps: true });


const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;
