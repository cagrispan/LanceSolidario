'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseListCtrl', ['facebookAPI', '$location', 'Purchase', function (facebookAPI, $location, Purchase) {

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

        init();

    }]);
