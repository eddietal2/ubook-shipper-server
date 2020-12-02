const Shipper = require('../models/shippers.model');

exports.getShippers = (req, res) => {
  console.log('Getting all Shippers ...');
  Shipper.find((err, shippers) => {
    console.log(shippers);
    
  })
}