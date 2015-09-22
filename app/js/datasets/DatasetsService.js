'use strict';

define( function () {
    return function ( $rootScope, $resource ) {
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

            getTotal    : function () {
                return this._total;
            },

            query       : function ( q ) {
                return this._resource.query({
                        action  : 'package_search',
                        q       : q
                    },
                    function ( data ) {
                        while( !data.$resolved );

                        $rootScope.$broadcast( 'DATASETS_RETRIEVED', data );
                    });
            }
        };

        return Service;
    };
});