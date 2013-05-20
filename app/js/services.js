'use strict';

/* Services */

angular.module('smwApp.services', []).
  value('version', '0.1').
  factory('Steps',function($resource, $locale) {
      console.log($locale.id + " " + navigator.language);
      return $resource('data/exercises.json');
  });
