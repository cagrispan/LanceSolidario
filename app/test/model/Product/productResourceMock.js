/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.productResourceMock', []).service('productResource',['$q',function ($q) {
        var self = this;



        self.add = function (user) {
            var d = $q.defer();
            //user map
            var userToSend = {name:'userTestName','address':{'addressLine':'validAddressLine'}};
            //var endpoint = '/users/' + user.facebookId;
            if (user.facebookId === 'validFacebookId' && user.token === 'validToken' && user.address.addressLine==='validAddressLine') {
                d.resolve(userToSend);
            } else {
                d.reject("The request fail :"+ {'Content-Type':'application/json'});
            }
            return d.promise;
        };

        /*
        self.update = function (user) {
            var d = $q.defer();
            //user map
            var userToSend = {name:'userTestName','address':{'addressLine':'validAddressLine'}};
            //var endpoint = '/users/' + user.facebookId;
            if (user.facebookId === 'validFacebookId' && user.token === 'validToken' && user.address.addressLine==='validAddressLine') {
                d.resolve(userToSend);
            } else {
                d.reject("The request fail :"+ {'Content-Type':'application/json'});
            }
            return d.promise;
        };*/
    }])
})(angular);