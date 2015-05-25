'use strict';

/**
 * @ngdoc overview
 * @name ngCkanApp
 * @description
 * # ngCkanApp
 *
 * Main module of the application.
 */
angular
  .module('ngCkanApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/conjuntos'
      })
      .when('/conjuntos', {
        templateUrl: 'views/datasets.html',
        controller: 'DatasetsCtrl',
        reloadOnSearch: false
      })
      .when('/conjuntos/:datasetId', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl'
      })
      .when('/instituciones', {
        templateUrl: 'views/organizations.html',
        controller: 'OrganizationsCtrl'
      })
      .when('/instituciones/:organizationId', {
        templateUrl: 'views/organization.html',
        controller: 'OrganizationCtrl'
      })
      .when('/grupos', {
        templateUrl: 'views/groups.html',
        controller: 'GroupsCtrl'
      })
      .when('/grupos/:groupId', {
        templateUrl: 'views/group.html',
        controller: 'GroupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
