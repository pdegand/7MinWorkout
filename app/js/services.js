'use strict';

/* Services */

angular.module('smwApp.services', []).
        factory('Steps', function($resource) {
    return $resource('data/exercises.json');
}).
        factory('Translator', function($location, l10n) {
    return {
        apply: function() {
            var params = $location.search();
            var currentLocale = l10n.getLocale();
            var localeValue;
            if (params.l && params.l === "fr") {
                if (currentLocale !== 'fr-fr') {
                    l10n.setLocale('fr-fr');
                    localeValue = 'fr';
                }
            } else {
                if (currentLocale !== 'en-us') {
                    l10n.setLocale('en-us');
                    localeValue = 'en';
                }
            }
            if (localeValue) {
                console.log("links updated to locale");
                $('a[data-smw-translate]').each(function(index, element) {
                    var current = $(element).attr('href');
                    var pos = current.indexOf('?');
                    if(pos !== -1) current = current.substr(0,pos);
                    console.log(current);
                    $(element).attr('href', current + '?l=' + localeValue);
                });
            }
        }
    };
});
