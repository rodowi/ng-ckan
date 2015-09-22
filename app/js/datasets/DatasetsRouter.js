'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'datasets', {
                abstract    : true,
                views       : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html',
                    }
                }
            })
            .state( 'datasets.search', {
                url         : '/conjuntos',
                views       : {
                    'datasets-sidebar'  : {
                        templateUrl     : 'partials/datasets/filters.html'
                    },
                    'datasets-content'  : {
                        templateUrl     : 'partials/datasets/results.html',
                        controller      : 'DatasetsSearchCtrl'
                    }
                }
            });
    };
});