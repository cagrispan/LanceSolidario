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
    'lanceSolidario.purchase',
    'lanceSolidario.institution',
    'angular.google.distance',
    'angular-google-analytics'
]).config(['AnalyticsProvider', 'ngToastProvider', function (AnalyticsProvider, ngToast) {
    ngToast.configure(
        {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            dismissButton: true,
            className: 'info',
            timeout: 3000
        }
    );
    AnalyticsProvider.setAccount('UA-96994270-1');  //UU-XXXXXXX-X should be your tracking code
}]).run(['Analytics', function (Analytics) {
}]);


