'use strict';


// Declare app level module which depends on filters, and services
angular.module('smwApp', ['ngResource', 'smwApp.filters', 'smwApp.services', 'smwApp.directives', 'smwApp.controllers']).
        config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MainCtrl'});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);

angular.module("ngLocale", [], ["$provide", function($provide) {
        var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
        $provide.value("$locale", {"DATETIME_FORMATS": {"MONTH": ["janvier", "fÃ©vrier", "mars", "avril", "mai", "juin", "juillet", "aoÃ»t", "septembre", "octobre", "novembre", "dÃ©cembre"], 
                "SHORTMONTH": ["janv.", "fÃ©vr.", "mars", "avr.", "mai", "juin", "juil.", "aoÃ»t", "sept.", "oct.", "nov.", "dÃ©c."], 
                "DAY": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], 
                "SHORTDAY": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], 
                "AMPMS": ["AM", "PM"], "medium": "d MMM y HH:mm:ss", "short": "dd/MM/yy HH:mm", 
                "fullDate": "EEEE d MMMM y", "longDate": "d MMMM y", "mediumDate": "d MMM y", "shortDate": "dd/MM/yy", 
                "mediumTime": "HH:mm:ss", "shortTime": "HH:mm"}, "NUMBER_FORMATS": {"DECIMAL_SEP": ",", "GROUP_SEP": "Â ", 
                "PATTERNS": [{"minInt": 1, "minFrac": 0, "macFrac": 0, "posPre": "", "posSuf": "", "negPre": "-", "negSuf": "", 
                        "gSize": 3, "lgSize": 3, "maxFrac": 3}, {"minInt": 1, "minFrac": 2, "macFrac": 0, "posPre": "", "posSuf": "Â \u00A4", 
                        "negPre": "-", "negSuf": "Â \u00A4", "gSize": 3, "lgSize": 3, "maxFrac": 2}], 
                "CURRENCY_SYM": "â‚¬"}, "pluralCat": function(n) {
                if (n >= 0 && n < 2) {
                    return PLURAL_CATEGORY.ONE;
                }
                return PLURAL_CATEGORY.OTHER;
            }, "id": "fr"});
    }]);

