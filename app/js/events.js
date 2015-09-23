'use strict';

define( function () {
    var events  = angular.module( 'App.Events', []);
    events.constant( 'events', {
        ORGANIZATIONS_ERROR     : 'organizations_error',
        ORGANIZATIONS_QUERY     : 'organizations_query'
    });
});