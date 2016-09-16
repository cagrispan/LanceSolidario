'use strict';
angular.module('lanceSolidario')
    .controller('UserUpdate', ['User', 'facebookAPI', '$location', function (User, facebookAPI, $location) {

        var self = this;

        function init() {
            if (!facebookAPI.user) {
                //facebookAPI.getUserInfo();
                $location.path('/login');
            }
            var userToUpdate = facebookAPI.user;
            self.user = userToUpdate;
            return self.user._load();
        }

        init().then(function(){


        });

        self.saveUser= function (userToUpdate) {
            userToUpdate._update().then(function(resolve){
                console.log('Success', resolve);
            }, function(resolve){
                console.log('Fail',resolve);
            });

        };



    }]);