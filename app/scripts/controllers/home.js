'use strict';
angular.module('lanceSolidario')
.controller('HomeCtrl',  ['facebookAPI', '$location', function(facebookAPI, $location) {

    var self = this;

    if(!facebookAPI.user){
        $location.path('/login');
    }else {
        var userToSave = facebookAPI.user;
        userToSave._getToken().then(function(resolve){
            userToSave.token = resolve.token;
            self.user = userToSave;
            self.accessToken = userToSave.token;
        },function(){
            $location.path('/login');
        });
    }

}]);
