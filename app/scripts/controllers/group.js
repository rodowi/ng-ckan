'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * Controller of the ngCkanApp
 */
angular.module('ngCkanApp')
  .controller('GroupCtrl', function ($scope, $routeParams, ckanService) {
    $scope.searching    = true;

    ckanService.showGroup($routeParams.groupId)
      .then(function(result) {
        $scope.group        = result;
        $scope.searching    = false;
      });

  });
