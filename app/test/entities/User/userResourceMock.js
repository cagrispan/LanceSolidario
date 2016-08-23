/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.userResourceMock', []).service('userResource',['$q',function ($q) {
        var self = this;

        self.add = function (user) {
            if (user.facebookId === 'ThisIdExists') {
                return 22;
            } else {
                return !22;
            }
        };

        self.save = function (user) {
            var d = $q.defer();
            //user map
            var userToSend = {name:'userTestName'};
            //var endpoint = '/users/' + user.facebookId + '/token/' + user.token;
            if (user.facebookId === 'validFacebookId' && user.token === 'validToken') {
                d.resolve(userToSend);
            } else {
                d.reject("The request fail :" + resolve.headers);
            }
            return d.promise;
        };

        self.update = function (user) {
            var d = $q.defer();
            //user map
            var userToSend = {name:'userTestName','address':{'addressLine':'validAddressLine'}};
            //var endpoint = '/users/' + user.facebookId;
            if (user.facebookId === 'validFacebookId' && user.token === 'validToken' && user.address.addressLine==='validAddressLine') {
                d.resolve(userToSend);
            } else {
                d.reject("The request fail :" + resolve.headers);
            }
            return d.promise;
        };
    }])
})(angular);