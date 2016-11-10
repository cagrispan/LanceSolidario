'use strict';
angular.module('lanceSolidario')
    .controller('AuctionDetailCtrl', ['facebookAPI', '$location', 'Bid', 'shareData', 'ngToast', '$routeParams', 'Auction', 'Product', 'User', '$timeout', '$route',
        function (facebookAPI, $location, Bid, shareData, ngToast, $routeParams, Auction, Product, User, $timeout, $route) {

            var self = this;
            var mSecondsToGetBids = 3000;
            var bidsTask;
            var actualPath;

            self.newBid = null;
            self.duration = false;
            self.donor = {};
            self.user = {facebookId: 'noUser'};
            self.wining = 'first';
            self.auctionFinish = false;
            self.winningBid = {userId: ''};

            function init() {
                //Useful flags
                self.loading = true;
                shareData.set($location.path(), 'lastPath');
                actualPath = $location.path();
                self.showBidForm = false;

                self.product = shareData.get('lastProduct');
                self.auction = shareData.get('lastAuction');

                if (facebookAPI.user) {
                    self.user = facebookAPI.user;
                }

                if (self.auction) {
                    self.loading = false;

                    self.duration = getCountDown();


                    //TODO: This one is a big shit #1
                    if (self.auction.status === 'finished') {
                        self.auctionFinish = true;
                    }

                    //TODO: This one is a big shit #2
                    if (self.duration <= 0) {
                        self.duration = 0.0001;
                    }

                    loadDonor(self.auction.userId);
                    loadProduct();
                    loadBidsTask(self.auction);
                }

                else if ($routeParams.auctionId) {
                    self.auction = new Auction();
                    self.auction.auctionId = $routeParams.auctionId;


                    self.auction._load().then(function () {
                        self.duration = getCountDown();

                        //TODO: This one is a big shit #1
                        if (self.auction.status === 'finished') {
                            self.auctionFinish = true;
                        }

                        //TODO: This one is a big shit #2
                        if (self.duration <= 0) {
                            self.duration = 0.0001;
                        }

                        loadDonor(self.auction.userId);
                        loadProduct();
                        loadBidsTask(self.auction);

                    }, function (err) {
                        failFeedback(err);
                    });

                } else {
                    failFeedback('Problemas ao carregar o leilão. Tente novamente.');
                    $location('user/auctions');
                }
            }

            function loadProduct() {
                if (self.product) {
                    self.product._loadImages();

                } else {
                    self.product = new Product();

                    self.product._listByAuction(self.auction).then(function (productsList) {
                        if (productsList.length > 0) {
                            self.product = productsList[0];
                            return self.product._loadImages().catch(function (err) {
                                failFeedback(err, 'Problemas ao carregar as imagens do produto. Tente novamente.');
                            })
                        } else {
                            failFeedback('Problemas ao carregar o produto. Tente novamente.');

                        }
                    }, function (err) {
                        failFeedback(err, 'Problemas ao carregar o produto. Tente novamente.');
                    });

                }
            }

            function loadDonor(facebookId) {
                self.donor = new User();
                self.donor.facebookId = facebookId;
                return self.donor._loadPublicInformation().catch(function (err) {
                    failFeedback(err, 'Problemas ao carregar os dados do Doador. Tente novamente.');
                });

            }

            function loadBidsTask(auction) {
                if (auction.status === 'active') {
                    auction._loadBids().then(function () {
                        self.duration = (new Date(self.auction.endDate).getTime() - new Date().getTime()) / 1000;
                        self.winningBid = getWinningBid();
                        winingVerify();
                        if ($location.path() === actualPath)
                            $timeout(loadBidsTask.bind(self, self.auction), mSecondsToGetBids);
                    }, function (err) {
                        if ($location.path() === actualPath)
                            $timeout(loadBidsTask.bind(self, self.auction), mSecondsToGetBids);
                        failFeedback('Problemas ao carregar os lances.');
                    })
                }
            }

            function winingVerify() {
                if (self.wining === 'first') {
                    self.wining = (self.winningBid.userId === self.user.facebookId);
                }
                if (self.wining) {
                    if (self.winningBid.userId !== self.user.facebookId) {

                        self.wining = false;
                        ngToast.info('Seu lance foi superado.');
                    }
                } else {
                    if (self.winningBid.userId === self.user.facebookId) {
                        self.wining = true;
                    }
                }
            }

            function getCountDown() {
                if (self.auction.status === 'pending') {
                    console.log((new Date(self.auction.startDate).getTime() - new Date(self.auction.currentServerDate).getTime()) / 1000);
                    return (new Date(self.auction.startDate).getTime() - new Date(self.auction.currentServerDate).getTime()) / 1000;
                } else if (self.auction.status === 'active') {
                    console.log((new Date(self.auction.endDate).getTime() - new Date(self.auction.currentServerDate).getTime()) / 1000);
                    return (new Date(self.auction.endDate).getTime() - new Date(self.auction.currentServerDate).getTime()) / 1000;
                } else {
                    return 0;
                }
            }

            function getWinningBid() {
                self.auction.bidList.sort(function (a, b) {
                    return b.bid - a.bid;
                });

                for (var indx in self.auction.bidList) {
                    if (!self.auction.bidList[indx].isDeleted) {
                        return self.auction.bidList[indx];
                    }
                }
                return self.winningBid;
            }


            self.finishAction = function () {
                if (self.auction.status === 'active' || self.auction.status === 'pending') {
                    $timeout($route.reload(), 1000);
                }
            };


            self.bid = function () {

                if (!facebookAPI.user) {
                    ngToast.info('Por favor, realize login para fazer um lance.');
                    $timeout($location.path.bind($location, '/login'), 500);
                } else {
                    if (!self.auctionFinish) {
                        if (self.newBid < self.winningBid.bid) {
                            failFeedback('Eii! Seu lance deve ser maior que o lance atual. Verifique o valor inserido.');
                        } else {
                            var bid = new Bid();
                            bid.auctionId = self.auction.auctionId;
                            bid.bid = self.newBid;
                            bid._add(self.user).then(
                                function () {
                                    self.auction._loadBids();
                                    self.newBid = '';
                                    self.showBidForm = false;
                                    successFeedback('Parabéns, seu lance foi efetuado com sucesso.');
                                }, function () {
                                    failFeedback('Ocorreu um problema ao salvar o seu lance, verifique se um lance maior já não foi efetuado.');
                                });
                        }
                    } else {
                        failFeedback('Esse leilão já foi encerrado.');
                    }
                }
            };

            self.preBid = function () {
                if (!facebookAPI.user) {
                    ngToast.info('Por favor, realize login para fazer um lance.');
                    $timeout($location.path.bind($location, '/login'), 100);
                } else if (self.winningBid.userId === self.user.facebookId) {
                    ngToast.warning('O seu lance ainda esta ganhando esse leilão, realmente deseja cobrir seu próprio lance?');
                    self.showBidForm = !self.showBidForm;

                } else {
                    self.showBidForm = !self.showBidForm;
                }
            };

            self.feed = function () {
                facebookAPI.feed($location.path(), 'Veja o produto que encontrei no Lance Solidário, o valor arrecadado vai ser encaminhado para o Teto. Qeu tal dar um lance e ajudar essa instituição!?');
            };

            var successFeedback = function (message) {
                ngToast.success(message);
            };

            var failFeedback = function (error) {
                var aux = (typeof error) == 'string';
                ngToast.danger('<b> Erro!</b>' + (aux ? error : ' Houve algum problema na requisição. Tente novamente.'));
                console.log(JSON.stringify(error))
            };


            init();
        }]);
