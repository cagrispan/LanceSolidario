/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.bid.bidResourceMock', []).service('bidResource', ['$q', function ($q) {
        var self = this;


        self.add = function (bid) {
        };

        self.load = function (bid) {
        };

        self.loadBids = function (user) {
        };
        self.loadBidsByUser = function (user) {
        };

        self.loadBidsByAuction = function (auction) {
        };

        self.update = function (bid) {

         }
    }])
})(angular);
