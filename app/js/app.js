'use strict';

define( function ( require ) {

    var DatasetsModule  = require( 'datasets/DatasetsModule' );

    var app             = angular.module( 'ngCkan', [
            'ngResource',
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