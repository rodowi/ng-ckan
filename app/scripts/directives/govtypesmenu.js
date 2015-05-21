'use strict';

/**
 * @ngdoc directive
 * @name ngCkanApp.directive:govTypesMenu
 * @description
 * # govTypesMenu
 */
angular.module('ngCkanApp')
  .directive('govTypesMenu', function ( ckanService ) {
    return {
      templateUrl   : 'views/gov-types-menu.html',
      restrict      : 'E',
      link          : function ( scope, element, attrs ) {
        ckanService.countDatasets( 'vocab_gov_types:Federal' ).then( function ( result ) {
          scope.gov_federal   = result.count;
        });
        ckanService.countDatasets( 'vocab_gov_types:Estatal' ).then( function ( result ) {
          scope.gov_state     = result.count;
        });
        ckanService.countDatasets( 'vocab_gov_types:Municipal' ).then( function ( result ) {
          scope.gov_municipal = result.count;
        });
      }
    };
  });