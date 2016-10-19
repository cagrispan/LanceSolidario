'use strict';
angular.module('lanceSolidario')
    .controller('ProductNew', ['Product', 'facebookAPI', '$location', function (Product, facebookAPI, $location) {

        var self = this;

        function init() {
            if (!facebookAPI.user) {
                $location.path('/login');
            }
            self.user = facebookAPI.user;
            self.newProduct = new Product();
            self.newProduct.facebookId = self.user.facebookId;
        }

        self.addProduct = function () {
            self.newProduct._add().then(function (success) {
                successFeedback('Produto criado com sucesso');
                $location.path('user/products');
            }, function (err) {
                failFeedback(err)
            })
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
