'use strict';

define( function ( require ) {
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsSearchCtrl  = require( 'datasets/DatasetsSearchCtrl' );
    var ResultsCtrl         = require( 'common/ResultsCtrl' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config( [ '$stateProvider', DatasetsRouter ] );

    DatasetsModule.controller( 'DatasetsResultsCtrl', [ '$scope', '$stateParams', 'CkanService', ResultsCtrl ] );

    DatasetsModule.controller( 'DatasetsSearchCtrl', [ '$scope', '$location', 'CkanService', DatasetsSearchCtrl ] );
});