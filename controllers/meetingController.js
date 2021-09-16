const Meeting = require('../models/Meeting');

exports.create = (req, res) => {
    const newMeeting = new Meeting({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        contact: req.body.contact,
        businessName: req.body.businessName,
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
