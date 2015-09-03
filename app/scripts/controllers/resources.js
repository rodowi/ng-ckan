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
    var id          = $routeParams.datasetId.replace(/_/g, '-'),
        retrying    = false,
        retrieve    = function ( id ) {
            ckanService.showDataset( id )
              .then(function(result) {
                $scope.dataset = result;
              }, function ( error ) {
                if ( !retrying ) {
                  retrying    = true;
                  id            = id.replace(/--/g, '-');
                  retrieve( id );
                }
              });
        };

    retrieve( id );
  });

