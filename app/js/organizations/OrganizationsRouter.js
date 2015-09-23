'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'organizations', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html'
                    }
                }
            })
            .state( 'organizations.results', {
                url             : '/instituciones?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    }
                },
                reloadOnSearch  : false
            });
    };
});