const Meeting = require('../models/Meeting');
const BusinessCard = require('../models/BusinessCard');
const User = require('../models/User');

exports.create = async (req, res) => {
  const businessCard = {};
  if (req.body.adminId) {
    await BusinessCard.findOne({ userId: req.body.adminId }, (err, card) => {
      if (card) {
        businessCard.company = card.companyName;
        businessCard.userId = card.userId;
      } else {
        User.findOne({ id: req.body.adminId }, (err, user) => {
          businessCard.company = user.email;
          businessCard.userId = user.id;
        });
      }
    });
  } else {
    await BusinessCard.findOne({ userId: req.user.id }, (err, card) => {
      if (card) {
        businessCard.company = card.companyName;
        businessCard.userId = card.userId;
      } else {
        User.findOne({ id: req.user.id }, (err, user) => {
          businessCard.company = user.email;
          businessCard.userId = user.id;
        });
      }
    });
  }
  const newMeeting = new Meeting({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    contact: req.body.contact,
    businessName: businessCard.company,
    adminId: businessCard.userId,
  });

  newMeeting.save((err) => {
    if (err) {
      console.log('error');
    } // TODO - do real error checking
    else {
      res.status(201).json(newMeeting);
    }
  });
};

exports.update = async (req, res) => {
  Meeting.updateOne({
    _id: req.body.mid
  },
  {
    time: req.body.start.split('T')[1],
    date: req.body.start.split('T')[0]
  },
  (err) => {
    if (err) {
      console.log('error');
    } // TODO - do real error checking
    else {
      return res.json({ success: 'Updated Successfully', status: 200 });
    }
  });
};

exports.delete = async (req, res) => {
  Meeting.deleteOne({
    _id: req.body.mid
  },
  (err) => {
    if (err) {
      console.log('error');
    } // TODO - do real error checking
    else {
      return res.json({ id: req.body.mid });
    }
  });
};
