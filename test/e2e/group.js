'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data  = require( '../mock/group.json' );

describe( 'group', function() {
  var datasetList;

  beforeEach( function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.showGroup  = function ( id ) {
            var deferred  = $q.defer();
            deferred.resolve( data );
            return deferred.promise;
          }
        }]);
    }, data );

    browser.get( '/#/grupos/rmx' );
    datasetList = element.all( by.repeater( 'dataset in group.packages' ) );
  });

  it( 'should render a group when user navigates to /#/grupos/rmx', function() {
    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toBe( 'ReconstrucciónMX' );
  });

  it( 'should list its datasets', function() {
    expect( datasetList.count() ).toEqual( 1 );
    expect( datasetList.first().getText() ).toMatch( 'FONDEN' );
  });

  it( 'should link to dataset\'s detailed information', function() {
    // Click on a dataset link
    element( by.binding( 'dataset.title' ) ).click();
    // Find a download link
    var content = element( by.css( '[ng-view]' ) ).getText();
    expect( content ).toMatch( /Datos y recursos/ );
  });
});