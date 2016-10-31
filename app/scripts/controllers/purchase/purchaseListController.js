'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseListCtrl', ['facebookAPI', '$location', 'Purchase', 'shareData', function (facebookAPI, $location, Purchase, shareData) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                Purchase._listAll(self.user)
                    .then(function (purchaseList) {
                        self.purchaseList = purchaseList;
                    }, function () {
                        //fail(err)
                    })
            }
        }

        self.pay = function (purchase) {
            alert(purchase)
        };

        self.purchaseDetail = function (purchase) {
            shareData.set(purchase, 'lastPurchase');
            $location.path('/purchases/'+purchase.purchaseId);
        };

        init();

    }]);
