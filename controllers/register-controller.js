const Shipper = require('../models/shippers.model');

exports.register = (req, res) => {
  console.log('Registering ...');
  Shipper.findOne({ email: req.body.email },
    (err, shipper) => {
      if(err) return res.status(400).json(err);
      if(shipper) return res.status(400).json({msg: 'There is already a Shipper registered with that email'})
      if(!shipper) {
        let shipper = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }

        let newShipper = Shipper(shipper);

        newShipper.save((err, shipper) => {
          if (err) return err;
          if (!shipper) {
            console.log('There was no shipper saved');
            return res.status(200).json(shipper);
          };
          if (shipper) {
            console.log('Registered shipper\n');
            console.log(shipper);
            return res.status(200).json(shipper);
          }
        });
      }
    });
}