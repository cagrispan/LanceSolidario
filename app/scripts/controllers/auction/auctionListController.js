'use strict';
angular.module('lanceSolidario')
    .controller('AuctionListCtrl', ['facebookAPI', '$location', 'Auction', 'shareData',
        function (facebookAPI, $location, Auction, shareData) {

            var self = this;

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
                        }
                    });
            }

            self.openDetail = function(auction){
              shareData.set(auction, 'lastAuction');
                $location('auctions/'+auction.auctionId);
            };


            var successFeedback = function (message) {
                ngToast.success(message);
            };


            var failFeedback = function (error) {
                ngToast.danger('<b> Erro!</b>' + (typeof error)=== 'string' ? error: 'Houve algum problema na requisição. Tente novamente.');
                console.log(JSON.stringify(error))
            };

            init();
        }]);
