'use strict';

/* Services */

angular.module('smwApp.services', []).
  value('version', '0.1').
  factory('Steps',function($resource) {
      return $resource('data/steps.json');
  });
