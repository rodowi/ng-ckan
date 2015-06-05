'use strict';

/**
 * @ngdoc service
 * @name ngCkanApp.ckanService
 * @description
 * # ckanService
 * Service in the ngCkanApp.
 */
angular.module('ngCkanApp')
  .service('ckanService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = 'http://catalogo.datos.gob.mx/api/3/action/';

    this.countDatasets      = function ( query ) {
      if ( !query ) {
        query = "";
      }

      return $http.get( baseUrl + 'package_search?q=' + query + '&rows=0' ).then( function ( result ) {
        return result.data.result;
      });
    };

    this.listDatasets       = function( start, query, sort ) {
      if ( !query ) {
        query = "";
      }

      if ( sort ) {
        sort  = "&sort=" + sort + "";
      } else {
        sort  = "";
      }

      return $http.get( baseUrl + 'package_search?q=' + query + '&rows=10&start=' + start + sort ).then( function ( response ) {
        var resultsCount  = response.data.result.count,
            datasets      = response.data.result.results;

        return {
          'datasets': datasets,
          'resultsCount': resultsCount 
        };
      });
    };

    this.showDataset        = function( datasetId ) {
      return $http.get( baseUrl + 'package_show?id=' + datasetId ).then( function ( response ) {
        return response.data.result;
      });
    };

    this.listOrganizations  = function( sort ) {
      if ( sort ) {
        sort  = "&sort=" + sort + "";
      } else {
        sort  = "";
      }

      return $http.get( baseUrl + 'organization_list?all_fields=true' + sort ).then( function ( response ) {
        return response.data.result;
      });
    };

    this.showOrganization   = function( organizationId ) {
      return $http.get( baseUrl + 'organization_show?id=' + organizationId ).then( function ( response ) {
        return response.data.result;
      });
    };

    this.listGroups         = function( sort ) {
      if ( sort ) {
        sort  = "&sort=" + sort + "";
      } else {
        sort  = "";
      }

      return $http.get( baseUrl + 'group_list?all_fields=true' + sort ).then( function ( response ) {
        return response.data.result;
      });
    };

    this.showGroup          = function ( groupId ) {
      return $http.get( baseUrl + 'group_show?id=' + groupId ).then( function ( response ) {
        return response.data.result;
      });
    };

  });