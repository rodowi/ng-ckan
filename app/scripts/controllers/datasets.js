'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:DatasetsCtrl
 * @description
 * # DatasetsCtrl
 * Controller of the ngCkanApp
 */
angular.module('ngCkanApp')
  .controller('DatasetsCtrl', function ($scope, ckanService) {

    $scope.start = 0;

    $scope.search = function () {
      var query   = $scope.keyword;
      if ( !query ) {
        query = "";
      } else {
        query = "title:(" + query + "*)";
      }

      $scope.searching      = true;
      ckanService.listDatasets( $scope.start, query ).then( function ( result ) {
        $scope.datasets     = result.datasets;
        $scope.resultsCount = result.resultsCount;
        $scope.searching    = false;
      });
    };

    $scope.search();
  });