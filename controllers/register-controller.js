const Shipper = require('../models/shippers.model');

exports.register = (req, res) => {
  console.log('Shipper Registering ...');
  return res.status(200).send('Register');
}