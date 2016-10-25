'use strict';


// Declare app level module which depends on views, and components
angular.module('lanceSolidario', [
    'ui.bootstrap',
    'ngRoute',
    'ngToast',
    'utils',
    'entity',
    'timer',
    'lanceSolidario.user',
    'lanceSolidario.product',
    'lanceSolidario.auction',
    'lanceSolidario.address',
    'lanceSolidario.email',
    'lanceSolidario.telephone'
]).config(['ngToastProvider', function(ngToast) {
    ngToast.configure(
        {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            dismissButton: true,
            className: 'info'
        }
    );
}]);
