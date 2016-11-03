'use strict';
angular.module('lanceSolidario')
    .controller('ProductListCtrl', ['Product', 'facebookAPI', '$location', '$q', 'shareData','ngToast', function (Product, facebookAPI, $location, $q, shareData, ngToast) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;
            shareData.set($location.path(), 'lastPath');
            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                return self.user._loadProducts()
                    .then(function () {
                        self.loading = false;
                    }, function (err) {
                        failFeedback(err);
                    });
            }
        }


        init();

        self.productDetail = function (product) {
            shareData.set(product, 'lastProduct');
            $location.path('/user/products/' + product.productId);
        };

        var successFeedback = function (message) {
            ngToast.success(message);
        };

        var failFeedback = function (error) {
            var aux = (typeof error) == 'string';
            ngToast.danger('<b> Erro!</b>' + aux ? error : 'Houve algum problema na requisição. Tente novamente.');
            console.log(JSON.stringify(error))
        };

    }]);
