require('dotenv').config();

var app = require('./app');
var fs = require('fs');
var debug = require('debug')(process.env.APPNAME + ':server');
var http = require('http');
var Primus = require('primus.io');

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, request, response, next) {
    response.status(err.status || 500);
    response.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, request, response, next) {
  response.status(err.status || 500);
  response.render('error', {
    message: err.message,
    error: {}
  });
});

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

primus = new Primus(server, {
  transformer: "websockets",
  parser: "JSON"
});

//primus.authorize(authorize);

var fam = primus.channel('fam');

// channel for communication to fam
fam.on("connection", function(spark) {
  console.log('fam socket connect whit id: ' + spark.id);

  spark.on('data', function(data) {
    console.log('data: ' + data);
  });

  spark.on('finger', function(data) {
    console.log('data: ' + data);
  });
});

var web = primus.channel('web');

// channel for communication to web client
web.on("connection", function(spark) {
  console.log('web client connect whit id: ' + spark.id);

  spark.on('register', function(data) {
    Account.register(new Account({
      username: data.username,
    }), data.password, function register(err, account) {
      if (err) {
        console.log(err);
      } else {
        console.log(account);
        passport.authenticate('local', {})(request, response, function(err, user) {
          console.log('register success');
        });
      }
    });
  });

  spark.on('authenticate', function(data) {
    username = data.username;
    password = data.password;
    console.log('username: ' + username + ' password: ' + password);
    function authenticate(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          console.log('Incorrect username.');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          console.log('Incorrect password.');
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  });

  spark.on('message', function(data) {
    console.log('data: ' + data);
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

console.log('Express server ready in (' + process.env.MODE + ') mode http://localhost:' + process.env.PORT);
