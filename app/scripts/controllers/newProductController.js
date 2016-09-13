'use strict';
angular.module('lanceSolidario')
.controller('NewProductCtrl',  ['Product','facebookAPI','$location', function(Product, facebookAPI, $location) {

    var self = this;

   if(!facebookAPI.user){
       $location.path('/login');
   }

    self.user = facebookAPI.user;
    self.newProduct = new Product();

    self.add = function(){
        self.newProduct._add()
    };
}]);
