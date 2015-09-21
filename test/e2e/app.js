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
});