var app = angular.module('homeApp', ['ui.materialize']);

app.controller('mainController', function mainController($scope, $timeout) {
  $scope.select = {
    value: "Option1",
    choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
  };
});