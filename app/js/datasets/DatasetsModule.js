'use strict';

define( function ( require ) {
    var DatasetsResultsCtrl = require( 'datasets/DatasetsResultsCtrl' );
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsSearchCtrl  = require( 'datasets/DatasetsSearchCtrl' );
    var DatasetsService     = require( 'datasets/DatasetsService' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config( [ '$stateProvider', DatasetsRouter ] );

    DatasetsModule.controller( 'DatasetsResultsCtrl', [ '$scope', '$stateParams', 'DatasetsService', DatasetsResultsCtrl ] );

    DatasetsModule.controller( 'DatasetsSearchCtrl', [ '$scope', '$location', 'DatasetsService', DatasetsSearchCtrl ] );

    DatasetsModule.factory( 'DatasetsService', [ '$rootScope', '$resource', DatasetsService ] );
});