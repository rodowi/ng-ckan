'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var data  = require( '../mock/dataset.json' );

describe( 'resources', function() {
  var resourceList;

  beforeEach( function() {
    browser.addMockModule( 'ngCkanApp', function () {
      var data  = arguments[0];

      angular.module( 'ngCkanApp' )
        .service( 'ckanService', [ '$q', function ( $q ) {
          this.showDataset  = function ( id ) {
            var deferred  = $q.defer();
            deferred.resolve( data.result );
            return deferred.promise;
          }
        }]);
    }, data );

    browser.get( '/#/conjuntos/encuesta-nacional-de-satisfaccion-a-usuarios-del-servicio-de-guarderia-del-imss' );
  });

  it( 'should render a header with dataset information when user navigates to /resources', function() {
    expect( element.all( by.css( 'strong' ) ).first().getText() ).
      toMatch( /Nivel de Gobierno/ );
  });

  it('should list resources', function() {
    expect( element.all( by.css( '.resource-item' ) ).count() ).toBe( 4 );
    expect( element.all( by.css( '.resource-main h4' ) ).first().getText() ).toBe( "Guarderías 2010" );
  });
});