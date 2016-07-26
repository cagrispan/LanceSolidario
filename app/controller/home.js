'use strict';
angular.module('lanceSolidario')
.controller('HomeCtrl',  ['auth', '$location', function(auth, $location) {

    var self = this;

    if(!auth.user){
        $location.path('/login');
    }

    self.user = auth.user;

}]);