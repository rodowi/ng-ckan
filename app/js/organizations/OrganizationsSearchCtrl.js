'use strict';

define( function () {
    return function ( $scope, $location, Ckan ) {
        Ckan.setModel( 'organizations' );
        var retrieve    = function () {
                Ckan.organizations();
            };

        $scope.$on( Ckan.getEvent( 'QUERY' ), function () {
            $scope.count    = Ckan.getTotal();
        });

        retrieve();
    };
});