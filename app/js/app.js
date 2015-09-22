'use strict';

define( function ( require ) {

    require( 'datasets/DatasetsModule' );

    var app             = angular.module( 'ngCkan', [
            'ngResource',
            'ui.bootstrap.pagination',
            'ui.bootstrap.tpls',
            'ui.router',
            'DatasetsModule'
        ]);

    app.config([ '$urlRouterProvider', function ( $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/conjuntos' );
    }]);

    app.run([ '$rootScope', '$state', function ( $rootScope, $state ) {
        $rootScope.$state   = $state;
    }]);

    return app;
});