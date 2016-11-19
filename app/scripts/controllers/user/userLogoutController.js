'use strict';
angular.module('lanceSolidario')
    .controller('UserLogoutController', ['facebookAPI', '$location', function (facebookAPI, $location) {
        $location.path('/home');
        facebookAPI.logout();
    }]);
