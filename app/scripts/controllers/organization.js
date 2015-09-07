'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:OrganizationCtrl
 * @description
 * # OrganizationCtrl
 * Controller of the ngCkanApp
 */
angular.module('ngCkanApp')
  .controller('OrganizationCtrl', function ($scope, $routeParams, ckanService) {
    $scope.searching    = true;

    ckanService.showOrganization($routeParams.organizationId)
      .then(function(result) {
        $scope.organization = result;
        $scope.searching    = false;
      });

  });

