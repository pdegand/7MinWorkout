'use strict';


// Declare app level module which depends on filters, and services
angular.module('smwApp', ['ngResource','smwApp.filters', 'smwApp.services', 'smwApp.directives', 'smwApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MainCtrl'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
