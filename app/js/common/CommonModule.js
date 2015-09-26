'use strict';

define( function ( require ) {
    var CkanService     = require( 'common/CkanService' );

    var CommonModule    = angular.module( 'CommonModule', []);

    CommonModule.factory( 'CkanService', [ '$rootScope', '$resource', 'events', CkanService ] );
});