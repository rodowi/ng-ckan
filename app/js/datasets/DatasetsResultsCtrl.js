'use strict';

define( function () {
    return function ( $scope, $stateParams, Datasets ) {
        var paginating      = false;
        $scope.searching    = true;
        $scope.paginate     = function () {
            paginating  = true;
            $scope.$emit( 'PAGE_UPDATED', $scope.page );
        };
        $scope.$on( 'QUERYING_DATASETS', function () {
            $scope.searching    = true;
        });
        $scope.$on( 'DATASETS_RETRIEVED', function ( e, data ) {
            e.preventDefault();

            $scope.searching    = false;
            $scope.datasets     = data;
            $scope.limit        = 10;
            $scope.total        = Datasets.getTotal();
            if ( $stateParams.page && !paginating ) {
                $scope.page     = $stateParams.page;
            }
        });
    };
});