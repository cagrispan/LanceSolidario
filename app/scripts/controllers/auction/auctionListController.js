'use strict';
angular.module('lanceSolidario')
    .controller('AuctionListCtrl', ['facebookAPI', '$location', 'Auction', 'shareData', 'ngToast',
        function (facebookAPI, $location, Auction, shareData, ngToast) {

            var self = this;

            self.orderByList =
                [
                    {
                        title: 'Preço mais alto',
                        filter:{},
                        reverse: true,
                        orderBy: 'bid'
                    },
                    {
                        title: 'Preço mais baixo',
                        filter:{},
                        reverse: false,
                        orderBy: 'bid'
                    },
                    {
                        title: 'Mais próximo des terminar',
                        filter:{status:'active'},
                        reverse: false,
                        orderBy: 'endDate'
                    },
                    {
                        title: 'Mais próximo de começar',
                        filter:{status:'pending'},
                        reverse: false,
                        orderBy: 'startDate'
                    }
                ];

            self.orderBy = self.orderByList[0];
            function init() {
                //Useful flags
                self.loading = true;


                Auction._listAll()
                    .then(function (auctionList) {
                        self.auctionList = auctionList;

                        for (var i = 0; i < self.auctionList.length; i++) {
                            if (self.auctionList[i].status === 'pending') {
                                self.auctionList[i].duration = (new Date(self.auctionList[i].startDate).getTime() - new Date(self.auctionList[i].currentServerDate).getTime()) / 1000;
                            } else if (self.auctionList[i].status === 'active') {
                                self.auctionList[i].duration = (new Date(self.auctionList[i].endDate).getTime() - new Date(self.auctionList[i].currentServerDate).getTime()) / 1000;
                            } else {
                                self.auctionList[i].duration = 0;
                            }
                            self.auctionList[i].bid = parseFloat(self.auctionList[i].maxBid ? self.auctionList[i].maxBid : self.auctionList[i].minimumBid);
                        }
                    }, function (err) {
                        failFeedback(err, 'Problemas ao carregar os leilão.Tente novamente.');
                    });
            }

            self.openDetail = function (auction) {
                shareData.set(auction, 'lastAuction');
                $location.path('auctions/' + auction.auctionId);
            };


            var successFeedback = function (message) {
                ngToast.success(message);
            };

            var failFeedback = function (error, message) {
                var aux = (typeof error) == 'string';
                ngToast.danger('<b> Erro!</b>' + (aux ? error : (message? ' '+ message: ' Houve algum problema na requisição. Tente novamente.')));
                console.log(JSON.stringify(error))
            };

            init();
        }]);
