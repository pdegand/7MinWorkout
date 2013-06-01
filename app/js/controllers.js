'use strict';

/* Controllers */

function showSocialHeader() {
    if ($('#headerSocialWrapper').is(':hidden')) {
        $('#headerSocialWrapper').fadeIn();
        FB.XFBML.parse();
    }
}

angular.module('smwApp.controllers', []).
        controller('MainCtrl', function($scope, $location, Steps, l10n) {
    showSocialHeader();

    $scope.locale = l10n;
    $scope.$watch('locale', function() {
        var locale = $scope.locale.getLocale();
        if (locale === 'fr-fr')
            $scope.exercises = Steps.fr.query();
        else
            $scope.exercises = Steps.en.query();

        $(document).trigger("smwReady", {"locale": l10n.getLocale()});
    });

    $(document).on('redirect', function() {
        $location.path('/congratulation').replace();
        $scope.$apply();
    });

}).controller('ExercisesCtrl', function($scope, Steps, l10n) {
    showSocialHeader();
    $scope.locale = l10n;
    $scope.$watch('locale', function() {
        var locale = $scope.locale.getLocale();
        if (locale === 'fr-fr')
            $scope.exercises = Steps.fr.query();
        else
            $scope.exercises = Steps.en.query();
    });
}).controller('FlagsCtrl', function($scope, $location, Translator) {
    $scope.$location = $location;
    $scope.$on('$routeChangeSuccess', function() {
        Translator.apply();
    });
}).controller('CongratCtrl', function($scope, l10n) {
    $scope.locale = l10n;
}).controller('WhatIsThisCtrl', function($scope, l10n) {
    showSocialHeader();
    $scope.locale = l10n;
}).controller('PopupCtrl', function($scope, $location) {
    var preferedLocale = localStorage['preferedLocale'];
    if (preferedLocale) {
    } else {
        //setting default local
        localStorage['preferedLocale'] = 'en';
        $location.search({l: 'en'});
        $('#welcomeModal').modal({
            backdrop: 'static'
        });
    }
});
