var passport = require('passport');
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 2012502779010586,
    clientSecret: '6a32d44df959bdfbe2b5d302d9839617',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['email']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ 'facebookId': profile.id }, function (err, user) {
      if (err) return done(err)
      if (user) return done(null, user)
      else {
        var newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email = profile.emails[0].value;

        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
      return cb(err, user);
    });
  }
));