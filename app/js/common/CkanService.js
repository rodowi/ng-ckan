'use strict';

define( function () {
    return function ( $rootScope, $resource, events ) {
        var Service = {
            _querying   : '',

            _total      : 0,

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
                switch ( this._querying ) {
                    case 'datasets' :
                        return this._datasets;
                    case 'groups' :
                        return this._groups;
                }
            },

            datasets    : function ( q, skip ) {
                $rootScope.$broadcast( events.DATASETS_QUERYING );
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
            },

            setModel    : function ( model ) {
                this._querying  = model;
            }
        };

        return Service;
    };
});