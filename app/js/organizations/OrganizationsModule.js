'use strict';

define( function ( require ) {
    var ResultsCtrl                 = require( 'common/ResultsCtrl' );
    var OrganizationsRouter         = require( 'organizations/OrganizationsRouter' );
    var OrganizationsSearchCtrl     = require( 'organizations/OrganizationsSearchCtrl' );
    var OrganizationsService        = require( 'organizations/OrganizationsService' );

    var OrganizationsModule     = angular.module( 'OrganizationsModule', []);

    OrganizationsModule.config( [ '$stateProvider', OrganizationsRouter ] );

    OrganizationsModule.controller( 'OrganizationsResultsCtrl', [ '$scope', '$state', '$stateParams', 'OrganizationsService', ResultsCtrl ] );

    OrganizationsModule.controller( 'OrganizationsSearchCtrl', [ '$scope', '$location', 'OrganizationsService', OrganizationsSearchCtrl ] );

    OrganizationsModule.factory( 'OrganizationsService', [ 'BaseService', OrganizationsService ] );
});