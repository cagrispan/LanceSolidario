'use strict';
angular.module('lanceSolidario')
    .controller('HomeCtrl', ['facebookAPI', '$location', function (facebookAPI, $location) {
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
