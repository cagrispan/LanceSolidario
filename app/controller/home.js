'use strict';
angular.module('lanceSolidario')
.controller('HomeCtrl',  ['auth', '$location','User', function(auth, $location, User) {

    var self = this;

    if(!auth.user){
        $location.path('/login');
    }else{
        var userToSave = new User();
        userToSave
    }
    self.user = auth.user;

}]);