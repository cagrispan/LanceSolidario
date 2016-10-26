'use strict';
angular.module('lanceSolidario')
    .controller('NewProductCtrl', ['Product', 'facebookAPI', '$location', 'Image', '$q',
        function (Product, facebookAPI, $location, Image, $q) {

            var self = this;

            function init() {
                if (!facebookAPI.user) {
                    $location.path('/login');
                } else {
                    self.user = facebookAPI.user;
                    self.newProduct = new Product();
                    self.newProduct.facebookId = self.user.facebookId;
                    self.newProduct.isUsed = false;
                    self.images = [];
                }
            }

            self.addProduct = function () {
                self.newProduct._add().then(function (result) {

                    var image = new Image();
                    image.productId = result.productId;

                    var promises = [];

                    for (var i = 0; i < self.images.length; i++) {
                        image.base64 = self.images[i].base64;
                        var promise = image._add(self.user);
                        promises.push(promise);
                    }

                    $q.all(promises).then(function () {
                        successFeedback('Produto criado com sucesso');
                        $location.path('user/products');
                    });

                }, function (err) {
                    failFeedback(err)
                })
            };

            self.addImage = function (event, imageList) {
                var found = false;
                if (self.images.length > 0) {
                    for (var i = 0; i < self.images.length; i++) {
                        if (self.images[i].filename === imageList[0].filename) {
                            found = true;
                        }
                    }
                    if (!found) {
                        self.images.push(imageList[0]);
                    }
                } else {
                    self.images.push(imageList[0]);
                }

                self.image = null;

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
