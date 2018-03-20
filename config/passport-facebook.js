var passport = require('passport');
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 2012502779010586,
    clientSecret: '6a32d44df959bdfbe2b5d302d9839617',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['emails']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookEmail: profile.email }, function (err, user) {
      return cb(err, user);
    });
  }
));