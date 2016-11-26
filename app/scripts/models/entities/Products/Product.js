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
                //TODO: FIX THIS SHIT
                this.userId = null;

                //Image
                this.imageList = null;

                //methods

                /*
                 * Add a new product
                 * Documented 25/11/2016
                 */
                this._add = function () {
                    return productResource.add(this);
                };

                /*
                 * Update information of a product
                 * Documented 25/11/2016
                 */
                this._update = function () {
                    return productResource.update(this);
                };

                /*
                 * Load information of a product
                 * Documented 23/11/2016
                 */
                this._load = function () {
                    var product = this;
                    return productResource.load(product)
                        .then(function (result) {
                            product._set(result);
                        });
                };


                /*
                 * List auctions of a product
                 * Documented 25/11/2016
                 */
                this._loadAuctions = function () {
                    var product = this;
                    return Auction._listByProduct(product).then(function (returnList) {
                        product.auctionList = returnList;
                        product._getStatus();
                    });
                };

                /*
                 * List images of a product
                 * Documented 23/11/2016
                 */
                this._loadImages = function () {
                    var product = this;
                    return Image._listByProduct(product).then(function (returnList) {
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

            /*
             * List products of an User
             * Documented 23/11/2016
             */
            Product._listByUser = function (user) {
                return productResource.loadProductsByUser(user)
                    .then(function (productsList) {
                        var productListToReturn = [];
                        if (productsList && productsList[0]) {
                            var product;
                            for (var i in productsList) {
                                product = new Product();
                                product._set(productsList[i]);
                                product.facebookId = user.facebookId;
                                productListToReturn.push(product);
                            }
                        }
                        return productListToReturn;
                    });
            };

            /*
             * List images of a product
             * Documented 23/11/2016
             */
            Product._listByAuction = function (auction) {
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

            return Product;
        }
        ])
    ;
})
(angular);

