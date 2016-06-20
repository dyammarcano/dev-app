var LocalStrategy = require('passport-local').Strategy;
var Account       = require('../models/account');

module.exports = function(passport) {
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(error, user) {
      done(error, user);
    });
  });

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(request, email, password, done) {
    process.nextTick(function() {
      Account.findOne({
        'local.email': email
      }, function(error, user) {
        if (error) {
          return done(error);
        }
        if (user) {
          console.log('That email is already in use.');
          return done(null, false, { message: 'That email is already in use.' });
        } else {
          var newUser = new Account();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(error) {
            if (error) {
              throw error;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(request, email, password, done) {
    Account.findOne({
      'local.email': email
    }, function(error, user) {
      if (error) {
        return done(error);
      }
      if (!user) {
        console.log('No user found.');
        return done(null, false, { message: 'No user found.' });
      }
      if (!user.validPassword(password)) {
        console.log('Wrong password.');
        return done(null, false, { message: 'Wrong password.' });
      }
      console.log('user account: ' + user);
      return done(null, { message: 'user account: ' + user });
    });
  }));
};
