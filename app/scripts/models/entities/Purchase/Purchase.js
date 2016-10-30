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
            }

            Purchase._listAll = function (user) {
                var purchaseListToReturn = [];

                return purchaseResource.loadAll(user).then(function (response) {
                    var purchaseList = [];

                    if (response.purchases) {
                        purchaseList = response.purchases;
                    }

                    if (purchaseList && purchaseList[0]) {
                        var purchase;
                        for (var i in purchaseList) {
                            purchase = new Purchase();
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

