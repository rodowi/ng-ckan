'use strict';

define( function () {
    return function ( $scope, Datasets ) {
        $scope.datasets     = Datasets.query();
    };
});