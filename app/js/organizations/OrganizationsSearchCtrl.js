'use strict';

define( function () {
    return function ( $scope, $location, Organizations ) {
        var page        = 1,
            retrieve    = function () {
                Organizations.query( page );
            };

        if ( search.page ) {
            page        = search.page;
        }

        $scope.$on( Organizations.getEvent( 'QUERY' ), function () {
            $scope.count    = Organizations.getTotal();
        });
        $scope.$on( 'PAGE_UPDATED', function ( e, new_page ) {
            e.preventDefault();

            if ( new_page > 1 ) {
                $location.search( 'page', new_page );
            } else {
                $location.search( 'page', null );
            }

            page    = new_page;
            retrieve();
        });

        retrieve();
    };
});