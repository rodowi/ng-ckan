'use strict';

define( function () {
    return function ( $scope, $location, Organizations ) {
        var page        = 1,
            search      = $location.search(),
            retrieve    = function () {
                Organizations.query( page );
            };

        if ( search.page ) {
            page        = search.page;
        }

        $scope.$on( Organizations.getEvent( 'QUERY' ), function () {
            $scope.count    = Organizations.getTotal();
        });
        $scope.$on( 'PAGE_UPDATED', function ( e, newPage ) {
            e.preventDefault();

            if ( newPage > 1 ) {
                $location.search( 'page', newPage );
            } else {
                $location.search( 'page', null );
            }

            page    = newPage;
            retrieve();
        });

        retrieve();
    };
});