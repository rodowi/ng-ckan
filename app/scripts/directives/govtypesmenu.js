'use strict';

/**
 * @ngdoc directive
 * @name ngCkanApp.directive:govTypesMenu
 * @description
 * # govTypesMenu
 */
angular.module('ngCkanApp')
  .directive('govTypesMenu', function ( $location, ckanService ) {
    return {
      templateUrl   : 'views/gov-types-menu.html',
      restrict      : 'E',
      scope         : {
        organizations : '@organizations'
      },
      link          : function ( scope, element, attrs ) {
        var query             = "",
            gov               = "",
            search            = $location.search(),
            path              = $location.path(),
            currentPage       = ( search.page ) ? search.page : 1,
            currentSort       = ( search.sort ) ? search.sort : "",
            loadDatasets      = function () {
              var loadFederal     = true,
                  loadState       = true,
                  loadMunicipal   = true,
                  loadAutonomous  = true;

              switch ( gov ) {
                case "autonomos" :
                  scope.gov_state       = 0;
                  scope.gov_municipal   = 0;
                  scope.gov_federal     = 0;
                  loadFederal           = false;
                  loadState             = false;
                  loadMunicipal         = false;
                  break;
                case "federal" :
                  scope.gov_state       = 0;
                  scope.gov_municipal   = 0;
                  scope.gov_autonomous  = 0;
                  loadAutonomous        = false;
                  loadState             = false;
                  loadMunicipal         = false;
                  break;
                case "estatal" :
                  scope.gov_federal     = 0;
                  scope.gov_municipal   = 0;
                  scope.gov_autonomous  = 0;
                  loadAutonomous        = false;
                  loadFederal           = false;
                  loadMunicipal         = false;
                  break;
                case "municipal" :
                  scope.gov_federal     = 0;
                  scope.gov_state       = 0;
                  scope.gov_autonomous  = 0;
                  loadAutonomous        = false;
                  loadFederal           = false;
                  loadState             = false;
                  break;
              }

              if ( loadAutonomous ) {
                ckanService.countDatasets( query + '+organization:(inegi OR ift)' ).then( function ( result ) {
                  scope.gov_autonomous  = result.count;
                });
              }
              if ( loadFederal ) {
                ckanService.countDatasets( query + '+vocab_gov_types:Federal' ).then( function ( result ) {
                  scope.gov_federal     = result.count;
                });
              }
              if ( loadState ) {
                ckanService.countDatasets( query + '+vocab_gov_types:Estatal' ).then( function ( result ) {
                  scope.gov_state       = result.count;
                });
              }
              if ( loadMunicipal ) {
                ckanService.countDatasets( query + '+vocab_gov_types:Municipal' ).then( function ( result ) {
                  scope.gov_municipal   = result.count;
                });
              }
            },
            loadOrganizations = function () {
              scope.$watch( 'organizations', function ( data ) {
                scope.numbers     = true;
                var autonomous    = 0,
                    federal       = 0,
                    state         = 0,
                    municipal     = 0,
                    organizations = ( data ) ? angular.fromJson( data ) : [];

                for ( var i = 0; i < organizations.length; i++ ) {
                  if ( organizations[i].name == "inegi" || organizations[i].name == "ift" ) {
                    autonomous++;
                  } else {
                    if ( /estado-de.*/.test( organizations[i].name ) ) {
                      state++;
                    } else if ( /ayuntamiento-de.*/.test( organizations[i].name ) ) {
                      municipal++;
                    } else {
                      federal++;
                    }
                  }
                }

                scope.gov_autonomous  = false;
                scope.gov_federal     = false;
                scope.gov_state       = false;
                scope.gov_municipal   = false;
                switch ( gov ) {
                  case "autonomos" :
                    scope.gov_autonomous  = autonomous;
                    break;
                  case "federal" :
                    scope.gov_federal     = federal;
                    break;
                  case "estatal" :
                    scope.gov_state       = state;
                    break;
                  case "municipal" :
                    scope.gov_municipal   = municipal;
                    break;
                  default :
                    scope.gov_autonomous  = autonomous;
                    scope.gov_federal     = federal;
                    scope.gov_state       = state;
                    scope.gov_municipal   = municipal;
                }
              });
            },
            load              = function () {
              if ( path == '/instituciones' ) {
                loadOrganizations();
              } else {
                loadDatasets();
              }
            };

        // Check if there's already a government level filter in the URL
        if ( search.gob ) {
          gov   = search.gob;
        }

        scope.numbers = false;
        scope.$on( '$routeUpdate', function ( e, route ) {
          search    = $location.search();
          query     = "";

          var page  = ( search.page ) ? search.page : 1,
              sort  = ( search.sort ) ? search.sort : "";

          if ( currentPage != page ) {
            currentPage = page;
            return;
          }

          if ( currentSort != sort ) {
            currentSort = sort;
            return;
          }

          // Check if a search query is used
          if ( route.params.search ) {
            var search      = decodeURIComponent( route.params.search );

            var exp = search.split( " " ).join( "* OR " );
            search  = search.split( " " ).join( " OR " );
            query   = "title:(" + search + " OR " + exp + "*)";
          }

          // Check if there's a government level filter set
          if ( route.params.gob ) {
            gov     = route.params.gob;
          } else {
            gov     = "";
          }

          load();
        });

        scope.filter  = function ( e, type ) {
          e.preventDefault();

          $location.search( 'gob', type );
        };
        load();
      }
    };
  });