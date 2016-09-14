/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.productResource',['utils']).service('productResource', ['webService','$q', function (webService,$q) {
        var self = this;

        self.add = function(product){
            var d = $q.defer();
            //user map
            var endpoint = '/products';
            var headers  ={};
            webService.add(endpoint,product,headers).then(
                function(resolve){
                    return d.resolve(resolve.data);
                }, function(resolve){
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };
        /*
        self.save = function(user){
            var d = $q.defer();
            //user map
            var endpoint = '/users/'+user.facebookId+'/auth';

            webService.add(endpoint,user).then(
                function(resolve){
                    return d.resolve(resolve.data);
                }, function(resolve){
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };
        */
    }])
})(angular);
