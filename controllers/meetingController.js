const Meeting = require('../models/Meeting');

exports.create = (req, res) => {
    const newMeeting = new Meeting({
        datetime: req.body.datetime,
        duration: req.body.duration,
        contact: req.body.contact,
        businessName: req.body.business,
    });
    const redirectURL = '../ui/front-end-calendar/' + req.body.business;
      newMeeting.save((err) => {
        if (err) { console.log('error'); } // TODO - do real error checking
        else{
            req.flash('success', { msg: `new ${newMeeting.duration} minute meeting  with  ${newMeeting.businessName}, created.` });
            res.redirect(redirectURL);
        }
    });
};
