'use strict';

/* Services */

angular.module('smwApp.services', []).
        factory('Steps', function($resource) {
    return {
        fr: $resource('data/exercises_fr.json'),
        en: $resource('data/exercises.json')
    };
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
            } else if( params.l && params.l === "en") { 
                if (currentLocale !== 'en-us') {
                    l10n.setLocale('en-us');
                    localeValue = 'en';
                }
            } else {
                console.log(">>>>> NO LOCALE IN URL");
                var preferedLocale = localStorage['preferedLocale'];
                if(preferedLocale && preferedLocale === 'fr') {
                    l10n.setLocale('fr-fr');
                    localeValue = 'fr';
                } else {
                    l10n.setLocale('en-us');
                    localeValue = 'en';
                }
            }
            if (localeValue) {
                $('.thumbnail').each(function(index, element){
                   $(element).removeClass('active'); 
                });
                if(localeValue === 'fr') {
                    $('#fr-flag').addClass('active');
                } else if (localeValue === 'en') {
                    $('#en-flag').addClass('active');
                }
                $location.search({l:localeValue});
                localStorage['preferedLocale'] = localeValue;
                $('a[data-smw-translate]').each(function(index, element) {
                    var current = $(element).attr('href');
                    var pos = current.indexOf('?');
                    if(pos !== -1) current = current.substr(0,pos);
                    $(element).attr('href', current + '?l=' + localeValue);
                });
            }
        }
    };
});
