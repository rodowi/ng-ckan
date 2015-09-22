'use strict';

define( function ( require ) {
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsSearchCtrl  = require( 'datasets/DatasetsSearchCtrl' );
    var DatasetsService     = require( 'datasets/DatasetsService' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config( [ '$stateProvider', DatasetsRouter ] );

    DatasetsModule.controller( 'DatasetsSearchCtrl', [ '$rootScope', '$scope', 'DatasetsService', DatasetsSearchCtrl ] );

    DatasetsModule.factory( 'DatasetsService', [ '$rootScope', '$resource', DatasetsService ] );
});