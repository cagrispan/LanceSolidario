/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource'])
        .factory('Auction', ['auctionResource', 'Entity', 'Bid', function (auctionResource, Entity, Bid) {

            angular.extend(Auction.prototype, Entity.prototype);
            Auction.prototype.constructor = Auction;

            function Auction() {

                /*
                 Id
                 */
                this.auctionId = null;

                /*
                 Product Object
                 */
                this.productId = null;

                /*
                 Institution Object
                 */
                this.institutionId = null;

                /*
                 User Object
                 */
                this.facebookId = null;

                /*
                 User Object
                 */
                this.userId = null;

                /*
                 Number
                 */
                this.minimumBid = null;

                /*
                 Number
                 */
                this.maxBid = null;

                /*
                 Base64 Image
                 */
                this.image = null;

                /*
                 Date
                 */
                this.startDate = null;

                /*
                 Date
                 */
                this.currentServerDate = null;

                /*
                 Date
                 */
                this.endDate = null;

                /*
                 String
                 */
                this.status = null;

                /*
                 Boolean
                 */
                this.isClosed = null;

                /*
                 Array of Bid
                 */
                this.bidList = null;

                /*
                 Methods
                 */
                this._add = function () {
                    return auctionResource.add(this);
                };

                this._update = function () {
                    return auctionResource.update(this);
                };


                /*
                 * Load Methods
                 */

                /*
                 * Load information of an Auction
                 * Documented 23/11/2016
                 */
                this._load = function () {
                    var auction = this;
                    return auctionResource.load(auction).then(function (response) {
                        auction._setAuction(response);
                        return auction;
                    });
                };


                /*
                 * List the bid of an Auction
                 * Documented 23/11/2016
                 */
                this._loadBids = function () {
                    var auction = this;
                    return Bid._listByAuction(auction).then(function (returnList) {
                        auction.bidList = returnList;
                    });
                };


                this._listByUser = function (user) {
                    var auctionListtoReturn = [];

                    return auctionResource.loadAuctions(user).then(function (response) {
                        var auctionList = [];
                        var facebookId = '';

                        if (response.auctions) {
                            auctionList = response.auctions;
                        }
                        if (response.facebookId) {
                            facebookId = response.facebookId;
                        }

                        if (auctionList && auctionList[0]) {
                            var auction;
                            for (var i in auctionList) {
                                auction = new Auction();
                                auction.facebookId = facebookId;
                                auction._setAuction(auctionList[i]);
                                auctionListtoReturn.push(auction);
                            }
                        }
                        return auctionListtoReturn;
                    });
                };

                this._setAuction = function (objectToSet) {
                    var auction = this;
                    auction._set(objectToSet);
                    auction.endDate = new Date(auction.endDate);
                    auction.startDate = new Date(auction.startDate);
                    //TODO: FIX NEED TO BE UNIFIED
                    auction.userId = auction.userId ? auction.userId : auction.facebookId;
                    return auction;
                }

            }


            /*
             * Static Methods
             */


            /*
             * List all Auctions
             * Documented 23/11/2016
             */
            Auction._listAll = function (params) {
                var auctionListtoReturn = [];

                return auctionResource.loadAll(params).then(function (response) {
                    var auctionList = [];

                    if (response.auctions) {
                        auctionList = response.auctions;
                    }

                    if (auctionList && auctionList[0]) {
                        var auction;
                        for (var i in auctionList) {
                            auction = new Auction();
                            auction._setAuction(auctionList[i]);
                            auctionListtoReturn.push(auction);
                        }
                    }
                    return auctionListtoReturn;
                });
            };

            /*
             * List Auctions by Product
             * Documented 25/11/2016
             */
            //TODO: Need Unit tests
            Auction._listByProduct = function (product) {
                var auctionListtoReturn = [];
                return auctionResource.loadAuctionsByProduct(product).then(function (response) {
                    var auctionList = [];
                    var facebookId = '';

                    if (response.auctions) {
                        auctionList = response.auctions;
                    }
                    if (response.facebookId) {
                        facebookId = response.facebookId;
                    }

                    if (auctionList && auctionList[0]) {
                        var auction;
                        for (var i in auctionList) {
                            auction = new Auction();
                            auction.facebookId = facebookId;
                            auction._setAuction(auctionList[i]);
                            auctionListtoReturn.push(auction);
                        }
                    }
                    return auctionListtoReturn;
                });
            };

            return Auction;
        }]);
})(angular);

