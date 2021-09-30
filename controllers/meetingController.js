const Meeting = require('../models/Meeting');
const BusinessCard = require('../models/BusinessCard');

exports.create = async (req, res) => {
    const myBusinessCard = await BusinessCard.findOne( { userId: req.user.id } ).exec();
    const newMeeting = new Meeting({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        contact: req.body.contact,
        businessName: myBusinessCard.companyName,
        adminId: myBusinessCard.userId,
    });

    newMeeting.save((err) => {
        if (err) { 
            console.log('error');
        } // TODO - do real error checking
        else {
            res.status(201).json(newMeeting)  
        } 
    })
};
