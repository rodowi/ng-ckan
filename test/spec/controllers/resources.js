'use strict';

describe('Controller: ResourcesCtrl', function () {

  // load the controller's module
  beforeEach( module( 'ngCkanApp' ) );

  var ResourcesCtrl,
      rootScope,
      scope;

  // Initialize the controller and a mock scope
  beforeEach( inject( function ( $controller, $rootScope, $q ) {
    rootScope     = $rootScope;
    scope         = $rootScope.$new();
    ResourcesCtrl = $controller('ResourcesCtrl', {
      $scope        : scope,
      $routeParams  : {
        datasetId   : 1
      },
      ckanService   : {
        showDataset : function ( datasetId ) {
          var data      = getJSONFixture( 'dataset.json' );
          var deferred  = $q.defer();
          deferred.resolve( data.result );
          return deferred.promise;
        }
      }
    });
  }) );

  it( 'should attach a list of resources to the scope', function () {
    rootScope.$apply();
    expect( scope.dataset.resources.length ).toBe( 4 );
  });
});