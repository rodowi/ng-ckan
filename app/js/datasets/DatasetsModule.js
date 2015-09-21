'use strict';

define( function ( require ) {
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsSearchCtrl  = require( 'datasets/DatasetsSearchCtrl' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config( [ '$stateProvider', DatasetsRouter ] );
});