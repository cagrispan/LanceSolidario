'use strict';
angular.module('lanceSolidario')
    .controller('AuctionDetailCtrl', ['facebookAPI', '$location', 'Bid', 'shareData',
        function (facebookAPI, $location, Bid, shareData) {

            var self = this;

            self.newBid = null;

            function init() {
                //Useful flags
                self.loading = true;

                self.showBidForm = false;

                if (facebookAPI.user) {
                    self.user = facebookAPI.user;
                    self.profilePicture = facebookAPI.profilePicture;
                }

                if (!shareData.get('lastAuction')) {
                    $location.path('/login');
                }else{
                    self.product = shareData.get('lastProduct');
                    self.auction = shareData.get('lastAuction');
                    self.auction._loadBids();
                    self.duration = (new Date(self.auction.endDate).getTime() - new Date().getTime()) / 1000;

                }


            }

            self.bid = function () {
                var bid = new Bid();
                bid.auctionId = self.auction.auctionId;
                bid.bid = self.newBid;
                bid._add(self.user).then(
                    function () {
                        self.auction._loadBids();
                        self.newBid = '';
                        self.showBidForm = false;
                        alert('Success');
                    }, function () {
                        alert('Fail');
                    });
            };


            init();
        }]);
