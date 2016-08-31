/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource']).factory('Auction', ['auctionResource', function (auctionResource) {

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
            this._add = function(){
                return auctionResource.add(this);
            }
        }

        return Auction
    }]);
})(angular);

