'use strict';

define( function ( require ) {
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsSearchCtrl  = require( 'datasets/DatasetsSearchCtrl' );
    var DatasetsService     = require( 'datasets/DatasetsService' );
    var ResultsCtrl         = require( 'common/ResultsCtrl' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config( [ '$stateProvider', DatasetsRouter ] );

    DatasetsModule.controller( 'DatasetsResultsCtrl', [ '$scope', '$stateParams', 'DatasetsService', ResultsCtrl ] );

    DatasetsModule.controller( 'DatasetsSearchCtrl', [ '$scope', '$location', 'DatasetsService', DatasetsSearchCtrl ] );

    DatasetsModule.factory( 'DatasetsService', [ '$rootScope', '$resource', 'events', DatasetsService ] );
});