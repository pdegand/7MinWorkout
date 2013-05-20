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
            var currentValue;

            var startChrono = function() {
                elem.html(currentValue);
                console.log("Chrono started. Duration: %ss", currentValue);
                progressChrono(1000);
            };

            var stopChrono = function() {
                if (attr.smwChronoCallback && typeof scope[attr.smwChronoCallback] === 'function') {
                    console.log("Callback found. Applied...");
                    scope[attr.smwChronoCallback]();
                    scope.$apply();
                } else {
                    console.warn("No callback found for this chrono");
                }
            };

            var progressChrono = function(speed) {
                setTimeout(function() {
                    if (currentValue) {
                        currentValue--;
                        elem.html(currentValue);
                        progressChrono(speed);
                    } else {
                        stopChrono();
                    }
                }, speed);
            };

            scope.$watch(attr.smwChrono, function(value) {
                if (value) {
                    currentValue = value;
                    startChrono();
                }
            });
        }
    };
    return directiveDefinitionObject;
}).
        directive('bsNavbar', function($location) {

    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs, controller) {
// Watch for the $location
            scope.$watch(function() {
                return $location.path();
            }, function(newValue, oldValue) {

                $('li[data-match-route]', element).each(function(k, li) {
                    var $li = angular.element(li),
                            // data('match-rout') does not work with dynamic attributes
                            pattern = $li.attr('data-match-route'),
                            regexp = new RegExp('^' + pattern + '$', ['i']);
                    if (regexp.test(newValue)) {
                        $li.addClass('active');
                    } else {
                        $li.removeClass('active');
                    }

                });
            });
        }
    };
});
