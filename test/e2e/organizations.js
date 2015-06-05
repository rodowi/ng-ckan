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
          this.listOrganizations  = function ( start, query ) {
            var deferred  = $q.defer();
            deferred.resolve( data.result );
            return deferred.promise;
          }
        }]);
    }, data );
  });

  it( 'should render organizations when user navigates to /instituciones', function() {
    browser.get( '/#/instituciones' );
    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ instituciones publicando datos abiertos/ );

    organizationList  = element.all( by.repeater( 'organization in organizations' ) );
  });

  it( 'should list the government level filtering', function() {
    expect( element( by.css( '[ng-show="gov_federal"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Federal *\d*/ );
    expect( element( by.css( '[ng-show="gov_state"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Estatal *\d*/ );
    expect( element( by.css( '[ng-show="gov_municipal"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Municipal *\d*/ );
  });

  it( 'should apply a government level filter in the URL and remove two of the three filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_federal"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones?gob=federal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 2 );
    });
  });

  it( 'should mantain the government filter after a page refresh', function() {
    browser.refresh();
    organizationList  = element.all( by.repeater( 'organization in organizations' ) );

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones?gob=federal' );
    expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 2 );
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones' );
    });
  });

  it( 'should apply a government level filter in the URL and remove two of the three filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_state"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones?gob=estatal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 2 );
    });
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones' );
    });
  });

  it( 'should apply a government level filter in the URL and remove two of the three filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_municipal"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones?gob=municipal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 2 );
    });
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/instituciones' );
    });
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