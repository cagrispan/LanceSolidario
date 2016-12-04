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
            if (verifyInArray(self.user.telephoneList,self.telephoneToAdd.telephone,'telephone')) {
                failFeedback('Este telefone já foi adicionado.');
                return;
            }
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
            if (verifyInArray(self.user.emailList,self.emailToAdd.email,'email')) {
                failFeedback('Este email8 já foi adicionado.');
                return;
            }
            self.emailToAdd._add().then(function () {
                return self.user._loadEmails();
            }).then(function () {
                self.emailToAdd.email = '';
                successFeedback('Email Adicionado com sucesso');
            }, function () {
                failFeedback('Erro ao adicionar um Email');
            });
        };

        var verifyInArray = function (arrayToSearch, value, propertyName) {

            for (var tIndx in arrayToSearch) {
                if (arrayToSearch.hasOwnProperty(tIndx) && arrayToSearch[tIndx] && arrayToSearch[tIndx][propertyName] === value) {
                    return true;
                }
            }
            return false;
        };


        var successFeedback = function (message) {
            ngToast.success(message);
        };

        var failFeedback = function (error) {
            var aux = (typeof error) == 'string';
            ngToast.danger('<b> Erro! </b>' + (aux ? error : ' Houve algum problema na requisição. Tente novamente.'));
            console.log(JSON.stringify(error))
        };

        init();
    }]);
