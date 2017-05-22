const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const userController = require('../controllers/employee');
const config = require('./database');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = extractJWT.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, (jwt_playload, done) => {
        console.log(jwt_playload);
        userController.getUserById(jwt_playload._doc._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })

    }));
}