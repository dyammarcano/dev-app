var primus = Primus.connect('ws://' + location.hostname + ':3000', {
  transformer: 'webwebs',
  parser: "JSON",
  reconnect: {
    max: Infinity,
    min: 1000,
    retries: 10
  }
});

var web = primus.channel('web');

web.on('error', function error(error) {
  alert('Something horrible has happened', error.stack);
});

web.on('reconnect', function reconnect(opts) {
  console.log('Reconnection');
});

web.on('end', function end() {
  console.log('Connection closed');
});

var app = angular.module('loginApp', ['ui.materialize']);

app.controller('mainController', function mainController($scope, $timeout, $http) {
  $scope.credentials = {
    username: '',
    password: '',
    remember: false
  };
  $scope.sendButtonText = "Entrar";

  $scope.login = function(credentials) {
    //console.log(credentials);
    $http({
      method: 'POST',
      url: "/api/login",
      data: $.param(credentials),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .success(function(data) {
      console.log('data: ' + data);

      if (!data.success) {
        console.log('errors: ' + data.errors);
      } else {
        console.log('message: ' + data.message);
      }
    });
  };

  $scope.sendButtonText = "Verificar";

  $timeout(function() {
    $scope.sendButtonText = "Entrar";
  }, 2000);
});