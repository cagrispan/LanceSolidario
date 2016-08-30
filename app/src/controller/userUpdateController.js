'use strict';
angular.module('lanceSolidario')
.controller('UserUpdate',  ['$scope','User','facebookAPI','$location', function($scope, User, facebookAPI, $location) {

    var self = this;

    if(!auth.user){
        $location.path('/login');
    }
    var userToUpdate = auth.user;


    self.user = userToUpdate;
    self.update = function(){
        userToUpdate._update();
        console.log('lolll');
    };
}]);