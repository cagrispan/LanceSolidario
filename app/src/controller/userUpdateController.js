'use strict';
angular.module('lanceSolidario')
.controller('UserUpdate',  ['$scope','User','auth', function($scope, User, auth) {

    var self = this;

    if(!auth.user){
        $location.path('/login');
    }
    var userToUpdate = angular.copy(auth.user);
    var update = function(user){
        user.update();
        console.log('lolll');
    };
    self.user = userToUpdate;
    self.update = update;
}]);