'use strict';

define( function () {
    return function ( $scope, $location, Ckan ) {
        var query       = '',
            search      = $location.search(),
            skip        = 0,
            setQuery    = function () {
                if ( $scope.keyword ) {
                    var q       = $scope.keyword,
                        exp     = q.split( ' '  ).join( '* OR ' );
                    q           = q.split( ' ' ).join( ' OR ' );
                    query       += 'title:(' + q + ' OR ' + exp + '*)';
                } else {
                    query       = '';
                }
            },
            retrieve    = function () {
                setQuery();
                Ckan.datasets( query, skip );
            };

        if ( search.q ) {
            $scope.keyword  = decodeURIComponent( search.q );
        }
        if ( search.page ) {
            skip        = ( search.page - 1 ) * 10;
        }

        $scope.clearSearch  = function () {
            $scope.keyword  = '';
            $location.search( 'q', null );
            retrieve();
        };
        $scope.search       = function () {
            if ( $scope.keyword ) {
                $location.search( 'q', encodeURIComponent( $scope.keyword ) );
            } else {
                $location.search( 'q', null );
            }

            retrieve();
        };
        $scope.$on( Ckan.getEvent( 'QUERY' ), function () {
            $scope.count    = Ckan.getTotal();
        });
        $scope.$on( 'PAGE_UPDATED', function ( e, page ) {
            e.preventDefault();

            if ( page > 1 ) {
                $location.search( 'page', page );
            } else {
                $location.search( 'page', null );
            }

            skip        = ( page - 1 ) * 10;
            retrieve();
        });

        retrieve();
    };
});