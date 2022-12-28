require('dotenv').config()
const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;


const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions,function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }

    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    console.log('coming from LocalLogin, sign in')
    return done(null, user);
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
};


const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { console.log('coming from jwt, user is not found');return done(err, false) }

    if (user) {
      console.log('coming from jwt, authorisation')
      done(null, user)
    } else {
      console.log('coming from jwt, some other problem occured');
      done(null, false)
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
