/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource']).factory('Auction', ['auctionResource', 'Entity', '$q', function (auctionResource, Entity, $q) {

        angular.extend(Auction.prototype, Entity.prototype);
        Auction.prototype.constructor = Auction;

        function Auction() {

            //identification
            this.id = null;
            this.donorUser = null;
            this.buyerUser = null;

            //Product info
            this.title = null;
            this.description = null;
            this.category = null;
            this.tags = null;
            this.isUsed = null;

            //Image
            this.images = null;

            //history
            this.auctions = null;

            //methods
            this._add = function () {
                return auctionResource.add(this);
            };

            this._load = function () {
                //var defer = $q.defer();
                return auctionResource.load(this).then(
                    function (auctionReturned) {
                        this._set(auctionReturned);
                        return this;
                        //defer.resolve(this);
                    },
                    function (errorCallback) {
                        return errorCallback;
                        //defer.reject(errorCallback);
                    });
                //return defer.promise;
            };
        }

        return Auction
    }]);
})(angular);

