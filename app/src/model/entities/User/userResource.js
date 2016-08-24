/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.userResource',['utils']).service('userResource', ['webService','$q', function (webService,$q) {
        var self = this;

        self.save = function(user){
            var d = $q.defer();
            //user map
            var endpoint = '/auth/'+user.facebookId;

            webService.add(endpoint,user).then(
                function(resolve){
                    return d.resolve(resolve.data);
            }, function(resolve){
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };

        self.update = function(user){
            var d = $q.defer();
            //user map
            var objectToSend = user;
            var endpoint = '/users/'+user.facebookId;
            
            webService.update(endpoint,user).then(
                function(resolve){

                    return d.resolve(resolve.data);
                }, function(resolve){
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };
    }])
})(angular);