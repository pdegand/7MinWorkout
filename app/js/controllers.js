'use strict';

/* Controllers */

angular.module('smwApp.controllers', []).
        controller('MainCtrl', function($scope, $location, Steps, l10n) {
    $("#headerSocialWrapper").fadeIn();
    $(document).trigger("smwReady");
    $scope.locale = l10n;
    $scope.$watch('locale', function() {
        var locale = $scope.locale.getLocale();
        if (locale === 'fr-fr')
            $scope.exercises = Steps.fr.query();
        else
            $scope.exercises = Steps.en.query();
    });
    $(document).on('redirect', function() {
        $location.path('/congratulation').replace();
        $scope.$apply();
    });

}).controller('ExercisesCtrl', function($scope, Steps, l10n) {
    $("#headerSocialWrapper").fadeIn();
    $scope.locale = l10n;
    $scope.$watch('locale', function() {
        var locale = $scope.locale.getLocale();
        if (locale === 'fr-fr')
            $scope.exercises = Steps.fr.query();
        else
            $scope.exercises = Steps.en.query();
    });
}).controller('FlagsCtrl', function($scope, $location, Translator) {
    $("#headerSocialWrapper").fadeIn();
    $scope.$location = $location;
    $scope.$on('$routeChangeSuccess', function() {
        Translator.apply();
    });
}).controller('CongratCtrl', function($scope) {

}).controller('WhatIsThisCtrl', function($scope, l10n) {
    $("#headerSocialWrapper").fadeIn();
    $scope.locale = l10n;
});
