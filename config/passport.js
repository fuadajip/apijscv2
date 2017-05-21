const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const userController = require();
const config = require('./database');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = extractJWT.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JWTStrategy(opts, (jwt_playload, done) => {
        console.log(jwt_playload);


        //Something about user controller
    }));
}