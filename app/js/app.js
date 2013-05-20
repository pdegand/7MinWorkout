'use strict';


// Declare app level module which depends on filters, and services
angular.module('smwApp', ['ngResource', 'smwApp.filters', 'smwApp.services', 'smwApp.directives', 'smwApp.controllers']).
        config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
        $routeProvider.when('/smw', {templateUrl: 'partials/main_view.html', controller: 'MainCtrl'});
        $routeProvider.when('/timeline', {templateUrl: 'partials/timeline.html'});
        $routeProvider.otherwise({redirectTo: '/smw'});
    }]);
