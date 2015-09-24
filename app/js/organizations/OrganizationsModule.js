'use strict';

define( function ( require ) {
    var OrganizationsResultsCtrl    = require( 'organizations/OrganizationsResultsCtrl' );
    var OrganizationsRouter         = require( 'organizations/OrganizationsRouter' );
    var OrganizationsSearchCtrl     = require( 'organizations/OrganizationsSearchCtrl' );
    var OrganizationsService        = require( 'organizations/OrganizationsService' );

    var OrganizationsModule     = angular.module( 'OrganizationsModule', []);

    OrganizationsModule.config( [ '$stateProvider', OrganizationsRouter ] );

    OrganizationsModule.controller( 'OrganizationsResultsCtrl', [ '$scope', '$stateParams', 'events', 'OrganizationsService', OrganizationsResultsCtrl ] );

    OrganizationsModule.controller( 'OrganizationsSearchCtrl', [ '$scope', 'events', 'OrganizationsService', OrganizationsSearchCtrl ] );

    OrganizationsModule.factory( 'OrganizationsService', [ 'BaseService', OrganizationsService ] );
});