'use strict';
angular.module('lanceSolidario')
    .controller('HomeCtrl', ['facebookAPI', '$location', 'ngToast', function (facebookAPI, $location, ngToast) {
        var self = this;

        function init() {
            if (!facebookAPI.user) {
                $location.path('/home');
            } else {
                var userToSave = facebookAPI.user;
                self.user = userToSave;
                self.accessToken = userToSave.token;
            }
        }

        init();
    }]);
