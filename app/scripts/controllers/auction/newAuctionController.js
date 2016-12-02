'use strict';
angular.module('lanceSolidario')
    .controller('NewAuctionCtrl', ['facebookAPI', '$location', 'Auction', 'shareData', 'ngToast', 'Institution', function (facebookAPI, $location, Auction, shareData, ngToast, Institution) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;
            shareData.set($location.path(), 'lastPath');
            self.institutions = [];
            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                self.auctionToAdd = new Auction();
                self.auctionToAdd.facebookId = self.user.facebookId;
                self.auctionToAdd.institutionId = 1;
                self.finalTimeToAdd = '2';
                self.product = null;


                Institution._listAll().then(function (institutions) {
                    self.institutionList = institutions;
                    if (self.institutionList.length > 0) {
                        self.institution = self.institutionList[0];
                    }
                }, function (err) {
                    failFeedback(err);
                });

                    self.user._loadProducts().then(function () {
                    var i = 0;
                    while (self.product === null && i < self.user.productList.length) {
                        if (self.user.productList[i] && self.user.productList[i].status === 'pending') {
                            self.product = self.user.productList[i];
                        }
                        i++;
                    }

                    if (self.productList && self.productList.length > 0) {
                        self.product = self.productList[0];
                    }


                }, function () {
                    failFeedback('Problema ao carregar suas doações. Tente novamente.');
                });
            }
        }


        self.addAuction = function () {
            if (false) {
                failFeedback('O inicio do leilão deve ser posterior a data atual. Verifique os dados e tente novamente.');
            } else {
                if (!self.institution) {
                    failFeedback('É necessario escolher uma instituição.');
                    return;
                }
                if (!self.product) {
                    failFeedback('É necessario escolher uma doação para o leilão.')
                } else {
                    self.auctionToAdd.institutionId = self.institution.institutionId;
                    self.auctionToAdd.productId = self.product.productId;
                    self.auctionToAdd.startDate = self.dt;
                    self.auctionToAdd.endDate = new Date();
                    self.auctionToAdd.endDate.setDate(self.dt.getDate() + parseInt(self.finalTimeToAdd));
                    if (self.auctionToAdd.startDate.getTime() < (new Date().getTime())) {
                        failFeedback('A data/horário de inicio deve ser maior ou igual à atual.');
                    } else {
                        self.auctionToAdd._add().then(function (data) {
                            successFeedback('Leilão Adicionado com sucesso');
                            $location.path('/auctions/' + data.auctionId);
                        }, function () {
                            failFeedback('Problemas ao adicionar leilão. Verifique as informações e tente novamente.');
                        });
                    }
                }
            }
        };


        var successFeedback = function (message) {
            ngToast.success(message);
        };

        var failFeedback = function (error) {
            var aux = (typeof error) == 'string';
            ngToast.danger('<b> Erro!</b>' + aux ? error : 'Houve algum problema na requisição. Tente novamente.');
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
    }
    ])
;
