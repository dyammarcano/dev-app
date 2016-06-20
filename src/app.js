var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var router        = express.Router();
var session       = require('express-session');
var sessionStore  = require('connect-mongodb-session')(session);
var compress      = require('compression');
var cors          = require('cors');
var flash         = require('connect-flash');  
var passport      = require('passport');
var mongoose      = require('mongoose');
//var LocalStrategy = require('passport-local').Strategy;
var routes        = require('./routes');
var Account       = require('./models/account');

mongoose.connect(process.env.DB, function(error) {
  if (error) {
    console.log('Could not connect to mongodb on localhost.');
  }
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(favicon(path.join(__dirname, '../public_html', 'favicon.ico')));
app.use(cors());
app.use(compress());
//app.use(logger('combined'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public_html')));
app.use(flash());

app.use(require('express-session')({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: new sessionStore({
    uri: process.env.DB,
    collection: 'sessions'
  }),
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passport')(passport);

app.use('/', routes);

module.exports = app;
