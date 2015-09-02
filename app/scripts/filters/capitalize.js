'use strict';

/**
 * @ngdoc capitalize
 * @name ngCkanApp.filter:formats
 * @function
 * @description
 * # capitalize
 * Filter in the ngCkanApp.
 */
angular.module('ngCkanApp')
  .filter('capitalize', function () {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  });