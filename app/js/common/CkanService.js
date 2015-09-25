'use strict';

define( function () {
    return function ( $rootScope, $resource, events ) {
        var Service = {
            _total      : 0,

            _querying   : '',

            _resource   : $resource( 'http://catalogo.datos.gob.mx/api/3/action/:action', null, {
                datasets                : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        Service._total  = response.result.count;

                        return response.result.results;
                    }
                },
                groups                  : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data ) {
                        var response    = angular.fromJson( data );

                        Service._total  = response.result.length;

                        return response.result;
                    }
                }
            }),

            getEvent    : function ( event ) {
                switch ( event ) {
                    /* istanbul ignore next */
                    case 'DATASETS_ERROR' :
                        return events.DATASETS_ERROR;
                    case 'QUERY' :
                        switch ( this._querying ) {
                            case 'datasets' :
                                return events.DATASETS_QUERY;
                            case 'groups' :
                                return events.GROUPS_QUERY;
                        }
                    case 'QUERYING' :
                        switch ( this._querying ) {
                            case 'datasets' :
                                return events.DATASETS_QUERYING;
                            case 'groups' :
                                return events.GROUPS_QUERYING;
                        }
                }
            },

            getPageSize : function () {
                return 10;
            },

            getTotal    : function () {
                return this._total;
            },

            datasets    : function ( q, skip ) {
                $rootScope.$broadcast( events.DATASETS_QUERYING );
                this._querying  = 'datasets';
                return this._resource.datasets({
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
            },

            groups      : function () {
                $rootScope.$broadcast( events.GROUPS_QUERYING );
                this._querying  = 'groups';
                return this._resource.groups({
                        action      : 'group_list',
                        all_fields  : 'true'
                    },
                    function ( data ) {
                        while( !data.$resolved ) {
                            // Resolving
                        }

                        $rootScope.$broadcast( events.GROUPS_QUERY, data );
                    });
            }
        };

        return Service;
    };
});