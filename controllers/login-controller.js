const Shipper = require('../models/shippers.model');

exports.login = (req, res) => {
  console.log('Shipper logging in..');
  return res.status(200).send('wassup');
}