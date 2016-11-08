'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseDetailCtrl', ['facebookAPI', '$location', 'Purchase', 'shareData', 'Auction', 'Product', 'User', 'ngToast', '$routeParams', '$q',
        function (facebookAPI, $location, Purchase, shareData, Auction, Product, User, ngToast, $routeParams, $q) {

            var self = this;

            function init() {
                //Useful flags
                self.loading = true;
                shareData.set($location.path(), 'lastPath');

                if (!facebookAPI.user) {
                    $location.path('/login');
                } else {

                    self.user = facebookAPI.user;
                    self.purchase = shareData.get('lastPurchase');
                    if (self.purchase) {

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
                                //promises.push(self.productDonor._load());

                                return $q.all(promises);
                            })
                            .catch(function (err) {
                                failFeedback(err);
                            });

                    } else if ($routeParams.purchaseId) {

                        self.purchase = new Purchase();
                        self.purchase.facebookId =  self.user.facebookId;
                        self.purchase.purchaseId = $routeParams.purchaseId;

                        self.purchase._load()
                            .then(function () {
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
                                        //promises.push(self.productDonor._load());

                                        return $q.all(promises);
                                    })
                                    .catch(function (err) {
                                        failFeedback(err);
                                    });
                            })
                            .catch(function (err) {
                                failFeedback(err);
                            });


                    }


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


            var successFeedback = function (message) {
                ngToast.success(message);
            };

            var failFeedback = function (error) {
                var aux = (typeof error) == 'string';
                ngToast.danger('<b> Erro! </b>' + (aux ? error : ' Houve algum problema na requisição. Tente novamente.'));
                console.log(JSON.stringify(error))
            };

            init();

        }

    ]);
