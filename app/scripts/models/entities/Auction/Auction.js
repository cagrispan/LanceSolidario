/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource']).factory('Auction', ['auctionResource', 'Entity',function (auctionResource, Entity) {

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
             Number
             */
            this.minimumBid = null;

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

            this._update = function () {
                return auctionResource.update(this);
            };

            this._load = function () {
                return auctionResource.load(this).then(function (response) {
                    var auction = this;
                    auction._setAuction(response);
                    return auction;
                });
            };

            this._listAll = function (params) {
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

            //TODO: Need Unit tests
            this._listByProduct = function (product) {
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



            this._setAuction = function (objectToSet) {
                var auction = this;
                auction._set(objectToSet);

                //Auction
                if (objectToSet.auctionId) {
                    var auction = new Auction();
                    auction.auctionId = objectToSet.auctionId;
                    auction.endDate = new Date(auction.endDate);
                    auction.startDate = new  Date(auction.startDate);
                    auction.auction = auction;
                }

                /*//Institution
                 if(auctionList[i].institutionId){
                 var institution = new Institution();
                 institution.institutionId = auctionList[i].institutionId;
                 auction.institution = institution;
                 }//*/
                return auction;
            }

        }

        return Auction
    }]);
})(angular);

