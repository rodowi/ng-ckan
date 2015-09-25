'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'groups', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                    }
                }
            })
            .state( 'groups.results', {
                url             : '/grupos?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    }
                },
                reloadOnSearch  : false
            });
    };
});