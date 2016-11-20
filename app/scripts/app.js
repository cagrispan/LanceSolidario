'use strict';


// Declare app level module which depends on views, and components
angular.module('lanceSolidario', [
    'ui.bootstrap',
    'angular.viacep',
    'mwl.confirm',
    'ngRoute',
    'ui.mask',
    'ngToast',
    'utils',
    'entity',
    'timer',
    'naif.base64',
    'ngFacebook',
    'textAngular',
    'lanceSolidario.user',
    'lanceSolidario.product',
    'lanceSolidario.auction',
    'lanceSolidario.address',
    'lanceSolidario.email',
    'lanceSolidario.image',
    'lanceSolidario.telephone',
    'lanceSolidario.purchase'
]).config(['ngToastProvider', function(ngToast) {
    ngToast.configure(
        {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            dismissButton: true,
            className: 'info',
            timeout: 2000
        }
    );
}]);
