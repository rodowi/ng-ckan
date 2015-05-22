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
      link          : function ( scope, element, attrs ) {
        var query   = "",
            gov     = "",
            search  = $location.search(),
            load    = function () {
              var loadFederal   = true,
                  loadState     = true,
                  loadMunicipal = true;

              switch ( gov ) {
                case "federal" :
                  scope.gov_state     = 0;
                  scope.gov_municipal = 0;
                  loadState           = false;
                  loadMunicipal       = false;
                  break;
                case "estatal" :
                  scope.gov_federal   = 0;
                  scope.gov_municipal = 0;
                  loadFederal         = false;
                  loadMunicipal       = false;
                  break;
                case "municipal" :
                  scope.gov_federal   = 0;
                  scope.gov_state     = 0;
                  loadFederal         = false;
                  loadState           = false;
                  break;
              }

              if ( loadFederal ) {
                ckanService.countDatasets( query + '+vocab_gov_types:Federal' ).then( function ( result ) {
                  scope.gov_federal   = result.count;
                });
              }
              if ( loadState ) {
                ckanService.countDatasets( query + '+vocab_gov_types:Estatal' ).then( function ( result ) {
                  scope.gov_state     = result.count;
                });
              }
              if ( loadMunicipal ) {
                ckanService.countDatasets( query + '+vocab_gov_types:Municipal' ).then( function ( result ) {
                  scope.gov_municipal = result.count;
                });
              }
            };

        // Check if there's already a government level filter in the URL
        if ( search.gob ) {
          gov   = search.gob;
        }

        scope.$on( '$routeUpdate', function ( e, route ) {
          query     = "";

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