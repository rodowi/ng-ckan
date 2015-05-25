'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data  = require( '../mock/organizations.json' );

describe( 'organizations', function() {
  var organizationList;

  beforeEach( function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.countDatasets      = function ( query ) {
            var deferred  = $q.defer();
            deferred.resolve({ count : 10 });
            return deferred.promise;
          };

          this.listOrganizations  = function ( start, query ) {
            var deferred  = $q.defer();
            deferred.resolve( data.result );
            return deferred.promise;
          }
        }]);
    }, data );

    browser.get( '/#/instituciones' );
    organizationList  = element.all( by.repeater( 'organization in organizations' ) );
  });

  it( 'should render organizations when user navigates to /instituciones', function() {
    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ instituciones publicando datos abiertos/ );
  });

  it( 'should list organizations', function() {
    expect( organizationList.count() ).toEqual( 29 );
  });

  it( 'should display logos', function() {
    expect( element.all( by.css( '.organization-item img' ) ).first().getAttribute( 'alt' ) ).toMatch( 'Logo de' );
  });
});