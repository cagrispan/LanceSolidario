'use strict';
angular.module('lanceSolidario')
    .controller('ProfilePicture', ['facebookAPI', function (facebookAPI) {

        var self = this;

        self.profilePicure = facebookAPI.profilePicure;
        self.user = facebookAPI.user;
    }]);
