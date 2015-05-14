'use strict';

describe('Controller: DatasetsCtrl', function () {

  var DatasetsCtrl,
      rootScope,
      scope;

  // load the controller's module
  beforeEach(module('ngCkanApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    // Set the path for the tests fixtures
    jasmine.getJSONFixtures().fixturesPath  = 'base/test/mock';

    rootScope     = $rootScope;
    scope         = $rootScope.$new();
    DatasetsCtrl  = $controller('DatasetsCtrl', {
      $scope        : scope,
      ckanService   : {
        listDatasets  : function ( start, query ) {
          var data      = getJSONFixture( 'datasets.json' );
          var deferred  = $q.defer();
          deferred.resolve({ datasets : data.result.results, resultsCount : data.result.count });
          return deferred.promise;
        }
      }
    });
  }));

  it('should attach a list of datasets to the scope', function () {
    rootScope.$apply();
    expect(scope.datasets.length).toBe(10);
  });
});