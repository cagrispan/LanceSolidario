'use strict';
angular.module('lanceSolidario')
    .controller('UserUpdate', ['$scope', 'User', 'facebookAPI', '$location', function ($scope, User, facebookAPI, $location) {

        var self = this;

        function init() {
            if (!facebookAPI.user) {
                //facebookAPI.getUserInfo();
                $location.path('/login');
            }
        }

        init();
        var userToUpdate = facebookAPI.user;


        self.user = userToUpdate;

        self.update = function (userToUpdate) {
            userToUpdate._update().then(function(resolve){

                console.log('Success', resolve);
            }, function(resolve){
                console.log('Fail',resolve);
            });

        };
    }]);
