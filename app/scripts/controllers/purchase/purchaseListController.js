'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseListCtrl', ['facebookAPI', '$location', 'Purchase', 'shareData', 'ngToast', function (facebookAPI, $location, Purchase, shareData, ngToast) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;
            shareData.set($location.path(), 'lastPath');

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                    self.user._loadPurchases()
                    .then(function () {
                        self.purchaseList = self.user.purchaseList;
                    }, function (err) {
                        failFeedback('Problemas ao carregar suas compras. Tente novamente.',err)
                    })
            }
        }



        self.purchaseDetail = function (purchase) {
            shareData.set(purchase, 'lastPurchase');
            $location.path('user/purchases/' + purchase.purchaseId);
        };

        var successFeedback = function (message) {
            ngToast.success(message);
        };

        var failFeedback = function (msg, error) {
            var aux = (typeof msg) == 'string';
            ngToast.danger('<b> Erro!</b>' + (aux ? msg : ' Houve algum problema na requisição. Tente novamente.'));
            console.log(JSON.stringify(error))
        };

        init();

    }]);
