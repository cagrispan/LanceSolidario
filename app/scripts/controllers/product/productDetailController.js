'use strict';
angular.module('lanceSolidario')
    .controller('ProductDetailCtrl', ['facebookAPI', '$location', 'shareData', function (facebookAPI, $location, shareData) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                self.product = shareData.get('lastProduct');
                self.product._loadImages();
            }
        }


        init();

        self.closeAuction = function (auction) {
            auction.isClosed = true;
            auction._update()
                .then(function () {
                    return self.product._loadAuctions();
                })
                .then(function () {
                    self.product._getStatus();
                });
        };

        self.auctionDetail = function (auction) {
            shareData.set(self.product, 'lastProduct');
            shareData.set(auction, 'lastAuction');
            $location.path('/auctions/' + auction.auctionId);
        };

        var successFeedback = function (message) {
            alert(message);
        };

        var failFeedback = function (error) {
            console.log('Error: ');
            console.log(JSON.stringify(error))
        };

    }]);
