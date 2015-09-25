'use strict';

define( function ( require ) {
    var GroupsRouter        = require( 'groups/GroupsRouter' );
    var GroupsSearchCtrl    = require( 'groups/GroupsSearchCtrl' );

    var GroupsModule        = angular.module( 'GroupsModule', []);

    GroupsModule.config( [ '$stateProvider', GroupsRouter ] );

    GroupsModule.controller( 'GroupsSearchCtrl', [ '$scope', '$location', 'CkanService', GroupsSearchCtrl ] );
});