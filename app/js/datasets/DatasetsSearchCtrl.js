'use strict';

define( function () {
    return function ( $scope, Datasets ) {
        Datasets.query();

        $scope.$on( 'DATASETS_RETRIEVED', function () {
            $scope.count    = Datasets.getTotal();
        });
    };
});