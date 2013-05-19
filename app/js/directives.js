'use strict';

/* Directives */


angular.module('smwApp.directives', []).
        directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).
        directive('smwChrono', function factory() {
    var directiveDefinitionObject = {
        restrict: 'A',
        link: function(scope, elem, attr) {
            console.log(scope, elem, attr);
            var currentValue;

            scope.startChrono = function() {
                console.log(currentValue);
                scope.progressChrono(1000);
            };

            scope.stopChrono = function() {
                alert("finish");
            };

            scope.progressChrono = function(speed) {
                setTimeout(function() {
                    if (currentValue) {
                        currentValue--;
                        elem.html(currentValue);
                        scope.progressChrono(speed);
                    } else {
                        scope.stopChrono();
                    }
                }, speed);
            };

            scope.$watch(attr.smwChrono, function(value) {
                console.log("Chrono value set to %s", value);
                if (value) {
                    currentValue = value;
                    scope.startChrono();
                }
            });
        }
    };
    return directiveDefinitionObject;
});
