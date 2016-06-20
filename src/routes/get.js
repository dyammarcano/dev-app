var express       = require('express');
var router        = express.Router();

router.get('/login', function(request, response, next) {
  return response.render('login', {});
});

router.get('/signup', function(request, response, next) {
  return response.render('signup', {});
});

router.get('/logout', function(request, response, next) {
  response.logout();
  return response.redirect('/');
});

module.exports = router;
