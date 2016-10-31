'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseDetailCtrl', ['facebookAPI', '$location', 'Purchase', 'shareData', 'Auction', 'Product', 'User',
        function (facebookAPI, $location, Purchase, shareData, Auction, Product, User) {

            var self = this;

            function init() {
                //Useful flags
                self.loading = true;

                if (!facebookAPI.user) {
                    $location.path('/login');
                } else {
                    self.user = facebookAPI.user;
                    self.purchase = shareData.get('lastPurchase');

                    self.auction = new Auction();
                    self.auction.auctionId = self.purchase.auctionId;
                    self.auction._load()
                        .then(function () {
                            var promises = [];

                            self.product = new Product();
                            self.product.productId = self.auction.productId;
                            promises.push(self.product._load());

                            self.productDonor = new User();
                            self.productDonor.facebookId = self.auction.facebookId;
                            promises.push(self.productDonor._load());

                            return $q.all(promises);
                        })
                        .catch(function () {

                        });

                }
            }

            self.pay = function () {
                alert('PagSeguro');
            };

            self.confirmDelivery = function () {
                self.purchase.isDelivered = true;
                self.purchase._update(self.user)
                    .then(function () {
                        self.purchase._load(self.user);
                    })
            };

            self.purchaseDetail = function (purchase) {
                shareData.set(purchase, 'lastPurchase');
                $location.path('/purchases/' + purchase.purchaseId);
            };

            init();

        }]);
