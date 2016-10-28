'use strict';
angular.module('lanceSolidario')
    .controller('ProductDetailCtrl', ['facebookAPI', '$location', 'shareData', 'Image', '$q', function (facebookAPI, $location, shareData, Image, $q) {

        var self = this;

        var i;
        var promise;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
                self.product = shareData.get('lastProduct');
                self.product._loadImages();
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
                        if(!self.product.imageList[i].imageId){
                            promise = self.product.imageList[i]._add(self.user);
                            promises.push(promise);
                        }
                    }

                    for (i = 0; i < self.imagesToRemove.length; i++) {
                        if(self.product.imageList[i].imageId){
                            promise = self.imagesToRemove[i]._remove(self.user);
                            promises.push(promise);
                        }
                    }

                    $q.all(promises).then(function () {
                        self.product._load().then(function () {
                            shareData.set(self.product,'lastProduct');
                            successFeedback('Produto alterado com sucesso');
                        });
                    }, function (err) {
                        failFeedback(err)
                    });

                }, function (err) {
                    failFeedback(err)
                })
        };

        self.removeImage = function (index) {
            if(self.product.imageList[index].imageId){
                self.imagesToRemove.push(self.product.imageList[index]);
            }
            self.product.imageList.splice(index, 1);
        };

        self.closeAuction = function (auction) {
            auction.isClosed = true;
            auction._update()
                .then(function () {
                    return self.product._loadAuctions();
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
            alert(message);
        };

        var failFeedback = function (error) {
            console.log('Error: ');
            console.log(JSON.stringify(error))
        };

    }]);
