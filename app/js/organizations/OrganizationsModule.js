'use strict';

define( function ( require ) {
    var OrganizationsRouter     = require( 'organizations/OrganizationsRouter' );
    var OrganizationsService    = require( 'organizations/OrganizationsService' );

    var OrganizationsModule     = angular.module( 'OrganizationsModule', []);

    OrganizationsModule.config( [ '$stateProvider', OrganizationsRouter ] );

    OrganizationsModule.factory( 'OrganizationsService', [ 'BaseService', OrganizationsService ] );
});