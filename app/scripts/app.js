'use strict';


// Declare app level module which depends on views, and components
angular.module('lanceSolidario', [
    'ui.bootstrap',
    'ngRoute',
    'ngToast',
    'utils',
    'entity',
    'lanceSolidario.user',
    'lanceSolidario.product',
    'lanceSolidario.auction',
    'lanceSolidario.address',
    'lanceSolidario.email',
    'lanceSolidario.telephone'
]).config(['ngToastProvider', function(ngToast) {
    ngToast.configure(
        {
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            dismissButton: true,
            className: 'info'
        }
    )
}])
