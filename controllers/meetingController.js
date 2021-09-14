const Meeting = require('../models/Meeting');

exports.create = (req, res) => {
    const newMeeting = new Meeting({
        name: req.body.name,
        date: req.body.apptDate,
        time: req.body.apptTime,
        contact: req.body.contact,
        businessName: req.body.business,
    });
    const redirectURL = '../ui/front-end-calendar/' + req.body.business;
      newMeeting.save((err) => {
        if (err) { console.log('error'); } // TODO - do real error checking
        else{
            req.flash('success', { msg: `new meeting  with  ${newMeeting.businessName}, created.` });
            res.redirect(redirectURL);
        }
    });
};
