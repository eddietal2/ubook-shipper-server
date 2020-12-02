const mongoose = require('mongoose');

let ShippersSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 250
  },
  email: {
    type: String,
    maxlength: 100
  },
  password: {
    type: String,
    minlength: 7
  }
})

module.exports = Shipper = mongoose.model('Shipper', ShippersSchema);