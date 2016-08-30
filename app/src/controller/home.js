'use strict';
angular.module('lanceSolidario')
.controller('HomeCtrl',  ['facebookAPI', '$location','User', function(facebookAPI, $location, User) {

    var self = this;

    if(!auth.user){
        $location.path('/login');
    }else {
        var userToSave = auth.user;
        userToSave._getToken().then(function(resolve){
            userToSave.token = resolve.token;
            self.user = userToSave;
            self.accessToken = userToSave.token;
        },function(){
            $location.path('/login');
        });
    }

}]);