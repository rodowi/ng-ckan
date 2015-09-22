'use strict';

describe( 'App', function () {
    var hasClass    = function ( element, cls ) {
            return element.getAttribute( 'class' ).then( function ( classes ) {
                return classes.split( ' ' ).indexOf( cls ) !== -1;
            });
        };

    it ( 'should have correctly boostraped AngularJS', function () {
        browser.get( '/' );

        expect( element.all( by.css( 'html.ng-scope' ) ).count() ).toBe( 1 );
    });

    it ( 'should navigate to the second page of the results', function () {
        browser.get( '/#/conjuntos' );

        element.all( by.css( '.pagination-sm li' ) ).get( 3 ).element( by.tagName( 'a' ) ).click();
    });

    it ( 'should mantain the page after a refresh and navigate back to the first page', function () {
        browser.refresh();

        element.all( by.css( '.pagination-sm li' ) ).get( 2 ).element( by.tagName( 'a' ) ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
        });
    });

    it ( 'should filter the search results', function () {
        element( by.model( 'keyword' ) ).sendKeys( 'Lluvia severa' );
        browser.actions().sendKeys( protractor.Key.ENTER ).perform();
    });

    it ( 'should clear the search by sending an empty string', function () {
        element( by.model( 'keyword' ) ).clear();
        browser.actions().sendKeys( protractor.Key.ENTER ).perform();

        expect( browser.getLocationAbsUrl() ).toMatch( '/conjuntos' );
    });

    it ( 'should preserve the search keyword when refreshing the browser', function () {
        browser.get( '/#/conjuntos?q=presupuesto' );

        element( by.model( 'keyword' ) ).getAttribute( 'value' ).then( function ( value ) {
            expect( value ).toBe( 'presupuesto' );
        });
    });

    it ( 'should clear the search query previously set', function () {
        element( by.css( '[ng-click="clearSearch()"]' ) ).click();
    });
});