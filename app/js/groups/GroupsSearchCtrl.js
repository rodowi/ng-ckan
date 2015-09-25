'use strict';

define( function () {
    return function ( $scope, Ckan ) {
        Ckan.setModel( 'groups' );
        var retrieve    = function () {
                Ckan.groups();
            };

        $scope.$on( Ckan.getEvent( 'QUERY' ), function () {
            $scope.count    = Ckan.getTotal();
        });

        retrieve();
    };
});