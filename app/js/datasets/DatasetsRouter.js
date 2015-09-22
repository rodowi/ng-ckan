'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'datasets', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                        controller      : 'DatasetsSearchCtrl'
                    }
                }
            })
            .state( 'datasets.results', {
                url             : '/conjuntos?page',
                views           : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    },
                    'datasets-content'  : {
                        templateUrl     : 'partials/datasets/results.html',
                        controller      : 'DatasetsResultsCtrl'
                    }
                },
                reloadOnSearch  : false
            });
    };
});