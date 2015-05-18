'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data  = require( '../mock/groups.json' );

describe( 'groups', function() {
  var groupList;

  beforeEach(function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.listGroups = function ( start, query ) {
            var deferred  = $q.defer();
            deferred.resolve( data.result );
            return deferred.promise;
          }
        }]);
    }, data );

    browser.get( '/#/grupos' );
    groupList = element.all( by.repeater( 'group in groups' ) );
  });

  it( 'should render groups when user navigates to /groups', function() {
    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ grupos publicando datos abiertos/ );
  });

  it('should list groups', function() {
    expect( groupList.count() ).toEqual( 3 );
  });

  it( 'should display logos', function() {
    expect( element.all( by.css( '.organization-item img' ) ).first().getAttribute( 'alt' ) ).toMatch( 'Logo de' );
  });
});