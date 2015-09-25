'use strict';

define( function ( require ) {
    var GroupsRouter        = require( 'groups/GroupsRouter' );

    var GroupsModule        = angular.module( 'GroupsModule', []);

    GroupsModule.config( [ '$stateProvider', GroupsRouter ] );
});