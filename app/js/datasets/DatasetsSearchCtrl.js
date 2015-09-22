'use strict';

define( function () {
    return function ( $scope, $location, Datasets ) {
        var query       = "",
            search      = $location.search(),
            setQuery    = function () {
                if ( $scope.keyword ) {
                    var search  = $scope.keyword,
                        exp     = search.split( " " ).join( "* OR " );
                    search      = search.split( " " ).join( " OR " );
                    query       += "title:(" + search + " OR " + exp + "*)";
                } else {
                    query       = "";
                }
            },
            retrieve    = function () {
                setQuery();
                Datasets.query( query );
            };

        if ( search.q ) {
            $scope.keyword  = decodeURIComponent( search.q );
        }

        $scope.search   = function () {
            if ( $scope.keyword ) {
                $location.search( "q", encodeURIComponent( $scope.keyword ) );
            } else {
                $location.search( "q", null );
            }

            retrieve();
        };
        $scope.$on( 'DATASETS_RETRIEVED', function () {
            $scope.count    = Datasets.getTotal();
        });

        retrieve();
    };
});