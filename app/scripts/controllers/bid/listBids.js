'use strict';
angular.module('lanceSolidario')
    .controller('BidList', ['Bid', 'facebookAPI', '$location', function (Bid, facebookAPI, $location) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                self.user._loadBids().then(function () {
                    self.loading = false;
                }, function (err) {
                    failFeedback(err)
                });
            }
        }

        init();

        self.auctionDetail = function (auctionId) {
            $location.path('/auctions/' + auctionId);
        };

        var successFeedback = function (message) {
            alert(message);
        };

        var failFeedback = function (error) {
            console.log('Error: ');
            console.log(JSON.stringify(error))
        };


    }]);
