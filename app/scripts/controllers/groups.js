'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the ngCkanApp
 */
angular.module( 'ngCkanApp' )
  .controller( 'GroupsCtrl', function ( $scope, $location, ckanService ) {
    var search    = $location.search(),
        retrieve  = function () {
          $scope.searching      = true;
          ckanService.listGroups( $scope.order ).then( function ( result ) {
            $scope.groups     = result;
            $scope.searching  = false;
          });
        };

    $scope.order    = ( search.sort ) ? search.sort : '';

    $scope.sort     = function () {
      if ( $scope.order ) {
        $location.search( "sort", $scope.order );
      } else {
        $location.search( "sort", null );
      }
    };
    retrieve();
  });