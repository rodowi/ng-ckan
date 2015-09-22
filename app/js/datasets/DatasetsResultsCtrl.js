'use strict';

define( function () {
    return function ( $scope ) {
        $scope.$on( 'DATASETS_RETRIEVED', function ( e, data ) {
            e.preventDefault();

            $scope.datasets     = data;
        });
    };
});