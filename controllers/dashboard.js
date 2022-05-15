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
  console.log(`url: ${fullUrl}`);

  qr.toDataURL(fullUrl, (err, src) => {
    if (err) res.send('Error creating QR');
    const base64Data = src.replace(/^data:image\/png;base64,/, '');

    fs.writeFile('public/img/users/QR_Code.png', base64Data, 'base64', (err) => {
      console.log(err);
      res.redirect('/dashboard/downloadQRCode');
    });
  });
};

exports.downloadQRCode = async (req, res) => {
  console.log('gonna download download');
  const file = 'public/img/users/QR_Code.png';
  res.download(file);
};

exports.seeWhatCustomerSees = async (req, res) => {
  const businessCard = await BusinessCard.findOne({ userId: req.user.id });
  const logoFile = await CustomerLogoFile.findOne({ userId: req.user.id });
  res.render('dashboard/dashboard', {
    title: 'Admin Dashboard',
    user: req.user,
    businessCard,
    customerLogoFile: logoFile
  });
};
