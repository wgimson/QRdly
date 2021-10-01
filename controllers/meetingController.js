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

exports.update = async (req, res) => {
    Meeting.updateOne(
        { 
            _id: req.body.mid 
        }, 
        { 
            time: req.body.start.split('T')[1],
            date: req.body.start.split('T')[0]
         },
        function(err) {
            if (err) { 
                console.log('error');
            } // TODO - do real error checking
            else {
                return res.json({success : "Updated Successfully", status : 200});;
            } 
        }
    )
};

exports.delete = async (req, res) => {
    Meeting.deleteOne(
        {
            _id: req.body.mid
        },
        function(err) {
            if (err) { 
                console.log('error');
            } // TODO - do real error checking
            else {
                return res.json({ id: req.body.mid });;
            } 
        }
    )
};