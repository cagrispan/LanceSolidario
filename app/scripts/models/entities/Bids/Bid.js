/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.bid.bid', ['lanceSolidario.bid.bidResource', 'lanceSolidario.auction.auction'])
        .factory('Bid', ['bidResource', 'Entity', function (bidResource, Entity) {

        angular.extend(Bid.prototype, Entity.prototype);
        Bid.prototype.constructor = Bid;

        function Bid() {

            /*
             Id
             */
            this.bidId = null;

            /*
             Auction Object
             */
            this.auctionId = null;

            /*
             USer Object
             */
            this.userId = null;

            /*
             Number
             */
            this.bid = null;

            /*
             Date
             */
            this.date = null;

            /*
            Boolean
            */
            this.isDeleted = null;


            /*
             Methods
             */
            this._add = function (user) {
                return bidResource.add(this, user);
            };

            this._update = function () {
                return bidResource.update(this);
            };

            this._listByUser = function (user) {
                var bidListToReturn = [];
                return bidResource.loadBidsByUser(user).then(function (response) {
                    var bidList = [];
                    var facebookId = '';

                    if(response.bids){  bidList = response.bids;}
                    if(response.facebookId){  facebookId = response.facebookId;}

                    if (bidList && bidList[0]) {
                        var bid;
                        for (var i in bidList) {
                            bid = new Bid();
                            bid._set(bidList[i]);
                            bid.facebookId = facebookId;
                            bidListToReturn.push(bid);
                        }
                    }
                    return bidListToReturn;
                });
            };

            this._listByAuction = function (auction) {
                var bidListtoReturn = [];
                return bidResource.loadBidsByAuction(auction).then(function (response) {
                    var bidList = [];
                    var facebookId = '';

                    if(response.bids){  bidList = response.bids;}
                    if(response.facebookId){  facebookId = response.facebookId;}

                    if (bidList && bidList[0]) {
                        var bid;
                        for (var i in bidList) {
                            bid = new Bid();
                            bid._set(bidList[i]);
                            bid.facebookId = facebookId;
                            bidListtoReturn.push(bid);
                        }
                    }
                    return bidListtoReturn;
                });
            }

        }

        return Bid
    }]);
})(angular);

