'use strict';
angular.module('lanceSolidario')
    .controller('LoginCtrl', ['facebookAPI',
        function ( facebookAPI) {
            var self = this;

            self.login = function(){
                facebookAPI.watchLoginChange();
            };


        }]);
