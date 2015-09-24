'use strict';

define( function () {
    return function ( $rootScope, $resource, events ) {
        var Service = {
            _total      : 0,

            _resource   : $resource( 'http://catalogo.datos.gob.mx/api/3/action/:action', null, {
                query   : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        Service._total  = response.result.count;

                        return response.result.results;
                    }
                }
            }),

            getEvent    : function ( event ) {
                switch ( event ) {
                    case 'ERROR' :
                        return events.DATASETS_ERROR;
                        break;
                    case 'QUERYING' :
                        return events.DATASETS_QUERYING;
                        break;
                    case 'QUERY' :
                        return events.DATASETS_QUERY;
                        break;
                }
            },

            getPageSize : function () {
                return 10;
            },

            getTotal    : function () {
                return this._total;
            },

            query       : function ( q, skip ) {
                $rootScope.$broadcast( events.DATASETS_QUERYING );
                return this._resource.query({
                        action  : 'package_search',
                        q       : q,
                        rows    : 10,
                        start   : skip
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            // Resolving
                        }

                        $rootScope.$broadcast( events.DATASETS_QUERY, data );
                    });
            }
        };

        return Service;
    };
});