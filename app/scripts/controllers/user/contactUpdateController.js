'use strict';
angular.module('lanceSolidario')
    .controller('ContactUpdate', ['Email', 'Telephone', 'facebookAPI', '$location', function (Email, Telephone, facebookAPI, $location) {

        var self = this;
        self.telephoneToAdd = new Telephone();
        self.emailToAdd = new Email();


        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                facebookAPI.getUserInfo();
                $location.path('/login');
            }
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
                failFeedback('Telephone Add Error');
            });
        };

        self.addEmail = function () {
            self.emailToAdd._add().then(function () {
                return self.user._loadEmails();
            }).then(function () {
                self.emailToAdd.email = '';
                successFeedback('Telefone Adicionado com sucesso');
            }, function () {
                failFeedback('Email Add Error');
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
    }]);