'use strict';

define( function () {
    return function ( $scope, $state, $stateParams, Model ) {
        var paginating              = false;
        $scope.searching            = true;
        $scope.paginate             = function () {
            paginating  = true;
            $scope.$emit( 'PAGE_UPDATED', $scope.page );
        };
        $scope.selectDataset        = function ( dataset ) {
            $state.go( 'datasets.details', {
                id  : dataset
            });
        };
        $scope.selectOrganization   = function ( organization ) {
            $state.go( 'organizations.details', {
                id  : organization
            });
        };

        $scope.$on( Model.getEvent( 'QUERYING' ), function () {
            $scope.searching    = true;
        });
        $scope.$on( Model.getEvent( 'QUERY' ), function ( e, data ) {
            e.preventDefault();

            $scope.searching    = false;
            $scope.results      = data;
            $scope.limit        = Model.getPageSize();
            $scope.total        = Model.getTotal();
            if ( $stateParams.page && !paginating ) {
                $scope.page     = $stateParams.page;
            }
        });
    };
});