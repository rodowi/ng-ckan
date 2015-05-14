'use strict';

describe('Controller: GroupsCtrl', function () {

  // load the controller's module
  beforeEach(module('ngCkanApp'));

  var GroupsCtrl,
      rootScope,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    rootScope   = $rootScope;
    scope       = $rootScope.$new();
    GroupsCtrl  = $controller('GroupsCtrl', {
      $scope      : scope,
      ckanService : {
        listGroups  : function () {
          var data      = getJSONFixture( 'groups.json' );
          var deferred  = $q.defer();
          deferred.resolve( data.result );
          return deferred.promise;
        }
      }
    });
  }));

  it('should attach a list of groups to the scope', function () {
    rootScope.$apply();
    expect(scope.groups.length).toBe(3);
  });
});