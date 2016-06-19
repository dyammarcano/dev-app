var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var compress = require('compression');
var cors = require('cors');
var routes = require('./routes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '../public_html', 'logo.png')));
app.use(cors());
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public_html')));

app.use('*', function(req, res, next) {
  req.sample = 'hello world';
  next();
});

app.use('/', routes);
//app.use('/users', users);

module.exports = app;
