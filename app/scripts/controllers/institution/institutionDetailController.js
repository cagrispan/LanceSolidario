'use strict';
angular.module('lanceSolidario')
    .controller('InstitutionDetailCtrl', ['$location', 'shareData', 'ngToast', '$routeParams', 'Institution',
        function ($location, shareData, ngToast, $routeParams, Institution) {

            var self = this;
            function init() {
                //Useful flags
                self.loading = true;
                shareData.set($location.path(), 'lastPath');

                self.institution = shareData.get('lastInstitution');
                if (!self.institution) {
                    self.institution = new Institution();
                    self.institution.institutionId = $routeParams.institutionId;

                    self.institution._load()
                        .catch(function (err) {
                            failFeedback(err, ' Problemas ao carregar dados da instituição. Tente novamente.');
                        });
                }else{
                    shareData.set(false,'lastInstitution');
                }
            }

            var successFeedback = function (message) {
                ngToast.success(message);
            };

            var failFeedback = function (error, message) {
                var aux = (typeof error) == 'string';
                ngToast.danger('<b> Erro!</b>' + (aux ? error : (message ? ' ' + message : ' Houve algum problema na requisição. Tente novamente.')));
                console.log(JSON.stringify(error))
            };

            init();

        }

    ])
;
