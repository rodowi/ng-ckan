'use strict';

describe('Controller: OrganizationsCtrl', function () {

  // load the controller's module
  beforeEach( module( 'ngCkanApp' ) );

  var OrganizationsCtrl,
      rootScope,
      scope;

  // Initialize the controller and a mock scope
  beforeEach( inject( function ( $controller, $rootScope, $q ) {
    rootScope         = $rootScope;
    scope             = $rootScope.$new();
    OrganizationsCtrl = $controller('OrganizationsCtrl', {
      $scope      : scope,
      ckanService : {
        listOrganizations : function () {
          var data      = getJSONFixture( 'organizations.json' );
          var deferred  = $q.defer();
          deferred.resolve( data.result );
          return deferred.promise;
        }
      }
    });
  }) );

  it('should attach a list of organizations to the scope', function () {
    rootScope.$apply();
    expect( scope.organizations.length ).toBe( 29 );
  });
});