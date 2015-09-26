'use strict';

define( function ( require ) {
    var ResultsCtrl                 = require( 'common/ResultsCtrl' );
    var OrganizationsRouter         = require( 'organizations/OrganizationsRouter' );
    var OrganizationsSearchCtrl     = require( 'organizations/OrganizationsSearchCtrl' );

    var OrganizationsModule     = angular.module( 'OrganizationsModule', []);

    OrganizationsModule.config( [ '$stateProvider', OrganizationsRouter ] );

    OrganizationsModule.controller( 'OrganizationsResultsCtrl', [ '$scope', '$state', '$stateParams', 'CkanService', ResultsCtrl ] );

    OrganizationsModule.controller( 'OrganizationsSearchCtrl', [ '$scope', '$location', 'CkanService', OrganizationsSearchCtrl ] );
});