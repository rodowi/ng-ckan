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
    var query           = "",
        gov             = "",
        search          = $location.search(),
        retrieve        = function () {
          $scope.searching      = true;
            ckanService.listOrganizations( $scope.order ).then( function ( result ) {
              $scope.organizations            = result;
              $scope.organizations_displayed  = result.length;
              $scope.searching                = false;

              // Check if there's already a government level filter in the URL
              if ( search.gob ) {
                gov     = search.gob;
                setGov( search.gob );
              }
            });
        },
        setGov          = function ( gob ) {
          var displayed = $scope.organizations.length;
          for ( var i = 0; i < $scope.organizations.length; i++ ) {
            $scope.organizations[i].hide  = false;
            switch ( gob ) {
              case 'autonomos' :
                if ( $scope.organizations[i].name != 'inegi' ) {
                  displayed--;
                  $scope.organizations[i].hide  = true;
                }
                break;
              case 'federal' :
                if ( /estado-de.*/.test( $scope.organizations[i].name ) || /ayuntamiento-de.*/.test( $scope.organizations[i].name ) ) {
                  displayed--;
                  $scope.organizations[i].hide  = true;
                }
                break;
              case 'estatal' :
                if ( !/estado-de.*/.test( $scope.organizations[i].name ) ) {
                  displayed--;
                  $scope.organizations[i].hide  = true;
                }
                break;
              case 'municipal' :
                if ( !/ayuntamiento-de.*/.test( $scope.organizations[i].name ) ) {
                  displayed--;
                  $scope.organizations[i].hide  = true;
                }
                break;
              default :
                $scope.organizations[i].hide    = false;
            }
          }

          gob         = gob.charAt( 0 ).toUpperCase() + gob.slice( 1 );
          $scope.gov  = gob;
          $scope.organizations_displayed  = displayed;
        };

    $scope.order      = ( search.sort ) ? search.sort : '';

    $scope.sort       = function () {
      if ( $scope.order ) {
        $location.search( "sort", $scope.order );
      } else {
        $location.search( "sort", null );
      }
    };
    $scope.clearGov   = function () {
      $location.search( "gob", null );
      setGov( "" );
    };

    $scope.$on( '$routeUpdate', function ( e, route ) {
      // Check if a government level filter is applied
      if ( route.params.gob && route.params.gob != gov ) {
        gov = route.params.gob;
        setGov( route.params.gob );
      } else {
        retrieve();
      }
    });
    retrieve();
  });