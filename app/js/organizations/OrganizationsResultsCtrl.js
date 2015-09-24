'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Organizations ) {
        $scope.$on( events.ORGANIZATIONS_QUERY, function ( e, data ) {
            e.preventDefault();

            $scope.organizations    = data;
        });
    };
});