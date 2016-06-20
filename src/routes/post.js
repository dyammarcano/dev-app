var express       = require('express');
var router        = express.Router();
var passport      = require('passport');
var Account       = require('../models/account');

/*
router.post('/api/register', passport.authenticate('local-signup')function(request, response, next) {
  console.log(request.query);
  console.log(request.body);
  Account.register(new Account({
    username: request.query.username
  }), request.query.password, function(err, account) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');
    return passport.authenticate('local-login')(function(request, response, next) {
      return response.json({register: true});
    });
  });
});

router.post('/api/login', passport.authenticate('local'), function(request, response, next) {
  return response.json({authenticate: true});
});
*/

router.post('/api/signup', passport.authenticate('signup'));

router.post('/api/login', passport.authenticate('login'));

module.exports = router; 
