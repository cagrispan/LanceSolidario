/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auctionResourceMock', []).service('auctionResource', ['$q', function ($q) {
        var self = this;


        self.add = function (auction) {
        };

        self.load = function (auction) {
        };

        self.loadAuctions = function (user) {
        };

         self.update = function (auction) {

         }
    }])
})(angular);
