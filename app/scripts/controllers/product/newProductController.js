'use strict';
angular.module('lanceSolidario')
    .controller('NewProductCtrl', ['Product', 'facebookAPI', '$location', 'Image', '$q', 'shareData', 'ngToast',
        function (Product, facebookAPI, $location, Image, $q, shareData, ngToast) {

            var self = this;


            function init() {
                self.addLoad = false;

                shareData.set($location.path(), 'lastPath');

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
                if(!self.newProduct.description){
                    ngToast.warning('Ei, parece que faltou a descrição , por favor escreva algo sobre o item que deseja doar.');
                    return;
                }

                if(!(self.images.length>0)){
                    ngToast.warning('Ei, parece que faltou adicionar uma imagem a sua doação.');
                    return;
                }

                self.addLoad = true;
                self.newProduct._add().then(function (result) {

                    var image = new Image();
                    image.productId = result.productId;

                    var promises = [];
                    ngToast.create('As imagens estão sendo enviadas para o servidor. Aguarde ser redirecionado.');
                    for (var i = 0; i < self.images.length; i++) {
                        image.base64 = self.images[i].base64;
                        var promise = image._add(self.user);
                        promises.push(promise);
                    }

                    $q.all(promises).then(function () {
                        successFeedback('Produto criado com sucesso');
                        $location.path('user/products');
                    }, function (err) {
                        failFeedback('Ocorreu um erro ao enviar as imagens para o servidor, por favor tente novamente.');
                        $location.path('user/products/'+result.productId);
                    });

                }, function (err) {
                    failFeedback(err);
                    self.addLoad = false;
                })
            };

            self.addImage = function (event, imageList) {
                var found = false;
                if (imageList[0].filesize < 1000000) {
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
                }else{
                    self.image = null;
                    ngToast.warning('A imagem é muito pesada, verifique se ela possui menos de 1 MB.')
                }
            };


            self.removeImage = function (index) {
                self.images.splice(index, 1);
            };

            var successFeedback = function (message) {
                ngToast.success(message);
            };

            var failFeedback = function (error, message) {
                var aux = (typeof error) == 'string';
                ngToast.danger('<b> Erro! </b>' + (' '+aux ? error : (message ? ' ' + message : ' Houve algum problema na requisição. Tente novamente.')));
                console.log(JSON.stringify(error))
            };

            init();

        }]);
