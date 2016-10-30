'use strict';
angular.module('lanceSolidario')
    .controller('BidList', ['Bid', 'facebookAPI', '$location', 'shareData', 'ngToast', function (Bid, facebookAPI, $location, shareData, ngToast) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;
            shareData.set($location.path(), 'lastPath');

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                self.user._loadBids().then(function () {
                    self.loading = false;
                }, function (err) {
                    failFeedback(err);
                });
            }
        }

        init();

        self.removeBid = function (bid) {
            bid.isDeleted = true;
            bid._update().then(function () {
                self.user._loadBids();
                successFeedback('O lance foi cancelado com sucesso!')
            }, function (err) {
                failFeedback('Problemas ao cancelar o lance, tente novamente.');
                console.log(err)

            });
        };

        self.auctionDetail = function (auctionId) {
            $location.path('/auctions/' + auctionId);
        };

        var successFeedback = function (message) {
            ngToast.success(message);
        };

        var failFeedback = function (error) {
            ngToast.danger('<b> Erro!</b>' + (typeof error)=== 'string' ? error: 'Houve algum problema na requisição. Tente novamente.');
            console.log(JSON.stringify(error))
        };


    }]);
