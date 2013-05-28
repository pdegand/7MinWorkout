'use strict';

/* Controllers */

angular.module('smwApp.controllers', []).
        controller('MainCtrl', function($scope, $location, Steps) {
    $(document).trigger("smwReady");
    $scope.steps = Steps.query(function() {
        console.log("Steps loaded. currentStep set to index 0");
        $scope.currentStepIndex = 0;
        $scope.currentStep = $scope.steps[0];
    });
    $(document).on('redirect', function() {
        $location.path('/congratulation').replace();
        $scope.$apply();
    });

}).controller('ExercisesCtrl', function($scope, Steps) {
    $scope.exercises = Steps.query(function() {
        console.log('Exercises loaded');
    });
}).controller('FlagsCtrl', function($scope, $location, Translator) {
    $scope.$location = $location;
    $scope.$on('$routeChangeSuccess', function() {
        Translator.apply();
    });
}).controller('CongratCtrl', function($scope) {

}).controller('WhatIsThisCtrl', function($scope, l10n) {
    $scope.locale = l10n;
});
