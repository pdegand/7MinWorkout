'use strict';


// Declare app level module which depends on filters, and services
angular.module('smwApp', ['ngResource', 'smwApp.filters', 'smwApp.services', 'smwApp.directives', 'smwApp.controllers']).
        config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
        $routeProvider.when('/smw', {templateUrl: 'partials/smwApp.html', controller: 'MainCtrl'});
        $routeProvider.when('/exercises', {templateUrl: 'partials/exercises.html', controller: 'ExercisesCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
