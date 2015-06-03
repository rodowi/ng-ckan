'use strict';

/**
 * @ngdoc function
 * @name ngCkanApp.controller:OrganizationsCtrl
 * @description
 * # OrganizationsCtrl
 * Controller of the ngCkanApp
 */
angular.module('ngCkanApp')
  .controller('OrganizationsCtrl', function ($scope, ckanService) {

    ckanService.listOrganizations()
      .then(function(result) {
        $scope.organizations = result;
      });

  });