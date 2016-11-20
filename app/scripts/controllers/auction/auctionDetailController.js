'use strict';
angular.module('lanceSolidario')
    .controller('AuctionDetailCtrl', ['facebookAPI', '$location', 'Bid', 'shareData', 'ngToast', '$routeParams', 'Auction', 'Product', 'User', '$timeout', '$route', 'distanceAPI', 'Institution',
        function (facebookAPI, $location, Bid, shareData, ngToast, $routeParams, Auction, Product, User, $timeout, $route, distanceAPI, Institution) {

            var self = this;
            var mSecondsToGetBids = 3000;
            var bidsTask;
            var actualPath;

            self.newBid = null;
            self.duration = false;
            self.donor = {};
            self.user = {facebookId: null};
            self.wining = 'first';
            self.auctionFinish = false;
            self.winningBid = {userId: ''};

            function init() {
                //Useful flags
                self.loading = true;
                shareData.set($location.path(), 'lastPath');
                actualPath = $location.path();

                self.product = shareData.get('lastProduct');
                self.auction = shareData.get('lastAuction');

                if (facebookAPI.user) {
                    self.user = facebookAPI.user;
                }

                if (self.auction && self.auction.auctionId) {
                    shareData.set(false, 'lastAuction');
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
                    loadInstitution(self.auction.institutionId);

                    loadProduct();
                    loadBidsTask(self.auction);
                }

                else if ($routeParams.auctionId) {
                    self.auction = new Auction();
                    self.auction.auctionId = $routeParams.auctionId;


                    self.auction._load().then(function () {
                        if(!self.auction.status){
                            $location.path('404');
                        }else {

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
                            loadInstitution(self.auction.institutionId);
                            loadProduct();
                            loadBidsTask(self.auction);
                        }
                    }, function (err) {
                        failFeedback(err);
                    });

                } else {
                    $location.path('404');
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
                self.donor.address = {};
                self.donor.facebookId = facebookId;
                return self.donor._loadPublicInformation().then(function () {
                    if (self.user.facebookId) {
                        self.user._loadAddresses().then(function () {
                            return distanceAPI.get(self.donor.address.cep, self.user.addressList[0].cep)
                        }).then(function (distanceObject) {
                            if (distanceObject && distanceObject.rows[0] && distanceObject.rows[0].elements[0]) {
                                self.distance = distanceObject['rows'][0]['elements'][0]['distance']['text'];
                            } else {
                                self.distance = null;
                            }
                        })
                    }
                }, function (err) {
                    failFeedback(err, 'Problemas ao carregar os dados do Doador. Tente novamente.');
                });

            }

            function loadInstitution(institutionId) {
                self.institution = new Institution();
                self.institution.institutionId = institutionId;
                return self.institution._load().catch(function (err) {
                    failFeedback(err, 'Problemas ao carregar os dados da INstituição. Tente novamente.');
                });

            }

            function loadBidsTask(auction) {
                auction._loadBids().then(function () {
                    self.duration = (new Date(self.auction.endDate).getTime() - new Date().getTime()) / 1000;
                    self.winningBid = getWinningBid();
                    winingVerify();
                    if ($location.path() === actualPath && auction.status === 'active')
                        $timeout(loadBidsTask.bind(self, self.auction), mSecondsToGetBids);
                }, function (err) {
                    if ($location.path() === actualPath)
                        $timeout(loadBidsTask.bind(self, self.auction), mSecondsToGetBids);
                    failFeedback('Problemas ao carregar os lances.');
                })
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
                    return (new Date(self.auction.startDate).getTime() - new Date(self.auction.currentServerDate).getTime()) / 1000;
                } else if (self.auction.status === 'active') {
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
                    $timeout($location.path.bind($location, '/login'), 100);
                } else if (!self.auctionFinish) {
                    if (self.newBid <= self.winningBid.bid) {
                        failFeedback('Eii! Seu lance deve ser maior que o lance atual. Verifique o valor inserido.');
                        return;
                    }

                    if (!self.winningBid && self.newBid <= self.auction.minimumBid) {
                        failFeedback('Ops! Seu lance deve ser maior que o <b>valor mínimo</b>. Verifique o valor inserido.');
                        return;
                    }


                    var bid = new Bid();
                    bid.auctionId = self.auction.auctionId;
                    bid.bid = self.newBid;
                    bid._add(self.user).then(
                        function () {
                            self.auction._loadBids().then(function () {
                                successFeedback('Parabéns, seu lance foi efetuado com sucesso.');
                                self.duration = (new Date(self.auction.endDate).getTime() - new Date().getTime()) / 1000;
                                self.winningBid = getWinningBid();
                                winingVerify();
                                self.newBid = '';

                            });
                        }, function () {
                            failFeedback('Ocorreu um problema ao salvar o seu lance, verifique se um lance maior já não foi efetuado.');
                        });

                } else {
                    failFeedback('Esse leilão já foi encerrado.');
                }
            };

            self.increaseBid = function (value) {
                if (!self.newBid) {
                    if (self.winningBid.bid) {
                        self.newBid = self.winningBid.bid;
                    } else {
                        self.newBid = self.auction.minimumBid;
                    }
                }
                self.newBid += value;
            };

            self.feed = function () {
                facebookAPI.feed($location.path(), 'Veja o produto que encontrei no Lance Solidário, o valor arrecadado vai ser encaminhado para o Teto. Qeu tal dar um lance e ajudar essa instituição!?');
            };

            self.openInstitution = function () {
                shareData.set(self.institution, 'lastInstitution');
                $location.path('/institutions/' + self.institution.institutionId);
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
