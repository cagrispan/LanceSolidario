/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auctionResource',['utils']).service('auctionResource', ['webService','$q', function (webService,$q) {
        var self = this;

        self.add = function(auction){
            var d = $q.defer();
            //auction map
            var actionTosend = angular.copy(auction);
            var endpoint = '/auctions';

            webService.add(endpoint,actionTosend).then(
                function(resolve){
                    return d.resolve(resolve.data);
                }, function(resolve){
                    return d.reject(resolve.data);
                }
            );
            return d.promise;
        };

      self.load = function(auction){
        var d = $q.defer();
        //auction map
        var actionTosend = angular.copy(auction);
        var endpoint = '/auctions/'+auction.id;

        webService.read(endpoint,actionTosend).then(
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
