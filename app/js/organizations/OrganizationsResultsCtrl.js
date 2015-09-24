'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Organizations ) {
        var paginating      = false;
        $scope.searching    = true;
        $scope.paginate     = function () {
            paginating  = true;
            $scope.$emit( 'PAGE_UPDATED', $scope.page );
        };
        $scope.$on( events.ORGANIZATIONS_QUERYING, function () {
            $scope.searching    = true;
        });
        $scope.$on( events.ORGANIZATIONS_QUERY, function ( e, data ) {
            e.preventDefault();

            $scope.organizations    = data;
            $scope.limit            = Organizations.getPageSize();
            $scope.total            = Organizations.getTotal();
            $scope.searching        = false;
            if ( $stateParams.page && !paginating ) {
                $scope.page         = $stateParams.page;
            }
        });
    };
});