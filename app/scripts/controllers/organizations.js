'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:OrganizationsCtrl
 * @description
 * # OrganizationsCtrl
 * Controller of the ngCkanApp
 */
angular.module( 'ngCkanApp' )
  .controller( 'OrganizationsCtrl', function ( $scope, $location, ckanService ) {
    var search    = $location.search(),
        retrieve  = function () {
        $scope.searching      = true;
          ckanService.listOrganizations( $scope.order ).then( function ( result ) {
            $scope.organizations  = result;
            $scope.searching      = false;
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