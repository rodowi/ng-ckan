'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'groups', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                        controller      : 'GroupsSearchCtrl'
                    }
                }
            })
            .state( 'groups.results', {
                url             : '/grupos?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    },
                    'datasets-content'  : {
                        templateUrl     : 'partials/groups/results.html',
                        controller      : 'GroupsResultsCtrl'
                    }
                },
                reloadOnSearch  : false
            });
    };
});