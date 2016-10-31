'use strict';
angular.module('lanceSolidario')
    .controller('ProductDetailCtrl', ['facebookAPI', '$location', 'shareData', 'Image', 'Product', '$q', 'ngToast', '$routeParams', function (facebookAPI, $location, shareData, Image, Product, $q, ngToast, $routeParams) {

        var self = this;

        var i;
        var promise;

        function init() {
            //Useful flags
            self.loading = true;
            shareData.set($location.path(), 'lastPath');


            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                self.product = shareData.get('lastProduct');
                if (self.product) {
                    self.product._loadImages();
                } else if ($routeParams.productId) {

                    self.product = new Product();
                    self.product.productId = $routeParams.productId;
                    self.product.facebookId = facebookAPI.user.facebookId;


                    self.product._load().then(function () {
                        return self.product._loadAuctions().catch(function () {
                            failFeedback('Problemas ao carregar os leilões do produto. Tente novamente.');
                        }).then(function () {
                            return self.product._loadImages().catch(function () {
                                failFeedback('Problemas ao carregar o produto. Tente novamente.');
                            })
                        })
                    });
                }
                else {
                    failFeedback('Problemas ao carregar o produto. Tente novamente.');
                    $location('user/products')
                }
                self.imagesToRemove = [];
            }
        }

        init();

        self.addImage = function (event, imageList) {

            var found = false;

            var image = new Image();
            image.base64 = imageList[0].base64;
            image.productId = self.product.productId;

            if (self.product.imageList.length > 0) {

                for (i = 0; i < self.product.imageList.length; i++) {
                    if (self.product.imageList[i].base64 === image.base64) {
                        found = true;
                    }
                }

                if (!found) {
                    self.product.imageList.push(image);
                }

            } else {
                self.product.imageList.push(image);
            }

            self.image = null;
        };


        self.update = function () {
            self.product._update()
                .then(function () {

                    var promises = [];

                    for (i = 0; i < self.product.imageList.length; i++) {
                        if (!self.product.imageList[i].imageId) {
                            promise = self.product.imageList[i]._add(self.user);
                            promises.push(promise);
                        }
                    }

                    for (i = 0; i < self.imagesToRemove.length; i++) {
                        if (self.product.imageList[i].imageId) {
                            promise = self.imagesToRemove[i]._remove(self.user);
                            promises.push(promise);
                        }
                    }

                    $q.all(promises).then(function () {
                        self.product._load().then(function () {
                            shareData.set(self.product, 'lastProduct');

                        });
                    }, function (err) {
                        failFeedback('Problema ao atualizar as imagens. Tente novamente.')
                    });

                }, function (err) {
                    failFeedback('Problema ao salvar os dados da doação. Tente novamente.')
                })
        };

        self.removeImage = function (index) {
            if (self.product.imageList[index].imageId) {
                self.imagesToRemove.push(self.product.imageList[index]);
            }
            self.product.imageList.splice(index, 1);
        };

        self.closeAuction = function (auction) {
            auction.isClosed = true;
            auction._update()
                .then(function () {
                    successFeedback('Leilão fechado com sucesso');
                    return self.product._loadAuctions().catch(function () {
                        failFeedback('Problemas ao carregar os Leilões do produto. Atualize a página.');
                    });
                })
                .then(function () {
                    self.product._getStatus();
                });
        };


        self.auctionDetail = function (auction) {
            shareData.set(self.product, 'lastProduct');
            shareData.set(auction, 'lastAuction');
            $location.path('/auctions/' + auction.auctionId);
        };

        var successFeedback = function (message) {
            ngToast.success(message);
        };

        var failFeedback = function (error) {
            ngToast.danger('<b> Erro!</b>' + (typeof error) === 'string' ? error : 'Houve algum problema na requisição. Tente novamente.');
            console.log(JSON.stringify(error))
        };

    }

    ]);
