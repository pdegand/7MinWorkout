'use strict';

/* Controllers */

angular.module('smwApp.controllers', []).
        controller('MainCtrl', function($scope, Steps) {
    
    $(document).trigger("smwReady");
});
  