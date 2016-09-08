/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auctionResourceMock', []).service('auctionResource', ['$q', function ($q) {
        var self = this;


        self.add = function (auction) {
            var d = $q.defer();
            //auction map
            var auctionToSend = {name: 'auctionTestName', 'address': {'addressLine': 'validAddressLine'}};
            //var endpoint = '/auctions/' + auction.facebookId;
            if (auction.title === 'validFacebookId' && auction.token === 'validToken' && auction.address.addressLine === 'validAddressLine') {
                d.resolve(auctionToSend);
            } else {
                d.reject("The request fail :" + {'Content-Type': 'application/json'});
            }
            return d.promise;
        };

        self.load = function (auction) {
            var d = $q.defer();
            //auction map
            var auctionToSend = {title: 'auctionTestName', 'description': 'descriptionText', 'id':'ThisIsAnId'};
            //var endpoint = '/auctions/' + auction.facebookId;
            if (auction.title) {
                d.resolve(auctionToSend);
            } else {
                d.reject("The request fail :" + {'Content-Type': 'application/json'});
            }
            return d.promise;
        };
        /*
         self.update = function (auction) {
         var d = $q.defer();
         //auction map
         var auctionToSend = {name:'auctionTestName','address':{'addressLine':'validAddressLine'}};
         //var endpoint = '/auctions/' + auction.facebookId;
         if (auction.facebookId === 'validFacebookId' && auction.token === 'validToken' && auction.address.addressLine==='validAddressLine') {
         d.resolve(auctionToSend);
         } else {
         d.reject("The request fail :"+ {'Content-Type':'application/json'});
         }
         return d.promise;
         };*/
    }])
})(angular);
