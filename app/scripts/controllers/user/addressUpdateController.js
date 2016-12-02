'use strict';
angular.module('lanceSolidario')
    .controller('AddressUpdate', ['Address', 'facebookAPI', '$location', 'ngToast', 'shareData', function (Address, facebookAPI, $location, ngToast, shareData) {

        var self = this;
        self.addressToAdd = new Address();

        function init() {
            //Useful flags
            self.loading = true;
            self.isCollapsed = true;
            shareData.set($location.path(), 'lastPath');

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;

                self.addressToAdd.facebookId = self.user.facebookId;

                self.user._loadAddresses().catch(function () {
                    failFeedback('Problemas ao carregar os endereços.');
                });
            }

        }


        self.removeAddress = function (addressToDelete) {
            addressToDelete._remove().then(function () {
                return self.user._loadAddresses();
            }).then(function () {
                successFeedback('Endereço removido com sucesso.');
            }, function () {
                failFeedback('Ploblemas ao tentar deletar o endereço.');
            });
        };

        self.showAddress = function (addressToShow) {
            self.isCollapsed = false;
            self.addressToAdd = angular.copy(addressToShow);
            self.addressToAdd.facebookId = self.user.facebookId;
        };


        self.saveAddress = function () {
            self.addressToAdd._save().then(function () {
                return self.user._loadAddresses();
            }).then(function () {
                self.isCollapsed = true;
                self.addressToAdd = new Address();
                self.addressToAdd.facebookId = self.user.facebookId;
                successFeedback('Endereço adicionado com sucesso.');
            }, function () {
                failFeedback('Problema ao adicionar um endereço.');
            });
        };

        self.discartChanges = function () {
            self.isCollapsed = true;
            self.addressToAdd = new Address();
            self.addressToAdd.facebookId = self.user.facebookId;
        };


        self.newAddress = function () {
            self.isCollapsed = false;
            self.addressToAdd = new Address();
            self.addressToAdd.facebookId = self.user.facebookId;
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
