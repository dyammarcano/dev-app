var express       = require('express');
var router        = express.Router();
var passport      = require('passport');
var Account       = require('../models/account');

router.get('/login', function(request, response, next) {
  return response.render('login', {});
});



router.get('/register', function(request, response, next) {
  return response.render('register', {});
});



router.get('/logout', function(request, response, next) {
  response.logout();
  return response.redirect('/');
});

module.exports = router;
