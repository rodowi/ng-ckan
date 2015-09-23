'use strict';

define( function ( require ) {
    var OrganizationsRouter     = require( 'organizations/OrganizationsRouter' );

    var OrganizationsModule     = angular.module( 'OrganizationsModule', []);

    OrganizationsModule.config( [ '$stateProvider', OrganizationsRouter ] );
});