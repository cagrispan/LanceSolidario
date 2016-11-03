/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.product', ['lanceSolidario.product.productResource', 'lanceSolidario.auction.auction'])
        .factory('Product', ['Entity', 'productResource', 'Auction', 'Image', function (Entity, productResource, Auction, Image) {

            angular.extend(Product.prototype, Entity.prototype);
            Product.prototype.constructor = Product;

            function Product() {

                this.facebookId = null;
                this.productId = null;
                this.title = null;

                this.description = null;
                this.isUsed = null;
                this.isSold = null;
                this.auctionList = null;
                this.status = null;

                //Image
                this.imageList = null;

                //methods
                this._add = function () {
                    return productResource.add(this);
                };

                this._update = function () {
                    return productResource.update(this);
                };

                this._load = function () {
                    var product = this;
                    return productResource.load(product)
                        .then(function (result) {
                            product._set(result);
                        });
                };

                this._listByAuction = function (auction) {
                    var productListtoReturn = [];
                    return productResource.loadProductsByAuction(auction).then(function (response) {
                        var productList = [];
                        var facebookId = '';

                        if (response.products) {
                            productList = response.products;
                        }
                        if (auction.userId) {
                            facebookId = auction.userId;
                        }
                        else if (response.facebookId) {
                            facebookId = response.facebookId;
                        }

                        if (productList && productList[0]) {
                            var product;
                            for (var i in productList) {
                                product = new Product();
                                product._set(productList[i]);
                                product.facebookId = facebookId;
                                productListtoReturn.push(product);
                            }
                        }

                        return productListtoReturn;
                    });
                };

                //TODO: Need Unit tests
                this._loadAuctions = function () {
                    var product = this;
                    var auction = new Auction();
                    return auction._listByProduct(product).then(function (returnList) {
                        product.auctionList = returnList;
                        product._getStatus();
                    });
                };

                this._loadImages = function () {
                    var product = this;
                    var image = new Image();
                    return image._listByProduct(product).then(function (returnList) {
                        product.imageList = returnList;
                    });
                };

                //TODO: Need Unit tests
                this._getStatus = function () {
                    var product = this;
                    if (product.auctionList) {
                        if (product.isSold) {
                            product.status = 'Vendido';
                        } else {
                            product.auctionList.forEach(function (auction) {
                                if (auction.status === 'active') {
                                    product.status = 'Em Leilão';
                                }
                            });
                            if (!product.status) {
                                product.status = 'Pendente';
                            }
                        }

                    }
                };
            }

            return Product;
        }
        ])
    ;
})
(angular);

