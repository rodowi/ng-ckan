'use strict';

define( function () {
    return function ( BaseService ) {
        var OrganizationsService    = new BaseService( 'organizations' );

        return OrganizationsService;
    };
});