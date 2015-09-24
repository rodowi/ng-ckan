'use strict';

define( function () {
    return function ( $scope, events, Organizations ) {
        Organizations.query();

        $scope.$on( events.ORGANIZATIONS_QUERY, function () {
            $scope.count    = Organizations.getTotal();
        });
    };
});