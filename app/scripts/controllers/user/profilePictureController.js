'use strict';
angular.module('lanceSolidario')
    .controller('ProfilePicture', ['facebookAPI', function (facebookAPI) {

        var self = this;

        self.profilePicture = facebookAPI.profilePicture;
        self.user = facebookAPI.user;
    }]);
