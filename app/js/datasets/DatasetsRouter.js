'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'datasets', {
                url     : '/conjuntos',
                views   : {
                    'search-container'  : {
                        templateUrl     : 'partials/datasets/search.html'
                    }
                }
            });
    };
});