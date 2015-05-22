'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:DatasetsCtrl
 * @description
 * # DatasetsCtrl
 * Controller of the ngCkanApp
 */
angular.module( 'ngCkanApp' )
  .controller( 'DatasetsCtrl', function ( $scope, $location, ckanService ) {
    var query     = "",
        retrieve  = function () {
          $scope.searching      = true;
          ckanService.listDatasets( $scope.start, query ).then( function ( result ) {
            $scope.datasets     = result.datasets;
            $scope.resultsCount = result.resultsCount;
            $scope.searching    = false;
          });
        };

    $scope.start  = 0;
    $scope.search = function () {
      // Set the query in the URL search query
      if ( $scope.keyword ) {
        $location.search( "search", encodeURIComponent( $scope.keyword ) );
      } else {
        $location.search( "search", null );
      }
    };

    $scope.$on( '$routeUpdate', function ( e, route ) {
      query       = "";
      // Check if a government level filter is applied
      if ( route.params.gob ) {
        var gob = route.params.gob;

        query   += "+vocab_gov_types:(" + gob.charAt( 0 ).toUpperCase() + gob.slice( 1 ) + ")";
      }
      // Check if a search query is used
      if ( route.params.search ) {
        var search      = decodeURIComponent( route.params.search );
        $scope.keyword  = search;

        var exp = search.split( " " ).join( "* OR " );
        search  = search.split( " " ).join( " OR " );
        query   += "title:(" + search + " OR " + exp + "*)";
      }

      if ( !$scope.searching ) {
        retrieve();
      }
    });
    retrieve();
  });