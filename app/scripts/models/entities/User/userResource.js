/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.userResource', ['utils']).service('userResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        self.getToken = function (user) {
            var d = $q.defer();
            //user map
            var endpoint = '/auth/' + user.facebookId;
            var headers = {};
            webService.add(endpoint, user, headers).then(
                function (resolve) {
                    return d.resolve(resolve.data);
                }, function (resolve) {
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };

        self.update = function (user) {
            var d = $q.defer();
            //user map
            var objectToSend = user;
            var endpoint = '/users/' + user.facebookId;
            var headers = {'token': user.token, 'facebookId': user.facebookId};

            webService.update(endpoint, user, headers).then(
                function (resolve) {
                    return d.resolve(resolve.data);
                }, function (resolve) {
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };

        self.load = function (user) {
            var d = $q.defer();

            var endpoint = '/users/' + user.facebookId;
            var headers = {'token': user.token, 'facebookId': user.facebookId};

            webService.read(endpoint, headers).then(
                function (resolve) {
                    return d.resolve(resolve.data);
                }, function (resolve) {
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };
    }])
})(angular);
