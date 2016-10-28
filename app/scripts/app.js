'use strict';


// Declare app level module which depends on views, and components
angular.module('lanceSolidario', [
    'ui.bootstrap',
    'mwl.confirm',
    'ngRoute',
    'ui.mask',
    'ngToast',
    'utils',
    'entity',
    'timer',
    'naif.base64',
    'lanceSolidario.user',
    'lanceSolidario.product',
    'lanceSolidario.auction',
    'lanceSolidario.address',
    'lanceSolidario.email',
    'lanceSolidario.image',
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
