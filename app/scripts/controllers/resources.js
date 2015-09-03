'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:ResourcesCtrl
 * @description
 * # ResourcesCtrl
 * Controller of the ngCkanApp
 */
angular.module('ngCkanApp')
  .controller('ResourcesCtrl', function ($scope, $routeParams, ckanService) {

    var id  = $routeParams.datasetId.replace(/_/g, '-');
    ckanService.showDataset(id)
      .then(function(result) {
        $scope.dataset = result;
      });

  });

