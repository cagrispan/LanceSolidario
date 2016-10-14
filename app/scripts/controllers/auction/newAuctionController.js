'use strict';
angular.module('lanceSolidario')
    .controller('NewAuctionCtrl', ['facebookAPI', '$location', 'Auction', function (facebookAPI, $location, Auction) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                facebookAPI.getUserInfo();
                $location.path('/login');
            }
            self.user = facebookAPI.user;
            self.auctionToAdd = new Auction();
            self.auctionToAdd.facebookId = self.user.facebookId;
            self.auctionToAdd.institutionId = 1;

            self.user._loadProducts().then(function () {
                self.product = self.user.productList[0];
            },function () {
                failFeedback('Load Products Error');
            });
        }

        self.addAuction = function () {
            self.auctionToAdd.productId = self.product.productId;
            self.auctionToAdd.startDate = self.dt;
            self.auctionToAdd.endDate = new Date();
            self.auctionToAdd.endDate.setDate(self.dt.getDate()+2);

            self.auctionToAdd._add().then(function () {
                successFeedback('Leilão Adicionado com sucesso');
            }, function () {
                failFeedback('Auction Add Error');
            });
        };


        var successFeedback = function (message) {
            alert(message);
        };

        var failFeedback = function (error) {
            alert('Erro');
            console.log(JSON.stringify(error))
        };

        init();


        //---------------------------------- Date Control -----------------------------------


        self.setDate = function (year, month, day) {
            self.dt = new Date(year, month, day);
        };

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < self.events.length; i++) {
                    var currentDay = new Date(self.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return self.events[i].status;
                    }
                }
            }

            return '';
        }

        self.events = [];
        self.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: false,
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        self.hstep = 1;
        self.mstep = 15;

        var date = new Date();
        date.setMinutes((Math.floor(date.getMinutes() / 15) * 15 ) + 15);

        self.dt = date;
        self.options.minDate = new Date();
    }]);
