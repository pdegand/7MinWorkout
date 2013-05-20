'use strict';

/* Controllers */

angular.module('smwApp.controllers', []).
        controller('MainCtrl', function($scope) {
    $(document).trigger("smwReady");
}).controller('ExercisesCtrl', function($scope, Steps) {
    $scope.exercises = Steps.query(function() {
        console.log('Exercises loaded');
    });


});

