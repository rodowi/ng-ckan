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
    var query       = "",
        search      = $location.search(),
        page        = ( search.page ) ? search.page : 1,
        retrieve    = function () {
          $scope.searching      = true;
          ckanService.listDatasets( ( ( page - 1 ) * $scope.limit ), query, $scope.order ).then( function ( result ) {
            $scope.datasets     = result.datasets;
            $scope.resultsCount = result.resultsCount;
            $scope.totalItems   = result.resultsCount - $scope.limit;
            $scope.page         = page;
            $scope.searching    = false;
          });
        },
        setGov      = function ( filter ) {
          var gob   = filter.charAt( 0 ).toUpperCase() + filter.slice( 1 );

          query       += "+vocab_gov_types:(" + gob + ")";
          $scope.gov  = gob;
        };

    // Check if there's already a government level filter in the URL
    if ( search.gob ) {
      setGov( search.gob );
    }

    $scope.limit    = ( search.limit ) ? search.limit : 10;
    $scope.order    = ( search.sort ) ? search.sort : '';

    $scope.search   = function () {
      // Set the query in the URL search query
      if ( $scope.keyword ) {
        $location.search( "search", encodeURIComponent( $scope.keyword ) );
      } else {
        $location.search( "search", null );
      }
    };
    $scope.sort     = function () {
      if ( $scope.order ) {
        $location.search( "sort", $scope.order );
      } else {
        $location.search( "sort", null );
      }
    };
    $scope.clearGov = function () {
      $location.search( "gob", null );
      $scope.gov    = "";
    };
    $scope.paginate = function () {
      if ( $scope.page > 1 ) {
        $location.search( "page", $scope.page );
      } else {
        $location.search( "page", null );
      }

      page      = $scope.page;
    };

    $scope.$on( '$routeUpdate', function ( e, route ) {
      query       = "";
      // Check if a government level filter is applied
      if ( route.params.gob ) {
        setGov( route.params.gob );
      }
      // Check if a search query is used
      if ( route.params.search ) {
        var search      = decodeURIComponent( route.params.search );
        $scope.keyword  = search;

        var exp = search.split( " " ).join( "* OR " );
        search  = search.split( " " ).join( " OR " );
        query   += "title:(" + search + " OR " + exp + "*)";
      }

      retrieve();
    });
    retrieve();
  });