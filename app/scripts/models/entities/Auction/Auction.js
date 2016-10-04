/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auction', ['lanceSolidario.auction.auctionResource', 'lanceSolidario.product.product']).factory('Auction', ['auctionResource', 'Entity','Product', function (auctionResource, Entity, Product) {

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

            this._list = function (user) {
                var auctionListtoReturn = [];
                return auctionResource.loadAuctions(user).then(function (response) {
                    var auctionList = [];
                    var facebookId = '';

                    if(response.auctions){  auctionList = response.auctions;}
                    if(response.facebookId){  facebookId = response.facebookId;}

                    if (auctionList && auctionList[0]) {
                        var auction;
                        for (var i in auctionList) {
                            auction = new Auction();
                            auction._set(auctionList[i]);
                            //Product
                            if (auctionList[i].productId) {
                                var product = new Product();
                                product.productId = auctionList[i].productId;
                                auction.product = product;
                            }

                            /*//Institution
                             if(auctionList[i].institutionId){
                             var institution = new Institution();
                             institution.institutionId = auctionList[i].institutionId;
                             auction.institution = institution;
                             }//*/
                            auction.facebookId = facebookId;
                            auctionListtoReturn.push(auction);
                        }
                    }

                    return auctionListtoReturn;
                });
            }

        }

        return Auction
    }]);
})(angular);

