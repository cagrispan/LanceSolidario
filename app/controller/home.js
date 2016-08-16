'use strict';
angular.module('lanceSolidario')
.controller('HomeCtrl',  ['auth', '$location','User', function(auth, $location, User) {

    var self = this;

    if(!auth.user){
        $location.path('/login');
    }else {
        var userToSave = angular.copy(auth.user);

        userToSave._save().then(function(resolve){
        },function(){
            $location.path('/login');
        });
    }

}]);