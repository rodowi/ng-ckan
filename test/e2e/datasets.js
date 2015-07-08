'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data      = require( '../mock/datasets.json' );

describe( 'datasets', function() {
  var datasetList;

  beforeEach( function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.countDatasets  = function ( query ) {
            var deferred  = $q.defer();
            deferred.resolve({ count : 10 });
            return deferred.promise;
          };

          this.listDatasets   = function ( start, query ) {
            var deferred  = $q.defer();
            deferred.resolve({ datasets: data.result.results, resultsCount : data.result.count });
            return deferred.promise;
          };
        }]);
    }, data );

    datasetList = element.all( by.repeater( 'dataset in datasets' ) );
  });

  it( 'should render datasets when user navigates to /datasets', function() {
    browser.get( '/#/conjuntos' );

    expect( element.all( by.css( '.ng-binding' ) ).first().getText() ).
      toMatch( /\d+ conjuntos de datos/ );
  });

  it( 'should list the government level filtering', function() {
    expect( element( by.css( '[ng-show="gov_federal"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Federal *\d*/ );
    expect( element( by.css( '[ng-show="gov_state"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Estatal *\d*/ );
    expect( element( by.css( '[ng-show="gov_municipal"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Municipal *\d*/ );
    expect( element( by.css( '[ng-show="gov_autonomous"]' ) ).all( by.tagName( 'a' ) ).first().getText() ).toMatch( /Organismos Autónomos *\d*/ );
  });

  it( 'should apply a government level filter in the URL and remove two of the four filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_federal"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?gob=federal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 7 );
    });
  });

  it( 'should mantain the government filter after a page refresh', function() {
    browser.refresh();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?gob=federal' );
    expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 7 );
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should apply a government level filter in the URL and remove two of the four filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_state"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?gob=estatal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 7 );
    });
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should apply a government level filter in the URL and remove two of the four filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_municipal"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?gob=municipal' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 7 );
    });
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should apply a government level filter in the URL and remove two of the four filter elements in the menu', function() {
    element( by.css( '[ng-show="gov_autonomous"]' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?gob=autonomos' );

      expect( element( by.css( '.page-filters' ) ).all( by.css( '.ng-hide' ) ).count() ).toBe( 7 );
    });
  });

  it( 'should remove the previously applied government level filtering', function() {
    element( by.css( '[ng-click="clearGov()"]' ) ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should update the URL when searching for a given dataset keyword', function() {
    element( by.model( 'keyword' ) ).sendKeys( 'query' );
    element( by.css( '[ng-submit="search()"]' ) ).submit().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?search=query' );
    });
  });

  it( 'should clear the previously set search query', function() {
    element( by.model( 'keyword' ) ).clear();
    element( by.css( '[ng-submit="search()"]' ) ).submit().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should navigate to the fifth page of the results', function() {
    element.all( by.css( '[ng-click="selectPage(page.number)"]' ) ).get( 4 ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?page=5' );
    });
  });

  it( 'should retain the selected page after a browser refresh', function() {
    browser.refresh();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?page=5' );
  });

  it( 'should navigate to the first page of the results', function() {
    element.all( by.css( '[ng-click="selectPage(page.number)"]' ) ).get( 0 ).click().then( function () {
      expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
    });
  });

  it( 'should set the limit and sort parameters from the URL', function() {
    browser.get( '/#/conjuntos?limit=20&sort=title_string%2Basc' );

    expect( element( by.css( '.form-select select' ) ).$( 'option:checked' ).getText() ).toBe( 'Ordenar por Nombre Ascendente' );
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

  it( 'should set the sorting parameter for the datasets', function() {
    browser.get( '/' );

    element( by.css( '.form-select select' ) ).click();
    element( by.css( '.form-select select option[value="title_string+asc"]' ) ).click();

    // Hack to make the select work on Firefox, for some reason the click does not select the element
    browser.actions().sendKeys( protractor.Key.ENTER ).perform();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos?sort=title_string%2Basc' );
  });

  it( 'should clear the sorting parameter from the URL', function() {
    browser.get( '/#/conjuntos?sort=title_string%2Basc' );

    element( by.css( '.form-select select' ) ).click();
    element( by.css( '.form-select select option[value=""]' ) ).click();

    // Hack to make the select work on Firefox, for some reason the click does not select the element
    browser.actions().sendKeys( protractor.Key.ENTER ).perform();

    expect( browser.getCurrentUrl() ).toBe( browser.baseUrl + '#/conjuntos' );
  });
});