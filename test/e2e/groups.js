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

    groupList = element.all( by.repeater( 'group in groups' ) );
  });

  it( 'should render groups when user navigates to /groups', function() {
    browser.get( '/#/grupos' );

    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ grupos publicando datos abiertos/ );
  });

  it( 'should filter the groups loaded on the list', function() {
    element( by.model( 'search' ) ).sendKeys( 'segundo' );

    expect( groupList.count() ).toEqual( 1 );
    element( by.model( 'search' ) ).clear();
  });

  it( 'should list groups', function() {
    expect( groupList.count() ).toEqual( 3 );
  });

  it( 'should display logos', function() {
    expect( element.all( by.css( '.organization-item img' ) ).first().getAttribute( 'alt' ) ).toMatch( 'Logo de' );
  });

  it( 'should set the sorting parameter for the groups', function() {
    element( by.css( '.form-select select' ) ).click();
    element( by.css( '.form-select select option[value="name+desc"]' ) ).click();

    // Hack to make the select work on Firefox, for some reason the click does not select the element
    browser.actions().sendKeys( protractor.Key.ENTER ).perform();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/grupos?sort=name%2Bdesc' );
  });

  it( 'should clear the sorting parameter from the URL', function() {
    browser.get( '/#/grupos?sort=name%2Bdesc' );

    element( by.css( '.form-select select' ) ).click();
    element( by.css( '.form-select select option[value=""]' ) ).click();

    // Hack to make the select work on Firefox, for some reason the click does not select the element
    browser.actions().sendKeys( protractor.Key.ENTER ).perform();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/grupos' );
  });
});