'use strict';

define( function () {
    return function ( $scope, $state, $stateParams, events, Ckan ) {
        $scope.organization     = Ckan.organization( $stateParams.id );

        $scope.clear            = function () {
            $scope.filter   = '';
        };
        $scope.selectDataset    = function ( dataset ) {
            $state.go( 'datasets.details', {
                id  : dataset
            });
        };
        $scope.$on( events.ORGANIZATIONS_RETRIEVED, function () {
            $( '.organization-image img' ).load( function () {
                $( this ).css({
                    'margin-top'    : ( $( '.organization-image' ).height() - $( this ).height() ) / 2
                });
            });
        });
    };
});