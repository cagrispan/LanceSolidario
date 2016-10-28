'use strict';
angular.module('lanceSolidario')
    .controller('ContactUpdate', ['Email', 'Telephone', 'facebookAPI', '$location', 'ngToast', 'shareData', function (Email, Telephone, facebookAPI, $location, ngToast, shareData) {

        var self = this;
        self.telephoneToAdd = new Telephone();
        self.emailToAdd = new Email();


        function init() {
            //Useful flags
            self.loading = true;

            shareData.set($location.path(), 'lastPath');
            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;

                self.telephoneToAdd.facebookId = self.user.facebookId;
                self.emailToAdd.facebookId = self.user.facebookId;

                self.user._loadTelephones().catch(function () {
                    failFeedback('Load Telephone Error');
                });

                self.user._loadEmails().catch(function () {
                    failFeedback('Load Emails Error');
                });
            }
        }


        self.deleteEmail = function (emailToDelete) {
            emailToDelete._remove().then(function () {
                return self.user._loadEmails();
            }).then(function () {
                successFeedback('Email removido com sucesso');
            }, function () {
                failFeedback('Email Delete Error');
            });
        };

        self.deleteTelephone = function (telephoneToDelete) {
            telephoneToDelete._remove().then(function () {
                return self.user._loadTelephones();
            }).then(function () {
                successFeedback('Telefone removido com sucesso');
            }, function () {
                failFeedback('Telephone Delete Error');
            });
        };

        self.addTelephone = function () {
            self.telephoneToAdd._add().then(function () {
                return self.user._loadTelephones();
            }).then(function () {
                self.telephoneToAdd.telephone = '';
                successFeedback('Telefone Adicionado com sucesso');
            }, function () {
                failFeedback('Erro ao adicionar um Telefone');
            });
        };

        self.addEmail = function () {
            self.emailToAdd._add().then(function () {
                return self.user._loadEmails();
            }).then(function () {
                self.emailToAdd.email = '';
                successFeedback('Email Adicionado com sucesso');
            }, function () {
                failFeedback('Erro ao adicionar um Email');
            });
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
