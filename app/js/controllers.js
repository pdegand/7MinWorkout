'use strict';

/* Controllers */

angular.module('smwApp.controllers', []).
        controller('MainCtrl', function($scope, Steps) {

    $scope.steps = Steps.query(function() {
        console.log("Steps loaded. currentStep set to index 0");
        $scope.currentStepIndex = 0;
        $scope.currentStep = $scope.steps[0];
    });

    $scope.nextStep = function() {
        $scope.currentStep = $scope.steps[++$scope.currentStepIndex];
        //$scope.$digest();
    };

    $scope.nextStep();

}).controller('ExercisesCtrl', function($scope, Steps) {
    $scope.exercises = Steps.query(function() {
        console.log('Exercises loaded');
    });
});
  