'use strict';
angular.module('lanceSolidario')
    .controller('ProductListCtrl', ['Product', 'facebookAPI', '$location', '$q','shareData', function (Product, facebookAPI, $location, $q, shareData) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                return self.user._loadProducts()
                    .then(function () {
                        var promisses = [];
                        for (var prodIndx in self.user.productList) {
                            var product = self.user.productList[prodIndx];
                            promisses.push(product._loadAuctions());
                        }
                        return $q.all(promisses);
                    })
                    .then(function () {
                        self.loading = false;
                    }, function (err) {
                        failFeedback(err)
                    });
            }
        }


        init();

        self.stopAuction = function (product) {
            alert('yey')
        };

        self.startAuction = function (product) {
            alert('yey')
        };

        self.productDetail = function (product) {
            shareData.set(product,'lastProduct');
            $location.path('/user/products/detail');
        };

        self.deleteProduct = function (product) {
            alert('yey')
        };

        var successFeedback = function (message) {
            alert(message);
        };

        var failFeedback = function (error) {
            console.log('Error: ');
            console.log(JSON.stringify(error))
        };

    }]);
