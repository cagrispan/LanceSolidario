/**
 * Created by Aliss on 11/08/2016.
 */
var globalConfig = {"backendBasePath":"http://localhost:7780"};
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.userResource',['utils']).service('userResource', ['webService','$q', function (webService,$q) {
        var self = this;

        self.save = function(user){
            var d = $q.defer();
            //user map
            var endpoint = '/users/'+user.facebookId+'/token/'+user.token;
            webService.update(endpoint,user).then(
                function(resolve){

                    return d.resolve(resolve.data);
            }, function(resolve){
                    return d.reject("The request fail :"+resolve.headers);
                }
            );
            return d.promise;
        };
    }])
})(angular);