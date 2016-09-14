/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource']).factory('Auction', ['auctionResource', 'Entity', '$q', function (auctionResource, Entity, $q) {

        angular.extend(Auction.prototype, Entity.prototype);
        Auction.prototype.constructor = Auction;

        function Auction() {

            /*
             Id
             */
            this.id = null;
            /*
             Product Object
             */
            this.product = null;

            /*
             User Object
             */
            this.donorUser = null;

            /*
             User Object
             */
            this.buyerUser = null;

            /*
             Institution Object
             */
            this.institution = null;

            /*
             Array DeliveryMethod Object
             */
            this.deliveryMethods = null;

            /*
             Number
             */
            this.minimumBid = null;

            /*
             Array Object Bid
             */
            this.bids = null;

            /*
              Date
             */
            this.startDate = null;

            /*
             Date
             */
            this.endDate = null;

            /*
             Methods
             */
            this._add = function () {
                return auctionResource.add(this);
            };

            this._load = function () {
                return auctionResource.load(this).then(
                    function (auctionReturned) {
                        this._set(auctionReturned);
                        return this;
                    },
                    function (errorCallback) {
                        return errorCallback;
                    });
            };
        }

        return Auction
    }]);
})(angular);

