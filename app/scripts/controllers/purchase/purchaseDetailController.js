'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseDetailCtrl', ['facebookAPI', '$location', 'Purchase', 'shareData', 'Auction', 'Product', 'User', 'ngToast', '$routeParams', '$q','Institution',
        function (facebookAPI, $location, Purchase, shareData, Auction, Product, User, ngToast, $routeParams, $q, Institution) {

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
                                    self.institution = new Institution();
                                    self.institution.institutionId = self.auction.institutionId;
                                    self.institution._load().catch(function () {
                                        failFeedback('Problemas ao carregar dados da Instituição. Tente novamente.');
                                    });

                                    var promises = [];
                                    self.product = new Product();
                                    promises.push(self.product._listByAuction(self.auction).then(function (productList) {
                                        self.product = productList[0];
                                        if (!self.product) {
                                            failFeedback('Problemas ao carregar dados do produto. Tente novamente.');
                                        }
                                    }));

                                    self.purchase._loadDonor(self.auction.userId).then(function(result){
                                        self.donorUser = result;
                                    });
                                    promises.push(self.productDonor._loadPublicInformation());

                                    return $q.all(promises);
                                }
                            )
                            .catch(function (err) {
                                failFeedback(err, ' Problemas ao carregar dados da compra. Tente novamente.');
                            });

                    } else if ($routeParams.purchaseId) {

                        self.purchase = new Purchase();
                        self.purchase.facebookId = self.user.facebookId;
                        self.purchase.purchaseId = $routeParams.purchaseId;

                        self.purchase._load()
                            .then(function () {
                                self.auction = new Auction();
                                self.auction.auctionId = self.purchase.auctionId;
                                self.auction._load()
                                    .then(function () {
                                        self.institution = new Institution();
                                        self.institution.institutionId = self.auction.institutionId;
                                        self.institution._load().catch(function () {
                                            failFeedback('Problemas ao carregar dados da Instituição. Tente novamente.');
                                        });

                                        var promises = [];
                                        self.product = new Product();
                                        promises.push(self.product._listByAuction(self.auction).then(function (productList) {
                                            self.product = productList[0];
                                            if (!self.product) {
                                                failFeedback(' Problemas ao carregar dados da compra. Tente novamente.');
                                            }
                                        }));

                                        self.purchase._loadDonor(self.auction.userId).then(function(result){
                                            self.donorUser = result;
                                        });

                                        return $q.all(promises);
                                    })
                                    .catch(function (err) {
                                        failFeedback(err, ' Problemas ao carregar dados da compra. Tente novamente.');
                                    });
                            }, function (err) {

                                failFeedback(err, ' Problemas ao carregar dados da compra. Tente novamente.');
                            });


                    }


                }
            }

            self.pay = function () {
            };

            self.confirmDelivery = function () {
                var purchase = angular.copy(self.purchase);
                purchase.isDelivered = true;
                purchase._update()
                    .then(function () {
                        self.purchase._load();
                    }).catch(function (err) {
                    failFeedback(err, 'Houve um problema ao atualizar o estado de entrega. Tente novamente.')
                })
            };


            var successFeedback = function (message) {
                ngToast.success(message);
            };

            var failFeedback = function (error, message) {
                var aux = (typeof error) == 'string';
                ngToast.danger('<b> Erro!</b>' + (aux ? error : (message ? ' ' + message : ' Houve algum problema na requisição. Tente novamente.')));
                console.log(JSON.stringify(error))
            };

            init();

        }

    ])
;
