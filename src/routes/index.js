var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html');
});

router.get('/dashboard', function(req, res, next) {
  res.sendFile('./public/dashboard.html');
});

module.exports = router;