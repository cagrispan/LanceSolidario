'use strict';
angular.module('lanceSolidario')
.controller('UserUpdate',  ['$scope','User','facebookAPI','$location', function($scope, User, facebookAPI, $location) {

    var self = this;

    if(!facebookAPI.user){
        $location.path('/login');
    }
    var userToUpdate = facebookAPI.user;


    self.user = userToUpdate;
    self.update = function(){
        userToUpdate._update();
        console.log('lolll');
    };
}]);
