'use strict';

define( function () {
    var events  = angular.module( 'App.Events', []);
    events.constant( 'events', {
        DATASETS_ERROR          : 'datasets_error',
        DATASETS_QUERY          : 'datasets_query',
        DATASETS_QUERYING       : 'datasets_querying',
        GROUPS_ERROR            : 'groups_error',
        GROUPS_QUERY            : 'groups_query',
        GROUPS_QUERYING         : 'groups_querying',
        ORGANIZATIONS_ERROR     : 'organizations_error',
        ORGANIZATIONS_QUERY     : 'organizations_query',
        ORGANIZATIONS_QUERYING  : 'organizations_querying'
    });
});