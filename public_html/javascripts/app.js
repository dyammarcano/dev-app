var primus = Primus.connect('ws://' + location.hostname + ':3000', {
  transformer: 'webwebs',
  reconnect: {
    max: Infinity,
    min: 1000,
    retries: 10
  }
});

var web = primus.channel('web');

/*web.on('open', function() {
  web.send('verify');
  
  web.on('verify', function(data) {
    console.log(data);
  });
});*/

web.on('error', function error(error) {
  alert('Something horrible has happened', error.stack);
});

web.on('reconnect', function reconnect(opts) {
  console.log('Reconnection');
});

web.on('end', function end() {
  console.log('Connection closed');
});

angular.module('starterApp', []).controller('mainController', function mainController($scope, $timeout) {
  $scope.sendButtonText = "Entrar";

  /*$scope.submit = function() {
    console.log($scope.user);
    web.write('authenticate', $scope.user);
    $scope.sendButtonText = "Verificar";

    $timeout(function() {
      $scope.sendButtonText = "Enter";
    }, 2000);
  };*/

  $scope.credentials = {username: 'dyam@adm.com', password: 'dyam@adm.com', remember: true};

  $scope.login = function (credentials) {
    console.log(credentials);
    /*AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });*/
    web.send('authenticate', credentials);
    $scope.sendButtonText = "Verificar";

    $timeout(function() {
      $scope.sendButtonText = "Entrar";
    }, 2000);
  };
});