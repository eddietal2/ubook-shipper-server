const Shipper = require('../models/shippers.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require("bcrypt");

function createToken(Shipper) {
  return jwt.sign({ id: Shipper.id, email: Shipper.email }, config.jwtSecret, {
      expiresIn: 200 // 86400 expires in 24 hours
    });
}

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
      return res.status(400).send({ 'msg': 'You need to send email and password' });
  }

  console.log(`Attemping to log in as ${email}`);

  Shipper.findOne({ email: email }, (err, shipper) => {
      if (err) {
          return res.status(400).send({ 'msg': err });
      }

      if (!shipper) {
          return res.status(400).json({ 'msg': 'The shipper does not exist' });
      }

      shipper.comparePassword(password, (err, isMatch) => {
          if (isMatch && !err) {
              console.log('Logged in as: ' + shipper.email);
              res.status(200).json({
                  token: createToken(shipper)
              });
          } else {
              return res.status(400).json({ msg: 'The email and password don\'t match.' });
          }
      });
  });
}

exports.forgotPassword = (req, res) => {

  let email = req.body.email
  let newPassword = req.body.newPassword

  Shipper.findOne(
      {email: email},
      (err, shipper) => {
        if (err) return res.status(400).json(err)
        if (!shipper) return res.status(400).json({msg: 'There was no Shipper with that Email'})
        if (shipper) {
          console.log('Current Password' + shipper.password);
          shipper.comparePassword(newPassword, (err, isMatch) => {
            console.log(isMatch);
            if (isMatch && !err) {
                console.log('Passwords Match. Use a new password');
                return res.status(401).json({ msg: 'Passwords Match. Use a new password' });
            } else {
              // Create new hashed password
              bcrypt.genSalt(10, (err, salt) => {

              if (err) return next(err);

                bcrypt.hash(newPassword, salt, (err, hash) => {

                  console.log('New Password Hashed: ' + hash);

                  let newPassword = hash;
                  let filter = { email: email };
                  let update = { password: newPassword }

                  Shipper.updateOne(filter, update)
                  .then( data => {
                    console.log('Updated Password: ' + JSON.stringify(data));
                    return res.status(200).json({msg: 'Password Changed'});
                  })
                  .catch( err => {
                    console.log(err);
                    res.status(400).end('There was an error');
                  })
                })
              })
            }
        });
        }
      }
      )

   
};
