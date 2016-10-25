'use strict';
angular.module('lanceSolidario')
    .controller('AddressUpdate', ['Address', 'facebookAPI', '$location', 'ngToast', function (Address, facebookAPI, $location, ngToast) {

        var self = this;
        self.addressToAdd = new Address();

        function init() {
            //Useful flags
            self.loading = true;
            self.isCollapsed = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;

                self.addressToAdd.facebookId = self.user.facebookId;

                self.user._loadAddresses().catch(function () {
                    failFeedback('Load Addresses Error');
                });
            }

        }


        self.deleteAddress = function (addressToDelete) {
            addressToDelete._remove().then(function () {
                return self.user._loadAddresses();
            }).then(function () {
                successFeedback('Endereço removido com sucesso.');
            }, function () {
                failFeedback('Address Delete Error');
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
                failFeedback('Address Add Error');
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
            ngToast.danger('<b> Erro!</b> Houve algum problema na requisição. Tente novamente.');
            console.log(JSON.stringify(error))
        };

        init();
    }]);
