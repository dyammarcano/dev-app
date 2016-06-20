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

web.on('open', function open() {
  status.textContent = 'connected';
});

web.on('close', function close() {
  status.textContent = 'disconnected';
});
  
var app = angular.module('homeApp', ['ui.materialize']);

app.controller('mainController', function mainController($scope, $timeout) {
  $scope.select = {
    value: "Option1",
    choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
  };

  var currentTime = new Date();
  $scope.currentTime = currentTime;
  $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  $scope.disable = [false, 1, 7];
  $scope.today = 'Today';
  $scope.clear = 'Clear';
  $scope.close = 'Close';
  var days = 15;
  $scope.minDate = (new Date($scope.currentTime.getTime() - (1000 * 60 * 60 * 24 * days))).toISOString();
  $scope.maxDate = (new Date($scope.currentTime.getTime() + (1000 * 60 * 60 * 24 * days))).toISOString();
  $scope.onStart = function() {
    console.log('onStart');
  };
  $scope.onRender = function() {
    console.log('onRender');
  };
  $scope.onOpen = function() {
    console.log('onOpen');
  };
  $scope.onClose = function() {
    console.log('onClose');
  };
  $scope.onSet = function() {
    console.log('onSet');
  };
  $scope.onStop = function() {
    console.log('onStop');
  };

  $scope.collapsibleElements = [{
    icon: 'mdi-image-filter-drama',
    title: 'First',
    content: 'Lorem ipsum dolor sit amet.'
  }, {
    icon: 'mdi-maps-place',
    title: 'Second',
    content: 'Lorem ipsum dolor sit amet.'
  }, {
    icon: 'mdi-social-whatshot',
    title: 'Third',
    content: 'Lorem ipsum dolor sit amet.'
  }];
});