'use strict';

describe('Controller: OrganizationCtrl', function () {

  // load the controller's module
  beforeEach(module('ngCkanApp'));

  var OrganizationCtrl,
      rootScope,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    rootScope         = $rootScope;
    scope             = $rootScope.$new();
    OrganizationCtrl  = $controller('OrganizationCtrl', {
      $scope        : scope,
      $routeParams  : {
        organizationId  : 1
      },
      ckanService   : {
        showOrganization  : function ( organizationId ) {
          var data      = getJSONFixture( 'organization.json' );
          var deferred  = $q.defer();
          deferred.resolve( data );
          return deferred.promise;
        }
      }
    });
  }));

  it('should attach a list of organization\'s datasets to the scope', function () {
    rootScope.$apply();
    expect(scope.organization.packages.length).toBe(1);
  });
});