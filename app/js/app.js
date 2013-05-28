'use strict';


// Declare app level module which depends on filters, and services
angular.module('smwApp', ['ngResource', 'smwApp.filters', 'smwApp.services', 'smwApp.directives', 'smwApp.controllers', 'l10n', 'l10n-tools', 'smw-l10n']).
        config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/smwApp.html',
            controller: 'MainCtrl'
        });
        $routeProvider.when('/infos', {
            templateUrl: 'partials/infos.html'
        });
        $routeProvider.when('/smw', {
            templateUrl: 'partials/smwApp.html',
            controller: 'MainCtrl'
        });
        $routeProvider.when('/exercises', {
            templateUrl: 'partials/exercises.html',
            controller: 'ExercisesCtrl'
        });
        $routeProvider.when('/congratulation', {
            templateUrl: 'partials/congratulation.html',
            controller: 'CongratCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/home'});
    }]).
        config(['$locationProvider', function($location) {
        $location.hashPrefix('!');
    }]);
