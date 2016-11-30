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
                    shareData.set(false, 'lastProduct');
                    self.product._loadAuctions()
                        .then(function () {
                            self.product._loadImages().catch(function () {
                                failFeedback('Problemas ao carregar o produto. Tente novamente.');
                            });
                        }, function () {
                            failFeedback('Problemas ao carregar os leilões do produto. Tente novamente.');
                        })

                } else if ($routeParams.productId) {

                    self.product = new Product();
                    self.product.productId = $routeParams.productId;
                    self.product.facebookId = facebookAPI.user.facebookId;
                    self.product.userId = facebookAPI.user.facebookId;


                    self.product._load()
                        .then(function () {
                            self.product._loadAuctions();
                        })
                        .then(function () {
                            self.product._loadImages().catch(function () {
                                failFeedback('Problemas ao carregar o produto. Tente novamente.');
                            });
                        }, function () {
                            failFeedback('Problemas ao carregar os leilões do produto. Tente novamente.');
                        })


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
            if (imageList[0].filesize < 1000000) {
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
            } else {
                self.image = null;
                ngToast.warning('A imagem é muito pesada, verifique se ela possui menos de 1 MB.')
            }
        }
        ;


        self.update = function () {
            if (self.product.status === 'pending') {
                if (!self.product.description) {
                    failFeedback('A descrição da doação é um campo obrigatório.');
                    return;
                }
                if (!(self.product.imageList.length > 0)) {
                    ngToast.warning('A doação deve conter ao menos uma imagem.');
                    return;
                }
                self.product._update()
                    .then(function () {

                        var promises = [];

                        var i;

                        for (i in self.product.imageList) {
                            if (!self.product.imageList[i].imageId) {
                                promise = self.product.imageList[i]._add(self.user);
                                promises.push(promise);
                            }
                        }

                        for (i in self.imagesToRemove) {
                            promise = self.imagesToRemove[i]._remove(self.user);
                            promises.push(promise);
                        }

                        $q.all(promises).then(function () {
                            self.product._load().then(function () {
                                shareData.set(self.product, 'lastProduct');
                                successFeedback('Produto salvo com sucesso.');
                                init();
                            });
                        }, function (err) {
                            failFeedback('Problema ao atualizar as imagens. Tente novamente.')
                        });

                    }, function (err) {
                        failFeedback('Problema ao salvar os dados da doação. Tente novamente.')
                    })
            } else {
                failFeedback('Não é possivel realizar alterações nesse produto.')
            }
        };

        self.removeImage = function (index) {
            if (self.product.imageList[index].imageId) {
                self.imagesToRemove.push(self.product.imageList[index]);
            }
            self.product.imageList.splice(index, 1);
        };

        self.closeAuction = function (auction) {
            auction.isCanceled = true;
            auction._update()
                .then(function () {
                    successFeedback('Leilão fechado com sucesso');
                    init();
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

        var failFeedback = function (error, message) {
            var aux = (typeof error) == 'string';
            ngToast.danger('<b> Erro!</b>' + (aux ? error : (message ? ' ' + message : ' Houve algum problema na requisição. Tente novamente.')));
            console.log(JSON.stringify(error))
        };

    }]);
