'use strict';

describe('Controller: GroupCtrl', function () {

  // load the controller's module
  beforeEach(module('ngCkanApp'));

  var GroupCtrl,
      rootScope,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    // Set the path for the tests fixtures
    jasmine.getJSONFixtures().fixturesPath  = 'base/test/mock';

    rootScope = $rootScope;
    scope     = $rootScope.$new();
    GroupCtrl = $controller('GroupCtrl', {
      $scope        : scope,
      $routeParams  : {
        groupId     : 1
      },
      ckanService   : {
        showGroup   : function ( groupId ) {
          var data      = getJSONFixture( 'group.json' );
          var deferred  = $q.defer();
          deferred.resolve( data );
          return deferred.promise;
        }
      }
    });
  }));

  it('should attach a list of group\'s datasets to the scope', function () {
    rootScope.$apply();
    expect(scope.group.packages.length).toBe(1);
  });
});