'use strict';

define( function () {
    return function ( $rootScope, $resource, events ) {
        function BaseService( model ) {
            this._model     = '';
            this._pageSize  = 20;
            this._total     = 0;
            this._resource  = null;

            return this._init( model );
        }

        BaseService.prototype   = {
            _init       : function ( model ) {
                var that        = this;
                this._model     = model;
                this._resource  = $resource( 'http://adela.datos.gob.mx/api/v1/' + model + '/:id', null, {
                    query   : {
                        method              : 'GET',
                        isArray             : true,
                        transformResponse   : function ( data ) {
                            var response    = angular.fromJson( data );

                            that._total     = response.pagination.count;
                            that._page      = response.pagination.page;
                            that._pageSize  = response.pagination.per_page;

                            return response.results;
                        }
                    }
                });

                return this;
            },

            getEvent    : function ( event ) {
                switch ( event ) {
                    case 'ERROR' :
                        return events[ this._model.toUpperCase() + '_ERROR' ];
                    case 'QUERYING' :
                        return events[ this._model.toUpperCase() + '_QUERYING' ];
                    case 'QUERY' :
                        return events[ this._model.toUpperCase() + '_QUERY' ];
                }
            },

            getPageSize : function () {
                return this._pageSize;
            },

            getTotal    : function () {
                return this._total;
            },

            query       : function ( q ) {
                var that    = this;

                $rootScope.$broadcast( events[ that._model.toUpperCase() + '_QUERYING' ] );
                return this._resource.query( q,
                    function ( data ) {
                    while ( !data.$resolved ) {
                        // Resolving
                    }

                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_QUERY' ], data );
                    },
                    /* istanbul ignore next */
                    function ( err ) {
                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_ERROR' ], err );
                    });
            }
        };

        return BaseService;
    };
});