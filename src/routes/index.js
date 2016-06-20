var express = require('express');
var router = express.Router();

router.use(require('./get'));
router.use(require('./post'));

router.get('/', function(request, response, next) {
	return response.render('homepage', {});
	/*if (request.user) {
		return response.redirect('/restricted');
	} else {
		return response.redirect('/login');
	}*/
});

module.exports = router;