const qr = require('qrcode');
const fs = require('fs');
const BusinessCard = require('../models/BusinessCard');
const CustomerLogoFile = require('../models/CustomerLogoFile');
const User = require('../models/User');

const buildCalendarUrl = (req, calUrl) => {
  const url = `http://${req.headers.host}${calUrl}`;
  console.log(`Listening on ${url}`);
  return url;
};

/**
 * GET /dashboard
 * Admin users Dashboard
 */
exports.getDashboard = async (req, res) => {
  const businessCard = await BusinessCard.findOne({ userId: req.user.id });
  const logoFile = await CustomerLogoFile.findOne({ userId: req.user.id });
  res.render('dashboard/dashboard', {
    title: 'Admin Dashboard',
    user: req.user,
    businessCard,
    customerLogoFile: logoFile
  });
};

/**
 * GET /generateQRCode
 * Download user's QR code
 */
exports.generateQRCode = async (req, res) => {
  console.log('gonna render render');
  const user = await User.findOne({ _id: req.user.id });
  const { calendarUrl } = user;
  const fullUrl = buildCalendarUrl(req, calendarUrl);

  qr.toDataURL(fullUrl, (err, src) => {
    if (err) res.send('Error creating QR');

    fs.writeFile('QR_Code.png', src, 'base64', (err) => {
      console.log(err);
      res.render('dashboard/QR', { src });
      // this.getDashboard(req, res);
    });
  });
};
