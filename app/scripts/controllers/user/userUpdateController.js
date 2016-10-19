'use strict';
angular.module('lanceSolidario')
    .controller('UserUpdate', ['User', 'Email', 'Telephone', 'facebookAPI', '$location', '$q', 'ngToast', function (User, Email, Telephone, facebookAPI, $location, $q, ngToast) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                facebookAPI.getUserInfo();
                $location.path('/login');
            }
            var userToUpdate = facebookAPI.user;
            self.user = userToUpdate;
            return self.user._load()
                .then(self.user._loadTelephones())
                .then(self.user._loadEmails())
        }

        init().then(function () {
            parseEmails();
            parseTelephones();
            self.saveUser = saveUserFunction;

            self.loading = false;
        });

        var parseEmails = function () {
            if (!self.user.emailList || !self.user.emailList[0] || !self.user.emailList[0].emailId) {
                var email = new Email();
                email.facebookId = self.user.facebookId;
                self.user.emailList = [];
                self.user.emailList.push(email);
            }
        };

        var parseTelephones = function () {
            if (!self.user.telephoneList || !self.user.telephoneList[0] || !self.user.telephoneList[0].telephoneId) {
                var telephone = new Telephone();
                telephone.facebookId = self.user.facebookId;
                self.user.telephoneList = [];
                self.user.telephoneList.push(telephone);
            }
        };

        var saveUserFunction = function (userToUpdate) {
            var promise = userToUpdate._save()
                .then(saveTelephones)
                .then(saveEmails);
            promise.then(successFeedback, failFeedback);

        };

        var saveTelephones = function () {
            var listPromise = [];
            var userToUpdate = self.user;
            for (var telIndx in userToUpdate.telephoneList) {
                var telephoneToSave = userToUpdate.telephoneList[telIndx];
                listPromise.push(telephoneToSave._save());
            }
            return $q.all(listPromise);
        };

        var saveEmails = function () {
            var listPromise = [];
            var userToUpdate = self.user;
            for (var emailIndx in userToUpdate.emailList) {
                var emailToSave = userToUpdate.emailList[emailIndx];
                listPromise.push(emailToSave._save());
            }
            return $q.all(listPromise);
        };

        var successFeedback = function (message) {
            ngToast, success('Usuário salvo com sucesso!');
        };

        var failFeedback = function (error) {
            ngToast.danger('<b> Erro!</b> Houve algum problema na requisição');
            console.log(JSON.stringify(error))
        };

    }]);
