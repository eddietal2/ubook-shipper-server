var Shipper        = require('../models/shippers.model');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('../config/default.json');

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    Shipper.findById(jwt_payload.id, function (err, shipper) {
        if (err) {
            return done(err, false);
        }
        if (shipper) {
            return done(null, shipper);
        } else {
            return done(null, false);
        }
    });
});