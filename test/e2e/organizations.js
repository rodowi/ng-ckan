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

    organizationList  = element.all( by.repeater( 'organization in organizations' ) );
  });

  it( 'should render organizations when user navigates to /instituciones', function() {
    browser.get( '/#/instituciones' );
    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ instituciones publicando datos abiertos/ );
  });

  it( 'should filter the organizations loaded on the list', function() {
    element( by.model( 'search' ) ).sendKeys( 'san luis' );

    expect( organizationList.count() ).toEqual( 1 );
    element( by.model( 'search' ) ).clear();
  });

  it( 'should list organizations', function() {
    expect( organizationList.count() ).toEqual( 29 );
  });

  it( 'should display logos', function() {
    expect( element.all( by.css( '.organization-item img' ) ).first().getAttribute( 'alt' ) ).toMatch( 'Logo de' );
  });

  it( 'should set the sorting parameter for the organizations', function() {
    element( by.css( '.form-select select' ) ).click();
    element( by.css( '.form-select select option[value="name+desc"]' ) ).click();

    // Hack to make the select work on Firefox, for some reason the click does not select the element
    browser.actions().sendKeys( protractor.Key.ENTER ).perform();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones?sort=name%2Bdesc' );
  });

  it( 'should clear the sorting parameter from the URL', function() {
    browser.get( '/#/instituciones?sort=name%2Bdesc' );

    element( by.css( '.form-select select' ) ).click();
    element( by.css( '.form-select select option[value=""]' ) ).click();

    // Hack to make the select work on Firefox, for some reason the click does not select the element
    browser.actions().sendKeys( protractor.Key.ENTER ).perform();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones' );
  });
});