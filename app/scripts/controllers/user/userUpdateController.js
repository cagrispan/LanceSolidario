'use strict';
angular.module('lanceSolidario')
    .controller('UserUpdate', ['User', 'Email', 'Telephone', 'facebookAPI', '$location', '$q', 'ngToast', 'shareData', function (User, Email, Telephone, facebookAPI, $location, $q, ngToast, shareData) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            shareData.set($location.path(), 'lastPath');
            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = angular.copy(facebookAPI.user);
                return self.user._load();
            }
        }

        init();


        self.saveUser = function () {
            self.user._save()
                .then(function () {
                    facebookAPI.user._set(self.user);
                    successFeedback('Usuário salvo com sucesso!')
                }, function (err) {
                    failFeedback('Erro ao salvar os dados de usuário. Tente Novamente.');
                    console.log(err)
                });
        };

        var successFeedback = function (msg) {
            ngToast.success(msg);
        };

        var failFeedback = function (error) {
            ngToast.danger('<b> Erro!</b>' + (typeof error) === 'string' ? error : 'Houve algum problema na requisição. Tente novamente.');
            console.log(JSON.stringify(error))
        };


    }]);
