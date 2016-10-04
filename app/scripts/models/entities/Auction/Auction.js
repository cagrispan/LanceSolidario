/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource', 'lanceSolidario.product.product']).factory('Auction', ['auctionResource', 'Entity', 'Product', function (auctionResource, Entity, Product) {

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
            this.product = null;

            /*
             Institution Object
             */
            this.institution = null;

            /*
             User Object
             */
            this.donorUser = null;

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


            this._setAuction = function (objectToSet) {
                var auction = this;
                auction._set(objectToSet);

                //Product
                if (objectToSet.productId) {
                    var product = new Product();
                    product.productId = objectToSet.productId;
                    auction.product = product;
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

