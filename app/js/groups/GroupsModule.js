'use strict';

define( function ( require ) {
    var GroupsRouter        = require( 'groups/GroupsRouter' );
    var GroupsSearchCtrl    = require( 'groups/GroupsSearchCtrl' );
    var ResultsCtrl         = require( 'common/ResultsCtrl' );

    var GroupsModule        = angular.module( 'GroupsModule', []);

    GroupsModule.config( [ '$stateProvider', GroupsRouter ] );

    GroupsModule.controller( 'GroupsResultsCtrl', [ '$scope', '$stateParams', 'CkanService', ResultsCtrl ] );

    GroupsModule.controller( 'GroupsSearchCtrl', [ '$scope', '$location', 'CkanService', GroupsSearchCtrl ] );
});