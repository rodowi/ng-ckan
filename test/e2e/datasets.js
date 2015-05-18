'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data  = require( '../mock/datasets.json' );

describe( 'datasets', function() {
  var datasetList;

  beforeEach( function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.listDatasets = function ( start, query ) {
            var deferred  = $q.defer();
            deferred.resolve({ datasets: data.result.results, resultsCount : data.result.count });
            return deferred.promise;
          }
        }]);
    }, data );

    browser.get( '/#/conjuntos' );
    datasetList = element.all( by.repeater( 'dataset in datasets' ) );
  });


  it( 'should render datasets when user navigates to /datasets', function() {
    expect( element.all(by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ conjuntos de datos/ );
  });

  it( 'should list datasets', function() {
    expect( datasetList.count() ).toEqual( 10 );

    var dateInLongFormat  = /\| \w+ \d+, \d+/;
    expect( datasetList.get( 1 ).getText() ).toMatch( dateInLongFormat );
  });

  it( 'root should redirect to datasets', function() {
    browser.get( '/' );
    expect( browser.getCurrentUrl() ).toEqual( browser.baseUrl + '#/conjuntos' );
  });

  it( 'should link to dataset\'s detailed information', function() {
    // Click on a dataset link
    element.all( by.css( '.dataset-item' ) ).first().click();
    // Find a download link
    var content = element( by.css( '[ng-view]' ) ).getText();
    expect( content ).toMatch( /Datos y recursos/ );
  });
});