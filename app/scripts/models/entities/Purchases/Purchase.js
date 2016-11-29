/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.purchase.purchase', ['lanceSolidario.purchase.purchaseResource'])
        .factory('Purchase', ['purchaseResource', 'Entity', function (purchaseResource, Entity) {

            angular.extend(Purchase.prototype, Entity.prototype);
            Purchase.prototype.constructor = Purchase;

            function Purchase() {

                /*
                 Id
                 */
                this.purchaseId = null;

                /*
                 Product
                 */
                this.productId = null;
                this.productTitle = null;

                /*
                 Auction
                 */
                this.auctionId = null;

                /*
                 Auction
                 */
                this.url = null;

                /*
                 Value
                 */
                this.maxBid = null;

                /*
                 Payment
                 */
                this.isPaid = null;

                /*
                 Delivery
                 */
                this.isDelivered = null;

                /*
                 Buyer Id
                 */
                this.facebookId = null;


                this.donorUser = null;

                /*
                 Methods
                 */

                /*
                 * Load donor information of a purchase
                 * Documented 26/11/2016
                 */
                this._load = function () {
                    var purchase = this;
                    return purchaseResource.load(purchase)
                        .then(function (result) {
                            purchase._set(result);
                        });
                };


                /*
                 * Load donor information of a purchase
                 * Documented 26/11/2016
                 */
                this._loadDonor = function (donorId) {
                    var purchase = this;

                    return purchaseResource.loadDonor(purchase, donorId)
                        .then(function (result) {
                            return result;
                        });
                };


                /*
                 * Update donor information of a purchase
                 * Documented 26/11/2016
                 */
                this._update = function () {
                    return purchaseResource.update(this);
                };
            }

            /*
             * List the products of an User
             * Documented 26/11/2016
             */
            Purchase._listPurchasesByUser = function (user) {
                var purchaseListToReturn = [];

                return purchaseResource.loadByUser(user).then(function (response) {
                    var purchaseList = [];

                    if (response.purchases) {
                        purchaseList = response.purchases;
                    }

                    if (purchaseList && purchaseList[0]) {
                        var purchase;
                        for (var i in purchaseList) {
                            purchase = new Purchase();
                            purchase.facebookId = response.facebookId;
                            purchase._set(purchaseList[i]);
                            purchaseListToReturn.push(purchase);
                        }
                    }
                    return purchaseListToReturn;
                });
            };

            return Purchase;
        }]);
})(angular);

