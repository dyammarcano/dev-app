var LocalStrategy = require('passport-local').Strategy;
var Account       = require('../models/account');

module.exports = function(passport) {
  passport.serializeUser(function(Account, done) {
    done(null, Account.id);
  });

  passport.deserializeUser(function(id, done) {
    Account.findById(id, function(error, user) {
      done(error, Account);
    });
  });

  passport.use('local-signup', new LocalStrategy({
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
          return console.log('signupMessage', 'That email is already in use.');
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

  passport.use('local-login', new LocalStrategy({
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
        return console.log('loginMessage', 'No user found.');
      }
      if (!user.validPassword(password)) {
        return console.log('loginMessage', 'Wrong password.');
      }
      return console.log(user);
    });
  }));
};
